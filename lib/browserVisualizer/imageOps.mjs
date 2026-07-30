// Pure typed-array image operations for the in-browser fabric visualizer.
// No DOM/canvas APIs here — everything runs identically in the browser and in
// Node (which is how scripts/test-visualizer.mjs validates the pipeline).
//
// Compositing algorithm (Photoshop-mockup style):
// 1. tile the swatch into a seamless mirrored plane at the requested scale
// 2. DISPLACE the pattern along the furniture's luminance gradient so it
//    bends around folds, cushion edges and creases instead of sitting flat
// 3. relight with two frequency bands: a broad shading map (light/shadow of
//    the room, gamma-boosted for depth) multiplied on, plus a crease-detail
//    band (seams, welts, tufting) and a soft specular added back on top —
//    uniform per-channel scaling preserves the swatch's hue
// 4. alpha-composite through an eroded, feathered mask so the blend bleeds
//    inward — never onto the frame, legs or background

export const SHADE_MIN = 0.3;
export const SHADE_MAX = 1.8;
export const SHADE_GAMMA = 1.35; // >1 deepens light/shadow so the 3D form reads
export const DETAIL_STRENGTH = 0.7; // crease/seam band added on top of the pattern
export const DISPLACEMENT_STRENGTH = 1.4; // px of pattern shift per luma-gradient unit
export const SPECULAR_STRENGTH = 0.6;
export const TILE_BASE_FRACTION = 0.3;
export const SCALE_MIN = 0.25;
export const SCALE_MAX = 4.0;

// ─── Resampling ───────────────────────────────────────────────────────────────

// Halve an RGBA image (2x2 box filter). Used as a mipmap step before bilinear
// sampling so large downscales don't alias the fabric pattern.
function halveRGBA(src, w, h) {
  const dw = Math.max(1, w >> 1);
  const dh = Math.max(1, h >> 1);
  const dst = new Uint8ClampedArray(dw * dh * 4);
  for (let y = 0; y < dh; y++) {
    const y0 = Math.min(2 * y, h - 1);
    const y1 = Math.min(2 * y + 1, h - 1);
    for (let x = 0; x < dw; x++) {
      const x0 = Math.min(2 * x, w - 1);
      const x1 = Math.min(2 * x + 1, w - 1);
      const i00 = (y0 * w + x0) * 4;
      const i01 = (y0 * w + x1) * 4;
      const i10 = (y1 * w + x0) * 4;
      const i11 = (y1 * w + x1) * 4;
      const o = (y * dw + x) * 4;
      for (let c = 0; c < 4; c++) {
        dst[o + c] = (src[i00 + c] + src[i01 + c] + src[i10 + c] + src[i11 + c] + 2) >> 2;
      }
    }
  }
  return { data: dst, width: dw, height: dh };
}

export function resizeRGBA(src, sw, sh, dw, dh) {
  let cur = { data: src, width: sw, height: sh };
  // mipmap down until within 2x of the target, then bilinear
  while (cur.width >= dw * 2 && cur.height >= dh * 2) {
    cur = halveRGBA(cur.data, cur.width, cur.height);
  }
  const { data, width: cw, height: ch } = cur;
  if (cw === dw && ch === dh) return data;
  const dst = new Uint8ClampedArray(dw * dh * 4);
  const xr = cw / dw;
  const yr = ch / dh;
  for (let y = 0; y < dh; y++) {
    const fy = Math.min((y + 0.5) * yr - 0.5, ch - 1);
    const y0 = Math.max(0, Math.floor(fy));
    const y1 = Math.min(ch - 1, y0 + 1);
    const wy = fy - y0;
    for (let x = 0; x < dw; x++) {
      const fx = Math.min((x + 0.5) * xr - 0.5, cw - 1);
      const x0 = Math.max(0, Math.floor(fx));
      const x1 = Math.min(cw - 1, x0 + 1);
      const wx = fx - x0;
      const i00 = (y0 * cw + x0) * 4;
      const i01 = (y0 * cw + x1) * 4;
      const i10 = (y1 * cw + x0) * 4;
      const i11 = (y1 * cw + x1) * 4;
      const o = (y * dw + x) * 4;
      for (let c = 0; c < 4; c++) {
        const top = data[i00 + c] * (1 - wx) + data[i01 + c] * wx;
        const bot = data[i10 + c] * (1 - wx) + data[i11 + c] * wx;
        dst[o + c] = top * (1 - wy) + bot * wy;
      }
    }
  }
  return dst;
}

// Resize a grayscale Uint8Array mask with nearest-neighbour (masks must stay
// binary; bilinear would smear the edges before the deliberate feather step).
export function resizeMaskNearest(src, sw, sh, dw, dh) {
  const dst = new Uint8Array(dw * dh);
  for (let y = 0; y < dh; y++) {
    const sy = Math.min(sh - 1, Math.round(((y + 0.5) * sh) / dh - 0.5));
    for (let x = 0; x < dw; x++) {
      const sx = Math.min(sw - 1, Math.round(((x + 0.5) * sw) / dw - 0.5));
      dst[y * dw + x] = src[sy * sw + sx];
    }
  }
  return dst;
}

// ─── Tiling ───────────────────────────────────────────────────────────────────

// Tile the swatch to cover width x height. "mirror" builds a 2x2 mirrored
// block so seams are pixel-continuous with zero pattern invention (it doubles
// the apparent repeat of strongly directional patterns — "repeat" is the
// plain-tiling escape hatch).
export function tilePlane(swatchRGBA, sw, sh, width, height, tileW, mode = "mirror") {
  const tileH = Math.max(1, Math.round((tileW * sh) / sw));
  const tile = resizeRGBA(swatchRGBA, sw, sh, tileW, tileH);

  let block, bw, bh;
  if (mode === "mirror") {
    bw = tileW * 2;
    bh = tileH * 2;
    block = new Uint8ClampedArray(bw * bh * 4);
    for (let y = 0; y < bh; y++) {
      const sy = y < tileH ? y : bh - 1 - y;
      for (let x = 0; x < bw; x++) {
        const sx = x < tileW ? x : bw - 1 - x;
        const si = (sy * tileW + sx) * 4;
        const di = (y * bw + x) * 4;
        block[di] = tile[si];
        block[di + 1] = tile[si + 1];
        block[di + 2] = tile[si + 2];
        block[di + 3] = 255;
      }
    }
  } else {
    block = tile;
    bw = tileW;
    bh = tileH;
  }

  const plane = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    const by = y % bh;
    for (let x = 0; x < width; x++) {
      const bx = x % bw;
      const si = (by * bw + bx) * 4;
      const di = (y * width + x) * 4;
      plane[di] = block[si];
      plane[di + 1] = block[si + 1];
      plane[di + 2] = block[si + 2];
      plane[di + 3] = 255;
    }
  }
  return plane;
}

// ─── Grayscale helpers ────────────────────────────────────────────────────────

export function lumaOf(rgba, w, h) {
  const out = new Float32Array(w * h);
  for (let i = 0, p = 0; i < out.length; i++, p += 4) {
    out[i] = 0.2126 * rgba[p] + 0.7152 * rgba[p + 1] + 0.0722 * rgba[p + 2];
  }
  return out;
}

// Separable box blur, 3 passes ≈ Gaussian. Running-sum: O(n) per pass.
export function boxBlur(gray, w, h, sigma, passes = 3) {
  const r = Math.max(1, Math.round(sigma));
  let src = Float32Array.from(gray);
  let tmp = new Float32Array(w * h);
  for (let p = 0; p < passes; p++) {
    // horizontal
    for (let y = 0; y < h; y++) {
      const row = y * w;
      let sum = 0;
      for (let x = -r; x <= r; x++) sum += src[row + Math.min(w - 1, Math.max(0, x))];
      const norm = 1 / (2 * r + 1);
      for (let x = 0; x < w; x++) {
        tmp[row + x] = sum * norm;
        const addX = Math.min(w - 1, x + r + 1);
        const subX = Math.max(0, x - r);
        sum += src[row + addX] - src[row + subX];
      }
    }
    // vertical
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let y = -r; y <= r; y++) sum += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
      const norm = 1 / (2 * r + 1);
      for (let y = 0; y < h; y++) {
        src[y * w + x] = sum * norm;
        const addY = Math.min(h - 1, y + r + 1);
        const subY = Math.max(0, y - r);
        sum += tmp[addY * w + x] - tmp[subY * w + x];
      }
    }
  }
  return src;
}

// ─── Binary mask morphology ───────────────────────────────────────────────────

export function erodeBinary(mask, w, h, iterations = 1) {
  let src = Uint8Array.from(mask);
  let dst = new Uint8Array(w * h);
  for (let it = 0; it < iterations; it++) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (!src[i]) {
          dst[i] = 0;
          continue;
        }
        let keep = 1;
        for (let dy = -1; dy <= 1 && keep; dy++) {
          const yy = y + dy;
          if (yy < 0 || yy >= h) {
            keep = 0;
            break;
          }
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx;
            if (xx < 0 || xx >= w || !src[yy * w + xx]) {
              keep = 0;
              break;
            }
          }
        }
        dst[i] = keep ? 255 : 0;
      }
    }
    [src, dst] = [dst, src];
  }
  return src;
}

export function dilateBinary(mask, w, h, iterations = 1) {
  let src = Uint8Array.from(mask);
  let dst = new Uint8Array(w * h);
  for (let it = 0; it < iterations; it++) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let hit = 0;
        for (let dy = -1; dy <= 1 && !hit; dy++) {
          const yy = y + dy;
          if (yy < 0 || yy >= h) continue;
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx;
            if (xx >= 0 && xx < w && src[yy * w + xx]) {
              hit = 1;
              break;
            }
          }
        }
        dst[y * w + x] = hit ? 255 : 0;
      }
    }
    [src, dst] = [dst, src];
  }
  return src;
}

// Connected components (4-connectivity, iterative flood fill).
// Returns components sorted by area desc: { area, cx, cy, minX, minY, maxX, maxY }.
export function connectedComponents(mask, w, h) {
  const labels = new Int32Array(w * h);
  const comps = [];
  const stack = new Int32Array(w * h);
  let next = 1;
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i] || labels[i]) continue;
    let top = 0;
    stack[top++] = i;
    labels[i] = next;
    let area = 0;
    let sx = 0;
    let sy = 0;
    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;
    while (top > 0) {
      const p = stack[--top];
      const px = p % w;
      const py = (p / w) | 0;
      area++;
      sx += px;
      sy += py;
      if (px < minX) minX = px;
      if (px > maxX) maxX = px;
      if (py < minY) minY = py;
      if (py > maxY) maxY = py;
      if (px > 0 && mask[p - 1] && !labels[p - 1]) {
        labels[p - 1] = next;
        stack[top++] = p - 1;
      }
      if (px < w - 1 && mask[p + 1] && !labels[p + 1]) {
        labels[p + 1] = next;
        stack[top++] = p + 1;
      }
      if (py > 0 && mask[p - w] && !labels[p - w]) {
        labels[p - w] = next;
        stack[top++] = p - w;
      }
      if (py < h - 1 && mask[p + w] && !labels[p + w]) {
        labels[p + w] = next;
        stack[top++] = p + w;
      }
    }
    comps.push({
      area,
      cx: sx / area,
      cy: sy / area,
      minX,
      minY,
      maxX,
      maxY,
    });
    next++;
  }
  comps.sort((a, b) => b.area - a.area);
  return comps;
}

// Percentile of gray values under a mask, via 1024-bin histogram (values 0-255).
export function maskedPercentile(gray, mask, p) {
  const bins = new Uint32Array(1024);
  let count = 0;
  for (let i = 0; i < gray.length; i++) {
    if (mask[i] > 128) {
      const b = Math.min(1023, Math.max(0, Math.round(gray[i] * 4)));
      bins[b]++;
      count++;
    }
  }
  if (count === 0) return 0;
  const target = count * p;
  let acc = 0;
  for (let b = 0; b < 1024; b++) {
    acc += bins[b];
    if (acc >= target) return b / 4;
  }
  return 255;
}

// ─── The composite ────────────────────────────────────────────────────────────

/**
 * @param {Uint8ClampedArray} furnRGBA furniture pixels (RGBA)
 * @param {number} w
 * @param {number} h
 * @param {Uint8Array} mask upholstery mask (w*h, 255 = replace)
 * @param {Uint8ClampedArray} swatchRGBA fabric swatch pixels (RGBA)
 * @param {number} sw
 * @param {number} sh
 * @param {number} scale pattern repeat multiplier (SCALE_MIN..SCALE_MAX)
 * @param {string} tileMode "mirror" | "repeat"
 * @returns {Uint8ClampedArray} composited RGBA
 */
export function compositeFabric(furnRGBA, w, h, mask, swatchRGBA, sw, sh, scale = 1, tileMode = "mirror") {
  scale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, scale || 1));
  let inside = 0;
  for (let i = 0; i < mask.length; i++) if (mask[i] > 128) inside++;
  if (inside === 0) throw new Error("mask is empty");

  // 1. tiled fabric plane
  const tileW = Math.min(w, Math.max(32, Math.round(TILE_BASE_FRACTION * w * scale)));
  const plane = tilePlane(swatchRGBA, sw, sh, w, h, tileW, tileMode);

  // 2. two-band luminance analysis of the furniture:
  //    fine  — keeps creases/seams/welts (small blur)
  //    form  — broad light and shadow (large blur)
  const luma = lumaOf(furnRGBA, w, h);
  const fine = boxBlur(luma, w, h, Math.max(1.5, w / 400));
  const form = boxBlur(luma, w, h, Math.max(6, w / 120));
  let sum = 0;
  for (let i = 0; i < form.length; i++) if (mask[i] > 128) sum += form[i];
  const mu = Math.max(1, sum / inside);
  const p97 = maskedPercentile(fine, mask, 0.97);

  // 3. displace + relight the fabric. Displacement samples the tiled plane
  //    offset along the fine-band gradient (a displacement map), so the
  //    pattern visibly bends around cushion edges and folds. Uniform
  //    per-channel scaling keeps the swatch's hue.
  const shaded = new Float32Array(w * h * 3);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const xm = x > 0 ? i - 1 : i;
      const xp = x < w - 1 ? i + 1 : i;
      const ym = y > 0 ? i - w : i;
      const yp = y < h - 1 ? i + w : i;
      const sx = Math.min(w - 1, Math.max(0, x + (fine[xp] - fine[xm]) * 0.5 * DISPLACEMENT_STRENGTH));
      const sy = Math.min(h - 1, Math.max(0, y + (fine[yp] - fine[ym]) * 0.5 * DISPLACEMENT_STRENGTH));

      // bilinear sample of the tiled plane at the displaced position
      const x0 = sx | 0;
      const y0 = sy | 0;
      const x1 = Math.min(w - 1, x0 + 1);
      const y1 = Math.min(h - 1, y0 + 1);
      const fx = sx - x0;
      const fy = sy - y0;
      const i00 = (y0 * w + x0) * 4;
      const i01 = (y0 * w + x1) * 4;
      const i10 = (y1 * w + x0) * 4;
      const i11 = (y1 * w + x1) * 4;

      const shade = Math.min(SHADE_MAX, Math.max(SHADE_MIN, form[i] / mu)) ** SHADE_GAMMA;
      const detail = (fine[i] - form[i]) * DETAIL_STRENGTH;
      const spec = Math.max(0, fine[i] - p97) * SPECULAR_STRENGTH;
      const add = detail + spec;

      const o = i * 3;
      for (let c = 0; c < 3; c++) {
        const top = plane[i00 + c] * (1 - fx) + plane[i01 + c] * fx;
        const bot = plane[i10 + c] * (1 - fx) + plane[i11 + c] * fx;
        shaded[o + c] = (top * (1 - fy) + bot * fy) * shade + add;
      }
    }
  }

  // 4. feathered composite; erode first so the feather bleeds inward only
  const eroded = erodeBinary(mask, w, h, 2);
  const alphaF = boxBlur(Float32Array.from(eroded), w, h, Math.max(2, w / 300));

  const out = new Uint8ClampedArray(w * h * 4);
  for (let i = 0, p = 0; i < alphaF.length; i++, p += 4) {
    const a = Math.min(1, Math.max(0, alphaF[i] / 255));
    const o = i * 3;
    out[p] = furnRGBA[p] * (1 - a) + shaded[o] * a;
    out[p + 1] = furnRGBA[p + 1] * (1 - a) + shaded[o + 1] * a;
    out[p + 2] = furnRGBA[p + 2] * (1 - a) + shaded[o + 2] * a;
    out[p + 3] = 255;
  }
  return out;
}

// Crop to the top-left fraction of an RGBA image. Used to cut the text label
// baked into the corner of Helmtex catalog swatch images before tiling.
export function cropRGBA(src, w, h, fracW, fracH = fracW) {
  const cw = Math.max(1, Math.round(w * fracW));
  const ch = Math.max(1, Math.round(h * fracH));
  if (cw === w && ch === h) return { data: src, width: w, height: h };
  const dst = new Uint8ClampedArray(cw * ch * 4);
  for (let y = 0; y < ch; y++) {
    dst.set(src.subarray(y * w * 4, (y * w + cw) * 4), y * cw * 4);
  }
  return { data: dst, width: cw, height: ch };
}

// Fill enclosed holes: flood background zeros from the image border; any zero
// pixel the flood can't reach is inside the mask and gets filled. Fixes seam
// lines and small gaps SAM leaves between cushions.
export function fillHoles(mask, w, h) {
  const reach = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  let top = 0;
  const push = (i) => {
    if (!mask[i] && !reach[i]) {
      reach[i] = 1;
      stack[top++] = i;
    }
  };
  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }
  while (top > 0) {
    const p = stack[--top];
    const px = p % w;
    if (px > 0) push(p - 1);
    if (px < w - 1) push(p + 1);
    if (p >= w) push(p - w);
    if (p < (h - 1) * w) push(p + w);
  }
  const out = Uint8Array.from(mask);
  for (let i = 0; i < out.length; i++) {
    if (!out[i] && !reach[i]) out[i] = 255;
  }
  return out;
}

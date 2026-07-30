// In-browser precise fabric visualizer.
//
// Pipeline: CLIPSeg (text -> coarse upholstery heatmap) seeds SlimSAM
// (points -> sharp masks), then the deterministic compositor in imageOps.mjs
// maps the exact swatch pixels onto the masked upholstery. Everything runs
// on the visitor's device via transformers.js (WASM) — no server, no API
// keys, no rate limits, and photos never leave the browser.
//
// The same code runs in Node (onnxruntime-node) — see scripts/test-visualizer.mjs.

import {
  compositeFabric,
  connectedComponents,
  cropRGBA,
  dilateBinary,
  erodeBinary,
  fillHoles,
  resizeMaskNearest,
} from "./imageOps.mjs";

export const CLIPSEG_MODEL = "Xenova/clipseg-rd64-refined";
export const SAM_MODEL = "Xenova/slimsam-77-uniform";

export const DEFAULT_MASK_PROMPTS = [
  "upholstered fabric surface",
  "seat cushion",
  "sofa fabric",
  "padded headboard",
];

// The CLIPSeg threshold adapts to each image: hot spots vary a lot between
// photos, so a fixed cutoff either over- or under-selects (a fixed 0.4 masked
// a single cushion on the template sofa).
const HEAT_FLOOR = 0.25;
const HEAT_CEIL = 0.4;
const HEAT_RELATIVE = 0.45; // threshold = clamp(HEAT_RELATIVE * maxHeat, floor, ceil)
const PEAK_RELATIVE = 0.4; // SAM seed points need >= this fraction of maxHeat
const PEAK_CELL = 44; // px cell in the 352 grid; one candidate peak per cell
const MAX_PEAKS = 8; // SAM point prompts per image (single batched call)
const WHOLE_IMAGE_RATIO = 0.6; // discard SAM masks that grab ~everything
const MIN_MASK_RATIO = 0.02; // below this the segmentation "found nothing"
const MAX_WORKING_SIDE = 1024;

export class SegmentationFailed extends Error {
  constructor() {
    super("Couldn't find upholstered areas in the photo.");
    this.code = "segmentation_failed";
  }
}

let _lib = null;
let _models = null;

async function loadLib() {
  if (!_lib) {
    _lib = await import("@huggingface/transformers");
  }
  return _lib;
}

// Loads both models once; reports download progress via onProgress(0..1).
async function loadModels(onProgress) {
  if (_models) return _models;
  const T = await loadLib();

  const progressState = {};
  const progress_callback = (info) => {
    if (info.status === "progress" && info.file) {
      progressState[info.file] = { loaded: info.loaded || 0, total: info.total || 0 };
      let loaded = 0;
      let total = 0;
      for (const f of Object.values(progressState)) {
        loaded += f.loaded;
        total += f.total;
      }
      if (total > 0 && onProgress) onProgress(Math.min(1, loaded / total));
    }
  };

  // dtype q8 keeps CLIPSeg at ~140MB instead of the 545MB fp32 build.
  const [clipsegTokenizer, clipsegProcessor, clipsegModel] = await Promise.all([
    T.AutoTokenizer.from_pretrained(CLIPSEG_MODEL, { progress_callback }),
    T.AutoProcessor.from_pretrained(CLIPSEG_MODEL, { progress_callback }),
    T.CLIPSegForImageSegmentation.from_pretrained(CLIPSEG_MODEL, {
      progress_callback,
      dtype: "q8",
    }),
  ]);
  // SlimSAM is already tiny (~40MB fp32); quantizing it degrades mask edges.
  const [samProcessor, samModel] = await Promise.all([
    T.AutoProcessor.from_pretrained(SAM_MODEL, { progress_callback }),
    T.SamModel.from_pretrained(SAM_MODEL, { progress_callback }),
  ]);

  _models = { clipsegTokenizer, clipsegProcessor, clipsegModel, samProcessor, samModel };
  return _models;
}

export function modelsReady() {
  return Boolean(_models);
}

// Standalone CLIPSeg heat access (used by the template-mask bake script for
// contrastive negative-prompt filtering).
export async function computeHeat(rawImage, prompts, onProgress) {
  const models = await loadModels(onProgress);
  return clipsegHeatmap(models, rawImage, prompts);
}

// CLIPSeg: texts + image -> Float32 heatmap (352x352), max over prompts.
async function clipsegHeatmap(models, rawImage, prompts) {
  const textInputs = models.clipsegTokenizer(prompts, { padding: true, truncation: true });
  const imageInputs = await models.clipsegProcessor(rawImage);
  const { logits } = await models.clipsegModel({ ...textInputs, ...imageInputs });

  const dims = logits.dims; // [N, 352, 352] (or [352, 352] for a single prompt)
  const gh = dims[dims.length - 2];
  const gw = dims[dims.length - 1];
  const n = dims.length === 3 ? dims[0] : 1;
  const data = logits.data;

  const heat = new Float32Array(gw * gh);
  for (let i = 0; i < gw * gh; i++) {
    let best = -Infinity;
    for (let k = 0; k < n; k++) {
      const v = data[k * gw * gh + i];
      if (v > best) best = v;
    }
    heat[i] = 1 / (1 + Math.exp(-best)); // sigmoid
  }
  return { heat, gw, gh };
}

// Pick well-spread local maxima of the heatmap as SAM seed points.
function peakPoints(heat, gw, gh, maxHeat) {
  const floor = maxHeat * PEAK_RELATIVE;
  const candidates = [];
  for (let cy = 0; cy < gh; cy += PEAK_CELL) {
    for (let cx = 0; cx < gw; cx += PEAK_CELL) {
      let bestV = -1;
      let bestX = -1;
      let bestY = -1;
      const yEnd = Math.min(gh, cy + PEAK_CELL);
      const xEnd = Math.min(gw, cx + PEAK_CELL);
      for (let y = cy; y < yEnd; y++) {
        for (let x = cx; x < xEnd; x++) {
          const v = heat[y * gw + x];
          if (v > bestV) {
            bestV = v;
            bestX = x;
            bestY = y;
          }
        }
      }
      if (bestV >= floor) candidates.push({ x: bestX, y: bestY, v: bestV });
    }
  }
  candidates.sort((a, b) => b.v - a.v);
  return candidates.slice(0, MAX_PEAKS);
}

// One batched SlimSAM call: each seed point is its own prompt set, so the
// vision encoder runs once. Returns the union of each set's chosen mask.
//
// Hypothesis choice: SAM returns 3 masks per point at subpart/part/object
// granularity, and the highest IoU score usually lands on the tightest
// subpart (e.g. one cushion). We want the whole upholstered body, so pick the
// LARGEST hypothesis that isn't a whole-image grab — the CLIPSeg gate applied
// by the caller trims any background/legs it drags in.
async function samRefine(models, rawImage, points) {
  const pointSets = points.map((p) => [[p.x, p.y]]);
  const inputs = await models.samProcessor(rawImage, { input_points: [pointSets] });
  const outputs = await models.samModel(inputs);
  const masks = await models.samProcessor.post_process_masks(
    outputs.pred_masks,
    inputs.original_sizes,
    inputs.reshaped_input_sizes
  );
  const tensor = masks[0]; // dims [numSets, 3, H, W]
  const [numSets, numMasks, mh, mw] = tensor.dims;
  const data = tensor.data;

  const union = new Uint8Array(mh * mw);
  let used = 0;
  for (let s = 0; s < numSets; s++) {
    let bestK = -1;
    let bestOn = 0;
    for (let k = 0; k < numMasks; k++) {
      const plane = data.subarray((s * numMasks + k) * mh * mw, (s * numMasks + k + 1) * mh * mw);
      let on = 0;
      for (let i = 0; i < plane.length; i++) if (plane[i]) on++;
      if (on > bestOn && on <= WHOLE_IMAGE_RATIO * plane.length) {
        bestOn = on;
        bestK = k;
      }
    }
    if (bestK < 0) continue; // all hypotheses empty or grabbed everything
    const plane = data.subarray(
      (s * numMasks + bestK) * mh * mw,
      (s * numMasks + bestK + 1) * mh * mw
    );
    for (let i = 0; i < plane.length; i++) if (plane[i]) union[i] = 255;
    used++;
  }
  return { union, mw, mh, used };
}

/**
 * Text-guided upholstery segmentation.
 * @param {*} rawImage transformers.js RawImage (RGB/RGBA)
 * @param {string[]} prompts CLIPSeg text prompts
 * @param {(phase: string, progress?: number) => void} onPhase
 * @returns {Promise<{mask: Uint8Array, width: number, height: number, source: string, maskRatio: number}>}
 */
export async function segmentUpholstery(
  rawImage,
  prompts = DEFAULT_MASK_PROMPTS,
  onPhase = () => {},
  debugSink = null
) {
  const models = await loadModels((p) => onPhase("models", p));
  const imgW = rawImage.width;
  const imgH = rawImage.height;

  onPhase("locating");
  const { heat, gw, gh } = await clipsegHeatmap(models, rawImage, prompts);

  let maxHeat = 0;
  for (let i = 0; i < heat.length; i++) if (heat[i] > maxHeat) maxHeat = heat[i];
  const threshold = Math.min(HEAT_CEIL, Math.max(HEAT_FLOOR, HEAT_RELATIVE * maxHeat));
  const coarse = new Uint8Array(gw * gh);
  for (let i = 0; i < heat.length; i++) coarse[i] = heat[i] > threshold ? 255 : 0;

  let mask = null;
  let source = "clipseg+slimsam";

  const peaks = peakPoints(heat, gw, gh, maxHeat).map((p) => ({
    x: (p.x * imgW) / gw,
    y: (p.y * imgH) / gh,
    v: p.v,
  }));

  if (peaks.length > 0) {
    onPhase("masking");
    const { union, mw, mh, used } = await samRefine(models, rawImage, peaks);
    if (used > 0) {
      const sam = mw === imgW && mh === imgH ? union : resizeMaskNearest(union, mw, mh, imgW, imgH);
      // Semantic gate: keep only SAM pixels that CLIPSeg doesn't consider
      // clearly non-fabric. SAM contributes crisp object edges; the gate keeps
      // wooden legs, floor and background out even when SAM's object includes
      // them. It is deliberately MUCH more permissive than the seeding
      // threshold — legs/floor sit near zero heat, while dimmer fabric areas
      // (e.g. a sofa's shadowed base) must survive.
      const gateT = Math.max(0.08, 0.15 * maxHeat);
      const gateCoarse = new Uint8Array(gw * gh);
      for (let i = 0; i < heat.length; i++) gateCoarse[i] = heat[i] > gateT ? 255 : 0;
      const gate = resizeMaskNearest(dilateBinary(gateCoarse, gw, gh, 2), gw, gh, imgW, imgH);
      if (debugSink) {
        debugSink.preGateUnion = Uint8Array.from(sam);
        debugSink.gate = Uint8Array.from(gate);
        debugSink.peaks = peaks;
        debugSink.gateT = gateT;
        debugSink.maxHeat = maxHeat;
      }
      let kept = 0;
      for (let i = 0; i < sam.length; i++) {
        if (sam[i] && gate[i]) kept++;
        else sam[i] = 0;
      }
      if (kept > 0) {
        // Second pass: SAM under-segments interiors it never got a seed near
        // (shadowed base bands, inner armrests — the heat peaks all cluster
        // on the brightest cushion band). Find fabric territory the first
        // pass missed (deep inside the gate but not near the SAM mask), seed
        // SAM there, and union — so even the fill-in edges stay SAM-crisp.
        const coreIter = Math.max(4, Math.round(Math.min(imgW, imgH) * 0.02));
        const core = erodeBinary(gate, imgW, imgH, coreIter);
        const covered = dilateBinary(sam, imgW, imgH, 8);
        const missing = new Uint8Array(imgW * imgH);
        let missingOn = 0;
        for (let i = 0; i < missing.length; i++) {
          if (core[i] && !covered[i]) {
            missing[i] = 255;
            missingOn++;
          }
        }
        if (missingOn > 0.005 * missing.length) {
          const gaps = connectedComponents(missing, imgW, imgH)
            .filter((c) => c.area >= 0.005 * imgW * imgH)
            .slice(0, 4);
          if (gaps.length > 0) {
            const seeds = gaps.map((c) => ({ x: c.cx, y: c.cy }));
            const second = await samRefine(models, rawImage, seeds);
            const sam2 =
              second.mw === imgW && second.mh === imgH
                ? second.union
                : resizeMaskNearest(second.union, second.mw, second.mh, imgW, imgH);
            // Merge through the UNdilated gate: second-pass seeds sit near
            // legs/floor, and the dilated gate's ~10px slack is enough to let
            // SAM's mask swallow a wooden leg.
            const strictGate = resizeMaskNearest(gateCoarse, gw, gh, imgW, imgH);
            for (let i = 0; i < sam.length; i++) {
              if (sam2[i] && strictGate[i]) sam[i] = 255;
            }
          }
        }
        mask = sam;
      }
    }
  }

  if (!mask) {
    // CLIPSeg-only fallback: coarser edges, but never fails on odd furniture.
    source = "clipseg";
    const grown = dilateBinary(coarse, gw, gh, 1);
    mask = resizeMaskNearest(grown, gw, gh, imgW, imgH);
  }

  // cleanup: close seam gaps (dilate->erode), fill enclosed holes, then a
  // light open (erode->dilate) to smooth jagged edges and drop specks
  mask = erodeBinary(dilateBinary(mask, imgW, imgH, 3), imgW, imgH, 3);
  mask = fillHoles(mask, imgW, imgH);
  mask = dilateBinary(erodeBinary(mask, imgW, imgH, 1), imgW, imgH, 1);
  const comps = connectedComponents(mask, imgW, imgH);
  const minArea = 0.005 * imgW * imgH;
  const small = comps.filter((c) => c.area < minArea);
  if (small.length > 0 && small.length < comps.length) {
    for (const c of small) {
      for (let y = c.minY; y <= c.maxY; y++) {
        for (let x = c.minX; x <= c.maxX; x++) {
          mask[y * imgW + x] = 0;
        }
      }
    }
  }

  let on = 0;
  for (let i = 0; i < mask.length; i++) if (mask[i]) on++;
  const maskRatio = on / mask.length;
  if (maskRatio < MIN_MASK_RATIO) throw new SegmentationFailed();

  return { mask, width: imgW, height: imgH, source, maskRatio };
}

// Cap a RawImage to the working resolution (keeps aspect).
async function capSize(rawImage, maxSide = MAX_WORKING_SIDE) {
  const { width, height } = rawImage;
  if (Math.max(width, height) <= maxSide) return rawImage;
  const s = maxSide / Math.max(width, height);
  return rawImage.resize(Math.round(width * s), Math.round(height * s));
}

function toRGBA(rawImage) {
  const rgba = rawImage.rgba(); // RawImage with 4 channels
  return {
    data: new Uint8ClampedArray(rgba.data.buffer, rgba.data.byteOffset, rgba.data.length),
    width: rgba.width,
    height: rgba.height,
  };
}

/**
 * Full precise generation: segment the furniture, composite the exact swatch.
 *
 * @param {object} opts
 * @param {*} opts.furniture RawImage of the furniture photo
 * @param {*} opts.swatch RawImage of the fabric swatch
 * @param {number} opts.fabricScale pattern repeat multiplier
 * @param {string} [opts.tileMode] "mirror" | "repeat"
 * @param {string[]} [opts.maskPrompts]
 * @param {Uint8Array} [opts.precomputedMask] skip segmentation (template cache)
 * @param {number} [opts.swatchCrop] keep this top-left fraction of the swatch
 *   (crops out the text label baked into catalog swatch corners)
 * @param {(phase: string, progress?: number) => void} [opts.onPhase]
 * @returns {Promise<{rgba: Uint8ClampedArray, width: number, height: number,
 *   mask: Uint8Array, meta: object}>}
 */
export async function generateVisualization({
  furniture,
  swatch,
  fabricScale = 1,
  tileMode = "mirror",
  maskPrompts = DEFAULT_MASK_PROMPTS,
  precomputedMask = null,
  swatchCrop = 1,
  onPhase = () => {},
}) {
  const t0 = Date.now();
  const furn = await capSize(furniture);
  const swatchCapped = await capSize(swatch);

  let mask;
  let source;
  let maskRatio;
  if (precomputedMask && precomputedMask.length === furn.width * furn.height) {
    mask = precomputedMask;
    source = "cached";
    let on = 0;
    for (let i = 0; i < mask.length; i++) if (mask[i]) on++;
    maskRatio = on / mask.length;
  } else {
    ({ mask, source, maskRatio } = await segmentUpholstery(furn, maskPrompts, onPhase));
  }
  const tMask = Date.now();

  onPhase("compositing");
  const f = toRGBA(furn);
  let s = toRGBA(swatchCapped);
  if (swatchCrop > 0 && swatchCrop < 1) {
    s = cropRGBA(s.data, s.width, s.height, swatchCrop);
  }
  const rgba = compositeFabric(
    f.data,
    f.width,
    f.height,
    mask,
    s.data,
    s.width,
    s.height,
    fabricScale,
    tileMode
  );
  const tEnd = Date.now();

  return {
    rgba,
    width: f.width,
    height: f.height,
    mask,
    meta: {
      mask_source: source,
      mask_area_ratio: Number(maskRatio.toFixed(4)),
      timings_ms: { mask: tMask - t0, composite: tEnd - tMask, total: tEnd - t0 },
    },
  };
}

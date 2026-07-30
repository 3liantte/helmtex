// One-off generator for the bundled furniture templates' upholstery masks.
// Runs the SAME segmentation pipeline the browser uses (CLIPSeg + SlimSAM,
// two-pass with semantic gating) with per-template prompts, then applies two
// bake-only refinements the runtime can't safely do on arbitrary uploads:
//   - wood filter: drops wooden-leg pixels by hue (safe here: all template
//     fabrics are grey, so tan/golden hues can only be wood)
//   - negative prompts: contrastive CLIPSeg (e.g. headboard vs bedding) —
//     clears mask pixels where the negative concepts score higher
// Bakes {id}_mask.png next to the photos; template generations then skip
// segmentation entirely (~200ms composite instead of ~10-30s).
//
// Re-run after swapping any template photo, then review with
// scripts/test-templates.mjs.
//
// Usage: node scripts/make-template-masks.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  connectedComponents,
  dilateBinary,
  erodeBinary,
  fillHoles,
  resizeMaskNearest,
} from "../lib/browserVisualizer/imageOps.mjs";
import { computeHeat, segmentUpholstery } from "../lib/browserVisualizer/pipeline.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(root, "public", "assets", "furniture-templates");

const TEMPLATES = {
  sofa: { prompts: ["sofa fabric", "seat cushion", "upholstered sofa"] },
  armchair: { prompts: ["armchair fabric", "seat cushion", "upholstered armchair"] },
  ottoman: { prompts: ["upholstered ottoman", "fabric cushion", "upholstered footstool"] },
  "dining-chair": {
    prompts: ["upholstered chair seat", "chair backrest fabric", "upholstered chair"],
    // the upholstered shell ends ~56% down the photo; below is legs + the
    // wall visible between them, which segmentation keeps grabbing
    clearBelow: 0.56,
  },
  bench: { prompts: ["upholstered bench cushion", "seat cushion", "sofa fabric"] },
  headboard: {
    prompts: ["padded headboard", "upholstered headboard panel"],
    negative: ["white bed sheets", "duvet blanket", "pillows on a bed", "mattress"],
    negMargin: 0.3,
    clearBelow: 0.6,
  },
};

const { RawImage } = await import("@huggingface/transformers");

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d > 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return [h, max === 0 ? 0 : d / max, max];
}

for (const [id, spec] of Object.entries(TEMPLATES)) {
  const photoPath = path.join(DIR, `${id}.jpg`);
  if (!fs.existsSync(photoPath)) {
    console.log(`[skip] ${id}: no photo`);
    continue;
  }
  const image = await RawImage.read(photoPath);
  let mask;
  let width;
  let height;
  let source;
  try {
    ({ mask, width, height, source } = await segmentUpholstery(image, spec.prompts));
  } catch (err) {
    console.log(`[FAIL] ${id}: ${err.message}`);
    continue;
  }

  // wood filter (bake-only; see header)
  const rgba = image.rgba();
  const px = rgba.data;
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i]) continue;
    const i4 = i * 4;
    const [hue, sat, val] = rgbToHsv(px[i4], px[i4 + 1], px[i4 + 2]);
    if (hue >= 15 && hue <= 50 && sat > 0.25 && val > 0.15) mask[i] = 0;
  }

  // contrastive negative prompts (bake-only)
  if (spec.negative) {
    const pos = await computeHeat(image, spec.prompts);
    const neg = await computeHeat(image, spec.negative);
    const clear = new Uint8Array(pos.gw * pos.gh);
    for (let i = 0; i < clear.length; i++) {
      clear[i] = neg.heat[i] > pos.heat[i] + (spec.negMargin ?? 0.2) ? 255 : 0;
    }
    const clearFull = resizeMaskNearest(clear, pos.gw, pos.gh, width, height);
    for (let i = 0; i < mask.length; i++) if (clearFull[i]) mask[i] = 0;
    // the negative filter pockmarks quilted/tufted surfaces — refill holes
    mask = fillHoles(mask, width, height);
  }

  if (spec.clearBelow) {
    const yCut = Math.round(spec.clearBelow * height);
    mask.fill(0, yCut * width);
  }

  // cleanup: open to drop slivers the filters left, then drop small islands
  mask = dilateBinary(erodeBinary(mask, width, height, 2), width, height, 2);
  const comps = connectedComponents(mask, width, height);
  const minArea = 0.005 * width * height;
  for (const c of comps.filter((c) => c.area < minArea)) {
    for (let y = c.minY; y <= c.maxY; y++) {
      for (let x = c.minX; x <= c.maxX; x++) mask[y * width + x] = 0;
    }
  }

  let on = 0;
  for (let i = 0; i < mask.length; i++) if (mask[i]) on++;
  await new RawImage(mask, width, height, 1).save(path.join(DIR, `${id}_mask.png`));
  console.log(`[${source}] ${id}: mask ratio ${((on / mask.length) * 100).toFixed(1)}%`);
}

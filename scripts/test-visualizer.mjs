// Node end-to-end test for the in-browser visualizer pipeline.
// The pipeline is isomorphic: this runs the exact same code the browser runs
// (transformers.js falls back to onnxruntime-node here).
//
// Usage:
//   node scripts/test-visualizer.mjs [outDir] [furniturePath] [swatchPath] [scale]
//
// Defaults: template sofa + Diamond Range "Azure Sprinkle" swatch, scale 1.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateVisualization } from "../lib/browserVisualizer/pipeline.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = process.argv[2] || path.join(root, ".viz-test");
const furniturePath =
  process.argv[3] || path.join(root, "public/assets/furniture-templates/sofa.jpg");
const swatchPath =
  process.argv[4] || path.join(root, "public/assets/ranges/DiamondRange/diamond_02.jpg");
const scale = Number(process.argv[5] || 1);

fs.mkdirSync(outDir, { recursive: true });

const { RawImage } = await import("@huggingface/transformers");

console.log("furniture:", furniturePath);
console.log("swatch:   ", swatchPath);
const furniture = await RawImage.read(furniturePath);
const swatch = await RawImage.read(swatchPath);

const result = await generateVisualization({
  furniture,
  swatch,
  fabricScale: scale,
  swatchCrop: 0.72, // catalog swatches carry a text label in the corner
  onPhase: (phase, p) =>
    console.log(`phase: ${phase}${p !== undefined ? ` ${Math.round(p * 100)}%` : ""}`),
});

console.log("meta:", JSON.stringify(result.meta, null, 2));

const outImage = new RawImage(
  new Uint8Array(result.rgba.buffer, result.rgba.byteOffset, result.rgba.length),
  result.width,
  result.height,
  4
);
const outPath = path.join(outDir, "visualization.jpg");
await outImage.save(outPath);

const maskImage = new RawImage(result.mask, result.width, result.height, 1);
const maskPath = path.join(outDir, "mask.png");
await maskImage.save(maskPath);

console.log("saved:", outPath);
console.log("saved:", maskPath);

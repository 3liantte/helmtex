// Composite every template with a swatch through its BAKED mask (no models).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateVisualization } from "../lib/browserVisualizer/pipeline.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(root, "public", "assets", "furniture-templates");
const outDir = path.join(root, ".viz-test");
fs.mkdirSync(outDir, { recursive: true });
const { RawImage } = await import("@huggingface/transformers");

const swatch = await RawImage.read(
  process.argv[2] || path.join(root, "public/assets/ranges/DiamondRange/diamond_02.jpg")
);

for (const id of ["sofa", "armchair", "ottoman", "dining-chair", "bench", "headboard"]) {
  const furniture = await RawImage.read(path.join(DIR, `${id}.jpg`));
  const maskImg = await RawImage.read(path.join(DIR, `${id}_mask.png`));
  const gray = maskImg.grayscale();
  const mask = new Uint8Array(gray.width * gray.height);
  for (let i = 0; i < mask.length; i++) mask[i] = gray.data[i] > 127 ? 255 : 0;

  const res = await generateVisualization({
    furniture,
    swatch,
    fabricScale: 1,
    swatchCrop: 0.72,
    precomputedMask: mask,
  });
  const out = new RawImage(
    new Uint8Array(res.rgba.buffer, res.rgba.byteOffset, res.rgba.length),
    res.width,
    res.height,
    4
  );
  await out.save(path.join(outDir, `tpl_${id}.jpg`));
  console.log(`${id}: ratio ${res.meta.mask_area_ratio}, composite ${res.meta.timings_ms.composite}ms`);
}

const STORAGE_KEY = "htx_viz_usage";
export const DAILY_LIMIT = 5;
export const IS_DEV = process.env.NODE_ENV === "development";

export function getRemainingGenerations() {
  if (IS_DEV) return DAILY_LIMIT; // no counter in development
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const today = new Date().toISOString().split("T")[0];
    if (stored.date !== today) return DAILY_LIMIT;
    return Math.max(0, DAILY_LIMIT - (stored.count || 0));
  } catch {
    return DAILY_LIMIT;
  }
}

export function recordGeneration() {
  if (IS_DEV) return; // don't count generations in development
  try {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const base = stored.date === today ? stored.count || 0 : 0;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: base + 1 }));
  } catch {
    // localStorage not available (SSR or private mode) — silently skip
  }
}

export function buildPrompt({ furnitureType, furnitureDescription, fabricName, fabricColour, uploadedFabricDescription, customPrompt }) {
  const furniture = furnitureDescription?.trim() || furnitureType || "sofa";

  // Build a clean, natural fabric phrase.
  // If the user described their uploaded swatch, use that — most accurate.
  // Otherwise combine colour + range name into something the model understands.
  let fabricDesc;
  if (uploadedFabricDescription?.trim()) {
    fabricDesc = uploadedFabricDescription.trim();
  } else {
    const colour = fabricColour?.trim();
    const range = fabricName?.trim();
    if (colour && range) {
      fabricDesc = `${colour} ${range} upholstery fabric`;
    } else if (colour) {
      fabricDesc = `${colour} upholstery fabric`;
    } else if (range) {
      fabricDesc = `${range} upholstery fabric`;
    } else {
      fabricDesc = "premium textured upholstery fabric";
    }
  }

  const extra = customPrompt?.trim() ? customPrompt.trim() : "";

  // FLUX weights early tokens most heavily — framing constraint must come first.
  // Stating the furniture type inside the framing sentence stops the model from
  // treating "full-length" as a generic instruction it can ignore.
  return [
    `full-length photograph of a complete ${furniture}, entire piece visible from floor to top`,
    "furniture legs resting on hardwood floor, nothing cropped out of frame",
    "professional interior design photograph",
    "camera positioned 2.5 metres away at eye level",
    `${furniture} completely reupholstered in ${fabricDesc}`,
    "fabric colour and texture visible across all upholstered surfaces",
    "elegant interior room, neutral walls, soft natural side lighting",
    "photorealistic, ultra sharp focus, 8K resolution, interior design magazine quality",
    extra,
  ]
    .filter(Boolean)
    .join(", ");
}

export const FURNITURE_TEMPLATES = [
  { id: "sofa", label: "Sofa", description: "three-seat living room sofa" },
  { id: "armchair", label: "Armchair", description: "accent armchair" },
  { id: "ottoman", label: "Ottoman", description: "square upholstered ottoman" },
  { id: "dining-chair", label: "Dining Chair", description: "upholstered dining chair" },
  { id: "bench", label: "Bench", description: "upholstered bench seat" },
  { id: "headboard", label: "Headboard", description: "padded fabric headboard panel" },
];

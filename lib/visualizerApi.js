// Client for the precise visualizer backend (FastAPI on a Hugging Face Space).
// The Space URL comes from NEXT_PUBLIC_VISUALIZER_API; when it's not set, the
// app falls back to the original text-to-image "creative" pipeline.

const API_BASE = (process.env.NEXT_PUBLIC_VISUALIZER_API || "").replace(/\/+$/, "");

export function isPreciseModeConfigured() {
  return Boolean(API_BASE);
}

export async function pingHealth() {
  const res = await fetch(`${API_BASE}/health`, { cache: "no-store" });
  if (!res.ok) throw new Error(`health ${res.status}`);
  return res.json();
}

// Resize an image File/Blob on a canvas and return a JPEG Blob, keeping
// upload payloads small (well under the backend's 8 MB cap).
export function resizeImageToBlob(file, maxPx) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const ratio = Math.min(maxPx / img.width, maxPx / img.height, 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Could not encode image."))),
        "image/jpeg",
        0.9
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not load image."));
    };
    img.src = objectUrl;
  });
}

// Catalog fabrics live under /assets/ranges/... — fetch the real pixels so
// the backend receives the actual swatch, not a text description.
export async function fetchCatalogFabricBlob(imagePath) {
  const res = await fetch(imagePath);
  if (!res.ok) throw new Error("Could not load the catalog fabric image.");
  return res.blob();
}

const ERROR_MESSAGES = {
  segmentation_failed:
    "We couldn't detect the upholstered areas in that photo. Try a clearer, front-on photo of the furniture.",
  rate_limited:
    "The visualizer has had too many requests from your network today. Please try again tomorrow.",
  models_loading:
    "The visualizer is still warming up — give it a minute and try again.",
  payload_too_large: "That image is too large. Please use a smaller photo.",
};

export async function generatePrecise({
  furnitureBlob,
  templateId,
  fabricBlob,
  fabricScale,
  maskPrompt,
  returnMask,
}) {
  const form = new FormData();
  if (furnitureBlob) form.append("furniture_image", furnitureBlob, "furniture.jpg");
  if (templateId) form.append("template_id", templateId);
  form.append("fabric_image", fabricBlob, "fabric.jpg");
  form.append("fabric_scale", String(fabricScale ?? 1));
  if (maskPrompt) form.append("mask_prompt", maskPrompt);
  if (returnMask) form.append("return_mask", "true");

  const res = await fetch(`${API_BASE}/visualize`, { method: "POST", body: form });
  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON error body (proxy timeout, Space asleep)
  }
  if (!res.ok) {
    const code = data?.error?.code;
    const err = new Error(
      ERROR_MESSAGES[code] || data?.error?.message || `Visualizer error (${res.status}).`
    );
    err.code = code || `http_${res.status}`;
    throw err;
  }
  return data; // { image, mask, meta }
}

import { NextResponse } from "next/server";
import { buildPrompt } from "../../../lib/visualizerUtils";

// No external network call here — we just build the Pollinations URL.
// The browser fetches the image directly, avoiding any server-side DNS issues.
// Pollinations.ai is a free FLUX-based text-to-image API (no API key required).
export async function POST(req) {
  try {
    const body = await req.json();
    const { furnitureType, furnitureDescription, fabricName, fabricColour, uploadedFabricDescription, customPrompt } = body;

    if (!furnitureType && !furnitureDescription) {
      return NextResponse.json({ error: "Furniture type is required." }, { status: 400 });
    }

    const prompt = buildPrompt({ furnitureType, furnitureDescription, fabricName, fabricColour, uploadedFabricDescription, customPrompt });
    const seed = Math.floor(Math.random() * 999999);
    const encoded = encodeURIComponent(prompt);

    // Browser will fetch this URL directly — Pollinations generates and streams the image back
    const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=768&seed=${seed}&nologo=true&model=flux`;

    return NextResponse.json({ imageUrl, prompt });
  } catch (err) {
    console.error("[visualize]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

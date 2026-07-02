"use client";

import { AlertCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { DAILY_LIMIT, IS_DEV, getRemainingGenerations, recordGeneration } from "../../lib/visualizerUtils";
import { Button } from "../ui/button";
import FabricSelector from "./FabricSelector";
import FurniturePicker from "./FurniturePicker";
import GenerationPanel from "./GenerationPanel";
import PromptInput from "./PromptInput";

export default function VisualizerPage() {
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remaining, setRemaining] = useState(DAILY_LIMIT);

  // Read localStorage only on the client after mount
  useEffect(() => {
    setRemaining(getRemainingGenerations());
  }, []);

  const canGenerate = selectedFurniture && (IS_DEV || remaining > 0) && !isLoading && !selectedFabric?.analysing;

  const generate = async () => {
    if (!canGenerate) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null); // clear previous image so spinner shows cleanly

    try {
      const res = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          furnitureType: selectedFurniture.furnitureType,
          furnitureDescription: selectedFurniture.furnitureDescription,
          fabricName: selectedFabric?.fabricName || "",
          fabricColour: selectedFabric?.fabricColour || "",
          uploadedFabricDescription: selectedFabric?.uploadedFabricDescription || "",
          customPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Generation failed.");
      }

      // imageUrl is a Pollinations URL — the browser loads the image directly.
      // GenerationPanel tracks when the img actually finishes loading.
      setImageUrl(data.imageUrl);
      recordGeneration();
      setRemaining(getRemainingGenerations());
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
    // Note: isLoading stays true here — GenerationPanel clears it via onImageLoad
  };

  const handleRegenerate = () => {
    if (!IS_DEV && remaining <= 0) return;
    generate();
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-10 sm:px-6 lg:px-2 lg:py-2">

        {/* Hero */}
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.55)]">
          <div className="flex flex-col items-start justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center sm:px-8 lg:px-10 lg:py-10">
            <div className="text-white">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100 backdrop-blur-sm">
                AI Fabric Visualizer
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                See your weave{" "}
                <em className="font-serif not-italic text-blue-300">come alive</em>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Select a fabric from our catalog, pick a furniture piece, and let AI
                generate a photorealistic visualisation in seconds.
              </p>
            </div>

            {/* Usage badge */}
            <div className="shrink-0 rounded-[20px] border border-white/12 bg-white/10 px-6 py-4 text-white backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                Daily Limit
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight">
                {remaining}
                <span className="ml-1 text-xl font-normal text-slate-300">/ {DAILY_LIMIT}</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {remaining > 0 ? "generations remaining today" : "come back tomorrow"}
              </p>
            </div>
          </div>
        </div>

        {/* How it works strip */}
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm xl:px-10">
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            How It Works
          </h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { step: "01", title: "Pick a Fabric", body: "Browse the Helmtex catalog or upload your own swatch image to use as the fabric source." },
              { step: "02", title: "Choose Furniture", body: "Select one of 6 standard pieces or upload a photo of your own furniture with a description." },
              { step: "03", title: "Generate & Save", body: "Our AI (Pollinations FLUX) builds a photorealistic image. Download it and share with your client." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                  {step}
                </span>
                <div>
                  <p className="font-semibold text-slate-800">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Main two-panel layout */}
        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">

          {/* LEFT: Controls */}
          <div className="space-y-6">

            {/* Step 1 — Fabric */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  01
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Upload Your Fabric
                  </p>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Choose a Fabric
                  </h2>
                </div>
              </div>
              <FabricSelector
                selectedFabric={selectedFabric}
                onSelect={setSelectedFabric}
              />
            </div>

            {/* Step 2 — Furniture */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  02
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Choose Furniture
                  </p>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Select a Piece
                  </h2>
                </div>
              </div>
              <FurniturePicker
                selectedFurniture={selectedFurniture}
                onSelect={setSelectedFurniture}
              />
            </div>

            {/* Step 3 — Custom prompt */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  03
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Optional
                  </p>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Describe the Application
                  </h2>
                </div>
              </div>
              <PromptInput value={customPrompt} onChange={setCustomPrompt} />
            </div>

            {/* Generate button */}
            <div className="space-y-3">
              {remaining === 0 && (
                <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-sm font-medium text-amber-800">
                    You&apos;ve used all {DAILY_LIMIT} generations for today. Come back tomorrow!
                  </p>
                </div>
              )}

              {!selectedFurniture && remaining > 0 && (
                <p className="text-center text-sm text-slate-400">
                  Select a furniture piece above to enable generation
                </p>
              )}

              <Button
                onClick={generate}
                disabled={!canGenerate}
                className="h-14 w-full rounded-2xl bg-blue-600 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {isLoading ? "Generating…" : "Visualise on Furniture"}
              </Button>
            </div>
          </div>

          {/* RIGHT: Result — sticky so it stays visible while scrolling controls */}
          <div className="self-start rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-28 xl:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                04
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Your Visualisation
                </p>
                <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                  AI-Generated Preview
                </h2>
              </div>
            </div>

            <GenerationPanel
              imageUrl={imageUrl}
              isLoading={isLoading}
              error={error}
              onRegenerate={handleRegenerate}
              remaining={remaining}
              onImageLoad={() => setIsLoading(false)}
              onImageError={(msg) => {
                setError(msg || "Image failed to load. Please try again.");
                setIsLoading(false);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

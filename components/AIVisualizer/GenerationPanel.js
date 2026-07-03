"use client";

import { Download, RefreshCw, Sparkles, ImageOff, Layers } from "lucide-react";
import { useState } from "react";
import { IS_DEV } from "../../lib/visualizerUtils";
import { Button } from "../ui/button";

export default function GenerationPanel({ imageUrl, maskUrl, mode, isLoading, error, onRegenerate, remaining, onImageLoad, onImageError }) {
  const [showMask, setShowMask] = useState(false);

  const handleSave = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `helmtex-visualisation-${Date.now()}.jpg`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <div className="flex flex-col">
      {/* Result area — object-contain handles both landscape and portrait results */}
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">

        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Sparkles className="h-7 w-7 animate-pulse text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-800">Generating your visualisation…</p>
              <p className="mt-1 text-sm text-slate-500">Usually 20–60 seconds</p>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <ImageOff className="h-10 w-10 text-red-300" />
            <p className="font-semibold text-slate-700">Generation failed</p>
            <p className="text-sm text-slate-500">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              className="mt-2 rounded-full"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try again
            </Button>
          </div>
        )}

        {!imageUrl && !isLoading && !error && (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-slate-200 bg-white">
              <Sparkles className="h-8 w-8 text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-500">
              Your visualisation will appear here
            </p>
            <p className="text-xs text-slate-400">
              Select a fabric and furniture, then click Generate
            </p>
          </div>
        )}

        {/* Render the img even while isLoading so the browser starts fetching.
            onLoad/onError bubble up to the parent to clear the loading state. */}
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="AI-generated fabric visualisation"
            className={`h-full w-full rounded-[24px] object-contain transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={onImageLoad}
            onError={() => onImageError?.("The image could not be loaded. Please try again.")}
          />
        )}

        {/* Dev-only: overlay the upholstery mask returned by the backend */}
        {IS_DEV && maskUrl && showMask && !isLoading && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={maskUrl}
            alt="Upholstery mask (dev)"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-50 mix-blend-multiply"
          />
        )}
      </div>

      {/* Action bar */}
      {imageUrl && !isLoading && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            {remaining} generation{remaining !== 1 ? "s" : ""} remaining today
            {mode === "creative" && " · creative mode (pattern approximate)"}
          </p>
          <div className="flex gap-2">
            {IS_DEV && maskUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMask((v) => !v)}
                className="rounded-full border-slate-200"
              >
                <Layers className="h-3.5 w-3.5" />
                {showMask ? "Hide mask" : "Show mask"}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              className="rounded-full border-slate-200"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerate
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <Download className="h-3.5 w-3.5" />
              Save Image
            </Button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
        {mode === "creative"
          ? "Creative mode images are AI-imagined concepts — the fabric pattern is approximate. Always request a physical sample before ordering."
          : "Visualisations are digital previews. Actual fabric colour and texture may differ — always request a physical sample before ordering."}
      </p>
    </div>
  );
}

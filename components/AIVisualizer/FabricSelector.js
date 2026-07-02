"use client";

import { Check, Search, Upload, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { getFabricAttributes } from "../../lib/fabricFilters";
import subset from "../../lib/subset";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";

// Flatten the catalog into a searchable list (same pattern as Products.js)
const catalogFabrics = subset.flatMap((rangeGroup) => {
  const rangeName = Object.keys(rangeGroup)[0];
  if (!rangeName) return [];
  return Object.entries(rangeGroup[rangeName] || {}).map(([key, value]) => {
    const { colour } = getFabricAttributes(rangeName, value?.content);
    return { key: `${rangeName}-${key}`, rangeName, colour, ...value };
  });
});

// ─── Resize + encode ─────────────────────────────────────────────────────────
// Pollinations vision API accepts base64 data URLs. We resize first to keep the
// payload small (512px longest side, JPEG 85%) so the fetch is fast.

function resizeToBase64(file, maxPx = 512) {
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
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("load")); };
    img.src = objectUrl;
  });
}

// ─── Pollinations vision API ──────────────────────────────────────────────────
// Free OpenAI-compatible text API. Called from the browser so Node.js DNS issues
// don't apply. Falls back to canvas colour extraction if this fails.

async function analyseWithAI(base64DataUrl) {
  const res = await fetch("https://text.pollinations.ai/openai/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai",
      messages: [{
        role: "user",
        content: [
          { type: "image_url", image_url: { url: base64DataUrl } },
          {
            type: "text",
            text: "Describe this upholstery fabric swatch in 1-2 sentences for an interior designer. Include: main colours, pattern type (e.g. chevron, geometric, plain, striped, floral, diamond, abstract), and texture (e.g. woven, velvet, linen, textured). Be specific and concise.",
          },
        ],
      }],
      max_tokens: 120,
    }),
  });
  if (!res.ok) throw new Error(`vision API ${res.status}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("empty response");
  return text;
}

// ─── Canvas colour extraction (fallback) ─────────────────────────────────────
// If the vision API fails we fall back to pixel-level hue analysis so the
// description is at least seeded with the dominant colours.

function rgbToHue(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max - min < 0.12) return null;
  let h;
  if (max === r) h = ((g - b) / (max - min)) % 6;
  else if (max === g) h = (b - r) / (max - min) + 2;
  else h = (r - g) / (max - min) + 4;
  return ((h * 60) + 360) % 360;
}

const HUE_NAMES = ["red", "orange", "yellow", "green", "teal", "blue", "indigo", "purple", "pink", "red", "red", "red"];

function extractColourHint(blobUrl) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 80; canvas.height = 80;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 80, 80);
      const { data } = ctx.getImageData(0, 0, 80, 80);
      const buckets = new Array(12).fill(0);
      for (let i = 0; i < data.length; i += 16) {
        const h = rgbToHue(data[i], data[i + 1], data[i + 2]);
        if (h !== null) buckets[Math.floor(h / 30)]++;
      }
      const top = buckets
        .map((count, i) => ({ count, name: HUE_NAMES[i] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .filter((b) => b.count > 0)
        .map((b) => b.name);
      const unique = [...new Set(top)];
      resolve(unique.length > 0 ? unique : null);
    };
    img.onerror = () => resolve(null);
    img.src = blobUrl;
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FabricSelector({ selectedFabric, onSelect }) {
  const [tab, setTab] = useState("catalog");
  const [search, setSearch] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [swatchDescription, setSwatchDescription] = useState("");
  const [isAnalysing, setIsAnalysing] = useState(false);
  const fileInputRef = useRef(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return catalogFabrics.slice(0, 60);
    return catalogFabrics
      .filter((f) =>
        [f.content, f.rangeName, f.colour, f.title].some((v) =>
          v?.toLowerCase().includes(term)
        )
      )
      .slice(0, 60);
  }, [search]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedFile(file);
    setUploadedPreview(url);
    setIsAnalysing(true);
    setSwatchDescription("");

    // Tell parent: fabric selected but still analysing — disables Generate button
    onSelect({ fabricName: "", fabricColour: "", uploadedFabricDescription: "", image: url, isUpload: true, analysing: true });

    try {
      const base64 = await resizeToBase64(file);
      const description = await analyseWithAI(base64);
      setSwatchDescription(description);
      onSelect({ fabricName: "", fabricColour: "", uploadedFabricDescription: description, image: url, isUpload: true, analysing: false });
    } catch {
      // Vision API unavailable — fall back to canvas colour extraction
      const colours = await extractColourHint(url);
      const hint = colours
        ? `${colours.join(", ")} toned fabric — add pattern details (e.g. chevron, stripe, plain weave)`
        : "";
      setSwatchDescription(hint);
      onSelect({ fabricName: "", fabricColour: "", uploadedFabricDescription: hint, image: url, isUpload: true, analysing: false });
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleSwatchDescriptionChange = (val) => {
    setSwatchDescription(val);
    if (uploadedPreview) {
      onSelect({ fabricName: "", fabricColour: "", uploadedFabricDescription: val, image: uploadedPreview, isUpload: true, analysing: false });
    }
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setUploadedPreview(null);
    setSwatchDescription("");
    setIsAnalysing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onSelect(null);
  };

  return (
    <div>
      <div className="mb-4 flex gap-1 rounded-2xl bg-slate-100 p-1">
        {["catalog", "upload"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-xl py-2 text-sm font-semibold transition-all",
              tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t === "catalog" ? "Browse Catalog" : "Upload Swatch"}
          </button>
        ))}
      </div>

      {tab === "catalog" ? (
        <div className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, range or colour…"
              className="h-10 rounded-xl border-slate-200 bg-slate-50 pl-9 text-sm shadow-none focus-visible:ring-blue-400"
            />
          </div>

          <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
            {filtered.map((fabric) => {
              const isSelected = selectedFabric?.key === fabric.key;
              return (
                <button
                  key={fabric.key}
                  type="button"
                  onClick={() =>
                    onSelect({ key: fabric.key, fabricName: fabric.rangeName, fabricColour: fabric.colour || fabric.content, image: fabric.image, isUpload: false })
                  }
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 transition-all",
                    isSelected ? "border-blue-600 shadow-md shadow-blue-100" : "border-transparent hover:border-slate-300"
                  )}
                  title={`${fabric.content} — ${fabric.rangeName}`}
                >
                  {fabric.image ? (
                    <div className="relative h-16 w-full bg-slate-100">
                      <Image src={fabric.image} alt={fabric.content || fabric.rangeName} fill className="object-cover" sizes="80px" />
                    </div>
                  ) : (
                    <div className="h-16 w-full bg-slate-200" />
                  )}
                  {isSelected && (
                    <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <p className="truncate p-1 text-center text-[10px] font-medium text-slate-600">{fabric.content}</p>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="py-4 text-center text-sm text-slate-400">No fabrics match &ldquo;{search}&rdquo;</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {uploadedPreview ? (
            <div className="relative overflow-hidden rounded-2xl border-2 border-blue-500 bg-slate-50">
              <div className="relative h-40 w-full">
                <Image src={uploadedPreview} alt="Uploaded fabric swatch" fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <p className="truncate text-sm font-medium text-slate-700">{uploadedFile?.name}</p>
                <button
                  type="button"
                  onClick={clearUpload}
                  className="ml-2 shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50/40 hover:text-blue-600"
            >
              <Upload className="h-8 w-8" />
              <span className="text-sm font-medium">Click to upload a fabric swatch</span>
              <span className="text-xs text-slate-400">JPG, PNG, WEBP</span>
            </button>
          )}

          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

          <div>
            <label htmlFor="swatch-description" className="mb-1.5 block text-xs font-semibold text-slate-600">
              Fabric description{" "}
              <span className="font-normal text-slate-400">(auto-filled by AI, edit if needed)</span>
            </label>

            {isAnalysing ? (
              <div className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-3.5">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-300 border-t-blue-600" />
                <span className="text-sm text-blue-700">Analysing fabric with AI…</span>
              </div>
            ) : (
              <textarea
                id="swatch-description"
                value={swatchDescription}
                onChange={(e) => handleSwatchDescriptionChange(e.target.value)}
                rows={3}
                placeholder="Upload a swatch above — AI will describe it automatically, or type here manually…"
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            )}

            {!isAnalysing && (
              <p className="mt-1 text-[11px] text-slate-400">
                {swatchDescription
                  ? "AI-generated — edit or refine before generating."
                  : uploadedPreview
                    ? "Add a description so the AI knows what colours and pattern to generate."
                    : "Upload a swatch and AI will describe it for you automatically."}
              </p>
            )}
          </div>
        </div>
      )}

      {selectedFabric && !selectedFabric.isUpload && tab === "catalog" && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2">
          <Check className="h-4 w-4 shrink-0 text-blue-600" />
          <p className="text-xs font-semibold text-blue-700">
            {selectedFabric.fabricColour} — {selectedFabric.fabricName}
          </p>
        </div>
      )}
    </div>
  );
}

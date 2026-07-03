"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { FURNITURE_TEMPLATES } from "../../lib/visualizerUtils";

// Professional SVG silhouettes for each furniture type
const FurnitureIcon = ({ id, className }) => {
  const base = { fill: "none", xmlns: "http://www.w3.org/2000/svg", className, "aria-hidden": "true", focusable: "false" };

  switch (id) {
    case "sofa":
      return (
        <svg viewBox="0 0 64 44" {...base}>
          {/* back */}
          <rect x="8" y="2" width="48" height="16" rx="4" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.5"/>
          {/* left arm */}
          <rect x="2" y="9" width="8" height="22" rx="3" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.5"/>
          {/* right arm */}
          <rect x="54" y="9" width="8" height="22" rx="3" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.5"/>
          {/* seat */}
          <rect x="8" y="18" width="48" height="13" rx="3" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5"/>
          {/* cushion dividers */}
          <line x1="27" y1="18" x2="27" y2="31" stroke="currentColor" strokeWidth="1" strokeOpacity=".4"/>
          <line x1="37" y1="18" x2="37" y2="31" stroke="currentColor" strokeWidth="1" strokeOpacity=".4"/>
          {/* legs */}
          <rect x="11" y="31" width="5" height="9" rx="2" fill="currentColor" fillOpacity=".3"/>
          <rect x="48" y="31" width="5" height="9" rx="2" fill="currentColor" fillOpacity=".3"/>
        </svg>
      );
    case "armchair":
      return (
        <svg viewBox="0 0 52 44" {...base}>
          {/* back */}
          <rect x="8" y="2" width="36" height="16" rx="4" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.5"/>
          {/* left arm */}
          <rect x="2" y="9" width="8" height="20" rx="3" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.5"/>
          {/* right arm */}
          <rect x="42" y="9" width="8" height="20" rx="3" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.5"/>
          {/* seat */}
          <rect x="8" y="18" width="36" height="11" rx="3" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5"/>
          {/* legs */}
          <rect x="12" y="29" width="5" height="10" rx="2" fill="currentColor" fillOpacity=".3"/>
          <rect x="35" y="29" width="5" height="10" rx="2" fill="currentColor" fillOpacity=".3"/>
        </svg>
      );
    case "ottoman":
      return (
        <svg viewBox="0 0 64 38" {...base}>
          {/* top cushion */}
          <rect x="4" y="6" width="56" height="20" rx="5" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5"/>
          {/* seam line */}
          <line x1="4" y1="16" x2="60" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity=".3"/>
          {/* tufting dots */}
          <circle cx="20" cy="11" r="1.5" fill="currentColor" fillOpacity=".4"/>
          <circle cx="32" cy="11" r="1.5" fill="currentColor" fillOpacity=".4"/>
          <circle cx="44" cy="11" r="1.5" fill="currentColor" fillOpacity=".4"/>
          {/* legs */}
          <rect x="10" y="26" width="5" height="10" rx="2" fill="currentColor" fillOpacity=".3"/>
          <rect x="22" y="26" width="5" height="10" rx="2" fill="currentColor" fillOpacity=".3"/>
          <rect x="37" y="26" width="5" height="10" rx="2" fill="currentColor" fillOpacity=".3"/>
          <rect x="49" y="26" width="5" height="10" rx="2" fill="currentColor" fillOpacity=".3"/>
        </svg>
      );
    case "dining-chair":
      return (
        <svg viewBox="0 0 44 52" {...base}>
          {/* back rest */}
          <rect x="8" y="2" width="28" height="22" rx="4" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.5"/>
          {/* back horizontal rails */}
          <line x1="8" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity=".35"/>
          <line x1="8" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1" strokeOpacity=".35"/>
          {/* seat */}
          <rect x="6" y="24" width="32" height="10" rx="3" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5"/>
          {/* front legs */}
          <line x1="11" y1="34" x2="9" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="33" y1="34" x2="35" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* back legs */}
          <line x1="11" y1="34" x2="11" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="33" y1="34" x2="33" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case "bench":
      return (
        <svg viewBox="0 0 72 38" {...base}>
          {/* top cushion */}
          <rect x="2" y="8" width="68" height="14" rx="4" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5"/>
          {/* cushion seam */}
          <line x1="36" y1="8" x2="36" y2="22" stroke="currentColor" strokeWidth="1" strokeOpacity=".35"/>
          {/* trestle left */}
          <line x1="14" y1="22" x2="10" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="22" y1="22" x2="18" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="10" y1="36" x2="22" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* trestle right */}
          <line x1="50" y1="22" x2="54" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="58" y1="22" x2="62" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="50" y1="36" x2="62" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case "headboard":
      return (
        <svg viewBox="0 0 60 52" {...base}>
          {/* headboard panel */}
          <rect x="2" y="2" width="56" height="38" rx="5" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.5"/>
          {/* tufting horizontal lines */}
          <line x1="10" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity=".3"/>
          <line x1="10" y1="22" x2="50" y2="22" stroke="currentColor" strokeWidth="1" strokeOpacity=".3"/>
          <line x1="10" y1="32" x2="50" y2="32" stroke="currentColor" strokeWidth="1" strokeOpacity=".3"/>
          {/* tufting dots */}
          <circle cx="20" cy="17" r="1.5" fill="currentColor" fillOpacity=".35"/>
          <circle cx="30" cy="17" r="1.5" fill="currentColor" fillOpacity=".35"/>
          <circle cx="40" cy="17" r="1.5" fill="currentColor" fillOpacity=".35"/>
          <circle cx="20" cy="27" r="1.5" fill="currentColor" fillOpacity=".35"/>
          <circle cx="30" cy="27" r="1.5" fill="currentColor" fillOpacity=".35"/>
          <circle cx="40" cy="27" r="1.5" fill="currentColor" fillOpacity=".35"/>
          {/* mattress rail */}
          <rect x="2" y="40" width="56" height="6" rx="2" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="1.5"/>
          {/* legs */}
          <rect x="8" y="46" width="5" height="6" rx="1.5" fill="currentColor" fillOpacity=".3"/>
          <rect x="47" y="46" width="5" height="6" rx="1.5" fill="currentColor" fillOpacity=".3"/>
        </svg>
      );
    default:
      return null;
  }
};

// Template thumbnail: shows the real bundled photo (the same one the backend
// composites onto) and falls back to the SVG silhouette while it's missing.
const TemplateThumb = ({ item, isSelected }) => {
  const [failed, setFailed] = useState(false);
  if (!item.image || failed) {
    return (
      <FurnitureIcon
        id={item.id}
        className={cn(
          "h-10 w-full transition-colors",
          isSelected ? "text-blue-600" : "text-slate-400 group-hover:text-blue-400"
        )}
      />
    );
  }
  return (
    <div className="relative h-16 w-full overflow-hidden rounded-xl bg-slate-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.label}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

export default function FurniturePicker({ selectedFurniture, onSelect }) {
  const [tab, setTab] = useState("template");
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [furnitureDescription, setFurnitureDescription] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedFile(file);
    setUploadedPreview(url);
    // `file` carries the actual photo to the precise pipeline; the text
    // description is only used by the creative fallback.
    onSelect({
      furnitureType: furnitureDescription || "custom furniture piece",
      furnitureDescription: furnitureDescription || "a custom upholstered furniture piece",
      previewImage: url,
      file,
      isUpload: true,
    });
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setUploadedPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onSelect(null);
  };

  const handleDescriptionChange = (val) => {
    setFurnitureDescription(val);
    if (uploadedPreview) {
      onSelect({
        furnitureType: val || "custom furniture piece",
        furnitureDescription: val || "a custom upholstered furniture piece",
        previewImage: uploadedPreview,
        file: uploadedFile,
        isUpload: true,
      });
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-1 rounded-2xl bg-slate-100 p-1">
        {["template", "upload"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-xl py-2 text-sm font-semibold transition-all",
              tab === t
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t === "template" ? "Choose Template" : "Upload Your Own"}
          </button>
        ))}
      </div>

      {tab === "template" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {FURNITURE_TEMPLATES.map((item) => {
            const isSelected = selectedFurniture?.furnitureType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onSelect({
                    furnitureType: item.id,
                    furnitureDescription: item.description,
                    isUpload: false,
                  })
                }
                className={cn(
                  "group relative flex flex-col items-center gap-3 rounded-2xl border-2 px-3 py-5 transition-all duration-200",
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                )}
              >
                {isSelected && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
                <TemplateThumb item={item} isSelected={isSelected} />
                <div className="text-center">
                  <p className={cn(
                    "text-sm font-semibold",
                    isSelected ? "text-blue-700" : "text-slate-800"
                  )}>
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {uploadedPreview ? (
            <div className="relative overflow-hidden rounded-2xl border-2 border-blue-500 bg-slate-50">
              <div className="relative h-44 w-full">
                <Image
                  src={uploadedPreview}
                  alt="Your furniture"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <p className="truncate text-sm font-medium text-slate-700">
                  {uploadedFile?.name}
                </p>
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
              <span className="text-sm font-medium">Upload a photo of your furniture</span>
              <span className="text-xs text-slate-400">Only the upholstered areas change — frame, legs and background stay intact</span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div>
            <label htmlFor="furniture-description" className="mb-1.5 block text-xs font-semibold text-slate-600">
              Describe your furniture{" "}
              <span className="font-normal text-slate-400">(type, style, material)</span>
            </label>
            <textarea
              id="furniture-description"
              value={furnitureDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              rows={3}
              placeholder="e.g. a vintage chesterfield sofa with button-tufted back, dark walnut legs…"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      )}
    </div>
  );
}

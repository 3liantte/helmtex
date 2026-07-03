"use client";

import { Lightbulb } from "lucide-react";

const EXAMPLES = [
  "Cover only the seat cushions, leave the frame in natural oak",
  "Apply fabric to the back and sides only, with contrast piping",
  "Full wrap including the legs, in a tight pattern repeat",
  "Headboard centre panel only, frame in matching trim",
];

export default function PromptInput({ value, onChange, scale = 1, onScaleChange }) {
  return (
    <div className="space-y-4">
      {/* Pattern scale — drives the precise pipeline's fabric repeat size */}
      <div>
        <label htmlFor="fabric-scale" className="mb-1.5 flex items-baseline justify-between text-xs font-semibold text-slate-600">
          <span>Pattern size</span>
          <span className="font-normal text-slate-400">{scale.toFixed(1)}×</span>
        </label>
        <input
          id="fabric-scale"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => onScaleChange?.(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
        <p className="mt-1 text-[11px] text-slate-400">
          How large the fabric repeat appears on the furniture. 1× ≈ natural upholstery scale.
        </p>
      </div>

      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder="Describe how the fabric should be applied… (optional, creative mode only)"
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
          <div className="mb-2 flex items-center gap-2">
            <Lightbulb className="h-3.5 w-3.5 shrink-0 text-amber-600" />
            <p className="text-xs font-semibold text-amber-800">
              Prompt ideas <span className="font-normal">(only affect the creative fallback — the precise pipeline uses your images directly)</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => onChange(ex)}
                className="rounded-full border border-amber-200 bg-white px-3 py-1 text-[11px] font-medium text-amber-800 transition hover:bg-amber-100"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

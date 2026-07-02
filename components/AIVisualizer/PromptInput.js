"use client";

import { Lightbulb } from "lucide-react";

const EXAMPLES = [
  "Cover only the seat cushions, leave the frame in natural oak",
  "Apply fabric to the back and sides only, with contrast piping",
  "Full wrap including the legs, in a tight pattern repeat",
  "Headboard centre panel only, frame in matching trim",
];

export default function PromptInput({ value, onChange }) {
  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="Describe how the fabric should be applied… (optional)"
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5 shrink-0 text-amber-600" />
          <p className="text-xs font-semibold text-amber-800">Prompt ideas</p>
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
  );
}

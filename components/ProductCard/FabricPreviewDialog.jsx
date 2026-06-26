"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import FabricInspectImage from "./FabricInspectImage";

function FabricPreviewDialog({ selectedImage, onClose }) {
  const rangeSlug = selectedImage?.rangeSlug ?? null;

  return (
    <Dialog
      open={Boolean(selectedImage)}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="w-full max-w-6xl border-0 bg-slate-950/95 p-0 text-white max-h-[100dvh] overflow-hidden">
        <DialogTitle className="sr-only">
          {selectedImage?.alt || "Fabric Preview"}
        </DialogTitle>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Image area */}
          <div className="relative h-[55vh] sm:h-[62vh] lg:h-[70vh] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_55%),linear-gradient(180deg,_rgba(15,23,42,0.92),_rgba(2,6,23,1))] p-4 sm:p-6">
            {selectedImage ? (
              <FabricInspectImage
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="rounded-[28px] border border-white/10 bg-slate-900/40"
                hint="Move across fabric to zoom"
                imageClassName="object-contain"
                lensSize={230}
                priority
                sizes="100vw"
                zoomFactor={3}
              />
            ) : null}

            {/* Mobile: Technical Specs pill — side panel is hidden on mobile */}
            {rangeSlug && (
              <div className="absolute bottom-5 right-5 lg:hidden">
                <Link href={`/range/${rangeSlug}`} onClick={onClose}>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-slate-800">
                    <FileText className="h-3.5 w-3.5" />
                    Technical Specs
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Side panel — desktop only */}
          <div className="hidden lg:flex lg:flex-col border-l border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
              Fabric Preview
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">
              {selectedImage?.alt || "Zoomed fabric view"}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Hover across the image to inspect the weave, colour blend, and
              surface texture in more detail before requesting a sample.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                Tip
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The lens gives the best close-up control on desktop. On touch
                devices, this preview still opens the fabric at its largest size.
              </p>
            </div>

            {rangeSlug && (
              <div className="mt-auto pt-6">
                <Link href={`/range/${rangeSlug}`} onClick={onClose}>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                  >
                    <FileText className="h-4 w-4" />
                    Technical Specifications
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FabricPreviewDialog;

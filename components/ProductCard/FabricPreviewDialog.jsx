"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import FabricInspectImage from "./FabricInspectImage";

function FabricPreviewDialog({ selectedImage, onClose }) {
  return (
    <Dialog
      open={Boolean(selectedImage)}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="w-full max-w-6xl overflow-hidden border-0 bg-slate-950/95 p-0 text-white">
        <DialogTitle className="sr-only">
          {selectedImage?.alt || "Fabric Preview"}
        </DialogTitle>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="relative h-[70vh] min-h-[420px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_55%),linear-gradient(180deg,_rgba(15,23,42,0.92),_rgba(2,6,23,1))] p-4 sm:p-6">
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
          </div>

          <div className="border-t border-white/10 bg-white/5 p-6 lg:border-l lg:border-t-0">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FabricPreviewDialog;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { Lens } from "../ui/lens";

function FabricInspectImage({
  src,
  alt,
  sizes,
  priority = false,
  zoomFactor = 2.4,
  lensSize = 180,
  className,
  imageClassName,
  hint = "Hover to inspect weave",
  lensMediaQuery = "(min-width: 1024px)",
  showHint = true,
  children,
}) {
  const [isLensEnabled, setIsLensEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(lensMediaQuery);

    const updateLensState = (event) => {
      setIsLensEnabled(event.matches);
    };

    setIsLensEnabled(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateLensState);

    return () => {
      mediaQuery.removeEventListener("change", updateLensState);
    };
  }, [lensMediaQuery]);

  const imageNode = (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        className={cn("object-cover", imageClassName)}
        fill
        priority={priority}
        sizes={sizes}
      />
    </div>
  );

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[inherit]",
        className
      )}
    >
      {isLensEnabled ? (
        <Lens
          ariaLabel={`${alt} zoom preview`}
          className="h-full w-full rounded-[inherit]"
          lensSize={lensSize}
          zoomFactor={zoomFactor}
        >
          {imageNode}
        </Lens>
      ) : (
        imageNode
      )}

      {children ? (
        <div className="pointer-events-none absolute inset-0 z-30">
          {children}
        </div>
      ) : null}

      {showHint && isLensEnabled ? (
        <div className="pointer-events-none absolute bottom-4 left-4 z-40 hidden items-center gap-2 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-sm lg:flex">
          <Search className="h-3.5 w-3.5" />
          <span>{hint}</span>
        </div>
      ) : null}
    </div>
  );
}

export default FabricInspectImage;

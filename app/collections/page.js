"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronUp, Search, X } from "lucide-react";
import subset from "../../lib/subset";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { getFabricAttributes } from "../../lib/fabricFilters";
import { getRangeMeta } from "../../lib/rangeCatalog";

const Collection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");
  const title = searchParams.get("title");
  const router = useRouter();

  const matchedSubset = useMemo(() => {
    if (!title) {
      return null;
    }

    return (
      subset.find((range) => {
        const category = Object.keys(range)[0];
        return category === title;
      }) || null
    );
  }, [title]);

  useEffect(() => {
    setSearchTerm("");
  }, [title]);

  const handleClickBack = () => {
    router.push("/products");
  };

  const openImageDialog = (imageSrc, imageAlt) => {
    if (!imageSrc) {
      return;
    }

    setSelectedImage({ src: imageSrc, alt: imageAlt });
  };

  const scrollToTop = () => {
    const currentPosition = window.pageYOffset;

    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const duration = 500;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - (1 - progress) ** 3;

      window.scrollTo(0, currentPosition * (1 - easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const rangeName = matchedSubset ? Object.keys(matchedSubset)[0] : title || "";
  const rangeItems = (matchedSubset && Object.values(matchedSubset)[0]) || {};
  const fabrics = useMemo(
    () =>
      Object.entries(rangeItems).map(([key, value]) => {
        const { fabricType, colour } = getFabricAttributes(
          rangeName,
          value?.content
        );

        return {
          key,
          ...value,
          fabricType,
          colour,
        };
      }),
    [rangeItems, rangeName]
  );
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredFabrics = useMemo(
    () =>
      fabrics.filter(
        (fabric) =>
          !normalizedSearchTerm ||
          [fabric.title, fabric.content, fabric.fabricType, fabric.colour].some(
            (field) => field?.toLowerCase().includes(normalizedSearchTerm)
          )
      ),
    [fabrics, normalizedSearchTerm]
  );
  const rangeMeta = useMemo(() => getRangeMeta(rangeName), [rangeName]);
  const previewImage =
    imageUrl ||
    rangeMeta?.imageUrl ||
    fabrics[0]?.image ||
    "/api/placeholder/800/500";

  return (
    <section className="bg-gray-50">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.55)]">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1.4fr)_380px] lg:px-8 lg:py-10 xl:gap-12 xl:px-10">
            <div className="text-white">
              <Button
                variant="outline"
                className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                onClick={handleClickBack}
              >
                <ArrowLeft className="h-4 w-4" />
                Back To Explorer
              </Button>

              <div className="mt-6">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
                  Collection View
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  {rangeName || "Fabric Collection"}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Browse every design inside this range. The broader range and
                  colour filters stay on the products landing page, while this page
                  focuses on the details inside one collection.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                    Designs
                  </p>
                  <p className="mt-1 text-lg font-semibold">{fabrics.length}</p>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                    Showing
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {filteredFabrics.length}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openImageDialog(previewImage, rangeName || "Collection preview")
              }
              className="group relative min-h-[280px] overflow-hidden rounded-[24px] border border-white/10 bg-white/10 text-left xl:min-h-[320px]"
            >
              <Image
                src={previewImage}
                alt={rangeName || "Collection preview"}
                className="object-cover transition duration-500 group-hover:scale-105"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                  Range Preview
                </p>
                <p className="mt-2 text-xl font-semibold">{rangeName}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {rangeMeta?.description ||
                    "Open a design to inspect the fabric image more closely."}
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:p-7">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start xl:gap-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by design name, code, type or colour..."
                  className="h-12 rounded-full border-slate-200 bg-slate-50 pl-11 pr-4 text-sm shadow-none focus-visible:bg-white focus-visible:ring-blue-400"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {filteredFabrics.length} of {fabrics.length} fabrics
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  Digital fabric images may vary in colour and texture from the
                  actual material. Please request a sample for accurate
                  evaluation.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                In This Range
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {rangeName}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use the search to find a specific fabric name, code, type, or
                colour inside this collection.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {matchedSubset ? (
            filteredFabrics.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500 shadow-sm">
                No fabrics match your search in this range.
              </div>
            ) : (
              filteredFabrics.map((fabric) => (
                <article
                  key={fabric.key}
                  className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {fabric.image ? (
                    <button
                      type="button"
                      onClick={() =>
                        openImageDialog(
                          fabric.image,
                          fabric.content || fabric.title || "Fabric image"
                        )
                      }
                      className="relative block h-56 w-full overflow-hidden bg-slate-100 text-left"
                    >
                      <Image
                        src={fabric.image}
                        alt={fabric.content || fabric.title || "Fabric image"}
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute right-4 top-4 rounded-full bg-slate-900/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                        {fabric.title}
                      </div>
                    </button>
                  ) : null}

                  <div className="space-y-4 p-5">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {fabric.content}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500">
                        Design code {fabric.title}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {fabric.fabricType ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {fabric.fabricType}
                        </span>
                      ) : null}
                      {fabric.colour ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {fabric.colour}
                        </span>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openImageDialog(
                          fabric.image,
                          fabric.content || fabric.title || "Fabric image"
                        )
                      }
                      className="text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                    >
                      Preview Fabric
                    </button>
                  </div>
                </article>
              ))
            )
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500 shadow-sm">
              Product coming soon.
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={Boolean(selectedImage)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedImage(null);
          }
        }}
      >
        <DialogContent className="max-w-5xl w-full overflow-hidden bg-black/90 p-0">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || "Image Preview"}
          </DialogTitle>
          <div className="absolute right-2 top-2 z-10">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 rounded-full p-0 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </div>
          <div className="relative flex h-[80vh] w-full items-center justify-center">
            {selectedImage ? (
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="object-contain"
                fill
                sizes="100vw"
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-8 right-8 z-50 transition-all duration-500 ease-in-out transform">
        <Button
          onClick={scrollToTop}
          className="group h-10 w-10 rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <ChevronUp className="animate-bounce-subtle transform transition-transform duration-300 group-hover:-translate-y-1" />
        </Button>
      </div>
    </section>
  );
};

const CollectionPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">Loading...</div>
      }
    >
      <Collection />
    </Suspense>
  );
};

export default CollectionPage;

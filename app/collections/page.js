/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronUp, FileText, Search } from "lucide-react";
import subset from "../../lib/subset";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import FabricInspectImage from "../../components/ProductCard/FabricInspectImage";
import FabricPreviewDialog from "../../components/ProductCard/FabricPreviewDialog";
import { getFabricAttributes } from "../../lib/fabricFilters";
import { getRangeMeta, getRangeSlug } from "../../lib/rangeCatalog";

const Collection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredFabricKey, setHoveredFabricKey] = useState("");
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

  const openImageDialog = (imageSrc, imageAlt, rangeSlug = null) => {
    if (!imageSrc) {
      return;
    }

    setSelectedImage({ src: imageSrc, alt: imageAlt, rangeSlug });
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
  const rangeItems = useMemo(
    () => (matchedSubset && Object.values(matchedSubset)[0]) || {},
    [matchedSubset]
  );
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
  const previewFabric = useMemo(
    () =>
      filteredFabrics.find((fabric) => fabric.key === hoveredFabricKey) || null,
    [filteredFabrics, hoveredFabricKey]
  );
  const previewImage =
    previewFabric?.image ||
    imageUrl ||
    rangeMeta?.imageUrl ||
    fabrics[0]?.image ||
    "/api/placeholder/800/500";
  const previewAlt =
    previewFabric?.content ||
    previewFabric?.title ||
    rangeName ||
    "Collection preview";
  const previewTitle =
    previewFabric?.content || rangeName || "Collection preview";
  const previewMeta = previewFabric
    ? `${previewFabric.title}${
        previewFabric.colour ? ` / ${previewFabric.colour}` : ""
      }`
    : `${filteredFabrics.length} designs`;
  const previewDescription = previewFabric
    ? `Move across ${previewFabric.content || previewFabric.title} to inspect the weave, colour blend, and surface texture before opening the full preview.`
    : rangeMeta?.description ||
      "Open a design to inspect the fabric image more closely.";

  const handlePreviewHover = (fabricKey) => {
    setHoveredFabricKey(fabricKey);
  };

  const handlePreviewLeave = (fabricKey) => {
    setHoveredFabricKey((currentKey) =>
      currentKey === fabricKey ? "" : currentKey
    );
  };

  const handlePreviewBlur = (event, fabricKey) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      handlePreviewLeave(fabricKey);
    }
  };

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
                openImageDialog(previewImage, previewAlt, getRangeSlug(rangeName))
              }
              className="group relative min-h-[280px] overflow-hidden rounded-[24px] border border-white/10 bg-white/10 text-left xl:min-h-[320px]"
            >
              <FabricInspectImage
                src={previewImage}
                alt={previewAlt}
                hint="Hover to inspect weave"
                lensSize={210}
                priority
                sizes="(max-width: 1024px) 100vw, 320px"
                zoomFactor={2.8}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5 text-white">
                  <span className="rounded-full border border-white/10 bg-slate-950/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-100 backdrop-blur-sm">
                    Weave Inspect
                  </span>
                  <span className="rounded-full border border-white/10 bg-slate-950/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {previewMeta}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                    Range Preview
                  </p>
                  <p className="mt-2 text-xl font-semibold">{previewTitle}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {previewDescription}
                  </p>
                </div>
              </FabricInspectImage>
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
                  onBlur={(event) => handlePreviewBlur(event, fabric.key)}
                  onMouseEnter={() => handlePreviewHover(fabric.key)}
                  onMouseLeave={() => handlePreviewLeave(fabric.key)}
                  onFocus={() => handlePreviewHover(fabric.key)}
                  className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {fabric.image ? (
                    <button
                      type="button"
                      onClick={() =>
                        openImageDialog(
                          fabric.image,
                          fabric.content || fabric.title || "Fabric image",
                          getRangeSlug(rangeName)
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

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          openImageDialog(
                            fabric.image,
                            fabric.content || fabric.title || "Fabric image",
                            getRangeSlug(rangeName)
                          )
                        }
                        className="text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                      >
                        Preview Fabric
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/range/${getRangeSlug(rangeName)}`)
                        }
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-blue-700"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Technical Specs
                      </button>
                    </div>
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

      <FabricPreviewDialog
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

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

/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, ChevronUp, FileText, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import subset from "../../lib/subset";
import FabricInspectImage from "./FabricInspectImage";
import FabricPreviewDialog from "./FabricPreviewDialog";
import {
  getColourSwatchStyle,
  getColourFamily,
  getFabricAttributes,
  getGroupedColourOptions,
} from "../../lib/fabricFilters";
import { getRangeMeta, getRangeSlug, rangeCatalog } from "../../lib/rangeCatalog";

const subsetByRange = Object.fromEntries(
  subset.map((rangeGroup) => {
    const rangeName = Object.keys(rangeGroup)[0];
    return [rangeName, rangeGroup[rangeName]];
  })
);

const orderedRangeNames = [
  ...new Set([
    ...rangeCatalog.map((range) => range.title),
    ...Object.keys(subsetByRange),
  ]),
];

const fabricsByRange = Object.fromEntries(
  orderedRangeNames.map((rangeName) => {
    const fabrics = Object.entries(subsetByRange[rangeName] || {}).map(
      ([key, value]) => {
        const { fabricType, colour } = getFabricAttributes(
          rangeName,
          value?.content
        );
        const colourFamily = getColourFamily(colour);

        return {
          key: `${rangeName}-${key}`,
          rangeName,
          ...value,
          fabricType,
          colour,
          colourFamilyKey: colourFamily.key,
          colourFamilyLabel: colourFamily.label,
        };
      }
    );

    return [rangeName, fabrics];
  })
);

const rangeSummaries = orderedRangeNames.map((rangeName) => {
  const meta = getRangeMeta(rangeName);
  const fabrics = fabricsByRange[rangeName] || [];

  return {
    title: rangeName,
    description:
      meta?.description ||
      `Explore the ${rangeName} fabric collection from Helm Textile Mills.`,
    imageUrl: meta?.imageUrl || fabrics[0]?.image || "/api/placeholder/800/500",
    count: fabrics.length,
  };
});

const rangeSummaryMap = Object.fromEntries(
  rangeSummaries.map((range) => [range.title, range])
);

const allFabrics = orderedRangeNames.flatMap(
  (rangeName) => fabricsByRange[rangeName] || []
);

const DEFAULT_VISIBLE_COLOUR_GROUPS = 6;

function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRange, setSelectedRange] = useState(() => {
    const rangeParam = searchParams.get("range") || "";
    return rangeSummaries.some((r) => r.title === rangeParam) ? rangeParam : "";
  });
  const [selectedColourFamily, setSelectedColourFamily] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredFabricKey, setHoveredFabricKey] = useState("");
  const [showAllColourFamilies, setShowAllColourFamilies] = useState(false);
  const [colourSearch, setColourSearch] = useState("");
  const [isMobileRangeOpen, setIsMobileRangeOpen] = useState(false);
  const [isMobileColourOpen, setIsMobileColourOpen] = useState(false);

  const baseFabrics = useMemo(
    () => (selectedRange ? fabricsByRange[selectedRange] || [] : allFabrics),
    [selectedRange]
  );
  const colourOptions = useMemo(
    () => getGroupedColourOptions(baseFabrics.map((fabric) => fabric.colour)),
    [baseFabrics]
  );
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredFabrics = useMemo(
    () =>
      baseFabrics.filter((fabric) => {
        const matchesSearch =
          !normalizedSearchTerm ||
          [
            fabric.title,
            fabric.content,
            fabric.fabricType,
            fabric.colour,
            fabric.rangeName,
          ].some((field) => field?.toLowerCase().includes(normalizedSearchTerm));
        const matchesColour =
          !selectedColourFamily ||
          fabric.colourFamilyKey === selectedColourFamily;

        return matchesSearch && matchesColour;
      }),
    [baseFabrics, normalizedSearchTerm, selectedColourFamily]
  );
  const selectedRangeSummary = useMemo(
    () => (selectedRange ? rangeSummaryMap[selectedRange] : null),
    [selectedRange]
  );
  const previewFabric = useMemo(
    () =>
      filteredFabrics.find((fabric) => fabric.key === hoveredFabricKey) || null,
    [filteredFabrics, hoveredFabricKey]
  );
  const previewImage =
    previewFabric?.image ||
    selectedRangeSummary?.imageUrl ||
    filteredFabrics[0]?.image ||
    rangeSummaries[0]?.imageUrl ||
    "/api/placeholder/800/500";
  const previewTitle =
    previewFabric?.content || selectedRange || "All Collections";
  const previewAlt =
    previewFabric?.content ||
    previewFabric?.title ||
    selectedRange ||
    "Fabric preview";
  const previewDescription = previewFabric
    ? `Move across ${previewFabric.content || previewFabric.title} to inspect the weave, colour blend, and surface texture before opening the full preview.`
    : selectedRangeSummary?.description ||
      "Use the explorer to narrow by range and colour before opening a full collection.";
  const previewMeta = previewFabric
    ? `${previewFabric.rangeName} / ${previewFabric.title}`
    : `${filteredFabrics.length} matches`;
  const hasActiveFilters = Boolean(
    selectedRange || selectedColourFamily || normalizedSearchTerm
  );
  const selectedColourOption = useMemo(
    () => colourOptions.find((option) => option.key === selectedColourFamily),
    [colourOptions, selectedColourFamily]
  );
  const hasHiddenColourOptions =
    colourOptions.length > DEFAULT_VISIBLE_COLOUR_GROUPS;
  const hiddenColourCount = Math.max(
    colourOptions.length - DEFAULT_VISIBLE_COLOUR_GROUPS,
    0
  );
  const visibleColourOptions = useMemo(
    () =>
      showAllColourFamilies
        ? colourOptions
        : colourOptions.slice(0, DEFAULT_VISIBLE_COLOUR_GROUPS),
    [colourOptions, showAllColourFamilies]
  );
  const displayColourOptions = useMemo(() => {
    if (
      !showAllColourFamilies &&
      selectedColourOption &&
      !visibleColourOptions.some(
        (option) => option.key === selectedColourOption.key
      )
    ) {
      return [...visibleColourOptions, selectedColourOption];
    }

    return visibleColourOptions;
  }, [
    selectedColourOption,
    showAllColourFamilies,
    visibleColourOptions,
  ]);
  const searchedColourOptions = useMemo(() => {
    const term = colourSearch.trim().toLowerCase();
    if (!term) return displayColourOptions;
    return colourOptions.filter((option) =>
      option.label.toLowerCase().includes(term)
    );
  }, [colourSearch, colourOptions, displayColourOptions]);

  const helperText = selectedColourOption
    ? `Showing fabrics grouped under the ${selectedColourOption.label} family.`
    : selectedRange
      ? `Showing grouped colours available in ${selectedRange}.`
      : "Pick a range to narrow the available colours.";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRange("");
    setSelectedColourFamily("");
    setColourSearch("");
    setIsMobileRangeOpen(false);
    setIsMobileColourOpen(false);
  };

  const handleSelectRange = (rangeName = "") => {
    setSelectedRange(rangeName);
    setSelectedColourFamily("");
    setColourSearch("");
    setIsMobileRangeOpen(false);
  };

  const handleSelectColourFamily = (colourFamilyKey = "") => {
    setSelectedColourFamily(colourFamilyKey);
    setIsMobileColourOpen(false);
  };

  const toggleMobileRangeFilters = () => {
    setIsMobileRangeOpen((currentValue) => !currentValue);
    setIsMobileColourOpen(false);
  };

  const toggleMobileColourFilters = () => {
    setIsMobileColourOpen((currentValue) => !currentValue);
    setIsMobileRangeOpen(false);
  };

  const handleOpenRange = (rangeName) => {
    const rangeSummary = rangeSummaryMap[rangeName];
    router.push(
      `/collections/?title=${encodeURIComponent(
        rangeName
      )}&imageUrl=${encodeURIComponent(rangeSummary?.imageUrl || "")}`
    );
  };

  const openImageDialog = (imageSrc, imageAlt, rangeSlug = null) => {
    if (!imageSrc) {
      return;
    }

    setSelectedImage({ src: imageSrc, alt: imageAlt, rangeSlug });
  };

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: "Helmtex Fabric Collections",
    description:
      "Explore contract-grade upholstery, curtain, outdoor, and custom fabric ranges.",
    brand: {
      "@type": "Organization",
      name: "Helm Textile Mills",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fabric Ranges",
      itemListElement: rangeSummaries.map((range) => ({
        "@type": "Product",
        name: range.title,
        image: `https://www.helmtex.co.za${range.imageUrl}`,
        description: range.description,
      })),
    },
  };

  return (
    <>
      <Script
        id="structured-data-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gray-50">
        <div className="mx-auto w-full max-w-[1680px] px-4 py-10 sm:px-6 lg:px-6 lg:py-12">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.55)]">
            <div className="grid gap-6 px-5 py-7 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1.25fr)_400px] lg:gap-8 lg:px-8 lg:py-10 xl:gap-12 xl:px-10 xl:py-12">
              <div className="flex flex-col justify-between text-white">
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100 backdrop-blur-sm">
                    Explore Our Fabrics
                  </span>
                  <h1 className="mt-6 max-w-3xl text-[2rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    {selectedRange || "Browse Every Range"}
                  </h1>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                    {selectedRangeSummary?.description ||
                      "Filter by range and colour before opening a collection. The goal is to help someone quickly move from inspiration to the exact fabrics that fit the project."}
                  </p>

                  <div className="mt-8 hidden max-w-3xl grid-cols-2 gap-3 sm:grid sm:grid-cols-3">
                    <div className="min-h-[104px] rounded-[20px] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur-sm sm:min-h-[120px] sm:rounded-[22px]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                        Ranges
                      </p>
                      <p className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {rangeSummaries.length}
                      </p>
                      <p className="mt-1 hidden text-sm text-slate-300 sm:block">
                        Available collections
                      </p>
                    </div>
                    <div className="min-h-[104px] rounded-[20px] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur-sm sm:min-h-[120px] sm:rounded-[22px]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                        Fabrics
                      </p>
                      <p className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {filteredFabrics.length}
                      </p>
                      <p className="mt-1 hidden text-sm text-slate-300 sm:block">
                        Matching your filters
                      </p>
                    </div>
                    <div className="col-span-2 min-h-[104px] rounded-[20px] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur-sm sm:col-span-1 sm:min-h-[120px] sm:rounded-[22px]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                        Active Colour
                      </p>
                      <p className="mt-3 break-words text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {selectedColourOption?.label || "All"}
                      </p>
                      <p className="mt-1 hidden text-sm text-slate-300 sm:block">
                        {selectedColourOption
                          ? "Colour family applied"
                          : "No colour filter selected"}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedRange ? (
                  <div className="mt-8">
                    <Button
                      className="rounded-full bg-white px-5 text-slate-900 hover:bg-blue-50"
                      onClick={() => handleOpenRange(selectedRange)}
                    >
                      Open {selectedRange}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => openImageDialog(previewImage, previewAlt, getRangeSlug(previewFabric?.rangeName || selectedRange))}
                className="relative hidden min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-white/10 text-left lg:block xl:min-h-[340px]"
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
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
                    <span className="inline-flex rounded-full border border-white/10 bg-slate-950/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-100 backdrop-blur-sm">
                      Weave Inspect
                    </span>
                    <span className="inline-flex rounded-full border border-white/10 bg-slate-950/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      {previewMeta}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                      Current Focus
                    </p>
                    <p className="mt-3 text-2xl font-semibold">{previewTitle}</p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-200">
                      {previewDescription}
                    </p>
                  </div>
                </FabricInspectImage>
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_280px] xl:gap-8 2xl:grid-cols-[340px_minmax(0,1fr)_300px]">
            <aside className="order-2 hidden xl:order-1 xl:block">
              <div className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-28 xl:max-h-[calc(100vh-7rem)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                      Choose A Range
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">
                      Collections
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Stay within the product categories your customer actually
                      wants to see.
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {rangeSummaries.length} ranges
                  </span>
                </div>

                <div className="mt-5 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => handleSelectRange("")}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                      !selectedRange
                        ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50/40"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold">All Ranges</span>
                      <span className="text-xs uppercase tracking-[0.18em] opacity-80">
                        {allFabrics.length}
                      </span>
                    </div>
                  </button>

                  {rangeSummaries.map((range) => (
                    <button
                      key={range.title}
                      type="button"
                      onClick={() => handleSelectRange(range.title)}
                      className={cn(
                        "w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                        selectedRange === range.title
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/40"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold">{range.title}</p>
                          <p
                            className={cn(
                              "mt-1 text-xs leading-5 line-clamp-2",
                              selectedRange === range.title
                                ? "text-blue-50"
                                : "text-slate-500"
                            )}
                          >
                            {range.description}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                          {range.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <main className="order-1 xl:order-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:p-7">
                <div className="grid gap-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search by range, design, code, type or colour..."
                        className="h-12 rounded-full border-slate-200 bg-slate-50 pl-11 pr-4 text-sm shadow-none focus-visible:bg-white focus-visible:ring-blue-400"
                      />
                    </div>

                    <div className="space-y-3 xl:hidden">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={toggleMobileRangeFilters}
                          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50/70"
                          aria-expanded={isMobileRangeOpen}
                        >
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                              Collections
                            </span>
                            <span className="mt-1 block truncate text-sm font-semibold text-slate-900">
                              {selectedRange || "All ranges"}
                            </span>
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 text-slate-500 transition-transform",
                              isMobileRangeOpen && "rotate-180"
                            )}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={toggleMobileColourFilters}
                          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50/70"
                          aria-expanded={isMobileColourOpen}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <span
                              className="h-8 w-8 shrink-0 rounded-xl border border-slate-200"
                              style={getColourSwatchStyle(
                                selectedColourOption?.label || "All colours"
                              )}
                            />
                            <span className="min-w-0">
                              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                                Colour
                              </span>
                              <span className="mt-1 block truncate text-sm font-semibold text-slate-900">
                                {selectedColourOption?.label || "All colours"}
                              </span>
                            </span>
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 text-slate-500 transition-transform",
                              isMobileColourOpen && "rotate-180"
                            )}
                          />
                        </button>
                      </div>

                      {isMobileRangeOpen ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                                Choose A Range
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                Narrow the fabrics before browsing.
                              </p>
                            </div>
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {rangeSummaries.length}
                            </span>
                          </div>

                          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                            <button
                              type="button"
                              onClick={() => handleSelectRange("")}
                              className={cn(
                                "w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                                !selectedRange
                                  ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50/40"
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold">All Ranges</span>
                                <span className="text-xs uppercase tracking-[0.18em] opacity-80">
                                  {allFabrics.length}
                                </span>
                              </div>
                            </button>

                            {rangeSummaries.map((range) => (
                              <button
                                key={range.title}
                                type="button"
                                onClick={() => handleSelectRange(range.title)}
                                className={cn(
                                  "w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                                  selectedRange === range.title
                                    ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/40"
                                )}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className="font-semibold">{range.title}</p>
                                    <p
                                      className={cn(
                                        "mt-1 text-xs leading-5 line-clamp-2",
                                        selectedRange === range.title
                                          ? "text-blue-50"
                                          : "text-slate-500"
                                      )}
                                    >
                                      {range.description}
                                    </p>
                                  </div>
                                  <span className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    {range.count}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {isMobileColourOpen ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                                Select A Colour
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                Similar shades are grouped together.
                              </p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                              {colourOptions.length}
                            </span>
                          </div>

                          <div className="relative mb-3">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Search colours…"
                              value={colourSearch}
                              onChange={(e) => setColourSearch(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          <div className="max-h-72 overflow-y-auto pr-1">
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {!colourSearch && (
                              <button
                                type="button"
                                onClick={() => handleSelectColourFamily("")}
                                className={cn(
                                  "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all sm:col-span-2",
                                  !selectedColourFamily
                                    ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                                )}
                                aria-label="Show all colours"
                              >
                                <span className="flex min-w-0 items-center gap-3">
                                  <span className="h-4 w-4 shrink-0 rounded-full border border-white/40 bg-white/80" />
                                  <span className="truncate font-semibold">
                                    All Colours
                                  </span>
                                </span>
                                <span className="shrink-0 pl-3 text-xs uppercase tracking-[0.18em] opacity-80">
                                  {baseFabrics.length}
                                </span>
                              </button>
                              )}

                              {searchedColourOptions.map((option) => (
                                <button
                                  key={option.key}
                                  type="button"
                                  onClick={() => handleSelectColourFamily(option.key)}
                                  className={cn(
                                    "flex min-h-[84px] w-full items-start rounded-2xl border px-4 py-3 text-left transition-all",
                                    selectedColourFamily === option.key
                                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/40"
                                  )}
                                  title={option.label}
                                  aria-label={`Filter by ${option.label}`}
                                >
                                  <span className="flex min-w-0 items-start gap-3">
                                    <span
                                      className="h-9 w-9 shrink-0 rounded-2xl border border-slate-200"
                                      style={getColourSwatchStyle(option.label)}
                                    />
                                    <span className="min-w-0 flex-1">
                                      <span className="block break-words text-sm font-semibold leading-5">
                                        {option.label}
                                      </span>
                                      <span
                                        className={cn(
                                          "mt-1 block text-xs leading-5",
                                          selectedColourFamily === option.key
                                            ? "text-blue-50"
                                            : "text-slate-500"
                                        )}
                                      >
                                        {option.count} fabrics
                                      </span>
                                    </span>
                                  </span>
                                </button>
                              ))}
                            </div>

                            {hasHiddenColourOptions ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setShowAllColourFamilies(
                                    (currentValue) => !currentValue
                                  )
                                }
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                aria-expanded={showAllColourFamilies}
                              >
                                <span>
                                  {showAllColourFamilies
                                    ? "Show fewer colour families"
                                    : `Show ${hiddenColourCount} more colour families`}
                                </span>
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 shrink-0 transition-transform",
                                    showAllColourFamilies && "rotate-180"
                                  )}
                                />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {selectedRange ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                          {selectedRange}
                        </span>
                      ) : null}
                      {selectedColourOption ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                          {selectedColourOption.label}
                        </span>
                      ) : null}
                      {hasActiveFilters ? (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          Clear Filters
                        </button>
                      ) : null}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm leading-6 text-slate-600">
                        Digital fabric images may vary in colour and texture from
                        the actual material. Please request a sample for accurate
                        evaluation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-2 2xl:grid-cols-3">
                {filteredFabrics.length === 0 ? (
                  <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500 shadow-sm">
                    No fabrics match your current range, colour, and search
                    choices.
                  </div>
                ) : (
                  filteredFabrics.map((fabric) => (
                    <article
                      key={fabric.key}
                      onBlur={(event) => handlePreviewBlur(event, fabric.key)}
                      onMouseEnter={() => handlePreviewHover(fabric.key)}
                      onMouseLeave={() => handlePreviewLeave(fabric.key)}
                      onFocus={() => handlePreviewHover(fabric.key)}
                      className="group overflow-hidden rounded-2xl sm:rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {fabric.image ? (
                        <button
                          type="button"
                          onClick={() =>
                            openImageDialog(
                              fabric.image,
                              fabric.content || fabric.title || "Fabric image",
                              getRangeSlug(fabric.rangeName)
                            )
                          }
                          className="relative block h-32 sm:h-44 md:h-56 w-full overflow-hidden bg-slate-100 text-left"
                        >
                          <Image
                            src={fabric.image}
                            alt={fabric.content || fabric.title || "Fabric image"}
                            className="object-cover transition duration-500 group-hover:scale-[1.03]"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                          <div className="absolute left-2 top-2 sm:left-4 sm:top-4 rounded-full bg-white/90 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                            {fabric.rangeName}
                          </div>
                          <div className="hidden sm:block absolute right-4 top-4 rounded-full bg-slate-900/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                            {fabric.title}
                          </div>
                        </button>
                      ) : null}

                      <div className="space-y-2 p-2.5 sm:space-y-4 sm:p-5">
                        <div>
                          <h2 className="text-xs sm:text-base md:text-lg font-semibold text-slate-900 line-clamp-2 sm:line-clamp-none">
                            {fabric.content}
                          </h2>
                          <p className="hidden sm:block mt-2 text-sm leading-6 text-slate-500 line-clamp-2">
                            {rangeSummaryMap[fabric.rangeName]?.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {fabric.fabricType ? (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-slate-700">
                              {fabric.fabricType}
                            </span>
                          ) : null}
                          {fabric.colour ? (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-blue-700">
                              {fabric.colour}
                            </span>
                          ) : null}
                        </div>

                        <div className="space-y-1.5 sm:space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openImageDialog(
                                  fabric.image,
                                  fabric.content || fabric.title || "Fabric image",
                                  getRangeSlug(fabric.rangeName)
                                )
                              }
                              className="text-[11px] sm:text-sm font-semibold text-blue-700 transition hover:text-blue-800 shrink-0"
                            >
                              Preview
                            </button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 sm:h-9 rounded-full border-slate-200 bg-white px-2 sm:px-4 text-[10px] sm:text-sm text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                              onClick={() => handleOpenRange(fabric.rangeName)}
                            >
                              View Range
                            </Button>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              router.push(`/range/${getRangeSlug(fabric.rangeName)}`)
                            }
                            className="flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            Technical Specs
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </main>

            <aside className="order-3 hidden xl:block">
              <div className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-28 xl:max-h-[calc(100vh-7rem)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                      Select A Colour
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">
                      Colour Filter
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Similar shades are grouped together so the filter stays short
                      and easier to use.
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {colourOptions.length} groups
                  </span>
                </div>

                <div className="relative mt-4">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search colours…"
                    value={colourSearch}
                    onChange={(e) => setColourSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-1">
                    {!colourSearch && (
                    <button
                      type="button"
                      onClick={() => handleSelectColourFamily("")}
                      className={cn(
                        "col-span-2 flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all xl:col-span-1",
                        !selectedColourFamily
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                      )}
                      aria-label="Show all colours"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="h-4 w-4 shrink-0 rounded-full border border-white/40 bg-white/80" />
                        <span className="truncate font-semibold">All Colours</span>
                      </span>
                      <span className="shrink-0 pl-3 text-xs uppercase tracking-[0.18em] opacity-80">
                        {baseFabrics.length}
                      </span>
                    </button>
                    )}
                    {searchedColourOptions.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => handleSelectColourFamily(option.key)}
                        className={cn(
                          "flex min-h-[92px] w-full items-start rounded-2xl border px-4 py-3 text-left transition-all",
                          selectedColourFamily === option.key
                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/40"
                        )}
                        title={option.label}
                        aria-label={`Filter by ${option.label}`}
                      >
                        <span className="flex min-w-0 items-start gap-3">
                          <span
                            className="h-9 w-9 shrink-0 rounded-2xl border border-slate-200"
                            style={getColourSwatchStyle(option.label)}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block break-words text-sm font-semibold leading-5">
                              {option.label}
                            </span>
                            <span
                              className={cn(
                                "mt-1 block text-xs leading-5",
                                selectedColourFamily === option.key
                                  ? "text-blue-50"
                                  : "text-slate-500"
                              )}
                            >
                              {option.count} fabrics
                            </span>
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {hasHiddenColourOptions && !colourSearch ? (
                    <button
                      type="button"
                      onClick={() =>
                        setShowAllColourFamilies((currentValue) => !currentValue)
                      }
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      aria-expanded={showAllColourFamilies}
                    >
                      <span>
                        {showAllColourFamilies
                          ? "Show fewer colour families"
                          : `Show ${hiddenColourCount} more colour families`}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform",
                          showAllColourFamilies && "rotate-180"
                        )}
                      />
                    </button>
                  ) : null}
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Current Selection
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className="h-10 w-10 rounded-full border border-slate-200"
                      style={getColourSwatchStyle(
                        selectedColourOption?.label || "All colours"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="break-words font-semibold text-slate-900">
                        {selectedColourOption?.label || "All colours"}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {helperText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
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
    </>
  );
}

export default Products;

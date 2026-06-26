import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, ChevronRight, Info } from "lucide-react";
import { rangeCatalog, getRangeBySlug } from "../../../lib/rangeCatalog";
import { getRangeSpecs } from "../../../lib/rangeSpecs";
import { Button } from "../../../components/ui/button";

export function generateStaticParams() {
  return rangeCatalog.map((range) => ({ slug: range.slug }));
}

export async function generateMetadata({ params }) {
  const range = getRangeBySlug(params.slug);
  if (!range) return {};
  return {
    title: `${range.title} — Technical Specifications | Helm Textile Mills`,
    description: range.description,
  };
}

const ALL_SPEC_ROWS = [
  { label: "Composition", key: "composition", bold: true },
  { label: "Local Content", key: "localContent", bold: false },
  { label: "Finished Width", key: "finishedWidth", bold: false },
  { label: "Fabric Weight", key: "fabricWeight", bold: false },
  { label: "Usage", key: "usage", bold: false },
  { label: "Finish Type", key: "finishType", bold: false },
  { label: "Pattern Repeat", key: "patternRepeat", bold: false },
  { label: "Abrasion Resistance", key: "abrasionResistance", bold: true },
  { label: "Seam Slippage", key: "seamSlippage", bold: false },
  { label: "Tensile Strength", key: "tensileStrength", bold: true },
  { label: "UV Resistance", key: "uvResistance", bold: false },
  { label: "Warranty Duration", key: "warrantyDuration", bold: false },
  { label: "Bow / Skew", key: "bowSkew", bold: false },
  { label: "Colour Fastness — To light", key: "cf_toLight", bold: false },
  { label: "Colour Fastness — To rubbing", key: "cf_toRubbing", bold: false },
  { label: "Colour Fastness — To drycleaning", key: "cf_toDrycleaning", bold: false },
  { label: "Colour Fastness — To perspiration", key: "cf_toPerspiration", bold: false },
];

function getCellValue(group, key) {
  if (key.startsWith("cf_")) {
    const sub = key.replace("cf_", "");
    return group.colourFastness?.[sub] ?? null;
  }
  return group[key] ?? null;
}

function getVisibleRows(groups) {
  return ALL_SPEC_ROWS.filter((row) =>
    groups.some((group) => {
      const val = getCellValue(group, row.key);
      return val !== null && val !== undefined;
    })
  );
}

export default function RangePage({ params }) {
  const range = getRangeBySlug(params.slug);
  if (!range) notFound();

  const specs = getRangeSpecs(params.slug);
  const collectionHref = `/collections/?title=${encodeURIComponent(range.title)}&imageUrl=${encodeURIComponent(range.imageUrl)}`;
  const visibleRows = specs?.groups?.length ? getVisibleRows(specs.groups) : [];
  const shortCleaning = specs?.cleaningInstructions?.split(".")[0] ?? "";

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-10 sm:px-6 lg:px-6 lg:py-12">

        {/* Hero */}
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.55)]">
          <div className="grid gap-6 px-5 py-7 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1.25fr)_480px] lg:gap-8 lg:px-8 lg:py-10 xl:grid-cols-[minmax(0,1.4fr)_520px] xl:gap-12 xl:px-10 xl:py-12">
            <div className="flex flex-col justify-between text-white">
              <div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/products/?range=${encodeURIComponent(range.title)}`}>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Explorer
                    </Button>
                  </Link>
                  <Link href={collectionHref}>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                      View Collection
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <span className="mt-6 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100 backdrop-blur-sm">
                  Technical Specifications
                </span>
                <h1 className="mt-4 text-[2rem] font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {range.title}
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  {range.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-[18px] border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                      Material
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {specs
                        ? [...new Set(specs.groups.map((g) => g.composition.split(",")[0].trim()))].join(" / ")
                        : "Contact us"}
                    </p>
                  </div>
                  {specs && (
                    <div className="rounded-[18px] border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                        Cleaning
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {shortCleaning}
                      </p>
                    </div>
                  )}
                  {specs?.certification && (
                    <div className="rounded-[18px] border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                        Certification
                      </p>
                      <p className="mt-1 text-sm font-semibold">{specs.certification}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-white/10 xl:min-h-[340px]">
              <Image
                src={range.imageUrl}
                alt={range.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Range Preview
                </p>
                <p className="mt-1 text-lg font-semibold">{range.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specs table */}
        {specs ? (
          <div className="mt-8 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5 sm:px-8 xl:px-10">
                <h2 className="text-xl font-semibold text-slate-900">
                  Technical Specifications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Specifications by design code group — values sourced from the official Helm Textile Mills spec sheet.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="w-60 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 xl:px-10">
                        Property
                      </th>
                      {specs.groups.map((group, i) => (
                        <th
                          key={i}
                          className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 xl:px-10"
                        >
                          {group.designCodes.join(", ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleRows.map((row, rowIdx) => (
                      <tr
                        key={row.key}
                        className={rowIdx % 2 === 1 ? "bg-slate-50/60" : ""}
                      >
                        <td className="px-6 py-4 font-medium text-slate-700 xl:px-10">
                          {row.label}
                        </td>
                        {specs.groups.map((group, i) => {
                          const val = getCellValue(group, row.key);
                          return (
                            <td
                              key={i}
                              className={`px-6 py-4 xl:px-10 ${row.bold ? "font-semibold text-slate-900" : "text-slate-600"}`}
                            >
                              {val ?? "—"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cleaning + Notes + Distributor */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Care
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  Cleaning Instructions
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {specs.cleaningInstructions}
                </p>
                {specs.certification && (
                  <p className="mt-4 rounded-xl bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">
                    Certified to {specs.certification}
                  </p>
                )}
              </div>

              {specs.notes?.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Notes
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    Important Information
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {specs.notes.map((note, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-6 text-slate-600">
                        <span className="mt-1 shrink-0 text-blue-400">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                  {specs.disclaimer && (
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <p className="text-xs font-semibold text-amber-900">{specs.disclaimer}</p>
                    </div>
                  )}
                </div>
              )}

              {specs.distributor && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Distribution
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    Cutlength Distribution
                  </h3>
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">{specs.distributor.name}</p>
                    <p>{specs.distributor.address}</p>
                    <p>Tel: {specs.distributor.tel}</p>
                    <a
                      href={`mailto:${specs.distributor.email}`}
                      className="text-blue-700 hover:underline"
                    >
                      {specs.distributor.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {!specs.notes?.length && specs.disclaimer && (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p className="text-sm font-semibold text-amber-900">{specs.disclaimer}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <FileText className="mx-auto h-9 w-9 text-slate-400" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Specification sheet coming soon
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Contact us to request the full technical specification sheet for{" "}
              <span className="font-medium text-slate-700">{range.title}</span>.
            </p>
            <Link
              href="/contacts"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get in Touch
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* View collection CTA */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:px-8 xl:px-10 xl:py-6">
          <div>
            <p className="font-semibold text-slate-900">Browse {range.title}</p>
            <p className="mt-1 text-sm text-slate-500">
              View all fabric designs in this collection
            </p>
          </div>
          <Link href={collectionHref}>
            <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
              View Collection
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Bug, Check, Droplets, Eraser, Filter, Leaf, ShieldCheck, X } from "lucide-react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const features = [
  { icon: Droplets, label: "Water Repellent", color: "bg-blue-100 text-blue-600" },
  { icon: Bug, label: "Anti Dust Mite Protection", color: "bg-sky-100 text-sky-600" },
  { icon: Filter, label: "Dirt Repellent", color: "bg-blue-100 text-blue-600" },
  { icon: Leaf, label: "Anti Mildew Properties", color: "bg-teal-100 text-teal-600" },
  { icon: Eraser, label: "Stain Resistant", color: "bg-indigo-100 text-indigo-600" },
];

const environments = ["Home & Living Spaces", "Corporate Offices", "Hospitality Venues", "Entertainment Spaces"];

const spotCleaningSteps = [
  "Blot excess liquids with a white, lint-free cloth (avoid colored cloths).",
  "Scoop solids with a spoon or back of a knife, working inward.",
  "Use warm soapy water and blot frequently. Avoid over-wetting.",
  "Repeat as needed, working gently to avoid pushing stains deeper.",
];

const doNots = [
  "Do NOT use ammonia, bleach, or solvent-based cleaners",
  "Do NOT scrub or brush the fabric",
  "Do NOT soak or press liquids through the fabric",
];

function RevealSection({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const initial =
    direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
        ? { opacity: 0, x: 40 }
        : { opacity: 0, y: 24 };
  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const EasyClean = () => {
  const bannerRef = useRef(null);
  const bannerInView = useInView(bannerRef, { once: true });

  return (
    <div>
      {/* ── Section A: Identity Banner ── */}
      <section
        ref={bannerRef}
        className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 xl:px-10">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={bannerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5"
          >
            <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              Water Repellent Finish
            </span>
            <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              EASYCLEAN<sup className="text-2xl font-bold align-super">®</sup>
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Your trusted solution for long-lasting, easy-to-maintain fabric care. Already
              built into our entire Outdoor Fabric Range.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <ShieldCheck className="text-blue-400" size={20} />
              <span className="text-sm font-semibold text-blue-200">
                Applied to our Outdoor Fabric Range as standard
              </span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={bannerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <Image
              src="/assets/finishes/eazycleanlogo.jpg"
              alt="EasyClean fabric finish"
              width={700}
              height={480}
              className="w-full rounded-[28px] object-cover ring-1 ring-white/10 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Section B: 5-Feature Grid ── */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealSection className="mb-10 text-center">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Key Features
            </span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              What EASYCLEAN® does
            </h3>
          </RevealSection>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <RevealSection key={feat.label} delay={i * 0.08} direction="up">
                  <div className="rounded-[20px] border border-blue-100 bg-white p-5 shadow-sm">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${feat.color}`}
                    >
                      <Icon size={18} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800">{feat.label}</p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section C: Performance Split (dark) ── */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 xl:px-10">
          {/* Stacked images */}
          <RevealSection direction="left" className="relative">
            <Image
              src="/assets/finishes/WaterRepellentFabric.png"
              alt="Water repellent performance"
              width={640}
              height={420}
              className="w-full rounded-[24px] object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 -right-4 w-2/5 overflow-hidden rounded-[18px] ring-2 ring-blue-500/40 shadow-2xl lg:-right-6">
              <Image
                src="/assets/finishes/easyclean1.png"
                alt="EasyClean detail"
                width={240}
                height={180}
                className="w-full object-cover"
              />
            </div>
          </RevealSection>

          {/* Text */}
          <RevealSection direction="right" delay={0.15} className="space-y-5 pb-8 lg:pb-0">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Performance
            </span>
            <h3 className="text-3xl font-bold text-white sm:text-4xl">
              Performance You Can Rely On
            </h3>
            <p className="leading-relaxed text-slate-300">
              Our premium soil and water-repellent fabrics are expertly treated with
              EASYCLEAN® TEXTIFIN, a high-performance protector designed for real-life
              messes.
            </p>
            <ul className="space-y-2 pt-2">
              {environments.map((env) => (
                <li key={env} className="flex items-center gap-3">
                  <Check size={16} className="flex-shrink-0 text-blue-400" />
                  <span className="text-sm text-slate-300">{env}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 border-t border-white/10 pt-4 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-500" /> Strict quality control conditions
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-500" /> In-house abrasion, strength &amp; colour fastness testing
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-500" /> Compliant with SABS, ISO and British Standards
              </li>
            </ul>
          </RevealSection>
        </div>
      </section>

      {/* ── Section D: Cleaning Care (sticky image) ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealSection className="mb-10">
            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Care Guide
            </span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Cleaning &amp; Care Guidelines
            </h3>
          </RevealSection>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Sticky image */}
            <div>
              <Image
                src="/assets/finishes/easyclean2.png"
                alt="Cleaning care guidelines"
                width={640}
                height={480}
                className="w-full rounded-[28px] object-cover shadow-lg lg:sticky lg:top-28"
              />
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {/* Quick Action */}
              <RevealSection direction="right" delay={0}>
                <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                    01 / Quick Action
                  </p>
                  <h4 className="text-base font-semibold text-slate-900">Quick Action Is Key</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Most stains can be removed if treated immediately. Don&apos;t wait, the
                    sooner you act, the better the result.
                  </p>
                </div>
              </RevealSection>

              {/* Spot Cleaning Steps */}
              <RevealSection direction="right" delay={0.1}>
                <div className="rounded-[20px] border border-blue-100 bg-blue-50 p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-blue-500">
                    02 / Spot Cleaning
                  </p>
                  <h4 className="mb-4 text-base font-semibold text-slate-900">
                    Step-by-Step Guide
                  </h4>
                  <ol className="space-y-3">
                    {spotCleaningSteps.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-slate-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </RevealSection>

              {/* Do NOTs */}
              <RevealSection direction="right" delay={0.2}>
                <div className="rounded-[20px] border border-red-100 bg-red-50 p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-red-500">
                    03 / Avoid
                  </p>
                  <h4 className="mb-3 text-base font-semibold text-slate-900">
                    Important Don&apos;ts
                  </h4>
                  <ul className="space-y-2">
                    {doNots.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <X size={15} className="mt-0.5 flex-shrink-0 text-red-500" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>

              <RevealSection direction="right" delay={0.3}>
                <p className="rounded-[16px] border border-slate-100 bg-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-500">
                  With proper care, your fabric will retain its performance and appearance for{" "}
                  <strong className="text-slate-700">5+ years</strong> even in high-traffic
                  spaces like cinemas and restaurants.
                </p>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section E: Warranty Callout ── */}
      <section className="relative overflow-hidden bg-blue-600 py-14 text-center">
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[200px] font-black text-white/10 select-none">
          5
        </span>
        <RevealSection className="relative z-10 mx-auto max-w-lg px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
            Limited Warranty
          </p>
          <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            5-Year Limited Warranty
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-blue-200">
            Every fabric treated with EASYCLEAN® comes backed by a limited 5-Year Warranty.
            Terms &amp; Conditions apply.
          </p>
        </RevealSection>
      </section>
    </div>
  );
};

export default EasyClean;

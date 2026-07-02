"use client";

import { Briefcase, Church, Clock, HeartPulse, Hospital, School, ShieldCheck, Theater, Wind } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const applications = [
  { icon: Church, label: "Church Seating" },
  { icon: Theater, label: "Theatres" },
  { icon: Hospital, label: "Medical Areas" },
  { icon: Briefcase, label: "Corporate Offices" },
  { icon: School, label: "Schools & Institutions" },
];

function RevealCard({ children, className = "", delay = 0, scale = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: scale ? 0.92 : 1, y: scale ? 0 : 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealDiv({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const AntibacterialFinish = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div>
      {/* ── Section A: Dark Hero Panel ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 xl:px-10">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5"
          >
            <span className="inline-block rounded-full border border-emerald-400/25 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Optional Fabric Treatment
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Antibacterial Finish
            </h2>
            <p className="max-w-lg leading-relaxed text-slate-300">
              Helm Textiles offers an Antibacterial Finish as an optional treatment on our
              upholstery fabrics ideal for environments where hygiene, health, and
              cleanliness are a top priority.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                Hygiene Critical
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                Commercial Grade
              </span>
            </div>
          </motion.div>

          {/* Decorative right element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {/* Concentric rings */}
            <div className="relative flex h-64 w-64 items-center justify-center lg:h-80 lg:w-80">
              <div className="absolute h-full w-full rounded-full border border-emerald-500/20" />
              <div className="absolute h-[75%] w-[75%] rounded-full border border-emerald-500/25" />
              <div className="absolute h-[50%] w-[50%] rounded-full border border-emerald-500/30" />
              {/* Center icon */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-400/30 bg-emerald-500/20">
                <ShieldCheck size={40} className="text-emerald-400" />
              </div>
              {/* Watermark */}
              <ShieldCheck
                size={140}
                className="pointer-events-none absolute text-emerald-400/10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section B: Bento Grid ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealDiv className="mb-10">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Benefits
            </span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Why choose an Antibacterial Finish?
            </h3>
          </RevealDiv>

          {/* Desktop bento: 3-col × 2-row. Mobile: single col */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {/* Hygiene Protection — tall dark card */}
            <RevealCard delay={0} scale className="lg:row-span-2">
              <div className="flex h-full min-h-[260px] flex-col rounded-[24px] bg-slate-900 p-8 text-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20">
                  <ShieldCheck size={22} className="text-blue-400" />
                </div>
                <h4 className="mt-5 text-xl font-bold">Hygiene Protection</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  Helps prevent bacteria buildup on fabric surfaces, keeping upholstery
                  cleaner for longer and safer for users in shared environments.
                </p>
                <div className="mt-6 h-px bg-white/10" />
                <p className="mt-4 text-xs text-slate-500">
                  Ideal for high-contact public seating
                </p>
              </div>
            </RevealCard>

            {/* Odour Control — wide light green */}
            <RevealCard delay={0.08} scale className="lg:col-span-2">
              <div className="flex h-full flex-col rounded-[20px] border border-emerald-100 bg-emerald-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20">
                  <Wind size={20} className="text-emerald-600" />
                </div>
                <h4 className="mt-4 text-base font-bold text-slate-900">Odour Control</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Reduces unpleasant smells caused by microbial growth, keeping spaces
                  fresh even after extended periods of use.
                </p>
              </div>
            </RevealCard>

            {/* Longer Lifespan */}
            <RevealCard delay={0.16} scale>
              <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                  <Clock size={20} className="text-purple-600" />
                </div>
                <h4 className="mt-4 text-base font-bold text-slate-900">Longer Lifespan</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Enhances fabric durability by minimizing microbial damage over time,
                  helping your upholstery maintain its appearance and performance.
                </p>
              </div>
            </RevealCard>

            {/* Comfort & Safety — emerald card */}
            <RevealCard delay={0.24} scale>
              <div className="rounded-[20px] bg-emerald-600 p-6 text-white">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                  <HeartPulse size={20} className="text-white" />
                </div>
                <h4 className="mt-4 text-base font-bold">Comfort &amp; Safety</h4>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100">
                  Supports a healthier environment for every occupant, from patients to
                  students to office workers.
                </p>
              </div>
            </RevealCard>
          </div>
        </div>
      </section>

      {/* ── Section C: Applications Rail ── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealDiv className="mb-8 flex items-center gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Where it works best
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Ideal Environments
              </h3>
            </div>
            <div className="hidden flex-1 sm:block">
              <div className="h-px bg-slate-200" />
            </div>
          </RevealDiv>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {applications.map((app, i) => {
              const Icon = app.icon;
              return (
                <RevealCard key={app.label} delay={i * 0.07} scale>
                  <div className="rounded-[20px] border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-100/50">
                    <Icon size={28} className="mx-auto text-emerald-600" />
                    <p className="mt-3 text-sm font-semibold text-slate-700">{app.label}</p>
                  </div>
                </RevealCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section D: Emerald CTA Strip ── */}
      <section className="bg-emerald-600 py-12">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealDiv className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Protect your investment and your space.
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-emerald-100">
                Add an Antibacterial Finish to your fabric order with Helm Textiles for
                cleaner, safer, smarter upholstery solutions.
              </p>
            </div>
            <a
              href="mailto:sales@helmtex.co.za"
              className="flex-shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Contact us for a quote
            </a>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
};

export default AntibacterialFinish;

"use client";

import { Award, Briefcase, Building2, Church, Flame, ShieldCheck, SmilePlus, Users, Video } from "lucide-react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const benefits = [
  {
    icon: Flame,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    barColor: "bg-red-500",
    title: "Improved Fire Safety",
    description: "Helps delay ignition and limits flame spread in the event of a fire.",
  },
  {
    icon: SmilePlus,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    barColor: "bg-orange-500",
    title: "Peace of Mind",
    description: "Ideal for public venues where occupant safety is a non-negotiable priority.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    barColor: "bg-blue-500",
    title: "Compliance Ready",
    description: "Assists with meeting fire regulation standards for commercial and public spaces.",
  },
  {
    icon: Award,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    barColor: "bg-emerald-500",
    title: "Durability",
    description: "Maintains fabric quality and appearance alongside enhanced fire protection.",
  },
];

const applications = [
  { icon: Video, label: "Cinemas" },
  { icon: Church, label: "Church Seating" },
  { icon: Building2, label: "Conference Rooms" },
  { icon: Users, label: "Auditorium Seating" },
  { icon: Briefcase, label: "Corporate Interiors" },
];

function RevealCard({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealScale({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealUp({ children, className = "", delay = 0 }) {
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

const FlameRetardantFinish = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div>
      {/* ── Section A: Dark Hero + Why FR ── */}
      <section
        ref={heroRef}
        className="bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8 xl:px-10">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5"
          >
            <span className="inline-block rounded-full border border-orange-400/25 bg-orange-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
              Optional Finish · Fire Safety
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Flame Retardant Finish
            </h2>
            <p className="max-w-xl leading-relaxed text-slate-300">
              At Helm Textiles, we offer a premium Flame Retardant (FR) finish as an optional
              treatment on our upholstery fabrics, an essential safety feature for public and
              commercial spaces.
            </p>

            {/* FibreTech brand attribution */}
            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <span className="text-xs font-medium text-slate-400 flex-shrink-0">Technology by</span>
              <div className="relative h-7 w-32">
                <Image
                  src="/assets/finishes/fibretech.png"
                  alt="FibreTech by Helm Textile Mills"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>

            <div className="rounded-[16px] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-400">
                Why Choose a Flame Retardant Finish?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Flame retardant treatments significantly enhance the fire resistance of fabrics,
                helping to slow the spread of flames and reduce smoke development. This added
                protection supports compliance with fire safety regulations and creates a safer
                environment for all occupants.
              </p>
            </div>
          </motion.div>

          {/* Right: decorative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative flex h-56 w-56 items-center justify-center lg:h-72 lg:w-72">
              <Flame
                size={160}
                className="pointer-events-none absolute text-orange-400/10"
              />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-orange-400/30 bg-orange-500/20">
                <Flame size={36} className="text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient fade to white */}
      <div className="h-16 bg-gradient-to-b from-slate-900 to-white" />

      {/* ── Section B: 4 Benefit Cards ── */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealUp className="mb-10">
            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
              Benefits &amp; Advantages
            </span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Why it matters
            </h3>
          </RevealUp>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <RevealCard key={b.title} delay={i * 0.09}>
                  <div className="flex items-stretch gap-0 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                    {/* Left accent bar */}
                    <div className={`w-1 flex-shrink-0 self-stretch ${b.barColor}`} />
                    {/* Content */}
                    <div className="flex flex-1 items-start gap-4 p-6">
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${b.iconBg}`}
                      >
                        <Icon size={22} className={b.iconColor} />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900">{b.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section C: Applications Rail (dark) ── */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealUp className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Ideal applications
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">Where It Matters Most</h3>
          </RevealUp>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {applications.map((app, i) => {
              const Icon = app.icon;
              return (
                <RevealScale key={app.label} delay={i * 0.07}>
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-5 text-center transition-all duration-300 hover:border-orange-400/30 hover:bg-white/10">
                    <Icon size={28} className="mx-auto text-orange-400" />
                    <p className="mt-3 text-sm font-medium text-slate-300">{app.label}</p>
                  </div>
                </RevealScale>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section D: Fire Safety CTA ── */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 py-16 text-center">
        <RevealUp className="mx-auto max-w-xl px-4">
          <Flame size={32} className="mx-auto text-white/70" />
          <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Upgrade your fabric with a Flame Retardant Finish
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-orange-100">
            Safety and performance, tailored to your project.
          </p>
          <a
            href="mailto:sales@helmtex.co.za"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
          >
            Request a Quote
          </a>
        </RevealUp>
      </section>
    </div>
  );
};

export default FlameRetardantFinish;

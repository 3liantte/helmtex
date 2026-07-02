"use client";

import { useEffect, useState } from "react";
import AntibacterialFinish from "../../components/Finishes/AntiBacterial";
import EasyClean from "../../components/Finishes/EasyClean";
import FlameRetardant from "../../components/Finishes/FlameRetardant";
import { Mail } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const navItems = [
  { id: "easyclean", label: "EasyClean®", activeClass: "bg-blue-600 text-white shadow-sm" },
  { id: "antibacterial", label: "Antibacterial", activeClass: "bg-emerald-600 text-white shadow-sm" },
  { id: "flame-retardant", label: "Flame Retardant", activeClass: "bg-orange-600 text-white shadow-sm" },
];

const chips = [
  { label: "EasyClean®", sub: "Water Repellent" },
  { label: "Antibacterial", sub: "Hygiene Protection" },
  { label: "Flame Retardant", sub: "Fire Safety" },
];

const Finishes = () => {
  const [activeSection, setActiveSection] = useState("easyclean");

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: "-64px 0px 0px 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-24 sm:py-32 lg:py-40">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-800/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200"
          >
            Fabric Technology
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Finishes &amp; Treatments
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Helm Textiles enhances fabric performance with three specialist finishing
            treatments, protecting against water, bacteria, and fire so your upholstery
            looks great and performs in the most demanding environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {chips.map((chip) => (
              <div
                key={chip.label}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <span className="text-sm font-semibold text-white">{chip.label}</span>
                <span className="ml-2 text-xs text-slate-400">{chip.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky sub-nav ── */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-[1680px] items-center gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 xl:px-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              type="button"
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeSection === item.id
                  ? item.activeClass
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Finish Sections ── */}
      <section id="easyclean">
        <EasyClean />
      </section>

      <section id="antibacterial">
        <AntibacterialFinish />
      </section>

      <section id="flame-retardant">
        <FlameRetardant />
      </section>

      {/* ── Local Content Trust Strip ── */}
      <section className="border-y border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-[1680px] flex-col items-center gap-6 px-4 sm:flex-row sm:gap-10 sm:px-6 lg:px-8 xl:px-10">
          <Image
            src="/assets/finishes/localcontent.jpg"
            alt="100% locally manufactured with local content"
            width={96}
            height={96}
            className="h-24 w-24 flex-shrink-0 object-contain"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              South African Made
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              100% Locally Manufactured
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Every Helm Textiles fabric is manufactured right here in South Africa using
              local content, proudly supporting local industry while delivering world-class
              quality and performance.
            </p>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Get In Touch
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Need advice on which finish is right for you?
              </h2>
              <p className="mt-2 max-w-lg text-slate-400">
                Our team can help you choose the ideal treatment for your project, from
                hospitality venues to healthcare facilities and everything in between.
              </p>
            </div>
            <a
              href="mailto:sales@helmtex.co.za"
              className="flex flex-shrink-0 items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Mail size={16} />
              sales@helmtex.co.za
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Finishes;

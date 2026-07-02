"use client";

import { BadgeCheck, Boxes, Layers, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import backgroundImage from "../../public/assets/about.jpg";
import displayImage2 from "../../public/assets/img7.png";
import displayImage from "../../public/assets/loom.jpg";

const productNames = [
  "Cotton Twill Fabric",
  "Polyester Blend",
  "Linen Look Fabric",
  "Eco-friendly Textiles",
  "Outdoor Upholstery",
  "Heavy Duty Canvas",
  "Lightweight Voile",
  "Denim Collection",
  "Curtain Fabrics",
  "Fire Retardant Textiles",
  "Waterproof Materials",
  "Velvet Upholstery",
  "Jacquard Fabrics",
  "Fleece and Knits",
];

const pillars = [
  {
    icon: ShieldCheck,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
    title: "Quality Assured",
    description:
      "Strict in-house quality control for every fabric — compliant with SABS, ISO, and British Standards for consistent, reliable performance.",
    variant: "dark",
  },
  {
    icon: Layers,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    title: "450+ Variants",
    description:
      "An extensive portfolio spanning upholstery, outdoor, curtain, and specialty fabrics to suit any project requirement.",
    variant: "light",
  },
  {
    icon: Sparkles,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Custom Solutions",
    description:
      "We work closely with clients to develop fabric solutions tailored to precise specifications, finishes, and quantities.",
    variant: "light",
  },
  {
    icon: Boxes,
    iconColor: "text-white",
    iconBg: "bg-white/20",
    title: "Ready Stock",
    description:
      "Extensive on-hand inventory means faster turnaround times — ideal for businesses that can't afford to wait.",
    variant: "blue",
  },
];

function AnimatedCounter({ end, duration = 2000, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
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

function RevealLeft({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealRight({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const AboutPage = () => {
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 pb-24 pt-28 sm:pb-28 sm:pt-36 lg:pb-32 lg:pt-44"
      >
        {/* Background texture */}
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="pointer-events-none object-cover opacity-[0.08] mix-blend-overlay"
          priority
        />
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-800/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200"
          >
            Est. 1992
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Helm Textile Mills
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            A trusted leader in textile manufacturing for over 29 years — crafting
            high-quality fabrics that meet the diverse needs of clients across South Africa
            and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              { label: "29+", sub: "Years of Experience" },
              { label: "450+", sub: "Product Variants" },
              { label: "1992", sub: "Year Founded" },
            ].map((chip) => (
              <div
                key={chip.label}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <span className="text-sm font-bold text-white">{chip.label}</span>
                <span className="ml-2 text-xs text-slate-400">{chip.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Company Story ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 xl:px-10">
          {/* Image with overlaid badge */}
          <RevealLeft className="relative pb-8 lg:pb-0">
            <div className="relative h-[480px] w-full overflow-hidden rounded-[28px] shadow-xl sm:h-[560px]">
              <Image
                src={displayImage2}
                alt="Helm Textiles craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Founding badge */}
            <div className="absolute -bottom-4 -right-2 flex items-center gap-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-xl sm:-right-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
                <BadgeCheck size={28} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">Since 1992</p>
                <p className="text-xs font-medium text-slate-500">Helm Textile Mills</p>
              </div>
            </div>
          </RevealLeft>

          {/* Text + counters */}
          <RevealRight delay={0.1} className="space-y-6">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Our Story
            </span>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Over 29 years of textile excellence
            </h2>
            <p className="leading-relaxed text-slate-600">
              At Helm Textile Mills, we have been a trusted leader in the textile
              manufacturing industry since our inception in 1992. Our commitment to
              excellence, innovation, and sustainability has earned us a reputation for
              reliability and craftsmanship across South Africa.
            </p>
            <p className="leading-relaxed text-slate-600">
              With an extensive inventory of high-quality fabrics, competitive wholesale
              pricing, and immediate availability, we empower businesses to meet their
              production timelines without hassle.
            </p>

            {/* Animated counters */}
            <div className="flex flex-wrap gap-10 border-t border-slate-100 pt-6">
              <div>
                <p className="text-4xl font-black text-blue-600">
                  <AnimatedCounter end={29} />
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl font-black text-blue-600">
                  <AnimatedCounter end={450} />
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">Product Variants</p>
              </div>
            </div>
          </RevealRight>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealUp className="mb-12 text-center">
            <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              The Helm Textiles difference
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Decades of experience and an unwavering focus on quality — delivering fabric
              solutions that set the industry standard.
            </p>
          </RevealUp>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const cardClass =
                pillar.variant === "dark"
                  ? "rounded-[24px] bg-slate-900 p-8 h-full"
                  : pillar.variant === "blue"
                    ? "rounded-[24px] bg-blue-600 p-8 h-full"
                    : "rounded-[24px] bg-white border border-slate-200 shadow-sm p-8 h-full";
              const titleClass =
                pillar.variant === "dark" || pillar.variant === "blue"
                  ? "text-white"
                  : "text-slate-900";
              const descClass =
                pillar.variant === "dark"
                  ? "text-slate-400"
                  : pillar.variant === "blue"
                    ? "text-blue-100"
                    : "text-slate-500";

              return (
                <RevealUp key={pillar.title} delay={i * 0.1}>
                  <div className={cardClass}>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${pillar.iconBg}`}
                    >
                      <Icon size={22} className={pillar.iconColor} />
                    </div>
                    <h3 className={`mt-5 text-lg font-bold ${titleClass}`}>{pillar.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${descClass}`}>
                      {pillar.description}
                    </p>
                  </div>
                </RevealUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product Range Marquee ── */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealUp className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Our Range
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Trusted Across Every Category
            </h2>
          </RevealUp>
        </div>

        <div
          className="relative flex overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`flex w-fit gap-3 animate-marquee ${isPaused ? "pause-marquee" : ""}`}
            >
              {productNames.map((name, index) => (
                <div
                  key={`${i}-${index}`}
                  className="flex items-center justify-center whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:border-blue-400/30 hover:text-blue-300"
                >
                  {name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── CEO / Craftsmanship ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 xl:px-10">
          {/* Text */}
          <RevealLeft className="order-2 space-y-6 lg:order-1">
            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Craftsmanship
            </span>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Innovative Craftsmanship
            </h2>
            <p className="leading-relaxed text-slate-600">
              Deep in the heart of the textile world, where creativity and precision
              intertwine, we bring fabrics to life. Our dedication to quality and
              sustainability shapes each thread, creating textiles that stand the test of
              time.
            </p>

            {/* CEO quote card */}
            <blockquote className="rounded-[20px] border border-slate-100 bg-slate-50 p-6">
              <p className="text-base italic leading-relaxed text-slate-700">
                &ldquo;We weave the fabric of innovation, where quality, craftsmanship, and
                sustainability meet to create timeless textiles.&rdquo;
              </p>
              <footer className="mt-5 flex items-center gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  WL
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Wilhelm Lochmann</p>
                  <p className="text-xs text-slate-500">CEO, Helm Textile Mills</p>
                </div>
              </footer>
            </blockquote>
          </RevealLeft>

          {/* Image */}
          <RevealRight delay={0.15} className="relative order-1 lg:order-2">
            <div className="relative h-[480px] w-full overflow-hidden rounded-[28px] shadow-xl sm:h-[560px]">
              <Image
                src={displayImage}
                alt="Textile loom — Helm Textile Mills"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </div>
          </RevealRight>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <RevealUp className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Let&apos;s Work Together
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Ready to turn your designs into reality?
              </h2>
              <p className="mt-2 max-w-lg text-slate-400">
                Get in touch with our team to discuss fabric requirements, custom solutions,
                or wholesale pricing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/contacts")}
              className="flex flex-shrink-0 items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Mail size={16} />
              Contact Us
            </button>
          </RevealUp>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

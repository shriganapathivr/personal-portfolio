"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

const UPWORK =
  "https://www.upwork.com/services/product/development-it-i-will-build-a-responsive-business-landing-page-2064219438312497647";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-hero]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(items, { y: 44, autoAlpha: 0 });
    const play = () =>
      gsap.to(items, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

    if ((window as unknown as { __loaderDone?: boolean }).__loaderDone) play();
    else document.addEventListener("loader:done", play, { once: true });
    return () => document.removeEventListener("loader:done", play);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      {/* Animated gradient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-[52vh] w-[52vh] rounded-full bg-iris/25 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-4 h-[48vh] w-[48vh] rounded-full bg-aqua/20 blur-[130px]"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* faint grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <div className="relative z-[2] w-full max-w-5xl text-center">
        <p
          data-hero
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-muted backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-aqua shadow-[0_0_12px_2px_var(--glow-aqua)]" />
          <MapPin size={14} className="text-iris-soft" />
          Madurai, Tamil Nadu · Available for work
        </p>

        <h1
          data-hero
          className="whitespace-nowrap font-heading text-[clamp(2.4rem,8.7vw,6rem)] font-extrabold leading-[0.95] tracking-tight"
        >
          <span className="block">
            Shri <span className="text-grad">Ganapathi</span>
          </span>
          <span className="block">V.R</span>
        </h1>

        <p
          data-hero
          className="mx-auto mt-5 font-heading text-2xl font-semibold tracking-tight text-ink/90 sm:text-3xl"
        >
          Full Stack Developer
        </p>

        <p data-hero className="mx-auto mt-3 max-w-md text-muted">
          React.js · Node.js · MongoDB
        </p>

        <div
          data-hero
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-iris to-aqua px-7 py-3.5 font-medium text-white shadow-[0_10px_40px_-12px_var(--glow-iris)]"
          >
            View My Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href={UPWORK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-ink transition-colors hover:border-aqua/50 hover:text-aqua"
          >
            Hire Me on Upwork
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>

      {/* scroll cue */}
      <div
        data-hero
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted"
      >
        <span className="relative h-9 w-[22px] rounded-full border border-white/15">
          <span className="absolute left-1/2 top-2 h-1.5 w-1 -translate-x-1/2 animate-bounce rounded-full bg-aqua" />
        </span>
        Scroll
      </div>
    </section>
  );
}

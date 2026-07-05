"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAME = "SHRI GANAPATHI";

/**
 * Cinematic opening: full-screen black loader, name reveals letter by
 * letter (masked rise), holds, then the whole panel slides up to reveal
 * the site. Signals completion via `loader:done` so the hero staggers in.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const finish = () => {
      (window as unknown as { __loaderDone?: boolean }).__loaderDone = true;
      document.dispatchEvent(new Event("loader:done"));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.display = "none";
      finish();
      return;
    }

    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.set(el, { autoAlpha: 1 });
      tl.fromTo(
        chars,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.75, stagger: 0.045 },
        0.35
      );
      tl.to("[data-loader-bar]", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.4);
      tl.to(chars, { yPercent: -120, duration: 0.55, ease: "power3.in", stagger: 0.02 }, "+=0.45");
      tl.to(
        el,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
          onComplete: () => {
            el.style.display = "none";
            finish();
          },
        },
        "-=0.15"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      <h1 className="flex font-heading text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
        {NAME.split("").map((c, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span data-char className="inline-block">
              {c === " " ? " " : c}
            </span>
          </span>
        ))}
      </h1>
      <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
        <div
          data-loader-bar
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-iris to-aqua"
        />
      </div>
    </div>
  );
}

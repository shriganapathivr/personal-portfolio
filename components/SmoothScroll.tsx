"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays
 * in perfect sync. Weighted, satisfying scroll — not native.
 * Exposes the instance on window for anchor scrolling in the nav later.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalculate trigger positions once the loader is gone / layout settles.
    const refresh = () => ScrollTrigger.refresh();
    document.addEventListener("loader:done", refresh);
    const refreshTimer = window.setTimeout(refresh, 300);

    return () => {
      document.removeEventListener("loader:done", refresh);
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

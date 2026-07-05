"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger reveal. Fades + eases content up as it enters view.
 * Pass `stagger` to animate direct children one after another.
 *
 * Uses gsap.context + ctx.revert() so React 18 Strict Mode's double-invoke
 * doesn't leave elements stuck at the hidden "from" state.
 */
export default function Reveal({
  children,
  className,
  stagger = 0,
  y = 44,
  start = "top 86%",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  start?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave content visible, no animation

    const ctx = gsap.context(() => {
      const targets =
        stagger > 0 ? gsap.utils.toArray<HTMLElement>(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger,
        // Remove inline transform/opacity after reveal so CSS hover
        // transforms (card lift/scale) aren't overridden.
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [stagger, y, start]);

  // @ts-expect-error — dynamic tag with a forwarded ref
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

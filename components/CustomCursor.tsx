"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Small purple dot (tracks exactly) + larger soft ring that follows with
 * spring lag. Ring scales up over links/buttons.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    const precise = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!precise) return;
    setEnabled(true);
    document.body.classList.add("cursor-ready");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("cursor-ready");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x, y, backgroundColor: "var(--iris)", boxShadow: "0 0 12px 2px var(--glow-iris)" }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          borderColor: hovering ? "rgba(0,216,255,0.9)" : "rgba(154,123,255,0.45)",
          backgroundColor: hovering ? "rgba(0,216,255,0.08)" : "rgba(112,66,248,0)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}

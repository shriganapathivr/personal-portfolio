"use client";

import { motion } from "framer-motion";
import { slideInLeft, fadeUp, staggerContainer, VIEWPORT } from "@/lib/anim";

/**
 * Rule 11: section titles slide in from the left on scroll.
 * Kicker (e.g. "02 — Projects") fades up just before.
 */
export default function SectionTitle({
  index,
  kicker,
  children,
}: {
  index: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="mb-12 sm:mb-16"
    >
      <motion.p
        variants={fadeUp}
        className="mb-4 font-heading text-sm uppercase tracking-[0.24em] text-neon"
      >
        {index} — {kicker}
      </motion.p>
      <motion.h2
        variants={slideInLeft}
        className="font-heading text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl"
      >
        {children}
      </motion.h2>
    </motion.div>
  );
}

import type { Variants } from "framer-motion";

// Shared easing — used everywhere for a cohesive feel.
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Default viewport config for whileInView (animate once, a little early).
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Rule 1: sections fade up on scroll. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Rule 12: contact-style stagger in from the bottom. */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Rule 11: section titles slide in from the left. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Rule 2: staggered children — each child 0.1s after the previous. */
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Rule 3: subtle infinite up/down float for hero content. */
export const floatLoop = {
  y: [0, -12, 0],
  transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
};

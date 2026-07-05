"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  icon?: ReactNode;
  className?: string;
};

/**
 * Rule 9: buttons get a glow-pulse (primary) + slight scale on hover.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className = "",
}: Props) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "btn-pulse bg-neon text-[#00130a] shadow-neon hover:bg-neon-soft"
      : "glass text-ink border border-white/15 hover:border-neon/60 hover:text-neon";

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </motion.a>
  );
}

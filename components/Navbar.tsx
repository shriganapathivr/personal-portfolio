"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type Lenis from "lenis";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Hide on scroll down (past the hero), reveal on scroll up.
      setHidden(y > last && y > 220);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) lenis.scrollTo(href, { offset: -80 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", href);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="glass flex items-center gap-0.5 rounded-full border border-white/10 px-2 py-1.5 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.85)]">
        <a
          href="#home"
          onClick={(e) => go(e, "#home")}
          className="px-3 py-1.5 font-heading text-sm font-extrabold text-grad"
        >
          SG·VR
        </a>
        <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => go(e, l.href)}
            className="rounded-full px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-white/5 hover:text-ink sm:px-3 sm:text-sm"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}

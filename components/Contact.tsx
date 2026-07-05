"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import type { IconType } from "react-icons";
import Reveal from "./Reveal";

type Card = {
  label: string;
  value: string;
  href: string;
  external: boolean;
  Icon: IconType;
};

const CARDS: Card[] = [
  { label: "Email", value: "shriganapathi.vr@gmail.com", href: "mailto:shriganapathi.vr@gmail.com", external: false, Icon: Mail as IconType },
  { label: "LinkedIn", value: "/in/shriganapathivr", href: "https://www.linkedin.com/in/shriganapathivr/", external: true, Icon: FaLinkedinIn },
  { label: "GitHub", value: "@shriganapathivr", href: "https://github.com/shriganapathivr", external: true, Icon: FaGithub },
  { label: "Upwork", value: "Hire me for your project", href: "https://www.upwork.com/services/product/development-it-i-will-build-a-responsive-business-landing-page-2064219438312497647", external: true, Icon: SiUpwork },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <Reveal stagger={0.1} className="mb-14">
        <p className="mb-4 font-heading text-sm uppercase tracking-[0.24em] text-iris-soft">
          04 — Contact
        </p>
        <h2 className="font-heading text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
          Let&apos;s Build Something
          <br />
          <span className="text-grad">Great Together</span>
        </h2>
        <p className="mt-6 max-w-md text-lg text-muted">
          Available for freelance projects and collaborations. Reach out on whichever channel
          suits you.
        </p>
      </Reveal>

      <Reveal stagger={0.1} className="grid gap-4 sm:grid-cols-2">
        {CARDS.map(({ label, value, href, external, Icon }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            data-cursor
            className="group glass relative flex items-center gap-4 overflow-hidden rounded-2xl p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-iris/50 hover:shadow-[0_0_50px_-12px_var(--glow-iris)]"
          >
            <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-iris/25 bg-iris/10 text-iris-soft">
              <Icon size={20} />
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-xs uppercase tracking-[0.16em] text-iris-soft">
                {label}
              </span>
              <span className="block truncate text-lg text-ink">{value}</span>
            </span>
            <ArrowUpRight
              size={20}
              className="ml-auto flex-none text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-aqua"
            />
          </a>
        ))}
      </Reveal>
    </section>
  );
}

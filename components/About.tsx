"use client";

import { GraduationCap, MapPin, Rocket } from "lucide-react";
import Reveal from "./Reveal";

const CARDS = [
  {
    icon: GraduationCap,
    label: "Education",
    title: "B.E Computer Science",
    lines: ["SRM Madurai College of Engineering & Technology", "2024 — 2028 · 3rd Year"],
  },
  {
    icon: MapPin,
    label: "Location",
    title: "Madurai, Tamil Nadu",
    lines: ["India", "Open to remote work worldwide"],
  },
  {
    icon: Rocket,
    label: "Focus",
    title: "Full Stack & Freelancing",
    lines: ["React · Node · MongoDB", "Active freelancer on Upwork"],
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <Reveal stagger={0.1}>
          <p className="mb-4 font-heading text-sm uppercase tracking-[0.24em] text-iris-soft">
            01 — About
          </p>
          <h2 className="font-heading text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
            Crafting the web,
            <br />
            <span className="text-grad">end to end.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            I&apos;m a Full Stack Developer who turns ideas into fast, polished products.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Currently a 3rd-year Computer Science student at SRM Madurai and an active Upwork
            freelancer, I build clean, responsive applications across the stack with React.js,
            Node.js and MongoDB — obsessing over detail, performance and motion.
          </p>
        </Reveal>

        <Reveal stagger={0.12} className="space-y-4">
          {CARDS.map(({ icon: Icon, label, title, lines }) => (
            <div
              key={label}
              data-cursor
              className="glass flex gap-4 rounded-2xl p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-iris/40"
            >
              <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-iris/25 bg-iris/10 text-iris-soft">
                <Icon size={22} />
              </span>
              <div>
                <p className="font-heading text-xs uppercase tracking-[0.16em] text-iris-soft">
                  {label}
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="text-sm text-muted">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

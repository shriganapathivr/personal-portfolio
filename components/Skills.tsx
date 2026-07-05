"use client";

import type { IconType } from "react-icons";
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub,
} from "react-icons/fa";
import {
  SiMongodb, SiJavascript, SiTypescript, SiNextdotjs, SiThreedotjs, SiTailwindcss,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import Reveal from "./Reveal";

type Skill = { name: string; Icon: IconType; color: string };

const SKILLS: Skill[] = [
  { name: "React.js", Icon: FaReact, color: "#61DAFB" },
  { name: "Node.js", Icon: FaNodeJs, color: "#5FA04E" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "HTML5", Icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: FaCss3Alt, color: "#1572B6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "REST API", Icon: TbApi, color: "#9a7bff" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#ffffff" },
  { name: "Git", Icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", Icon: FaGithub, color: "#ffffff" },
];

function Pill({ name, Icon, color }: Skill) {
  return (
    <span className="glass flex flex-none items-center gap-3 whitespace-nowrap rounded-full px-6 py-3">
      <Icon size={22} style={{ color }} aria-hidden />
      <span className="font-heading text-base font-semibold text-ink/90">{name}</span>
    </span>
  );
}

function MarqueeRow({ items, dir }: { items: Skill[]; dir: "left" | "right" }) {
  // Duplicated set → seamless -50% loop with no flicker.
  const loop = [...items, ...items];
  return (
    <div className={`flex w-max gap-5 ${dir === "left" ? "marquee-left" : "marquee-right"}`}>
      {loop.map((s, i) => (
        <Pill key={`${s.name}-${i}`} {...s} />
      ))}
    </div>
  );
}

export default function Skills() {
  const rowB = [...SKILLS].reverse();
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-32">
      <Reveal stagger={0.1} className="mx-auto mb-14 max-w-6xl px-6">
        <p className="mb-4 font-heading text-sm uppercase tracking-[0.24em] text-iris-soft">
          02 — Skills
        </p>
        <h2 className="font-heading text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
          Tools I <span className="text-grad">work with</span>
        </h2>
      </Reveal>

      {/* Two rows, opposite directions, seamless infinite loop */}
      <Reveal className="marquee-paused space-y-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]">
        <MarqueeRow items={SKILLS} dir="left" />
        <MarqueeRow items={rowB} dir="right" />
      </Reveal>
    </section>
  );
}

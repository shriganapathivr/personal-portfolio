"use client";

import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "./Reveal";

const PROJECTS = [
  {
    n: "01",
    title: "Jira Clone",
    type: "Full Stack",
    desc: "A Jira-style project management app with boards, tasks and user authentication — built end-to-end to showcase full stack skills.",
    tech: ["React.js", "Node.js", "MongoDB"],
    live: "https://zira-2h3w.onrender.com/",
    github: "https://github.com/shriganapathivr/JiraClone",
  },
  {
    n: "02",
    title: "Personal Portfolio",
    type: "Frontend",
    desc: "A clean, responsive portfolio showcasing projects, skills and contact information with a modern UI.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://shriganapathiportfolio.netlify.app/",
    github: "https://github.com/shriganapathivr/personal-portfolio",
  },
  {
    n: "03",
    title: "Nuts Shop Landing",
    type: "Frontend",
    desc: "A responsive business landing page for a nuts & dry-fruits shop with product showcase and clear calls to action.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://nuttslandingpage.netlify.app/",
    github: "https://github.com/shriganapathivr/NuttsShopLanding",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <Reveal stagger={0.1} className="mb-14">
        <p className="mb-4 font-heading text-sm uppercase tracking-[0.24em] text-iris-soft">
          03 — Projects
        </p>
        <h2 className="font-heading text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
          Selected <span className="text-grad">Work</span>
        </h2>
      </Reveal>

      <Reveal stagger={0.12} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            data-cursor
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition-[transform,border-color,box-shadow] duration-300 will-change-transform hover:-translate-y-2 hover:scale-[1.02] hover:border-iris/60 hover:shadow-[0_0_54px_-12px_var(--glow-iris)]"
          >
            {/* gradient wash on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(460px_circle_at_50%_-10%,rgba(112,66,248,0.18),rgba(0,216,255,0.08)_45%,transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative mb-5 flex items-center justify-between">
              <span className="font-heading text-sm tracking-[0.1em] text-iris-soft">{p.n}</span>
              <span className="rounded-full border border-iris/40 bg-iris/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-iris-soft">
                {p.type}
              </span>
            </div>

            <h3 className="relative font-heading text-2xl font-bold tracking-tight">{p.title}</h3>
            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>

            <ul className="relative mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink/80"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="relative mt-6 flex gap-3">
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-iris to-aqua px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Live <ArrowUpRight size={15} />
              </a>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-ink transition-colors hover:border-aqua/60 hover:text-aqua"
              >
                <FaGithub size={15} /> Code
              </a>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

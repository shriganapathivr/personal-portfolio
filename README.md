# Shri Ganapathi V.R — Portfolio

A premium, cinematic developer portfolio built with **Next.js (App Router)**,
**Tailwind CSS**, **Framer Motion**, **Three.js / React Three Fiber**, and
**Lucide** icons. Fully static — exports to plain HTML and deploys to
Netlify/Vercel with no server.

## Design

- Full dark theme `#0a0a0a` with electric-green neon `#00ff88` (primary) and a
  purple `#a855f7` secondary accent (custom cursor + project hover glow).
- Glassmorphism cards, animated grain overlay, **Syne** headings + **Inter** body.
- Custom cursor (purple dot + spring-trailed ring), 2s intro loader, parallax
  canvas starfield, infinite skill marquee, and an interactive R3F 3D skill globe.
- Every section animates in on scroll (Framer Motion `whileInView` + staggered
  children). Respects `prefers-reduced-motion`.

## Tech stack

| Area | Tool |
|------|------|
| Framework | Next.js 14 (App Router, `output: 'export'`) |
| Styling | Tailwind CSS |
| Animation | Framer Motion + GSAP (available) |
| 3D | Three.js · @react-three/fiber · @react-three/drei |
| Icons | lucide-react |
| Language | TypeScript |

## Project structure

```
app/
  layout.tsx        # fonts, metadata, global Loader + CustomCursor
  page.tsx          # section composition
  globals.css       # design tokens, glass, grain, marquee, cursor
components/
  Navbar, Hero, About, Projects, Skills, SkillGlobe, Contact, Footer
  Loader, CustomCursor, Button, SectionTitle, Starfield
lib/
  anim.ts           # shared Framer Motion variants
  fonts.ts          # next/font (Syne, Inter)
legacy/             # previous vanilla HTML/CSS/JS site (archived)
```

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & preview the static export

```bash
npm run build        # outputs static site to ./out
npm run preview      # serves ./out locally
```

## Deploy

**Netlify** — Build command `npm run build`, publish directory `out`.
(Or drag-and-drop the `out/` folder at app.netlify.com/drop.)

**Vercel** — Import the repo; Next.js is detected automatically. The
`output: 'export'` config produces a static deployment.

## Contact

- Email: shriganapathi.vr@gmail.com
- LinkedIn: https://www.linkedin.com/in/shriganapathivr/
- GitHub: https://github.com/shriganapathivr
- Upwork: https://www.upwork.com/services/product/development-it-i-will-build-a-responsive-business-landing-page-2064219438312497647

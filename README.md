# Shri Ganapathi V.R — Full Stack Developer Portfolio

A visually rich, single-page developer portfolio built with **Three.js** and a
dark neon aesthetic. Zero build step — plain HTML/CSS + ES-module JavaScript that
pulls Three.js from a CDN, so it deploys to Vercel/Netlify instantly.

## Highlights

- **Hero** — a real WebGL **particle galaxy** (spiral, ~22k points, additive glow)
  with a floating star field and mouse-parallax camera, name/title centered, plus
  "View My Work" and "Hire Me on Upwork" buttons.
- **Skills** — a **draggable 3D sphere** of neon skill badges (Three.js sprites on a
  fibonacci sphere) that auto-rotates and responds to drag/touch.
- **Projects** — glassmorphic cards with **3D pointer-tilt** and a glow that tracks
  the cursor; live + GitHub buttons and tech-stack tags.
- **Cursor glow** that trails the mouse, **blur navigation** bar, scroll-reveal
  animations, scroll-spy nav, magnetic buttons, and a full-screen mobile menu.
- Dark theme `#0a0a0a` with neon **blue `#00d4ff`** + **purple `#7b2fff`** accents.
- Fully responsive (mobile-first) and respects `prefers-reduced-motion`. Gracefully
  falls back to a static skills list if WebGL is unavailable.

## Type pairing

[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (display) +
[Outfit](https://fonts.google.com/specimen/Outfit) (body).

## Project structure

```
.
├── index.html      # markup, content, Three.js importmap
├── styles.css      # dark/neon theme + all styling & animations
├── main.js         # Three.js scenes (galaxy, skills sphere) + UI interactions
├── serve.js        # tiny zero-dependency local preview server (dev only)
├── vercel.json     # static deploy config + security headers
└── README.md
```

## Run locally

It's a static site, but ES modules need to be served over HTTP (not `file://`).

```bash
# Node (uses the included tiny server — no dependencies)
node serve.js
# then visit http://localhost:5173

# …or any static server you like, e.g.
npx serve .
```

## Deploy

### Vercel
1. Push to a GitHub repo.
2. [vercel.com/new](https://vercel.com/new) → **Import** the repo.
3. Framework preset: **Other**, build command empty, output directory `./`.
4. **Deploy.** No build required.

### Netlify
Drag-and-drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop),
or connect the repo with build command empty and publish directory `./`.

## Contact

- Email: shriganapathi.vr@gmail.com
- LinkedIn: https://www.linkedin.com/in/shriganapathivr/
- GitHub: https://github.com/shriganapathivr
- Upwork: https://www.upwork.com/services/product/development-it-i-will-build-a-responsive-business-landing-page-2064219438312497647

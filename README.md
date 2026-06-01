# Shri Ganapathi VR — Portfolio

A single-page personal portfolio for **Shri Ganapathi VR**, a Computer Science &
Engineering student focused on Web Development and Java.

Built as a **zero-dependency static site** (plain HTML, CSS, and JavaScript) — no
build step, no framework, deploys to Vercel in seconds.

## Design

- **Aesthetic:** refined dark editorial.
- **Type pairing:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (optical
  display serif) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (body).
- **Atmosphere:** animated film grain, slow drifting mesh gradient, warm amber accent
  on a near-black canvas.
- **Motion:** staggered page-load reveal, scroll-triggered reveals
  (`IntersectionObserver`), scroll-spy nav, magnetic buttons — all respect
  `prefers-reduced-motion`.
- **Responsive:** mobile-first, with a full-screen mobile menu.

## Sections

Hero · About · Skills · Projects · Achievements · Education & Certifications · Contact · Footer

## Project structure

```
.
├── index.html      # markup + content
├── styles.css      # all styling + animations
├── script.js       # interactions (nav, reveals, form, etc.)
├── vercel.json      # static deploy config
└── README.md
```

## Run locally

It's a static site, so just open `index.html` in a browser. For the cleanest local
experience (correct paths, no file:// quirks), serve it:

```bash
# Option A — Python (no install)
python -m http.server 5173
# then visit http://localhost:5173

# Option B — Node
npx serve .
```

## Deploy to Vercel

### Option A — Vercel dashboard (no CLI)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and **import** the repo.
3. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: `./`.
4. Click **Deploy**. Done.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

No build is required — Vercel serves the static files directly.

## Contact

The contact form composes a pre-filled email via `mailto:` (opens the visitor's mail
client). Direct email and phone links are also provided.

- Email: shriganapathi.vr@gmail.com
- Phone: +91 96555 16887
- GitHub: https://github.com/shriganapathivr
- LinkedIn: https://www.linkedin.com/in/shriganapathivr
- LeetCode: https://leetcode.com/u/Jx5Eh3Fpwx

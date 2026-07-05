/* =========================================================
   Shri Ganapathi V.R — Premium Portfolio
   - Motion (Framer Motion family, vanilla) for animations
   - Three.js: hero particle galaxy + draggable skills globe
   - Typing role, headline word reveal, navbar hide/show,
     custom cursor, magnetic buttons, 3D tilt cards
   ========================================================= */

import * as THREE from "three";

const root = document.documentElement;
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 720px)").matches;
const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const EASE = [0.16, 1, 0.3, 1];
const COLORS = { cyan: 0x00d4ff, violet: 0x8b5cf6 };

/* =========================================================
   MOTION (dynamic import → isolated from Three.js failures)
   ========================================================= */
async function initMotion() {
  // Reduced motion: just reveal everything, skip animation.
  if (prefersReduced) { revealAll(); return; }
  let motion;
  try {
    motion = await import("motion");
  } catch (e) {
    console.warn("Motion failed to load — revealing content.", e);
    root.classList.add("anim-failed");
    revealAll();
    return;
  }
  const { animate, inView, stagger } = motion;

  const kf = (el) => {
    const type = el.getAttribute("data-animate");
    if (type === "fade-down") return { opacity: [0, 1], y: [-24, 0] };
    if (type === "zoom") return { opacity: [0, 1], scale: [0.86, 1] };
    return { opacity: [0, 1], y: [34, 0] }; // fade-up default
  };

  /* Hero headline: word-by-word reveal */
  const words = document.querySelectorAll("[data-headline] .word");
  if (words.length) {
    animate(words, { opacity: [0, 1], y: ["110%", "0%"] },
      { duration: 0.9, delay: stagger(0.12, { start: 0.25 }), ease: EASE });
  }

  /* Hero non-headline items (fade in shortly after) */
  document.querySelectorAll(".hero [data-animate]").forEach((el, i) => {
    animate(el, kf(el), { duration: 0.7, delay: 0.5 + i * 0.1, ease: EASE });
  });

  /* Staggered groups */
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    const items = group.querySelectorAll("[data-animate]");
    inView(group, () => {
      items.forEach((el, i) => animate(el, kf(el), { duration: 0.7, delay: i * 0.08, ease: EASE }));
    }, { amount: 0.15 });
  });

  /* Standalone reveals (not in hero, not in a stagger group) */
  document.querySelectorAll("[data-animate]").forEach((el) => {
    if (el.closest("[data-stagger]") || el.closest(".hero")) return;
    inView(el, () => animate(el, kf(el), { duration: 0.75, ease: EASE }), { amount: 0.2 });
  });
}

function revealAll() {
  document.querySelectorAll("[data-animate]").forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
  document.querySelectorAll("[data-headline] .word").forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
}

/* =========================================================
   TYPING EFFECT (role)
   ========================================================= */
function initTyping() {
  const el = document.getElementById("typed");
  if (!el) return;
  const phrases = ["Full Stack Web Developer", "React.js Developer", "Freelancer on Upwork"];
  if (prefersReduced) { el.textContent = phrases[0]; return; }

  let p = 0, i = 0, deleting = false;
  const tick = () => {
    const word = phrases[p];
    el.textContent = word.slice(0, i);
    if (!deleting && i < word.length) { i++; setTimeout(tick, 70); }
    else if (!deleting && i === word.length) { deleting = true; setTimeout(tick, 1600); }
    else if (deleting && i > 0) { i--; setTimeout(tick, 35); }
    else { deleting = false; p = (p + 1) % phrases.length; setTimeout(tick, 350); }
  };
  setTimeout(tick, 900);
}

/* =========================================================
   HERO GALAXY (Three.js)
   ========================================================= */
function initGalaxy() {
  const canvas = document.getElementById("galaxy");
  if (!canvas) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
  catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 2.2, 6);
  camera.lookAt(0, 0, 0);

  const P = { count: isMobile ? 9000 : 20000, radius: 9, branches: 4, spin: 1.1, randomness: 0.55, power: 2.6, size: 0.035 };
  const positions = new Float32Array(P.count * 3);
  const colors = new Float32Array(P.count * 3);
  const inside = new THREE.Color(COLORS.cyan);
  const outside = new THREE.Color(COLORS.violet);

  for (let i = 0; i < P.count; i++) {
    const i3 = i * 3;
    const r = Math.random() * P.radius;
    const branch = ((i % P.branches) / P.branches) * Math.PI * 2;
    const spin = r * P.spin;
    const rand = () => Math.pow(Math.random(), P.power) * (Math.random() < 0.5 ? 1 : -1) * P.randomness * r;
    positions[i3] = Math.cos(branch + spin) * r + rand();
    positions[i3 + 1] = rand() * 0.5;
    positions[i3 + 2] = Math.sin(branch + spin) * r + rand();
    const mixed = inside.clone().lerp(outside, r / P.radius);
    colors[i3] = mixed.r; colors[i3 + 1] = mixed.g; colors[i3 + 2] = mixed.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const glow = makeGlowTexture();
  const mat = new THREE.PointsMaterial({ size: P.size, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true, transparent: true, map: glow, opacity: 0.9 });
  const galaxy = new THREE.Points(geo, mat);
  galaxy.rotation.x = 0.5;
  scene.add(galaxy);

  // star field
  const starCount = isMobile ? 500 : 1200;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) { const i3 = i * 3; starPos[i3] = (Math.random() - 0.5) * 40; starPos[i3 + 1] = (Math.random() - 0.5) * 30; starPos[i3 + 2] = (Math.random() - 0.5) * 40; }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.05, color: 0xbfeaff, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending, map: glow }));
  scene.add(stars);

  const mouse = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => { mouse.x = (e.clientX / window.innerWidth - 0.5) * 2; mouse.y = (e.clientY / window.innerHeight - 0.5) * 2; });
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const clock = new THREE.Clock();
  let visible = true;
  document.addEventListener("visibilitychange", () => (visible = !document.hidden));
  (function tick() {
    if (visible) {
      const t = clock.getElapsedTime();
      galaxy.rotation.y = prefersReduced ? 0.2 : t * 0.06;
      stars.rotation.y = t * 0.01;
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (2.2 - mouse.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  })();
}

function makeGlowTexture() {
  const s = 64; const c = document.createElement("canvas"); c.width = c.height = s;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.3, "rgba(255,255,255,0.6)"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

/* =========================================================
   SKILLS GLOBE (Three.js)
   ========================================================= */
function initSkillsGlobe() {
  const canvas = document.getElementById("skillsCanvas");
  if (!canvas) return;
  const stage = canvas.parentElement;
  const skills = ["React.js", "Node.js", "MongoDB", "REST API", "Three.js", "Git", "JavaScript", "HTML", "CSS", "Responsive"];

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
  catch (e) { return; }
  stage.classList.add("webgl-on");

  const sizeOf = () => ({ w: canvas.clientWidth || 1, h: canvas.clientHeight || 1 });
  let { w, h } = sizeOf();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.z = 6;
  const group = new THREE.Group();
  scene.add(group);

  const radius = 2.3;
  skills.forEach((label, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    const sprite = makeBadgeSprite(label, i % 2 === 0 ? COLORS.cyan : COLORS.violet);
    sprite.position.setFromSphericalCoords(radius, phi, theta);
    group.add(sprite);
  });
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(radius, 24, 24),
    new THREE.MeshBasicMaterial({ color: COLORS.cyan, wireframe: true, transparent: true, opacity: 0.06 })
  ));

  let dragging = false, last = { x: 0, y: 0 }, vel = { x: 0.0015, y: 0.003 };
  const pointer = (e) => { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; };
  canvas.addEventListener("pointerdown", (e) => { dragging = true; last = pointer(e); });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return; const p = pointer(e);
    vel.y = (p.x - last.x) * 0.005; vel.x = (p.y - last.y) * 0.005; last = p;
  });
  window.addEventListener("pointerup", () => (dragging = false));
  window.addEventListener("resize", () => { ({ w, h } = sizeOf()); camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); });

  let active = true;
  if ("IntersectionObserver" in window) new IntersectionObserver((es) => es.forEach((en) => (active = en.isIntersecting)), { threshold: 0 }).observe(stage);

  (function tick() {
    if (active) {
      if (!dragging) { vel.y += (0.003 - vel.y) * 0.02; vel.x += (0.0015 - vel.x) * 0.02; }
      group.rotation.y += prefersReduced ? 0.001 : vel.y;
      group.rotation.x += prefersReduced ? 0 : vel.x;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  })();
}

function makeBadgeSprite(text, hex) {
  const pad = 36, fontSize = 52;
  const cnv = document.createElement("canvas");
  const ctx = cnv.getContext("2d");
  ctx.font = `700 ${fontSize}px "Syne", sans-serif`;
  const tw = ctx.measureText(text).width;
  const w = Math.ceil(tw + pad * 2), hh = fontSize + pad * 1.4;
  cnv.width = w; cnv.height = hh;
  const col = "#" + hex.toString(16).padStart(6, "0");
  const r = hh / 2;
  roundRect(ctx, 2, 2, w - 4, hh - 4, r);
  ctx.fillStyle = "rgba(10,12,20,0.85)"; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 18; ctx.stroke();
  ctx.shadowBlur = 0; ctx.font = `700 ${fontSize}px "Syne", sans-serif`; ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, hh / 2 + 2);
  const tex = new THREE.CanvasTexture(cnv); tex.anisotropy = 4;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  const scale = 0.0042; sprite.scale.set(w * scale, hh * scale, 1);
  return sprite;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

/* =========================================================
   UI INTERACTIONS
   ========================================================= */
function initUI() {
  const reveal = () => setTimeout(() => root.classList.add("loaded"), prefersReduced ? 0 : 500);
  if (document.readyState === "complete") reveal(); else window.addEventListener("load", reveal);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Navbar: blur on scroll + hide on scroll-down / show on scroll-up */
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    if (y > lastY && y > 260) nav.classList.add("nav--hidden");
    else nav.classList.remove("nav--hidden");
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const openMenu = () => { menu.classList.add("open"); menu.setAttribute("aria-hidden", "false"); toggle.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; };
  const closeMenu = () => { if (!menu.classList.contains("open")) return; menu.classList.remove("open"); menu.setAttribute("aria-hidden", "true"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
  toggle?.addEventListener("click", () => (toggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu()));
  window.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href"); if (id.length < 2) return;
      const target = document.querySelector(id); if (!target) return;
      e.preventDefault(); closeMenu();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  document.getElementById("toTop")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }));

  /* Scroll-spy */
  const navLinks = document.querySelectorAll(".nav__links a");
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && navLinks.length) {
    const spy = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) { const id = en.target.id; navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id)); }
    }), { threshold: 0.5, rootMargin: "-20% 0px -40% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  if (hoverCapable && !prefersReduced) {
    initCursor();
    initMagnetic();
    initTilt();
  } else {
    document.getElementById("cursorDot")?.remove();
    document.getElementById("cursorRing")?.remove();
  }
}

/* Custom cursor: dot + trailing ring with hover state */
function initCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;
  document.body.classList.add("custom-cursor");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  window.addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`; });
  (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`; requestAnimationFrame(loop); })();
  document.querySelectorAll('a, button, [data-tilt], .badge, #skillsCanvas').forEach((el) => {
    el.addEventListener("pointerenter", () => ring.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => ring.classList.remove("is-hover"));
  });
}

function initMagnetic() {
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${(e.clientY - (r.top + r.height / 2)) * 0.25}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = "translate(0,0)"));
  });
}

function initTilt() {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const glow = card.querySelector(".pcard__glow");
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 10}deg) translateY(-8px)`;
      if (glow) { glow.style.setProperty("--mx", px * 100 + "%"); glow.style.setProperty("--my", py * 100 + "%"); }
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });
}

/* =========================================================
   BOOT
   ========================================================= */
initUI();
initTyping();
initMotion();
initGalaxy();
initSkillsGlobe();

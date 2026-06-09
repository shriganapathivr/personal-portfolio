/* =========================================================
   Shri Ganapathi V.R — Portfolio
   Three.js scenes + UI interactions
   - Hero: particle galaxy + floating star field
   - Skills: draggable 3D sphere of skill badges
   - Cursor glow, blur nav, tilt cards, scroll reveals
   ========================================================= */

import * as THREE from "three";

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 720px)").matches;
const COLORS = { blue: 0x00d4ff, purple: 0x7b2fff };

/* =========================================================
   1. HERO GALAXY
   ========================================================= */
function initGalaxy() {
  const canvas = document.getElementById("galaxy");
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    return; // no WebGL — gracefully skip (dark bg remains)
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 2.2, 6);
  camera.lookAt(0, 0, 0);

  /* ---- Spiral galaxy ---- */
  const PARAMS = {
    count: isMobile ? 9000 : 22000,
    radius: 9,
    branches: 4,
    spin: 1.1,
    randomness: 0.55,
    randomnessPower: 2.6,
    size: 0.035,
  };
  const positions = new Float32Array(PARAMS.count * 3);
  const colors = new Float32Array(PARAMS.count * 3);
  const inside = new THREE.Color(COLORS.blue);
  const outside = new THREE.Color(COLORS.purple);

  for (let i = 0; i < PARAMS.count; i++) {
    const i3 = i * 3;
    const r = Math.random() * PARAMS.radius;
    const branchAngle = ((i % PARAMS.branches) / PARAMS.branches) * Math.PI * 2;
    const spinAngle = r * PARAMS.spin;

    const rand = () =>
      Math.pow(Math.random(), PARAMS.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      PARAMS.randomness *
      r;

    positions[i3] = Math.cos(branchAngle + spinAngle) * r + rand();
    positions[i3 + 1] = rand() * 0.5;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rand();

    const mixed = inside.clone().lerp(outside, r / PARAMS.radius);
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  const galaxyGeo = new THREE.BufferGeometry();
  galaxyGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  galaxyGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const galaxyMat = new THREE.PointsMaterial({
    size: PARAMS.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    map: makeGlowTexture(),
    opacity: 0.9,
  });
  const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
  galaxy.rotation.x = 0.5;
  scene.add(galaxy);

  /* ---- Floating star field ---- */
  const starCount = isMobile ? 600 : 1400;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    starPos[i3] = (Math.random() - 0.5) * 40;
    starPos[i3 + 1] = (Math.random() - 0.5) * 30;
    starPos[i3 + 2] = (Math.random() - 0.5) * 40;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xbfeaff,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: makeGlowTexture(),
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ---- Mouse parallax ---- */
  const mouse = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ---- Resize ---- */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const clock = new THREE.Clock();
  let visible = true;
  document.addEventListener("visibilitychange", () => (visible = !document.hidden));

  function tick() {
    if (visible) {
      const t = clock.getElapsedTime();
      galaxy.rotation.y = prefersReduced ? 0.2 : t * 0.06;
      stars.rotation.y = t * 0.01;

      // smooth camera parallax
      const targetX = mouse.x * 0.6;
      const targetY = 2.2 - mouse.y * 0.4;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  tick();
}

/* Soft round glow sprite texture for points */
function makeGlowTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

/* =========================================================
   2. SKILLS SPHERE
   ========================================================= */
function initSkillsSphere() {
  const canvas = document.getElementById("skillsCanvas");
  if (!canvas) return;
  const stage = canvas.parentElement;

  const skills = [
    "HTML", "CSS", "JavaScript", "React.js", "Node.js",
    "MongoDB", "REST API", "Git & GitHub", "Responsive Design", "Three.js",
  ];

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    return; // keep the CSS fallback list visible
  }
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
    // Fibonacci sphere distribution
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    const sprite = makeBadgeSprite(label, i % 2 === 0 ? COLORS.blue : COLORS.purple);
    sprite.position.setFromSphericalCoords(radius, phi, theta);
    group.add(sprite);
  });

  // subtle wireframe sphere to anchor the badges
  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 24, 24),
    new THREE.MeshBasicMaterial({ color: COLORS.blue, wireframe: true, transparent: true, opacity: 0.06 })
  );
  group.add(wire);

  /* ---- Drag to rotate ---- */
  let dragging = false;
  let last = { x: 0, y: 0 };
  let vel = { x: 0.0015, y: 0.003 }; // auto-rotate velocity

  const onDown = (e) => { dragging = true; last = pointer(e); };
  const onMove = (e) => {
    if (!dragging) return;
    const p = pointer(e);
    const dx = p.x - last.x;
    const dy = p.y - last.y;
    vel.y = dx * 0.005;
    vel.x = dy * 0.005;
    last = p;
  };
  const onUp = () => (dragging = false);
  const pointer = (e) => {
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX, y: t.clientY };
  };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  window.addEventListener("resize", () => {
    ({ w, h } = sizeOf());
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });

  // Only render when section is near the viewport (perf)
  let active = false;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => entries.forEach((en) => (active = en.isIntersecting)),
      { threshold: 0 }
    ).observe(stage);
  } else {
    active = true;
  }

  function tick() {
    if (active) {
      if (!dragging) {
        // ease back toward gentle auto-spin
        vel.y += (0.003 - vel.y) * 0.02;
        vel.x += (0.0015 - vel.x) * 0.02;
      }
      group.rotation.y += prefersReduced ? 0.001 : vel.y;
      group.rotation.x += prefersReduced ? 0 : vel.x;
      // keep badges facing camera-ish by counter-rotating? sprites already face camera.
      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  tick();
}

/* Rounded neon badge drawn to a canvas, used as a Sprite map */
function makeBadgeSprite(text, hexColor) {
  const pad = 36;
  const fontSize = 52;
  const cnv = document.createElement("canvas");
  const ctx = cnv.getContext("2d");
  ctx.font = `600 ${fontSize}px "Space Grotesk", sans-serif`;
  const textW = ctx.measureText(text).width;
  const w = Math.ceil(textW + pad * 2);
  const hgt = fontSize + pad * 1.4;
  cnv.width = w;
  cnv.height = hgt;

  const col = "#" + hexColor.toString(16).padStart(6, "0");

  // pill background
  const r = hgt / 2;
  ctx.clearRect(0, 0, w, hgt);
  roundRect(ctx, 2, 2, w - 4, hgt - 4, r);
  ctx.fillStyle = "rgba(10,12,20,0.85)";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = col;
  ctx.shadowColor = col;
  ctx.shadowBlur = 18;
  ctx.stroke();

  // text
  ctx.shadowBlur = 0;
  ctx.font = `600 ${fontSize}px "Space Grotesk", sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, hgt / 2 + 2);

  const tex = new THREE.CanvasTexture(cnv);
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  const scale = 0.0042;
  sprite.scale.set(w * scale, hgt * scale, 1);
  return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* =========================================================
   3. UI INTERACTIONS
   ========================================================= */
function initUI() {
  /* Page-load reveal */
  const showPage = () => setTimeout(() => document.body.classList.add("loaded"), prefersReduced ? 0 : 600);
  if (document.readyState === "complete") showPage();
  else window.addEventListener("load", showPage);

  /* Year */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Nav scrolled state */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const openMenu = () => {
    menu.classList.add("open"); menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open"); menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
  };
  toggle?.addEventListener("click", () =>
    toggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu()
  );
  window.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());

  /* Smooth scroll for in-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  /* Back to top */
  document.getElementById("toTop")?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
  );

  /* Scroll reveal */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* Scroll-spy active nav link */
  const navLinks = document.querySelectorAll(".nav__links a");
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && navLinks.length) {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          const id = en.target.id;
          navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
        }
      }),
      { threshold: 0.5, rootMargin: "-20% 0px -40% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Cursor glow */
  const glow = document.getElementById("cursorGlow");
  if (glow && hoverCapable && !prefersReduced) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy;
    window.addEventListener("pointermove", (e) => { gx = e.clientX; gy = e.clientY; });
    (function follow() {
      cx += (gx - cx) * 0.15; cy += (gy - cy) * 0.15;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(follow);
    })();
  } else if (glow) {
    glow.style.display = "none";
  }

  /* Magnetic buttons */
  if (hoverCapable && !prefersReduced) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = "translate(0,0)"));
    });
  }

  /* 3D tilt project cards */
  if (hoverCapable && !prefersReduced) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const glowEl = card.querySelector(".pcard__glow");
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * -10;
        const ry = (px - 0.5) * 12;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        if (glowEl) {
          glowEl.style.setProperty("--mx", px * 100 + "%");
          glowEl.style.setProperty("--my", py * 100 + "%");
        }
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }
}

/* =========================================================
   BOOT
   ========================================================= */
initUI();
initGalaxy();
initSkillsSphere();

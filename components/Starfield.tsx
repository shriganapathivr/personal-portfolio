"use client";

import { useEffect, useRef } from "react";

/**
 * Rule 10: subtle starfield with parallax on mouse move (hero).
 * Plain 2D canvas — stars drift slowly upward and shift with the
 * pointer by a depth-weighted amount. A few soft green particles
 * float for atmosphere. Respects reduced motion (renders static).
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;

    type Star = { x: number; y: number; z: number; r: number; green: boolean; tw: number };
    type Blob = { x: number; y: number; r: number; vx: number; vy: number };
    let stars: Star[] = [];
    let blobs: Blob[] = [];

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const build = () => {
      const count = w < 720 ? 90 : 170;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        r: Math.random() * 1.5 + 0.3,
        green: Math.random() < 0.16,
        tw: Math.random() * Math.PI * 2,
      }));
      blobs = Array.from({ length: w < 720 ? 3 : 6 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 70 + 40,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // soft floating green blobs
      for (const b of blobs) {
        b.x += b.vx; b.y += b.vy;
        if (b.x < -b.r) b.x = w + b.r; if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r; if (b.y > h + b.r) b.y = -b.r;
        const px = b.x + mouse.x * 24;
        const py = b.y + mouse.y * 24;
        const g = ctx.createRadialGradient(px, py, 0, px, py, b.r);
        g.addColorStop(0, "rgba(0,255,136,0.06)");
        g.addColorStop(1, "rgba(0,255,136,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // stars
      for (const s of stars) {
        if (!reduce) {
          s.y -= s.z * 0.15;          // slow drift up
          if (s.y < -2) s.y = h + 2;
          s.tw += 0.02;
        }
        const px = s.x + mouse.x * s.z * 34;  // parallax by depth
        const py = s.y + mouse.y * s.z * 34;
        const alpha = reduce ? 0.7 : 0.4 + Math.sin(s.tw) * 0.35;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.green
          ? `rgba(0,255,136,${alpha})`
          : `rgba(220,235,228,${alpha})`;
        ctx.fill();
      }
    };

    const loop = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

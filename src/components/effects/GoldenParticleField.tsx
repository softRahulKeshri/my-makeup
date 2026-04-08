"use client";

import { useEffect, useRef, useState } from "react";
import type { GoldenParticleFieldProps } from "@/types/golden-particle-field";

const MAX_PARTICLES = 140;

const parseColorToRgb = (value: string): [number, number, number] => {
  const v = value.trim();
  if (v.startsWith("#")) {
    const h = v.slice(1);
    const full =
      h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const n = Number.parseInt(full, 16);
    if (Number.isNaN(n)) return [212, 175, 55];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
  return [212, 175, 55];
};

const readBrandParticleColors = (): [string, string, string] => {
  if (typeof document === "undefined") {
    return ["#d4af37", "#e48f0f", "#f7f2e8"];
  }
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const gold = style.getPropertyValue("--brand-gold").trim() || "#d4af37";
  const turmeric = style.getPropertyValue("--brand-turmeric").trim() || "#e48f0f";
  const champagne = style.getPropertyValue("--brand-champagne").trim() || "#f7f2e8";
  return [gold, turmeric, champagne];
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  base: number;
  pulse: number;
  rgb: [number, number, number];
  sparkle: boolean;
};

export const GoldenParticleField = ({
  className = "",
  particleCount = 96,
}: GoldenParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const count = Math.min(Math.max(24, particleCount), MAX_PARTICLES);

    const initParticles = (w: number, h: number) => {
      const [goldS, turS, chS] = readBrandParticleColors();
      const palette = [
        parseColorToRgb(goldS),
        parseColorToRgb(turS),
        parseColorToRgb(chS),
      ];
      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const rgb = palette[i % palette.length];
        const sparkle = i % 7 === 0;
        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: sparkle ? Math.random() * 2.2 + 0.6 : Math.random() * 1.4 + 0.35,
          base: Math.random() * Math.PI * 2,
          pulse: 0.55 + Math.random() * 0.55,
          rgb,
          sparkle,
        });
      }
      particlesRef.current = next;
    };

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      if (width < 1 || height < 1) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let raf = 0;
    let last = performance.now();
    let running = true;

    const frame = (now: number) => {
      if (!running) return;
      const hidden = document.visibilityState === "hidden";
      const dt = hidden ? 0 : Math.min((now - last) / 1000, 0.064);
      last = now;

      if (!hidden && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);
        const particles = particlesRef.current;

        for (const p of particles) {
          p.x += p.vx * dt * 55;
          p.y += p.vy * dt * 55;
          p.base += dt * (p.sparkle ? 1.1 : 0.65);

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          const tw = 0.5 + 0.5 * Math.sin(p.base * p.pulse);
          const baseAlpha = p.sparkle ? 0.12 + tw * 0.55 : 0.06 + tw * 0.38;
          const [r, g, b] = p.rgb;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${baseAlpha})`;
          ctx.fill();

          if (p.sparkle) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${baseAlpha * 0.22})`;
            ctx.fill();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reducedMotion, particleCount]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {reducedMotion ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_20%,rgba(212,175,55,0.12),transparent_55%),radial-gradient(ellipse_70%_50%_at_80%_90%,rgba(228,143,15,0.08),transparent_50%),radial-gradient(ellipse_50%_40%_at_15%_75%,rgba(247,242,232,0.06),transparent_45%)]"
          aria-hidden
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />
      )}
    </div>
  );
};

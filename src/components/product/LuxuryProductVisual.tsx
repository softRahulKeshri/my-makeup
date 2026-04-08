"use client";

import { useEffect, useState } from "react";
import type { LuxuryProductVisualProps } from "@/types/luxury-product-visual";

/**
 * Pure CSS/SVG luxury cream jar — no raster assets. GPU-friendly transforms only.
 */
export const LuxuryProductVisual = ({
  className = "",
  reducedMotion: reducedMotionProp,
}: LuxuryProductVisualProps) => {
  const [reducedMotion, setReducedMotion] = useState(reducedMotionProp ?? false);

  useEffect(() => {
    if (reducedMotionProp !== undefined) {
      setReducedMotion(reducedMotionProp);
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reducedMotionProp]);

  const animateClass = reducedMotion ? "" : "lux-jar-float";

  return (
    <div
      className={`relative mx-auto aspect-[3/5] max-h-[min(72vh,520px)] w-full max-w-[320px] ${className}`}
      role="img"
      aria-label="Stylized premium face cream jar"
    >
      <div
        className="pointer-events-none absolute -inset-[18%] rounded-full bg-[radial-gradient(ellipse_65%_55%_at_50%_55%,rgba(212,175,55,0.35),rgba(228,143,15,0.12)_45%,transparent_70%)] blur-3xl motion-reduce:opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-[8%] rounded-[40%] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(212,175,55,0.2),rgba(247,242,232,0.08),rgba(228,143,15,0.18),rgba(212,175,55,0.15))] opacity-90 blur-2xl motion-reduce:animate-none"
        aria-hidden
      />
      <div className={`relative h-full w-full ${animateClass}`}>
        <svg
          viewBox="0 0 200 340"
          className="h-full w-full drop-shadow-[0_32px_48px_rgba(0,0,0,0.45)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="luxJarBody" x1="40" y1="120" x2="160" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fffefb" />
              <stop offset="45%" stopColor="#f7f0e4" />
              <stop offset="100%" stopColor="#ebe2d4" />
            </linearGradient>
            <linearGradient id="luxJarGlass" x1="60" y1="140" x2="200" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="luxJarGold" x1="50" y1="40" x2="150" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f4e4b8" />
              <stop offset="35%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#b8941f" />
              <stop offset="100%" stopColor="#e8c76a" />
            </linearGradient>
            <linearGradient id="luxJarCream" x1="70" y1="175" x2="130" y2="255" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff9f0" />
              <stop offset="50%" stopColor="#fcefd9" />
              <stop offset="100%" stopColor="#f0d9b8" />
            </linearGradient>
            <filter id="luxJarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="luxJarClip">
              <path d="M52 118 C52 88 68 72 100 72 C132 72 148 88 148 118 L148 268 C148 296 132 312 100 312 C68 312 52 296 52 268 Z" />
            </clipPath>
          </defs>

          {/* Soft base shadow */}
          <ellipse cx="100" cy="318" rx="58" ry="10" fill="rgba(0,0,0,0.35)" opacity="0.45" />

          {/* Jar body */}
          <path
            d="M52 118 C52 88 68 72 100 72 C132 72 148 88 148 118 L148 268 C148 296 132 312 100 312 C68 312 52 296 52 268 Z"
            fill="url(#luxJarBody)"
            stroke="rgba(212,175,55,0.45)"
            strokeWidth="1.2"
          />

          {/* Cream fill with animated mask */}
          <g clipPath="url(#luxJarClip)">
            <rect x="52" y="165" width="96" height="160" fill="url(#luxJarCream)" className={reducedMotion ? "" : "lux-cream-wave"} />
            <ellipse cx="100" cy="168" rx="44" ry="10" fill="rgba(255,255,255,0.55)" />
          </g>

          {/* Glass highlight */}
          <path
            d="M58 118 C58 92 72 78 100 78 C128 78 142 92 142 118 L142 268 C142 290 128 304 100 304 C72 304 58 290 58 268 Z"
            fill="url(#luxJarGlass)"
            opacity="0.85"
          />

          {/* Gold lid */}
          <ellipse cx="100" cy="78" rx="52" ry="14" fill="url(#luxJarGold)" filter="url(#luxJarGlow)" />
          <ellipse cx="100" cy="72" rx="48" ry="11" fill="rgba(255,255,255,0.35)" />
          <rect x="88" y="48" width="24" height="28" rx="6" fill="url(#luxJarGold)" />
          <ellipse cx="100" cy="52" rx="14" ry="5" fill="rgba(255,255,255,0.5)" />

          {/* Rim shine */}
          <path
            d="M60 108 C60 98 78 88 100 88 C122 88 140 98 140 108"
            stroke="rgba(212,175,55,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>

        {/* Orbiting shimmer ring — decorative */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center ${reducedMotion ? "" : "lux-orbit"}`}
          aria-hidden
        >
          <div className="h-[108%] w-[72%] rounded-[42%] border border-brand-gold/20 shadow-[inset_0_0_40px_rgba(212,175,55,0.12)]" />
        </div>
      </div>
    </div>
  );
};

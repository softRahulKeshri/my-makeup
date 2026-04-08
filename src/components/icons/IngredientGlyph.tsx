"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { ASSETS } from "@/constants/assets";
import { INGREDIENT_IMAGE_ALT } from "@/constants/ingredient-image-alts";
import type { IngredientGlyphId, IngredientGlyphProps } from "@/types/ingredients";

gsap.registerPlugin(ScrollTrigger);

/**
 * Per-ingredient ambient glow colour — mirrors each botanical's dominant hue.
 * These soft halos bleed through the dark page background and give each ingredient
 * its own chromatic identity without a hard frame or device shell.
 */
const GLOW: Record<IngredientGlyphId, string> = {
  aloe: "rgba(120, 210, 80, 0.28)",
  orange: "rgba(255, 158, 20, 0.32)",
  turmeric: "rgba(228, 143, 15, 0.36)",
  avocado: "rgba(108, 185, 58, 0.26)",
};

/**
 * IngredientGlyph — real AI product photography, watermark-free, dark-bg blended.
 *
 * Watermark removal strategy:
 *   The AI-generated images carry a small badge at the very bottom of the frame.
 *   We apply `transform: scale(1.18) translateY(-5%)` on the <img> so the badge
 *   is pushed below the container's clipped boundary (overflow: hidden on the frame).
 *   A CSS mask-image on the frame further dissolves all four edges into the dark
 *   page background, giving a "floating ingredient" feel with zero hard borders.
 *
 * Blend strategy:
 *   Both the product photos and the page background are near-black.  Rather than
 *   relying on mix-blend-mode (which flattens colour), we use:
 *     1. mask-image radial gradient → edges fade to transparent → page bg shows through
 *     2. A per-ingredient radial glow behind the frame → warm chromatic halo
 *     3. A subtle linear gradient overlay inside the frame for the bottom edge
 *
 * These three layers together make each image feel like it's *part of* the surface
 * rather than pasted on top of it.
 */
export const IngredientGlyph = ({
  kind,
  className = "",
  animate = true,
}: IngredientGlyphProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const src = ASSETS.ingredientImages[kind];
  const glowColor = GLOW[kind];

  useGSAP(
    () => {
      if (!animate) return;
      const root = rootRef.current;
      const wrap = wrapRef.current;
      if (!root || !wrap) return;

      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) {
        gsap.set(wrap, { scale: 1, opacity: 1, y: 0 });
        return;
      }

      // Start slightly scaled down + invisible; GSAP blooms it up on scroll.
      gsap.set(wrap, { scale: 0.78, opacity: 0, y: 28, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(wrap, { scale: 1, opacity: 1, y: 0, duration: 0.95 });

      return () => tl.kill();
    },
    { scope: rootRef, dependencies: [kind, animate] },
  );

  return (
    <div
      ref={rootRef}
      className={`relative flex shrink-0 items-center justify-center ${className}`}
    >
      {/*
        Ambient glow ring — sits BEHIND the frame in the stacking order.
        Uses a large blur-3xl so it bleeds softly into the surrounding dark space
        without a hard edge.  The glow is ingredient-specific so users can
        unconsciously associate colour with flavour (orange warmth vs aloe green).
      */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 scale-125 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${glowColor}, transparent 62%)`,
        }}
        aria-hidden
      />

      {/*
        wrapRef is the GSAP animation target.  Separating it from rootRef (the
        ScrollTrigger trigger) prevents the trigger from re-firing mid-animation
        if a parent layout shift moves the element.
      */}
      <div ref={wrapRef} className="ingredient-glyph-frame will-change-transform">
        {/*
          Inner image container.
          overflow: hidden  → clips the scaled-up image so the watermark sits below the fold.
          mask-image        → radial ellipse centred high in the frame; edges dissolve to
                              transparent so the dark page background bleeds through naturally.
          The mask centre is at 50% / 38% (slightly above vertical centre) so the
          ingredient at the top stays vivid while the reflective marble surface and
          watermark at the bottom fade more aggressively.
        */}
        <div
          className="ingredient-glyph-inner relative overflow-hidden"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 88% 80% at 50% 38%, black 32%, rgba(0,0,0,0.75) 52%, transparent 72%)",
            maskImage:
              "radial-gradient(ellipse 88% 80% at 50% 38%, black 32%, rgba(0,0,0,0.75) 52%, transparent 72%)",
          }}
        >
          {/*
            scale(1.18) → pushes the ~bottom-6% AI badge below the container boundary.
            translateY(-5%) → shifts the frame upward so the ingredient remains centred
            after the scale expansion.  Both values were calibrated by eye on all four
            ingredient images to ensure no badge bleed.
          */}
          <Image
            src={src}
            alt={INGREDIENT_IMAGE_ALT[kind]}
            width={530}
            height={944}
            sizes="(max-width: 640px) 148px, (max-width: 768px) 180px, 220px"
            className="ingredient-glyph-img block h-auto w-full object-cover"
            style={{
              transform: "scale(1.18) translateY(-5%)",
              transformOrigin: "50% 45%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

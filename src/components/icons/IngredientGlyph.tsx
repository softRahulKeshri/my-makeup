"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Citrus, FlameKindling, Leaf, Salad, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import type { IngredientGlyphId, IngredientGlyphProps } from "@/types/ingredients";

gsap.registerPlugin(ScrollTrigger);

const GLYPH_MAP: Record<IngredientGlyphId, LucideIcon> = {
  aloe: Leaf,
  orange: Citrus,
  turmeric: FlameKindling,
  avocado: Salad,
};

/**
 * Lucide-based ingredient mark inside a gold glass orb.
 * Entrance: scale 0→1 + slight rotation — scroll-triggered, respects reduced motion.
 */
export const IngredientGlyph = ({
  kind,
  className = "",
  animate = true,
}: IngredientGlyphProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const iconWrapRef = useRef<HTMLDivElement>(null);
  const Icon = GLYPH_MAP[kind];

  useGSAP(
    () => {
      if (!animate) return;
      const root = rootRef.current;
      const wrap = iconWrapRef.current;
      if (!root || !wrap) return;

      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) {
        gsap.set(wrap, { scale: 1, rotation: 0, opacity: 1 });
        return;
      }

      gsap.set(wrap, { scale: 0, rotation: -15, opacity: 0, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(wrap, { scale: 1, rotation: 0, opacity: 1, duration: 0.65 });

      return () => {
        tl.kill();
      };
    },
    { scope: rootRef, dependencies: [kind, animate] },
  );

  return (
    <div
      ref={rootRef}
      className={`relative flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center sm:h-24 sm:w-24 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_68%)] blur-md"
        aria-hidden
      />
      <div className="relative flex h-full w-full items-center justify-center rounded-full border border-brand-gold/30 bg-brand-bg/80 shadow-[0_16px_44px_-18px_rgba(212,175,55,0.4)] backdrop-blur-md">
        <div
          ref={iconWrapRef}
          className="flex items-center justify-center text-brand-gold [&_svg]:size-8 md:[&_svg]:size-10"
        >
          <Icon
            strokeWidth={1.35}
            aria-hidden
            className="drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]"
          />
        </div>
      </div>
    </div>
  );
};

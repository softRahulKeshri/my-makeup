"use client";

import Image from "next/image";
import type { IngredientMarqueeSlide } from "@/types/ingredients";

type IngredientMarqueeProps = {
  slides: IngredientMarqueeSlide[];
};

/**
 * Seamless horizontal marquee — duplicate row for CSS translate -50% loop.
 */
export const IngredientMarquee = ({ slides }: IngredientMarqueeProps) => {
  if (slides.length === 0) return null;

  const loop = [...slides, ...slides];

  return (
    <div
      className="relative overflow-hidden py-4"
      role="region"
      aria-label="Ingredient imagery"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-bg to-transparent" />

      <div className="flex w-max gap-4 md:gap-5 ingredient-marquee-track motion-reduce:animate-none">
        {loop.map((slide, i) => (
          <div
            key={`${slide.id}-${i}`}
            className="relative h-36 w-52 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_48px_-24px_rgba(0,0,0,0.75)] sm:h-40 sm:w-60 md:h-44 md:w-72"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 208px, 288px"
              className="object-cover transition duration-700 hover:scale-105 motion-reduce:transition-none"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-bg/70 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  );
};

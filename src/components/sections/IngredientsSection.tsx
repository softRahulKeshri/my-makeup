"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { IngredientGlyph } from "@/components/icons/IngredientGlyph";
import type { IngredientCard } from "@/types/ingredients";

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS: IngredientCard[] = [
  {
    title: "Aloe Vera",
    copy: "A soothing botanical humectant that helps skin hold moisture for a calm, supple feel.",
    benefit: "Deeply hydrates & soothes irritated skin",
    num: "01",
    glyph: "aloe",
  },
  {
    title: "Orange",
    copy: "Bright citrus notes pair with vitamin C care for morning-after freshness.",
    benefit: "Vitamin C brightens & evens skin tone",
    num: "02",
    glyph: "orange",
  },
  {
    title: "Turmeric",
    copy: "Botanical brightening support for a calm, even-looking canvas — never heavy.",
    benefit: "Anti-inflammatory, reduces dark spots",
    num: "03",
    glyph: "turmeric",
  },
  {
    title: "Avocado",
    copy: "Rich in nourishing lipids that cushion the barrier for a petal-soft finish.",
    benefit: "Rich in fatty acids, nourishes & plumps",
    num: "04",
    glyph: "avocado",
  },
];

/**
 * Scroll-pinned golden orb reveals each ingredient (mobile-first: 120px orb → 200px md).
 * Timeline progress is scrubbed to scroll; prefers-reduced-motion falls back to a stacked list.
 */
export const IngredientsSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const pin = pinRef.current;
      const orb = orbRef.current;
      if (!outer || !pin || !orb) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduceMotion.matches) {
        return;
      }

      const stages = gsap.utils.toArray<HTMLElement>(
        outer.querySelectorAll("[data-ingredient-stage]"),
      );
      const scrub = window.matchMedia("(max-width: 768px)").matches ? 0.8 : 1.2;
      const n = INGREDIENTS.length;
      const SEG = 0.25;

      gsap.set(stages, { opacity: 0, y: 32 });
      gsap.set(orb, { scale: 0.06, opacity: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          /** Outer is `400svh` tall — pin until section fully scrolls through */
          end: "bottom bottom",
          pin,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < n; i++) {
        const t = i * SEG;

        if (i === 0) {
          tl.fromTo(
            orb,
            { scale: 0.06, opacity: 0.92 },
            { scale: 1, opacity: 1, duration: 0.09, ease: "power2.out" },
            t,
          );
        } else {
          tl.fromTo(
            orb,
            { scale: 0.2, opacity: 0.52 },
            { scale: 1, opacity: 1, duration: 0.09, ease: "power2.out" },
            t,
          );
        }

        tl.fromTo(
          stages[i],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.09, ease: "power2.out" },
          t + 0.08,
        );

        if (i < n - 1) {
          tl.to(
            stages[i],
            { opacity: 0, y: -12, duration: 0.05, ease: "power2.in" },
            t + SEG - 0.05,
          );
          tl.to(
            orb,
            { scale: 0.18, opacity: 0.48, duration: 0.05, ease: "power2.in" },
            t + SEG - 0.05,
          );
        }
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: outerRef, dependencies: [] },
  );

  return (
    <section
      id="ingredients"
      className="relative px-0 py-24"
      aria-labelledby="ingredients-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-gold/35 to-transparent" />

      <div className="mb-10 px-5 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold/85">
          Formula
        </p>
        <h2
          id="ingredients-heading"
          className="mt-3 font-display text-3xl font-semibold text-brand-ink md:text-4xl"
        >
          Ingredients with intention
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-brand-ink/65 md:text-[15px]">
          Scroll to reveal each botanical — a golden spark that grows into the full story.
        </p>
      </div>

      <div
        ref={outerRef}
        className="relative h-[400svh] motion-reduce:h-auto motion-reduce:py-12"
      >
        <div
          ref={pinRef}
          className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-5 py-12 motion-reduce:min-h-0 motion-reduce:py-8"
        >
          {/* Golden orb + pulse ring — hidden when user prefers reduced motion (stacked list below) */}
          <div
            ref={orbRef}
            className="pointer-events-none absolute left-1/2 top-[36%] z-0 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 md:top-[38%] md:h-[200px] md:w-[200px] motion-reduce:hidden"
            aria-hidden
          >
            <div className="ingredient-golden-pulse-ring pointer-events-none absolute inset-0 rounded-full" />
            <div
              className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(240,215,140,0.55),rgba(212,175,55,0.28)_42%,rgba(8,7,6,0.15)_72%,transparent_100%)] shadow-[0_0_60px_-8px_rgba(212,175,55,0.55),inset_0_0_40px_rgba(255,255,255,0.08)]"
            />
          </div>

          {INGREDIENTS.map((item) => (
            <div
              key={item.title}
              data-ingredient-stage
              className="ingredient-stage absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4 pt-8 motion-reduce:static motion-reduce:z-auto motion-reduce:min-h-0 motion-reduce:gap-4 motion-reduce:py-14"
            >
              <p
                className="pointer-events-none absolute bottom-6 right-4 font-brand text-[6rem] font-black leading-none text-white/8 motion-reduce:relative motion-reduce:bottom-auto motion-reduce:right-auto motion-reduce:order-last motion-reduce:text-5xl motion-reduce:opacity-40 md:text-[10rem] md:motion-reduce:text-6xl"
                aria-hidden
              >
                {item.num}
              </p>

              <IngredientGlyph kind={item.glyph} />

              <div className="relative z-10 flex max-w-[280px] flex-col items-center gap-2 text-center md:max-w-[360px]">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-brand-ink md:text-4xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-gold/90 md:text-base">
                  {item.benefit}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-brand-ink/70 md:text-sm">
                  {item.copy}
                </p>
              </div>

              <div className="mt-2 h-px w-12 bg-linear-to-r from-brand-gold to-transparent motion-reduce:mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

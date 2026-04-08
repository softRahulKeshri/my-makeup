"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  {
    title: "Honey",
    copy: "Natural humectant that helps skin hold moisture for a soft, supple feel.",
    accent: "from-brand-gold/25 to-brand-bg",
  },
  {
    title: "Turmeric",
    copy: "Brightening botanical support for a healthy-looking, even complexion.",
    accent: "from-brand-turmeric/30 to-brand-bg",
  },
  {
    title: "Vitamin C",
    copy: "Antioxidant care that pairs beautifully with your glow routine.",
    accent: "from-brand-gold/20 to-brand-turmeric/15",
  },
];

export const IngredientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const scroller = scrollRef.current;
      if (!section || !scroller) return;

      const layers = gsap.utils.toArray<HTMLElement>(
        scroller.querySelectorAll("[data-parallax]"),
      );

      const updateParallax = () => {
        const max = scroller.scrollWidth - scroller.clientWidth;
        const p = max > 0 ? scroller.scrollLeft / max : 0;
        layers.forEach((layer, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          gsap.set(layer, { x: p * 36 * dir });
        });
      };

      scroller.addEventListener("scroll", updateParallax, { passive: true });

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onUpdate: () => updateParallax(),
      });

      return () => {
        scroller.removeEventListener("scroll", updateParallax);
        st.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="bg-brand-bg px-0 py-20"
      aria-labelledby="ingredients-heading"
    >
      <div className="mb-10 px-5 text-center">
        <h2
          id="ingredients-heading"
          className="font-serif text-2xl text-brand-ink md:text-3xl"
        >
          Ingredient spotlight
        </h2>
        <p className="mt-2 text-sm text-brand-ink/70">
          Swipe to explore what makes the formula special.
        </p>
      </div>
      <div
        ref={scrollRef}
        className="ingredients-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {INGREDIENTS.map((item) => (
          <article
            key={item.title}
            className="relative min-w-[85vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-brand-gold/25 bg-brand-bg shadow-sm sm:min-w-[320px]"
          >
            <div
              data-parallax
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-90`}
              aria-hidden
            />
            <div className="relative z-10 flex min-h-[220px] flex-col justify-end p-6">
              <h3 className="font-serif text-2xl text-brand-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/85">
                {item.copy}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

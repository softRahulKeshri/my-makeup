import { Heart, Leaf } from "lucide-react";
import { IngredientGlyph } from "@/components/icons/IngredientGlyph";
import type { IngredientCard } from "@/types/ingredients";

const INGREDIENTS: IngredientCard[] = [
  {
    title: "Aloe Vera",
    copy: "Humectant support for calm, supple skin.",
    benefit: "Hydrates & soothes",
    num: "01",
    glyph: "aloe",
  },
  {
    title: "Orange",
    copy: "Citrus botanicals with vitamin C care.",
    benefit: "Brightens tone",
    num: "02",
    glyph: "orange",
  },
  {
    title: "Turmeric",
    copy: "Botanical brightening for an even-looking canvas.",
    benefit: "Radiance & balance",
    num: "03",
    glyph: "turmeric",
  },
  {
    title: "Avocado",
    copy: "Nourishing lipids for a soft barrier feel.",
    benefit: "Nourishes & cushions",
    num: "04",
    glyph: "avocado",
  },
];

/**
 * Normal document flow — stacked ingredient cards, no scroll-pin or scrub (smooth scrolling).
 * Ingredient glyphs render static (`animate={false}`) to avoid ScrollTrigger work on scroll.
 */
export const IngredientsSection = () => {
  return (
    <section
      id="ingredients"
      className="relative px-0 py-16 sm:py-20 md:py-28"
      aria-labelledby="ingredients-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-gold/35 to-transparent" />

      <div className="mx-auto mb-10 max-w-2xl px-4 text-center sm:mb-12 sm:px-5 md:mb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold/85">
          Formula
        </p>
        <h2
          id="ingredients-heading"
          className="mt-3 font-display text-[clamp(1.5rem,5vw,2.25rem)] font-semibold text-brand-ink md:text-4xl"
        >
          Key ingredients
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-brand-ink/65 md:text-[15px]">
          Aloe, citrus, turmeric, and avocado — chosen for balance and daily
          wear.
        </p>

        <ul className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-brand-ink/55 md:text-xs">
          <li className="flex items-center gap-2">
            <Heart
              className="h-4 w-4 shrink-0 text-brand-gold/75"
              strokeWidth={1.25}
              aria-hidden
            />
            <span className="font-medium tracking-wide">Cruelty-free</span>
          </li>
          <li className="flex items-center gap-2">
            <Leaf
              className="h-4 w-4 shrink-0 text-brand-gold/75"
              strokeWidth={1.25}
              aria-hidden
            />
            <span className="font-medium tracking-wide">Vegan</span>
          </li>
        </ul>
      </div>

      <div className="mx-auto max-w-4xl space-y-4 px-4 sm:space-y-6 sm:px-5 md:space-y-8">
        {INGREDIENTS.map((item, i) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/10 bg-brand-elevated/35 px-4 py-5 backdrop-blur-sm sm:px-6 sm:py-6 md:px-8 md:py-8"
          >
            <div
              className={`flex flex-col gap-6 md:flex-row md:items-center md:gap-10 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex shrink-0 justify-center md:w-[220px] md:justify-center">
                <IngredientGlyph
                  kind={item.glyph}
                  animate={false}
                  className="w-[min(200px,70vw)]"
                />
              </div>

              <div className="min-w-0 flex-1 text-center md:text-left">
                <p
                  className="font-brand text-4xl font-black leading-none text-white/[0.07] md:text-5xl"
                  aria-hidden
                >
                  {item.num}
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-brand-ink md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-base text-brand-gold/90 md:text-lg">
                  {item.benefit}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70 md:text-[15px]">
                  {item.copy}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

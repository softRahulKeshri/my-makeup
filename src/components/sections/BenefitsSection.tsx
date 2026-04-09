import { ProductJarShowcase } from "@/components/product/ProductJarShowcase";

const BENEFITS = [
  { title: "Brightens", sub: "Targets dullness & fatigue" },
  { title: "Glass-skin glow", sub: "Soft-focus luminosity" },
  { title: "Deep hydration", sub: "Plump, cushiony comfort" },
  { title: "Even tone", sub: "Refined, balanced look" },
] as const;

const BenefitCard = ({ title, sub }: { title: string; sub: string }) => (
  <div className="rounded-2xl border border-brand-gold/30 bg-brand-bg/70 px-3.5 py-2.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] shadow-brand-gold/10 backdrop-blur-md sm:px-4 sm:py-3 md:px-5 md:py-4">
    <p className="font-display text-base text-brand-gold drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] md:text-lg md:leading-snug">
      {title}
    </p>
    <p className="mt-1 text-[10px] leading-snug text-brand-ink/80 sm:text-[11px] md:text-xs">
      {sub}
    </p>
  </div>
);

const JAR_ALT = "ABHA COSMETIC Luminous Skin Face Cream 15ml jar";

/**
 * Signature benefits — gold label cards + jar. Normal document flow (no pin / scrub).
 * Mobile: jar, then 2×2 grid. Desktop: classic orbit layout with static labels.
 */
export const BenefitsSection = () => {
  return (
    <section
      id="benefits"
      className="relative border-t border-white/5 px-4 py-14 sm:px-5 md:py-24"
      aria-labelledby="benefits-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-gold/25 to-transparent" />

      <div className="mx-auto mb-8 max-w-xl text-center md:mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold/85">
          Signature benefits
        </p>
        <h2
          id="benefits-heading"
          className="mt-3 font-display text-[clamp(1.375rem,4vw,2.25rem)] font-semibold text-brand-ink md:text-4xl"
        >
          Engineered for visible radiance
        </h2>
        <p className="mt-3 text-sm text-brand-ink/65 md:text-[15px]">
          What your skin feels after the ritual — every day.
        </p>
      </div>

      {/* Mobile / small tablet: normal flow — jar then 2×2 cards */}
      <div className="mx-auto max-w-lg md:hidden">
        <div className="mx-auto mb-8 w-full max-w-[min(240px,70vw)]">
          <ProductJarShowcase
            widthClassName="w-full"
            sizes="(max-width: 768px) 70vw, 240px"
            interactive={false}
            alt={JAR_ALT}
          />
        </div>
        <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {BENEFITS.map((item) => (
            <li key={item.title}>
              <BenefitCard title={item.title} sub={item.sub} />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: signature orbit — labels around jar (static, same visual language) */}
      <div className="relative mx-auto hidden w-full max-w-3xl md:block">
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full bg-[conic-gradient(from_90deg,rgba(212,175,55,0.15),transparent,rgba(201,161,154,0.12),transparent)] blur-3xl motion-reduce:opacity-60"
          aria-hidden
        />

        <div className="relative mx-auto flex h-[min(68vh,560px)] w-full max-w-lg items-center justify-center">
          {BENEFITS.map((item, i) => {
            const positions = [
              "left-1/2 top-[4%] -translate-x-1/2 text-center",
              "right-0 top-1/2 w-[46%] max-w-[220px] -translate-y-1/2 pr-2 text-right md:pr-4",
              "bottom-[6%] left-1/2 -translate-x-1/2 text-center",
              "left-0 top-1/2 w-[46%] max-w-[220px] -translate-y-1/2 pl-2 text-left md:pl-4",
            ];
            return (
              <div
                key={item.title}
                className={`absolute z-20 ${positions[i] ?? positions[0]}`}
              >
                <BenefitCard title={item.title} sub={item.sub} />
              </div>
            );
          })}

          <div className="relative z-10 w-[58%] max-w-[240px]">
            <ProductJarShowcase
              widthClassName="w-full"
              sizes="(min-width: 768px) 260px, 240px"
              interactive={false}
              alt={JAR_ALT}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

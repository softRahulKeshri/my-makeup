import Image from "next/image";
import { BRAND_NAME } from "@/constants/brand";
import { ASSETS } from "@/constants/assets";
import { USAGE_STEPS } from "@/constants/usage-steps";

const TAGLINE = "Real glow, real you";

const INFO_W = 571;
const INFO_H = 1024;

/**
 * How to use — luxury ritual: infographic + scannable step cards (mobile-first).
 */
export const UsageHowToSection = () => {
  const alt = `${BRAND_NAME} — four-step guide: ${USAGE_STEPS.map((s) => `Step ${s.num} ${s.title}`).join("; ")}.`;

  return (
    <section
      id="how-to-use"
      className="relative overflow-hidden border-t border-white/5 px-4 py-16 sm:px-5 md:py-28"
      aria-labelledby="how-to-heading"
    >
      {/* Ambient gold wash — subtle, no extra JS */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(212,175,55,0.12),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_60%,rgba(201,161,154,0.06),transparent_50%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-gold/35 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header — mirrors premium brand treatment */}
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold/85">
              Your ritual
            </p>
            <h2
              id="how-to-heading"
              className="mt-2 font-display text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-tight text-brand-ink"
            >
              How to use
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-ink/65 md:text-[15px]">
              Four steps — prep, apply, absorb, shine — for a ceremony that feels as good as
              the results look.
            </p>
          </div>
          <div className="shrink-0 pt-2 text-center md:pt-0 md:text-right">
            <p className="brand-name-display font-brand text-sm font-bold text-brand-ink md:text-base">
              <span className="brand-name-gradient">{BRAND_NAME}</span>
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.35em] text-brand-gold/75 md:text-[10px]">
              {TAGLINE}
            </p>
          </div>
        </div>

        {/* Infographic — primary visual (mobile-first: full width within padding) */}
        <figure className="relative mx-auto mt-10 max-w-[min(100%,420px)] md:mt-14 md:max-w-lg lg:max-w-xl">
          <div
            className="pointer-events-none absolute -inset-[1px] rounded-[1.35rem] bg-linear-to-br from-brand-gold/45 via-brand-gold/10 to-transparent opacity-80 blur-[2px]"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-brand-elevated/40 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(212,175,55,0.12)_inset]">
            <Image
              src={ASSETS.howToUseInfographic}
              alt={alt}
              width={INFO_W}
              height={INFO_H}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 420px, 512px"
              className="h-auto w-full object-cover"
              priority={false}
            />
          </div>
          <figcaption className="sr-only">{alt}</figcaption>
        </figure>

        {/* Scannable steps — reinforces infographic; stacked on mobile, grid on lg */}
        <ol className="mt-12 grid list-none gap-3 sm:gap-4 md:mt-14 lg:grid-cols-2 xl:grid-cols-4">
          {USAGE_STEPS.map((step) => (
            <li
              key={step.id}
              className="group relative overflow-hidden rounded-2xl border border-brand-gold/20 bg-linear-to-b from-brand-elevated/80 to-brand-bg/90 p-4 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span
                  className="font-brand text-3xl font-black leading-none tabular-nums text-brand-gold-bright drop-shadow-[0_0_20px_rgba(212,175,55,0.35)] sm:text-4xl"
                  aria-hidden
                >
                  {step.num}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold/80">
                    Step {step.num}
                  </p>
                  <p className="mt-0.5 font-display text-lg font-semibold text-brand-ink sm:text-xl">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink/72">{step.body}</p>
                </div>
              </div>
              <p
                className="pointer-events-none mt-4 text-right font-brand text-2xl font-black uppercase tracking-[0.12em] text-brand-gold/25 transition-colors duration-300 group-hover:text-brand-gold/35 sm:text-3xl"
                aria-hidden
              >
                {step.keyword}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-brand-gold/70">
          {TAGLINE}
        </p>
      </div>
    </section>
  );
};

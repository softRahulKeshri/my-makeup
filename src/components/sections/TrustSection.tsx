import { TRUST_TESTIMONIALS } from "@/constants/testimonials";

const STAR_COUNT = 5;

/**
 * Reviews — vertical stack (mobile-first). No carousel / scroll-snap = smoother on touch devices.
 */
export const TrustSection = () => {
  return (
    <section
      id="trust"
      className="relative border-t border-white/5 px-4 py-14 sm:px-5 md:py-24"
      aria-labelledby="trust-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-gold/25 to-transparent" />

      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold/85">
          Reviews
        </p>
        <h2
          id="trust-heading"
          className="mt-3 font-display text-[clamp(1.375rem,4vw,1.875rem)] font-semibold text-brand-ink md:text-3xl"
        >
          What people say
        </h2>

        <div
          className="mt-5 flex justify-center gap-0.5"
          role="img"
          aria-label={`${STAR_COUNT} out of 5 stars`}
        >
          {Array.from({ length: STAR_COUNT }, (_, i) => (
            <span key={i} className="text-brand-gold" aria-hidden>
              ★
            </span>
          ))}
        </div>
      </div>

      <ul className="mx-auto mt-10 flex max-w-lg flex-col gap-4 md:mt-12 md:max-w-xl md:gap-5">
        {TRUST_TESTIMONIALS.map((t) => (
          <li key={t.id}>
            <blockquote className="rounded-2xl border border-white/10 bg-brand-elevated/40 px-5 py-6 text-center backdrop-blur-sm sm:px-8 sm:py-8">
              <p className="font-display text-base leading-relaxed text-brand-ink/90 sm:text-lg md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-brand-gold/75">
                {t.attribution}
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
};

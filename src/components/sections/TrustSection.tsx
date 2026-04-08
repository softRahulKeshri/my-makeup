"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { BUY_LINK } from "@/constants/purchase";
import { TRUST_TESTIMONIALS } from "@/constants/testimonials";

const STAR_COUNT = 5;

/**
 * Social proof + compact purchase anchor (#buy) for sticky nav and hero CTAs.
 */
export const TrustSection = () => {
  const carouselId = useId();
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = useCallback((i: number) => {
    const el = trackRef.current?.querySelector<HTMLElement>(`[data-slide-index="${i}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setIndex(i);
  }, []);

  const onScrollSnap = () => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll<HTMLElement>("[data-slide-index]");
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((slide, i) => {
      const r = slide.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIndex(best);
  };

  return (
    <section
      id="trust"
      className="relative border-t border-white/5 px-5 py-12 md:py-16"
      aria-labelledby="trust-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-gold/25 to-transparent" />

      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold/85">
          Testimonials
        </p>
        <h2
          id="trust-heading"
          className="mt-3 font-display text-3xl font-semibold text-brand-ink md:text-4xl"
        >
          Loved by Skin Enthusiasts
        </h2>

        <div
          className="mt-6 flex justify-center gap-0.5"
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

      <div
        className="relative mx-auto mt-12 max-w-lg md:max-w-xl"
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={`${carouselId}-label`}
      >
        <p id={`${carouselId}-label`} className="sr-only">
          Customer testimonials
        </p>

        <div
          ref={trackRef}
          onScroll={onScrollSnap}
          className="ingredients-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {TRUST_TESTIMONIALS.map((t, i) => (
            <blockquote
              key={t.id}
              data-slide-index={i}
              className="w-full min-w-full shrink-0 snap-center rounded-2xl border border-white/10 bg-brand-elevated/40 px-6 py-8 text-center backdrop-blur-sm md:px-10"
            >
              <p className="font-display text-lg leading-relaxed text-brand-ink/90 md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-brand-gold/70">{t.attribution}</footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/35 text-brand-gold transition hover:bg-brand-gold/10"
            aria-label="Previous testimonial"
            onClick={() => scrollToSlide((index - 1 + TRUST_TESTIMONIALS.length) % TRUST_TESTIMONIALS.length)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
            {TRUST_TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-brand-gold" : "w-2 bg-brand-gold/30"
                }`}
                onClick={() => scrollToSlide(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/35 text-brand-gold transition hover:bg-brand-gold/10"
            aria-label="Next testimonial"
            onClick={() => scrollToSlide((index + 1) % TRUST_TESTIMONIALS.length)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        id="buy"
        className="mx-auto mt-16 max-w-md scroll-mt-24 rounded-2xl border border-brand-gold/25 bg-linear-to-b from-brand-elevated/60 to-brand-bg/80 px-6 py-8 text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-brand-gold/80">
          Abha Luminous Skin Face Cream
        </p>
        <p className="mt-2 font-display text-xl text-brand-ink md:text-2xl">15ml · Premium ritual</p>
        <p className="mt-2 text-sm text-brand-ink/65">
          Ready to experience the glow? Complete your purchase through your preferred channel.
        </p>
        <a
          href={BUY_LINK}
          className="mt-6 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-linear-to-r from-brand-gold via-[#e8c76a] to-brand-gold px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-on-gold shadow-[0_12px_40px_-12px_rgba(212,175,55,0.5)] transition hover:brightness-105"
        >
          Buy Now
        </a>
      </div>
    </section>
  );
};

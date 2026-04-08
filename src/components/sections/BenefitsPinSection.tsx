"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ProductJarShowcase } from "@/components/product/ProductJarShowcase";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  { title: "Brightens", sub: "Targets dullness & fatigue" },
  { title: "Glass-skin glow", sub: "Soft-focus luminosity" },
  { title: "Deep hydration", sub: "Plump, cushiony comfort" },
  { title: "Even tone", sub: "Refined, balanced look" },
];

/**
 * BenefitsPinSection — cinematic pinned scroll showcase.
 *
 * The section pins for 340% of viewport height so the user has plenty
 * of scroll runway to read each benefit at their own pace.
 *
 * Each benefit card follows a 3-phase timeline:
 *  1. Enter  — opacity 0→1, y 22→0, scale 0.95→1 (power4.out — snappy de-easing)
 *  2. Hold   — sits visible for ~10% of its scroll segment
 *  3. Exit   — opacity 1→0, y 0→-18 (power2.in — accelerates out)
 *
 * Heading:
 * The label + h2 + description stagger-reveal on a separate ScrollTrigger
 * triggered at "top 78%" so they animate in just before the pin locks.
 *
 * Jar parallax:
 * While the section is pinned, the jar slowly drifts upward on a separate
 * independent tween to prevent the product visual from feeling static.
 */
export const BenefitsPinSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const labels = labelsRef.current.filter(Boolean) as HTMLDivElement[];
      if (labels.length === 0) return;

      // ── Heading stagger-reveal ────────────────────────────────────────────
      const headerChildren = pin.querySelectorAll("[data-benefits-header]");
      gsap.fromTo(
        headerChildren,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );

      // ── Benefit labels — initial hidden state ─────────────────────────────
      gsap.set(labels, { opacity: 0, y: 22, scale: 0.95 });

      // ── Pinned timeline ───────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=340%",
          scrub: 0.6,
          pin,
          anticipatePin: 1,
        },
      });

      const segment = 1 / labels.length;

      labels.forEach((label, i) => {
        const at = i * segment;

        // Enter — power4.out: decelerates fast, lands precisely on target
        tl.to(
          label,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: segment * 0.4,
            ease: "power4.out",
          },
          at + segment * 0.05,
        );

        // Exit — power2.in: gentle acceleration out, avoids abrupt pop
        tl.to(
          label,
          {
            opacity: 0,
            y: -18,
            scale: 0.97,
            duration: segment * 0.35,
            ease: "power2.in",
          },
          at + segment * 0.55,
        );
      });

      // ── Jar drift while pinned ────────────────────────────────────────────
      // Add a gentle y-drift to the jar directly on the pinned timeline.
      // This ties the jar's movement to scroll progress without needing
      // containerAnimation (which only works for GSAP-animated carousels).
      const jarEl = pin.querySelector<HTMLElement>(".benefits-jar");
      if (jarEl) {
        tl.to(jarEl, { y: -28, ease: "none", duration: 1 }, 0);
      }

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative"
      aria-labelledby="benefits-heading"
    >
      <div
        ref={pinRef}
        className="flex min-h-dvh flex-col items-center justify-center px-4 py-16"
      >
        <div className="mb-10 max-w-xl text-center">
          <p
            data-benefits-header
            className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold/85"
          >
            Signature benefits
          </p>
          <h2
            id="benefits-heading"
            data-benefits-header
            className="mt-3 font-display text-3xl font-semibold text-brand-ink md:text-4xl"
          >
            Engineered for visible radiance
          </h2>
          <p
            data-benefits-header
            className="mt-3 text-sm text-brand-ink/65"
          >
            Scroll — each beat spotlights what your skin feels after the ritual.
          </p>
        </div>

        <div className="relative flex h-[min(68vh,560px)] w-full max-w-lg items-center justify-center">
          {/* Ambient conic glow behind the jar */}
          <div
            className="pointer-events-none absolute inset-[8%] rounded-full bg-[conic-gradient(from_90deg,rgba(212,175,55,0.15),transparent,rgba(201,161,154,0.12),transparent)] blur-3xl motion-reduce:opacity-60"
            aria-hidden
          />

          {BENEFITS.map((item, i) => {
            const positions = [
              "left-1/2 top-[4%] -translate-x-1/2 text-center",
              "right-0 top-1/2 w-[46%] -translate-y-1/2 text-right pr-2 md:pr-4",
              "left-1/2 bottom-[6%] -translate-x-1/2 text-center",
              "left-0 top-1/2 w-[46%] -translate-y-1/2 text-left pl-2 md:pl-4",
            ];
            return (
              <div
                key={item.title}
                ref={(el) => {
                  labelsRef.current[i] = el;
                }}
                className={`pointer-events-none absolute will-change-transform ${positions[i] ?? positions[0]}`}
              >
                <div className="inline-block rounded-2xl border border-brand-gold/25 bg-brand-bg/55 px-4 py-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] backdrop-blur-md md:px-5 md:py-4">
                  <p className="font-display text-lg text-brand-gold md:text-xl">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-brand-ink/65 md:text-xs">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Jar — tagged for drift parallax */}
          <div className="benefits-jar relative z-10 w-[58%] max-w-[240px] will-change-transform">
            <ProductJarShowcase
              widthClassName="w-full"
              sizes="(max-width: 768px) 55vw, 240px"
              interactive={false}
            />
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.35em] text-brand-ink/40">
          Keep scrolling
        </p>
      </div>
    </section>
  );
};

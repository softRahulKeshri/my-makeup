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
 * BenefitsPinSection — desktop: shorter pinned showcase (~200% viewport). Mobile: static reveal, no pin.
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

      const headerChildren = pin.querySelectorAll("[data-benefits-header]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const headingTween = gsap.fromTo(
          headerChildren,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
            },
          },
        );

        gsap.set(labels, { opacity: 0, y: 18, scale: 0.97 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
            scrub: 1.15,
            pin,
            anticipatePin: 1,
          },
        });

        const segment = 1 / labels.length;

        labels.forEach((label, i) => {
          const at = i * segment;

          tl.to(
            label,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: segment * 0.4,
              ease: "power2.out",
            },
            at + segment * 0.05,
          );

          tl.to(
            label,
            {
              opacity: 0,
              y: -12,
              scale: 0.98,
              duration: segment * 0.38,
              ease: "power3.inOut",
            },
            at + segment * 0.5,
          );
        });

        const jarEl = pin.querySelector<HTMLElement>(".benefits-jar");
        if (jarEl) {
          tl.to(jarEl, { y: -20, ease: "none", duration: 1 }, 0);
        }

        return () => {
          headingTween.scrollTrigger?.kill();
          headingTween.kill();
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        const headingTween = gsap.fromTo(
          headerChildren,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
            },
          },
        );

        gsap.set(labels, { opacity: 0, y: 16, scale: 0.99 });

        const labelTween = gsap.to(labels, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });

        return () => {
          headingTween.scrollTrigger?.kill();
          headingTween.kill();
          labelTween.scrollTrigger?.kill();
          labelTween.kill();
        };
      });

      return () => mm.revert();
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
        className="flex min-h-dvh flex-col items-center justify-center px-4 py-16 max-md:min-h-0 max-md:py-14"
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
          <p data-benefits-header className="mt-3 text-sm text-brand-ink/65">
            <span className="md:hidden">
              Each beat spotlights what your skin feels after the ritual.
            </span>
            <span className="hidden md:inline">
              Scroll — each beat spotlights what your skin feels after the ritual.
            </span>
          </p>
        </div>

        <div className="relative flex h-[min(68vh,560px)] w-full max-w-lg items-center justify-center">
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
                className={`pointer-events-none absolute z-20 will-change-transform ${positions[i] ?? positions[0]}`}
              >
                <div className="inline-block rounded-2xl border border-brand-gold/30 bg-brand-bg/70 px-4 py-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] shadow-brand-gold/10 backdrop-blur-md md:px-5 md:py-4">
                  <p className="font-display text-lg text-brand-gold drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] md:text-xl">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-brand-ink/80 md:text-xs">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="benefits-jar relative z-10 w-[58%] max-w-[240px] will-change-transform">
            <ProductJarShowcase
              widthClassName="w-full"
              sizes="(max-width: 768px) 58vw, 260px"
              interactive={false}
              alt="Abha Luminous Skin Face Cream 15ml jar luxury packaging on dark background"
            />
          </div>
        </div>

        <p className="mt-6 hidden text-center text-[10px] uppercase tracking-[0.35em] text-brand-ink/40 md:block">
          Keep scrolling
        </p>
      </div>
    </section>
  );
};

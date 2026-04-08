"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ProductJarShowcase } from "@/components/product/ProductJarShowcase";
import { BUY_LINK } from "@/constants/purchase";
import { useProduct } from "@/hooks/useProduct";

gsap.registerPlugin(ScrollTrigger);

const LINE_ONE = "LUMINOUS";
const LINE_TWO = "SKIN";

const formatInr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * HeroSection — entrance animations + subtle scroll parallax.
 *
 * Entrance:
 * - Brand name + eyebrow text fade+slide up on load (hero-reveal stagger)
 * - Headline characters animate letter-by-letter (hero-char stagger)
 * - Jar scales in from 0.92 with slight y offset
 *
 * Parallax (ScrollTrigger scrub):
 * - Jar moves upward at 0.6x scroll speed (parallax depth = 80px)
 * - Text block moves at 0.35x scroll speed (parallax depth = 45px)
 * - Rose orb moves at 0.45x speed (depth = 55px) — adds layered depth
 * - Gold gradient ceiling at 0.25x speed — barely moves, feels distant
 *
 * Scrub uses a higher value (~2.25) so scroll-linked motion eases in gently.
 */
export const HeroSection = () => {
  const { data, isPending, isError } = useProduct();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

      // ── Entrance animations ───────────────────────────────────────────────
      gsap.fromTo(
        q(".hero-reveal"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.09,
          ease: "power2.out",
          delay: 0.12,
        },
      );

      const letters = gsap.utils.toArray<HTMLElement>(".hero-char");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.022,
          ease: "power2.out",
          delay: 0.38,
        },
      );

      gsap.fromTo(
        q(".hero-jar"),
        { opacity: 0, scale: 0.9, y: 36 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.55,
        },
      );

      // ── Scroll parallax — skip for reduced-motion users ───────────────────
      if (mq.matches) return;

      const root = rootRef.current;
      if (!root) return;

      const parallaxConfig = {
        trigger: root,
        start: "top top",
        end: "bottom top",
        /** Higher scrub = smoother scroll-linked motion (less twitchy). */
        scrub: 2.25,
      };

      // Jar — gentler offsets so the handoff to the next section feels calmer
      gsap.to(q(".hero-jar"), {
        y: -52,
        ease: "none",
        scrollTrigger: parallaxConfig,
      });

      gsap.to(q(".hero-text-block"), {
        y: -32,
        ease: "none",
        scrollTrigger: parallaxConfig,
      });

      gsap.to(q(".hero-orb"), {
        y: -38,
        ease: "none",
        scrollTrigger: parallaxConfig,
      });

      gsap.to(q(".hero-gold-ceiling"), {
        y: -18,
        ease: "none",
        scrollTrigger: parallaxConfig,
      });
    },
    { scope: rootRef },
  );

  const priceLine = (() => {
    if (isPending) return "MRP · …";
    if (isError || !data) return "MRP · ₹799";
    return `MRP · ${formatInr(data.mrp)} · ${data.sizeLabel}`;
  })();

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden px-5 pb-14 pt-28 md:justify-center md:pb-20 md:pt-16"
    >
      {/* Background layers — each tagged with a class for parallax targeting */}
      <div
        className="hero-gold-ceiling pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,rgba(212,175,55,0.18),transparent_55%)] will-change-transform"
        aria-hidden
      />
      <div
        className="hero-orb pointer-events-none absolute -right-1/4 top-1/4 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-[radial-gradient(circle,rgba(201,161,154,0.12),transparent_65%)] blur-3xl will-change-transform motion-reduce:opacity-60"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(260px,420px)] md:items-center md:gap-12">
        {/* Text block — tagged for group parallax */}
        <div className="hero-text-block text-center will-change-transform md:text-left">
          <p className="hero-reveal font-brand text-[clamp(2.35rem,9vw,4.25rem)] font-black leading-[0.95] tracking-tight">
            <span className="brand-name-gradient">Abha Cosmetic</span>
          </p>
          <p className="hero-reveal mt-3 font-mono text-[11px] uppercase tracking-[0.5em] text-brand-gold/90 md:text-xs">
            Face care · 15ml ritual
          </p>
          <h1 className="hero-reveal mx-auto mt-2 max-w-md text-center font-display text-xl italic leading-snug tracking-tight text-brand-gold md:mx-0 md:mt-3 md:mb-1 md:text-left md:text-2xl">
            Real Glow, Real You
          </h1>

          <p className="mt-6 font-display text-[clamp(2.75rem,12vw,5.25rem)] font-semibold leading-[0.95] tracking-tight text-brand-ink md:mt-8">
            <span className="hero-reveal block overflow-hidden">
              <span className="inline-flex flex-wrap justify-center gap-x-[0.08em] md:justify-start">
                {LINE_ONE.split("").map((ch, i) => (
                  <span
                    key={`l1-${ch}-${i}`}
                    className="hero-char inline-block will-change-transform"
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </span>
            <span className="hero-reveal mt-1 block overflow-hidden md:mt-2">
              <span className="lux-text-shimmer inline-flex flex-wrap justify-center gap-x-[0.06em] md:justify-start">
                {LINE_TWO.split("").map((ch, i) => (
                  <span
                    key={`l2-${ch}-${i}`}
                    className="hero-char inline-block font-semibold will-change-transform"
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          </p>

          <p className="hero-reveal mx-auto mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-brand-ink/75 md:mx-0 md:text-base">
            A sensorial cream ritual — weightless hydration, lit-from-within radiance,
            and a finish so refined it feels like silk on skin.
          </p>

          <div className="hero-reveal mt-8 flex flex-col items-center gap-4 sm:items-start">
            <p className="text-center text-[13px] font-medium tracking-wide text-brand-ink/80 sm:text-left md:text-sm">
              {priceLine}
            </p>
            <a
              href={BUY_LINK}
              data-cursor-expand
              className="lux-hero-buy-btn inline-flex min-h-12 w-full max-w-[260px] items-center justify-center rounded-full bg-linear-to-r from-brand-gold to-[#c9a019] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-on-gold sm:w-auto"
            >
              Buy Now
            </a>
          </div>
        </div>

        {/* Jar — tagged for independent parallax (moves faster = feels closer) */}
        <div className="hero-jar flex justify-center will-change-transform md:justify-end">
          <div className="relative w-full max-w-[min(92vw,460px)]">
            <ProductJarShowcase
              widthClassName="w-full"
              sizes="(max-width: 768px) 92vw, 440px"
              priority
              alt="Abha Luminous Skin Face Cream 15ml jar luxury packaging on dark background"
            />
          </div>
        </div>
      </div>

      <a
        href="#trust"
        className="lux-scroll-hint absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-brand-ink/45 motion-reduce:opacity-70 md:bottom-10"
      >
        <span>Scroll</span>
        <span className="block h-10 w-px bg-linear-to-b from-brand-gold/80 to-transparent" />
      </a>
    </section>
  );
};

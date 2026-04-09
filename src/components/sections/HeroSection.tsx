"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ProductJarShowcase } from "@/components/product/ProductJarShowcase";
import { BRAND_NAME, PRODUCT_LINE } from "@/constants/brand";
import { BUY_LINK } from "@/constants/purchase";
import { useProduct } from "@/hooks/useProduct";

gsap.registerPlugin(ScrollTrigger);

const formatInr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * Hero — brand wordmark, product line, price, CTA, jar parallax.
 */
export const HeroSection = () => {
  const { data, isPending, isError } = useProduct();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

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

      gsap.fromTo(
        q(".hero-jar"),
        { opacity: 0, scale: 0.9, y: 36 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.45,
        },
      );

      if (mq.matches) return;

      const mm = gsap.matchMedia();
      /** Parallax only on md+ — mobile keeps normal flow and native scroll smoothness. */
      mm.add("(min-width: 768px)", () => {
        const root = rootRef.current;
        if (!root) return;

        const parallaxConfig = {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 2.25,
        };

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
      });

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  const mrpDisplay = isPending
    ? null
    : formatInr(isError || !data ? 799 : data.mrp);
  const sizeDisplay = !isPending && data?.sizeLabel ? data.sizeLabel : "15ml";

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-dvh min-h-[100dvh] flex-col justify-end overflow-hidden px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(6.5rem,env(safe-area-inset-top)+4.5rem)] sm:px-5 md:justify-center md:pb-24 md:pt-20"
    >
      <div
        className="hero-gold-ceiling pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,rgba(212,175,55,0.14),transparent_55%)] will-change-transform"
        aria-hidden
      />
      <div
        className="hero-orb pointer-events-none absolute -right-1/4 top-1/4 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-[radial-gradient(circle,rgba(201,161,154,0.1),transparent_65%)] blur-3xl will-change-transform motion-reduce:opacity-60"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,420px)] md:items-center md:gap-12">
        <div className="hero-text-block order-2 text-center will-change-transform md:order-1 md:text-left">
          <p className="hero-reveal brand-name-display font-brand text-[clamp(1.85rem,7vw,3rem)] font-black leading-[1.05] tracking-[0.12em]">
            <span className="brand-name-gradient">{BRAND_NAME}</span>
          </p>
          <p className="hero-reveal mt-4 font-mono text-[10px] uppercase tracking-[0.45em] text-brand-gold/85 md:text-[11px]">
            {PRODUCT_LINE} · 15ml
          </p>
          <h1 className="hero-reveal mx-auto mt-4 max-w-md text-center font-display text-2xl font-semibold leading-snug tracking-tight text-brand-ink md:mx-0 md:text-left md:text-3xl">
            Real glow, real you
          </h1>

          <p className="hero-reveal mx-auto mt-5 max-w-md text-pretty text-sm leading-relaxed text-brand-ink/72 md:mx-0 md:text-[15px]">
            Lightweight hydration and a refined finish — one daily ritual.
          </p>

          <div className="hero-reveal mt-8 flex flex-col items-center gap-3 sm:items-start">
            <p className="hero-price-line text-center sm:text-left">
              {isPending ? (
                <>
                  <span className="text-brand-ink">MRP</span>
                  <span className="mx-1.5 text-brand-ink/50">·</span>
                  <span className="hero-price-amount">…</span>
                </>
              ) : (
                <>
                  <span className="text-brand-ink">MRP</span>
                  <span className="mx-1.5 text-brand-ink/55">·</span>
                  <span className="hero-price-amount">{mrpDisplay}</span>
                  <span className="mx-1.5 text-brand-ink/55">·</span>
                  <span className="font-semibold text-brand-ink/90">
                    {sizeDisplay}
                  </span>
                </>
              )}
            </p>
            <a
              href={BUY_LINK}
              data-cursor-expand
              className="lux-buy-now-primary lux-hero-buy-btn inline-flex min-h-12 w-full max-w-[min(100%,280px)] touch-manipulation items-center justify-center rounded-full bg-linear-to-r from-brand-gold to-[#c9a019] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-on-gold sm:w-auto"
            >
              Buy now
            </a>
          </div>
        </div>

        <div className="hero-jar order-1 flex justify-center will-change-transform md:order-2 md:justify-end">
          <div className="relative w-full max-w-[min(88vw,420px)] md:max-w-[min(92vw,460px)]">
            <ProductJarShowcase
              widthClassName="w-full"
              sizes="(max-width: 768px) 92vw, 440px"
              priority
              alt={`${BRAND_NAME} ${PRODUCT_LINE} 15ml jar`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

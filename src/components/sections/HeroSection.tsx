"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ProductJarShowcase } from "@/components/product/ProductJarShowcase";
import { useProduct } from "@/hooks/useProduct";

const HEADLINE = "REAL GLOW, REAL YOU";

const formatInr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const HeroSection = () => {
  const { data, isPending, isError } = useProduct();
  const rootRef = useRef<HTMLDivElement>(null);
  const jarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.035,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      if (jarRef.current) {
        gsap.to(jarRef.current, {
          y: 10,
          rotation: 1.5,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
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
      ref={rootRef}
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-24 text-center before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,rgba(212,175,55,0.14),transparent_58%)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:bg-gradient-to-t after:from-brand-bg after:via-brand-bg/80 after:to-transparent"
    >
      <p className="relative z-10 mb-4 font-serif text-xs uppercase tracking-[0.35em] text-brand-gold">
        Abha Cosmetic
      </p>
      <h1 className="relative z-10 font-serif text-[clamp(1.75rem,8vw,3rem)] font-semibold leading-tight text-brand-ink">
        {HEADLINE.split("").map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className="hero-letter inline-block"
            style={{ whiteSpace: ch === " " ? "pre" : undefined }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h1>
      <p className="relative z-10 mt-4 max-w-sm text-sm text-brand-ink/75">
        Premium care for skin that looks lit from within — crafted for everyday
        radiance.
      </p>
      <div ref={jarRef} className="relative z-10 mt-12">
        <ProductJarShowcase
          widthClassName="w-[min(78vw,320px)]"
          sizes="(max-width: 768px) 78vw, 320px"
          priority
        />
      </div>
      <p className="relative z-10 mt-10 font-medium tracking-wide text-brand-ink/90">
        {priceLine}
      </p>
      <a
        href="#benefits"
        className="relative z-10 mt-8 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-gold/80 bg-brand-gold/10 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-brand-ink shadow-sm transition hover:bg-brand-gold/25 hover:shadow-md"
      >
        Discover
      </a>
    </section>
  );
};

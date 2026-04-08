"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ProductJarShowcase } from "@/components/product/ProductJarShowcase";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  "Reduces Dark Circles",
  "Radiant Glow",
  "Deep Hydration",
  "Even Tone",
];

export const BenefitsPinSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const labels = labelsRef.current.filter(Boolean) as HTMLParagraphElement[];
      if (labels.length === 0) return;

      gsap.set(labels, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=320%",
          scrub: 0.65,
          pin,
          anticipatePin: 1,
        },
      });

      const segment = 1 / labels.length;
      labels.forEach((label, i) => {
        const start = i * segment;
        tl.to(
          label,
          { opacity: 1, y: 0, duration: segment * 0.45, ease: "power2.out" },
          start + segment * 0.05,
        );
        tl.to(
          label,
          { opacity: 0, y: -10, duration: segment * 0.35, ease: "power2.in" },
          start + segment * 0.55,
        );
      });

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
      className="relative bg-brand-bg before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_70%_45%_at_50%_100%,rgba(228,143,15,0.08),transparent_55%)]"
      aria-labelledby="benefits-heading"
    >
      <div
        ref={pinRef}
        className="flex min-h-dvh flex-col items-center justify-center px-4"
      >
        <h2 id="benefits-heading" className="sr-only">
          Product benefits
        </h2>
        <div className="relative flex h-[min(70vh,520px)] w-full max-w-sm items-center justify-center">
          {BENEFITS.map((text, i) => {
            const positions = [
              "left-1/2 top-[6%] -translate-x-1/2 text-center",
              "right-0 top-1/2 -translate-y-1/2 w-[42%] text-right pr-1",
              "left-1/2 bottom-[8%] -translate-x-1/2 text-center",
              "left-0 top-1/2 -translate-y-1/2 w-[42%] text-left pl-1",
            ];
            return (
              <p
                key={text}
                ref={(el) => {
                  labelsRef.current[i] = el;
                }}
                className={`pointer-events-none absolute font-serif text-base text-brand-gold [text-shadow:0_1px_12px_rgba(252,249,241,0.9)] md:text-lg ${positions[i] ?? positions[0]}`}
              >
                {text}
              </p>
            );
          })}
          <div className="relative z-10 w-[55%] max-w-[220px]">
            <ProductJarShowcase
              widthClassName="w-full"
              sizes="(max-width: 768px) 55vw, 220px"
              alt=""
            />
          </div>
        </div>
        <p className="mt-4 max-w-xs text-center text-xs text-brand-ink/60">
          Scroll to explore
        </p>
      </div>
    </section>
  );
};

"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { ASSETS } from "@/constants/assets";
import type { ProductJarShowcaseProps } from "@/types/product-jar";

// jar.jpeg natural resolution -- used for next/image layout hints.
const JAR_WIDTH = 530;
const JAR_HEIGHT = 944;

export const ProductJarShowcase = ({
  widthClassName,
  sizes = "(max-width: 768px) 92vw, 420px",
  priority,
  alt = "Abha Luminous Skin Face Cream 15ml jar luxury packaging on dark background",
  interactive = true,
}: ProductJarShowcaseProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const floater = floatRef.current;
      const tilt = tiltRef.current;
      if (!root || !floater || !tilt) return;

      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) return;

      gsap.set(tilt, { transformPerspective: 960 });

      const float = gsap.to(floater, {
        y: 12,
        rotation: 1.4,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const glows = root.querySelectorAll(".jar-ambient-glow");
      const pulse =
        glows.length > 0
          ? gsap.to(glows, {
              opacity: 0.72,
              scale: 1.06,
              duration: 2.4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              stagger: 0.15,
            })
          : null;

      const xRot = gsap.quickTo(tilt, "rotationX", { duration: 0.55, ease: "power3.out" });
      const yRot = gsap.quickTo(tilt, "rotationY", { duration: 0.55, ease: "power3.out" });
      const xShift = gsap.quickTo(tilt, "x", { duration: 0.45, ease: "power3.out" });
      const yShift = gsap.quickTo(tilt, "y", { duration: 0.45, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        if (!interactive) return;
        const rect = root.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        xRot(-py * 12);
        yRot(px * 12);
        xShift(px * 8);
        yShift(py * 6);
      };

      const onLeave = () => {
        if (!interactive) return;
        xRot(0);
        yRot(0);
        xShift(0);
        yShift(0);
      };

      if (interactive) {
        root.addEventListener("mousemove", onMove);
        root.addEventListener("mouseleave", onLeave);
      }

      return () => {
        float.kill();
        pulse?.kill();
        if (interactive) {
          root.removeEventListener("mousemove", onMove);
          root.removeEventListener("mouseleave", onLeave);
        }
      };
    },
    { scope: rootRef, dependencies: [interactive] },
  );

  return (
    <div ref={rootRef} className={`relative ${widthClassName}`}>
      {/*
        Premium multi-layer glow bloom.
        Three overlapping radial gradients create photographic depth:
          Layer 1 (widest) -- broad gold warmth, like a studio key light
          Layer 2 (mid)    -- champagne core, lifts the jar off the background
          Layer 3 (rim)    -- rose side scatter, mimics a photographic rim light
        All three are animated (opacity + scale pulse) by the GSAP timeline above.
      */}
      <div
        className="jar-ambient-glow pointer-events-none absolute inset-[-14%] -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 72% 62% at 50% 46%, rgba(212,175,55,0.42), rgba(228,143,15,0.14) 42%, transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="jar-ambient-glow pointer-events-none absolute inset-[-6%] -z-10 rounded-[50%] blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 56% 46% at 50% 58%, rgba(247,242,232,0.12), transparent 62%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-[-10%] -z-10 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 30% 60% at 8% 50%, rgba(201,161,154,0.10), transparent 65%)",
        }}
        aria-hidden
      />

      <div ref={floatRef} className="relative flex justify-center will-change-transform">
        <div
          ref={tiltRef}
          className="relative w-full max-w-none will-change-transform transform-3d"
        >
          {/* Ground contact shadow -- gives the jar a sense of physical placement */}
          <div
            className="pointer-events-none absolute -bottom-[6%] left-1/2 z-0 h-[14%] w-[58%] -translate-x-1/2 rounded-[100%] blur-xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.48), transparent 72%)",
            }}
            aria-hidden
          />

          {/*
            Blend strategy for jar.jpeg:
            The AI shot sits on near-black (#050504); our page is #080706.
            A radial mask-image dissolves the rectangular image boundary so the
            page background bleeds through all four edges with zero visible seam.

            mask-image ellipse: 80% wide / 92% tall, centred at 48% vertical.
            This keeps the jar label + gold highlight fully opaque while the
            reflective floor and outer dark regions fade cleanly to transparent.

            drop-shadow filter runs on the POST-mask alpha channel, so the golden
            halo appears only around the visible portion -- matching a real studio glow.
          */}
          <Image
            src={ASSETS.jarPng}
            alt={alt}
            width={JAR_WIDTH}
            height={JAR_HEIGHT}
            priority={priority}
            sizes={sizes}
            className="relative z-10 mx-auto h-auto w-full max-w-[min(100%,460px)] object-contain"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 92% at 50% 48%, black 38%, rgba(0,0,0,0.88) 56%, transparent 76%)",
              maskImage:
                "radial-gradient(ellipse 80% 92% at 50% 48%, black 38%, rgba(0,0,0,0.88) 56%, transparent 76%)",
              filter:
                "drop-shadow(0 32px 56px rgba(0,0,0,0.52)) drop-shadow(0 8px 32px rgba(212,175,55,0.22)) drop-shadow(0 0 80px rgba(212,175,55,0.08))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

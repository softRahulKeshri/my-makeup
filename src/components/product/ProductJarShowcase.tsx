"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { ASSETS } from "@/constants/assets";
import type { ProductJarShowcaseProps } from "@/types/product-jar";

const JAR_WIDTH = 768;
const JAR_HEIGHT = 1376;

export const ProductJarShowcase = ({
  widthClassName,
  sizes = "(max-width: 768px) 78vw, 380px",
  priority,
  alt = "Abha 15ml face cream jar",
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
      {/* Soft bloom — no bezel, no “device” frame */}
      <div
        className="jar-ambient-glow pointer-events-none absolute inset-[-8%] -z-10 bg-[radial-gradient(ellipse_65%_55%_at_50%_48%,rgba(212,175,55,0.38),rgba(228,143,15,0.12)_45%,transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="jar-ambient-glow pointer-events-none absolute inset-[-4%] -z-10 rounded-[50%] bg-[radial-gradient(ellipse_50%_40%_at_50%_60%,rgba(247,242,232,0.1),transparent_65%)] blur-2xl"
        aria-hidden
      />

      <div ref={floatRef} className="relative flex justify-center will-change-transform">
        <div
          ref={tiltRef}
          className="relative w-full max-w-none will-change-transform [transform-style:preserve-3d]"
        >
          {/* Ground contact shadow — reads as product on a surface, not a phone */}
          <div
            className="pointer-events-none absolute -bottom-[6%] left-1/2 z-0 h-[14%] w-[58%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42),transparent_72%)] blur-xl"
            aria-hidden
          />
          <Image
            src={ASSETS.jarPng}
            alt={alt}
            width={JAR_WIDTH}
            height={JAR_HEIGHT}
            priority={priority}
            sizes={sizes}
            className="relative z-10 mx-auto h-auto w-full max-w-[min(100%,420px)] object-contain"
            style={{
              filter:
                "drop-shadow(0 28px 48px rgba(0,0,0,0.38)) drop-shadow(0 10px 28px rgba(212,175,55,0.14))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

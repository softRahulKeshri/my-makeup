"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "abha-loader-seen";

export const GoldDrawingLoader = () => {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (seen) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const paths = pathsRef.current.filter(Boolean) as SVGPathElement[];
    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const len = path.getTotalLength?.() ?? 400;
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          try {
            window.localStorage.setItem(STORAGE_KEY, "1");
          } catch {
            // ignore quota / private mode
          }
          gsap.to(rootRef.current, {
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
            onComplete: () => setVisible(false),
          });
        },
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: 0.15,
      }).to(rootRef.current, { opacity: 1, duration: 0.01 }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg"
      aria-hidden
      aria-busy="true"
    >
      <svg
        className="h-32 w-32 md:h-40 md:w-40"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Loading</title>
        <path
          ref={(el) => {
            pathsRef.current[0] = el;
          }}
          d="M20 60 C20 40 35 25 55 25 C75 25 90 40 90 60 C90 80 75 95 55 95 C35 95 20 80 20 60"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          ref={(el) => {
            pathsRef.current[1] = el;
          }}
          d="M45 50 L55 45 L65 50 L75 70"
          stroke="#E48F0F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          ref={(el) => {
            pathsRef.current[2] = el;
          }}
          d="M38 70 H82"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

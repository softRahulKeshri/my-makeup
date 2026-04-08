"use client";

import { useEffect, useRef, useState } from "react";
import { ASSETS } from "@/constants/assets";

export const UsageVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const blockRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.some(
          (e) => e.isIntersecting && e.intersectionRatio > 0.45,
        );
        setInView(hit);
      },
      { threshold: [0, 0.45, 0.65, 1] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      void video.play().catch(() => {
        // Autoplay may be blocked; muted keeps most browsers happy.
      });
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <section
      ref={blockRef}
      id="usage"
      className="bg-brand-bg px-5 py-20"
      aria-labelledby="usage-heading"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-brand-gold">
          Ritual
        </p>
        <h2
          id="usage-heading"
          className="mt-2 font-serif text-2xl text-brand-ink md:text-3xl"
        >
          How to use
        </h2>
        <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brand-ink/75">
          Apply on a clean face. Massage gently until absorbed — morning or night.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-[min(100%,420px)]">
        <div
          className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgba(212,175,55,0.22),transparent_68%)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-gold/25 via-transparent to-brand-turmeric/20 opacity-80 blur-2xl"
          aria-hidden
        />
        <div
          className="relative overflow-hidden rounded-[1.75rem] p-[1.5px] shadow-[0_28px_60px_-20px_rgba(45,41,38,0.35)]"
          style={{
            background:
              "linear-gradient(145deg, rgba(212,175,55,0.55), rgba(252,249,241,0.95) 38%, rgba(228,143,15,0.4))",
          }}
        >
          <div className="overflow-hidden rounded-[calc(1.75rem-1.5px)] bg-[#1a1816]">
            <video
              ref={videoRef}
              className="aspect-[9/16] w-full max-h-[min(72vh,680px)] object-cover"
              src={ASSETS.usageVideo}
              poster={ASSETS.usageVideoPoster}
              muted
              playsInline
              loop
              preload="metadata"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-gold/40 via-brand-turmeric/15 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(212,175,55,0.28),transparent_55%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-bg/10 via-transparent to-brand-bg/25"
              aria-hidden
            />
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-brand-ink/50">
          Plays muted on scroll for a seamless experience
        </p>
      </div>
    </section>
  );
};

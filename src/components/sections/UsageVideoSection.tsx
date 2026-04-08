"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Cleanse",
    copy: "Start with fresh, dry skin so actives can melt in evenly.",
  },
  {
    num: "02",
    title: "Warm & Press",
    copy: "Take a pearl-sized amount. Press between palms to wake the texture.",
  },
  {
    num: "03",
    title: "Lift & Seal",
    copy: "Sweep outward, then press to lock hydration — AM or PM.",
  },
] as const;

/**
 * UsageVideoSection — "The three-beat glow sequence".
 *
 * Desktop (≥768px): cinematic pinned presentation.
 *   The section pins for 280% of viewport height. Each of the three step cards
 *   enters the scene one by one, sequentially:
 *     1. Enter  — y: 55→0, scale: 0.94→1.04, opacity 0→1  (power4.out)
 *     2. Glow   — gold box-shadow pulses in (CSS already handles via lux-step-active)
 *     3. Dim    — scale: 1.04→0.97, opacity 1→0.38, shadow removed
 *
 *   A three-dot progress indicator below the heading tracks which step is active,
 *   animating its own scale + color in sync with the timeline.
 *
 * Mobile (<768px): standard stagger-reveal.
 *   All three cards appear together via a staggered fade+slide (power4.out),
 *   no pinning — mobile users expect vertical flow, not horizontal scroll presentation.
 *
 * gsap.matchMedia() handles the responsive breakpoint swap cleanly:
 *   - Each add() callback returns its own cleanup function
 *   - When the viewport crosses 768px (e.g. device rotation), GSAP reverts
 *     the old breakpoint's animations and fires the new one's setup
 */
export const UsageVideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const steps = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-ritual-step]"),
      );
      const dots = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-progress-dot]"),
      );
      const headerEls = section.querySelectorAll("[data-ritual-header]");

      if (steps.length === 0) return;

      // ── Header reveal — both breakpoints ──────────────────────────────────
      // Triggers before the section pins so the heading is already readable.
      gsap.fromTo(
        headerEls,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.11,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
          },
        },
      );

      const mm = gsap.matchMedia();

      // ── Desktop: cinematic pinned sequence ────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        // Start all steps hidden below their natural position
        gsap.set(steps, { opacity: 0, y: 55, scale: 0.94 });
        gsap.set(dots, { scale: 0.8, backgroundColor: "rgba(212,175,55,0.3)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=280%",
            scrub: 0.75,
            pin: true,
            anticipatePin: 1,
          },
        });

        const seg = 1 / steps.length; // ~0.333 per step

        steps.forEach((step, i) => {
          const at = i * seg;

          // Phase 1 — Enter: slide up + fade in. power4.out = fast snap to position.
          tl.to(
            step,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power4.out",
              duration: seg * 0.38,
            },
            at,
          );

          // Phase 2 — Active glow: subtle scale bump + gold ring + warm shadow
          tl.to(
            step,
            {
              scale: 1.04,
              boxShadow:
                "0 0 0 1.5px rgba(212,175,55,0.65), 0 30px 64px -28px rgba(212,175,55,0.4)",
              duration: seg * 0.1,
            },
            at + seg * 0.38,
          );

          // Progress dot — activates with the step
          if (dots[i]) {
            tl.to(
              dots[i],
              {
                scale: 1.6,
                backgroundColor: "#d4af37",
                duration: seg * 0.12,
              },
              at + seg * 0.3,
            );
          }

          // Phase 3 — Dim (all steps except the last)
          if (i < steps.length - 1) {
            tl.to(
              step,
              {
                opacity: 0.35,
                scale: 0.97,
                boxShadow: "none",
                duration: seg * 0.22,
              },
              at + seg * 0.6,
            );

            if (dots[i]) {
              tl.to(
                dots[i],
                {
                  scale: 0.8,
                  backgroundColor: "rgba(212,175,55,0.3)",
                  duration: seg * 0.14,
                },
                at + seg * 0.6,
              );
            }
          }
        });

        return () => {
          tl.kill();
        };
      });

      // ── Mobile: stagger reveal ────────────────────────────────────────────
      mm.add("(max-width: 767px)", () => {
        gsap.set(steps, { opacity: 0, y: 42 });

        const tween = gsap.to(steps, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="usage"
      className="relative px-5 py-24"
      aria-labelledby="usage-heading"
    >
      {/* Bottom glow — grounds the section visually */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(212,175,55,0.08),transparent_55%)]"
        aria-hidden
      />

      {/* ── Heading block ───────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-xl text-center">
        <p
          data-ritual-header
          className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold/85"
        >
          Ritual
        </p>
        <h2
          id="usage-heading"
          data-ritual-header
          className="mt-3 font-display text-3xl font-semibold text-brand-ink md:text-4xl"
        >
          The three-beat glow sequence
        </h2>
        <div
          data-ritual-header
          className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
        />
        <p
          data-ritual-header
          className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brand-ink/70"
        >
          No autoplay clips — just a clear, luxurious flow you can follow in real life.
        </p>

        {/* Step progress dots — desktop only, animated by GSAP in sync with steps */}
        <div
          data-ritual-header
          className="mt-8 hidden justify-center gap-3 md:flex"
          aria-hidden
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              data-progress-dot
              className="h-2 w-2 rounded-full will-change-transform"
              style={{ backgroundColor: "rgba(212,175,55,0.3)" }}
            />
          ))}
        </div>
      </div>

      {/* ── Step cards grid ─────────────────────────────────────────────── */}
      <div className="relative mx-auto mt-16 grid max-w-3xl gap-5 md:grid-cols-3 md:gap-6">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            data-ritual-step
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-brand-elevated/95 to-brand-bg/90 p-6 shadow-[0_28px_56px_-32px_rgba(0,0,0,0.75)] backdrop-blur-md will-change-transform"
          >
            {/* Step number badge */}
            <div
              className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/35 bg-brand-gold/10 font-display text-sm font-semibold text-brand-gold"
              aria-hidden
            >
              {i + 1}
            </div>

            {/* Step meta */}
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.45em] text-brand-gold/60">
              {step.num}
            </p>
            <h3 className="font-display text-xl text-brand-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-ink/75">{step.copy}</p>

            {/* Decorative corner radial */}
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)]"
              aria-hidden
            />
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-brand-ink/45">
        Tip: pair with SPF in the morning for a finish that stays refined all day.
      </p>
    </section>
  );
};

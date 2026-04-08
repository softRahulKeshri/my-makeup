"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/**
 * LuxuryCursor — a two-layer luxury cursor system.
 *
 * Architecture:
 * - dot:  snappy 10px gold disc that tracks the physical pointer tightly (120ms lag).
 * - ring: a larger 36px hollow ring that trails behind (450ms lag), creating a
 *         "leader/follower" feel that reads as premium on high-end luxury sites.
 *
 * Interaction states:
 * - Default:  dot visible + ring visible
 * - Hover (a, button, [data-cursor-expand], .lux-btn-primary):
 *     ring expands 2.8x + gains a soft gold fill → signals clickability
 *     dot shrinks to zero → cursor "merges" into the hover state
 * - Only shown on devices with a real pointer (hover: hover media query).
 *   Hidden on touch-only devices via CSS + JS guard.
 *
 * Performance notes:
 * - GSAP quickTo skips full tween object overhead — single numeric setter per frame.
 * - CSS `will-change: transform` is applied via Tailwind class on both elements.
 * - Event delegation on `document` catches dynamically mounted elements too.
 */
export const LuxuryCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip entirely on touch/stylus-only devices so we don't
    // hide the native cursor on mobile by accident.
    const ptrMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!ptrMedia.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Make them visible now that we've confirmed pointer device
    gsap.set([dot, ring], { opacity: 1, x: -200, y: -200 });
    document.body.style.cursor = "none";

    // ── GSAP quickTo — fastest way to animate a single CSS property ────────
    // quickTo avoids creating a full Tween object per frame, reducing GC churn.
    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    // ── Expand: triggered when hovering interactive elements ────────────────
    const expand = () => {
      if (expandedRef.current) return;
      expandedRef.current = true;
      gsap.to(ring, {
        scale: 2.8,
        borderColor: "rgba(212,175,55,0.85)",
        backgroundColor: "rgba(212,175,55,0.07)",
        duration: 0.38,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.22,
        ease: "power2.in",
        overwrite: "auto",
      });
    };

    const contract = () => {
      if (!expandedRef.current) return;
      expandedRef.current = false;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(212,175,55,0.5)",
        backgroundColor: "transparent",
        duration: 0.38,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    };

    // ── Event delegation ────────────────────────────────────────────────────
    // Using delegation instead of attaching per-element so dynamically
    // added links/buttons (e.g. from React re-renders) are caught automatically.
    const INTERACTIVE = 'a, button, [data-cursor-expand], .lux-btn-primary';

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) expand();
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest(INTERACTIVE)) contract();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/*
        Gold dot — snappy leader.
        Starts at opacity:0 so it's invisible until JS confirms pointer device.
        -translate-x-1/2 + -translate-y-1/2 keeps the hot-point at the element center.
      */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold opacity-0 will-change-transform"
      />
      {/*
        Ring — trailing follower.
        The border color + scale are animated by GSAP on hover.
      */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/50 opacity-0 will-change-transform"
      />
    </>
  );
};

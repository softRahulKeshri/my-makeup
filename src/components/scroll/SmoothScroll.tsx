"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { type ReactNode, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = { children: ReactNode };

/**
 * SmoothScroll — Lenis v1.x + GSAP ScrollTrigger integration.
 *
 * Why remove scrollerProxy?
 * scrollerProxy was the old pattern for virtual-DOM scroll containers (Lenis v0.x).
 * Lenis v1.x is a native-scroll smoother — the browser owns the scroll position,
 * Lenis only intercepts wheel/touch events to add lerp-based easing.
 * ScrollTrigger therefore reads window.scrollY directly, no proxy needed.
 *
 * Single RAF loop:
 * By driving Lenis from gsap.ticker instead of its own requestAnimationFrame,
 * we guarantee one shared RAF per frame, which prevents double-RAF jank and
 * keeps animations perfectly in sync with scroll.
 *
 * lagSmoothing(0) disables GSAP's built-in lag catch-up, which would fight
 * Lenis' own lerp and produce stuttery scroll at 144+ Hz monitors.
 */
export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      syncTouch: true,       // Mirrors the smooth lerp on touch devices too
      touchMultiplier: 1.2,  // Slightly boost touch scroll speed for responsiveness
      smoothWheel: true,
      wheelMultiplier: 0.9,  // Slightly slower wheel for a "weighty" luxury feel
    });

    // Notify ScrollTrigger of every Lenis tick so pinned sections and
    // scrub values update accurately from Lenis' interpolated scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Named ticker ref so we can remove it precisely on cleanup.
    // Passing time * 1000 converts GSAP's seconds-based ticker to ms for Lenis.
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Defer first refresh so Next.js has painted the page DOM
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

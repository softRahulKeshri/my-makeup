"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { type ReactNode, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = { children: ReactNode };

/**
 * SmoothScroll — Lenis on tablet/desktop only.
 * Mobile (≤767px): native scroll + passive listener → ScrollTrigger.update. No Lenis rAF = smoother touch scrolling.
 */
export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let removeNativeScroll: (() => void) | undefined;

    const setupLenis = () => {
      lenis = new Lenis({
        syncTouch: false,
        touchMultiplier: 1.15,
        smoothWheel: true,
        lerp: 0.075,
        wheelMultiplier: 0.82,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis!.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    };

    const setupNativeOnly = () => {
      const onScroll = () => {
        ScrollTrigger.update();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      removeNativeScroll = () => window.removeEventListener("scroll", onScroll);
    };

    const apply = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      lenis?.destroy();
      lenis = null;
      removeNativeScroll?.();
      removeNativeScroll = undefined;

      if (mq.matches) {
        setupNativeOnly();
      } else {
        setupLenis();
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    apply();

    const onResize = () => {
      lenis?.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });
    mq.addEventListener("change", apply);

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      mq.removeEventListener("change", apply);
      window.removeEventListener("resize", onResize);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      removeNativeScroll?.();
    };
  }, []);

  return <>{children}</>;
};

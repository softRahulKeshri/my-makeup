"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { type ReactNode, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = { children: ReactNode };

/**
 * SmoothScroll — Lenis v1.x + GSAP ScrollTrigger integration.
 * Touch: native momentum on narrow viewports (`syncTouch: false`) to avoid jank with heavy ScrollTrigger sections.
 */
export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    const setup = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      lenis?.destroy();

      const touchNative = mq.matches;
      lenis = new Lenis({
        syncTouch: !touchNative,
        touchMultiplier: touchNative ? 1.25 : 1.15,
        smoothWheel: true,
        /** Lower lerp = softer follow (less “snappy” wheel / trackpad). */
        lerp: touchNative ? 0.09 : 0.075,
        wheelMultiplier: 0.82,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis!.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    setup();

    const onResize = () => {
      lenis?.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    const onMqChange = () => {
      setup();
    };
    mq.addEventListener("change", onMqChange);

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      mq.removeEventListener("change", onMqChange);
      window.removeEventListener("resize", onResize);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
};

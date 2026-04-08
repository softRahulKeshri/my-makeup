"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { type ReactNode, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: ReactNode;
};

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      syncTouch: true,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-dvh">
      {children}
    </div>
  );
};

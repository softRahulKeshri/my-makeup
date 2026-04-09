"use client";

import { useEffect, useState } from "react";
import { GoldenParticleField } from "@/components/effects/GoldenParticleField";

const DESKTOP_COUNT = 72;
/** Mobile: gradient-only backdrop (no canvas rAF) — fastest scroll on phones. */
const MOBILE_COUNT = 0;

/** Fewer particles on narrow viewports; 0 = skip canvas on mobile. */
export const ResponsiveGoldenParticleField = () => {
  const [count, setCount] = useState(DESKTOP_COUNT);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setCount(mq.matches ? MOBILE_COUNT : DESKTOP_COUNT);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return <GoldenParticleField particleCount={count} />;
};

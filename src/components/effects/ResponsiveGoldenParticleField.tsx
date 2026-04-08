"use client";

import { useEffect, useState } from "react";
import { GoldenParticleField } from "@/components/effects/GoldenParticleField";

const DESKTOP_COUNT = 72;
const MOBILE_COUNT = 40;

/** Fewer particles on narrow viewports to keep scroll-driven animations smooth. */
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

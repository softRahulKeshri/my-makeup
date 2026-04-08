"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ResponsiveGoldenParticleField } from "@/components/effects/ResponsiveGoldenParticleField";
import { GoldDrawingLoader } from "@/components/loading/GoldDrawingLoader";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { LuxuryCursor } from "@/components/ui/LuxuryCursor";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* Luxury cursor — renders two fixed-position GSAP-driven elements.
          Rendered outside SmoothScroll so it sits above everything in the z-stack. */}
      <LuxuryCursor />

      <SmoothScroll>
        <GoldDrawingLoader />
        <div className="relative min-h-dvh">
          <div className="lux-page-bg" aria-hidden />
          <ResponsiveGoldenParticleField />
          <main className="relative z-10">{children}</main>
        </div>
      </SmoothScroll>
    </QueryClientProvider>
  );
};

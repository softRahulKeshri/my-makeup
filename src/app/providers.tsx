"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { GoldDrawingLoader } from "@/components/loading/GoldDrawingLoader";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";

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
            // Marketing data is static; avoid refetch churn on focus/reconnect.
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <GoldDrawingLoader />
        <main>{children}</main>
      </SmoothScroll>
    </QueryClientProvider>
  );
};

"use client";

import Image from "next/image";
import { BUY_LINK } from "@/constants/purchase";

/**
 * Persistent slim header — logo + single Buy CTA (conversion-focused).
 */
export const ConversionHeader = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 md:h-16 md:px-5">
        <a
          href="#hero"
          className="flex min-w-0 shrink items-center gap-1.5 outline-offset-4 focus-visible:ring-2 focus-visible:ring-brand-gold/60 md:gap-2"
          aria-label="Abha Cosmetic — back to top"
        >
          <Image
            src="/icon.svg"
            alt=""
            width={32}
            height={32}
            className="h-7 w-7 md:h-8 md:w-8"
            aria-hidden
          />
          <span className="font-brand text-xs font-bold tracking-tight text-brand-ink md:text-base">
            <span className="brand-name-gradient">Abha</span>
          </span>
        </a>

        <a
          href={BUY_LINK}
          data-cursor-expand
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-brand-gold to-[#c9a019] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-on-gold shadow-[0_8px_28px_-6px_rgba(212,175,55,0.55)] transition hover:brightness-105 md:min-h-11 md:px-7 md:text-xs"
        >
          Buy Now
        </a>
      </div>
    </header>
  );
};

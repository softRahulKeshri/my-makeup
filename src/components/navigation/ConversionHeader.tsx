"use client";

import Image from "next/image";
import { BRAND_NAME } from "@/constants/brand";
import { BUY_LINK } from "@/constants/purchase";

/**
 * Persistent slim header — logo + single Buy CTA (conversion-focused).
 */
export const ConversionHeader = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-bg/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex min-h-[3.25rem] max-w-6xl items-center justify-between gap-3 px-4 md:h-16 md:px-5">
        <a
          href="#hero"
          className="flex min-w-0 shrink items-center gap-1.5 outline-offset-4 focus-visible:ring-2 focus-visible:ring-brand-gold/60 md:gap-2"
          aria-label={`${BRAND_NAME} — back to top`}
        >
          <Image
            src="/icon.svg"
            alt=""
            width={32}
            height={32}
            className="h-7 w-7 md:h-8 md:w-8"
            aria-hidden
          />
          <span className="brand-name-display font-brand text-[clamp(0.5625rem,2.2vw,0.8125rem)] font-bold leading-tight text-brand-ink">
            <span className="brand-name-gradient">{BRAND_NAME}</span>
          </span>
        </a>

        <a
          href={BUY_LINK}
          data-cursor-expand
          className="lux-buy-now-primary inline-flex min-h-11 min-w-[5.5rem] shrink-0 touch-manipulation items-center justify-center rounded-full bg-linear-to-r from-brand-gold to-[#c9a019] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-on-gold md:min-h-11 md:px-7 md:text-xs"
        >
          Buy Now
        </a>
      </div>
    </header>
  );
};

import Image from "next/image";
import { ASSETS } from "@/constants/assets";
import type { ProductJarShowcaseProps } from "@/types/product-jar";

const JAR_WIDTH = 768;
const JAR_HEIGHT = 1376;

/**
 * Product jar with warm gold/turmeric bloom and soft lift so the PNG reads luxury on brand-bg.
 */
export const ProductJarShowcase = ({
  widthClassName,
  sizes,
  priority,
  alt = "Abha 15ml face cream jar",
}: ProductJarShowcaseProps) => {
  return (
    <div className={`relative ${widthClassName}`}>
      <div
        className="pointer-events-none absolute inset-0 -z-10 scale-110 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(212,175,55,0.32),rgba(228,143,15,0.1)_40%,transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-[-4%] rounded-[36%] bg-gradient-to-b from-brand-gold/15 via-transparent to-brand-turmeric/12 blur-[28px]"
        aria-hidden
      />
      <div className="relative rounded-[1.75rem] bg-brand-bg/80 p-1 shadow-[0_20px_50px_-12px_rgba(45,41,38,0.2)] ring-1 ring-brand-gold/30 ring-offset-2 ring-offset-brand-bg">
        <div className="overflow-hidden rounded-[calc(1.75rem-4px)] bg-gradient-to-b from-[#fffefb] to-[#f7f2e8]">
          <Image
            src={ASSETS.jarPng}
            alt={alt}
            width={JAR_WIDTH}
            height={JAR_HEIGHT}
            priority={priority}
            sizes={sizes}
            className="h-auto w-full object-contain object-center drop-shadow-[0_12px_28px_rgba(45,41,38,0.12)]"
          />
        </div>
      </div>
    </div>
  );
};

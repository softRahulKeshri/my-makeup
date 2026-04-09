import { BRAND_NAME } from "@/constants/brand";
import { BUY_LINK } from "@/constants/purchase";
import { CONTACT } from "@/constants/contact";

export const SiteFooter = () => {
  const telHref = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

  return (
    <footer
      id="footer"
      className="relative scroll-mt-24 border-t border-white/10 px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-14 text-center sm:px-5 md:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <p className="brand-name-display font-brand text-2xl font-black leading-tight tracking-[0.1em] text-brand-ink md:text-3xl">
        <span className="brand-name-gradient">{BRAND_NAME}</span>
      </p>

      <address className="mx-auto mt-8 max-w-lg not-italic">
        <p className="text-sm leading-relaxed text-brand-ink/70">
          {CONTACT.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="mt-4">
          <a
            href={telHref}
            className="text-base font-semibold text-brand-gold transition hover:text-brand-gold-bright"
          >
            {CONTACT.phone}
          </a>
        </p>
      </address>

      <div className="mt-8">
        <a
          href={BUY_LINK}
          className="lux-buy-now-primary inline-flex min-h-12 min-w-[12rem] touch-manipulation items-center justify-center rounded-full bg-gradient-to-r from-brand-gold to-[#c9a019] px-10 py-3 text-sm font-semibold uppercase tracking-widest text-brand-on-gold"
        >
          Buy now
        </a>
      </div>

      <p className="mt-10 text-[10px] uppercase tracking-[0.35em] text-brand-ink/35">
        © {new Date().getFullYear()} {BRAND_NAME}
      </p>
    </footer>
  );
};

import { BUY_LINK } from "@/constants/purchase";
import { CONTACT } from "@/constants/contact";

export const SiteFooter = () => {
  const mailHref = `mailto:${CONTACT.email}`;
  const telHref = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

  return (
    <footer
      id="footer"
      className="relative scroll-mt-24 border-t border-white/10 px-5 py-16 text-center"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <p className="font-brand text-3xl font-black tracking-tight text-brand-ink md:text-4xl">
        <span className="brand-name-gradient">{CONTACT.companyName}</span>
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm text-brand-ink/60">
        Precision-crafted skincare. Made to feel ceremonial — every single day.
      </p>

      <address className="mx-auto mt-10 max-w-md not-italic">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-brand-gold/80">
          Contact
        </p>
        <p className="mt-3 text-sm leading-relaxed text-brand-ink/75">
          {CONTACT.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="mt-4 flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={mailHref}
            className="text-brand-gold/90 underline-offset-4 transition hover:text-brand-gold hover:underline"
          >
            {CONTACT.email}
          </a>
          <a
            href={telHref}
            className="text-brand-ink/80 transition hover:text-brand-gold"
          >
            {CONTACT.phone}
          </a>
        </p>
        {CONTACT.gst ? (
          <p className="mt-3 text-[11px] text-brand-ink/45">{CONTACT.gst}</p>
        ) : null}
      </address>

      <div className="mt-10">
        <a
          href={BUY_LINK}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-brand-gold to-[#c9a019] px-10 py-3 text-sm font-semibold uppercase tracking-widest text-brand-on-gold shadow-[0_12px_36px_-8px_rgba(212,175,55,0.45)] transition hover:brightness-105"
        >
          Buy Now
        </a>
      </div>

      <p className="mt-12 text-[10px] uppercase tracking-[0.35em] text-brand-ink/35">
        © {new Date().getFullYear()} {CONTACT.companyName}
      </p>
    </footer>
  );
};

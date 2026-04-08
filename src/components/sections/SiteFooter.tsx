export const SiteFooter = () => {
  return (
    <footer className="relative border-t border-white/10 px-5 py-16 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <p className="font-brand text-3xl font-black tracking-tight text-brand-ink md:text-4xl">
        <span className="brand-name-gradient">Abha Cosmetic</span>
      </p>
      <p className="mt-3 max-w-md mx-auto text-sm text-brand-ink/60">
        Precision-crafted skincare. Made to feel ceremonial — every single day.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#benefits"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-brand-gold to-[#c9a019] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-brand-on-gold shadow-[0_12px_36px_-8px_rgba(212,175,55,0.45)] transition hover:brightness-105"
        >
          Benefits
        </a>
        <a
          href="#ingredients"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-gold/50 bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-widest text-brand-ink transition hover:border-brand-gold hover:bg-brand-gold/10"
        >
          Ingredients
        </a>
        <a
          href="#usage"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-brand-ink/90 transition hover:bg-white/10"
        >
          Ritual
        </a>
      </div>
      <p className="mt-12 text-[10px] uppercase tracking-[0.35em] text-brand-ink/35">
        © {new Date().getFullYear()} Abha Cosmetic
      </p>
    </footer>
  );
};

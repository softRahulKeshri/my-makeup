export const SiteFooter = () => {
  return (
    <footer className="border-t border-brand-gold/20 bg-brand-bg px-5 py-12 text-center">
      <p className="font-serif text-lg text-brand-ink">Abha Cosmetic</p>
      <p className="mt-2 text-xs text-brand-ink/60">
        Crafted with intention. Made for your glow.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#benefits"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-brand-bg"
        >
          Benefits
        </a>
        <a
          href="#ingredients"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-gold px-6 py-3 text-sm font-semibold text-brand-ink"
        >
          Ingredients
        </a>
      </div>
    </footer>
  );
};

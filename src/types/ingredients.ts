export type IngredientGlyphId = "aloe" | "orange" | "turmeric" | "avocado";

export type IngredientCard = {
  title: string;
  /** Short marketing line under the title (legacy / extended copy). */
  copy: string;
  /** One-line skin benefit for the golden-dot reveal. */
  benefit: string;
  num: string;
  glyph: IngredientGlyphId;
  /** Remote image URL (optimized via next/image) — optional for image-heavy layouts. */
  imageUrl?: string;
  imageAlt?: string;
};

export type IngredientMarqueeSlide = {
  id: string;
  src: string;
  alt: string;
};

export type IngredientGlyphProps = {
  kind: IngredientGlyphId;
  className?: string;
  animate?: boolean;
};

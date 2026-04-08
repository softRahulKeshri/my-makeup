import { ConversionHeader } from "@/components/navigation/ConversionHeader";
import { BenefitsPinSection } from "@/components/sections/BenefitsPinSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IngredientMarquee } from "@/components/sections/IngredientMarquee";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TrustSection } from "@/components/sections/TrustSection";
import { UsageVideoSection } from "@/components/sections/UsageVideoSection";
import { INGREDIENT_MARQUEE_SLIDES } from "@/constants/ingredient-marquee";

const HomePage = () => {
  return (
    <>
      <ConversionHeader />
      <HeroSection />
      <section className="relative z-20" aria-label="Ingredient highlights">
        <IngredientMarquee slides={INGREDIENT_MARQUEE_SLIDES} />
      </section>
      <TrustSection />
      <BenefitsPinSection />
      <IngredientsSection />
      <UsageVideoSection />
      <SiteFooter />
    </>
  );
};

export default HomePage;

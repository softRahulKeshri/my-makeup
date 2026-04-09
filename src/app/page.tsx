import { ConversionHeader } from "@/components/navigation/ConversionHeader";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TrustSection } from "@/components/sections/TrustSection";
import { UsageHowToSection } from "@/components/sections/UsageHowToSection";

const HomePage = () => {
  return (
    <>
      <ConversionHeader />
      <HeroSection />
      <TrustSection />
      <BenefitsSection />
      <IngredientsSection />
      <UsageHowToSection />
      <SiteFooter />
    </>
  );
};

export default HomePage;

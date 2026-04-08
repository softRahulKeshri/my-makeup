import { BenefitsPinSection } from "@/components/sections/BenefitsPinSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { UsageVideoSection } from "@/components/sections/UsageVideoSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <BenefitsPinSection />
      <IngredientsSection />
      <UsageVideoSection />
      <SiteFooter />
    </>
  );
};

export default HomePage;

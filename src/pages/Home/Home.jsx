import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import StatsSection from "./StatsSection";
import WebinarSection from "./WebinarSection";
import PricingSection from "./PricingSection";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      
      <WebinarSection />
      <StatsSection />
      <PricingSection />
    </main>
  );
}

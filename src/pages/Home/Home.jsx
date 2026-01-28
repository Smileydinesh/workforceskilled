import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import StatsSection from "./StatsSection";
import WebinarSection from "./WebinarSection";
import PricingSection from "./PricingSection";
import BottomContent from './bottomcontent';
import InstructorSlider from "./InstructorSlider";
import SubscriptionToast from "../../components/common/SubscriptionToast";


export default function Home() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("subscription_toast_seen");

    if (!seen) {
      // slight delay for better UX
      setTimeout(() => {
        setShowToast(true);
      }, 1200);
    }
  }, []);

  const handleCloseToast = () => {
    localStorage.setItem("subscription_toast_seen", "true");
    setShowToast(false);
  };

  return (
    <main className="overflow-hidden">
      <HeroSection />
      {/* <FeaturesSection /> */}
      <WebinarSection />
      {/* <StatsSection /> */}
      {/* <BottomContent />  */}
      {/* <PricingSection /> */}
       <InstructorSlider />
       <SubscriptionToast
        show={showToast}
        onClose={handleCloseToast}
      />
    </main>
  );
}
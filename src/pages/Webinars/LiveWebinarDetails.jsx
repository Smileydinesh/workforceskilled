import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import HeroSection from "./HeroSection";
import WebinarContent from "./WebinarContent";
import PricingAside from "./PricingAside";
import MeetYourSpeaker from "./MeetYourSpeaker";





export default function LiveWebinarDetails() {
  const { webinar_id } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/live-webinars/${webinar_id}/`)
;
        const data = await res.json();
        setWebinar(data);
        setSelectedPlan({
          label: "Live – Single Attendee",
          price: data.pricing.live_single_price,
          type: "LIVE_SINGLE",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [webinar_id]);

  const addToCart = async (redirect = false) => {
  console.log("ADD TO CART CLICK");

  if (!selectedPlan || !webinar) {
    console.error("Missing data", { selectedPlan, webinar });
    return;
  }

  setIsAddingToCart(true);

  try {
    const res = await fetch(`${API_BASE}/api/cart/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        webinar_id: webinar.webinar_id,
        purchase_type: selectedPlan.type,
        webinar_type: "LIVE",
      }),
    });

    console.log("ADD CART RESPONSE:", res.status);

    await fetchCartCount();
    if (redirect) navigate("/cart");

  } catch (err) {
    console.error("ADD CART ERROR:", err);
  } finally {
    setIsAddingToCart(false);
  }
};


  if (loading || !webinar) return null;

  return (
<main className="min-h-screen bg-[#F7FBF9] text-gray-900">

      <HeroSection webinar={webinar} />

      {/* Hero → Content Bridge */}
     <div className="relative -mt-12">
  <div className="h-20 bg-gradient-to-b " />
</div>


      <section className="relative max-w-[1420px] mx-auto px-3 sm:px-4 pb-0 grid lg:grid-cols-[1fr_380px] gap-6">


        <WebinarContent webinar={webinar} />
        <PricingAside
          webinar={webinar}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          addToCart={addToCart}
          isAddingToCart={isAddingToCart}
        />
      </section>
      <MeetYourSpeaker webinar={webinar} />
    </main>
  );
}

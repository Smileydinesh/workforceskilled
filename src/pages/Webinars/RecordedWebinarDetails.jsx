import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

import RecordedHeroSection from "./RecordedHeroSection";
import RecordedDescriptionSection from "./RecordedDescriptionSection";
import RecordedPricingSection from "./RecordedPricingSection";
import RecordedInstructorSection from "./RecordedInstructorSection";

export default function RecordedWebinarDetails() {
  const { webinar_id } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ REQUIRED STATE
  const [selectedPlan, setSelectedPlan] = useState("SINGLE");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch(`${API_BASE}/api/recorded-webinars/${webinar_id}/`)
      .then(res => res.json())
      .then(data => {
        setWebinar(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [webinar_id]);

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (redirect = false) => {
    if (!webinar || isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      const purchase_type =
        selectedPlan === "SINGLE"
          ? "RECORDED_SINGLE"
          : "RECORDED_MULTI";

      const res = await fetch(`${API_BASE}/api/cart/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          webinar_id: webinar.webinar_id,
          purchase_type,
          webinar_type: "RECORDED",
        }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

      await fetchCartCount();

      if (redirect) navigate("/cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading recorded webinar…
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Webinar not found
      </div>
    );
  }

  return (
    <>
      <RecordedHeroSection webinar={webinar} />

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[1fr_420px] gap-14">
        <RecordedDescriptionSection webinar={webinar} />

        <RecordedPricingSection
          webinar={webinar}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          onAddToCart={addToCart}
          isAddingToCart={isAddingToCart}
        />
      </section>

      {/* FULL WIDTH INSTRUCTOR */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <RecordedInstructorSection instructor={webinar.instructor} />
      </section>
    </>
  );
}

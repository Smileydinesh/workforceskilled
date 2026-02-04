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

  const buyNow = async () => {
    if (!webinar || isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      // 🔐 STEP 1: Check login
      const authRes = await fetch(`${API_BASE}/api/auth/me/`, {
        credentials: "include",
      });

      if (authRes.status === 401) {
        navigate(`/login?next=/checkout`);
        return;
      }

      // 🛒 STEP 2: Determine purchase type
      const purchase_type =
        selectedPlan === "SINGLE"
          ? "RECORDED_SINGLE"
          : "RECORDED_MULTI";

      // 🛒 STEP 3: Add to cart
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

      if (!res.ok) throw new Error("Buy now failed");

      await fetchCartCount();

      // ✅ STEP 4: Go to checkout
      navigate("/checkout");

    } catch (err) {
      console.error("RECORDED BUY NOW ERROR:", err);
    } finally {
      setIsAddingToCart(false);
    }
  };


  return (
    <>
      <RecordedHeroSection webinar={webinar} />

      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
    
    {/* LEFT : DESCRIPTION */}
    <div className="space-y-8">
      <RecordedDescriptionSection webinar={webinar} />
    </div>

    {/* RIGHT : PRICING */}
    <div className="lg:sticky lg:top-24">
      <RecordedPricingSection
        webinar={webinar}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        onAddToCart={addToCart}
        onBuyNow={buyNow}
        isAddingToCart={isAddingToCart}
      />
    </div>

  </div>
</section>


      {/* FULL WIDTH INSTRUCTOR */}
      <section className="max-w-8xl mx-auto px-6 pb-20 mt-4">
        <RecordedInstructorSection instructor={webinar.instructor} />
      </section>
    </>
  );
}

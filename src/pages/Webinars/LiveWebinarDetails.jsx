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
  const [isInCart, setIsInCart] = useState(false);


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

  useEffect(() => {
  if (!webinar || !selectedPlan) return;

  const checkIfInCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cart/`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();

      const exists = data.items?.some(
        (item) =>
          item.webinar_id === webinar.webinar_id &&
          item.purchase_type === selectedPlan.type
      );

      if (exists) {
        setIsInCart(true);
      }
    } catch (err) {
      console.error("CART CHECK ERROR:", err);
    }
  };

  checkIfInCart();
}, [webinar, selectedPlan]);


  const addToCart = async () => {
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

      if (!res.ok) {
        throw new Error(`Add to cart failed: ${res.status}`);
      }

      await fetchCartCount();

      // ✅ MARK ITEM AS ADDED (THIS UNLOCKS UI CHANGES)
      setIsInCart(true);

    } catch (err) {
      console.error("ADD CART ERROR:", err);
    } finally {
      setIsAddingToCart(false);
    }
  };



  if (loading || !webinar) return null;

  const buyNow = async () => {
    if (!selectedPlan || !webinar) return;

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

      // 🛒 STEP 2: Add item to cart
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

      if (!res.ok) throw new Error("Failed to add to cart");

      await fetchCartCount();

      // ✅ STEP 3: Go to checkout
      navigate("/checkout");

    } catch (err) {
      console.error("BUY NOW ERROR:", err);
    } finally {
      setIsAddingToCart(false);
    }
  };


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
          buyNow={buyNow}
          isAddingToCart={isAddingToCart}
          isInCart={isInCart}
          navigate={navigate}
        />
      </section>
      <MeetYourSpeaker webinar={webinar} />
    </main>
  );
}

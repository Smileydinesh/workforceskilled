import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import HeroSection from "./HeroSection";
import WebinarContent from "./WebinarContent";
import PricingAside from "./PricingAside";
import MeetYourSpeaker from "./MeetYourSpeaker";
import WebinarHero from "./WebinarHero";


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
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);



  useEffect(() => {
  const fetchSubscriptions = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/subscriptions/plans/`
      );
      const data = await res.json();
      setSubscriptions(data);
    } catch (err) {
      console.error("SUBSCRIPTION FETCH ERROR", err);
    }
  };

  fetchSubscriptions();
}, []);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/live-webinars/${webinar_id}/`)
;
        const data = await res.json();
        setWebinar(data);
        const hasLiveSubscription =
  data?.pricing?.live_single_price === 0;

setSelectedPlan({
  label: hasLiveSubscription
    ? "Live – Included"
    : "Live – Single Attendee",
  price: hasLiveSubscription
    ? 0
    : data?.pricing?.live_single_price ?? 0,
  type: "LIVE_SINGLE",
  included: hasLiveSubscription,
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

  const isLivePlan =
    selectedPlan?.type?.startsWith("LIVE");

  const isSubscriptionLive =
    isLivePlan && selectedPlan?.price === 0;


  const addToCart = async () => {
    if (isSubscriptionLive) return;
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



  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-10 w-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

if (!webinar) {
  return (
    <div className="min-h-screen flex items-center justify-center text-red-600">
      Webinar not found
    </div>
  );
}


  const buyNow = async () => {
  if (isSubscriptionLive) return;
  if (!selectedPlan || !webinar) return;

  setIsAddingToCart(true);

  try {
    // 🔐 STEP 1: Check login using Cart API (correct endpoint)
    const authRes = await fetch(`${API_BASE}/api/cart/`, {
      credentials: "include",
    });

    if (authRes.status === 401 || authRes.status === 403) {
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
      <WebinarHero
  webinar={webinar}
  selectedPlan={selectedPlan}
  setSelectedPlan={setSelectedPlan}
  addToCart={addToCart}
  buyNow={buyNow}
  isSubscriptionLive={isSubscriptionLive}
  subscriptions={subscriptions}
  selectedSubscription={selectedSubscription}
  setSelectedSubscription={setSelectedSubscription}
  navigate={navigate}
/>

      {/* <HeroSection webinar={webinar} /> */}

      {/* Hero → Content Bridge */}
     <div className="relative -mt-12">
  <div className="h-20 bg-gradient-to-b " />
</div>


      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
  <WebinarContent webinar={webinar} />
</section>

{/* ================= SPEAKER SECTION ================= */}
<section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
  <MeetYourSpeaker webinar={webinar} />
</section>
    </main>
  );
}

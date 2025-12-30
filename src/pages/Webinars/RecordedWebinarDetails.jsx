import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import {
  FiCalendar,
  FiClock,
  FiHash,
  FiCheckCircle,
  FiChevronRight,
  FiVideo,
  FiUsers,
  FiShoppingCart,
  FiShield,
} from "react-icons/fi";

import refundImage from "../../assets/images/moneyback.png";

/* ================= PAGE ================= */
export default function RecordedWebinarDetails() {
  const { webinar_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("SINGLE");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const navigate = useNavigate();
  const { fetchCartCount } = useCart();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  /* ---------- FETCH DETAILS ---------- */
  useEffect(() => {
    if (!webinar_id) return;

    fetch(`${API_BASE}/api/recorded-webinars/${webinar_id}/`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [webinar_id]);

  /* ---------- ADD TO CART ---------- */
  const addToCart = async () => {
    if (!data || isAddingToCart) return;

    setIsAddingToCart(true);

    const purchaseType =
      selectedPlan === "SINGLE"
        ? "RECORDED_SINGLE"
        : "RECORDED_MULTI";

    try {
      await fetch(`${API_BASE}/api/cart/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          webinar_id: data.webinar_id,
          purchase_type: purchaseType,
          webinar_type: "RECORDED",
        }),
      });

      await fetchCartCount();
      navigate("/cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950 text-yellow-400">
        Loading recorded webinar…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950 text-red-400">
        Webinar not found
      </div>
    );
  }

  const price =
    selectedPlan === "SINGLE"
      ? data.pricing?.single_price
      : data.pricing?.multi_user_price;

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-50">

      {/* ================= HERO ================= */}
      <section className="relative w-full px-4 sm:px-6 pt-10 pb-10 bg-gradient-to-r from-emerald-700 to-teal-600">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700 border border-amber-300 mb-3">
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              RECORDED
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white max-w-4xl">
              {data.title}
            </h1>

            <div className="mt-6 bg-white/90 backdrop-blur-xl border border-emerald-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Webinar Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">

                <Detail icon={<FiCalendar />} label="Access Type" value={data.access_type} />
                <Detail icon={<FiClock />} label="Duration" value={`${data.duration_minutes} minutes`} />
                <Detail icon={<FiHash />} label="Webinar ID" value={data.webinar_id} mono />
                <Detail icon={<FiVideo />} label="Format" value={data.format} />

              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative lg:mt-[88px] flex flex-col items-center group">

            {/* Tooltip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[300px] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
              <div className="bg-white border rounded-xl p-4 shadow-xl">
                <p className="text-xs font-semibold text-gray-600 mb-3 text-center">
                  Refund Policy
                </p>

                <div className="space-y-2 text-xs text-gray-600">
                  <Policy text="Full refund within 5 working days" />
                  <Policy text="No refunds after 5 working days" amber />
                  <Policy text="Cancel anytime before access" />
                </div>

                <a href="/refund-policy" className="text-emerald-600 font-medium text-xs inline-flex items-center gap-1 mt-3">
                  View Full Policy <FiChevronRight />
                </a>
              </div>
            </div>

            <img
              src={refundImage}
              alt="Money Back Guarantee"
              className="max-w-[180px]"
            />

            <p className="mt-3 text-sm text-white cursor-pointer">
              Refund / Cancellation Policy
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[1fr_420px] gap-14">

        {/* LEFT CONTENT */}
        <div className="space-y-10">
          <Block title="Overview">{data.description}</Block>
          <Points title="Why Attend" items={data.why_attend} />
        </div>

        {/* RIGHT PRICING */}
        <aside className="bg-emerald-900/80 border border-emerald-800 rounded-3xl p-8 shadow-xl h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-6">Recorded Access</h3>

          <PlanCard
            active={selectedPlan === "SINGLE"}
            label="Single User"
            price={data.pricing?.single_price}
            onClick={() => setSelectedPlan("SINGLE")}
          />

          {data.pricing?.multi_user_price && (
            <PlanCard
              active={selectedPlan === "MULTI"}
              label="Multi User"
              price={data.pricing.multi_user_price}
              icon={<FiUsers />}
              onClick={() => setSelectedPlan("MULTI")}
            />
          )}

          <div className="text-4xl font-extrabold text-yellow-400 my-6">
            ${price}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={addToCart}
            disabled={isAddingToCart}
            className="w-full py-4 bg-yellow-400 text-emerald-950 rounded-xl font-bold flex justify-center gap-2"
          >
            <FiShoppingCart />
            Add to Cart
          </motion.button>

          <div className="mt-6 text-sm text-emerald-300 flex items-center gap-2">
            <FiShield className="text-green-400" />
            Secure payment • SSL protected
          </div>
        </aside>
      </section>
    </main>
  );
}

/* ================= HELPERS ================= */

function Detail({ icon, label, value, mono }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-10 h-10 rounded-full bg-emerald-100 border flex items-center justify-center text-emerald-600">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className={`text-sm font-semibold ${mono ? "font-mono" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function Policy({ text, amber }) {
  return (
    <div className="flex items-center gap-2">
      <FiCheckCircle className={amber ? "text-amber-500" : "text-emerald-500"} />
      <span>{text}</span>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="bg-emerald-900/70 border border-emerald-800 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-yellow-400 mb-4">{title}</h3>
      <p className="text-emerald-200">{children}</p>
    </div>
  );
}

function Points({ title, items }) {
  if (!items?.length) return null;
  return (
    <Block title={title}>
      <ul className="space-y-2">
        {items.map((p, i) => (
          <li key={i} className="flex gap-2">
            <FiCheckCircle className="text-green-400 mt-1" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </Block>
  );
}

function PlanCard({ label, price, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border mb-3 text-left ${
        active
          ? "border-yellow-400 bg-yellow-400/10"
          : "border-emerald-700 hover:border-yellow-400/60"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold">{label}</span>
        </div>
        <span className="text-lg font-bold text-yellow-400">${price}</span>
      </div>
    </button>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  // NEW: For navigation
import { useCart } from "../../context/CartContext";  // NEW: Assuming your CartContext path
import {
  FiCheckCircle,
  FiVideo,
  FiShield,
  FiUsers,
  FiClock,
  FiShoppingCart,  // NEW: For cart icon
} from "react-icons/fi";

/* ================= PAGE ================= */
export default function RecordedWebinarDetails() {
  const { webinar_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("SINGLE");
  const [isAddingToCart, setIsAddingToCart] = useState(false);  // NEW: For add-to-cart loading
  const navigate = useNavigate();  // NEW: Navigation hook
  const { fetchCartCount } = useCart();  // NEW: From context for updating cart count

  /* ---------- FETCH DETAILS ---------- */
  useEffect(() => {
    if (!webinar_id) return;

    fetch(`http://127.0.0.1:8000/api/recorded-webinars/${webinar_id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Recorded webinar not found");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [webinar_id]);

  /* ---------- ADD TO CART ---------- */
  const addToCart = async (redirect = false) => {
    if (!data || isAddingToCart) return;  // Prevent double-clicks

    setIsAddingToCart(true);
    try {
      // Map selectedPlan to purchase_type (e.g., "SINGLE" → "RECORDED_SINGLE")
      const purchaseType = selectedPlan === "SINGLE" ? "RECORDED_SINGLE" : "RECORDED_MULTI";

      const response = await fetch("http://localhost:8000/api/cart/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          webinar_id: data.webinar_id,
          purchase_type: purchaseType,
          webinar_type: "RECORDED",  // Routes to recorded model/pricing
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      await fetchCartCount();  // Update navbar cart count

      if (redirect) {
        // Smooth transition before navigation
        await new Promise(resolve => setTimeout(resolve, 200));
        navigate("/cart");
      } else {
        // Optional: Show success message (e.g., toast)
        alert("Added to cart!");  // Replace with a toast library like react-hot-toast
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");  // Replace with error toast
    } finally {
      setIsAddingToCart(false);
    }
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950 text-yellow-400 text-lg">
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
      <section className="relative overflow-hidden">
        <img
          src={data.cover_image}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <span className="inline-flex items-center gap-2 bg-yellow-400 text-emerald-950 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <FiVideo /> Recorded Webinar
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold max-w-4xl">
            {data.title}
          </h1>

          <p className="mt-4 max-w-3xl text-emerald-200">
            {data.description}
          </p>

          <div className="mt-6 flex items-center gap-6 text-sm text-emerald-300">
            <span className="flex items-center gap-2">
              <FiClock />
              {data.duration_minutes} minutes
            </span>
            <span>{data.format}</span>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[1fr_420px] gap-14">

        {/* -------- LEFT -------- */}
        <div className="space-y-12">

          {/* OVERVIEW */}
          <Block title="Webinar Overview">
            {data.overview?.map((p, i) => (
              <p key={i} className="text-emerald-200 leading-relaxed">
                {p}
              </p>
            ))}
          </Block>

          {/* WHY ATTEND */}
          <Points title="Why You Should Attend" items={data.why_attend} />

          {/* WHO BENEFITS */}
          <Block title="Who Will Benefit">
            {data.who_benefits?.subtitle && (
              <p className="text-yellow-400 font-medium mb-4">
                {data.who_benefits.subtitle}
              </p>
            )}
            <ul className="space-y-3">
              {data.who_benefits?.points?.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <FiCheckCircle className="text-green-400 mt-1" />
                  <span className="text-emerald-200">{p}</span>
                </li>
              ))}
            </ul>
          </Block>

          {/* AREAS COVERED */}
          <Points title="Topics Covered" items={data.areas_covered} />

          {/* INSTRUCTOR */}
          <Block title="Meet Your Instructor">
            <div className="flex gap-6">
              <img
                src={data.instructor.photo}
                className="w-28 h-28 rounded-full border-4 border-yellow-400"
                alt={data.instructor.name}
              />
              <div>
                <h4 className="text-xl font-bold">
                  {data.instructor.name}
                </h4>
                <p className="text-yellow-400 font-medium">
                  {data.instructor.designation}
                  {data.instructor.organization
                    ? ` · ${data.instructor.organization}`
                    : ""}
                </p>
                <p className="mt-4 text-sm text-emerald-300">
                  {data.instructor.bio}
                </p>
              </div>
            </div>
          </Block>
        </div>

        {/* -------- RIGHT / PRICING -------- */}
        <aside className="sticky top-24 bg-gradient-to-br from-emerald-900/80 to-emerald-950 border border-emerald-800 rounded-3xl p-8 shadow-2xl h-fit">

          <h3 className="text-xl font-bold mb-6">
            Recorded Access
          </h3>

          {/* PLAN SELECTION */}
          <div className="space-y-3 mb-8">
            <PlanCard
              active={selectedPlan === "SINGLE"}
              label="Single User"
              desc="Individual lifetime access"
              price={data.pricing?.single_price}
              onClick={() => setSelectedPlan("SINGLE")}
            />

            {data.pricing?.multi_user_price && (
              <PlanCard
                active={selectedPlan === "MULTI"}
                label="Multi User"
                desc="Team / organization access"
                price={data.pricing.multi_user_price}
                icon={<FiUsers />}
                onClick={() => setSelectedPlan("MULTI")}
              />
            )}
          </div>

          {/* PRICE */}
          <div className="text-4xl font-extrabold text-yellow-400 mb-2">
            ${price}
          </div>

          <p className="text-sm text-emerald-300 mb-6">
            One-time payment · {data.access_type === "LIMITED" ? "Limited" : "Lifetime"} access
          </p>

          {/* UPDATED: ADD TO CART BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(true)}  // Redirect to cart on click
            disabled={isAddingToCart || !price}  // Disable if loading/no price
            className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed text-emerald-950 rounded-xl font-bold transition-all duration-300 relative overflow-hidden"
          >
            {isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <FiShoppingCart />
                <span>Add to Cart</span>
              </>
            )}
          </motion.button>

          {/* BUY NOW BUTTON (Optional - implement similar logic if needed) */}
          <button className="w-full mt-3 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold transition disabled:opacity-50" disabled={!price}>
            Buy Now
          </button>

          <div className="mt-8 pt-6 border-t border-emerald-800 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FiShield className="text-green-400" />
              {data.refund_policy}
            </p>
            <p className="flex items-center gap-2">
              <FiCheckCircle className="text-green-400" />
              24/7 On-Demand Access
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

/* ================= HELPERS ================= */

function Block({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-emerald-900/70 border border-emerald-800 rounded-2xl p-8"
    >
      <h3 className="text-2xl font-bold text-yellow-400 mb-5">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}

function Points({ title, items }) {
  if (!items?.length) return null;

  return (
    <Block title={title}>
      <ul className="space-y-3">
        {items.map((p, i) => (
          <li key={i} className="flex gap-3">
            <FiCheckCircle className="text-green-400 mt-1" />
            <span className="text-emerald-200">{p}</span>
          </li>
        ))}
      </ul>
    </Block>
  );
}

function PlanCard({ label, desc, price, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        active
          ? "border-yellow-400 bg-yellow-400/10"
          : "border-emerald-700 bg-emerald-900/40 hover:border-yellow-400/60"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-emerald-300">{desc}</p>
          </div>
        </div>
        <p className="text-lg font-bold text-yellow-400">
          ${price}
        </p>
      </div>
    </button>
  );
}
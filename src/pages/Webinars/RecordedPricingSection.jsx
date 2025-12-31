import { FiUsers, FiCheckCircle, FiShoppingCart, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";

export default function RecordedPricingSection({
  webinar,
  selectedPlan,
  setSelectedPlan,
  onAddToCart,
  isAddingToCart,
}) {
  const pricing = webinar.pricing;

  const price =
    selectedPlan === "SINGLE"
      ? pricing?.single_price
      : pricing?.multi_user_price;

  return (
    <aside className="sticky top-24 h-fit">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl p-7">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-200">
            <FiShoppingCart className="text-xl text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Recorded Access
            </h3>
            <p className="text-sm text-gray-500">
              Instant access after purchase
            </p>
          </div>
        </div>

        {/* PLAN SELECTION */}
        <div className="space-y-3 mb-8">
          <PlanCard
            active={selectedPlan === "SINGLE"}
            label="Single User"
            description="Individual lifetime access"
            price={pricing?.single_price}
            onClick={() => setSelectedPlan("SINGLE")}
          />

          {pricing?.multi_user_price && (
            <PlanCard
              active={selectedPlan === "MULTI"}
              label="Multi User"
              description="Team / organization access"
              price={pricing.multi_user_price}
              icon={<FiUsers />}
              onClick={() => setSelectedPlan("MULTI")}
            />
          )}
        </div>

        {/* PRICE */}
        <div className="mb-6">
          <div className="text-4xl font-extrabold text-emerald-600">
            ${price}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            One-time payment · {webinar.access_type === "LIMITED" ? "Limited" : "Lifetime"} access
          </p>
        </div>

        {/* ADD TO CART */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!price || isAddingToCart}
          onClick={() => onAddToCart(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg
            bg-gradient-to-r from-emerald-600 to-emerald-700 text-white
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isAddingToCart ? (
            <>
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>Adding…</span>
            </>
          ) : (
            <>
              <FiShoppingCart />
              <span>Add to Cart</span>
            </>
          )}
        </motion.button>

        {/* TRUST */}
        <div className="mt-8 pt-6 border-t border-gray-200 space-y-3 text-sm">
          <Guarantee text="Instant on-demand access" />
          <Guarantee text="Lifetime viewing rights" />
          <Guarantee text={webinar.refund_policy || "100% Money Back Guarantee"} />
          <Guarantee icon={<FiShield />} text="Secure & encrypted payment" />
        </div>
      </div>
    </aside>
  );
}

/* ---------- SUB COMPONENTS ---------- */

function PlanCard({ label, description, price, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border transition-all text-left ${
        active
          ? "border-emerald-400 bg-emerald-50"
          : "border-gray-200 hover:border-emerald-300 bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <p className="font-semibold text-gray-900">{label}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="text-lg font-bold text-emerald-600">
          ${price}
        </div>
      </div>
    </button>
  );
}

function Guarantee({ text, icon }) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      {icon || <FiCheckCircle className="text-emerald-500" />}
      <span>{text}</span>
    </div>
  );
}

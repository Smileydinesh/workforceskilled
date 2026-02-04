import { useState } from "react";
import {
  FiCheckCircle,
  FiShoppingCart,
  FiShield,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function RecordedPricingSection({
  webinar,
  selectedPlan,
  setSelectedPlan,
  onAddToCart,
  onBuyNow,
  isAddingToCart,
}) {
  const navigate = useNavigate();
  const pricing = webinar.pricing;

  const price =
    selectedPlan === "SINGLE"
      ? pricing?.single_price
      : pricing?.multi_user_price;

  /* --------------------------------
     ADD TO CART (NO LOCK / NO STORAGE)
  -------------------------------- */
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <aside className="sticky top-24 h-fit">
      <div className="
        bg-white/95 backdrop-blur-xl
        rounded-3xl
        border border-sky-200
        shadow-2xl
        px-6 py-6
      ">

        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-sky-100 border border-sky-200">
            <FiShoppingCart className="text-xl text-sky-600" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-sky-900">
              Recorded Access
            </h3>
            <p className="text-xs font-medium text-sky-600">
              Instant access after purchase
            </p>
          </div>
        </div>

        {/* ================= PLAN SELECTION ================= */}
        <div className="space-y-3 mb-6">
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
              onClick={() => setSelectedPlan("MULTI")}
            />
          )}
        </div>

        {/* ================= PRICE ================= */}
        <div className="mb-5 text-center">
          <div className="text-4xl font-extrabold text-sky-700">
            ${price}
          </div>
          <p className="text-xs font-medium text-sky-600 mt-1">
            One-time payment ·{" "}
            {webinar.access_type === "LIMITED"
              ? "Limited"
              : "Lifetime"}{" "}
            access
          </p>
        </div>

        {/* ================= ADD TO CART ================= */}
        <motion.button
          type="button"
          onClick={handleAddToCart}
          disabled={!price || isAddingToCart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            w-full py-3 rounded-xl
            font-bold text-base
            bg-gradient-to-r from-sky-600 to-sky-700
            text-white
            hover:from-sky-700 hover:to-sky-800
            disabled:opacity-60
            shadow-lg
          "
        >
          {isAddingToCart ? "Adding…" : "Add to Cart"}
        </motion.button>

        {/* ================= BUY NOW ================= */}
        <motion.button
          type="button"
          onClick={onBuyNow}
          disabled={!price || isAddingToCart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            w-full mt-3 py-3 rounded-xl
            font-bold text-base
            bg-gradient-to-r from-amber-500 to-amber-600
            text-white
            hover:from-amber-600 hover:to-amber-700
            disabled:opacity-60
            shadow-lg
          "
        >
          Buy Now
        </motion.button>

        {/* ================= TRUST / GUARANTEE ================= */}
        <div className="mt-6 pt-4 border-t border-sky-200 space-y-2 text-sm">
          <Guarantee text="Instant on-demand access" />
          <Guarantee text="Lifetime viewing rights" />
          <Guarantee
            text={webinar.refund_policy || "100% Money Back Guarantee"}
          />
          <Guarantee
            icon={<FiShield className="text-sky-500" />}
            text="Secure & encrypted payment"
          />
        </div>
      </div>
    </aside>
  );
}

/* ================= SUB COMPONENTS ================= */

function PlanCard({
  label,
  description,
  price,
  active,
  onClick,
}) {
  return (
    <label
      onClick={onClick}
      className={`
        relative flex items-start gap-3
        p-4 rounded-xl border cursor-pointer
        transition-all
        ${
          active
            ? "border-sky-500 bg-sky-50 shadow-sm"
            : "border-gray-200 hover:border-sky-300 bg-white"
        }
      `}
    >
      <input
        type="radio"
        checked={active}
        readOnly
        className="mt-1 w-4 h-4 accent-sky-600"
      />

      <div className="flex-1">
        <p className="font-bold text-sm text-sky-900">
          {label}
        </p>
        <p className="text-xs font-medium text-sky-600">
          {description}
        </p>
      </div>

      <div className="text-sm font-extrabold text-sky-700">
        ${price}
      </div>
    </label>
  );
}

function Guarantee({ text, icon }) {
  return (
    <div className="flex items-center gap-2 text-sky-700 font-medium">
      {icon || <FiCheckCircle className="text-sky-500" />}
      <span>{text}</span>
    </div>
  );
}

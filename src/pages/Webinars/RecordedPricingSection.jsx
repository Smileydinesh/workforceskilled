import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiShoppingCart,
  FiShield,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function RecordedPricingSection({
  webinar,
  selectedPlan,
  setSelectedPlan,
  onAddToCart,
  onBuyNow,
  isAddingToCart,
}) {
  const navigate = useNavigate();
  const { cartCount, fetchCartCount } = useCart();

  // UI-only state
  const [selectedPlanInCart, setSelectedPlanInCart] = useState(null);

  const pricing = webinar.pricing;

  const price =
    selectedPlan === "SINGLE"
      ? pricing?.single_price
      : pricing?.multi_user_price;

  // 🔑 Disable Add to Cart if ANY plan already in cart
  const isPlanAlreadyInCart =
    selectedPlanInCart !== null && cartCount > 0;

  /* --------------------------------
     RESTORE PLAN AFTER REFRESH
  -------------------------------- */
  useEffect(() => {
    if (cartCount > 0) {
      const savedPlan = sessionStorage.getItem(
        `cart-plan-${webinar.id}`
      );
      if (savedPlan) {
        setSelectedPlanInCart(savedPlan);
      }
    }
  }, [cartCount, webinar.id]);

  /* --------------------------------
     CLEAR WHEN CART EMPTY
  -------------------------------- */
  useEffect(() => {
    if (cartCount === 0) {
      setSelectedPlanInCart(null);
      sessionStorage.removeItem(
        `cart-plan-${webinar.id}`
      );
    }
  }, [cartCount, webinar.id]);

  /* --------------------------------
     ADD TO CART (NO REDIRECT)
  -------------------------------- */
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlanAlreadyInCart) return;

    onAddToCart?.();

    // Save selected plan for refresh restore
    sessionStorage.setItem(
      `cart-plan-${webinar.id}`,
      selectedPlan
    );

    setSelectedPlanInCart(selectedPlan);

    setTimeout(() => {
      fetchCartCount();
    }, 150);
  };

  return (
    <aside className="sticky top-24 h-fit">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl px-6 py-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-sky-100 border border-sky-200">
            <FiShoppingCart className="text-lg text-sky-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Recorded Access
            </h3>
            <p className="text-xs text-gray-500">
              Instant access after purchase
            </p>
          </div>
        </div>

        {/* PLAN SELECTION */}
        <div className="space-y-2 mb-5">
          <PlanCard
            active={selectedPlan === "SINGLE"}
            inCart={selectedPlanInCart === "SINGLE" && cartCount > 0}
            label="Single User"
            description="Individual lifetime access"
            price={pricing?.single_price}
            onClick={() => setSelectedPlan("SINGLE")}
          />

          {pricing?.multi_user_price && (
            <PlanCard
              active={selectedPlan === "MULTI"}
              inCart={selectedPlanInCart === "MULTI" && cartCount > 0}
              label="Multi User"
              description="Team / organization access"
              price={pricing.multi_user_price}
              onClick={() => setSelectedPlan("MULTI")}
            />
          )}
        </div>

        {/* PRICE */}
        <div className="mb-4">
          <div className="text-3xl font-extrabold text-sky-600">
            ${price}
          </div>
          <p className="text-xs text-gray-500">
            One-time payment ·{" "}
            {webinar.access_type === "LIMITED"
              ? "Limited"
              : "Lifetime"}{" "}
            access
          </p>
        </div>

        {/* ADD TO CART */}
        <motion.button
          type="button"
          onClick={handleAddToCart}
          disabled={!price || isAddingToCart || isPlanAlreadyInCart}
          whileHover={!isPlanAlreadyInCart ? { scale: 1.02 } : {}}
          whileTap={!isPlanAlreadyInCart ? { scale: 0.98 } : {}}
          className={`
            w-full py-3 rounded-xl font-semibold text-base
            ${
              isPlanAlreadyInCart
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700"
            }
          `}
        >
          {isPlanAlreadyInCart
            ? "Already in Cart"
            : isAddingToCart
            ? "Adding…"
            : "Add to Cart"}
        </motion.button>

        {/* VIEW CART */}
        {cartCount > 0 && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/cart")}
            className="
              w-full mt-2.5 py-2.5 rounded-lg
              text-sm font-semibold text-sky-700
              border border-sky-300 bg-sky-50
              hover:bg-sky-100
            "
          >
            View Cart →
          </motion.button>
        )}

        {/* BUY NOW */}
        <motion.button
          type="button"
          onClick={onBuyNow}
          disabled={!price || isAddingToCart}
          className="
            w-full mt-3 py-3 rounded-xl font-semibold text-base
            bg-gradient-to-r from-amber-500 to-amber-600
            text-white
            hover:from-amber-600 hover:to-amber-700
            disabled:opacity-60
          "
        >
          Buy Now
        </motion.button>

        {/* TRUST */}
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-xs">
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

/* ---------- SUB COMPONENTS ---------- */

function PlanCard({
  label,
  description,
  price,
  active,
  inCart,
  onClick,
}) {
  return (
    <label
      className={`relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer
        ${
          active
            ? "border-sky-500 bg-sky-50"
            : "border-gray-200 hover:border-sky-300 bg-white"
        }
      `}
    >
      <input
        type="checkbox"
        checked={active}
        onChange={onClick}
        className="mt-0.5 w-4 h-4 accent-sky-600"
      />

      <div className="flex-1">
        <p className="font-semibold text-sm text-gray-900">
          {label}
        </p>
        <p className="text-xs text-gray-500">
          {description}
        </p>

        {/* ✅ PLAN IN CART INDICATOR */}
        {inCart && (
          <p className="mt-1 text-xs font-semibold text-sky-600">
            ✓ This plan is already selected
          </p>
        )}
      </div>

      <div className="text-sm font-bold text-sky-600">
        ${price}
      </div>
    </label>
  );
}

function Guarantee({ text, icon }) {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      {icon || <FiCheckCircle className="text-sky-500" />}
      <span>{text}</span>
    </div>
  );
}

import { useState } from "react";
import {
  FiCheck,
  FiCalendar,
  FiClock,
  FiVideo,
  FiUser,
  FiShoppingCart,
  FiEye,
} from "react-icons/fi";
import { MdOutlineLiveTv } from "react-icons/md";
import refundBadge from "../../assets/images/moneyback.png";
import { formatPstEst } from "../../utils/timezone";

/* ---------- STATUS LOGIC ---------- */
function getWebinarStatus(startDatetime, durationMinutes = 90) {
  const start = new Date(startDatetime);
  const now = new Date();
  const end = new Date(start.getTime() + durationMinutes * 60000);

  if (now >= start && now <= end) return { label: "LIVE NOW", type: "live" };
  if (now > end) return { label: "ENDED", type: "ended" };

  const diffSeconds = Math.floor((start - now) / 1000);
  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  if (days === 0) {
    return { label: `${hours}h ${minutes}m ${seconds}s left`, type: "hours" };
  }

  return { label: `${days} days left`, type: "days" };
}

export default function WebinarHero({
  webinar,
  selectedPlan,
  setSelectedPlan,
  addToCart,
  buyNow,
  isSubscriptionLive,
  subscriptions,
  selectedSubscription,
  setSelectedSubscription,
  navigate,
}) {
  const pricing = webinar.pricing;
  const instructor = webinar.instructor;

  const [showRefund, setShowRefund] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const status = getWebinarStatus(
    webinar.start_datetime,
    webinar.duration_minutes
  );

  const { date, pst, est, day } = formatPstEst(webinar.start_datetime);

  const handleJoin = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/live-webinars/${webinar.webinar_id}/join/`,
        { credentials: "include" }
      );

      if (!res.ok) {
        const data = await res.json();
        alert(data.detail || "Access denied");
        return;
      }

      // later → redirect to real meeting room
      navigate(`/live/${webinar.webinar_id}`);
    } catch (err) {
      console.error("JOIN ERROR", err);
    }
  };


  const select = (type, price) => {
    setSelectedPlan({ type, price });
  };

  const handleAddToCart = () => {
    addToCart();
    !isSubscriptionLive && setItemAdded(true);

  };

  const handleBuyNow = () => {
    buyNow();
    setItemAdded(false);
  };

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 to-blue-50">

      {/* ================= TITLE & STATUS ================= */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              {webinar.title}
            </h1>
            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-lg transform transition-all duration-300 ${
                  status.type === "live"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white animate-pulse hover:animate-none"
                    : status.type === "ended"
                    ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                    : "bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900"
                }`}
              >
                {status.label}
              </span>
              <span className="text-sm flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <FiCalendar className="text-white" />
                <span className="font-medium">{date}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full px-4 py-4">
        <div className="max-w-7xl mx-auto">

          {/* ========= INSTRUCTOR & INFO CARD ========= */}
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 mb-4 overflow-hidden">
            <div className="p-4 md:p-5">
              <div className="flex flex-col lg:flex-row items-start gap-5">
                
                {/* Instructor */}
                <div className="lg:w-1/4 flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="relative group mb-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-sky-300 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <img
                      src={instructor.photo}
                      alt={instructor.name}
                      className="relative w-16 h-16 rounded-full object-cover border-3 border-white shadow-md group-hover:border-blue-200 transition-all duration-300"
                    />
                  </div>
                  <p className="text-base font-bold text-blue-800">{instructor.name}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                    <FiUser className="text-blue-500" />
                    Instructor
                  </p>
                </div>

                {/* Schedule */}
                <div className="lg:w-2/4">
                  <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <FiCalendar className="text-blue-600" />
                    Webinar Schedule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Detail
                      icon={<FiCalendar />}
                      label="Date"
                      value={`${day}, ${date}`}
                    />
                    <Detail
                      icon={<FiClock />}
                      label="Time"
                      value={
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{pst}</span>
                          <span className="text-blue-400">|</span>
                          <span className="font-semibold">{est}</span>
                        </div>
                      }
                    />
                    <Detail
                      icon={<MdOutlineLiveTv />}
                      label="Duration"
                      value={`${webinar.duration_minutes} min`}
                    />
                    <Detail
                      icon={<FiVideo />}
                      label="Webinar ID"
                      value={webinar.webinar_id}
                    />
                  </div>
                </div>

                {/* Money Back */}
                <div className="lg:w-1/4 flex flex-col items-center justify-center p-4 relative group/refund"
                  onMouseEnter={() => setShowRefund(true)}
                  onMouseLeave={() => setShowRefund(false)}>
                  <img
                    src={refundBadge}
                    alt="Money Back Guarantee"
                    className="w-32 mb-2 transform transition-transform duration-300 group-hover/refund:scale-110"
                  />
                  <p className="text-xs text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors duration-300">
                    Refund Policy
                  </p>
                  {showRefund && (
                    <div className="absolute top-full mt-2 bg-white text-blue-900 rounded-lg shadow-xl p-3 text-xs z-20 w-56 border border-blue-200">
                      <div className="flex items-start gap-2">
                        <FiCheck className="text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold">Full Refund Guarantee</p>
                          <p className="text-blue-600">5–7 working days</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* ========= PRICING SECTION ========= */}
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
            
            {/* Pricing Header */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 align-content-center">Choose Your Plan</h2>
            </div>

            <div className="p-4">
              {/* Column Headers */}
              <div className="grid grid-cols-3 text-center text-sm font-bold text-blue-700 mb-3">
                <div className="border-r border-blue-200">Live</div>
                <div className="border-r border-blue-200">Recorded</div>
                <div>Combo</div>
              </div>

              {/* Pricing Options - Row 1 */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <Plan
                  checked={selectedPlan?.type === "LIVE_SINGLE"}
                  onChange={() =>
                    !isSubscriptionLive &&
                    select("LIVE_SINGLE", pricing.live_single_price)
                  }
                  title={isSubscriptionLive ? "Live – Included" : "Single Attendee"}
                  price={isSubscriptionLive ? "Included" : pricing.live_single_price}
                  disabled={isSubscriptionLive}
                />
                <Plan
                  checked={selectedPlan?.type === "RECORDED_SINGLE"}
                  onChange={() => select("RECORDED_SINGLE", pricing.recorded_single_price)}
                  title="Single Recorded"
                  price={pricing.recorded_single_price}
                />
                <Plan
                  checked={selectedPlan?.type === "COMBO_SINGLE"}
                  onChange={() => select("COMBO_SINGLE", pricing.combo_single_price)}
                  title="Live + Record"
                  price={pricing.combo_single_price}
                />
              </div>

              {/* Pricing Options - Row 2 */}
              <div className="grid grid-cols-3 gap-3">
                <Plan
                  checked={selectedPlan?.type === "LIVE_MULTI"}
                  onChange={() =>
                    !isSubscriptionLive &&
                    select("LIVE_MULTI", pricing.live_multi_price)
                  }
                  title={isSubscriptionLive ? "Group – Included" : "Group Access"}
                  price={isSubscriptionLive ? "Included" : pricing.live_multi_price}
                  disabled={isSubscriptionLive}
                />

                <Plan
                  checked={selectedPlan?.type === "RECORDED_MULTI"}
                  onChange={() => select("RECORDED_MULTI", pricing.recorded_multi_price)}
                  title="Group Recorded"
                  price={pricing.recorded_multi_price}
                />
                <Plan
                  checked={selectedPlan?.type === "COMBO_MULTI"}
                  onChange={() => select("COMBO_MULTI", pricing.combo_multi_price)}
                  title="Group + Record"
                  price={pricing.combo_multi_price}
                />
              </div>

              {/* ========= SUBSCRIPTION SECTION ========= */}
{subscriptions?.length > 0 && (
  <div className="mb-6 p-4 border border-green-200 rounded-lg bg-green-50">
    <h3 className="text-lg font-bold text-green-800 mb-3">
      Unlimited Live Webinar Access
    </h3>

    <div className="grid md:grid-cols-2 gap-4">
      {subscriptions.map((plan) => {
        const selected = selectedSubscription?.id === plan.id;

        return (
          <label
            key={plan.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all
              ${
                selected
                  ? "border-green-600 bg-green-100"
                  : "border-green-200 bg-white hover:bg-green-100"
              }`}
          >
            <input
              type="radio"
              name="subscription"
              className="hidden"
              checked={selected}
              onChange={() => setSelectedSubscription(plan)}
            />

            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-green-900">
                  {plan.duration_months} Months Unlimited
                </p>
                <p className="text-sm text-green-700">
                  Access all live webinars
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-green-800">
                  ${plan.price}
                </p>
              </div>
            </div>
          </label>
        );
      })}
    </div>

    <button
      onClick={() => navigate("/subscriptions/checkout")}
      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition"
    >
      Buy Subscription
    </button>
  </div>
)}


              {/* Total & Actions */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Selected Plan</p>
                    <p className="text-2xl font-bold text-blue-800">${selectedPlan?.price || 0}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3">

                  {isSubscriptionLive ? (
                    <button
                      onClick={handleJoin}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800
                      text-white px-8 py-3 font-bold rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Join Webinar
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleAddToCart}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                        text-white px-6 py-2.5 font-bold rounded-lg shadow hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <FiShoppingCart className="text-lg" />
                        Add to Cart
                      </button>

                      <button
                        onClick={handleBuyNow}
                        className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black
                        text-white px-6 py-2.5 font-bold rounded-lg shadow transition-all duration-300"
                      >
                        Buy Now
                      </button>
                    </>
                  )}

                </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

/* ================= PLAN COMPONENT ================= */
function Plan({ checked, onChange, title, price, disabled = false }) {

  return (
    <label
  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300
  ${
    disabled
      ? "opacity-60 cursor-not-allowed bg-gray-50"
      : checked
      ? "border-blue-500 bg-blue-50 cursor-pointer"
      : "border-blue-100 hover:bg-blue-50 cursor-pointer"
  }`}
>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only"
          />

          <div className={`w-5 h-5 flex items-center justify-center rounded border-2 transition-all duration-300 ${checked ? 'bg-blue-600 border-blue-600' : 'border-blue-300'}`}>
            {checked && <FiCheck className="text-white text-xs" />}
          </div>
        </div>
        <div>
          <p className={`text-sm font-semibold ${checked ? 'text-blue-800' : 'text-blue-700'}`}>
            {title}
          </p>
          <p className="text-xs text-blue-500 mt-0.5">
            {title.includes("Single") ? "Individual access" : "Group access"}
          </p>
        </div>
      </div>
      <div className="text-right">
       <p className="text-lg font-bold text-blue-800">
        {typeof price === "number" ? `$${price}` : price}
      </p>

      </div>
    </label>
  );
}

/* ================= DETAIL COMPONENT ================= */
function Detail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-xs text-blue-600 mb-0.5">{label}</p>
        <div className="font-semibold text-blue-800 text-sm">
          {value}
        </div>
      </div>
    </div>
  );
}
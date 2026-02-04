import { useState } from "react";
import {
  FiCheck,
  FiCalendar,
  FiClock,
  FiVideo,
  FiUser,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
  FiPlayCircle,
  FiGift,
  FiChevronRight,
  FiHash
} from "react-icons/fi";
import { formatPstEst } from "../../utils/timezone";

// Import refund badge image
import refundBadge from "../../assets/images/moneyback.png";

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
  const [hoveredPlan, setHoveredPlan] = useState(null);
  
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

  // SVG Icons as components
  const LiveIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 10.031v-6.423l-6.036 3.606 6.036 3.817zm-16 10.006v-12.009l9.985 6.004-9.985 6.005zm1.989-12.425l9.979-5.994-9.979 5.994zm14.011-5.994v6.424l6.037-3.606-6.037-2.818z"/>
    </svg>
  );

  const RecordedIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );

  const PremiumIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  );

  const TimerIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  );

  return (
    <div className="w-full bg-white min-h-screen">

      {/* ================= TITLE & STATUS ================= */}
      <div className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-sky-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 py-4 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-sm">
                {webinar.title}
              </h1>
              {/* <p className="text-sky-100 mt-1 text-sm flex items-center gap-2">
                <FiUser className="text-sky-200" />
                with {instructor.name}
              </p> */}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-70"></div>
                <span
                  className={`relative px-4 py-1.5 rounded-full text-sm font-bold shadow-lg transform transition-all duration-300 ${
                    status.type === "live"
                      ? "bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white animate-pulse"
                      : status.type === "ended"
                      ? "bg-gradient-to-r from-slate-500 to-slate-600 text-white"
                      : "bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600"
                  }`}
                >
                  {status.label}
                </span>
              </div>
              <span className="text-sm flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                <FiCalendar className="text-white" />
                <span className="font-medium">{date}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto">

          {/* ========= INSTRUCTOR & INFO CARD ========= */}
          <div className="bg-white rounded-xl shadow-lg border border-sky-100 mb-6 overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                
                {/* Instructor Card - Left Side */}
                <div className="mt-3 lg:w-1/4 flex flex-col items-center text-center p-4 bg-sky-50 rounded-lg border border-sky-100 hover:border-sky-200 transition-all duration-300 group">
                  <div className="relative mb-3">
                    <div className="absolute -inset-3 bg-gradient-to-r from-sky-300 to-sky-400 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-md transform group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={instructor.photo}
                        alt={instructor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-sky-500 to-sky-600 text-white p-1.5 rounded-full shadow-md">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-base font-bold text-sky-800 group-hover:text-sky-700 transition-colors">
                    {instructor.name}
                  </p>
                  <p className="text-xs text-sky-600 flex items-center justify-center gap-1 mt-1">
                    <svg className="w-3 h-3 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Instructor
                  </p>
                </div>

                {/* Schedule Grid - Middle Section */}
                <div className="lg:w-2/4">
                  <h3 className="text-lg font-bold text-sky-800 mb-1 flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg text-white">
                      <FiCalendar />
                    </div>
                    <span>Webinar Schedule</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Detail
                      icon={<FiCalendar className="text-sky-600" />}
                      label="Date"
                      value={`${day}, ${date}`}
                      gradient="from-sky-100 to-sky-50"
                    />
                    <Detail
                      icon={<FiClock className="text-sky-600" />}
                      label="Time"
                      value={
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                           
                            <span className="text-sky-700">{pst} | {est}</span>
                          </div>
                          
                        </div>
                      }
                      gradient="from-sky-100 to-sky-50"
                    />
                    <Detail
                      icon={<FiVideo />}
                      label="Duration"
                      value={
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sky-800">{webinar.duration_minutes} min</span>
                        </div>
                      }
                      gradient="from-sky-100 to-sky-50"
                    />
                    <Detail
                      icon={<FiHash className="text-sky-600" />}
                      label="Webinar ID"
                      value={
                        <div className="font-mono font-bold text-sky-800 px-2 py-1 rounded">
                          {webinar.webinar_id}
                        </div>
                      }
                      gradient="from-sky-100 to-sky-50"
                    />
                  </div>
                </div>

                {/* Money Back Guarantee - Right Side */}
                {/* Money Back Guarantee - Right Side */}
<div className="lg:w-1/4 flex flex-col items-center justify-center p-4 relative">
  <div className="relative transform transition-all duration-300 hover:scale-105">
    <div className="absolute -inset-3 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full blur opacity-20"></div>

   <div className="relative rounded-full">
  <img
    src={refundBadge}
    alt="Money Back Guarantee"
    className="w-32 h-32 object-contain"
    onError={(e) => {
      e.currentTarget.src =
        "https://dummyimage.com/200x200/cccccc/000000&text=Refund";
    }}
  />
</div>
  </div>

  {/* Refund Policy trigger */}
  <div
    className="relative flex items-center gap-2 text-emerald-700 font-semibold cursor-pointer
               hover:text-emerald-800 transition-colors mt-3"
    onMouseEnter={() => setShowRefund(true)}
    onMouseLeave={() => setShowRefund(false)}
  >
    <FiChevronRight className="text-emerald-600" />
    <span className="text-sm">Refund Policy</span>

    {showRefund && (
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2
                      bg-white rounded-xl shadow-2xl p-4 text-sm z-30 w-72
                      border border-emerald-200">

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2
                        w-4 h-4 bg-white border-r border-b
                        border-emerald-200 rotate-45"></div>

        <div className="space-y-2 text-left">
          <p className="font-bold text-emerald-800 text-base">
            Refund Policy
          </p>

          <p className="text-emerald-700">
            ❌ No refunds after <span className="font-semibold">5 working days</span>
          </p>

          <p className="text-emerald-700">
            ✅ Subscription cancellation available anytime
          </p>

          <button className="mt-2 text-emerald-600 font-semibold underline underline-offset-4">
            View Full Refund Policy
          </button>
        </div>
      </div>
    )}
  </div>
</div>



              </div>
            </div>
          </div>

          {/* ========= PRICING SECTION ========= */}
          <div className="bg-white rounded-xl shadow-lg border border-sky-100 overflow-hidden mb-6">
            
            {/* Pricing Header */}
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-4">
              <div className="flex items-center justify-center gap-2">
                <FiDollarSign className="text-white text-xl" />
                <h2 className="text-xl font-bold text-white text-center">
                  Choose Your Plan
                </h2>
              </div>
            </div>

            <div className="p-5">
              {/* Column Headers */}
              <div className="grid grid-cols-3 text-center text-sm font-bold text-sky-700 mb-4">
                <div className="border-r border-sky-200 pb-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <LiveIcon />
                    <span>Live</span>
                  </div>
                  <div className="text-xs font-normal text-sky-600 mt-0.5">Interactive Session</div>
                </div>
                <div className="border-r border-sky-200 pb-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <RecordedIcon />
                    <span>Recorded</span>
                  </div>
                  <div className="text-xs font-normal text-sky-600 mt-0.5">Watch Anytime</div>
                </div>
                <div className="pb-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <FiGift className="text-amber-500" />
                    <span>Combo</span>
                  </div>
                  <div className="text-xs font-normal text-sky-600 mt-0.5">Best Value</div>
                </div>
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
                  icon={<LiveIcon />}
                  hovered={hoveredPlan === "LIVE_SINGLE"}
                  onMouseEnter={() => setHoveredPlan("LIVE_SINGLE")}
                  onMouseLeave={() => setHoveredPlan(null)}
                  badge={isSubscriptionLive ? "FREE" : null}
                  badgePosition="top-right"
                />
                <Plan
                  checked={selectedPlan?.type === "RECORDED_SINGLE"}
                  onChange={() => select("RECORDED_SINGLE", pricing.recorded_single_price)}
                  title="Single Recorded"
                  price={pricing.recorded_single_price}
                  icon={<RecordedIcon />}
                  hovered={hoveredPlan === "RECORDED_SINGLE"}
                  onMouseEnter={() => setHoveredPlan("RECORDED_SINGLE")}
                  onMouseLeave={() => setHoveredPlan(null)}
                />
                <Plan
                  checked={selectedPlan?.type === "COMBO_SINGLE"}
                  onChange={() => select("COMBO_SINGLE", pricing.combo_single_price)}
                  title="Live + Record"
                  price={pricing.combo_single_price}
                  icon={<FiGift className="text-amber-500" />}
                  hovered={hoveredPlan === "COMBO_SINGLE"}
                  onMouseEnter={() => setHoveredPlan("COMBO_SINGLE")}
                  onMouseLeave={() => setHoveredPlan(null)}
                  badge="POPULAR"
                  badgePosition="top-right"
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
                  title={isSubscriptionLive ? "Group – Included" : "Multi Attendees"}
                  subtitle="Group License (Up to X Attendees)"
                  price={isSubscriptionLive ? "Included" : pricing.live_multi_price}
                  disabled={isSubscriptionLive}
                  icon={<FiUsers className="text-sky-500 text-lg" />}
                  hovered={hoveredPlan === "LIVE_MULTI"}
                  onMouseEnter={() => setHoveredPlan("LIVE_MULTI")}
                  onMouseLeave={() => setHoveredPlan(null)}
                  badge={isSubscriptionLive ? "FREE" : "TEAMS"}
                  badgePosition="top-left mb-4"
                />
                <Plan
                  checked={selectedPlan?.type === "RECORDED_MULTI"}
                  onChange={() => select("RECORDED_MULTI", pricing.recorded_multi_price)}
                  title="Group Recorded"
                  subtitle="Group License (Up to X Attendees)"
                  price={pricing.recorded_multi_price}
                  icon={<FiUsers className="text-sky-400 text-lg" />}
                  hovered={hoveredPlan === "RECORDED_MULTI"}
                  onMouseEnter={() => setHoveredPlan("RECORDED_MULTI")}
                  onMouseLeave={() => setHoveredPlan(null)}
                />
                <Plan
                  checked={selectedPlan?.type === "COMBO_MULTI"}
                  onChange={() => select("COMBO_MULTI", pricing.combo_multi_price)}
                  title="Group + Record"
                  subtitle="Group License (Up to X Attendees)"
                  price={pricing.combo_multi_price}
                  icon={<FiGift className="text-amber-400 text-lg" />}
                  hovered={hoveredPlan === "COMBO_MULTI"}
                  onMouseEnter={() => setHoveredPlan("COMBO_MULTI")}
                  onMouseLeave={() => setHoveredPlan(null)}
                  badge="BEST VALUE"
                  badgePosition="top-right"
                />
              </div>

              {/* Total & Actions - CENTERED */}
              <div className="mt-6 p-5 bg-gradient-to-r from-sky-50 to-sky-100 rounded-lg border border-sky-200">
                <div className="flex flex-col items-center justify-center gap-6">
                  
                  {/* Total Amount Section - Centered */}
                  <div className="text-center">
                    <p className="text-sky-700 font-semibold mb-1.5 text-sm">Total Amount</p>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-sky-800">
                          ${selectedPlan?.price || 0}
                        </span>
                        <span className="text-sky-600 text-sm">USD</span>
                      </div>
                      
                    </div>
                  </div>
                  
                  {/* Action Buttons - Centered */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">

                    {isSubscriptionLive ? (
                      <button
                        onClick={handleJoin}
                        className="relative overflow-hidden group"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-70 group-hover:opacity-90 transition-opacity"></div>
                        <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
                          text-white px-8 py-3 font-bold rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                          <FiPlayCircle className="text-lg" />
                          <span>Join Webinar Now</span>
                        </div>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleAddToCart}
                          className="relative overflow-hidden group"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg blur opacity-70 group-hover:opacity-90 transition-opacity"></div>
                          <div className="relative bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800
                            text-white px-6 py-3 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
                            <FiShoppingCart className="text-lg" />
                            <span>Add to Cart</span>
                            {itemAdded && (
                              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-bounce">
                                ✓
                              </span>
                            )}
                          </div>
                        </button>

                        <button
                          onClick={handleBuyNow}
                          className="relative overflow-hidden group"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-sky-700 to-sky-800 rounded-lg blur opacity-70 group-hover:opacity-90 transition-opacity"></div>
                          <div className="relative bg-gradient-to-r from-sky-800 to-sky-900 hover:from-sky-900 hover:to-sky-950
                            text-white px-8 py-3 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                            Buy Now
                          </div>
                        </button>
                      </>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* ========= SUBSCRIPTION SECTION ========= */}
          {subscriptions?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-emerald-200 overflow-hidden">
              
              {/* Subscription Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-4">
                <div className="flex items-center justify-center gap-2">
                  <PremiumIcon />
                  <h2 className="text-xl font-bold text-white text-center">
                    Unlimited Live Webinar Access
                  </h2>
                </div>
              </div>

              <div className="p-5">
                <div className="grid md:grid-cols-2 gap-4">
                  {subscriptions.map((plan) => {
                    const selected = selectedSubscription?.id === plan.id;

                    return (
                      <label
                        key={plan.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300
                          ${
                            selected
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-emerald-200 bg-white hover:bg-emerald-50"
                          }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="relative mt-1">
                              <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                selected ? 'bg-emerald-500 border-emerald-500' : 'border-emerald-300'
                              }`}>
                                {selected && <FiCheck className="text-white text-xs" />}
                              </div>
                              <input
                                type="radio"
                                name="subscription"
                                className="sr-only"
                                checked={selected}
                                onChange={() => setSelectedSubscription(plan)}
                              />
                            </div>
                            <div>
                              <p className="font-bold text-emerald-900">
                                {plan.duration_months} Months Unlimited
                              </p>
                              <p className="text-sm text-emerald-700">
                                Access all live webinars
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-xl font-bold text-emerald-800">
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
                  className="mt-4 w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Buy Subscription Plan
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

/* ================= PLAN COMPONENT ================= */
function Plan({
  checked,
  onChange,
  title,
  subtitle,
  price,
  disabled = false,
  icon,
  hovered,
  onMouseEnter,
  onMouseLeave,
  badge,
  badgePosition = "top-right",
}) {
  const getBadgePosition = () => {
    switch (badgePosition) {
      case "top-left":
        return "left-6 -top-3";
      case "top-right":
        return "right-6 -top-3";
      default:
        return "right-6 -top-3";
    }
  };

  return (
    <label
      className={`relative cursor-pointer transition-all duration-300 ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Badge */}
      {badge && (
        <div className={`absolute ${getBadgePosition()} z-20 bg-white px-1`}>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold text-white
              ${
                badge === "POPULAR"
                  ? "bg-orange-500"
                  : badge === "BEST VALUE"
                  ? "bg-emerald-500"
                  : badge === "FREE"
                  ? "bg-green-500"
                  : "bg-sky-500"
              }
            `}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Card */}
      <div
        className={`p-3 rounded-lg border transition-all duration-300 ${
          checked
            ? "border-sky-400 bg-sky-50 shadow-sm"
            : "border-sky-100 hover:border-sky-300"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* ✅ SINGLE CHECKBOX (correct position) */}
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all ${
                checked
                  ? "bg-sky-500 border-sky-500"
                  : "border-sky-300 bg-white"
              }`}
            >
              {checked && <FiCheck className="text-white text-xs" />}
            </div>

            {/* Icon */}
            <div
              className={`p-1.5 rounded ${
                checked ? "bg-sky-100 text-sky-600" : "bg-sky-50 text-sky-500"
              }`}
            >
              {icon}
            </div>

            {/* Text */}
            <div>
              <p
                className={`text-sm font-semibold ${
                  checked ? "text-sky-800" : "text-sky-900"
                }`}
              >
                {title}
              </p>
              <p className="text-xs text-sky-600">
                {subtitle ||
                  (title.includes("Single")
                    ? "Personal access"
                    : "Group License (Up to X Attendees)")}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <p
            className={`text-lg font-bold ${
              checked ? "text-sky-800" : "text-sky-900"
            }`}
          >
            {typeof price === "number" ? `$${price}` : price}
          </p>
        </div>

        {/* Hidden radio */}
        {!disabled && (
          <input
            type="radio"
            name="pricing-plan"
            checked={checked}
            onChange={onChange}
            className="sr-only"
          />
        )}
      </div>
    </label>
  );
}

/* ================= DETAIL COMPONENT ================= */
function Detail({ icon, label, value, gradient = "from-sky-50 to-sky-50" }) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg bg-white border border-sky-100 hover:border-sky-200 transition-all duration-300">
      <div className={`p-2.5 rounded-lg bg-gradient-to-r ${gradient} transition-transform duration-300 group-hover:scale-105`}>
        <div className="relative z-10 text-sky-600">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-xs text-sky-600 mb-0.5 font-medium">{label}</p>
        <div className="font-semibold text-sky-800 text-sm group-hover:text-sky-700 transition-colors">
          {value}
        </div>
      </div>
    </div>
  );
}
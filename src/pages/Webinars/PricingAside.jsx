import {
  FiCheck,
  FiUsers,
  FiVideo,
  FiPlayCircle,
  FiStar,
  FiLock,
  FiChevronRight,
  FiShoppingCart,
  FiZap,
} from "react-icons/fi";
import { useState, useEffect } from "react";

export default function PricingAside({
  webinar,
  selectedPlan,
  setSelectedPlan,
  addToCart,
  buyNow, 
  isAddingToCart,
  isInCart,
  navigate,
}) {
  const pricing = webinar.pricing;
  const [isPulsing, setIsPulsing] = useState(false);

  const plans = [
    {
      group: "Live Version",
      icon: <FiVideo />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50/40 to-cyan-50/40",
      options: [
        {
          key: "LIVE_SINGLE",
          label: "Single Attendee",
          desc: "Solo Participant Access",
          price: pricing.live_single_price,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        },
        {
          key: "LIVE_MULTI",
          label: "Multi Attendees",
          desc: "Group License (Teams)",
          price: pricing.live_multi_price,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        },
      ],
    },
    {
      group: "Recorded Version",
      subtitle: "6 Months Access",
      icon: <FiPlayCircle />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50/40 to-pink-50/40",
      options: [
        {
          key: "RECORDED_SINGLE",
          label: "Single Recorded",
          desc: "Individual Recording License",
          price: pricing.recorded_single_price,
          iconColor: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
        },
        {
          key: "RECORDED_MULTI",
          label: "Multi Recorded",
          desc: "Group Record Access",
          price: pricing.recorded_multi_price,
          iconColor: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
        },
      ],
    },
    {
      group: "Combo Offers",
      badge: "BEST VALUE",
      icon: <FiStar />,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50/40 to-orange-50/40",
      options: [
        {
          key: "COMBO_SINGLE",
          label: "Live + Recorded",
          desc: "Single Attendee + Single Record",
          price: pricing.combo_single_price,
          iconColor: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
        },
        {
          key: "COMBO_MULTI",
          label: "Live + Recorded",
          desc: "Multi Attendees + Group Record Access",
          price: pricing.combo_multi_price,
          popular: true,
          iconColor: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
        },
      ],
    },
  ];

  useEffect(() => {
    if (selectedPlan?.type === "COMBO_MULTI") {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedPlan]);

  return (
    <aside className="sticky top-24 space-y-6 max-w-[420px] animate-fadeIn">

      {/* ================= MAIN PRICING CARD ================= */}
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 via-blue-400/10 to-purple-400/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
        
        <div className="relative rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-white via-white to-emerald-50/30 p-6 space-y-6 shadow-xl backdrop-blur-sm">
          
          {/* Pricing Header */}
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h3>
            <p className="text-sm text-gray-600 mt-1">Select the perfect option for your needs</p>
          </div>

          {plans.map((section, i) => (
            <div key={i} className="animate-slideIn" style={{ animationDelay: `${i * 0.1}s` }}>
              {/* Section Header */}
              <div className="relative mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 duration-300`}>
                      <span className="text-white text-lg">
                        {section.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{section.group}</h4>
                      {section.subtitle && (
                        <p className="text-xs text-gray-500 mt-0.5">{section.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {section.badge && (
                    <span className="absolute -top-2 -right-1 text-[10px] px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg transform rotate-3 animate-pulse-subtle">
                      {section.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {section.options.map((plan) => {
                  const active = selectedPlan?.type === plan.key;
                  const isPopular = plan.popular;

                  return (
                    <button
                      key={plan.key}
                      onClick={() =>
                        setSelectedPlan({
                          label: plan.label,
                          price: plan.price,
                          type: plan.key,
                        })
                      }
                      className={`
                        relative w-full flex gap-4 rounded-xl border-2 px-5 py-4 text-left
                        transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group/plan
                        ${active 
                          ? `${plan.borderColor.replace('200', '400')} ${plan.bgColor} shadow-md` 
                          : `${plan.borderColor} hover:${plan.borderColor.replace('200', '300')} bg-white/50`
                        }
                        ${isPopular && active ? 'ring-2 ring-amber-400 ring-offset-1' : ''}
                      `}
                    >
                      {/* Animated check indicator */}
                      <div className="relative">
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                          transition-all duration-300
                          ${active 
                            ? `border-${plan.iconColor.split('-')[1]}-600 bg-gradient-to-br ${section.gradient}` 
                            : 'border-gray-300 group-hover/plan:border-gray-400'
                          }
                          ${active ? 'scale-110' : 'group-hover/plan:scale-105'}
                        `}>
                          {active && <FiCheck className="text-white text-xs" />}
                        </div>
                        {isPopular && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-ping opacity-75"></div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-semibold ${active ? 'text-gray-900' : 'text-gray-800'}`}>
                            {plan.label}
                          </p>
                          {isPopular && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse-subtle">
                              <FiStar className="text-xs" />
                              POPULAR
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 group-hover/plan:text-gray-700 transition-colors">
                          {plan.desc}
                        </p>
                      </div>

                      {/* Price with animation */}
                      <div className="text-right flex flex-col items-end">
                        <div className={`
                          text-xl font-bold transition-all duration-300
                          ${active 
                            ? `bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent` 
                            : 'text-gray-700'
                          }
                          ${active ? 'scale-110' : ''}
                        `}>
                          ${plan.price}
                        </div>
                        {isPopular && (
                          <span className="text-xs text-amber-600 font-medium mt-1 animate-pulse-subtle">
                            Most Popular
                          </span>
                        )}
                      </div>

                      {/* Hover effect overlay */}
                      <div className={`
                        absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover/plan:opacity-5
                        transition-opacity duration-300
                        ${section.gradient.replace('500', '400')}
                      `}></div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ================= TOTAL SECTION ================= */}
          <div className="border-t border-gray-200 pt-4 mt-2">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Total Amount</p>
                <p className="text-xs text-gray-500">Including all taxes</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  ${selectedPlan?.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 mt-3 p-2 bg-gray-50 rounded-lg">
              <FiLock className="text-gray-500" />
              <span className="flex-1">Secure SSL encrypted payment</span>
              <FiChevronRight className="text-gray-400" />
            </div>
          </div>

          {/* ================= CTA BUTTONS ================= */}
          <div className="space-y-3 pt-2">
            {/* ADD TO CART / ALREADY IN CART */}
            {!isInCart ? (
              <button
                disabled={isAddingToCart}
                onClick={addToCart}
                className="
                  relative w-full py-3.5 rounded-xl font-semibold text-sm
                  bg-gradient-to-r from-emerald-600 to-teal-600 text-white
                  hover:from-emerald-700 hover:to-teal-700
                  transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                  flex items-center justify-center gap-2 group/cart
                  shadow-md
                "
              >
                <FiShoppingCart className="text-lg transform group-hover/cart:scale-110 transition-transform" />
                <span>ADD TO CART – ${selectedPlan?.price}</span>
                <div className="absolute right-4 opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300">
                  <FiChevronRight className="text-lg animate-pulse" />
                </div>
              </button>
            ) : (
              <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 text-center transform transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiCheck className="text-emerald-600" />
                  </div>
                  <p className="text-sm font-semibold text-emerald-800">
                    This item is already in your cart
                  </p>
                </div>
                <button
                  onClick={() => navigate("/cart")}
                  className="text-sm text-emerald-700 hover:text-emerald-800 font-medium underline mt-1 transition-colors"
                >
                  View Cart Details
                </button>
              </div>
            )}

            {/* BUY NOW BUTTON */}
            <button
              disabled={isAddingToCart}
              onClick={buyNow}
              className={`
                relative w-full py-3.5 rounded-xl font-semibold text-sm
                bg-gradient-to-r from-amber-500 to-orange-500 text-white
                hover:from-amber-600 hover:to-orange-600
                transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                flex items-center justify-center gap-2 group/buy
                shadow-md
                ${isPulsing ? 'animate-pulse-subtle' : ''}
              `}
            >
              <FiZap className="text-lg transform group-hover/buy:scale-110 transition-transform" />
              <span>BUY NOW – ${selectedPlan?.price}</span>
              <div className="absolute right-4 opacity-0 group-hover/buy:opacity-100 transition-opacity duration-300">
                <FiChevronRight className="text-lg animate-pulse" />
              </div>
            </button>

            {/* VIEW CART BUTTON */}
            {isInCart && (
              <button
                onClick={() => navigate("/cart")}
                className="
                  w-full py-3 rounded-xl font-semibold text-sm
                  border-2 border-emerald-300 bg-white
                  text-emerald-700 hover:text-emerald-800
                  hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50
                  transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md
                  flex items-center justify-center gap-2 group/view
                "
              >
                <FiShoppingCart className="text-base" />
                <span>View Cart (1 item)</span>
                <FiChevronRight className="text-base opacity-0 group-hover/view:opacity-100 transform group-hover/view:translate-x-1 transition-all duration-300" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= NOTES CARD ================= */}
      <div className="relative animate-slideIn" style={{ animationDelay: '0.4s' }}>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-emerald-400/10 to-purple-400/10 rounded-2xl blur-lg"></div>
        <div className="relative rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/80 p-5 text-sm text-gray-700 space-y-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-3 group/note">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 transform transition-transform group-hover/note:scale-110 duration-300">
              <FiUsers className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Multi Attendees</p>
              <p className="text-xs text-gray-600 mt-0.5">Unlimited team members can join</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group/note">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 transform transition-transform group-hover/note:scale-110 duration-300">
              <FiPlayCircle className="text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Recording Access</p>
              <p className="text-xs text-gray-600 mt-0.5">6 months unlimited viewing period</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group/note">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 transform transition-transform group-hover/note:scale-110 duration-300">
              <FiVideo className="text-emerald-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Recording Availability</p>
              <p className="text-xs text-gray-600 mt-0.5">Available within 24 hours after live session</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulseSubtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 2s ease-in-out infinite;
        }

        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </aside>
  );
}
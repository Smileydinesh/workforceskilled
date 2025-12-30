import {
  FiCheck,
  FiUsers,
  FiVideo,
  FiPlayCircle,
  FiStar,
  FiLock,
} from "react-icons/fi";

export default function PricingAside({
  webinar,
  selectedPlan,
  setSelectedPlan,
  addToCart,
  isAddingToCart,
}) {
  const pricing = webinar.pricing;

  const plans = [
    {
      group: "Live Version",
      icon: <FiVideo />,
      options: [
        {
          key: "LIVE_SINGLE",
          label: "Single Attendee",
          desc: "Solo Participant Access",
          price: pricing.live_single_price,
        },
        {
          key: "LIVE_MULTI",
          label: "Multi Attendees",
          desc: "Group License (Teams)",
          price: pricing.live_multi_price,
        },
      ],
    },
    {
      group: "Recorded Version",
      subtitle: "6 Months Access",
      icon: <FiPlayCircle />,
      options: [
        {
          key: "RECORDED_SINGLE",
          label: "Single Recorded",
          desc: "Individual Recording License",
          price: pricing.recorded_single_price,
        },
        {
          key: "RECORDED_MULTI",
          label: "Multi Recorded",
          desc: "Group Record Access",
          price: pricing.recorded_multi_price,
        },
      ],
    },
    {
      group: "Combo Offers",
      badge: "BEST VALUE",
      icon: <FiStar />,
      options: [
        {
          key: "COMBO_SINGLE",
          label: "Live + Recorded",
          desc: "Single Attendee + Single Record",
          price: pricing.combo_single_price,
        },
        {
          key: "COMBO_MULTI",
          label: "Live + Recorded",
          desc: "Multi Attendees + Group Record Access",
          price: pricing.combo_multi_price,
          popular: true,
        },
      ],
    },
  ];

  return (
    <aside className="sticky top-24 space-y-5 max-w-[420px]">

      {/* ================= PRICING CARD ================= */}
      <div
        className="
          rounded-2xl
          border border-emerald-200/60
          bg-gradient-to-b from-emerald-50/70 via-white to-white
          p-6
          space-y-5
          shadow-md
        "
      >
        {plans.map((section, i) => (
          <div key={i}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                <span className="text-emerald-600 text-base">
                  {section.icon}
                </span>
                {section.group}
              </div>

              {section.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">
                  {section.badge}
                </span>
              )}
            </div>

            {section.subtitle && (
              <p className="text-[11px] text-emerald-700/70 mb-2">
                {section.subtitle}
              </p>
            )}

            {/* Options */}
            <div className="space-y-2.5">
              {section.options.map((plan) => {
                const active = selectedPlan?.type === plan.key;

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
                      w-full flex gap-3 rounded-xl border px-4 py-3 text-left
                      transition-all duration-200
                      ${
                        active
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/60"
                      }
                    `}
                  >
                    {/* Checkbox */}
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5
                        ${
                          active
                            ? "border-emerald-600 bg-emerald-600"
                            : "border-emerald-300"
                        }
                      `}
                    >
                      {active && <FiCheck className="text-white text-xs" />}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-emerald-900">
                          {plan.label}
                        </p>
                        {plan.popular && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-emerald-800/70 mt-0.5">
                        {plan.desc}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-900">
                        ${plan.price}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ================= TOTAL ================= */}
        <div className="border-t border-emerald-200 pt-3">
          <div className="flex justify-between items-center">
            <p className="text-xs text-emerald-700">Total Amount</p>
            <p className="text-xl font-bold text-emerald-900">
              ${selectedPlan?.price}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-700/70">
            <FiLock className="text-xs" />
            Secure payment
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="space-y-2">
          <button
            disabled={isAddingToCart}
            onClick={() => addToCart(true)}
            className="
              w-full py-2.5 rounded-xl font-semibold text-sm
              bg-emerald-600 text-white
              hover:bg-emerald-700
              transition disabled:opacity-60
            "
          >
            ADD TO CART – ${selectedPlan?.price}
          </button>

          <button
            disabled={isAddingToCart}
            onClick={() => addToCart(true)}
            className="
              w-full py-2.5 rounded-xl font-semibold text-sm
              bg-amber-500 text-white
              hover:bg-amber-600
              transition disabled:opacity-60
            "
          >
            BUY NOW – ${selectedPlan?.price}
          </button>
        </div>
      </div>

      {/* ================= NOTES ================= */}
      <div
        className="
          rounded-xl
          border border-emerald-200
          bg-white
          p-4
          text-[12px]
          text-emerald-900/80
          space-y-1.5
          shadow-sm
        "
      >
        <div className="flex gap-2">
          <FiUsers className="text-emerald-600 mt-0.5 text-sm" />
          <span>Multi Attendees: Unlimited team members</span>
        </div>
        <div className="flex gap-2">
          <FiPlayCircle className="text-emerald-600 mt-0.5 text-sm" />
          <span>Recording Access: 6 months unlimited viewing</span>
        </div>
        <div className="flex gap-2">
          <FiVideo className="text-emerald-600 mt-0.5 text-sm" />
          <span>Recording available within 24 hours after live session</span>
        </div>
      </div>

    </aside>
  );
}

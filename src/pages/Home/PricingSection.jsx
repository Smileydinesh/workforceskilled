import { useState } from "react";
import { motion } from "framer-motion";

/* ------------------ BUBBLE BACKGROUND ------------------ */
function PricingBubbleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-md"
          style={{
            width: `${60 + i * 5}px`,
            height: `${60 + i * 5}px`,
            left: `${(i * 11) % 100}%`,
            top: `${(i * 17) % 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 40, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------ PRICING DATA ------------------ */
const plans = [
  {
    name: "Live Webinars",
    monthly: 139,
    yearly: 119,
    highlight: false,
    features: [
      "Live Q&A",
      "Expert Mentors",
      "Session Recording",
      "Certificate",
    ],
  },
  {
    name: "On-Demand",
    monthly: 189,
    yearly: 159,
    highlight: true,
    features: [
      "Unlimited Access",
      "Expert Content",
      "Certificates",
      "Community Access",
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    highlight: false,
    features: [
      "Team Access",
      "Dedicated Support",
      "Custom Content",
      "Analytics Dashboard",
    ],
  },
];

/* ------------------ MAIN COMPONENT ------------------ */
export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="relative bg-gradient-to-br from-[#0B2F25] via-[#0F3D2E] to-[#07251E] py-32 overflow-hidden">

      {/* Animated Bubbles */}
      <PricingBubbleBackground />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-extrabold text-white">
            Choose Your Learning Path
          </h2>
          <p className="mt-4 text-gray-300">
            Flexible plans designed for individuals and teams.
          </p>
        </motion.div>

        {/* BILLING SWITCH */}
        <div className="flex justify-center mb-20">
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition
                ${billing === "monthly"
                  ? "bg-[#FACC15] text-black"
                  : "text-gray-300"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition
                ${billing === "yearly"
                  ? "bg-[#FACC15] text-black"
                  : "text-gray-300"}`}
            >
              Yearly <span className="ml-1 text-xs">(Save 20%)</span>
            </button>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: index === 0 ? -60 : index === 2 ? 60 : 0,
                y: index === 1 ? 40 : 0,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-10 text-center
              transition shadow-xl hover:shadow-2xl hover:shadow-[#FACC15]/20
              ${plan.highlight
                ? "bg-[#1E6F5C] scale-105"
                : "bg-white"}`}
            >

              {/* TOP BADGES */}
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-2">
                  <span className="bg-[#FACC15] text-black px-4 py-1 text-xs font-bold rounded-full shadow">
                    MOST POPULAR
                  </span>
                  <span className="bg-black/80 text-[#FACC15] px-3 py-1 text-xs font-semibold rounded-full border border-[#FACC15]/40">
                    BEST VALUE
                  </span>
                </div>
              )}

              {billing === "yearly" && plan.monthly && (
                <span className="absolute top-4 right-4 bg-green-500/90 text-black
                                 px-3 py-1 text-xs font-bold rounded-full">
                  SAVE 20%
                </span>
              )}

              {/* PLAN NAME */}
              <h3 className={`text-2xl font-bold mb-4 ${
                plan.highlight ? "text-white" : "text-[#0F3D2E]"}`}>
                {plan.name}
              </h3>

              {/* PRICE */}
              <div className="mb-8">
                {plan.monthly ? (
                  <>
                    <p className={`text-4xl font-extrabold ${
                      plan.highlight ? "text-[#FACC15]" : "text-[#0F3D2E]"}`}>
                      ${billing === "monthly" ? plan.monthly : plan.yearly}
                    </p>
                    <p className="text-sm text-gray-400">
                      {billing === "monthly"
                        ? "per month"
                        : "per month (billed yearly)"}
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-extrabold text-[#0F3D2E]">
                    Custom Pricing
                  </p>
                )}
              </div>

              {/* FEATURES */}
              <ul className="space-y-3 mb-10">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex justify-center gap-2 text-sm ${
                      plan.highlight ? "text-gray-200" : "text-gray-600"}`}
                  >
                    <span className="text-[#FACC15]">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-full font-semibold transition
                ${plan.highlight
                  ? "bg-[#FACC15] text-black hover:scale-105"
                  : "border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white"}`}
              >
                {plan.monthly ? "Get Started" : "Contact Sales"}
              </button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

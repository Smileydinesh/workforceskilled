import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiCalendar,
  FiZap,
  FiShield,
} from "react-icons/fi";

export default function SubscriptionCheckout() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/subscriptions/plans/`);
        const data = await res.json();
        setPlans(data);
        setSelectedPlan(data[0]); // default (6 months)
      } catch (err) {
        console.error("FETCH PLANS ERROR", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const proceedToPayment = () => {
    if (!selectedPlan) return;
    navigate("/payment");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-10 w-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Unlimited Live Webinar Access
          </h1>
          <p className="text-sky-100 text-lg">
            One subscription. Attend every live session.
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Feature
            icon={<FiZap />}
            title="Unlimited Live Access"
            text="Join all live webinars during your subscription period"
          />
          <Feature
            icon={<FiCalendar />}
            title="6 & 12 Month Plans"
            text="Choose the duration that fits your learning goals"
          />
          <Feature
            icon={<FiShield />}
            title="Secure Checkout"
            text="Safe and reliable payment experience"
          />
        </div>

        {/* ================= PLANS ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`
                  relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300
                  ${
                    isSelected
                      ? "border-sky-600 bg-sky-50 shadow-lg scale-[1.02]"
                      : "border-gray-200 hover:border-sky-400 hover:shadow-md"
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute -top-3 right-4 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    SELECTED
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.duration_months} Months Unlimited
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  Access all live webinars for {plan.duration_months} months
                </p>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-sky-700">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    / {plan.duration_months} months
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-sky-600" />
                    All live webinars included
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-sky-600" />
                    No per-webinar payments
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-sky-600" />
                    Priority access to upcoming sessions
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="mt-12 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-gray-600">
                Selected Plan
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedPlan?.duration_months} Months Subscription
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">
                Total Payable
              </p>
              <p className="text-3xl font-extrabold text-sky-700">
                ${selectedPlan?.price}
              </p>
            </div>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <button
          onClick={proceedToPayment}
          className="
            mt-8 w-full
            bg-gradient-to-r from-sky-600 to-blue-700
            hover:from-sky-700 hover:to-blue-800
            text-white py-4 rounded-xl
            text-lg font-bold
            shadow-lg hover:shadow-xl
            transform hover:-translate-y-0.5
            transition-all duration-300
          "
        >
          Proceed to Secure Payment
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          You can cancel anytime • Prices are shown in USD
        </p>
      </div>
    </div>
  );
}

/* ================= FEATURE ================= */
function Feature({ icon, title, text }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 text-xl">
        {icon}
      </div>
      <h4 className="font-bold text-gray-900 mb-1">
        {title}
      </h4>
      <p className="text-sm text-gray-600">
        {text}
      </p>
    </div>
  );
}

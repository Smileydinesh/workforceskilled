import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiHash,
  FiCheckCircle,
  FiChevronRight,
  FiUsers,
  FiVideo,
  FiPlayCircle,
  FiStar,
  FiAward
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";

/* ================= PAGE ================= */
export default function LiveWebinarDetails() {
  const { webinar_id } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  /* ---------- FETCH WEBINAR DETAILS ---------- */
  useEffect(() => {
    // Simulate loading delay for better UX
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/live-webinars/${webinar_id}/`);


        const data = await response.json();
        
        // Add small delay for smooth loading animation
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setWebinar(data);
        setSelectedPlan({
          label: "Live – Single Attendee",
          price: data.pricing.live_single_price,
          type: "LIVE_SINGLE",
        });
      } catch (error) {
        console.error("Error fetching webinar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [webinar_id, API_BASE]);

  /* ---------- ADD TO CART ---------- */
  const addToCart = async (redirect = false) => {
    setIsAddingToCart(true);
    try {
      await fetch(`${API_BASE}/api/cart/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          webinar_id: webinar.webinar_id,
          purchase_type: selectedPlan.type,
        }),
      });

      await fetchCartCount();

      if (redirect) {
        // Add smooth transition before navigation
        await new Promise(resolve => setTimeout(resolve, 200));
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
            <FiVideo className="text-3xl text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Webinar Not Found</h2>
          <p className="text-gray-400 mb-6">The requested webinar could not be found.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-amber-400/3 rounded-full blur-3xl"></div>
      </div>

      {/* ================= HERO ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="animate-fade-in">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 border border-emerald-700/30 text-emerald-400 text-sm font-medium backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              {webinar.status}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-700/30 text-amber-300 text-xs font-medium">
              <FiUsers className="text-xs" />
              {webinar.seats_remaining} seats remaining
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-5xl leading-tight bg-gradient-to-r from-white via-gray-100 to-amber-100 bg-clip-text text-transparent">
            {webinar.title}
          </h1>

          <p className="mt-4 text-lg text-gray-300 max-w-3xl">
            Master the art of {webinar.category?.toLowerCase()} with industry-leading experts in this immersive live session
          </p>

          {/* INFO BAR */}
          <div className="mt-10 grid md:grid-cols-3 gap-4 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 transform transition-all duration-500 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/20">
            <Info 
              icon={<FiCalendar className="text-xl" />} 
              label="Date" 
              value={webinar.date_display}
              highlight
            />
            <Info 
              icon={<FiClock className="text-xl" />} 
              label="Time" 
              value={webinar.time_display}
            />
            <Info
              icon={<FiHash className="text-xl" />}
              label="Duration & ID"
              value={
                <span className="flex items-center gap-2">
                  <span>{webinar.duration_minutes} mins</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-mono text-amber-300">ID: {webinar.webinar_id}</span>
                </span>
              }
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-24 grid lg:grid-cols-[1fr_420px] gap-8">
        
        {/* -------- LEFT -------- */}
        <div className="space-y-8 animate-slide-up">
          <Section 
            title="Webinar Overview" 
            icon={<FiPlayCircle className="text-amber-500" />}
          >
            <div className="space-y-4">
              {webinar.overview?.map((p, i) => (
                <p key={i} className="text-gray-300 leading-relaxed">{p}</p>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 rounded-xl border border-emerald-700/30">
              <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                <FiStar className="text-amber-500" />
                Why You Should Attend
              </h3>
              <ul className="space-y-3">
                {webinar.why_attend?.map((item, i) => (
                  <li 
                    key={i} 
                    className="flex gap-3 group hover:translate-x-1 transition-transform duration-300"
                  >
                    <FiCheckCircle className="text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section 
            title="Who Will Benefit" 
            icon={<FiUsers className="text-amber-500" />}
          >
            <p className="text-gray-300 mb-6">{webinar.who_benefits?.subtitle}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {webinar.who_benefits?.points.map((p, i) => (
                <div 
                  key={i} 
                  className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 group"
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-800/50 transition-colors duration-300">
                      <FiCheckCircle className="text-emerald-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{p}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section 
            title="Areas Covered" 
            icon={<FiAward className="text-amber-500" />}
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {webinar.areas_covered?.map((p, i) => (
                <div 
                  key={i} 
                  className="flex gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <FiChevronRight className="text-amber-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{p}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section 
            title="Meet Your Speaker" 
            icon={<FiStar className="text-amber-500" />}
          >
            <div className="flex flex-col sm:flex-row gap-6 p-6 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-amber-500/30 transition-all duration-500">
              <div className="relative">
                <img
                  src={webinar.instructor.photo}
                  className="w-28 h-28 rounded-full border-4 border-emerald-900/50 shadow-lg"
                  alt={webinar.instructor.name}
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
                  <FiAward className="text-white text-lg" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
                  {webinar.instructor.name}
                </h3>
                <p className="text-amber-400 font-medium">
                  {webinar.instructor.designation} – {webinar.instructor.organization}
                </p>
                <p className="text-gray-300 mt-4 leading-relaxed">{webinar.instructor.bio}</p>
              </div>
            </div>
          </Section>
        </div>

        {/* -------- RIGHT / PRICING -------- */}
        <aside className="space-y-6 animate-slide-up-delayed">
          <PricingCard 
            title="Live Webinar" 
            icon={<FiVideo className="text-emerald-400" />}
          >
            <SelectablePrice
              label="Single Attendee"
              desc="Individual Access"
              price={webinar.pricing.live_single_price}
              active={selectedPlan.type === "LIVE_SINGLE"}
              popular={true}
              onClick={() =>
                setSelectedPlan({
                  label: "Live – Single Attendee",
                  price: webinar.pricing.live_single_price,
                  type: "LIVE_SINGLE",
                })
              }
            />
            <SelectablePrice
              label="Multi Attendees"
              desc="Group License"
              price={webinar.pricing.live_multi_price}
              active={selectedPlan.type === "LIVE_MULTI"}
              onClick={() =>
                setSelectedPlan({
                  label: "Live – Multi Attendees",
                  price: webinar.pricing.live_multi_price,
                  type: "LIVE_MULTI",
                })
              }
            />
          </PricingCard>

          <PricingCard 
            title="Recorded Version" 
            subtitle="6 Months Access"
            icon={<FiPlayCircle className="text-amber-400" />}
          >
            <SelectablePrice
              label="Single Recorded"
              desc="Individual Recording"
              price={webinar.pricing.recorded_single_price}
              active={selectedPlan.type === "RECORDED_SINGLE"}
              onClick={() =>
                setSelectedPlan({
                  label: "Recorded – Single",
                  price: webinar.pricing.recorded_single_price,
                  type: "RECORDED_SINGLE",
                })
              }
            />
            <SelectablePrice
              label="Multi Recorded"
              desc="Group Record Access"
              price={webinar.pricing.recorded_multi_price}
              active={selectedPlan.type === "RECORDED_MULTI"}
              onClick={() =>
                setSelectedPlan({
                  label: "Recorded – Multi",
                  price: webinar.pricing.recorded_multi_price,
                  type: "RECORDED_MULTI",
                })
              }
            />
          </PricingCard>

          <PricingCard 
            title="Combo Offers" 
            badge="BEST VALUE"
            icon={<FiAward className="text-amber-500" />}
            gradient={true}
          >
            <SelectablePrice
              label="Live + Recorded (Single)"
              desc="Best for Individuals"
              price={webinar.pricing.combo_single_price}
              active={selectedPlan.type === "COMBO_SINGLE"}
              onClick={() =>
                setSelectedPlan({
                  label: "Combo – Single",
                  price: webinar.pricing.combo_single_price,
                  type: "COMBO_SINGLE",
                })
              }
            />
            <SelectablePrice
              label="Live + Recorded (Multi)"
              desc="Best for Teams"
              price={webinar.pricing.combo_multi_price}
              active={selectedPlan.type === "COMBO_MULTI"}
              onClick={() =>
                setSelectedPlan({
                  label: "Combo – Multi",
                  price: webinar.pricing.combo_multi_price,
                  type: "COMBO_MULTI",
                })
              }
            />
          </PricingCard>

          {/* Order Summary */}
          <div className="sticky top-24 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl shadow-black/30">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Order Summary</h3>
              <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                <div>
                  <p className="font-medium text-white">{selectedPlan.label}</p>
                  <p className="text-sm text-gray-400">{selectedPlan.type.includes('LIVE') ? 'Live Access' : 'Recorded Access'}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                    ${selectedPlan.price}
                  </p>
                  <p className="text-xs text-gray-400">One-time payment</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => addToCart(true)}
              
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 ${
                  isAddingToCart 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-900/30'
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>

              <button
                onClick={() => addToCart(true)}
                className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-900/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400 text-sm" />
                  <span>30-day money-back guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400 text-sm" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400 text-sm" />
                  <span>Lifetime access to updates</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {/* Add custom animations to global CSS or style tag */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out 0.2s both;
        }
        .animate-slide-up-delayed {
          animation: slide-up 0.5s ease-out 0.4s both;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </main>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, icon, children }) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 hover:border-emerald-500/20 transition-all duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-700/30">
          {icon}
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Info({ icon, label, value, highlight }) {
  return (
    <div className={`flex gap-4 p-3 rounded-lg transition-all duration-300 ${
      highlight ? 'bg-emerald-900/20 border border-emerald-700/30' : 'hover:bg-gray-700/30'
    }`}>
      <div className={`p-3 rounded-lg ${highlight ? 'bg-emerald-900/40' : 'bg-gray-700/40'}`}>
        <span className={`text-xl ${highlight ? 'text-emerald-400' : 'text-amber-400'}`}>{icon}</span>
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`font-medium ${highlight ? 'text-emerald-300' : 'text-white'}`}>{value}</p>
      </div>
    </div>
  );
}

function PricingCard({ title, subtitle, badge, icon, gradient, children }) {
  return (
    <div className={`rounded-2xl border p-6 transition-all duration-500 hover:shadow-2xl ${
      gradient 
        ? 'bg-gradient-to-br from-emerald-900/20 via-gray-800/40 to-amber-900/20 border-emerald-700/30 hover:border-amber-500/30' 
        : 'bg-gray-800/40 border-gray-700/50 hover:border-emerald-500/30'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            gradient 
              ? 'bg-gradient-to-br from-emerald-900/40 to-amber-900/40' 
              : 'bg-emerald-900/40'
          }`}>
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-white">{title}</h3>
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-medium animate-pulse">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function SelectablePrice({ label, desc, price, active, popular, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl p-5 text-left transition-all duration-300 transform hover:-translate-y-1 ${
        active
          ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 border-2 border-emerald-500 shadow-lg shadow-emerald-900/20'
          : 'bg-gray-900/40 border border-gray-700 hover:border-amber-500/30 hover:bg-gray-800/40'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white">{label}</p>
            {popular && (
              <span className="text-xs px-2 py-1 bg-amber-900/40 text-amber-300 rounded-full">
                POPULAR
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">{desc}</p>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${
            active ? 'text-amber-300' : 'text-white'
          }`}>
            ${price}
          </p>
          {popular && (
            <p className="text-xs text-emerald-400 mt-1">Save 20%</p>
          )}
        </div>
      </div>
      {active && (
        <div className="mt-3 flex items-center gap-2 text-sm text-emerald-400">
          <FiCheckCircle />
          <span>Selected Plan</span>
        </div>
      )}
    </button>
  );
}
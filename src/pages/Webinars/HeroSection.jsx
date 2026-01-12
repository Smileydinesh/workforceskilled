import {
  FiCalendar,
  FiClock,
  FiHash,
  FiCheckCircle,
  FiChevronRight,
  FiPlay,
  FiUsers,
} from "react-icons/fi";
import { useState } from "react";

export default function HeroSection({ webinar = {
  status: "UPCOMING",
  title: "Master Modern Web Development: From Zero to Hero",
  date_display: "January 25, 2026",
  pst: "10:00 AM",
  est: "1:00 PM",
  duration_minutes: 90,
  webinar_id: "WEB-2026-001"
}}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <section className="relative w-full min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-8 overflow-hidden bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-900">
      {/* Animated mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(22,163,74,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl opacity-20 animate-float-slow"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? 'rgba(22,163,74,0.4)' : 'rgba(16,185,129,0.4)'
              }, transparent)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Content */}
          <div className="space-y-8">
            {/* Status badge */}
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2.5 shadow-2xl">
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full ${
                    webinar.status === "LIVE" ? "bg-green-400 animate-pulse" : "bg-amber-400"
                  }`}></div>
                  <div className={`absolute inset-0 w-3 h-3 rounded-full ${
                    webinar.status === "LIVE" ? "bg-green-400" : "bg-amber-400"
                  } animate-ping`}></div>
                </div>
                <span className="text-white font-semibold text-sm tracking-wide">
                  {webinar.status}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {webinar.title}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Join thousands of professionals in this transformative learning experience. 
                Get expert insights and actionable strategies.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <FiUsers className="text-emerald-300 text-lg" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">2.5K+</p>
                  <p className="text-xs text-slate-400">Attendees</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                  <FiClock className="text-green-300 text-lg" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{webinar.duration_minutes}</p>
                  <p className="text-xs text-slate-400">Minutes</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <FiPlay className="text-lg" />
                  <span>Buy Now</span>
                </div>
              </button>
              
              <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT: Schedule Card */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl opacity-20 blur-xl"></div>
              
              <div className="relative space-y-6">
                {/* Money Back Guarantee - Moved to TOP */}
                <div 
                  className="relative p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-2xl cursor-pointer"
                  onMouseEnter={() => setIsTooltipVisible(true)}
                  onMouseLeave={() => setIsTooltipVisible(false)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <FiCheckCircle className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white mb-1">100% Money-Back Guarantee</p>
                      <div className="flex items-center gap-1 text-green-300 text-xs">
                        <span>View refund policy</span>
                        <FiChevronRight className="text-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Tooltip - Positioned at top */}
                  {isTooltipVisible && (
                    <div className="absolute left-0 right-0 -top-2 -mt-2 bg-white rounded-xl shadow-2xl p-5 border border-slate-200 z-50 animate-fadeIn origin-top scale-95">
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-slate-900">Refund Policy</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-700">Full refund within 5 working days</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <FiCheckCircle className="text-amber-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-700">No refunds after 5 working days</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-700">Cancel subscription anytime</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Event Details</h3>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                    <FiCalendar className="text-white text-xl" />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Date */}
                  <div className="group p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center">
                          <FiCalendar className="text-emerald-300 text-lg" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Date</p>
                          <p className="text-lg font-bold text-white">{webinar.date_display}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="group p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 flex items-center justify-center">
                          <FiClock className="text-green-300 text-lg" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Time</p>
                          <p className="text-lg font-bold text-white">{webinar.pst} PST</p>
                          <p className="text-sm text-slate-400">{webinar.est} EST</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Webinar ID */}
                  <div className="group p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-400/30 flex items-center justify-center">
                          <FiHash className="text-teal-300 text-lg" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Webinar ID</p>
                          <p className="text-lg font-mono font-bold text-white">{webinar.webinar_id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
        
        @keyframes float-slow {
         0%, 100% {
          transform: translate(0, 0);
        }
         50% {
          transform: translate(30px, -30px);
        }
        }
        
        .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
        opacity: 0;
        }
        
        .animate-float-slow {
        animation: float-slow ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

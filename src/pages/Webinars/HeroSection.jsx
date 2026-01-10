import {
  FiCalendar,
  FiClock,
  FiHash,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";
import refundImage from "../../assets/images/moneyback.png";
import { useState } from "react";

export default function HeroSection({ webinar }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <section className="relative w-full px-4 sm:px-6 pt-8 pb-10 sm:pt-10 sm:pb-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-emerald-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/5 to-transparent"></div>
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${10 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start z-10">
        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${
                  webinar.status === "LIVE"
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400 shadow-emerald-500/20 animate-pulse-subtle"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-amber-500/20"
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {webinar.status}
            </span>
          </div>

          {/* Title */}
          <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold max-w-4xl leading-tight text-white">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent animate-gradient-shift">
                {webinar.title}
              </span>
            </h1>
          </div>

          {/* ================= SCHEDULE BOX ================= */}
          <div 
            className="animate-slideUp transition-all duration-300 hover:shadow-xl"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 sm:p-6 shadow-lg overflow-hidden group/schedule">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center transition-transform group-hover/schedule:rotate-6 duration-300">
                    <FiCalendar className="text-white text-base" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Webinar Schedule
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* DATE */}
                  <div className="group/date bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/10 hover:border-emerald-400/30 hover:shadow-md">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-400/20 flex items-center justify-center transition-transform group-hover/date:scale-110 duration-300">
                        <FiCalendar className="text-emerald-300 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-emerald-200/80 mb-1 uppercase tracking-wider">Date</p>
                        {webinar.date_display && (
                          <p className="text-base font-semibold text-white group-hover/date:text-emerald-100 transition-colors duration-300">
                            {webinar.date_display}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TIME */}
                  <div className="group/time bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/10 hover:border-emerald-400/30 hover:shadow-md">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-400/20 flex items-center justify-center transition-transform group-hover/time:scale-110 duration-300">
                        <FiClock className="text-emerald-300 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-emerald-200/80 mb-1 uppercase tracking-wider">Time</p>
                        {webinar.pst && webinar.est && (
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-white group-hover/time:text-emerald-100 transition-colors duration-300">
                              PST: {webinar.pst}
                            </p>
                            <p className="text-xs text-emerald-200/80">
                              EST: {webinar.est}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* DURATION */}
                  <div className="group/duration bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/10 hover:border-emerald-400/30 hover:shadow-md">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-400/20 flex items-center justify-center transition-transform group-hover/duration:scale-110 duration-300">
                        <FiClock className="text-emerald-300 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-emerald-200/80 mb-1 uppercase tracking-wider">Duration</p>
                        <p className="text-base font-semibold text-white group-hover/duration:text-emerald-100 transition-colors duration-300">
                          {webinar.duration_minutes} minutes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WEBINAR ID */}
                  <div className="group/id bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/10 hover:border-emerald-400/30 hover:shadow-md">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-400/20 flex items-center justify-center transition-transform group-hover/id:scale-110 duration-300">
                        <FiHash className="text-emerald-300 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-emerald-200/80 mb-1 uppercase tracking-wider">Webinar ID</p>
                        <p className="text-base font-mono font-semibold text-white group-hover/id:text-emerald-100 transition-colors duration-300">
                          {webinar.webinar_id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="relative lg:mt-16">
          {/* Guarantee Card */}
          <div 
            className="relative animate-slideUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-xl p-5 shadow-xl border border-emerald-100">
              {/* Top badge */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                100% GUARANTEE
              </div>
              
              {/* Image */}
              <div className="mb-4 pt-2">
                <img
                  src={refundImage}
                  alt="100% Money Back Guarantee"
                  className="max-w-[140px] mx-auto transform transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Text with Tooltip Trigger */}
              <div 
                className="text-center cursor-pointer group"
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
              >
                <p className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                  Refund / Cancellation Policy
                </p>
                <div className="inline-flex items-center gap-1 text-emerald-600 font-medium text-xs group-hover:gap-1.5 transition-all duration-300">
                  <span>Learn More</span>
                  <FiChevronRight className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>

              {/* Tooltip positioned to the side */}
              <div
                className={`
                  absolute top-0 left-full ml-4
                  w-72
                  transition-all duration-300 ease-out
                  pointer-events-none
                  z-50
                  ${isTooltipVisible ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}
                `}
              >
                <div className="relative bg-white border border-emerald-200 rounded-lg p-4 shadow-2xl">
                  {/* Tooltip arrow */}
                  <div className="absolute top-6 -left-2 w-3 h-3 bg-white border-l border-b border-emerald-200 transform rotate-45"></div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="text-emerald-600 text-sm" />
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      Refund Policy
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 group/item">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200">
                        <FiCheckCircle className="text-emerald-500 w-2.5 h-2.5" />
                      </div>
                      <span className="text-sm text-gray-700 leading-tight">Full refund within 5 working days</span>
                    </div>

                    <div className="flex items-start gap-2.5 group/item">
                      <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200">
                        <FiCheckCircle className="text-amber-500 w-2.5 h-2.5" />
                      </div>
                      <span className="text-sm text-gray-700 leading-tight">No refunds after 5 working days</span>
                    </div>

                    <div className="flex items-start gap-2.5 group/item">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200">
                        <FiCheckCircle className="text-emerald-500 w-2.5 h-2.5" />
                      </div>
                      <span className="text-sm text-gray-700 leading-tight">Subscription cancellation anytime</span>
                    </div>

                    <a
                      href="/refund-policy"
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs rounded-md transition-all duration-300 group/link"
                    >
                      View Full Refund Policy
                      <FiChevronRight className="transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(8px);
          }
          50% {
            transform: translateY(-8px) translateX(-8px);
          }
          75% {
            transform: translateY(-12px) translateX(4px);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 4s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulseSubtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
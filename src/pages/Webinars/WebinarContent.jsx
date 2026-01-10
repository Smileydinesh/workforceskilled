import {
  FiCheckCircle,
  FiChevronRight,
  FiUsers,
  FiStar,
  FiAward,
  FiTarget,
  FiBookOpen,
  FiTrendingUp,
} from "react-icons/fi";
import { useEffect, useRef } from "react";

export default function WebinarContent({ webinar }) {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideIn");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el, index) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current[index] = el;
    }
  };

  return (
    <section className="relative mt-1 rounded-2xl bg-gradient-to-br from-white via-white to-gray-50/50 p-6 sm:p-8 space-y-10 transform-gpu shadow-xl border border-gray-100 overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-50/20 to-teal-50/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent"></div>

      {/* Main Title with Animation */}
      <div ref={(el) => addToRefs(el, 0)} className="relative opacity-0">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FiBookOpen className="text-white text-xl" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Webinar Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">Comprehensive breakdown of what you'll learn</p>
          </div>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent rounded-full"></div>
      </div>

      {/* ================= OVERVIEW SECTION ================= */}
      <div ref={(el) => addToRefs(el, 1)} className="relative opacity-0">
        <div className="group/overview p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.005]">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group/icon">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-xl blur-lg group-hover/icon:blur-xl transition-all duration-500"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 border border-amber-200 flex items-center justify-center shadow-md">
                <FiStar className="text-amber-500 text-lg group-hover/icon:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover/overview:text-gray-800 transition-colors duration-300">
                Overview
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">Key insights about the webinar</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 pl-4 border-l-2 border-amber-200/50 ml-3 group-hover/overview:border-amber-300 transition-colors duration-300">
            {Array.isArray(webinar.overview)
              ? webinar.overview.map((para, index) => (
                  <div
                    key={index}
                    className="relative group/para"
                  >
                    <div className="absolute -left-5 top-2 w-2.5 h-2.5 rounded-full bg-amber-300 opacity-0 group-hover/para:opacity-100 transform group-hover/para:scale-125 transition-all duration-300"></div>
                    <p className="text-gray-700 leading-relaxed pl-2 group-hover/para:pl-4 group-hover/para:text-gray-800 transition-all duration-300">
                      {para}
                    </p>
                    <div className="h-0.5 w-0 group-hover/para:w-full bg-gradient-to-r from-amber-200/50 to-transparent mt-2 transition-all duration-500 rounded-full"></div>
                  </div>
                ))
              : <p className="text-gray-700 leading-relaxed pl-2">{webinar.overview}</p>}
          </div>
        </div>
      </div>

      {/* ================= WHY ATTEND SECTION ================= */}
      <div ref={(el) => addToRefs(el, 2)} className="relative opacity-0">
        <div className="group/attend p-6 rounded-2xl bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.005]">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group/icon">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl blur-lg group-hover/icon:blur-xl transition-all duration-500"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200 flex items-center justify-center shadow-md">
                <FiTrendingUp className="text-emerald-500 text-lg group-hover/icon:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover/attend:text-gray-800 transition-colors duration-300">
                Why You Should Attend
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">Key benefits and opportunities</p>
            </div>
          </div>

          {/* Benefits List */}
          <ul className="space-y-3">
            {webinar.why_attend?.map((point, index) => (
              <li
                key={index}
                className="group/point flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-white hover:to-emerald-50/50 transition-all duration-300 hover:translate-x-1 hover:shadow-md border border-transparent hover:border-emerald-200"
              >
                <div className="relative shrink-0">
                  <div className="absolute -inset-1.5 bg-emerald-400/10 rounded-full blur-md group-hover/point:bg-emerald-400/20 transition-all duration-300"></div>
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                    <FiCheckCircle className="text-white text-sm" />
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-gray-700 group-hover/point:text-gray-900 font-medium transition-colors duration-300">
                    {point}
                  </span>
                  <div className="h-0.5 w-0 group-hover/point:w-full bg-gradient-to-r from-emerald-400/30 to-transparent mt-2 transition-all duration-500 rounded-full"></div>
                </div>
                <FiChevronRight className="text-emerald-400 opacity-0 group-hover/point:opacity-100 transform group-hover/point:translate-x-1 transition-all duration-300" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= WHO WILL BENEFIT SECTION ================= */}
      <div ref={(el) => addToRefs(el, 3)} className="relative opacity-0">
        <div className="group/benefit p-6 rounded-2xl bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.005]">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group/icon">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl blur-lg group-hover/icon:blur-xl transition-all duration-500"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-50 border border-purple-200 flex items-center justify-center shadow-md">
                <FiTarget className="text-purple-500 text-lg group-hover/icon:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover/benefit:text-gray-800 transition-colors duration-300">
                Who Will Benefit
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">Target audience for this webinar</p>
            </div>
          </div>

          {/* Benefits List */}
          <ul className="space-y-3">
            {webinar.who_benefits?.points?.map((point, index) => (
              <li
                key={index}
                className="group/point flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-white hover:to-purple-50/50 transition-all duration-300 hover:translate-x-1 hover:shadow-md border border-transparent hover:border-purple-200"
              >
                <div className="relative shrink-0">
                  <div className="absolute -inset-1.5 bg-purple-400/10 rounded-full blur-md group-hover/point:bg-purple-400/20 transition-all duration-300"></div>
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
                    <FiUsers className="text-white text-sm" />
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-gray-700 group-hover/point:text-gray-900 font-medium transition-colors duration-300">
                    {point}
                  </span>
                  <div className="h-0.5 w-0 group-hover/point:w-full bg-gradient-to-r from-purple-400/30 to-transparent mt-2 transition-all duration-500 rounded-full"></div>
                </div>
                <FiChevronRight className="text-purple-400 opacity-0 group-hover/point:opacity-100 transform group-hover/point:translate-x-1 transition-all duration-300" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= AREAS COVERED SECTION ================= */}
      <div ref={(el) => addToRefs(el, 4)} className="relative opacity-0">
        <div className="group/areas p-6 rounded-2xl bg-gradient-to-br from-white to-cyan-50/30 border border-cyan-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.005]">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group/icon">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl blur-lg group-hover/icon:blur-xl transition-all duration-500"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-50 border border-cyan-200 flex items-center justify-center shadow-md">
                <FiAward className="text-cyan-500 text-lg group-hover/icon:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover/areas:text-gray-800 transition-colors duration-300">
                Areas Covered in the Session
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">Topics and modules included</p>
            </div>
          </div>

          {/* Areas List */}
          <ul className="space-y-3">
            {webinar.areas_covered?.map((area, index) => (
              <li
                key={index}
                className="group/area flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-white hover:to-cyan-50/50 transition-all duration-300 hover:translate-x-1 hover:shadow-md border border-transparent hover:border-cyan-200"
              >
                <div className="relative shrink-0">
                  <div className="absolute -inset-1.5 bg-cyan-400/10 rounded-full blur-md group-hover/area:bg-cyan-400/20 transition-all duration-300"></div>
                  <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-sm">
                    <div className="text-white font-bold text-xs">{index + 1}</div>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-gray-700 group-hover/area:text-gray-900 font-medium transition-colors duration-300">
                    {area}
                  </span>
                  <div className="h-0.5 w-0 group-hover/area:w-full bg-gradient-to-r from-cyan-400/30 to-transparent mt-2 transition-all duration-500 rounded-full"></div>
                </div>
                <FiChevronRight className="text-cyan-400 opacity-0 group-hover/area:opacity-100 transform group-hover/area:translate-x-1 transition-all duration-300" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Decorative Section */}
      <div className="pt-6 mt-2 border-t border-gray-200/50">
        <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-sm font-medium bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">
            Complete learning experience with practical insights
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        /* Staggered animations */
        div[ref]:nth-child(1) { animation-delay: 0.1s; }
        div[ref]:nth-child(2) { animation-delay: 0.2s; }
        div[ref]:nth-child(3) { animation-delay: 0.3s; }
        div[ref]:nth-child(4) { animation-delay: 0.4s; }
        div[ref]:nth-child(5) { animation-delay: 0.5s; }
      `}</style>
    </section>
  );
}
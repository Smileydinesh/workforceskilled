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
            <div
  className="webinar-content prose max-w-none text-gray-700"
  dangerouslySetInnerHTML={{ __html: webinar.overview }}
/>


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
          <div
  className="webinar-content prose max-w-none"
  dangerouslySetInnerHTML={{ __html: webinar.why_attend }}
/>


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
          <div
  className="webinar-content prose max-w-none"
  dangerouslySetInnerHTML={{ __html: webinar.who_benefits }}
/>


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
          <div
  className="webinar-content"
  dangerouslySetInnerHTML={{ __html: webinar.areas_covered }}
/>


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
      <style>{`
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
      <style>{`
.webinar-content ul {
  list-style: none;
  padding-left: 0;
  margin-top: 0.75rem;
}

.webinar-content li {
  position: relative;
  padding-left: 2.4rem;
  margin-bottom: 0.9rem;
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.6;
}

.webinar-content li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0.15rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #10b981, #14b8a6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(16,185,129,0.3);
}
`}</style>
    </section>
  );
}





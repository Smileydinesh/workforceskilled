import {
  FiBookOpen,
  FiTrendingUp,
  FiTarget,
  FiAward,
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
    if (el) sectionRefs.current[index] = el;
  };

  return (
    <section>
      <div
        className="
          relative
          bg-white
          border border-sky-200
          rounded-2xl
          shadow-xl
          pt-5 pb-6 px-6 sm:pt-7 sm:pb-10 sm:px-10
          space-y-1
          overflow-hidden
        "
      >
        {/* background accents */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-sky-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-sky-100/40 rounded-full blur-3xl" />

        {/* ================= HEADER ================= */}
        <div ref={(el) => addToRefs(el, 0)} className="opacity-0">
          <div className="flex items-center gap-3 mb-2">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
              <FiBookOpen className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Webinar Details
              </h2>
              <p className="text-sm font-medium text-slate-600">
                Everything you’ll learn in this session
              </p>
            </div>
          </div>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />

        </div>

        {/* ================= OVERVIEW (FULL WIDTH) ================= */}
        <div
          ref={(el) => addToRefs(el, 1)}
          className="opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <SectionTitle icon={<FiBookOpen />} title="Overview" />

          <div
            className="
              webinar-content
              prose
              max-w-none
              text-slate-900
              font-semibold
              text-[15px] sm:text-base
              leading-relaxed sm:leading-loose
              bg-sky-50
              border border-sky-100
              rounded-xl
              p-6 sm:p-8
              transition-colors duration-300
              hover:bg-white
            "
            dangerouslySetInnerHTML={{ __html: webinar.overview }}
          />
        </div>

        {/* ================= THREE COLUMN ROW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* WHY ATTEND */}
          <div
            ref={(el) => addToRefs(el, 2)}
            className="opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md p-4 rounded-xl"
          >
            <SectionTitle icon={<FiTrendingUp />} title="Why You Should Attend" />
            <div
              className="webinar-content prose max-w-none text-slate-900 font-semibold text-[15px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: webinar.why_attend }}
            />
          </div>

          {/* WHO BENEFITS */}
          <div
            ref={(el) => addToRefs(el, 3)}
            className="opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md p-4 rounded-xl"
          >
            <SectionTitle icon={<FiTarget />} title="Who Will Benefit" />
            <div
              className="webinar-content prose max-w-none text-slate-900 font-semibold text-[15px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: webinar.who_benefits }}
            />
          </div>

          {/* AREAS COVERED */}
          <div
            ref={(el) => addToRefs(el, 4)}
            className="opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md p-4 rounded-xl"
          >
            <SectionTitle icon={<FiAward />} title="Areas Covered" />
            <div
              className="webinar-content prose max-w-none text-slate-900 font-semibold text-[15px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: webinar.areas_covered }}
            />
          </div>
        </div>
      </div>

      {/* ================= STYLES ================= */}
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

        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }

        .webinar-content ul {
          list-style: none;
          padding-left: 0;
          margin-top: 0.75rem;
        }

        .webinar-content li {
          position: relative;
          padding-left: 2.2rem;
          margin-bottom: 0.85rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.65;
        }

        .webinar-content li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0.2rem;
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #38bdf8, #2563eb);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
          box-shadow: 0 4px 10px rgba(56,189,248,0.35);
        }
      `}</style>
    </section>
  );
}

/* ================= SECTION TITLE ================= */
function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">
        {title}
      </h3>
    </div>
  );
}

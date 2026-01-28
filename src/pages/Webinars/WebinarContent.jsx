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
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current[index] = el;
    }
  };

  return (
    <section className="">
      {/* ================= MAIN CONTAINER ================= */}
      <div className="
        relative
        bg-white
        border border-sky-200
        rounded-2xl
        shadow-xl
        p-6 sm:p-10
        space-y-12
        overflow-hidden
      ">
        {/* Background accents */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-sky-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-sky-100/40 rounded-full blur-3xl" />

        {/* ================= HEADER ================= */}
        <div ref={(el) => addToRefs(el, 0)} className="opacity-0">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
              <FiBookOpen className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Webinar Details
              </h2>
              <p className="text-sm text-gray-500">
                Everything you’ll learn in this session
              </p>
            </div>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
        </div>

        {/* ================= ROW 1 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* OVERVIEW */}
          <div ref={(el) => addToRefs(el, 1)} className="opacity-0">
            <SectionTitle icon={<FiBookOpen />} title="Overview" />
            <div
              className="webinar-content prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: webinar.overview }}
            />
          </div>

          {/* WHY ATTEND */}
          <div ref={(el) => addToRefs(el, 2)} className="opacity-0">
            <SectionTitle icon={<FiTrendingUp />} title="Why You Should Attend" />
            <div
              className="webinar-content prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: webinar.why_attend }}
            />
          </div>
        </div>

        {/* ================= ROW 2 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* WHO BENEFITS */}
          <div ref={(el) => addToRefs(el, 3)} className="opacity-0">
            <SectionTitle icon={<FiTarget />} title="Who Will Benefit" />
            <div
              className="webinar-content prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: webinar.who_benefits }}
            />
          </div>

          {/* AREAS COVERED */}
          <div ref={(el) => addToRefs(el, 4)} className="opacity-0">
            <SectionTitle icon={<FiAward />} title="Areas Covered" />
            <div
              className="webinar-content prose max-w-none text-gray-700"
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
          color: #374151;
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
      <div className="w-10 h-10 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>
    </div>
  );
}

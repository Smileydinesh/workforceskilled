import {
  FiCheckCircle,
  FiChevronRight,
  FiUsers,
  FiStar,
  FiAward,
} from "react-icons/fi";

export default function WebinarContent({ webinar }) {
  return (
    <section
      className="
        mt-1
        rounded-2xl
        border border-emerald-200/60
        bg-gradient-to-b from-emerald-50/60 via-white to-white
        backdrop-blur-xl
        p-6 sm:p-8
        space-y-5
      "
    >
      {/* ================= TITLE ================= */}
      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">
        Webinar Details
      </h2>

      {/* ================= OVERVIEW ================= */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <FiStar className="text-amber-500 text-lg" />
          <h3 className="text-xl font-semibold text-emerald-900">
            Overview
          </h3>
        </div>

        <div className="space-y-4 text-emerald-900/80 leading-relaxed">
          {Array.isArray(webinar.overview)
            ? webinar.overview.map((para, index) => (
                <p key={index}>{para}</p>
              ))
            : <p>{webinar.overview}</p>}
        </div>
      </section>

      {/* ================= WHY ATTEND ================= */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <FiAward className="text-emerald-600 text-lg" />
          <h3 className="text-xl font-semibold text-emerald-900">
            Why You Should Attend
          </h3>
        </div>

        <ul className="space-y-3">
          {webinar.why_attend?.map((point, index) => (
            <li
              key={index}
              className="flex gap-3 items-start text-emerald-900/80"
            >
              <FiCheckCircle className="text-emerald-600 mt-1 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= WHO WILL BENEFIT ================= */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <FiUsers className="text-emerald-600 text-lg" />
          <h3 className="text-xl font-semibold text-emerald-900">
            Who Will Benefit
          </h3>
        </div>

        <ul className="space-y-3">
          {webinar.who_benefits?.points?.map((point, index) => (
            <li
              key={index}
              className="flex gap-3 items-start text-emerald-900/80"
            >
              <FiCheckCircle className="text-emerald-600 mt-1 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= AREAS COVERED ================= */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <FiChevronRight className="text-emerald-600 text-lg" />
          <h3 className="text-xl font-semibold text-emerald-900">
            Areas Covered in the Session
          </h3>
        </div>

        <ul className="space-y-3">
          {webinar.areas_covered?.map((area, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-emerald-900/80"
            >
              <FiChevronRight className="text-amber-500 mt-1 shrink-0" />
              <span>{area}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

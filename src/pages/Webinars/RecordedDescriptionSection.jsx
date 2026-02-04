import {
  FiStar,
  FiAward,
  FiUsers,
  FiChevronRight,
} from "react-icons/fi";

export default function RecordedDescriptionSection({ webinar }) {
  return (
    <section
      className="
        mt-3
        rounded-3xl
        border border-sky-200
        bg-white
        shadow-xl
        p-6 sm:p-8
        space-y-10
      "
    >
      {/* ================= TITLE ================= */}
      <h2 className="
        text-2xl sm:text-3xl
        font-extrabold
        text-gray-900
      ">
        Recording Details
      </h2>

      {/* ================= OVERVIEW ================= */}
      {webinar.overview && (
        <section className="space-y-4">
          <SectionHeader
            icon={<FiStar />}
            title="Overview"
          />

          <div
            className="
              webinar-content
              prose
              prose-gray
              max-w-none
              text-[15px]
              text-gray-800
              font-medium
              leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: webinar.overview }}
          />
        </section>
      )}

      {/* ================= WHY ATTEND ================= */}
      {webinar.why_attend && (
        <section className="space-y-4">
          <SectionHeader
            icon={<FiAward />}
            title="Why You Should Attend"
          />

          <div
            className="
              webinar-content
              prose
              prose-gray
              max-w-none
              text-[15px]
              text-gray-800
              font-medium
              leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: webinar.why_attend }}
          />
        </section>
      )}

      {/* ================= WHO WILL BENEFIT ================= */}
      {webinar.who_benefits && (
        <section className="space-y-4">
          <SectionHeader
            icon={<FiUsers />}
            title="Who Will Benefit"
          />

          <div
            className="
              webinar-content
              prose
              prose-gray
              max-w-none
              text-[15px]
              text-gray-800
              font-medium
              leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: webinar.who_benefits }}
          />
        </section>
      )}

      {/* ================= AREAS COVERED ================= */}
      {webinar.areas_covered && (
        <section className="space-y-4">
          <SectionHeader
            icon={<FiChevronRight />}
            title="Areas Covered in the Session"
          />

          <div
            className="
              webinar-content
              prose
              prose-gray
              max-w-none
              text-[15px]
              text-gray-800
              font-medium
              leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: webinar.areas_covered }}
          />
        </section>
      )}
    </section>
  );
}

/* ================= REUSABLE HEADER ================= */

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="
          p-2.5
          rounded-xl
          bg-gradient-to-br from-sky-100 to-sky-50
          border border-sky-200
          text-sky-600
        "
      >
        {icon}
      </div>

      <h3 className="
        text-xl
        font-bold
        text-gray-900
      ">
        {title}
      </h3>
    </div>
  );
}

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
        mt-2
        rounded-2xl
        border border-sky-200
        bg-white
        p-6 sm:p-8
        space-y-10
      "
    >
      {/* TITLE */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Recording Details
      </h2>

      {/* OVERVIEW */}
      {webinar.overview && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-sky-100">
              <FiStar className="text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Overview
            </h3>
          </div>

          <div
            className="
              webinar-content
              prose
              prose-gray
              max-w-none
              text-gray-700
              leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: webinar.overview }}
          />
        </section>
      )}

      {/* WHY ATTEND */}
      {webinar.why_attend && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-sky-100">
              <FiAward className="text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Why You Should Attend
            </h3>
          </div>

          <div
            className="
              webinar-content
              prose
              prose-gray
              max-w-none
              text-gray-700
              leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: webinar.why_attend }}
          />
        </section>
      )}

      {/* WHO WILL BENEFIT */}
      {webinar.who_benefits && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-sky-100">
              <FiUsers className="text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Who Will Benefit
            </h3>
          </div>

          <div
            className="
              webinar-content
              prose
              prose-gray
              max-w-none
              text-gray-700
              leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: webinar.who_benefits }}
          />
        </section>
      )}

      {/* AREAS COVERED */}
      {webinar.areas_covered && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-sky-100">
              <FiChevronRight className="text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Areas Covered in the Session
            </h3>
          </div>

          <div
            className="
              webinar-content
              prose
              prose-gray
              max-w-none
              text-gray-700
              leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: webinar.areas_covered }}
          />
        </section>
      )}
    </section>
  );
}

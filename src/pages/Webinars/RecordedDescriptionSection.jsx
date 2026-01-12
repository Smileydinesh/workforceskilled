import { FiStar, FiAward, FiUsers, FiChevronRight } from "react-icons/fi";

export default function RecordedDescriptionSection({ webinar }) {
  return (
    <section className="mt-1 rounded-2xl border border-emerald-200/60 bg-gradient-to-b from-emerald-50/60 via-white to-white backdrop-blur-xl p-6 sm:p-8 space-y-8">

      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">
        Recording Details
      </h2>

      {/* OVERVIEW */}
      {webinar.overview && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <FiStar className="text-amber-500" />
            <h3 className="text-xl font-semibold text-emerald-900">
              Overview
            </h3>
          </div>

          <div
            className="webinar-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: webinar.overview }}
          />
        </section>
      )}

      {/* WHY ATTEND */}
      {webinar.why_attend && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <FiAward className="text-emerald-600" />
            <h3 className="text-xl font-semibold text-emerald-900">
              Why You Should Attend
            </h3>
          </div>

          <div
            className="webinar-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: webinar.why_attend }}
          />
        </section>
      )}

      {/* WHO WILL BENEFIT */}
      {webinar.who_benefits && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <FiUsers className="text-emerald-600" />
            <h3 className="text-xl font-semibold text-emerald-900">
              Who Will Benefit
            </h3>
          </div>

          <div
            className="webinar-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: webinar.who_benefits }}
          />
        </section>
      )}

      {/* AREAS COVERED */}
      {webinar.areas_covered && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <FiChevronRight className="text-emerald-600" />
            <h3 className="text-xl font-semibold text-emerald-900">
              Areas Covered in the Session
            </h3>
          </div>

          <div
            className="webinar-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: webinar.areas_covered }}
          />
        </section>
      )}
    </section>
  );
}

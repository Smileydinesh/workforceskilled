import {
  FiCalendar,
  FiClock,
  FiHash,
  FiVideo,
} from "react-icons/fi";
import refundImage from "../../assets/images/moneyback.png";

export default function RecordedHeroSection({ webinar }) {
  return (
    <section className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-8">
      
      {/* ================= TITLE BAR ================= */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6 text-white">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold truncate">
          {webinar.title}
        </h1>

        <span className="hidden sm:inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-sm">
          🎥 Recorded Webinar
        </span>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-blue-100 px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr_220px] gap-6 items-center">

        {/* ================= LEFT : INSTRUCTOR ================= */}
        <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <img
            src={webinar.instructor?.photo}
            alt={webinar.instructor?.name}
            className="w-16 h-16 rounded-full object-cover border border-white shadow"
          />

          <div>
            <p className="text-sm text-blue-600 font-medium">
              Instructor
            </p>
            <p className="text-lg font-bold text-blue-900">
              {webinar.instructor?.name}
            </p>
            <p className="text-xs text-blue-500">
              {webinar.instructor?.designation}
            </p>
          </div>
        </div>

        {/* ================= CENTER : SCHEDULE ================= */}
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            Webinar Schedule
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">

            {/* DATE */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FiCalendar className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-500 font-medium">Date</p>
                <p className="text-sm font-semibold text-blue-900">
                  Recorded Session
                </p>
              </div>
            </div>

            {/* TIME */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FiClock className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-500 font-medium">Time</p>
                <p className="text-sm font-semibold text-blue-900">
                  Watch Anytime (On-Demand)
                </p>
              </div>
            </div>

            {/* DURATION */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FiVideo className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-500 font-medium">Duration</p>
                <p className="text-sm font-semibold text-blue-900">
                  {webinar.duration_minutes} min
                </p>
              </div>
            </div>

            {/* WEBINAR ID */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FiHash className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-500 font-medium">
                  Webinar ID
                </p>
                <p className="text-sm font-mono font-semibold text-blue-900">
                  {webinar.webinar_id}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT : MONEY BACK ================= */}
        <div className="flex flex-col items-center text-center gap-2">
          <img
            src={refundImage}
            alt="100% Money Back Guarantee"
            className="w-28"
          />

          <a
            href="/refund-policy"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Refund Policy
          </a>
        </div>

      </div>
    </section>
  );
}

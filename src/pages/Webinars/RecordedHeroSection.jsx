import {
  FiCalendar,
  FiClock,
  FiHash,
  FiVideo,
} from "react-icons/fi";
import refundImage from "../../assets/images/moneyback.png";

export default function RecordedHeroSection({ webinar }) {
  return (
    <section className="relative w-full bg-gradient-to-r from-sky-400 to-sky-500 px-4 sm:px-6 py-8">

      {/* ================= TITLE BAR ================= */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6 text-white/95">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold truncate">
          {webinar.title}
        </h1>

        <span className="hidden sm:inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold">
          🎥 Recorded Webinar
        </span>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="
        max-w-7xl mx-auto
        bg-white
        rounded-2xl
        shadow-xl
        border border-sky-200
        px-6 py-6
        grid grid-cols-1 lg:grid-cols-[280px_1fr_220px]
        gap-6
        items-center
      ">

        {/* ================= LEFT : INSTRUCTOR ================= */}
        <div className="
          flex items-center gap-4
          bg-sky-50
          rounded-xl
          p-4
          border border-sky-200
        ">
          <img
            src={webinar.instructor?.photo}
            alt={webinar.instructor?.name}
            className="w-16 h-16 rounded-full object-cover border border-white shadow"
          />

          <div>
            <p className="text-sm text-sky-600 font-medium">
              Instructor
            </p>
            <p className="text-lg font-bold text-sky-900">
              {webinar.instructor?.name}
            </p>
            <p className="text-xs text-sky-500">
              {webinar.instructor?.designation}
            </p>
          </div>
        </div>

        {/* ================= CENTER : SCHEDULE ================= */}
        <div>
          <h3 className="text-lg font-semibold text-sky-800 mb-4">
            Webinar Details
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">

            {/* DATE */}
            <InfoItem
              icon={<FiCalendar />}
              label="Date"
              value="Recorded Session"
            />

            {/* TIME */}
            <InfoItem
              icon={<FiClock />}
              label="Time"
              value="Watch Anytime (On-Demand)"
            />

            {/* DURATION */}
            <InfoItem
              icon={<FiVideo />}
              label="Duration"
              value={`${webinar.duration_minutes} min`}
            />

            {/* WEBINAR ID */}
            <InfoItem
              icon={<FiHash />}
              label="Webinar ID"
              value={webinar.webinar_id}
              mono
            />
          </div>
        </div>

        {/* ================= RIGHT : REFUND ================= */}
        <div className="flex flex-col items-center text-center gap-2">
          <img
            src={refundImage}
            alt="100% Money Back Guarantee"
            className="w-28"
          />

          <a
            href="/refund-policy"
            className="text-sm text-sky-600 font-medium hover:underline"
          >
            Refund Policy
          </a>
        </div>

      </div>
    </section>
  );
}

/* ================= INFO ITEM ================= */
function InfoItem({ icon, label, value, mono }) {
  return (
    <div className="flex items-start gap-3">
      <div className="
        w-10 h-10
        rounded-lg
        bg-sky-100
        flex items-center justify-center
        text-sky-600
      ">
        {icon}
      </div>

      <div>
        <p className="text-xs text-sky-500 font-medium">
          {label}
        </p>
        <p
          className={`text-sm font-semibold text-sky-900 ${
            mono ? "font-mono" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

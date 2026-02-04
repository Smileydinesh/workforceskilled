import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiVideo,
  FiHash,
  FiChevronRight,
} from "react-icons/fi";
import refundBadge from "../../assets/images/moneyback.png";

export default function RecordedHeroSection({ webinar }) {
  const instructor = webinar.instructor;
  const [showRefund, setShowRefund] = useState(false);

  return (
    <div className="w-full bg-white">

      {/* ================= TITLE BAR ================= */}
      <div className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-sky-500/10" />
        <div className="max-w-7xl mx-auto px-4 py-4 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            {/* TITLE */}
            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              {webinar.title}
            </h1>

            {/* RECORDED CHIP */}
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-white/20 text-sm font-semibold">
              🎥 Recorded Webinar
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto">

          {/* ========= INSTRUCTOR + DETAILS CARD ========= */}
          <div className="bg-white rounded-xl shadow-lg border border-sky-100 overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="flex flex-col lg:flex-row gap-6 items-start">

                {/* ---------- INSTRUCTOR ---------- */}
                <div className="lg:w-1/4 flex flex-col items-center text-center p-4 bg-sky-50 rounded-lg border border-sky-100 mt-3">
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={instructor?.photo}
                        alt={instructor?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-base font-bold text-sky-800">
                    {instructor?.name}
                  </p>
                  <p className="text-xs text-sky-600 mt-1">
                    {instructor?.designation}
                  </p>
                </div>

                {/* ---------- DETAILS ---------- */}
                <div className="lg:w-2/4">
                  <h3 className="text-lg font-bold text-sky-800 mb-2 flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg text-white">
                      <FiCalendar />
                    </div>
                    Webinar Schedule
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Detail
                      icon={<FiCalendar />}
                      label="Date"
                      value="Recorded Session"
                    />
                    <Detail
                      icon={<FiVideo />}
                      label="Access"
                      value="Watch Anytime (On-Demand)"
                    />
                    <Detail
                      icon={<FiClock />}
                      label="Duration"
                      value={`${webinar.duration_minutes} min`}
                    />
                    <Detail
                      icon={<FiHash />}
                      label="Webinar ID"
                      value={
                        <span className="font-mono font-bold">
                          {webinar.webinar_id}
                        </span>
                      }
                    />
                  </div>
                </div>

                {/* ---------- REFUND ---------- */}
                <div className="lg:w-1/4 flex flex-col items-center justify-center p-4 relative">
                  <img
                    src={refundBadge}
                    alt="Money Back Guarantee"
                    className="w-32 h-32 object-contain"
                  />

                  {/* Refund tooltip trigger */}
                  <div
                    className="relative mt-3 flex items-center gap-2 text-emerald-700 font-semibold cursor-pointer"
                    onMouseEnter={() => setShowRefund(true)}
                    onMouseLeave={() => setShowRefund(false)}
                  >
                    <FiChevronRight />
                    Refund Policy

                    {showRefund && (
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2
                        bg-white rounded-xl shadow-xl p-4 text-sm w-72 border border-emerald-200 z-30">
                        <p className="font-bold text-emerald-800 mb-2">
                          Refund Policy
                        </p>
                        <p className="text-emerald-700">
                          ❌ No refunds after <b>5 working days</b>
                        </p>
                        <p className="text-emerald-700 mt-1">
                          ✅ Subscription cancellation anytime
                        </p>
                        <a
                          href="/refund-policy"
                          className="inline-block mt-2 text-emerald-600 font-semibold underline"
                        >
                          View Full Policy
                        </a>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= DETAIL ITEM ================= */
function Detail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-sky-100">
      <div className="p-2.5 rounded-lg bg-sky-100 text-sky-600">
        {icon}
      </div>
      <div>
        <p className="text-xs text-sky-600 font-medium">{label}</p>
        <div className="font-semibold text-sky-800 text-sm">
          {value}
        </div>
      </div>
    </div>
  );
}

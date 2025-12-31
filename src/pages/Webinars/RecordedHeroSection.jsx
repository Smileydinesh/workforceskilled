import {
  FiClock,
  FiHash,
  FiVideo,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";

import refundImage from "../../assets/images/moneyback.png";

export default function RecordedHeroSection({ webinar }) {
  return (
    <section className="relative w-full px-4 sm:px-6 pt-10 pb-10 bg-gradient-to-r from-emerald-700 to-teal-600">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">

        {/* ================= LEFT ================= */}
        <div>
          {/* Status Badge */}
          <span
            className="
              inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              text-xs sm:text-sm font-medium border mb-3
              bg-yellow-100 text-yellow-800 border-yellow-300
            "
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            RECORDED · AVAILABLE NOW
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-bold max-w-4xl leading-tight text-white">
            {webinar.title}
          </h1>

          {/* ================= RECORDING DETAILS ================= */}
          <div className="mt-6 bg-white/90 backdrop-blur-xl border border-emerald-200 rounded-2xl p-5 shadow-sm bg-emerald-50/60">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Recording Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">

              {/* WEBINAR ID */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                  <FiHash className="text-emerald-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Webinar ID</p>
                  <p className="text-sm text-gray-900 font-mono font-semibold">
                    {webinar.webinar_id}
                  </p>
                </div>
              </div>

              {/* DURATION */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                  <FiClock className="text-emerald-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Total Duration
                  </p>
                  <p className="text-sm text-gray-900 font-semibold">
                    {webinar.duration_minutes} Minutes of premium content
                  </p>
                </div>
              </div>

              {/* ACCESS STATUS */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                  <FiCheckCircle className="text-emerald-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Access Status
                  </p>
                  <p className="text-sm text-gray-900 font-semibold">
                    Purchase required for access
                  </p>
                </div>
              </div>

              {/* FORMAT */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                  <FiVideo className="text-emerald-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Format</p>
                  <p className="text-sm text-gray-900 font-semibold">
                    High-quality streaming · RECORDED
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative lg:mt-[88px] flex flex-col items-center group">

          {/* ---------- TOOLTIP ---------- */}
          <div
            className="
              absolute -top-3 left-1/2 -translate-x-1/2
              w-[300px]
              opacity-0 translate-y-2
              group-hover:opacity-100 group-hover:-translate-y-2
              transition-all duration-300 ease-out
              pointer-events-none
              z-20
            "
          >
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xl">
              <p className="text-xs font-semibold text-gray-600 mb-3 text-center">
                Refund Policy
              </p>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Full refund within 5 working days</span>
                </div>

                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-amber-500 shrink-0" />
                  <span>No refunds after 5 working day period</span>
                </div>

                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 shrink-0" />
                  <span>Subscription cancellation available anytime</span>
                </div>

                <a
                  href="/refund-policy"
                  className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium mt-2"
                >
                  View Full Refund Policy
                  <FiChevronRight />
                </a>
              </div>
            </div>
          </div>

          {/* ---------- GUARANTEE IMAGE ---------- */}
          <img
            src={refundImage}
            alt="100% Money Back Guarantee"
            className="max-w-[150px] sm:max-w-[170px] lg:max-w-[190px]"
          />

          {/* ---------- TRIGGER TEXT ---------- */}
          <p className="mt-3 text-xs sm:text-sm text-white cursor-pointer">
            Refund / Cancellation Policy
          </p>
        </div>

      </div>
    </section>
  );
}

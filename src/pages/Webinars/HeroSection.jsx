import {
  FiCalendar,
  FiClock,
  FiHash,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";
import refundImage from "../../assets/images/moneyback.png";
import { useState } from "react";

export default function HeroSection({ webinar }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <section className="w-full bg-white px-4 sm:px-6 py-10 border-b">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8 items-start">

        {/* LEFT */}
        <div className="space-y-6">

          {/* Status */}
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border">
            {webinar.status}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 max-w-4xl">
            {webinar.title}
          </h1>

          {/* Schedule */}
          <div className="border rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Webinar Schedule
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">

              <div className="flex gap-3">
                <FiCalendar className="text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-xs">Date</p>
                  <p className="font-medium">{webinar.date_display}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <FiClock className="text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-xs">Time</p>
                  <p className="font-medium">
                    PST: {webinar.pst} | EST: {webinar.est}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <FiClock className="text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-xs">Duration</p>
                  <p className="font-medium">
                    {webinar.duration_minutes} minutes
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <FiHash className="text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-xs">Webinar ID</p>
                  <p className="font-mono font-medium">
                    {webinar.webinar_id}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT – Refund */}
        <div className="border rounded-lg p-5 bg-gray-50 text-center relative">

          <img
            src={refundImage}
            alt="Money back"
            className="max-w-[140px] mx-auto mb-4"
          />

          <div
            className="cursor-pointer"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          >
            <p className="text-sm font-semibold text-gray-800">
              Refund / Cancellation Policy
            </p>
            <div className="flex justify-center items-center gap-1 text-sm text-blue-600">
              <span>Learn More</span>
              <FiChevronRight />
            </div>
          </div>

          {isTooltipVisible && (
            <div className="absolute right-full top-0 mr-4 w-64 bg-white border rounded-lg shadow-lg p-4 text-left z-50">
              <p className="font-semibold text-gray-800 mb-3">
                Refund Policy
              </p>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-2">
                  <FiCheckCircle className="text-green-500 mt-1" />
                  <span>Full refund within 5 working days</span>
                </div>

                <div className="flex gap-2">
                  <FiCheckCircle className="text-yellow-500 mt-1" />
                  <span>No refunds after 5 working days</span>
                </div>

                <div className="flex gap-2">
                  <FiCheckCircle className="text-green-500 mt-1" />
                  <span>Subscription cancellation anytime</span>
                </div>
              </div>

              <a
                href="/refund-policy"
                className="inline-block mt-3 text-blue-600 text-sm font-medium"
              >
                View Full Refund Policy →
              </a>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

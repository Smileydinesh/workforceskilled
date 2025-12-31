import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiClock,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

/* ================= HOME LIVE WEBINARS ================= */

export default function HomeLiveWebinarsSection() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/live-webinars/?page=1`)
      .then((res) => res.json())
      .then((data) => {
        setWebinars((data.results || []).slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#FAFAF9] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-[#0F3D2E]">
            Upcoming Live Webinars
          </h2>
          <p className="mt-4 text-gray-600">
            Learn directly from industry professionals
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center">
            <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {webinars.map((w) => (
              <WebinarCard
                key={w.webinar_id}
                w={w}
                onClick={() =>
                  navigate(`/live-webinars/${w.webinar_id}`)
                }
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/live-webinars")}
            className="px-8 py-4 rounded-xl bg-emerald-600 text-white font-semibold
                       hover:bg-emerald-700 transition"
          >
            View All Live Webinars
          </button>
        </div>

      </div>
    </section>
  );
}

/* ================= CARD ================= */

function WebinarCard({ w, onClick }) {
  const date = new Date(w.start_datetime);
  const status = getWebinarStatus(w.start_datetime, w.duration_minutes);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow hover:shadow-2xl
                 transition cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* IMAGE */}
      <div className="relative h-48">
        <img
          src={w.cover_image}
          alt={w.title}
          className="w-full h-full object-cover"
        />

        {/* STATUS BADGE */}
        <span
          className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold
            ${
              status.type === "live"
                ? "bg-red-600 text-white animate-pulse"
                : status.type === "hours"
                ? "bg-orange-500 text-white"
                : status.type === "days"
                ? "bg-emerald-600 text-white"
                : "bg-gray-400 text-white"
            }
          `}
        >
          {status.label}
        </span>

        {/* DATE BADGE */}
        <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 text-center shadow">
          <p className="text-sm font-bold text-emerald-600">
            {date.getDate()}
          </p>
          <p className="text-xs uppercase tracking-wide text-gray-600">
            {date.toLocaleString("default", { month: "short" })}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-4 line-clamp-2">
          {w.title}
        </h3>

        {/* INSTRUCTOR */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={w.instructor.photo}
            alt={w.instructor.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {w.instructor.name}
            </p>
            <p className="text-xs text-gray-500">
              {w.instructor.designation}
              {w.instructor.organization &&
                ` • ${w.instructor.organization}`}
            </p>
          </div>
        </div>

        {/* META */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-5">
          <span className="flex items-center gap-1">
            <FiClock /> {w.duration_minutes} min
          </span>
          <span className="flex items-center gap-1">
            <FiCalendar /> {w.time_display}
          </span>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center">
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <FiDollarSign /> {w.display_price}
          </span>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-xl
                       bg-gradient-to-r from-emerald-600 to-teal-600
                       text-white font-semibold shadow hover:shadow-lg"
          >
            Join Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= STATUS HELPER ================= */

function getWebinarStatus(startDatetime, durationMinutes = 90) {
  const start = new Date(startDatetime);
  const now = new Date();
  const end = new Date(start.getTime() + durationMinutes * 60000);

  if (now >= start && now <= end) {
    return { label: "LIVE NOW", type: "live" };
  }

  if (now > end) {
    return { label: "ENDED", type: "ended" };
  }

  const diffSeconds = Math.floor((start - now) / 1000);
  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);

  if (days === 0) {
    return { label: `${hours}h ${minutes}m left`, type: "hours" };
  }

  return { label: `${days} days left`, type: "days" };
}

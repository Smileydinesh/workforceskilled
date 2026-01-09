import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiClock,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import { formatPstEst } from "../../utils/timezone";

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
    <section className="bg-gradient-to-br from-emerald-50/50 to-slate-50 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-transparent to-teal-500/3" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Balanced Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 font-semibold text-sm border border-emerald-200 shadow-md mb-6">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live Webinars
          </div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 to-emerald-900 bg-clip-text text-transparent mb-4 leading-tight">
            Upcoming Sessions
          </h2>
          <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            Learn directly from industry professionals
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full shadow-lg" />
              <div className="absolute inset-1 w-10 h-10 border-3 border-transparent border-t-emerald-500 rounded-full bg-white/60" />
            </motion.div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {webinars.map((w, index) => (
              <WebinarCard
                key={w.webinar_id}
                w={w}
                index={index}
                onClick={() => navigate(`/live-webinars/${w.webinar_id}`)}
              />
            ))}
          </div>
        )}

        {/* Balanced CTA */}
        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/live-webinars")}
            className="group relative px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold text-lg shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-400 overflow-hidden border border-emerald-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">View All Webinars</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function WebinarCard({ w, onClick, index }) {
  const status = getWebinarStatus(w.start_datetime, w.duration_minutes);

  // PST / EST formatting
  const { date, day, month, pst, est } = formatPstEst(w.start_datetime);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-[24px]
                 shadow-xl hover:shadow-emerald-400/20
                 border border-slate-100 hover:border-emerald-200
                 overflow-hidden cursor-pointer transition-all duration-500"
      onClick={onClick}
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={w.cover_image}
          alt={w.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* DARK GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* STATUS BADGE */}
        <span
          className={`absolute top-5 left-5 z-20 text-xs px-4 py-2 rounded-full font-bold shadow-xl
            ${
              status.type === "live"
                ? "bg-red-600 text-white animate-pulse"
                : status.type === "hours"
                ? "bg-orange-500 text-white"
                : status.type === "days"
                ? "bg-emerald-600 text-white"
                : "bg-gray-500 text-white"
            }`}
        >
          {status.label}
        </span>

        {/* DATE ARROW BADGE */}
        <div className="absolute top-5 right-0 z-20">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl"
            style={{
              clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)",
              paddingRight: "22px",
            }}
          >
            <div className="px-5 py-3 text-center">
              <div className="text-2xl font-black leading-none">{day}</div>
              <div className="text-xs uppercase tracking-wider">{month}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        {/* TITLE */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-emerald-700 transition">
          {w.title}
        </h3>

        {/* INSTRUCTOR */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border">
          <img
            src={w.instructor.photo}
            alt={w.instructor.name}
            className="w-12 h-12 rounded-full object-cover shadow"
          />
          <div className="min-w-0">
            <p className="text-sm font-bold truncate">{w.instructor.name}</p>
            <p className="text-xs text-gray-600 truncate">
              {w.instructor.designation}
              {w.instructor.organization &&
                ` • ${w.instructor.organization}`}
            </p>
          </div>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FiCalendar className="text-emerald-600" />
          {date}
        </div>

        {/* PST / EST TIME */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl p-3 shadow">
            <p className="text-xs opacity-90">PST</p>
            <p className="font-bold text-sm">{pst.replace(" PST", "")}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-3 shadow">
            <p className="text-xs opacity-90">EST</p>
            <p className="font-bold text-sm">{est.replace(" EST", "")}</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-black text-emerald-600 flex items-center gap-1">
            <FiDollarSign />
            {w.display_price}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 transition"
          >
            Join Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}


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

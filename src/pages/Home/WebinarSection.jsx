import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiClock,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

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
  const date = new Date(w.start_datetime);
  const status = getWebinarStatus(w.start_datetime, w.duration_minutes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        transition: { type: "spring", stiffness: 350, damping: 25 }
      }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:shadow-emerald-400/20 border border-slate-100/50 hover:border-emerald-200/70 overflow-hidden cursor-pointer h-full transition-all duration-500"
      onClick={onClick}
    >
      {/* Perfect Image Size */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <motion.img
          src={w.cover_image}
          alt={w.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          whileHover={{ scale: 1.1 }}
        />

        {/* Status Badge */}
        <motion.span
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border ${
            status.type === "live"
              ? "bg-gradient-to-r from-red-500/95 to-red-600/95 text-white border-red-400/50 shadow-red-500/40 animate-pulse"
              : status.type === "hours"
              ? "bg-gradient-to-r from-orange-500/95 to-orange-600/95 text-white border-orange-400/50 shadow-orange-500/40"
              : status.type === "days"
              ? "bg-gradient-to-r from-emerald-500/95 to-teal-500/95 text-white border-emerald-400/50 shadow-emerald-500/40"
              : "bg-slate-500/90 text-white border-slate-400/50 shadow-slate-500/30"
          }`}
        >
          {status.label}
        </motion.span>

        {/* Date Badge */}
        <motion.div 
          initial={{ scale: 0.9, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2.5 text-center shadow-lg border border-slate-200/60 hover:shadow-md hover:scale-105 transition-all duration-400"
        >
          <p className="text-xl font-black text-emerald-600 group-hover:text-emerald-700">{date.getDate()}</p>
          <p className="text-xs uppercase tracking-widest text-slate-600 font-medium">
            {date.toLocaleString("default", { month: "short" })}
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          className="font-bold text-xl mb-4 leading-tight line-clamp-2 text-slate-900 group-hover:text-slate-800 transition-all duration-400"
        >
          {w.title}
        </motion.h3>

        {/* Instructor */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-5 p-3 bg-gradient-to-r from-emerald-50/70 to-teal-50/70 rounded-xl border border-emerald-200/40 hover:shadow-sm transition-all duration-400"
        >
          <div className="relative">
            <img
              src={w.instructor.photo}
              alt={w.instructor.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md group-hover:scale-105 transition-transform duration-400"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-emerald-800">
              {w.instructor.name}
            </p>
            <p className="text-xs text-slate-600 truncate">
              {w.instructor.designation}
              {w.instructor.organization && ` • ${w.instructor.organization}`}
            </p>
          </div>
        </motion.div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-6 bg-slate-50/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/40">
          <span className="flex items-center gap-1.5 font-medium">
            <FiClock className="text-emerald-500 text-base" />
            {w.duration_minutes} min
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <FiCalendar className="text-emerald-500 text-base" />
            {w.time_display}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            <FiDollarSign className="inline -ml-1 mr-1 text-emerald-500" />
            {w.display_price}
          </motion.span>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-lg hover:shadow-emerald-400/40 hover:-translate-y-0.5 transition-all duration-400 border border-emerald-400/50"
          >
            Join Now
          </motion.button>
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

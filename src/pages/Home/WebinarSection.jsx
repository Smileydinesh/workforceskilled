import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiClock } from "react-icons/fi";
import { formatPstEst } from "../../utils/timezone";

/* ================= STATUS ================= */
function getWebinarStatus(startDatetime, durationMinutes = 90) {
  const start = new Date(startDatetime);
  const now = new Date();
  const end = new Date(start.getTime() + durationMinutes * 60000);

  if (now >= start && now <= end) return { label: "LIVE NOW", type: "live" };
  if (now > end) return { label: "ENDED", type: "ended" };

  const diffSeconds = Math.floor((start - now) / 1000);
  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);

  if (days === 0) return { label: `${hours}h ${minutes}m`, type: "hours" };
  return { label: `${days} days left`, type: "days" };
}

/* ================= HOME SECTION ================= */
export default function HomeLiveWebinarsSection() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 Fetch MORE webinars than needed
    fetch(`${API_BASE}/api/live-webinars/?page=1&page_size=10`)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || [];

        // ✅ Remove test webinars
        const nonTest = results.filter((w) => !w.is_test);

        // ✅ Show ALL non-test webinars
        setWebinars(nonTest);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 py-16 relative overflow-hidden">
      <div className="w-full px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-100 text-blue-800 font-semibold text-sm mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Live Webinars
          </div>
          <h2 className="text-4xl font-black text-blue-900 mb-4">
            Upcoming Sessions
          </h2>
          <p className="text-lg text-slate-600">
            Learn directly from industry professionals
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full"
            />
          </div>
        ) : (
          <>
            {/* WEBINARS */}
            {/* ================= WEBINAR LIST ================= */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
  {webinars.map((w, index) => (
    <motion.div
      key={w.webinar_id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <WebinarRow
        w={w}
        onClick={() => navigate(`/live-webinars/${w.webinar_id}`)}
      />
    </motion.div>
  ))}
</div>


            {/* VIEW ALL */}
            <div className="text-center">
              <button
                onClick={() => navigate("/live-webinars")}
                className="px-10 py-4 rounded-xl bg-blue-700 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
              >
                View All Webinars
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ================= ROW ================= */
function WebinarRow({ w, onClick }) {
  const { day, month, pst, est } = formatPstEst(w.start_datetime);
  const status = getWebinarStatus(w.start_datetime, w.duration_minutes);

  return (
    <div
      onClick={onClick}
      className="bg-white border border-blue-100 rounded-xl p-6 grid grid-cols-[120px_1fr] gap-6 cursor-pointer hover:shadow-lg transition"
    >
      {/* DATE */}
      <div className="text-center border-r border-blue-100 pr-4">
        <div className="text-4xl font-bold text-blue-700">{day}</div>
        <div className="text-sm text-blue-600">{month}</div>
        <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
          {status.label}
        </span>
      </div>

      {/* DETAILS */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-blue-800 line-clamp-1">
  {w.title}
</h3>

        <div className="flex items-center gap-3">
          <img
            src={w.instructor.photo}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{w.instructor.name}</p>
            <p className="text-xs text-blue-500">{w.instructor.designation}</p>
          </div>

          <span
  className="
    ml-auto
    bg-blue-700
    text-white
    px-4
    py-1.5
    rounded-md
    font-bold
    text-sm
    shadow-sm
  "
>
  ${w.display_price}
</span>


        </div>

        {/* TIME + CTA */}
<div className="flex items-center justify-between pt-2">
  <div className="flex gap-4 text-sm text-blue-700">
    <span className="flex items-center gap-1">
      <FiClock /> {pst} | {est}
    </span>
    <span className="flex items-center gap-1">
      <FiCalendar /> {w.duration_minutes} min
    </span>
  </div>

  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="
      bg-gradient-to-r from-blue-600 to-blue-700
      hover:from-blue-700 hover:to-blue-800
      text-white
      px-4 py-2
      rounded-lg
      text-sm
      font-semibold
      shadow-sm
      hover:shadow-md
      transition
    "
  >
    Enroll Now
  </button>
</div>

      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  FiClock,
  FiCalendar,
  FiVideo,
  FiPlayCircle,
} from "react-icons/fi";

export default function SearchResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get("q");

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [live, setLive] = useState([]);
  const [recorded, setRecorded] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FILTER STATE
  const [filter, setFilter] = useState("ALL"); // ALL | LIVE | RECORDED

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(`${API_BASE}/api/search/?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setLive(data.live_webinars || []);
        setRecorded(data.recorded_webinars || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg font-semibold text-blue-600">
        Searching…
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        Search results for{" "}
        <span className="text-blue-600">“{query}”</span>
      </h1>

      {/* ================= FILTER CHIPS ================= */}
      <div className="flex gap-3 mb-10 flex-wrap">
        <Chip
          active={filter === "ALL"}
          onClick={() => setFilter("ALL")}
        >
          All ({live.length + recorded.length})
        </Chip>

        <Chip
          active={filter === "LIVE"}
          onClick={() => setFilter("LIVE")}
        >
          Live Webinars ({live.length})
        </Chip>

        <Chip
          active={filter === "RECORDED"}
          onClick={() => setFilter("RECORDED")}
        >
          Recorded Webinars ({recorded.length})
        </Chip>
      </div>

      {/* ================= LIVE WEBINARS ================= */}
      {(filter === "ALL" || filter === "LIVE") && (
        <>
          <SectionHeader
            icon={<FiVideo />}
            title="Live Webinars"
            count={live.length}
          />

          {live.length === 0 ? (
            <Empty text="No live webinars found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {live.map((w) => (
                <LiveCard
                  key={w.webinar_id}
                  w={w}
                  onEnroll={() =>
                    navigate(`/live-webinars/${w.webinar_id}`)
                  }
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ================= RECORDED WEBINARS ================= */}
      {(filter === "ALL" || filter === "RECORDED") && (
        <>
          <SectionHeader
            icon={<FiPlayCircle />}
            title="Recorded Webinars"
            count={recorded.length}
          />

          {recorded.length === 0 ? (
            <Empty text="No recorded webinars found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recorded.map((w) => (
                <RecordedCard
                  key={w.webinar_id}
                  w={w}
                  onWatch={() =>
                    navigate(`/recorded-webinars/${w.webinar_id}`)
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function formatPstEst(datetime) {
  const date = new Date(datetime);

  const pst = date.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
  });

  const est = date.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${pst} PST | ${est} EST`;
}


/* ================= FILTER CHIP ================= */
function Chip({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-semibold border
        transition
        ${
          active
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
        }
      `}
    >
      {children}
    </button>
  );
}

/* ================= SECTION HEADER ================= */
function SectionHeader({ title, count, icon }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="text-blue-600 text-xl">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-900">
        {title}{" "}
        <span className="text-blue-600 text-lg font-semibold">
          ({count})
        </span>
      </h2>
    </div>
  );
}

/* ================= EMPTY ================= */
function Empty({ text }) {
  return (
    <div className="mb-14 p-6 rounded-xl border border-dashed border-blue-200 text-gray-600 bg-blue-50">
      {text}
    </div>
  );
}

/* ================= LIVE CARD ================= */
function LiveCard({ w, onEnroll }) {
  return (
    <div
      onClick={onEnroll}
      className="
        bg-white
        border border-blue-100
        rounded-xl
        px-5 py-4
        hover:shadow-lg
        transition
        cursor-pointer
        group
      "
    >
      {/* ===== TOP ROW ===== */}
      <div className="flex items-center justify-between mb-3">
        {/* DATE BLOCK */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center w-12">
            <span className="text-2xl font-black text-blue-700">
              {new Date(w.start_datetime).getDate()}
            </span>
            <span className="text-xs font-semibold text-blue-600 uppercase">
              {new Date(w.start_datetime).toLocaleString("en-US", {
                month: "short",
              })}
            </span>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            {w.status === "LIVE" ? "LIVE NOW" : "Upcoming"}
          </span>
        </div>

        {/* PRICE */}
        <span className="px-3 py-1 rounded-md bg-blue-600 text-white font-bold text-sm">
          ${w.display_price}
        </span>
      </div>

      {/* ===== TITLE ===== */}
      <h3 className="text-[17px] font-bold text-slate-900 leading-snug line-clamp-2 mb-4">
        {w.title}
      </h3>

      {/* ===== INSTRUCTOR ===== */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={w.instructor.photo}
          alt={w.instructor.name}
          className="w-9 h-9 rounded-full object-cover border"
        />

        <div className="leading-tight">
          <p className="text-sm font-semibold text-slate-900">
            {w.instructor.name}
          </p>
          <p className="text-[12px] text-slate-500 truncate max-w-[220px]">
            {w.instructor.designation}
          </p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-4 text-sm text-blue-700">
          <span className="flex items-center gap-1">
            <FiClock />
            {w.duration_minutes} min
          </span>

          <span className="flex items-center gap-1">
  <FiClock />
  {formatPstEst(w.start_datetime)}
</span>

        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEnroll();
          }}
          className="
            bg-blue-600 hover:bg-blue-700
            text-white
            px-4 py-2
            rounded-lg
            text-sm
            font-semibold
            transition
          "
        >
          Enroll →
        </button>
      </div>
    </div>
  );
}


/* ================= RECORDED CARD ================= */
function RecordedCard({ w, onWatch }) {
  return (
    <div
      onClick={onWatch}
      className="
        bg-white
        border border-blue-100
        rounded-xl
        px-5 py-4
        hover:shadow-lg
        transition
        cursor-pointer
        group
      "
    >
      {/* ===== TOP BADGES ===== */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
            ON DEMAND
          </span>

          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 flex items-center gap-1">
            <FiClock className="text-xs" />
            {w.duration_minutes} min
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700">
          24/7 Available
        </span>
      </div>

      {/* ===== TITLE ===== */}
      <h3 className="text-[17px] font-bold text-slate-900 leading-snug line-clamp-2 mb-4">
        {w.title}
      </h3>

      {/* ===== INSTRUCTOR ===== */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={w.instructor.photo}
          alt={w.instructor.name}
          className="w-9 h-9 rounded-full object-cover border"
        />

        <div className="leading-tight">
          <p className="text-sm font-semibold text-slate-900">
            {w.instructor.name}
          </p>
          <p className="text-[12px] text-slate-500 truncate max-w-[220px]">
            {w.instructor.designation}
          </p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="flex items-center justify-between pt-3 border-t">
        <span className="text-xl font-black text-blue-700">
          ₹{w.display_price}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onWatch();
          }}
          className="
            flex items-center gap-1.5
            bg-blue-600 hover:bg-blue-700
            text-white
            px-4 py-2
            rounded-lg
            text-sm
            font-semibold
            transition
          "
        >
          <FiPlayCircle />
          Watch →
        </button>
      </div>
    </div>
  );
}



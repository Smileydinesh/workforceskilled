import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiGrid,
  FiList,
  FiFilter,
  FiClock,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* ================= PAGE ================= */
export default function LiveWebinars() {
  const navigate = useNavigate();

  /* ---------- DATA ---------- */
  const [webinars, setWebinars] = useState([]);
  const [filters, setFilters] = useState({
    months: [],
    instructors: [],
    categories: [],
  });

  /* ---------- UI ---------- */
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [view, setView] = useState("grid");

  /* ---------- PAGINATION ---------- */
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 12;

  const [openMonth, setOpenMonth] = useState(false);
  const [openInstructor, setOpenInstructor] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  /* ---------- FILTER STATE ---------- */
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  /* ---------- FORCE TIME UPDATE ---------- */
  const [, forceUpdate] = useState(0);

  /* ================= FILTER METADATA ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/live-webinars/filters/")
      .then((res) => res.json())
      .then(setFilters);
  }, []);

  /* ================= RESET PAGE ON FILTER CHANGE ================= */
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedMonths, selectedInstructors, selectedCategories]);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/live-webinars/?page=1")
      .then((res) => res.json())
      .then((data) => {
        setWebinars(data.results || []);
        setTotalCount(data.count || 0);
        setInitialLoading(false);
      });
  }, []);

  /* ================= DEBOUNCE SEARCH ================= */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  /* ================= TIME TICKER ================= */
  useEffect(() => {
    const i = setInterval(() => forceUpdate((n) => n + 1), 1000);
    return () => clearInterval(i);
  }, []);

  /* ================= FETCH ON FILTER / SEARCH / PAGE ================= */
  useEffect(() => {
    if (initialLoading) return;

    setIsFetching(true);

    const params = new URLSearchParams();
    params.append("page", page);

    if (debouncedSearch) params.append("search", debouncedSearch);
    selectedMonths.forEach((m) => params.append("month", m));
    selectedInstructors.forEach((i) => params.append("instructor", i));
    selectedCategories.forEach((c) => params.append("category", c));

    fetch(`http://127.0.0.1:8000/api/live-webinars/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setWebinars(data.results || []);
        setTotalCount(data.count || 0);
      })
      .finally(() => setIsFetching(false));
  }, [
    debouncedSearch,
    selectedMonths,
    selectedInstructors,
    selectedCategories,
    page,
    initialLoading,
  ]);

  const toggleValue = (value, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedMonths([]);
    setSelectedInstructors([]);
    setSelectedCategories([]);
  };

  /* ================= INITIAL SPINNER ================= */
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FBF9]">
      {/* ================= HEADER ================= */}
      <header className="bg-gradient-to-r from-emerald-700 to-teal-600 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Live Webinars</h1>
          <p className="text-emerald-100">
            Learn directly from industry professionals
          </p>

          <div className="mt-6 max-w-xl relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, instructor, skill…"
              className="w-full pl-12 pr-4 py-4 rounded-xl shadow focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
        {/* ================= SIDEBAR ================= */}
        <aside>
          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <FiFilter className="text-emerald-600" />
              <h3 className="font-semibold">Filters</h3>
            </div>

            <FilterBlock
              title="Month"
              open={openMonth}
              toggle={() => setOpenMonth(!openMonth)}
              items={filters.months}
              selected={selectedMonths}
              onToggle={(v) => toggleValue(v, setSelectedMonths)}
            />

            <FilterBlock
              title="Instructor"
              open={openInstructor}
              toggle={() => setOpenInstructor(!openInstructor)}
              items={filters.instructors}
              selected={selectedInstructors}
              onToggle={(v) => toggleValue(v, setSelectedInstructors)}
            />

            <FilterBlock
              title="Category"
              open={openCategory}
              toggle={() => setOpenCategory(!openCategory)}
              items={filters.categories}
              selected={selectedCategories}
              onToggle={(v) => toggleValue(v, setSelectedCategories)}
            />

            <button
              onClick={clearFilters}
              className="mt-6 w-full py-2 rounded-lg bg-emerald-100 text-emerald-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* ================= RESULTS ================= */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <p className="font-medium">{totalCount} live sessions found</p>

            <div className="flex bg-white rounded-lg shadow">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" && "text-emerald-600"}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" && "text-emerald-600"}`}
              >
                <FiList />
              </button>
            </div>
          </div>

          {isFetching && (
            <p className="text-sm text-gray-500 mb-4">Updating results…</p>
          )}

          {view === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          ) : (
            <div className="space-y-6">
              {webinars.map((w) => (
                <WebinarListRow
                  key={w.webinar_id}
                  w={w}
                  onClick={() =>
                    navigate(`/live-webinars/${w.webinar_id}`)
                  }
                />
              ))}
            </div>
          )}

          {/* ================= PAGINATION ================= */}
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={totalCount}
            onPageChange={setPage}
          />
        </section>
      </main>
    </div>
  );
}

/* ================= FILTER BLOCK ================= */
function FilterBlock({ title, open, toggle, items, selected, onToggle }) {
  return (
    <div className="mb-5">
      <button
        onClick={toggle}
        className="flex justify-between w-full font-medium text-sm mb-2"
      >
        {title}
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2"
          >
            {items.map((item) => (
              <label
                key={item.value}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(item.value)}
                    onChange={() => onToggle(item.value)}
                    className="accent-emerald-600"
                  />
                  {item.label}
                </div>
                <span className="text-xs text-gray-400">{item.count}</span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= HELPERS ================= */
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
  const seconds = diffSeconds % 60;

  if (days === 0) {
    return { label: `${hours}h ${minutes}m ${seconds}s left`, type: "hours" };
  }

  return { label: `${days} days left`, type: "days" };
}

/* ================= PAGINATION UI ================= */
function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-12">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-4 py-2 rounded-lg ${
              p === page
                ? "bg-emerald-600 text-white"
                : "bg-white border"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

/* ================= CARD ================= */
function WebinarCard({ w, onClick }) {
  const status = getWebinarStatus(w.start_datetime, w.duration_minutes);
  const date = new Date(w.start_datetime);

  return (
    <motion.div whileHover={{ y: -8 }} className="bg-white rounded-2xl shadow">
      <div className="relative h-48">
        <img src={w.cover_image} alt={w.title} className="w-full h-full object-cover" />
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
        <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 text-center shadow">
          <p className="text-sm font-bold text-emerald-600">
            {date.getDate()}
          </p>
          <p className="text-xs uppercase tracking-wide text-gray-600">
            {date.toLocaleString("default", { month: "short" })}
          </p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-3">{w.title}</h3>


      {/* ✅ INSTRUCTOR (RESTORED) */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={w.instructor.photo}
            alt={w.instructor.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm text-gray-900">
              {w.instructor.name}
            </p>
            <p className="text-xs text-gray-500">
              {w.instructor.designation}
              {w.instructor.organization &&
                ` • ${w.instructor.organization}`}
            </p>
          </div>
        </div>


        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <FiClock /> {w.duration_minutes} min
          </span>
          <span className="flex items-center gap-1">
            <FiCalendar /> {w.time_display}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <FiDollarSign /> {w.display_price}
          </span>
          <button
            onClick={onClick}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Join Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function WebinarListRow({ w, onClick }) {
  return <WebinarCard w={w} onClick={onClick} />;
}

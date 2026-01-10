import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiUser,
  FiGrid,
  FiList,
  FiFilter,
  FiDollarSign,
  FiPlayCircle,
  FiPlay,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";



/* ================= PAGE ================= */
export default function RecordedWebinars() {
  /* ---------- VIEW ---------- */
  const [view, setView] = useState("grid");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  /* ---------- DATA ---------- */
  const [webinars, setWebinars] = useState([]);
  const [filters, setFilters] = useState({
    months: [],
    instructors: [],
    categories: [],
  });

  /* ---------- LOADING ---------- */
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  /* ---------- FILTER STATE ---------- */
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  /* ---------- UI ---------- */
  const [openMonth, setOpenMonth] = useState(false);
  const [openInstructor, setOpenInstructor] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  /* ================= FILTER METADATA ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/recorded-webinars/filters/`)
      .then((res) => res.json())
      .then(setFilters)
      .finally(() => setInitialLoading(false));
  }, []);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/recorded-webinars/`)
      .then((res) => res.json())
      .then(setWebinars)
      .finally(() => setInitialLoading(false));
  }, []);

  /* ================= DEBOUNCE SEARCH ================= */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  /* ================= FETCH ON FILTER ================= */
  useEffect(() => {
    if (initialLoading) return;

    setIsFetching(true);

    const params = new URLSearchParams();
    if (debouncedSearch) params.append("search", debouncedSearch);
    selectedMonths.forEach((m) => params.append("month", m));
    selectedInstructors.forEach((i) => params.append("instructor", i));
    selectedCategories.forEach((c) => params.append("category", c));

    fetch(`${API_BASE}/api/recorded-webinars/?${params.toString()}`)
      .then((res) => res.json())
      .then(setWebinars)
      .finally(() => setIsFetching(false));
  }, [
    debouncedSearch,
    selectedMonths,
    selectedInstructors,
    selectedCategories,
    initialLoading,
  ]);

  /* ================= HELPERS ================= */
  const toggleValue = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedMonths([]);
    setSelectedInstructors([]);
    setSelectedCategories([]);
  };

  /* ================= INITIAL LOADER ================= */
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
          <h1 className="text-4xl font-bold text-white mb-2">
            Recorded Webinars
          </h1>
          <p className="text-emerald-100">
            Learn anytime with on-demand expert sessions
          </p>

          <div className="mt-6 max-w-xl relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recorded webinars…"
              className="w-full pl-12 pr-4 py-4 rounded-xl shadow focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">


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
            <p className="font-medium">
              {webinars.length} recorded sessions found
            </p>

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
            <p className="text-sm text-gray-500 mb-4">
              Updating results…
            </p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((w) => (
              <RecordedWebinarCard key={w.webinar_id} w={w} />
            ))}
          </div>
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
                <span className="text-xs text-gray-400">
                  {item.count}
                </span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= CARD ================= */
/* ================= CARD ================= */


function RecordedWebinarCard({ w }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white overflow-hidden w-full border-2 border-gray-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer rounded-[24px]"
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={w.cover_image}
          alt={w.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform group-hover:scale-110 transition-transform">
            <FiPlay className="w-8 h-8 text-emerald-600 fill-emerald-600" />
          </div>
        </div>

        {/* ON DEMAND Ribbon */}
        <div className="absolute top-5 left-0">
          <div
            className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl"
            style={{
              clipPath: "polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%)",
              paddingRight: "20px",
            }}
          >
            <div className="flex items-center gap-2 px-5 py-2">
              <FiPlay className="w-3 h-3 fill-white" />
              <span className="text-xs font-bold tracking-wider">
                ON DEMAND
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        {/* TITLE */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors min-h-[3.5rem]">
          {w.title}
        </h3>

        {/* INSTRUCTOR */}
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-3 border border-gray-100">
          <div className="flex-1 min-w-0 pr-3">
            <p className="text-sm font-bold text-gray-900 truncate">
              {w.instructor?.name}
            </p>
            <p className="text-xs text-gray-600 truncate">
              {w.instructor?.designation}
              {w.instructor?.organization &&
                ` • ${w.instructor.organization}`}
            </p>
          </div>

          <div className="relative flex-shrink-0">
            <img
              src={w.instructor?.photo}
              alt={w.instructor?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-600 rounded-full p-1">
              <FiUser className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* DURATION */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 border-l-4 border-emerald-500">
          <FiClock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-bold text-gray-700">
            {w.duration_minutes} min
          </span>
        </div>

        {/* AVAILABILITY */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100">
          <p className="text-xs text-emerald-700 font-bold text-center flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            24/7 Available • Watch Anytime
          </p>
        </div>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <span className="text-emerald-600 font-black text-2xl">₹</span>
            <span className="text-emerald-600 font-black text-2xl">
              {w.display_price || "—"}
            </span>
          </div>

          <Link
            to={`/recorded-webinars/${w.webinar_id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn"
          >
            <FiPlay className="w-4 h-4" />
            Watch Now
            <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}


  
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
      className="bg-white rounded-2xl shadow overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative h-48">
        <img
          src={w.cover_image}
          alt={w.title}
          className="w-full h-full object-cover"
        />

        {/* ON DEMAND BADGE */}
        <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          ON DEMAND
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* TITLE */}
        <h3 className="font-bold text-lg mb-3">{w.title}</h3>

        {/* INSTRUCTOR ROW (TEXT LEFT • IMAGE RIGHT) */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {w.instructor?.name}
            </p>
            <p className="text-xs text-gray-500">
              {w.instructor?.designation}
              {w.instructor?.organization &&
                ` • ${w.instructor.organization}`}
            </p>
          </div>

          <img
            src={w.instructor?.photo}
            alt={w.instructor?.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
        </div>

        {/* DURATION */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <FiClock />
          {w.duration_minutes} min
        </div>

        {/* AVAILABILITY */}
        <p className="text-xs text-emerald-600 font-medium mb-4">
          24/7 Available • Watch Anytime
        </p>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between">
          <span className="text-emerald-600 font-bold text-lg">
            ₹ {w.display_price || "—"}
          </span>

          <Link
            to={`/recorded-webinars/${w.webinar_id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700"
          >
            Watch Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}


  
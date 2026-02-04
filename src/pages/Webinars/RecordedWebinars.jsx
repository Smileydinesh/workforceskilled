import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiClock,
  FiUser,
  FiFilter,
  FiX,
  FiPlay,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

/* ================= PAGE ================= */
export default function RecordedWebinars() {
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
  const [showFilters, setShowFilters] = useState(false);

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

  const hasActiveFilters = () => {
    return (
      search.trim() !== "" ||
      selectedMonths.length > 0 ||
      selectedInstructors.length > 0 ||
      selectedCategories.length > 0
    );
  };

  /* ================= INITIAL LOADER ================= */
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <header className="bg-gradient-to-r from-sky-600 to-sky-700 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-1">
            Recorded Webinars
          </h1>
          

          {/* Search and Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recorded webinars…"
                className="w-full pl-12 pr-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-400 outline-none text-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-sky-700 font-medium rounded-lg shadow-sm hover:shadow transition-shadow text-sm"
              >
                <FiFilter />
                {showFilters ? "Hide Filters" : "Show Filters"}
                {hasActiveFilters() && (
                  <span className="bg-sky-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedMonths.length + selectedInstructors.length + selectedCategories.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= FILTERS DROPDOWN ================= */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-gray-200 shadow-md"
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-gray-900">Filter Options</h3>
                <div className="flex items-center gap-3">
                  {hasActiveFilters() && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                    >
                      Clear All Filters
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-md"
                  >
                    <FiX className="text-gray-500" size={16} />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Month Filter */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Month
                  </h4>
                  <div className="space-y-1">
                    {filters.months.map((item) => (
                      <label
                        key={item.value}
                        className="flex justify-between items-center text-xs hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedMonths.includes(item.value)}
                            onChange={() => toggleValue(item.value, setSelectedMonths)}
                            className="accent-sky-600"
                          />
                          {item.label}
                        </div>
                        <span className="text-xs text-gray-400 px-1.5 py-0.5 bg-gray-100 rounded">
                          {item.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Instructor Filter */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Instructor
                  </h4>
                  <div className="space-y-1">
                    {filters.instructors.map((item) => (
                      <label
                        key={item.value}
                        className="flex justify-between items-center text-xs hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedInstructors.includes(item.value)}
                            onChange={() => toggleValue(item.value, setSelectedInstructors)}
                            className="accent-sky-600"
                          />
                          {item.label}
                        </div>
                        <span className="text-xs text-gray-400 px-1.5 py-0.5 bg-gray-100 rounded">
                          {item.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Category
                  </h4>
                  <div className="space-y-1">
                    {filters.categories.map((item) => (
                      <label
                        key={item.value}
                        className="flex justify-between items-center text-xs hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(item.value)}
                            onChange={() => toggleValue(item.value, setSelectedCategories)}
                            className="accent-sky-600"
                          />
                          {item.label}
                        </div>
                        <span className="text-xs text-gray-400 px-1.5 py-0.5 bg-gray-100 rounded">
                          {item.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      <main className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <div>
              <p className="font-medium text-gray-700 text-sm">
                {webinars.length} recorded session{webinars.length !== 1 ? 's' : ''} found
              </p>
              {hasActiveFilters() && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {search.trim() !== "" && (
                    <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs px-2 py-0.5 rounded-full">
                      Search: {search}
                      <button onClick={() => setSearch("")}>
                        <FiX size={10} />
                      </button>
                    </span>
                  )}
                  {selectedMonths.map(month => {
                    const monthData = filters.months.find(m => m.value === month);
                    return monthData && (
                      <span key={month} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {monthData.label}
                        <button onClick={() => toggleValue(month, setSelectedMonths)}>
                          <FiX size={10} />
                        </button>
                      </span>
                    );
                  })}
                  {selectedInstructors.map(instructor => {
                    const instructorData = filters.instructors.find(i => i.value === instructor);
                    return instructorData && (
                      <span key={instructor} className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        {instructorData.label}
                        <button onClick={() => toggleValue(instructor, setSelectedInstructors)}>
                          <FiX size={10} />
                        </button>
                      </span>
                    );
                  })}
                  {selectedCategories.map(category => {
                    const categoryData = filters.categories.find(c => c.value === category);
                    return categoryData && (
                      <span key={category} className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                        {categoryData.label}
                        <button onClick={() => toggleValue(category, setSelectedCategories)}>
                          <FiX size={10} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {isFetching && (
              <div className="flex items-center gap-2 text-xs text-sky-600">
                <div className="h-2.5 w-2.5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                Updating results...
              </div>
            )}
          </div>

          {/* Webinar Grid - 2 items per row */}
          <div className="grid md:grid-cols-2 gap-4">
            {webinars.map((w) => (
              <RecordedWebinarListItem key={w.webinar_id} w={w} />
            ))}
          </div>

          {/* Empty State */}
          {webinars.length === 0 && !isFetching && (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl p-6 max-w-md mx-auto shadow-sm">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiSearch className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No webinars found</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ================= LIST ITEM COMPONENT ================= */
function RecordedWebinarListItem({ w }) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="group bg-white overflow-hidden w-full border border-gray-200 hover:border-sky-300 transition-all duration-200 hover:shadow-sm cursor-pointer rounded-lg"
    >
      <div className="p-4">
        <div className="flex flex-col h-full">
          {/* Header with badges */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-1.5">
              <div className="bg-sky-100 text-sky-800 text-xs font-medium px-2 py-0.5 rounded">
                ON DEMAND
              </div>
              <div className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
                <FiClock className="w-2.5 h-2.5" />
                {w.duration_minutes} min
              </div>
            </div>
            <div className="bg-sky-50 text-sky-700 text-xs font-medium px-2 py-0.5 rounded">
              24/7 Available
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2 min-h-[2.5rem]">
            {w.title}
          </h3>

          {/* Instructor Info */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="relative">
              <img
                src={w.instructor?.photo}
                alt={w.instructor?.name}
                className="w-8 h-8 rounded-full object-cover border border-white shadow-xs"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-sky-600 rounded-full p-0.5">
                <FiUser className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {w.instructor?.name}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {w.instructor?.designation}
                {w.instructor?.organization &&
                  ` • ${w.instructor.organization}`}
              </p>
            </div>
          </div>

          {/* Footer with Price and CTA */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="flex items-center gap-0.5">
              <span className="text-sky-600 font-black text-lg">₹</span>
              <span className="text-sky-600 font-black text-lg">
                {w.display_price || "—"}
              </span>
            </div>

            <Link
              to={`/recorded-webinars/${w.webinar_id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white rounded-md text-xs font-medium shadow-xs hover:shadow-sm transition-all duration-200 transform hover:scale-[1.02] group/btn"
            >
              <FiPlay className="w-3 h-3" />
              Entroll Now
              <FiArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
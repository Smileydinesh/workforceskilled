import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiCalendar,
  FiClock,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiX,
} from "react-icons/fi";
import { formatPstEst } from "../../utils/timezone";

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

  if (days === 0) {
    return { label: `${hours}h ${minutes}m`, type: "hours" };
  }

  return { label: `${days} days left`, type: "days" };
}

/* ================= PAGE ================= */
export default function LiveWebinars(webinar) {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  /* ---------- DATA ---------- */
  const [webinars, setWebinars] = useState([]);
  const [filters, setFilters] = useState({
    months: [],
    instructors: [],
    categories: [],
  });

  /* ---------- FILTER STATE ---------- */
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  /* ---------- PAGINATION ---------- */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / pageSize);

  /* ================= FILTER METADATA ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/live-webinars/filters/`)
      .then((res) => res.json())
      .then(setFilters);
  }, []);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("page_size", pageSize);

    if (search) params.append("search", search);
    if (selectedMonth) params.append("month", selectedMonth);
    if (selectedInstructor) params.append("instructor", selectedInstructor);
    if (selectedCategory) params.append("category", selectedCategory);

    fetch(`${API_BASE}/api/live-webinars/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
          const results = data.results || [];

          // ✅ TEST webinars first
          const sorted = [...results].sort((a, b) => {
            if (a.is_test && !b.is_test) return -1;
            if (!a.is_test && b.is_test) return 1;
            return 0;
          });

          setWebinars(sorted);
          setTotalCount(data.count || 0);
        });

  }, [
    page,
    pageSize,
    search,
    selectedMonth,
    selectedInstructor,
    selectedCategory,
  ]);

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = () => setShowFilters((v) => !v);
    window.addEventListener("toggleFilters", handler);
    return () => window.removeEventListener("toggleFilters", handler);
  }, []);

  const getLabel = (options = [], value, fallback) => {
    if (!value || !options.length) return fallback;

    return (
      options.find((o) => String(o.value) === String(value))?.label ||
      fallback
    );
  };

  const hasActiveFilters =
    search || selectedMonth || selectedInstructor || selectedCategory;

  return (
    <div className="min-h-screen bg-white">
      {/* ================= FILTER BAR ================= */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-white via-sky-50 to-white px-6 py-6 grid grid-cols-1 lg:grid-cols-6 gap-5 items-end shadow-xl border-b border-sky-100">
          <div>
            <label className="text-sm font-medium text-sky-800 mb-2 block">
              Search By
            </label>
            <div className="relative group">
              <FiSearch className="absolute left-3 top-3 text-sky-500 group-focus-within:text-sky-600 transition-colors duration-300 text-base" />
              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2.5 text-base bg-white border border-sky-200 rounded-lg text-gray-900 placeholder-sky-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
                placeholder="Search webinars..."
              />
            </div>
          </div>

          <Select
            label="Category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={filters.categories}
          />

          <Select
            label="Speakers"
            value={selectedInstructor}
            onChange={setSelectedInstructor}
            options={filters.instructors}
          />

          <Select
            label="Month"
            value={selectedMonth}
            onChange={setSelectedMonth}
            options={filters.months}
          />

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setPage(1);
                setShowFilters(false);
              }}
              className="flex-1 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white py-2.5 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95 text-sm"
            >
              Search
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2.5 text-sky-500 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors duration-300"
              title="Close filters"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* ================= FILTER SUMMARY ================= */}
        {hasActiveFilters && (
          <div className="bg-gradient-to-r from-sky-50 to-sky-100 px-6 py-4 text-sm flex flex-wrap gap-6 shadow-sm border-b border-sky-200">
            <span className="text-sky-800">
              Topic:{" "}
              <span className="text-sky-900 font-medium">
                {search || "Not Specified"}
              </span>
            </span>

            <span className="text-sky-800">
              Category:{" "}
              <span className="text-sky-900 font-medium">
                {getLabel(filters.categories, selectedCategory, "All")}
              </span>
            </span>

            <span className="text-sky-800">
              Speaker:{" "}
              <span className="text-sky-900 font-medium">
                {getLabel(filters.instructors, selectedInstructor, "Any")}
              </span>
            </span>

            <span className="text-sky-800">
              Month:{" "}
              <span className="text-sky-900 font-medium">
                {getLabel(filters.months, selectedMonth, "Any")}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* ================= PAGINATION BAR ================= */}
      <PaginationBar
        page={page}
        totalPages={totalPages}
        total={totalCount}
        start={start}
        end={end}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(v) => {
          setPage(1);
          setPageSize(v);
        }}
        showHeader={true}
        onToggleFilters={() => setShowFilters((v) => !v)}
        hasActiveFilters={hasActiveFilters}
        search={search}
        selectedCategory={selectedCategory}
        selectedInstructor={selectedInstructor}
        selectedMonth={selectedMonth}
        filters={filters}
      />

      {/* ================= RESULTS COUNT ================= */}
      {hasActiveFilters && (
        <div className="px-6 py-4 bg-gradient-to-r from-sky-100 to-sky-50 border-b border-sky-200">
          <div className="text-sky-900 text-sm">
            Showing <span className="font-bold">{totalCount}</span> results
            {search && <span className="ml-2">for "{search}"</span>}
          </div>
        </div>
      )}

      {/* ================= LIST ================= */}
      <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {webinars.map((w) => (
          <WebinarRow
            key={w.webinar_id}
            w={w}
            onClick={() => navigate(`/live-webinars/${w.webinar_id}`)}
          />
        ))}
      </div>

      <div className="flex justify-center pb-8">
        <PaginationBar
          page={page}
          totalPages={totalPages}
          total={totalCount}
          start={start}
          end={end}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(v) => {
            setPage(1);
            setPageSize(v);
          }}
           variant="bottom"
        />
      </div>
    </div>
  );
}

/* ================= SELECT ================= */
function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-medium text-sky-800 mb-1.5 block">
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-2.5 px-3 text-sm bg-white border border-sky-200 rounded-lg text-gray-900 appearance-none cursor-pointer hover:border-sky-300 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"
        >
          <option value="" className="bg-white">
            All
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-white">
              {o.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="w-2 h-2 border-r-2 border-b-2 border-sky-500 rotate-45"></div>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGINATION BAR ================= */
function PaginationBar({
  page,
  totalPages,
  total,
  start,
  end,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showHeader = false,
  variant = "top",
  onToggleFilters,
  hasActiveFilters,
  search,
  selectedCategory,
  selectedInstructor,
  selectedMonth,
  filters,
}) {
  const paginationButtons = [];
  const maxVisible = 5;

  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(i);
  }

  const PaginationControls = (
    <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(1)}
        className="flex items-center gap-1 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all duration-300 hover:shadow-md active:scale-95 group border border-sky-200 text-xs"
      >
        <FiChevronsLeft className="text-xs group-hover:-translate-x-1 transition-transform duration-300 text-sky-900" />
        <span className="text-xs text-sky-900 font-semibold">First</span>
      </button>

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-1 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all duration-300 hover:shadow-md active:scale-95 group border border-sky-200 text-xs"
      >
        <FiChevronLeft className="text-xs group-hover:-translate-x-1 transition-transform duration-300 text-sky-900" />
        <span className="text-xs text-sky-900">Previous</span>
      </button>

      {paginationButtons.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border
            ${
              p === page
                ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg scale-105 border-sky-600"
                : "bg-sky-100 hover:bg-sky-200 text-sky-900 hover:text-sky-900 hover:shadow-md border-sky-200"
            }
            active:scale-95
          `}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-1 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all duration-300 hover:shadow-md active:scale-95 group border border-sky-200 text-xs"
      >
        <span className="text-xs text-sky-900">Next</span>
        <FiChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-300 text-sky-900" />
      </button>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(totalPages)}
        className="flex items-center gap-1 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all duration-300 hover:shadow-md active:scale-95 group border border-sky-200 text-xs"
      >
        <span className="text-xs text-sky-900">Last</span>
        <FiChevronsRight className="text-xs group-hover:translate-x-1 transition-transform duration-300 text-sky-900" />
      </button>

      <span className="px-3 py-1.5 bg-sky-50 rounded-lg text-sky-800 text-xs border border-sky-200">
        Page <span className="text-sky-900 font-bold">{page}</span> of{" "}
        <span className="text-sky-900 font-bold">{totalPages}</span>
      </span>

      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-3 py-1.5 text-xs bg-white border border-sky-200 rounded-lg text-sky-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 hover:border-sky-300 cursor-pointer"
      >
        {[12, 24, 36, 100].map((n) => (
          <option key={n} value={n} className="bg-white">
            {n} per page
          </option>
        ))}
      </select>
    </div>
  );

  const getLabel = (options = [], value, fallback) => {
    if (!value || !options.length) return fallback;

    return (
      options.find((o) => String(o.value) === String(value))?.label ||
      fallback
    );
  };

  return (
    <div
      className={`
        text-sky-900
        py-4
        border-t border-sky-200
        ${variant === "bottom"
          ? "w-full bg-white px-0 shadow-none"
          : "bg-white px-6 shadow-lg border-b"}
      `}
    >
      {showHeader ? (
        /* ================= TOP PAGINATION ================= */
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                  Live Webinars
                </h1>
                <div className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full"></div>
              </div>

              <button
                onClick={onToggleFilters}
                className="group relative flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 px-4 py-2.5 rounded-lg text-sm font-medium text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95 overflow-hidden w-fit"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <FiFilter className="text-base group-hover:rotate-12 transition-transform duration-300" />
                <span>Filter</span>
              </button>
            </div>

            {/* Results count on mobile */}
            {hasActiveFilters && (
              <div className="sm:hidden text-sm text-sky-800 bg-sky-100 px-3 py-2 rounded-lg border border-sky-200">
                <span className="font-bold">
                  {start}-{end}
                </span>{" "}
                of <span className="font-bold">{total}</span> results
              </div>
            )}
          </div>

          {/* Centered pagination controls */}
          <div className="w-full flex justify-center">
            {PaginationControls}
          </div>
        </div>
      ) : (
        /* ================= BOTTOM PAGINATION (NORMAL CENTER) ================= */
        <div className="flex justify-center">{PaginationControls}</div>
      )}
    </div>
  );
}

/* ================= WEBINAR ROW ================= */
function WebinarRow({ w, onClick }) {
  const { day, month, pst, est } = formatPstEst(w.start_datetime);
  const year = new Date(w.start_datetime).getFullYear();

  const status = getWebinarStatus(w.start_datetime, w.duration_minutes);

  return (
    <div
      onClick={onClick}
      className="
        group relative
        bg-gradient-to-br from-white to-sky-50
        border border-sky-100
        rounded-xl
        px-6 py-5
        grid grid-cols-[120px_1fr]
        gap-6
        cursor-pointer
        hover:shadow-lg
        hover:border-sky-200
        hover:-translate-y-0.5
        transform
        transition-all
        duration-300
        ease-out
        overflow-hidden
        min-h-[180px]
        before:absolute
        before:inset-0
        before:bg-gradient-to-r
        before:from-transparent
        before:via-sky-50/30
        before:to-transparent
        before:-translate-x-full
        before:group-hover:translate-x-full
        before:transition-transform
        before:duration-700
        before:ease-out
      "
    >
      {w.is_test && (
        <div className="
          absolute top-3 right-3
          flex items-center gap-1
          px-2.5 py-1
          rounded-full
          bg-yellow-100
          border border-yellow-400
          text-yellow-800
          text-xs
          font-bold
          z-20
          shadow-sm
        ">
          ⚠️ Test
        </div>
      )}

      {/* ================= DATE + STATUS ================= */}
      <div className="text-center border-r border-sky-100 pr-4 flex flex-col items-center justify-start gap-3">
        {/* Date */}
        <div
          className="
            relative
            w-fit
            rounded-xl
            border border-sky-300
            bg-gradient-to-br from-sky-500 to-sky-400
            px-4 py-3
            text-center
            
          "
        >
          <div className="text-4xl font-extrabold text-white leading-none">
            {day}
          </div>

          <div className="text-sm text-white font-bold mt-1 uppercase tracking-wide">
            {month}
          </div>

          {/* subtle bottom accent */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white/70 rounded-full"></div>
        </div>

        {/* Status Badge */}
        <div className="mt-3 relative">
          <span
            className={`
              relative z-10
              px-3 py-1.5 rounded-full text-xs font-bold tracking-wide
              shadow-sm
              transform transition-all duration-300
              ${
                status.type === "live"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white animate-pulse hover:animate-none hover:from-red-700 hover:to-red-800"
                  : status.type === "ended"
                  ? "bg-gradient-to-r from-sky-400 to-sky-500 text-white"
                  : status.type === "hours"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                  : "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700"
              }
              group-hover:scale-105
            `}
          >
            {status.label}
          </span>
          {status.type === "live" && (
            <div className="absolute inset-0 rounded-full bg-red-500 blur-sm opacity-50 animate-ping"></div>
          )}
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="space-y-3 min-w-0">
        {/* TITLE */}
        <h3 className="text-lg font-bold text-sky-800 flex items-center gap-2 truncate">
          {w.title}
          
          {w.is_test && (
            <p className="text-xs text-yellow-700 font-medium">
              ⚠️  This is a test webinar (payment flow testing)
            </p>
          )}
        </h3>

        {/* INSTRUCTOR + PRICE */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 min-w-0 group/instructor">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-300 rounded-full blur opacity-0 group-hover/instructor:opacity-50 transition-opacity duration-300"></div>
              <img
                src={w.instructor.photo}
                alt={w.instructor.name}
                className="relative z-10 w-10 h-10 rounded-full object-cover border border-white shadow-sm group-hover/instructor:scale-110 group-hover/instructor:border-sky-200 transition-all duration-300"
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-sky-900 truncate group-hover/instructor:text-sky-800 transition-colors duration-300">
                {w.instructor.name}
              </p>
              <p className="text-xs text-sky-500">Instructor</p>
            </div>
          </div>

          <div className="relative group/price ml-auto mr-6">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 rounded-md blur opacity-0 group-hover/price:opacity-50 transition-opacity duration-300"></div>
            <span className="relative z-10 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-3 py-1.5 rounded-md font-bold text-sm shadow-sm group-hover/price:scale-105 transition-all duration-300">
              ${w.display_price}
            </span>
          </div>
        </div>

        {/* TIME + DURATION + CTA */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-sky-900 flex items-center gap-4">
            <span className="flex items-center gap-1.5 group/time">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-sm opacity-0 group-hover/time:opacity-100 transition-opacity duration-300"></div>
                <FiClock className="relative z-10 text-sky-600 group-hover/time:text-sky-700 transition-colors duration-300" size={16} />
              </div>
              <span className="font-medium">
                {pst} | {est}
              </span>
            </span>

            <span className="flex items-center gap-1.5 group/duration">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-sm opacity-0 group-hover/duration:opacity-100 transition-opacity duration-300"></div>
                <FiCalendar className="relative z-10 text-sky-600 group-hover/duration:text-sky-700 transition-colors duration-300" size={16} />
              </div>
              <span className="font-medium">{w.duration_minutes} min</span>
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="
              relative
              group/cta
              bg-gradient-to-r from-sky-500 to-sky-600
              hover:from-sky-600 hover:to-sky-700
              text-white
              px-4 py-2
              rounded-lg
              text-sm font-semibold
              shadow-sm
              hover:shadow-md
              transform
              hover:-translate-y-0.5
              hover:scale-105
              active:scale-95
              transition-all
              duration-300
              overflow-hidden
              before:absolute
              before:inset-0
              before:bg-gradient-to-r
              before:from-transparent
              before:via-white/20
              before:to-transparent
              before:-translate-x-full
              before:group-hover/cta:translate-x-full
              before:transition-transform
              before:duration-500
            "
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
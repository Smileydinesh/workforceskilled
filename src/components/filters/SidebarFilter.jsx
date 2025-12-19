import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiCheckCircle,
} from "react-icons/fi";

/* ---------------- SECTION ---------------- */
function Section({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-gray-800/50">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left group"
      >
        <span className="font-semibold text-gray-200">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-400"
        >
          <FiChevronDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-4 space-y-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- SIDEBAR ---------------- */
export default function SidebarFilter({
  search,
  setSearch,
  selectedMonths,
  setSelectedMonths,
  selectedSpeakers,
  setSelectedSpeakers,
  selectedCategories,
  setSelectedCategories,
}) {
  const [open, setOpen] = useState({
    search: true,
    month: false,
    speaker: false,
    category: false,
  });

  const months = ["October", "November", "December"];
  const speakers = ["Rahul Mehta", "Anita Sharma"];
  const categories = ["HR & Recruitment", "Compliance & Law"];

  const toggleItem = (value, list, setList) =>
    setList(
      list.includes(value)
        ? list.filter((i) => i !== value)
        : [...list, value]
    );

  return (
    <aside className="sticky top-24 rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-4 flex items-center gap-2 border-b border-gray-800">
        <FiFilter className="text-blue-400" />
        <h3 className="font-bold text-white">Filters</h3>
      </div>

      {/* SEARCH */}
      <Section
        title="Search"
        isOpen={open.search}
        onToggle={() => setOpen((o) => ({ ...o, search: !o.search }))}
      >
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search webinars..."
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
          />
        </div>
      </Section>

      {/* MONTH */}
      <Section
        title="Month"
        isOpen={open.month}
        onToggle={() => setOpen((o) => ({ ...o, month: !o.month }))}
      >
        {months.map((m) => (
          <label key={m} className="flex gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={selectedMonths.includes(m)}
              onChange={() =>
                toggleItem(m, selectedMonths, setSelectedMonths)
              }
            />
            {m}
          </label>
        ))}
      </Section>

      {/* SPEAKER */}
      <Section
        title="Speaker"
        isOpen={open.speaker}
        onToggle={() => setOpen((o) => ({ ...o, speaker: !o.speaker }))}
      >
        {speakers.map((s) => (
          <label key={s} className="flex gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={selectedSpeakers.includes(s)}
              onChange={() =>
                toggleItem(s, selectedSpeakers, setSelectedSpeakers)
              }
            />
            {s}
          </label>
        ))}
      </Section>

      {/* CATEGORY */}
      <Section
        title="Category"
        isOpen={open.category}
        onToggle={() => setOpen((o) => ({ ...o, category: !o.category }))}
      >
        {categories.map((c) => (
          <label key={c} className="flex gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={selectedCategories.includes(c)}
              onChange={() =>
                toggleItem(c, selectedCategories, setSelectedCategories)
              }
            />
            {c}
          </label>
        ))}
      </Section>

      {/* FOOTER */}
      <div className="px-6 py-4 flex justify-between text-sm border-t border-gray-800">
        <button
          onClick={() =>
            setOpen({ search: true, month: true, speaker: true, category: true })
          }
          className="text-blue-400"
        >
          Expand All
        </button>
        <button
          onClick={() =>
            setOpen({
              search: false,
              month: false,
              speaker: false,
              category: false,
            })
          }
          className="text-gray-400"
        >
          Collapse All
        </button>
      </div>
    </aside>
  );
}

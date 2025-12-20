import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiUser,
  FiGrid,
  FiList
} from "react-icons/fi";

/* ---------------- MOCK DATA ---------------- */
const recordedWebinars = [
  {
    id: 1,
    title: "Introduction to Copilot for Business Professionals",
    speaker: "Tom Fragale",
    duration: "60 minutes",
    month: "October",
    category: "AI & Productivity",
    price: "$189.00",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    speakerImage: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 2,
    title: "ChatGPT and AI for Project Management",
    speaker: "Chris DeVany",
    duration: "60 minutes",
    month: "October",
    category: "Project Management",
    price: "$189.00",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    speakerImage: "https://i.pravatar.cc/100?img=12",
  },
];

/* ---------------- PAGE ---------------- */
export default function RecordedWebinars() {
  const [view, setView] = useState("grid");

  const [openMonth, setOpenMonth] = useState(true);
  const [openSpeaker, setOpenSpeaker] = useState(true);
  const [openCategory, setOpenCategory] = useState(true);

  const expandAll = () => {
    setOpenMonth(true);
    setOpenSpeaker(true);
    setOpenCategory(true);
  };

  const collapseAll = () => {
    setOpenMonth(false);
    setOpenSpeaker(false);
    setOpenCategory(false);
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-yellow-600 py-14 px-10">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          ▶ Recorded Webinars
        </h1>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">

        {/* FILTER SIDEBAR */}
        <aside className="bg-emerald-900/60 backdrop-blur border border-emerald-800 rounded-xl p-5 h-fit sticky top-24">
          <h3 className="font-semibold mb-4 text-yellow-400">Filter</h3>

          {/* Search */}
          <div className="mb-5">
            <label className="text-sm font-medium">Search</label>
            <div className="relative mt-2">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
              <input
                placeholder="Search webinars..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-emerald-950 border border-emerald-700 focus:ring-2 focus:ring-yellow-400 text-sm"
              />
            </div>
          </div>

          <FilterBlock
            title="Month"
            open={openMonth}
            toggle={() => setOpenMonth(!openMonth)}
            items={["October", "November", "December"]}
          />

          <FilterBlock
            title="Speaker"
            open={openSpeaker}
            toggle={() => setOpenSpeaker(!openSpeaker)}
            items={["Tom Fragale", "Chris DeVany"]}
          />

          <FilterBlock
            title="Category"
            open={openCategory}
            toggle={() => setOpenCategory(!openCategory)}
            items={["AI & Productivity", "Project Management"]}
          />

          <div className="flex justify-between text-sm text-yellow-400 mt-6">
            <button onClick={expandAll}>Expand All</button>
            <button onClick={collapseAll}>Collapse All</button>
          </div>
        </aside>

        {/* RESULTS */}
        <section>

          {/* TOP BAR */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold">47 recorded webinars</p>

            <div className="flex items-center gap-2 bg-emerald-900 border border-emerald-800 rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded ${
                  view === "grid"
                    ? "bg-yellow-400 text-emerald-950"
                    : "text-emerald-300 hover:bg-emerald-800"
                }`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded ${
                  view === "list"
                    ? "bg-yellow-400 text-emerald-950"
                    : "text-emerald-300 hover:bg-emerald-800"
                }`}
              >
                <FiList />
              </button>
            </div>
          </div>

          {/* GRID VIEW */}
          {view === "grid" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recordedWebinars.map((w) => (
                <motion.div
                  key={w.id}
                  whileHover={{ y: -6 }}
                  className="bg-emerald-900/60 border border-emerald-800 rounded-2xl overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={w.image}
                      className="w-full h-full object-cover"
                      alt={w.title}
                    />
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      ON-DEMAND
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-sm leading-snug">
                      {w.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm">
                      <img
                        src={w.speakerImage}
                        className="w-8 h-8 rounded-full"
                      />
                      {w.speaker}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-emerald-300">
                      <FiClock /> {w.duration}
                    </div>

                    <p className="text-green-400 text-sm">Available 24/7</p>

                    <div className="flex items-center justify-between pt-3">
                      <span className="font-bold text-yellow-400">
                        {w.price}
                      </span>
                      <button className="px-4 py-2 text-sm bg-yellow-400 text-emerald-950 rounded-lg">
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {view === "list" && (
            <div className="space-y-6">
              {recordedWebinars.map((w) => (
                <motion.div
                  key={w.id}
                  whileHover={{ y: -4 }}
                  className="bg-emerald-900/60 border border-emerald-800 rounded-2xl overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="relative md:w-80 h-56 md:h-auto">
                    <img
                      src={w.image}
                      className="w-full h-full object-cover"
                      alt={w.title}
                    />
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      ON-DEMAND
                    </span>
                  </div>

                  <div className="flex-1 p-6 flex justify-between gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {w.title}
                      </h3>

                      <div className="text-sm space-y-2">
                        <div className="flex items-center gap-2">
                          <FiUser /> {w.speaker}
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock /> {w.duration}
                        </div>
                        <p className="text-green-400">Available 24/7</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <img
                        src={w.speakerImage}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-right">
                        <p className="text-xl font-bold text-yellow-400">
                          {w.price}
                        </p>
                        <button className="mt-3 px-5 py-2 rounded-lg bg-yellow-400 text-emerald-950 text-sm">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ---------------- FILTER BLOCK ---------------- */
function FilterBlock({ title, open, toggle, items }) {
  return (
    <div className="mb-4">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full text-sm font-medium"
      >
        {title}
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {open && (
        <div className="mt-3 space-y-2 text-sm text-emerald-300">
          {items.map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-400" />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SidebarFilter from "../../components/filters/SidebarFilter";

import {
  FiSearch,
  FiClock,
  FiTag,
  FiStar,
  FiPlayCircle,
  FiTrendingUp,
  FiUser,
  FiBookOpen,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";

/* ---------------- MOCK DATA ---------------- */
const recordedWebinars = [
  {
    id: 101,
    title: "Advanced HR Analytics & Dashboards",
    category: "HR & Recruitment",
    level: "Advanced",
    language: "English",
    duration: "6h 40m",
    lessons: 24,
    access: "Lifetime",
    price: "₹2,999",
    originalPrice: "₹4,999",
    rating: 4.8,
    bestseller: true,
    progress: 45,
    instructor: {
      name: "Rahul Mehta",
      role: "People Analytics Lead",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    id: 102,
    title: "Workplace POSH & Legal Compliance",
    category: "Compliance & Law",
    level: "Intermediate",
    language: "English",
    duration: "4h 10m",
    lessons: 18,
    access: "Lifetime",
    price: "₹1,999",
    originalPrice: "₹3,499",
    rating: 4.6,
    bestseller: false,
    progress: null,
    instructor: {
      name: "Anita Sharma",
      role: "HR Director @ Infosys",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

/* ---------------- PAGE ---------------- */
export default function RecordedWebinars() {

  const pageRef = useRef(null);
  const [search, setSearch] = useState("");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
  const el = document.getElementById("page-top");
  if (el) {
    el.scrollIntoView({ block: "start" });
  }
}, []);




  const filtered = recordedWebinars.filter((w) => {
    const matchesSearch = w.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSpeaker =
      selectedSpeakers.length === 0 ||
      selectedSpeakers.includes(w.instructor.name);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(w.category);

    return matchesSearch && matchesSpeaker && matchesCategory;
  });

  return (
    <div
  ref={pageRef}
  className="bg-slate-950 text-white">
      <div id="page-top"></div>




      {/* HEADER */}
      <section className="py-24 text-center bg-gradient-to-br from-slate-900 to-indigo-950">
        <h1 className="text-4xl md:text-6xl font-bold">
          Recorded <span className="text-indigo-400">Webinars</span>
        </h1>
        <p className="text-slate-300 mt-4">
          Learn anytime with lifetime access
        </p>
      </section>

      {/* SEARCH BAR */}
      <section className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">


        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recorded webinars..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">

          {/* SIDEBAR */}
          <SidebarFilter
            search={search}
            setSearch={setSearch}
            selectedMonths={selectedMonths}
            setSelectedMonths={setSelectedMonths}
            selectedSpeakers={selectedSpeakers}
            setSelectedSpeakers={setSelectedSpeakers}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          {/* CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((w) => (
              <motion.div
                key={w.id}
                whileHover={{ y: -8 }}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative h-52">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <FiPlayCircle size={48} />
                  </div>

                  {w.bestseller && (
                    <span className="absolute top-4 left-4 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <FiTrendingUp /> Bestseller
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">

                  <h3 className="text-lg font-bold">{w.title}</h3>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-slate-800 rounded">
                      {w.level}
                    </span>
                    <span className="px-2 py-1 bg-slate-800 rounded">
                      {w.language}
                    </span>
                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded">
                      {w.access}
                    </span>
                  </div>

                  {/* META */}
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiClock /> {w.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBookOpen /> {w.lessons} Lessons
                    </div>
                    <div className="flex items-center gap-2">
                      <FiTag /> {w.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiStar className="text-amber-400" /> {w.rating}
                    </div>
                  </div>

                  {/* PROGRESS */}
                  {w.progress !== null && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{w.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full">
                        <div
                          style={{ width: `${w.progress}%` }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* INSTRUCTOR + PRICE */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                    <img
                      src={w.instructor.avatar}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{w.instructor.name}</p>
                      <p className="text-xs text-slate-400">
                        {w.instructor.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="line-through text-xs text-slate-400">
                        {w.originalPrice}
                      </p>
                      <p className="font-semibold text-indigo-400">
                        {w.price}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-black font-semibold flex items-center justify-center gap-2"
                  >
                    {w.progress ? "Continue Watching" : "Buy & Watch"}
                    <FiArrowRight />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

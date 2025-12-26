import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiUser,
  FiCalendar,
  FiGrid,
  FiList,
  FiFilter,
  FiDollarSign
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* ---------------- PAGE ---------------- */
export default function LiveWebinars() {
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [openMonth, setOpenMonth] = useState(true);
  const [openSpeaker, setOpenSpeaker] = useState(true);
  const [openCategory, setOpenCategory] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;


  /* ---------------- SAMPLE FILTER DATA ---------------- */
  const months = ["January", "February", "March", "April", "May", "June"];
  const speakers = ["John Doe", "Jane Smith", "Alex Johnson", "Maria Garcia"];
  const categories = ["Technology", "Business", "Marketing", "Design", "Health"];

  /* ---------------- FETCH LIVE WEBINARS ---------------- */
  useEffect(() => {
  fetch(`${API_BASE}/api/live-webinars/`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch webinars");
      return res.json();
    })
    .then((data) => {
      setWebinars(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load webinars", err);
      setLoading(false);
    });
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-yellow-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
          <p className="text-emerald-700 font-medium">Loading live webinars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-yellow-50 text-gray-800">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-yellow-400 py-16 px-6 md:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="text-emerald-100 font-medium tracking-wide">LIVE NOW</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Live Webinars</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Join interactive sessions with industry experts. Learn, ask questions, and grow your skills in real-time.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full translate-y-24 -translate-x-24"></div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* FILTER SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <FiFilter className="text-emerald-600 text-xl" />
                <h3 className="text-xl font-bold text-gray-800">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Search Webinars</label>
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type webinar title or topic..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-emerald-50 border-2 border-emerald-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Filter Sections */}
              <div className="space-y-4">
                <FilterBlock 
                  title="Month" 
                  open={openMonth} 
                  toggle={() => setOpenMonth(!openMonth)} 
                  items={months} 
                />
                <FilterBlock 
                  title="Featured Speakers" 
                  open={openSpeaker} 
                  toggle={() => setOpenSpeaker(!openSpeaker)} 
                  items={speakers} 
                />
                <FilterBlock 
                  title="Categories" 
                  open={openCategory} 
                  toggle={() => setOpenCategory(!openCategory)} 
                  items={categories} 
                />
              </div>

              {/* Expand/Collapse Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-emerald-100">
                <button 
                  onClick={() => {
                    setOpenMonth(true);
                    setOpenSpeaker(true);
                    setOpenCategory(true);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition-colors duration-300"
                >
                  Expand All
                </button>
                <button 
                  onClick={() => {
                    setOpenMonth(false);
                    setOpenSpeaker(false);
                    setOpenCategory(false);
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200 transition-colors duration-300"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </aside>

          {/* WEBINAR RESULTS */}
          <section className="lg:col-span-3">
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Available Webinars</h2>
                  <p className="text-emerald-600 font-medium">
                    <span className="bg-emerald-100 px-3 py-1 rounded-full">{webinars.length}</span> live sessions found
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-medium hidden md:block">View:</span>
                  <div className="flex bg-emerald-50 rounded-xl p-1 border border-emerald-100">
                    <button
                      onClick={() => setView("grid")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        view === "grid"
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      <FiGrid />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        view === "list"
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      <FiList />
                      <span className="hidden sm:inline">List</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* GRID VIEW */}
            {view === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {webinars.map((w) => (
                  <motion.div
                    key={w.webinar_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image with Date Badge */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={w.cover_image}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        alt={w.title}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                          {w.date_display}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-400 text-emerald-900 px-3 py-1.5 rounded-full text-sm font-semibold">
                          LIVE
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 hover:text-emerald-600 transition-colors duration-300">
                        {w.title}
                      </h3>

                      {/* Instructor */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                          <img
                            src={w.instructor.photo}
                            className="w-10 h-10 rounded-full border-2 border-emerald-200"
                            alt={w.instructor.name}
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{w.instructor.name}</p>
                          <p className="text-xs text-gray-500">Instructor</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiClock className="text-emerald-500" />
                          <span>{w.duration_minutes} minutes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCalendar className="text-emerald-500" />
                          <span>{w.time_display}</span>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-emerald-50">
                        <div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <p className="text-2xl font-bold text-emerald-600 flex items-center">
                            <FiDollarSign className="text-lg" />
                            {w.display_price}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/live-webinars/${w.webinar_id}`)}
                          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          View Details
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
                {webinars.map((w) => (
                  <motion.div
                    key={w.webinar_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                    className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-64 relative overflow-hidden">
                        <img
                          src={w.cover_image}
                          className="w-full h-56 md:h-full object-cover hover:scale-105 transition-transform duration-500"
                          alt={w.title}
                        />
                        <div className="absolute top-4 left-4 bg-yellow-400 text-emerald-900 px-3 py-1 rounded-full text-sm font-semibold">
                          {w.date_display}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between h-full">
                          <div className="lg:flex-1 mb-6 lg:mb-0 lg:pr-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-emerald-600 transition-colors duration-300">
                              {w.title}
                            </h3>
                            
                            {/* Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-200">
                                  <img
                                    src={w.instructor.photo}
                                    className="w-full h-full object-cover"
                                    alt={w.instructor.name}
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{w.instructor.name}</p>
                                  <p className="text-sm text-gray-500">Speaker</p>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <FiClock className="text-emerald-500" />
                                  <span>{w.duration_minutes} min</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <FiCalendar className="text-emerald-500" />
                                  <span>{w.time_display}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Tags (if available) */}
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                                Interactive
                              </span>
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                                Q&A Session
                              </span>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="lg:w-48 border-t lg:border-t-0 lg:border-l border-emerald-100 lg:pl-6 pt-4 lg:pt-0">
                            <div className="text-center lg:text-right">
                              <p className="text-sm text-gray-500 mb-1">Price</p>
                              <p className="text-3xl font-bold text-emerald-600 mb-4 flex lg:justify-end items-center">
                                <FiDollarSign className="text-xl" />
                                {w.display_price}
                              </p>
                              <button
                                onClick={() => navigate(`/live-webinars/${w.webinar_id}`)}
                                className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
                              >
                                Join Webinar
                              </button>
                              <p className="text-xs text-gray-500 mt-3">Limited seats available</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {webinars.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCalendar className="text-emerald-500 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No webinars scheduled</h3>
                <p className="text-gray-500 mb-6">Check back soon for upcoming live sessions.</p>
                <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors duration-300">
                  Notify Me
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* FOOTER NOTE */}
      <footer className="bg-white border-t border-emerald-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            <span className="font-semibold text-emerald-600">Note:</span> All webinars include live Q&A, downloadable resources, and certificate of participation.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- FILTER BLOCK ---------------- */
function FilterBlock({ title, open, toggle, items }) {
  return (
    <div className="border border-emerald-100 rounded-xl overflow-hidden">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full px-4 py-4 bg-emerald-50 hover:bg-emerald-100 transition-colors duration-300"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
            {items.length}
          </span>
          {open ? (
            <FiChevronUp className="text-emerald-600 text-lg" />
          ) : (
            <FiChevronDown className="text-emerald-600 text-lg" />
          )}
        </div>
      </button>

      {open && (
        <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors duration-200">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-emerald-500 rounded border-emerald-300 focus:ring-emerald-200 focus:ring-2" 
              />
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
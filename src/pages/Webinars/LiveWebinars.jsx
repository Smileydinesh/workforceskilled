import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiCalendar,
  FiClock,
  FiUser,
  FiTag,
  FiHeart,
  FiAward,
  FiPlayCircle,
} from "react-icons/fi";

/* ---------------- MOCK DATA ---------------- */

const webinars = [
  {
    id: 1,
    title: "HR Compliance & Workplace Ethics 2025",
    description:
      "Learn modern HR compliance strategies with real-world case studies.",
    category: "HR & Recruitment",
    level: "Intermediate",
    audience: ["HR Managers", "Team Leads"],
    date: "2025-03-28T18:30:00",
    duration: "2 Hours",
    month: "March",
    price: "₹1,499",
    originalPrice: "₹2,499",
    language: "English",
    timezone: "IST",
    seatsTotal: 100,
    seatsLeft: 18,
    certificate: true,
    recording: true,
    agenda: [
      "Compliance Overview",
      "Case Studies",
      "Live Q&A",
    ],
    learnings: [
      "Avoid legal risks",
      "Build ethical culture",
      "Compliance automation basics",
    ],
    instructor: {
      name: "Anita Sharma",
      role: "HR Director @ Infosys",
      experience: "12+ Years",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

/* ---------------- HELPERS ---------------- */

function getStatus(date) {
  const now = new Date();
  const start = new Date(date);

  if (now > start) return "LIVE";
  if ((start - now) / (1000 * 60 * 60) < 24) return "STARTING SOON";
  return "UPCOMING";
}

function getCountdown(date) {
  const diff = new Date(date) - new Date();
  if (diff <= 0) return null;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  return `${d}d ${h}h ${m}m`;
}

/* ---------------- COMPONENT ---------------- */

export default function LiveWebinars() {
  const [search, setSearch] = useState("");

  return (
    <main className="bg-slate-950 text-white min-h-screen">

      {/* HEADER */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-emerald-950 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Live <span className="text-emerald-400">Webinars</span>
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Learn directly from industry experts in real-time interactive sessions.
        </p>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-20 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search webinars"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700"
            />
          </div>
        </div>
      </section>

      {/* WEBINAR CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {webinars
            .filter((w) =>
              w.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((w) => {
              const status = getStatus(w.date);
              const countdown = getCountdown(w.date);
              const seatPercent =
                (w.seatsLeft / w.seatsTotal) * 100;

              return (
                <motion.div
                  key={w.id}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg"
                >
                  {/* IMAGE */}
                  <div className="relative h-48">
                    <img
                      src={w.image}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {status}
                    </span>
                    <button className="absolute top-4 right-4 text-white/80 hover:text-emerald-400">
                      <FiHeart />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-4">

                    {/* TITLE */}
                    <h3 className="text-lg font-bold">
                      {w.title}
                    </h3>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-slate-800 rounded">
                        {w.level}
                      </span>
                      {w.audience.map((a) => (
                        <span
                          key={a}
                          className="px-2 py-1 bg-slate-800 rounded"
                        >
                          {a}
                        </span>
                      ))}
                      {w.certificate && (
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded flex items-center gap-1">
                          <FiAward /> Certificate
                        </span>
                      )}
                    </div>

                    {/* META */}
                    <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <FiCalendar />
                        {new Date(w.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock />
                        {w.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiTag />
                        {w.category}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUser />
                        {w.instructor.name}
                      </div>
                    </div>

                    {/* COUNTDOWN */}
                    {countdown && (
                      <div className="text-sm text-emerald-400">
                        Starts in {countdown}
                      </div>
                    )}

                    {/* SEATS */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{w.seatsLeft} seats left</span>
                        <span>{w.seatsTotal}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full">
                        <div
                          style={{ width: `${seatPercent}%` }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* INSTRUCTOR */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <img
                        src={w.instructor.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium">
                          {w.instructor.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {w.instructor.role}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="line-through text-xs text-slate-400">
                          {w.originalPrice}
                        </p>
                        <p className="font-semibold text-emerald-400">
                          {w.price}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold flex items-center justify-center gap-2"
                    >
                      <FiPlayCircle /> Join Now
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </section>
    </main>
  );
}

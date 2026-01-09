import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { label: "Active Learners", value: 15847, icon: "👥" },
  { label: "Live Webinars", value: 450, icon: "🎥" },
  { label: "Expert Mentors", value: 125, icon: "👨‍🏫" },
  { label: "Partner Companies", value: 850, icon: "🏢" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView) return;

    stats.forEach((stat, i) => {
      let start = 0;
      const end = stat.value;
      const duration = 800;
      const steps = 50;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setValues((v) => {
          const copy = [...v];
          copy[i] = Math.floor(start);
          return copy;
        });
      }, duration / steps);
    });
  }, [inView]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative bg-gradient-to-r from-emerald-100 via-white to-slate-50 py-20"
    >
      {/* Subtle wave pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgIG9wYWNpdHk9IjAuMDUiPgo8cGF0aCBkPSJNMCAxNEMgNS4wNjMgMTQgMTAuMTI2IDE0IDE1LjE4OSAxNGMxMC4wNjMgMCAxNS4xODkgMTQgMjAuMjUyIDE0YzUuMDYzIDAgMTAuMTI2IDAgMTUuMTg5IDBjNS4wNjMgMCAxMC4xMjYgMCAxNS4xODkgMGM1LjA2MyAwIDEwLjEyNiAwIDE1LjE4OSAwYzUuMDYzIDAgMTAuMTI2IDAgMTUuMTg5IDBDNTQuODc0IDE0IDU5LjkzNyAxNCA2NSAxNGgtNjV6IiBmaWxsPSIjMTVCOTgxIi8+CjwvZz4KPC9zdmc+')]" />
      
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-white/90 hover:bg-white rounded-2xl p-8 border border-emerald-100/50
                         shadow-lg hover:shadow-emerald-200/50 hover:border-emerald-200/70
                         backdrop-blur-sm hover:backdrop-blur-md overflow-hidden h-full
                         before:content-[''] before:absolute before:inset-0 
                         before:bg-gradient-to-t before:from-emerald-400/3 before:to-transparent
                         before:-skew-x-12 before:opacity-0 before:group-hover:opacity-100
                         before:transition-all before:duration-500"
            >
              {/* Icon Ring */}
              <div className="relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100/80
                              flex items-center justify-center text-2xl shadow-md border-2 border-emerald-200/50
                              group-hover:from-emerald-400/80 group-hover:to-teal-400/80
                              group-hover:shadow-emerald-300/40 group-hover:scale-110
                              group-hover:border-emerald-300/70 group-hover:rotate-6
                              transition-all duration-600 ease-out">
                <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-200/50 group-hover:ring-emerald-400/70" />
                {stat.icon}
              </div>

              {/* Number */}
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900 bg-clip-text text-transparent mb-3 leading-tight">
                {values[i].toLocaleString()}
                <span className="text-xl text-emerald-500 font-normal">+</span>
              </div>

              {/* Label */}
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest group-hover:text-emerald-700
                           transition-all duration-400">
                {stat.label}
              </p>

              {/* Floating accent */}
              <div className="absolute top-4 -right-6 w-12 h-12 bg-emerald-400/10 rounded-xl blur-sm 
                             opacity-0 group-hover:opacity-100 group-hover:translate-x-2
                             transition-all duration-700 -rotate-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
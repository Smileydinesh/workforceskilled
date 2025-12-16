import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { label: "Active Learners", value: 15847 },
  { label: "Live Webinars", value: 450 },
  { label: "Expert Mentors", value: 125 },
  { label: "Partner Companies", value: 850 },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: false });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.85], [80, 0, -60]);

  const [values, setValues] = useState(stats.map(() => 0));

  /* Netflix-style fast smooth count */
  useEffect(() => {
    if (!inView) return;

    stats.forEach((stat, i) => {
      let start = 0;
      const end = stat.value;
      const duration = 900;
      const steps = 60;
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
      style={{ opacity, y }}
      className="relative bg-[#0F3D2E] py-28 overflow-hidden"
    >
      {/* soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E6F5C]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group relative rounded-3xl p-10 text-center
                         bg-white/10 backdrop-blur-xl
                         border border-white/15 shadow-xl"
            >
              {/* NUMBER */}
              <motion.div
                className="text-4xl font-extrabold text-[#FACC15]"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 }}
              >
                {values[i].toLocaleString()}+
              </motion.div>

              {/* LABEL */}
              <p className="mt-3 text-sm tracking-wide text-gray-200 uppercase">
                {stat.label}
              </p>

              {/* subtle neon ring */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl
                           opacity-0 group-hover:opacity-100 transition
                           shadow-[0_0_40px_rgba(250,204,21,0.25)]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

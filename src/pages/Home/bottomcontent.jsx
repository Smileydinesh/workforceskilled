// bottomcontent.jsx (Compact Height Version)
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    title: "Live Expert-Led Training",
    content: "Interactive compliance webinars with real-time Q&A, case studies, and regulatory updates",
    features: ["Real-time interaction", "Expert guidance", "CPE credits"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&crop=center"
  },
  {
    title: "On-Demand Learning Library",
    content: "Access 500+ recorded compliance courses covering OSHA, HR, HIPAA, and industry regulations",
    features: ["24/7 access", "Self-paced learning", "Certificate downloads"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&crop=center"
  },
  {
    title: "Certification & Credits",
    content: "Earn SHRM, HRCI, and CPE credits with comprehensive compliance certification programs",
    features: ["Industry recognized", "Career advancement", "Compliance proof"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center"
  }
];

export default function BottomContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      ref={ref}
      className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.06)_0%,transparent_50%)]" />
      
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 font-semibold text-sm border border-emerald-200/50 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Webinar Excellence
          </div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-900 bg-clip-text text-transparent leading-tight">
            Learning Solutions
          </h2>
        </motion.div>

        {/* Compact Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-12">
          {/* Compact Image */}
          <motion.div
            key={`img-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.95, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-emerald-200/30 bg-white/60 backdrop-blur-xl h-64 lg:h-72 hover:shadow-emerald-300/30">
              <motion.img 
                src={currentTestimonial.image}
                alt={currentTestimonial.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                whileHover={{ scale: 1.05 }}
              />
            </div>

            {/* Compact Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  whileHover={{ scale: 1.3 }}
                  className={`transition-all duration-400 shadow-md rounded-full ${
                    i === currentIndex 
                      ? 'w-16 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-400/40' 
                      : 'w-3 h-3 bg-slate-200/60 hover:bg-emerald-300/70'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Compact Content */}
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 lg:pl-8"
          >
            <motion.h3 
              className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentTestimonial.title}
            </motion.h3>

            <motion.p 
              className="text-lg text-slate-700 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {currentTestimonial.content}
            </motion.p>

            {/* Compact Features */}
            <div className="space-y-3 mb-8">
              {currentTestimonial.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50/50 backdrop-blur-sm rounded-xl border border-emerald-200/30 hover:border-emerald-300/50 hover:shadow-md transition-all duration-400 shadow-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-white font-bold text-xs">{i + 1}</span>
                  </div>
                  <span className="font-semibold text-slate-900 text-base group-hover:text-emerald-800 flex-1">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <Link to="/live-webinars">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-emerald-400/40 hover:from-emerald-700 hover:to-teal-700 transition-all duration-400 border border-emerald-500/40"
              >
                Start Learning
              </motion.button>
            </Link>

          </motion.div>
        </div>

        {/* Compact Progress */}
        <motion.div 
          className="w-full h-1.5 bg-slate-100/60 backdrop-blur-sm rounded-full max-w-2xl mx-auto shadow-sm"
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: 1,
            transition: { duration: 5, repeat: Infinity, repeatType: "loop", ease: "linear" }
          }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full shadow-md"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: 1,
              transition: { duration: 5, repeat: Infinity, repeatType: "loop", ease: "linear" }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

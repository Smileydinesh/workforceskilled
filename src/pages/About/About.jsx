import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiZap,
  FiShield,
  FiBookOpen,
  FiAlertTriangle
} from "react-icons/fi";
import { 
  MdOutlineGroups
} from "react-icons/md";

export default function About() {
  const navigate = useNavigate();
  const glowColor = useMotionValue("#2563EB"); // Changed to corporate blue

  return (
    <main className="bg-gray-50 text-gray-900 overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden"
        style={{
          backgroundImage: useMotionTemplate`
            radial-gradient(140% 120% at 50% 0%, #ffffff 55%, ${glowColor})
          `,
        }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/5"
              initial={{
                y: Math.random() * 100,
                x: Math.random() * 100,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -120],
                x: [null, Math.random() * 60],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 25,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
              style={{
                width: `${Math.random() * 30 + 12}px`,
                height: `${Math.random() * 30 + 12}px`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Glow orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-700/20 to-indigo-500/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-40 text-center z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-white/20 text-blue-900 text-sm font-semibold border border-white/30 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-blue-900 rounded-full border-black animate-pulse" />
            ✨ About WorkForceSkilled
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-5xl text-black md:text-7xl font-bold leading-tight mb-6"
          >
            Building a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-900">
              Compliant Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="mt-6 max-w-3xl mx-auto text-xl text-blue-700 leading-relaxed"
          >
            We're WorkForceSkilled — your trusted partner in navigating the
            complex world of regulatory compliance with confidence and clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <motion.button
              onClick={() => navigate("/live-webinars")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(37,99,235,0)",
                  "0 0 28px rgba(37,99,235,0.35)",
                  "0 0 0px rgba(37,99,235,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="group relative px-8 py-4 rounded-xl bg-white text-black hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/30"
            >
              <span className="relative flex items-center gap-2">
                Explore Training
                <FiZap className="group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl border-2 border-white text-blue-700 hover:bg-white/10 font-semibold backdrop-blur-sm transition-all duration-300"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= ENHANCED OUR SERVICES ================= */}
      <section className="relative py-32 bg-white text-gray-900 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, #2563EB 1px, transparent 1px),
                linear-gradient(180deg, #2563EB 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Subtle blue accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full border border-blue-200 bg-blue-50"
            >
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-black font-semibold text-sm uppercase tracking-wider">
                Our Professional Services
              </span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '0.6s' }} />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '0.8s' }} />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-black mb-6"
            >
              Enterprise Compliance Solutions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-black text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Advanced compliance solutions powered by industry expertise and proven methodologies
              to ensure maximum security and regulatory adherence.
            </motion.p>
          </motion.div>

          {/* Professional Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Workplace Safety",
                desc: "Comprehensive safety programs with real-time monitoring and OSHA compliance automation",
                stat: "500+ Programs",
                icon: <FiShield className="text-2xl" />,
                gradient: "from-blue-600 to-blue-700",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                delay: 0.1,
                features: ["OSHA Compliance", "Real-time monitoring", "Automated reporting"]
              },
              {
                title: "Harassment Prevention",
                desc: "Behavioral training and DEI programs for creating respectful work environments",
                stat: "100K+ Trained",
                icon: <MdOutlineGroups className="text-2xl" />,
                gradient: "from-indigo-600 to-indigo-700",
                bgColor: "bg-indigo-50",
                borderColor: "border-indigo-200",
                delay: 0.2,
                features: ["Behavioral training", "DEI programs", "Anonymous reporting"]
              },
              {
                title: "Regulatory Compliance",
                desc: "Compliance tracking for multiple industries with real-time regulatory updates",
                stat: "25+ Industries",
                icon: <FiBookOpen className="text-2xl" />,
                gradient: "from-slate-600 to-slate-700",
                bgColor: "bg-slate-50",
                borderColor: "border-slate-200",
                delay: 0.3,
                features: ["Multi-industry", "Real-time updates", "Compliance tracking"]
              },
              {
                title: "Risk Management",
                desc: "Predictive risk analysis with actionable insights and mitigation protocols",
                stat: "1000+ Audits",
                icon: <FiAlertTriangle className="text-2xl" />,
                gradient: "from-gray-600 to-gray-700",
                bgColor: "bg-gray-50",
                borderColor: "border-gray-200",
                delay: 0.4,
                features: ["Predictive analysis", "Risk assessment", "Mitigation plans"]
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: service.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -12,
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                className="relative group"
              >
                {/* Card Shadow Effect */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

                {/* Main card */}
                <div className={`relative p-8 rounded-xl ${service.bgColor} border ${service.borderColor} group-hover:border-blue-300 transition-all duration-300 overflow-hidden`}>
                  
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`} />

                  {/* Icon */}
                  <div className="relative mb-8">
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                      className={`relative w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <div className="absolute inset-0 rounded-xl bg-white/20" />
                      <div className="relative z-10 text-white">
                        {service.icon}
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed min-h-[80px]">
                      {service.desc}
                    </p>

                    {/* Features chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <motion.span
                          key={fIdx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: service.delay + fIdx * 0.1 }}
                          className="px-3 py-1.5 rounded-full bg-white text-xs text-gray-600 border border-gray-200 group-hover:border-blue-200 transition-colors duration-300"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* Stat badge */}
                    <div className="pt-4 border-t border-gray-200 group-hover:border-blue-200 transition-colors duration-300">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${service.gradient}`} />
                        <span className="text-sm font-semibold text-gray-700">
                          {service.stat}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-gray-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "99.8%", label: "Client Satisfaction", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
                { value: "50K+", label: "Users Trained", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
                { value: "500+", label: "Companies", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
                { value: "24/7", label: "Support", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className={`text-center p-8 rounded-xl ${stat.bg} border ${stat.border} group hover:border-blue-300 transition-all duration-300`}
                >
                  <div className={`text-4xl font-bold ${stat.color} mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative py-20 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #2563EB 2px, transparent 0)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Ready to Transform Your Compliance Strategy?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto"
          >
            Join thousands of companies who trust WorkForceSkilled for their compliance needs.
          </motion.p>

          
        </div>
      </section>
    </main>
  );
}
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";


import {
  FiZap,
  FiShield,
  FiHeadphones,
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiGlobe,
  FiCheckCircle,
  FiBarChart2,
  FiTarget,
  FiClock,
  FiUserCheck,
  FiMapPin,
  FiStar,
  FiBookOpen,
  FiSettings,
  FiAlertTriangle,
  FiBriefcase
} from "react-icons/fi";
import { 
  MdOutlineSecurity,
  MdOutlineRocketLaunch,
  MdOutlineGroups,
  MdOutlinePublic
} from "react-icons/md";

export default function About() {
  const navigate = useNavigate();
  return (
    <main className="bg-white text-gray-900 overflow-hidden">

    {/* ================= HERO SECTION ================= */}
<motion.section
  className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white overflow-hidden"
  style={{
    backgroundImage: useMotionTemplate`
      radial-gradient(140% 120% at 50% 0%, #020617 55%, ${useMotionValue("#10B981")})
    `,
  }}
>
  {/* Floating particles */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-400/5"
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
  <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full blur-3xl" />
  <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-slate-700/20 to-emerald-500/10 rounded-full blur-3xl" />

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 py-40 text-center z-10">
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold border border-emerald-500/20 backdrop-blur-sm"
    >
      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
      ✨ About WorkForceSkilled
    </motion.span>

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="text-5xl md:text-7xl font-bold leading-tight mb-6"
    >
      Building a{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
        Compliant Future
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      className="mt-6 max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed"
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
            "0 0 0px rgba(16,185,129,0)",
            "0 0 28px rgba(16,185,129,0.35)",
            "0 0 0px rgba(16,185,129,0)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
        className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 font-semibold backdrop-blur-sm transition-all duration-300"
      >
        Get in Touch
      </motion.button>

    </motion.div>
  </div>
</motion.section>


      {/* ================= ENHANCED WHY CHOOSE US ================= */}
{/* ================= WHY CHOOSE US - MODERN DESIGN ================= */}
{/* ================= WHY CHOOSE US - TECH STYLE ================= */}
<section className="relative py-32 bg-gray-950 text-white overflow-hidden">
  {/* Tech grid background */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(90deg, #10B981 1px, transparent 1px),
          linear-gradient(180deg, #10B981 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        backgroundPosition: 'center center'
      }}
    />
    
    {/* Animated lines */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          x: ['100%', '-100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: i * 5,
          ease: "linear"
        }}
        className="absolute top-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
        style={{ top: `${25 * (i + 1)}%` }}
      />
    ))}
  </div>

  {/* Glowing orbs */}
  <div className="absolute top-1/4 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
  <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />

  <div className="relative max-w-7xl mx-auto px-6">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <div className="inline-flex items-center gap-3 mb-8">
        <div className="w-8 h-px bg-gradient-to-r from-emerald-500 to-teal-500" />
        <span className="text-emerald-400 font-mono text-sm tracking-widest">
          // WHY_US
        </span>
        <div className="w-8 h-px bg-gradient-to-r from-teal-500 to-emerald-500" />
      </div>

      <h2 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="text-gray-300">Engineered for</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
          Peak Performance
        </span>
      </h2>

      <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
        Built with cutting-edge technology and proven methodologies to deliver
        unparalleled results in compliance training.
      </p>
    </motion.div>

    {/* Feature Cards - Tech Style */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: <FiZap className="text-2xl" />,
          title: "Blazing Speed",
          description: "Instant deployment with automated setup",
          metric: "≤2h setup",
          gradient: "from-orange-500 to-amber-500",
          delay: 0.1
        },
        {
          icon: <MdOutlineSecurity className="text-2xl" />,
          title: "Ironclad Security",
          description: "Zero-trust architecture with end-to-end encryption",
          metric: "SOC 2 Certified",
          gradient: "from-emerald-500 to-teal-500",
          delay: 0.2,
          featured: true
        },
        {
          icon: <FiHeadphones className="text-2xl" />,
          title: "Premium Support",
          description: "Dedicated experts available round the clock",
          metric: "24/7/365",
          gradient: "from-cyan-500 to-blue-500",
          delay: 0.3
        },
        {
          icon: <FiTrendingUp className="text-2xl" />,
          title: "Maximum ROI",
          description: "Proven track record of measurable success",
          metric: "98% Success",
          gradient: "from-purple-500 to-pink-500",
          delay: 0.4
        }
      ].map((feature) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: feature.delay }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          {/* Glowing border */}
          <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-30 blur group-hover:opacity-60 transition-all duration-500`} />

          <div className="relative p-8 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-800 group-hover:border-gray-700 transition-all duration-300">
            {/* Icon with glow */}
            <motion.div
              whileHover={{ 
                rotate: 360,
                scale: 1.2
              }}
              transition={{ duration: 0.5 }}
              className={`relative w-14 h-14 mb-6 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br opacity-50 blur" />
              {feature.icon}
            </motion.div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Metric */}
              <div className="pt-4 border-t border-gray-800">
                <div className="inline-flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${feature.gradient}`} />
                  <span className="text-sm font-mono text-gray-300">
                    {feature.metric}
                  </span>
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 animate-pulse" />
            </div>
          </div>

          {/* Featured badge */}
          {feature.featured && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-xs font-bold uppercase tracking-wider shadow-lg border border-emerald-400/30">
                Recommended
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Tech stats */}
    {/* <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      viewport={{ once: true }}
      className="mt-20 pt-10 border-t border-gray-800"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: "10K+", label: "Active Users", icon: "👥" },
          { value: "500+", label: "Companies", icon: "🏢" },
          { value: "99.9%", label: "Uptime", icon: "⚡" },
          { value: "<2min", label: "Response Time", icon: "⚡" }
        ].map((stat, idx) => (
          <div key={idx} className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="text-2xl font-bold text-emerald-400 mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div> */}
  </div>
</section>

      {/* ================= ENHANCED OUR EXPERTISE ================= */}
    <section className="relative py-32 bg-gray-950 text-white overflow-hidden">
  {/* Animated tech background */}
  <div className="absolute inset-0 opacity-5">
    {/* Matrix grid */}
    <div className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(90deg, #10B981 1px, transparent 1px),
          linear-gradient(180deg, #10B981 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
    
    {/* Tiny moving balls */}
    {[...Array(40)].map((_, i) => (
      <motion.div
        key={`ball-${i}`}
        animate={{
          y: [0, -100, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          delay: Math.random() * 10,
          ease: "easeInOut"
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
    
    {/* Scanning lines */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`scan-${i}`}
        animate={{
          y: ['0%', '100%']
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          delay: i * 4,
          ease: "linear"
        }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
        style={{ top: `${33 * (i + 1)}%` }}
      />
    ))}
  </div>

  {/* Glowing orbs */}
  <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-full blur-3xl" />
  <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl" />

  <div className="relative max-w-7xl mx-auto px-6 z-10">
    {/* Header with tech styling */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-20"
    >
      {/* Tech indicator */}
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
        className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm"
      >
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        <span className="text-emerald-400 font-mono text-sm tracking-[0.2em] uppercase">
          OUR_SERVICES
        </span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
      >
        <span className="text-gray-300 font-light">Specialized</span>
        <motion.span
          animate={{
            textShadow: [
              '0 0 20px rgba(249, 115, 22, 0.3)',
              '0 0 30px rgba(249, 115, 22, 0.5)',
              '0 0 20px rgba(249, 115, 22, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"
        >
          Our Expertise
        </motion.span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-light"
      >
        Advanced compliance solutions powered by AI and machine learning algorithms
        to ensure maximum security and regulatory adherence.
      </motion.p>
    </motion.div>

    {/* Cyber Expertise Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "Workplace Safety",
          desc: "AI-powered safety monitoring with real-time threat detection and OSHA compliance automation",
          stat: "500+ Programs",
          icon: <FiShield className="text-2xl" />,
          gradient: "from-cyan-500 to-blue-500",
          borderGlow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
          delay: 0.1,
          features: ["AI threat detection", "Real-time alerts", "Automated reporting"]
        },
        {
          title: "Harassment Prevention",
          desc: "Behavioral analytics and DEI integration for creating secure, respectful work environments",
          stat: "100K+ Trained",
          icon: <MdOutlineGroups className="text-2xl" />,
          gradient: "from-emerald-500 to-teal-500",
          borderGlow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]",
          delay: 0.2,
          features: ["Behavioral analytics", "DEI integration", "Anonymous reporting"]
        },
        {
          title: "Regulatory Compliance",
          desc: "Automated compliance tracking for 25+ industries with real-time regulatory updates",
          stat: "25+ Industries",
          icon: <FiBookOpen className="text-2xl" />,
          gradient: "from-green-500 to-emerald-500",
          borderGlow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]",
          delay: 0.3,
          features: ["Auto-tracking", "Real-time updates", "Multi-industry"]
        },
        {
          title: "Risk Management",
          desc: "Predictive risk analysis with AI-powered insights and automated mitigation protocols",
          stat: "1000+ Audits",
          icon: <FiAlertTriangle className="text-2xl" />,
          gradient: "from-orange-500 to-yellow-500",
          borderGlow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]",
          delay: 0.4,
          features: ["Predictive analysis", "AI insights real time", "Auto-mitigation"]
        }
      ].map((expertise, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.7, 
            delay: expertise.delay,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ 
            y: -12,
            scale: 1.05,
            transition: { 
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          className="relative group"
        >
          {/* Floating tiny balls around card */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`card-ball-${idx}-${i}`}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 6,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br ${expertise.gradient}`}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                zIndex: -1,
              }}
            />
          ))}

          {/* Holographic border glow */}
          <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-br ${expertise.gradient} opacity-0 group-hover:opacity-100 blur transition-all duration-500 ${expertise.borderGlow}`} />

          {/* Main card */}
          <div className="relative p-8 rounded-xl bg-gray-900/70 backdrop-blur-sm border border-gray-800 group-hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">
            
            {/* Matrix code effect inside card */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, currentColor 1px, transparent 1px),
                    linear-gradient(180deg, currentColor 1px, transparent 1px)
                  `,
                  backgroundSize: '15px 15px',
                }}
              />
            </div>

            {/* Icon with cyber effects */}
            <div className="relative mb-8">
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-emerald-500/20"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-emerald-500/10"
              />

              {/* Icon container with spin */}
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2,
                  transition: { 
                    rotate: { duration: 0.6, ease: "easeInOut" },
                    scale: { duration: 0.3 }
                  }
                }}
                className={`relative w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${expertise.gradient} flex items-center justify-center shadow-2xl`}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-50 blur-sm" />
                
                {/* Icon */}
                <div className="relative z-10">
                  {expertise.icon}
                </div>

                {/* Pulsing effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-xl border-2 border-white/20"
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative space-y-4">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                {expertise.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed min-h-[80px]">
                {expertise.desc}
              </p>

              {/* Features chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {expertise.features.map((feature, fIdx) => (
                  <motion.span
                    key={fIdx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: expertise.delay + fIdx * 0.1 }}
                    className="px-3 py-1.5 rounded-full bg-gray-800/50 text-xs text-gray-400 border border-gray-700 group-hover:border-emerald-500/30 transition-colors duration-300"
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>

              {/* Stat badge with cyber look */}
              <div className="pt-4 border-t border-gray-800 group-hover:border-emerald-500/30 transition-colors duration-300">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-900/80 border border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                  <span className="text-sm font-mono text-emerald-400 font-bold">
                    {expertise.stat}
                  </span>
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Cyber stats bar */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
      className="mt-20 pt-10 border-t border-gray-800/50"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { 
            value: "500+", 
            label: "Safety Programs", 
            icon: "🛡️",
            gradient: "from-cyan-500 to-blue-500"
          },
          { 
            value: "100K+", 
            label: "Professionals", 
            icon: "👥",
            gradient: "from-emerald-500 to-teal-500"
          },
          { 
            value: "25+", 
            label: "Industries", 
            icon: "🏢",
            gradient: "from-green-500 to-emerald-500"
          },
          { 
            value: "1000+", 
            label: "Audits", 
            icon: "📊",
            gradient: "from-orange-500 to-yellow-500"
          }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="text-center p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 group hover:border-emerald-500/30 transition-all duration-300"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
              className="text-3xl mb-3"
            >
              {stat.icon}
            </motion.div>
            <div className={`text-3xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">
              {stat.label}
            </div>
            
            {/* Tiny balls around stats */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`stat-ball-${idx}-${i}`}
                animate={{
                  y: [0, -8, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 rounded-full bg-emerald-400/50"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</section>


      {/* ================= ENHANCED BY THE NUMBERS ================= */}
      <section className="relative py-28 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-slate-700/10 to-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold border border-emerald-500/30 backdrop-blur-sm">
              <FiBarChart2 />
              By the Numbers
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Excellence in <span className="text-emerald-400">Every Metric</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Our commitment to excellence is reflected in every number we achieve
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "99%", label: "Client Satisfaction", icon: <FiStar />, delay: 0.1 },
              { value: "24/7", label: "Support Available", icon: <FiClock />, delay: 0.2 },
              { value: "50+", label: "Expert Trainers", icon: <FiUserCheck />, delay: 0.3 },
              { value: "15+", label: "Countries Served", icon: <MdOutlinePublic />, delay: 0.4 }
            ].map((stat, idx) => (
              <EnhancedStatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= ENHANCED OUR TEAM ================= */}
      <section className="py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
                <FiUsers />
                Our Team
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Built by <span className="text-cyan-600">Experts</span>, Driven by <span className="text-orange-600">Passion</span>
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                Our team consists of industry veterans, certified trainers, and
                compliance specialists dedicated to your success with decades of combined experience.
              </p>

              <ul className="space-y-6">
                {[
                  {
                    icon: <FiUsers className="text-xl" />,
                    title: "Expert Team",
                    desc: "50+ certified compliance professionals with advanced degrees",
                    color: "bg-emerald-100 text-emerald-600"
                  },
                  {
                    icon: <FiAward className="text-xl" />,
                    title: "Industry Recognition",
                    desc: "Multiple awards and certifications including SHRM & HRCI",
                    color: "bg-yellow-100 text-yellow-600"
                  },
                  {
                    icon: <FiGlobe className="text-xl" />,
                    title: "Global Reach",
                    desc: "Operating in 15+ countries with multilingual support",
                    color: "bg-blue-100 text-blue-600"
                  }
                ].map((point, idx) => (
                  <EnhancedTeamPoint key={idx} {...point} delay={idx * 0.1} />
                ))}
              </ul>
            </motion.div>

            {/* Enhanced Team Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="relative h-48 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
                      <FiTarget className="text-white text-xl" />
                    </div>
                    <span className="font-semibold text-gray-800">Expert Trainers</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="relative h-48 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                      <FiSettings className="text-white text-xl" />
                    </div>
                    <span className="font-semibold text-gray-800">Process Experts</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="relative col-span-2 h-40 rounded-2xl bg-white shadow-xl overflow-hidden group border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50" />
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute right-4 top-4 text-6xl opacity-10"
                  >
                    ⭐
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg">
                    <FiAward />
                    Best Team 2025 – Industry Recognition
                  </span>
                  <p className="text-gray-600 text-sm mt-4 text-center">
                    Awarded by Compliance Professionals Association
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= ENHANCED COMPONENTS ================= */

function EnhancedFeatureCard({ icon, title, desc, accent, iconColor, highlight, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: highlight ? 1.05 : 1.02 }}
      className={`group relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 ${highlight && "border-emerald-200"}`}
    >
      {/* Hover background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
      
      {/* Highlight border effect */}
      {highlight && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      )}
      
      <div className="relative">
        <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="font-bold text-xl mb-3 group-hover:text-emerald-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {desc}
        </p>
        
        {/* Animated arrow on hover */}
        <div className="mt-6 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
          <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

function EnhancedExpertiseCard({ title, desc, stat, icon, bg, border, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`group relative p-8 rounded-2xl bg-gradient-to-br ${bg} border ${border} hover:shadow-xl transition-all duration-300 overflow-hidden`}
    >
      {/* Floating icon background */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -right-4 -bottom-4 text-6xl opacity-5"
      >
        {icon}
      </motion.div>
      
      <div className="relative">
        <div className="w-12 h-12 mb-6 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700">
          {icon}
        </div>
        <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">{desc}</p>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-emerald-700 font-semibold text-sm shadow-sm">
          {stat}
        </span>
      </div>
    </motion.div>
  );
}

function EnhancedStatCard({ value, label, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-emerald-400/30 hover:bg-white/15 transition-all duration-300"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-300">
          {icon}
        </div>
        <h3 className="text-4xl font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
          {value}
        </h3>
        <p className="text-slate-300 text-sm font-medium">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

function EnhancedTeamPoint({ icon, title, desc, color, delay }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ x: 10 }}
      className="flex items-start gap-5 group"
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg mb-1 group-hover:text-emerald-700 transition-colors duration-300">
          {title}
        </p>
        <p className="text-gray-600">
          {desc}
        </p>
      </div>
    </motion.li>
  );
}
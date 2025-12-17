import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { useEffect } from "react";



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
      ✨ About ComplianceTrained
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
      We're ComplianceTrained — your trusted partner in navigating the
      complex world of regulatory compliance with confidence and clarity.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      className="mt-12 flex flex-wrap justify-center gap-4"
    >
      <motion.button
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
      <section className="py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
              <FiCheckCircle />
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for <span className="text-emerald-600">Your Success</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
              Everything you need to achieve and maintain compliance excellence with industry-leading solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiZap className="text-2xl" />,
                title: "Fast Implementation",
                desc: "Get started in days, not months with our streamlined onboarding process",
                accent: "from-orange-100 to-orange-50",
                iconColor: "text-orange-600",
                delay: 0.1
              },
              {
                icon: <MdOutlineSecurity className="text-2xl" />,
                title: "100% Secure",
                desc: "Enterprise-grade security with SOC 2 Type II certification",
                accent: "from-emerald-100 to-emerald-50",
                iconColor: "text-emerald-600",
                highlight: true,
                delay: 0.2
              },
              {
                icon: <FiHeadphones className="text-2xl" />,
                title: "Expert Support",
                desc: "24/7 dedicated customer success team with average 2-minute response",
                accent: "from-pink-100 to-pink-50",
                iconColor: "text-pink-600",
                delay: 0.3
              },
              {
                icon: <FiTrendingUp className="text-2xl" />,
                title: "Proven Results",
                desc: "98% client success rate with measurable compliance improvements",
                accent: "from-indigo-100 to-indigo-50",
                iconColor: "text-indigo-600",
                delay: 0.4
              }
            ].map((feature, idx) => (
              <EnhancedFeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= ENHANCED OUR EXPERTISE ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
              <FiBriefcase />
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-orange-600">Expertise</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive compliance solutions across multiple domains with proven track record
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Workplace Safety",
                desc: "Comprehensive safety training programs with OSHA compliance",
                stat: "500+ Programs",
                icon: <FiShield className="text-2xl" />,
                bg: "from-cyan-50 to-blue-50",
                border: "border-cyan-200",
                delay: 0.1
              },
              {
                title: "Harassment Prevention",
                desc: "Creating respectful work environments with DEI integration",
                stat: "100K+ Trained",
                icon: <MdOutlineGroups className="text-2xl" />,
                bg: "from-emerald-50 to-teal-50",
                border: "border-emerald-200",
                delay: 0.2
              },
              {
                title: "Regulatory Compliance",
                desc: "Industry-specific compliance solutions for 25+ sectors",
                stat: "25+ Industries",
                icon: <FiBookOpen className="text-2xl" />,
                bg: "from-green-50 to-emerald-50",
                border: "border-green-200",
                delay: 0.3
              },
              {
                title: "Risk Management",
                desc: "Identify and mitigate organizational risks with AI-powered insights",
                stat: "1000+ Audits",
                icon: <FiAlertTriangle className="text-2xl" />,
                bg: "from-orange-50 to-yellow-50",
                border: "border-orange-200",
                delay: 0.4
              }
            ].map((expertise, idx) => (
              <EnhancedExpertiseCard key={idx} {...expertise} />
            ))}
          </div>
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
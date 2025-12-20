import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCheckCircle, 
  FiBookOpen, 
  FiUser, 
  FiShield,
  FiCreditCard,
  FiLock,
  FiFileText,
  FiAlertTriangle,
  FiRefreshCw,
  FiGlobe,
  FiMail,
  FiChevronRight,
  FiBook,
  FiTerminal,
  FiUsers,
  FiAward,
  FiBriefcase
} from "react-icons/fi";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms", icon: FiCheckCircle, color: "from-emerald-600 to-teal-500", badge: "Required" },
  { id: "services", title: "Services", icon: FiBookOpen, color: "from-amber-500 to-yellow-400", badge: "Overview" },
  { id: "account", title: "Account Registration", icon: FiUser, color: "from-blue-500 to-indigo-400", badge: "Account" },
  { id: "usage", title: "Use of Services", icon: FiShield, color: "from-red-500 to-pink-400", badge: "Restrictions" },
  { id: "payment", title: "Payment & Subscriptions", icon: FiCreditCard, color: "from-green-500 to-emerald-400", badge: "Financial" },
  { id: "intellectual", title: "Intellectual Property", icon: FiLock, color: "from-purple-500 to-violet-400", badge: "Legal" },
  { id: "privacy", title: "Privacy", icon: FiFileText, color: "from-teal-500 to-cyan-400", badge: "Data" },
  { id: "liability", title: "Limitation of Liability", icon: FiAlertTriangle, color: "from-orange-500 to-amber-400", badge: "Legal" },
  { id: "termination", title: "Termination", icon: FiTerminal, color: "from-rose-500 to-pink-400", badge: "Account" },
  { id: "amendments", title: "Amendments", icon: FiRefreshCw, color: "from-indigo-500 to-blue-400", badge: "Updates" },
  { id: "law", title: "Governing Law", icon: FiGlobe, color: "from-slate-600 to-gray-500", badge: "Legal" },
  { id: "contact", title: "Contact Information", icon: FiMail, color: "from-emerald-700 to-green-600", badge: "Support" }
];

export default function TermsConditions() {
  const [activeId, setActiveId] = useState("acceptance");
  const [sidebarProgress, setSidebarProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            
            // Calculate sidebar progress
            const allSections = sections.map(sec => sec.id);
            const currentIndex = allSections.indexOf(entry.target.id);
            const progress = ((currentIndex + 1) / allSections.length) * 100;
            setSidebarProgress(progress);
          }
        });
      },
      { 
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0.1
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      
      const allSections = sections.map(sec => sec.id);
      const newIndex = allSections.indexOf(id);
      const newProgress = ((newIndex + 1) / allSections.length) * 100;
      setSidebarProgress(newProgress);
      setActiveId(id);
    }
  };

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header with animated background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative max-w-6xl mx-auto px-6 py-28 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
          >
            <FiBook className="text-amber-300 animate-pulse" />
            <span className="text-sm font-medium text-emerald-100">Legal Documentation</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
          >
            <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent animate-gradient-x">
              Terms & Conditions
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-emerald-200 max-w-4xl mx-auto mb-12 leading-relaxed font-light"
          >
            Please review our terms carefully before using our enterprise learning platform
          </motion.p>
          
          {/* Stats indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-12 mt-16"
          >
            <div className="text-center group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 rounded-full blur group-hover:blur-xl transition-all duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <FiUsers className="w-10 h-10 text-amber-300 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">12</div>
                  <div className="text-sm text-emerald-300 font-medium">Key Sections</div>
                </div>
              </div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur group-hover:blur-xl transition-all duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <FiBriefcase className="w-10 h-10 text-emerald-300 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">Legal</div>
                  <div className="text-sm text-emerald-300 font-medium">Compliance</div>
                </div>
              </div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur group-hover:blur-xl transition-all duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <FiAward className="w-10 h-10 text-teal-300 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">Updated</div>
                  <div className="text-sm text-emerald-300 font-medium">December 2025</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-sm text-emerald-300 flex items-center justify-center gap-3"
          >
            <FiRefreshCw className="animate-spin-slow" />
            Last updated: December 20, 2025 • Binding legal agreement
          </motion.p>
        </motion.div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Enhanced sidebar with scrolling indicator */}
        <aside className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`sticky top-32 bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 ${
              isScrolling ? 'shadow-emerald-500/20' : ''
            }`}
          >
            {/* Scrolling progress indicator */}
            <div className="h-1.5 bg-slate-100 w-full relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: `${sidebarProgress}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              />
              <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-semibold text-slate-500">
                {Math.round(sidebarProgress)}%
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg"
                >
                  <FiBook className="text-white text-xl" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Table of Contents</h3>
                  <p className="text-sm text-slate-600">
                    Navigating legal requirements
                  </p>
                </div>
              </div>
              
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeId === sec.id;
                  
                  return (
                    <motion.li
                      key={sec.id}
                      variants={itemVariants}
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(sec.id)}
                      className={`cursor-pointer rounded-xl transition-all duration-300 overflow-hidden group ${
                        isActive 
                          ? `bg-gradient-to-r ${sec.color} shadow-lg`
                          : "hover:bg-slate-100/80"
                      }`}
                    >
                      <div className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="active-section-indicator"
                            className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/80"
                            initial={false}
                          />
                        )}
                        <div className={`flex items-center justify-between px-4 py-4 ${
                          isActive ? 'text-white' : 'text-slate-700'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              isActive 
                                ? "bg-white/20 backdrop-blur-sm" 
                                : `bg-gradient-to-r ${sec.color} shadow-md`
                            }`}>
                              <Icon className={isActive ? "text-white" : "text-white"} />
                            </div>
                            <div>
                              <span className="font-medium text-sm block">{sec.title}</span>
                              <span className={`text-xs mt-0.5 ${
                                isActive ? 'text-white/80' : 'text-slate-500'
                              }`}>
                                {sec.badge}
                              </span>
                            </div>
                          </div>
                          
                          {isActive ? (
                            <motion.div
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <FiChevronRight className="text-white ml-2" />
                            </motion.div>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-slate-400 transition-colors" />
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
              
              {/* Sidebar footer with legal note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 pt-6 border-t border-slate-200 space-y-4"
              >
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <FiAlertTriangle className="text-emerald-600 flex-shrink-0" />
                    <p className="text-sm text-emerald-800 font-medium">
                      These terms constitute a binding legal agreement
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => scrollToSection("acceptance")}
                    className="text-xs text-slate-500 hover:text-emerald-600 transition-colors"
                  >
                    Back to top ↑
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </aside>

        {/* Main content with staggered animations */}
        <main className="lg:col-span-3 space-y-10">
          <AnimatePresence mode="wait">
            {sections.map((sec, index) => {
              const Icon = sec.icon;
              
              return (
                <motion.section
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden scroll-mt-32 group relative"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Section header */}
                  <div className={`relative bg-gradient-to-r ${sec.color} px-10 py-8`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative flex items-start justify-between">
                      <div className="flex items-start gap-6">
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          className="p-4 rounded-2xl bg-white/20 backdrop-blur-lg shadow-lg"
                        >
                          <Icon className="text-white text-3xl" />
                        </motion.div>
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">{sec.title}</h2>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-white/20 text-white/90 text-xs font-medium backdrop-blur-sm">
                              Section {index + 1}
                            </span>
                            <span className="text-white/70 text-sm">
                              {sec.badge} • Legal terms
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="hidden lg:block opacity-20"
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-white/30" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Section content */}
                  <div className="p-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.08 + 0.3 }}
                      className="text-slate-700 leading-relaxed text-base"
                    >
                      {renderSectionContent(sec.id, sec.title)}
                    </motion.div>
                    
                    {/* Content-specific interactive elements */}
                    {renderSectionExtras(sec.id)}
                  </div>
                </motion.section>
              );
            })}
          </AnimatePresence>
          
          {/* Terms acceptance footer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-teal-900/10 rounded-3xl border border-emerald-200/50 p-10 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 shadow-lg">
                    <FiCheckCircle className="text-white text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Acceptance Required</h3>
                    <p className="text-slate-600 max-w-xl">
                      By using PeopleSkillTraining services, you acknowledge and agree to be bound by these terms.
                    </p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(5, 150, 105, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold text-lg flex items-center gap-3 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                >
                  <FiCheckCircle />
                  Acknowledge Terms
                </motion.button>
              </div>
              
              <div className="mt-10 pt-8 border-t border-emerald-200/50">
                <p className="text-center text-sm text-slate-500">
                  Terms & Conditions last updated: December 20, 2025 • PeopleSkillTraining Inc. • All rights reserved
                </p>
                <p className="text-center text-xs text-slate-400 mt-3">
                  Version 3.2.1 • Effective immediately upon publication
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.2; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Enhanced section content rendering
function renderSectionContent(sectionId, title) {
  const content = {
    "acceptance": {
      main: "By accessing or using the services provided by PeopleSkillTraining, you explicitly acknowledge and agree to be legally bound by these comprehensive Terms & Conditions. If you disagree with any provision herein, you must immediately discontinue use of our website, platforms, and all associated services.",
      points: [
        "Continuing to browse or use our services constitutes acceptance",
        "These terms apply to all users, visitors, and customers",
        "Supplemental terms may apply to specific services"
      ]
    },
    "services": {
      main: "PeopleSkillTraining delivers enterprise-grade online training, compliance webinars, professional certification programs, learning resources, and strategic consulting services specifically designed to empower organizations in maintaining regulatory compliance, enhancing workforce capabilities, and achieving operational excellence.",
      points: [
        "Customizable corporate training solutions",
        "Live and recorded expert-led webinars",
        "Compliance monitoring and reporting tools",
        "Dedicated account management for enterprise clients"
      ]
    },
    "account": {
      main: "Access to premium features requires account registration. You warrant that all provided information is accurate, current, and complete. Account credentials are confidential and non-transferable. You accept full responsibility for all activities conducted under your account.",
      points: [
        "Minimum age requirement: 18 years",
        "One account per individual user",
        "Enterprise accounts may have multiple sub-users",
        "Immediate notification required for security breaches"
      ]
    },
    "usage": {
      main: "You expressly agree not to engage in prohibited activities, including but not limited to:",
      points: [
        "Utilizing services for unlawful, fraudulent, or harmful purposes",
        "Attempting unauthorized access to systems, networks, or data",
        "Distributing malware, viruses, or disruptive content",
        "Reproducing, reselling, or commercially exploiting content without written authorization",
        "Circumventing security measures or access controls",
        "Harassing, intimidating, or discriminating against other users"
      ]
    },
    "payment": {
      main: "Selected services require payment processing. Subscription services automatically renew according to billing cycles until formally cancelled. All fees are exclusive of applicable taxes, which remain your responsibility. Payment disputes must be submitted within 30 days of charge.",
      points: [
        "Annual, quarterly, and monthly billing options available",
        "Enterprise contracts may have custom payment terms",
        "Failed payments may result in service suspension",
        "Price changes communicated 30 days in advance"
      ]
    },
    "intellectual": {
      main: "All proprietary content—including course materials, trademarks, logos, software, documentation, methodologies, and platform interfaces—constitutes intellectual property owned by PeopleSkillTraining and its licensors, protected under copyright, trademark, and other applicable laws.",
      points: [
        "Limited license granted for personal/non-commercial use",
        "No derivative works permitted without express consent",
        "User-generated content licenses granted to PeopleSkillTraining",
        "Infringement claims handled per DMCA procedures"
      ]
    },
    "privacy": {
      main: "Data collection, processing, and protection practices are comprehensively detailed in our Privacy Policy, which is incorporated by reference. Our commitment to data security includes encryption, access controls, and regular security audits.",
      points: [
        "GDPR and CCPA compliance frameworks implemented",
        "Data processing agreements available for review",
        "User data rights clearly defined and accessible",
        "Third-party data sharing disclosures provided"
      ]
    },
    "liability": {
      main: "To the maximum extent permitted by law, PeopleSkillTraining and its affiliates shall not be liable for indirect, incidental, special, consequential, or punitive damages. Total liability for any claims shall not exceed fees paid during the preceding six-month period.",
      points: [
        "No warranty of uninterrupted or error-free service",
        "Service modifications may occur without liability",
        "Third-party content and links disclaimed",
        "Force majeure events excluded from liability"
      ]
    },
    "termination": {
      main: "We reserve the right to suspend or terminate accounts for violations of these terms, fraudulent activities, or operational necessities. Users may terminate accounts through platform settings, with certain data retention obligations as outlined in our data policy.",
      points: [
        "30-day cure period for minor violations",
        "Immediate termination for severe breaches",
        "Data export options available upon termination",
        "Post-termination obligations may apply"
      ]
    },
    "amendments": {
      main: "PeopleSkillTraining may modify these terms to reflect evolving services, legal requirements, or business operations. Material changes will be communicated through prominent notifications. Continued usage following updates constitutes acceptance of revised terms.",
      points: [
        "Version history available upon request",
        "Major changes communicated 30 days in advance",
        "Enterprise clients receive personalized notifications",
        "Archived versions maintained for compliance"
      ]
    },
    "law": {
      main: "These Terms & Conditions are governed by the laws of the State of California, without regard to conflict of law principles. Exclusive jurisdiction for disputes resides in the courts located within San Francisco County, California.",
      points: [
        "Arbitration provisions for certain dispute types",
        "Class action waivers included",
        "Severability of provisions maintained",
        "English language version controls"
      ]
    },
    "contact": {
      main: "For inquiries regarding these terms, legal notices, or compliance matters, please utilize the following official channels:",
      points: [
        "Primary legal communications: legal@peopleskilltraining.com",
        "General support: support@peopleskilltraining.com",
        "Data protection inquiries: dpo@peopleskilltraining.com",
        "Physical correspondence to corporate headquarters"
      ]
    }
  };

  const section = content[sectionId];
  if (!section) return null;

  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">{section.main}</p>
      
      {section.points && section.points.length > 0 && (
        <ul className="space-y-3">
          {section.points.map((point, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 text-slate-600"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
              {point}
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Additional interactive elements per section
function renderSectionExtras(sectionId) {
  switch(sectionId) {
    case "usage":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-slate-200"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-100">
            <div className="flex items-center gap-4 mb-4">
              <FiAlertTriangle className="text-red-500 text-2xl" />
              <h4 className="font-bold text-red-800">Prohibited Activities</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["Commercial Resale", "Reverse Engineering", "Automated Scraping", "Service Disruption"].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white border border-red-200 text-sm text-red-700">
                  ⛔ {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    
    case "intellectual":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-slate-200"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">©</div>
              <div className="text-sm text-slate-600">Copyright</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">™</div>
              <div className="text-sm text-slate-600">Trademark</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">®</div>
              <div className="text-sm text-slate-600">Registered</div>
            </div>
          </div>
        </motion.div>
      );
    
    case "privacy":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-slate-200"
        >
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
            <p className="text-sm text-teal-800">
              <strong>Related Document:</strong> Our comprehensive Privacy Policy details data handling practices, 
              user rights, and security measures. Review it for complete understanding.
            </p>
          </div>
        </motion.div>
      );
    
    case "contact":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-slate-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-3">Primary Contact</h4>
              <p className="text-lg font-semibold text-emerald-700">support@peopleskilltraining.com</p>
              <p className="text-sm text-emerald-600 mt-2">Mon-Fri, 9AM-6PM EST</p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3">Legal Department</h4>
              <p className="text-lg font-semibold text-slate-700">legal@peopleskilltraining.com</p>
              <p className="text-sm text-slate-600 mt-2">Formal notices only</p>
            </div>
          </div>
        </motion.div>
      );
    
    default:
      return null;
  }
}
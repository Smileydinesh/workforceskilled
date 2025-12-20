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
  FiBriefcase,
  FiArrowRight
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Compact Professional Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            >
              <FiBook className="text-amber-300 text-sm" />
              <span className="text-xs font-medium text-emerald-100 tracking-wide">LEGAL DOCUMENTATION</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            >
              <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
                Terms & Conditions
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-emerald-200 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Legal agreement governing the use of WorkForceSkilled platform
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <FiUsers className="text-amber-300 text-sm" />
                  <div className="text-xl font-semibold text-white">12</div>
                </div>
                <div className="text-xs text-emerald-300 font-medium">SECTIONS</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <FiBriefcase className="text-emerald-300 text-sm" />
                  <div className="text-xl font-semibold text-white">LEGAL</div>
                </div>
                <div className="text-xs text-emerald-300 font-medium">BINDING</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <FiAward className="text-teal-300 text-sm" />
                  <div className="text-xl font-semibold text-white">2025</div>
                </div>
                <div className="text-xs text-emerald-300 font-medium">UPDATED</div>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-emerald-300 flex items-center justify-center gap-2"
            >
              <FiRefreshCw className="text-xs" />
              Last updated: December 20, 2025
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`sticky top-28 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 ${
              isScrolling ? 'shadow-emerald-500/10' : ''
            }`}
          >
            <div className="h-1 bg-slate-100 w-full relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                initial={{ width: "0%" }}
                animate={{ width: `${sidebarProgress}%` }}
                transition={{ type: "spring", stiffness: 90, damping: 15 }}
              />
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 shadow"
                >
                  <FiBook className="text-white text-base" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">CONTENTS</h3>
                  <p className="text-xs text-slate-500">
                    Section {sections.findIndex(s => s.id === activeId) + 1} of {sections.length}
                  </p>
                </div>
              </div>
              
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeId === sec.id;
                  
                  return (
                    <motion.li
                      key={sec.id}
                      variants={itemVariants}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(sec.id)}
                      className={`cursor-pointer rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? `bg-gradient-to-r ${sec.color} shadow-md`
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="active-indicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-white/80 rounded-r"
                            initial={false}
                          />
                        )}
                        <div className={`flex items-center justify-between px-4 py-3 ${
                          isActive ? 'text-white' : 'text-slate-700'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-md ${
                              isActive 
                                ? "bg-white/20" 
                                : `bg-gradient-to-r ${sec.color}`
                            }`}>
                              <Icon className={isActive ? "text-white" : "text-white text-sm"} />
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
                          
                          {isActive && (
                            <motion.div
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <FiChevronRight className="text-white ml-1 text-sm" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-slate-200"
              >
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                  <p className="text-xs text-emerald-800 font-medium">
                    These terms constitute a binding legal agreement
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-8">
          <AnimatePresence>
            {sections.map((sec, index) => {
              const Icon = sec.icon;
              
              return (
                <motion.section
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    delay: index * 0.06,
                    type: "spring",
                    stiffness: 120,
                    damping: 15
                  }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden scroll-mt-32 group"
                >
                  {/* Section Header */}
                  <div className={`relative bg-gradient-to-r ${sec.color} px-6 py-5`}>
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="relative flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          className="p-2.5 rounded-lg bg-white/20 backdrop-blur-sm shadow"
                        >
                          <Icon className="text-white text-lg" />
                        </motion.div>
                        <div>
                          <h2 className="text-lg font-bold text-white mb-1">{sec.title}</h2>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white/90 text-xs font-medium">
                              Section {index + 1}
                            </span>
                            <span className="text-white/70 text-xs">
                              {sec.badge}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Section Content */}
                  <div className="p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.06 + 0.2 }}
                      className="text-slate-700 leading-relaxed text-sm"
                    >
                      {renderSectionContent(sec.id, sec.title)}
                    </motion.div>
                    
                    {/* Interactive Elements */}
                    {renderSectionExtras(sec.id)}
                  </div>
                </motion.section>
              );
            })}
          </AnimatePresence>
          
          {/* Professional Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  
                  
                </div>
                
                
              </div>
              
              <div className="">
                <p className="text-center text-xs text-slate-500">
                  Terms & Conditions last updated: December 20, 2025 • WorkForceSkilled Inc. • All rights reserved
                </p>
            
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// Enhanced section content rendering
function renderSectionContent(sectionId, title) {
  const content = {
    "acceptance": {
      main: "By accessing or using the services provided by WorkForceSkilled, you explicitly acknowledge and agree to be legally bound by these comprehensive Terms & Conditions.",
      points: [
        "Continuing to browse or use our services constitutes acceptance",
        "These terms apply to all users, visitors, and customers",
        "Supplemental terms may apply to specific services"
      ]
    },
    "services": {
      main: "WorkForceSkilled delivers enterprise-grade online training, compliance webinars, professional certification programs, and strategic consulting services.",
      points: [
        "Customizable corporate training solutions",
        "Live and recorded expert-led webinars",
        "Compliance monitoring and reporting tools",
        "Dedicated account management for enterprise clients"
      ]
    },
    "account": {
      main: "Access to premium features requires account registration. You warrant that all provided information is accurate, current, and complete.",
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
        "Utilizing services for unlawful or fraudulent purposes",
        "Attempting unauthorized access to systems or data",
        "Distributing harmful or disruptive content",
        "Reproducing content without written authorization"
      ]
    },
    "payment": {
      main: "Selected services require payment processing. Subscription services automatically renew according to billing cycles until formally cancelled.",
      points: [
        "Annual, quarterly, and monthly billing options available",
        "Enterprise contracts may have custom payment terms",
        "Failed payments may result in service suspension",
        "Price changes communicated 30 days in advance"
      ]
    },
    "intellectual": {
      main: "All proprietary content constitutes intellectual property owned by WorkForceSkilled and its licensors, protected under applicable laws.",
      points: [
        "Limited license granted for personal/non-commercial use",
        "No derivative works permitted without express consent",
        "User-generated content licenses granted to WorkForceSkilled",
        "Infringement claims handled per DMCA procedures"
      ]
    },
    "privacy": {
      main: "Data collection, processing, and protection practices are detailed in our Privacy Policy, which is incorporated by reference.",
      points: [
        "GDPR and CCPA compliance frameworks implemented",
        "Data processing agreements available for review",
        "User data rights clearly defined and accessible",
        "Third-party data sharing disclosures provided"
      ]
    },
    "liability": {
      main: "To the maximum extent permitted by law, WorkForceSkilled shall not be liable for indirect, incidental, or consequential damages.",
      points: [
        "No warranty of uninterrupted or error-free service",
        "Service modifications may occur without liability",
        "Third-party content and links disclaimed",
        "Force majeure events excluded from liability"
      ]
    },
    "termination": {
      main: "We reserve the right to suspend or terminate accounts for violations of these terms or operational necessities.",
      points: [
        "30-day cure period for minor violations",
        "Immediate termination for severe breaches",
        "Data export options available upon termination",
        "Post-termination obligations may apply"
      ]
    },
    "amendments": {
      main: "WorkForceSkilled may modify these terms to reflect evolving services or legal requirements.",
      points: [
        "Version history available upon request",
        "Major changes communicated 30 days in advance",
        "Enterprise clients receive personalized notifications",
        "Archived versions maintained for compliance"
      ]
    },
    "law": {
      main: "These Terms & Conditions are governed by the laws of the State of California.",
      points: [
        "Arbitration provisions for certain dispute types",
        "Class action waivers included",
        "Severability of provisions maintained",
        "English language version controls"
      ]
    },
    "contact": {
      main: "For inquiries regarding these terms, legal notices, or compliance matters:",
      points: [
        // "Primary legal communications: legal@peopleskilltraining.com",
        "General support: support@workforceskilled.com",
        // "Data protection inquiries: dpo@peopleskilltraining.com",
        "Physical correspondence to corporate headquarters"
      ]
    }
  };

  const section = content[sectionId];
  if (!section) return null;

  return (
    <div className="space-y-4">
      <p className="leading-relaxed">{section.main}</p>
      
      {section.points && section.points.length > 0 && (
        <ul className="space-y-2">
          {section.points.map((point, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="flex items-start gap-2.5 text-slate-600 text-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-6 border-t border-slate-200"
        >
          <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-rose-50 border border-red-100">
            <div className="flex items-center gap-3 mb-3">
              <FiAlertTriangle className="text-red-500 text-base" />
              <h4 className="font-semibold text-red-800 text-sm">Prohibited Activities</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["Commercial Resale", "Reverse Engineering", "Automated Scraping", "Service Disruption"].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-2 rounded-md bg-white border border-red-200 text-xs text-red-700"
                >
                  ⛔ {item}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    
    case "intellectual":
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-6 border-t border-slate-200"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600 mb-1">©</div>
              <div className="text-xs text-slate-600">Copyright</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600 mb-1">™</div>
              <div className="text-xs text-slate-600">Trademark</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600 mb-1">®</div>
              <div className="text-xs text-slate-600">Registered</div>
            </div>
          </div>
        </motion.div>
      );
    
    case "privacy":
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-6 border-t border-slate-200"
        >
          <div className="p-3 rounded-lg bg-teal-50 border border-teal-100">
            <p className="text-xs text-teal-800">
              <strong>Related Document:</strong> Review our Privacy Policy for complete data handling details.
            </p>
          </div>
        </motion.div>
      );
    
    case "contact":
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-6 border-t border-slate-200"
        >
          <div className="grid grid-cols-1 md:grid-col gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-b from-emerald-50 to-white border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 mb-2 text-sm">Primary Contact</h4>
              <p className="font-medium text-emerald-700 text-sm">support@workforceskilled.com</p>
              <p className="text-xs text-emerald-600 mt-1">Mon-Fri, 9AM-6PM EST</p>
            </div>
            {/* <div className="p-4 rounded-lg bg-gradient-to-b from-slate-50 to-white border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-2 text-sm">Legal Department</h4>
              <p className="font-medium text-slate-700 text-sm">legal@peopleskilltraining.com</p>
              <p className="text-xs text-slate-600 mt-1">Formal notices only</p>
            </div> */}
          </div>
        </motion.div>
      );
    
    default:
      return null;
  }
}
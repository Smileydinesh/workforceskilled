import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiTruck, 
  FiRefreshCw, 
  FiXCircle,
  FiWifi,
  FiMail,
  FiFileText,
  FiAlertCircle,
  FiShield,
  FiChevronRight,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiDownload,
  FiGlobe,
  FiCreditCard,
  FiArrowRight,
  FiBox
} from "react-icons/fi";

const sections = [
  { id: "shipping", title: "Shipping Policy", icon: FiTruck, color: "from-emerald-600 to-teal-500", badge: "Digital" },
  { id: "returns", title: "Return & Refund Policy", icon: FiRefreshCw, color: "from-amber-500 to-yellow-400", badge: "30 Days" },
  { id: "cancellations", title: "Cancellations", icon: FiXCircle, color: "from-red-500 to-pink-400", badge: "Timing" },
  { id: "technical", title: "Technical Issues", icon: FiWifi, color: "from-blue-500 to-indigo-400", badge: "Support" },
  { id: "request", title: "How to Request Returns", icon: FiMail, color: "from-purple-500 to-violet-400", badge: "Process" },
  { id: "exceptions", title: "Exceptions", icon: FiAlertCircle, color: "from-orange-500 to-amber-400", badge: "Limits" },
  { id: "amendments", title: "Policy Amendments", icon: FiFileText, color: "from-teal-500 to-cyan-400", badge: "Updates" },
  { id: "contact", title: "Contact Information", icon: FiShield, color: "from-emerald-700 to-green-600", badge: "Support" }
];

export default function ShippingReturnPolicy() {
  const [activeId, setActiveId] = useState("shipping");
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
      {/* Professional Header */}
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
              <FiPackage className="text-amber-300 text-sm" />
              <span className="text-xs font-medium text-emerald-100 tracking-wide">DIGITAL DELIVERY</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            >
              <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
                Shipping & Return Policy
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-emerald-200 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Digital delivery and hassle-free returns for your learning journey
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <FiClock className="text-amber-300 text-sm" />
                  <div className="text-xl font-semibold text-white">30</div>
                </div>
                <div className="text-xs text-emerald-300 font-medium">DAY REFUND</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <FiDownload className="text-emerald-300 text-sm" />
                  <div className="text-xl font-semibold text-white">INSTANT</div>
                </div>
                <div className="text-xs text-emerald-300 font-medium">ACCESS</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <FiGlobe className="text-teal-300 text-sm" />
                  <div className="text-xl font-semibold text-white">DIGITAL</div>
                </div>
                <div className="text-xs text-emerald-300 font-medium">DELIVERY</div>
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

      {/* Main Content */}
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
                  <FiBox className="text-white text-base" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">POLICY SECTIONS</h3>
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
                className="mt-8 pt-6 border-t border-slate-200 space-y-4"
              >
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                  <p className="text-xs text-emerald-800 font-medium">
                    All digital products • Instant access • 30-day refund window
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
                      {renderSectionContent(sec.id)}
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
                  <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 shadow">
                    <FiCheckCircle className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Hassle-Free Digital Delivery</h3>
                    <p className="text-sm text-slate-600 max-w-md">
                      Instant access to all learning materials with 30-day satisfaction guarantee.
                    </p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-sm flex items-center gap-2 shadow hover:shadow-md transition-all duration-300"
                >
                  <FiMail className="text-sm" />
                  Contact Support
                  <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-emerald-200">
                <p className="text-center text-xs text-slate-500">
                  Shipping & Return Policy last updated: December 20, 2025 • WorkForceSkilled Inc.
                </p>
                <p className="text-center text-xs text-slate-400 mt-2">
                  Digital products only • No physical shipping • Immediate access
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
function renderSectionContent(sectionId) {
  switch(sectionId) {
    case "shipping":
      return (
        <div className="space-y-4">
          <p>
            WorkForceSkilled specializes in digital education products and services, 
            including comprehensive online courses, expert-led webinars, downloadable resources, 
            and interactive training modules.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <FiDownload className="text-emerald-600" />
                </div>
                <h4 className="font-semibold text-slate-800">Instant Access</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Immediate access upon payment confirmation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Access via your account dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Direct download links provided
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FiGlobe className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-800">Global Availability</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Available 24/7 worldwide
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  No geographical restrictions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Multi-language support available
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-4">
            <p className="text-sm text-slate-700">
              <strong>Note:</strong> For access issues, contact <span className="text-emerald-700 font-medium">support@workforceskilled.com</span> 
              with your order details and we'll resolve it within 24 hours.
            </p>
          </div>
        </div>
      );
      
    case "returns":
      return (
        <div className="space-y-6">
          <p>
            We stand behind the quality of our digital education products with a comprehensive 
            satisfaction guarantee.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gradient-to-b from-amber-50 to-white border border-amber-100">
              <h4 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                <FiClock className="text-amber-600" />
                30-Day Refund Window
              </h4>
              <div className="p-3 rounded-lg bg-white border border-amber-200 mb-3">
                <div className="text-xl font-bold text-amber-600 mb-1">Full Refund</div>
                <p className="text-sm text-slate-700">100% of purchase price returned</p>
              </div>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• Valid for 30 days from purchase date</li>
                <li>• No questions asked within first 7 days</li>
                <li>• Processed within 5-10 business days</li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600" />
                Refund Eligibility
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                    <FiCheckCircle className="text-emerald-600 text-xs" />
                  </div>
                  <span className="text-sm text-slate-700">Content not downloaded/accessed</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                    <FiCheckCircle className="text-emerald-600 text-xs" />
                  </div>
                  <span className="text-sm text-slate-700">Request within 30-day period</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                    <FiCheckCircle className="text-emerald-600 text-xs" />
                  </div>
                  <span className="text-sm text-slate-700">Valid payment method used</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
    case "cancellations":
      return (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-b from-red-50 to-white border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <FiXCircle className="text-red-600 text-xl" />
                <div>
                  <h4 className="font-semibold text-red-800">Webinar Cancellations</h4>
                  <p className="text-xs text-red-600">Live event policies</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white border border-red-200 flex items-center justify-between">
                  <span className="text-slate-700 text-sm">48+ hours notice</span>
                  <span className="font-semibold text-emerald-600">Full refund</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-amber-200 flex items-center justify-between">
                  <span className="text-slate-700 text-sm">24-48 hours notice</span>
                  <span className="font-semibold text-amber-600">50% refund</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-red-200 flex items-center justify-between">
                  <span className="text-slate-700 text-sm">Within 24 hours</span>
                  <span className="font-semibold text-red-600">Non-refundable</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <FiCreditCard className="text-blue-600 text-xl" />
                <div>
                  <h4 className="font-semibold text-blue-800">Subscription Cancellations</h4>
                  <p className="text-xs text-blue-600">Recurring billing</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white border border-blue-200">
                  <p className="text-sm text-slate-700 mb-1">
                    <strong>Cancellation takes effect</strong> at the end of current billing cycle
                  </p>
                  <p className="text-xs text-slate-500">
                    No refunds for unused partial periods
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white border border-blue-200">
                  <p className="text-sm text-slate-700">
                    <strong>Downloadable resources</strong> may be non-refundable once accessed
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-sm text-slate-700">
              Cancellation requests must be submitted via email or through your account dashboard. 
              Emergency situations are reviewed case-by-case.
            </p>
          </div>
        </div>
      );
      
    case "technical":
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <FiWifi className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-800">Technical Support</h4>
                <p className="text-sm text-blue-600">24/7 assistance available</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-white border border-blue-200">
                <p className="font-medium text-slate-800 text-sm mb-1">Immediate Response</p>
                <p className="text-xs text-slate-600">
                  Initial response within 2 hours during business hours
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-blue-200">
                <p className="font-medium text-slate-800 text-sm mb-1">Resolution Timeline</p>
                <p className="text-xs text-slate-600">
                  Most issues resolved within 24 hours
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <p className="text-sm text-emerald-800">
              <strong>Contact:</strong> For technical difficulties accessing purchased content, 
              email <span className="font-medium">support@workforceskilled.com</span> immediately. 
              Include your order number, device/browser details, and screenshots if possible.
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <h4 className="font-semibold text-amber-800 mb-2 text-sm">Common Solutions</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• Clear browser cache and cookies</li>
              <li>• Try different browser or device</li>
              <li>• Check internet connection stability</li>
              <li>• Disable ad-blockers temporarily</li>
            </ul>
          </div>
        </div>
      );
      
    case "request":
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-b from-purple-50 to-white border border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <FiMail className="text-purple-600 text-xl" />
              <div>
                <h4 className="font-semibold text-purple-800">Request Process</h4>
                <p className="text-xs text-purple-600">3-step procedure</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white border border-purple-200 text-center">
                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  1
                </div>
                <h5 className="font-semibold text-slate-800 mb-2 text-sm">Contact Support</h5>
                <p className="text-xs text-slate-600">
                  Email support@workforceskilled.com with subject "Refund Request"
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-purple-200 text-center">
                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  2
                </div>
                <h5 className="font-semibold text-slate-800 mb-2 text-sm">Provide Details</h5>
                <p className="text-xs text-slate-600">
                  Include order number, product name, and reason for request
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-purple-200 text-center">
                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  3
                </div>
                <h5 className="font-semibold text-slate-800 mb-2 text-sm">Review & Processing</h5>
                <p className="text-xs text-slate-600">
                  We'll review and process within 5-10 business days
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2 text-sm">Required Information</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• Full name and email associated with account</li>
              <li>• Order number or transaction ID</li>
              <li>• Date of purchase</li>
              <li>• Detailed reason for refund request</li>
              <li>• Screenshots of access issues (if applicable)</li>
            </ul>
          </div>
        </div>
      );
      
    case "exceptions":
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-b from-orange-50 to-white border border-orange-100">
            <div className="flex items-center gap-3 mb-4">
              <FiAlertCircle className="text-orange-600 text-xl" />
              <div>
                <h4 className="font-semibold text-orange-800">Non-Refundable Scenarios</h4>
                <p className="text-xs text-orange-600">Circumstances where refunds cannot be granted</p>
              </div>
            </div>
            
            <div className="grid gap-3">
              <div className="p-3 rounded-lg bg-white border border-orange-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiXCircle className="text-orange-600 text-xs" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 mb-1 text-sm">Content Accessed</h5>
                  <p className="text-xs text-slate-700">
                    Digital products downloaded, streamed, or accessed beyond trial/preview
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white border border-orange-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiXCircle className="text-orange-600 text-xs" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 mb-1 text-sm">Time Limit Exceeded</h5>
                  <p className="text-xs text-slate-700">
                    Requests beyond 30-day refund window (except for technical issues)
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white border border-orange-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiXCircle className="text-orange-600 text-xs" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 mb-1 text-sm">Policy Violation</h5>
                  <p className="text-xs text-slate-700">
                    Account suspension due to terms of service violations or fraudulent activity
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-600">
            Exceptions for technical issues preventing access are reviewed case-by-case with 
            supporting documentation. Contact support for special circumstances consideration.
          </p>
        </div>
      );
      
    case "amendments":
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-b from-teal-50 to-white border border-teal-100">
            <div className="flex items-center gap-3 mb-4">
              <FiFileText className="text-teal-600 text-xl" />
              <div>
                <h4 className="font-semibold text-teal-800">Policy Updates</h4>
                <p className="text-xs text-teal-600">How changes are communicated</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white border border-teal-200">
                <h5 className="font-semibold text-slate-800 mb-2 text-sm">Notification Process</h5>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>• Email notification to all users 30 days before changes</li>
                  <li>• Website banner announcements for major updates</li>
                  <li>• Updated date prominently displayed on this page</li>
                  <li>• Archive of previous policies available upon request</li>
                </ul>
              </div>
              
              <div className="p-3 rounded-lg bg-white border border-teal-200">
                <h5 className="font-semibold text-slate-800 mb-2 text-sm">Effective Date</h5>
                <p className="text-xs text-slate-700">
                  Changes become effective on the specified date in notifications. 
                  Continued use of our services after changes constitutes acceptance.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
      
    case "contact":
      return (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <FiMail className="text-emerald-600 text-xl" />
                <div>
                  <h4 className="font-semibold text-emerald-800">Support Contact</h4>
                  <p className="text-xs text-emerald-600">General inquiries and refund requests</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-700">support@workforceskilled.com</p>
                <p className="text-xs text-emerald-600 mt-2">Response within 24 business hours</p>
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <FiClock className="text-slate-600 text-xl" />
                <div>
                  <h4 className="font-semibold text-slate-800">Business Hours</h4>
                  <p className="text-xs text-slate-600">When you can expect responses</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <p className="font-semibold text-slate-800 mb-2 text-sm">Monday - Friday</p>
                <p className="text-slate-700 text-sm">9:00 AM - 6:00 PM (EST)</p>
                <p className="text-xs text-slate-600 mt-3">Emergency technical support available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2 text-sm">Mailing Address</h4>
            <p className="text-slate-700 text-sm">
              WorkForceSkilled Inc.<br />
              123 Learning Plaza, Suite 500<br />
              San Francisco, CA 94107<br />
              United States
            </p>
          </div>
        </div>
      );
      
    default:
      return null;
  }
}

function renderSectionExtras(sectionId) {
  if (sectionId === "shipping") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 pt-6 border-t border-slate-200"
      >
        <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
          <div className="flex items-center gap-3">
            <FiTruck className="text-emerald-600 text-base" />
            <p className="text-xs text-emerald-800 font-medium">
              Digital delivery only • No shipping fees • No waiting periods
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
  return null;
}
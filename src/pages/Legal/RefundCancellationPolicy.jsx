import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiBookOpen, 
  FiCalendar, 
  FiBriefcase, 
  FiFileText,
  FiRefreshCw, 
  FiAlertCircle,
  FiMail,
  FiChevronRight,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
  FiUsers,
  FiShield
} from "react-icons/fi";

const sections = [
  { id: "training", title: "Training & Course Subscriptions", icon: FiBookOpen, color: "from-emerald-600 to-teal-500" },
  { id: "webinars", title: "Webinars & Events", icon: FiCalendar, color: "from-amber-500 to-yellow-400" },
  { id: "consulting", title: "Consulting Services", icon: FiBriefcase, color: "from-emerald-500 to-green-400" },
  { id: "general", title: "General Terms", icon: FiFileText, color: "from-teal-500 to-cyan-400" },
  { id: "request", title: "How to Request Refunds", icon: FiRefreshCw, color: "from-blue-500 to-indigo-400" },
  { id: "exceptions", title: "Exceptions", icon: FiAlertCircle, color: "from-rose-500 to-pink-400" },
  { id: "amendments", title: "Policy Amendments", icon: FiShield, color: "from-purple-500 to-violet-400" },
  { id: "contact", title: "Contact Information", icon: FiMail, color: "from-slate-600 to-gray-500" }
];

export default function RefundCancellationPolicy() {
  const [activeId, setActiveId] = useState("training");
  const [sidebarProgress, setSidebarProgress] = useState(0);
  const mainRef = useRef(null);

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      
      // Update progress immediately
      const allSections = sections.map(sec => sec.id);
      const newIndex = allSections.indexOf(id);
      const newProgress = ((newIndex + 1) / allSections.length) * 100;
      setSidebarProgress(newProgress);
      setActiveId(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-6xl mx-auto px-6 py-24 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <FiDollarSign className="text-amber-300" />
            <span className="text-sm text-emerald-100">Refund & Cancellation Policy</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Refund Policy
            </span>
          </h1>
          
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transparent, fair, and customer-focused refund procedures for all our services
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <FiClock className="text-amber-300" />5
              </div>
              <div className="text-sm text-emerald-300">Day Refund Window</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <FiCheckCircle className="text-emerald-300" />48
              </div>
              <div className="text-sm text-emerald-300">Hour Cancellation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <FiUsers className="text-blue-300" />24/7
              </div>
              <div className="text-sm text-emerald-300">Support Available</div>
            </div>
          </motion.div>
          
          <p className="mt-12 text-sm text-emerald-300 flex items-center justify-center gap-2">
            <FiRefreshCw />
            Last updated: December 20, 2025
          </p>
        </motion.div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* SIDEBAR WITH VISUAL PROGRESS */}
        <aside className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-32 bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
          >
            {/* Progress Indicator */}
            <div className="h-1.5 bg-slate-100 w-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                initial={{ width: "0%" }}
                animate={{ width: `${sidebarProgress}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400">
                  <FiFileText className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Policy Navigation</h3>
                  <p className="text-sm text-slate-500">
                    Section {sections.findIndex(s => s.id === activeId) + 1} of {sections.length}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeId === sec.id;
                  
                  return (
                    <motion.li
                      key={sec.id}
                      whileHover={{ x: 4 }}
                      onClick={() => scrollToSection(sec.id)}
                      className={`cursor-pointer rounded-xl transition-all duration-300 overflow-hidden ${
                        isActive 
                          ? `bg-gradient-to-r ${sec.color} shadow-md`
                          : "hover:bg-slate-100"
                      }`}
                    >
                      <div className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="active-indicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                            initial={false}
                          />
                        )}
                        <div className={`flex items-center gap-3 px-4 py-3 ${
                          isActive ? "text-white" : "text-slate-700"
                        }`}>
                          <div className={`p-2 rounded-lg ${
                            isActive 
                              ? "bg-white/20" 
                              : `bg-gradient-to-r ${sec.color}`
                          }`}>
                            <Icon className={isActive ? "text-white" : "text-white"} />
                          </div>
                          <span className="font-medium flex-1 text-sm">{sec.title}</span>
                          {isActive && (
                            <motion.div
                              initial={{ rotate: -90 }}
                              animate={{ rotate: 0 }}
                              transition={{ type: "spring" }}
                            >
                              <FiChevronRight className="ml-2" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
              
              {/* Sidebar Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                  <FiDollarSign className="text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Quick Refund Process</p>
                    <p className="text-xs text-emerald-600">5 business days average</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100">
                  <FiClock className="text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Time Windows</p>
                    <p className="text-xs text-amber-600">Clear deadlines for refunds</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* MAIN CONTENT */}
        <main ref={mainRef} className="lg:col-span-3 space-y-8">
          <AnimatePresence>
            {sections.map((sec, index) => {
              const Icon = sec.icon;
              
              return (
                <motion.section
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden scroll-mt-32 group"
                >
                  {/* Section Header */}
                  <div className={`bg-gradient-to-r ${sec.color} px-8 py-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="p-3 rounded-xl bg-white/20 backdrop-blur-sm"
                      >
                        <Icon className="text-white text-2xl" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{sec.title}</h2>
                        <p className="text-white/80 text-sm mt-1">
                          Section {index + 1} of {sections.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Section Content */}
                  <div className="p-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {renderSectionContent(sec.id)}
                    </motion.div>
                  </div>
                </motion.section>
              );
            })}
          </AnimatePresence>
          
          {/* POLICY FOOTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400">
                  <FiShield className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Need Policy Clarification?</h3>
                  <p className="text-sm text-slate-600">Our support team is here to help</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                <FiMail />
                Contact Support
              </motion.button>
            </div>
            
            <p className="mt-8 text-center text-sm text-slate-500">
              Policy last updated: December 20, 2025 • WorkForceSkilled Inc.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// Helper function to render section content
function renderSectionContent(sectionId) {
  switch(sectionId) {
    case "training":
      return (
        <div className="space-y-6">
          <p className="text-slate-700 leading-relaxed">
            Our training programs are designed to provide maximum value. To ensure customer satisfaction, 
            we offer a straightforward refund policy for online courses and subscriptions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <FiCheckCircle className="text-emerald-600" />
                </div>
                <h4 className="font-semibold text-slate-800">Eligible for Refund</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Within 5 working days of purchase
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Course not yet started/completed
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Technical issues preventing access
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-100">
                  <FiXCircle className="text-amber-600" />
                </div>
                <h4 className="font-semibold text-slate-800">Non-Refundable</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  After 5 working day period
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Course partially/completed
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Downloadable resources accessed
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">Subscription Cancellation</h4>
            <p className="text-sm text-slate-700">
              You may cancel subscriptions anytime after the initial 5-day period. 
              Cancellations take effect at the end of the current billing cycle. 
              No refunds for prior payments will be issued.
            </p>
          </div>
        </div>
      );
      
    case "webinars":
      return (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gradient-to-b from-amber-50 to-white border border-amber-100">
              <h4 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                <FiCalendar className="text-amber-600" />
                48+ Hours Before Event
              </h4>
              <div className="p-3 rounded-lg bg-white border border-amber-200 mb-3">
                <div className="text-2xl font-bold text-amber-600 mb-1">Full Refund</div>
                <p className="text-sm text-slate-700">100% of registration fee returned</p>
              </div>
              <p className="text-sm text-slate-700">
                Cancel via your account dashboard or contact support
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-b from-rose-50 to-white border border-rose-100">
              <h4 className="font-semibold text-rose-800 mb-4 flex items-center gap-2">
                <FiClock className="text-rose-600" />
                Within 48 Hours
              </h4>
              <div className="p-3 rounded-lg bg-white border border-rose-200 mb-3">
                <div className="text-2xl font-bold text-rose-600 mb-1">Non-Refundable</div>
                <p className="text-sm text-slate-700">No refunds within 48 hours</p>
              </div>
              <p className="text-sm text-slate-700">
                Consider transferring to a colleague with 24h notice
              </p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Event Cancellation by WorkForceSkilled</h4>
            <p className="text-sm text-slate-700">
              If we cancel or reschedule an event, you'll receive a full refund or credit for a future event. 
              We'll notify you via email and provide options within 3 business days.
            </p>
          </div>
        </div>
      );
      
    case "consulting":
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100">
            <div className="flex items-center gap-3 mb-4">
              <FiBriefcase className="text-emerald-600 text-2xl" />
              <div>
                <h4 className="font-semibold text-emerald-800">Consulting Service Refunds</h4>
                <p className="text-sm text-emerald-600">Professional services policy</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="p-3 rounded-lg bg-white border border-emerald-200 flex items-center justify-between">
                <span className="text-slate-700">No session conducted</span>
                <span className="font-semibold text-emerald-600">Full refund</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-amber-200 flex items-center justify-between">
                <span className="text-slate-700">48+ hours notice</span>
                <span className="font-semibold text-amber-600">No charge</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-rose-200 flex items-center justify-between">
                <span className="text-slate-700">Within 48 hours</span>
                <span className="font-semibold text-rose-600">50% fee applies</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-600">
            Cancellation requests must be submitted in writing via email. Emergency situations 
            will be considered on a case-by-case basis with supporting documentation.
          </p>
        </div>
      );
      
    case "general":
      return (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-b from-teal-50 to-white border border-teal-100 text-center">
              <div className="text-2xl font-bold text-teal-600 mb-2">5 Days</div>
              <div className="text-sm text-slate-700">Processing Time</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">Original</div>
              <div className="text-sm text-slate-700">Payment Method</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 text-center">
              <div className="text-2xl font-bold text-slate-600 mb-2">Immediate</div>
              <div className="text-sm text-slate-700">Digital Product Policy</div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">Important Notes</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• Refunds may take 5-10 business days to appear on your statement</li>
              <li>• International transactions may incur currency conversion fees</li>
              <li>• Downloadable resources are non-refundable once accessed</li>
              <li>• Bulk purchases have special terms outlined in contracts</li>
            </ul>
          </div>
        </div>
      );
      
    case "request":
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <FiRefreshCw className="text-blue-600 text-2xl" />
              <div>
                <h4 className="font-semibold text-blue-800">Refund Request Process</h4>
                <p className="text-sm text-blue-600">Simple 3-step procedure</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white border border-blue-200 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  1
                </div>
                <h5 className="font-semibold text-slate-800 mb-2">Contact Support</h5>
                <p className="text-xs text-slate-600">
                  Email support@workforceskilled.com with your order details
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-blue-200 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  2
                </div>
                <h5 className="font-semibold text-slate-800 mb-2">Provide Details</h5>
                <p className="text-xs text-slate-600">
                  Include order number, reason, and supporting documentation
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-blue-200 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  3
                </div>
                <h5 className="font-semibold text-slate-800 mb-2">Review & Processing</h5>
                <p className="text-xs text-slate-600">
                  We'll review and process within 5 business days
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <h4 className="font-semibold text-amber-800 mb-2">Required Information</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• Full name and email associated with the account</li>
              <li>• Order number or transaction ID</li>
              <li>• Date of purchase</li>
              <li>• Detailed reason for refund request</li>
              <li>• Any supporting screenshots or documentation</li>
            </ul>
          </div>
        </div>
      );
      
    case "exceptions":
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-b from-rose-50 to-white border border-rose-100">
            <div className="flex items-center gap-3 mb-4">
              <FiAlertCircle className="text-rose-600 text-2xl" />
              <div>
                <h4 className="font-semibold text-rose-800">Non-Refundable Scenarios</h4>
                <p className="text-sm text-rose-600">Circumstances where refunds cannot be granted</p>
              </div>
            </div>
            
            <div className="grid gap-3">
              <div className="p-3 rounded-lg bg-white border border-rose-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <FiXCircle className="text-rose-600 text-sm" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 mb-1">Fraudulent Activity</h5>
                  <p className="text-sm text-slate-700">
                    Suspected misuse, chargebacks, or unauthorized purchases
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white border border-rose-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <FiXCircle className="text-rose-600 text-sm" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 mb-1">Policy Violation</h5>
                  <p className="text-sm text-slate-700">
                    Breach of terms, code of conduct, or service misuse
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white border border-rose-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <FiXCircle className="text-rose-600 text-sm" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 mb-1">Service Utilization</h5>
                  <p className="text-sm text-slate-700">
                    Using service after requesting cancellation or refund
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-600">
            Exceptions may be reviewed on a case-by-case basis. Contact our support team 
            with documentation for special circumstances consideration.
          </p>
        </div>
      );
      
    case "amendments":
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-b from-purple-50 to-white border border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <FiShield className="text-purple-600 text-2xl" />
              <div>
                <h4 className="font-semibold text-purple-800">Policy Updates</h4>
                <p className="text-sm text-purple-600">How changes are communicated and implemented</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white border border-purple-200">
                <h5 className="font-semibold text-slate-800 mb-2">Notification Process</h5>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li>• Email notification to all active users 30 days before changes</li>
                  <li>• Website banner announcements for major updates</li>
                  <li>• Updated date prominently displayed on this page</li>
                  <li>• Archive of previous policies available upon request</li>
                </ul>
              </div>
              
              <div className="p-3 rounded-lg bg-white border border-purple-200">
                <h5 className="font-semibold text-slate-800 mb-2">Effective Date & Acceptance</h5>
                <p className="text-sm text-slate-700">
                  Changes become effective on the specified date in notifications. Continued use 
                  of our services after changes constitutes acceptance of the revised policy.
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
            <div className="p-5 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <FiMail className="text-slate-600 text-2xl" />
                <div>
                  <h4 className="font-semibold text-slate-800">Primary Support</h4>
                  <p className="text-sm text-slate-600">General inquiries and refund requests</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <p className="text-lg font-semibold text-emerald-700">support@workforceskilled.com</p>
                <p className="text-sm text-slate-600 mt-2">Response within 24 business hours</p>
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <FiBriefcase className="text-emerald-600 text-2xl" />
                <div>
                  <h4 className="font-semibold text-emerald-800">Business Hours</h4>
                  <p className="text-sm text-emerald-600">When you can expect responses</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-emerald-200">
                <p className="font-semibold text-slate-800 mb-2">Monday - Friday</p>
                <p className="text-slate-700">9:00 AM - 6:00 PM (EST)</p>
                <p className="text-sm text-slate-600 mt-3">Emergency support available for active incidents</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">Mailing Address</h4>
            <p className="text-slate-700">
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
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FiDatabase, 
  FiEye, 
  FiShield,
  FiShare2,
  FiCoffee,
  FiUserCheck,
  FiRefreshCw,
  FiMail,
  FiChevronRight,
  FiLock,
  FiGlobe,
  FiSettings
} from "react-icons/fi";

const sections = [
  { id: "information-collect", title: "Information We Collect", icon: FiDatabase, color: "from-emerald-500 to-teal-400" },
  { id: "information-use", title: "How We Use Your Information", icon: FiEye, color: "from-amber-500 to-yellow-400" },
  { id: "data-protection", title: "Data Protection", icon: FiShield, color: "from-green-500 to-emerald-400" },
  { id: "sharing", title: "Sharing Your Information", icon: FiShare2, color: "from-teal-500 to-cyan-400" },
  { id: "cookies", title: "Cookies", icon: FiCoffee, color: "from-amber-600 to-orange-400" },
  { id: "rights", title: "Your Rights", icon: FiUserCheck, color: "from-blue-500 to-indigo-400" },
  { id: "changes", title: "Changes to This Policy", icon: FiRefreshCw, color: "from-purple-500 to-pink-400" },
  { id: "contact", title: "Contact Information", icon: FiMail, color: "from-slate-600 to-gray-400" }
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState("information-collect");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <FiShield className="text-amber-300" />
            <span className="text-sm text-emerald-100">Security & Compliance</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-emerald-200 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            At PeopleSkillTraining, we value your privacy and are committed to protecting 
            your personal information with enterprise-grade security measures.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white mb-1">GDPR</div>
              <div className="text-sm text-emerald-300">Compliant</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white mb-1">256-bit</div>
              <div className="text-sm text-emerald-300">Encryption</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white mb-1">ISO 27001</div>
              <div className="text-sm text-emerald-300">Certified</div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-sm text-emerald-300 flex items-center justify-center gap-2"
          >
            <FiRefreshCw />
            Last updated: December 20, 2025
          </motion.p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-32 bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400">
                <FiSettings className="text-white text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Contents</h3>
                <p className="text-sm text-slate-500">Navigate through sections</p>
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
                    className={`cursor-pointer rounded-xl transition-all duration-300 ${
                      isActive 
                        ? `bg-gradient-to-r ${sec.color} shadow-md`
                        : "hover:bg-slate-100"
                    }`}
                  >
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
                      <span className="font-medium flex-1">{sec.title}</span>
                      {isActive && <FiChevronRight className="ml-2" />}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <FiLock className="text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-emerald-800">Secure Connection</p>
                  <p className="text-xs text-emerald-600">All data is encrypted</p>
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-3 space-y-8">
          {sections.map((sec, index) => {
            const Icon = sec.icon;
            
            return (
              <motion.section
                key={sec.id}
                id={sec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-32"
              >
                {/* Section Header */}
                <div className={`bg-gradient-to-r ${sec.color} px-8 py-6`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                      <Icon className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{sec.title}</h2>
                  </div>
                </div>
                
                {/* Section Content */}
                <div className="p-8">
                  {renderSectionContent(sec.id)}
                </div>
              </motion.section>
            );
          })}
          
          {/* FOOTER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center pt-10"
          >
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
              <FiGlobe className="text-emerald-600 text-xl" />
              <div className="text-left">
                <p className="text-sm font-medium text-slate-800">
                  Need help with privacy compliance?
                </p>
                <p className="text-xs text-slate-600">
                  Contact our data protection team
                </p>
              </div>
            </div>
            
            <p className="mt-8 text-sm text-slate-500">
              Policy last updated: December 20, 2025 • PeopleSkillTraining Inc.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="bg-white border rounded-xl p-8 scroll-mt-32">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        {title}
      </h2>
      <div className="text-slate-600 leading-relaxed text-sm">
        {children}
      </div>
    </section>
  );
}

// Helper function to render section content
function renderSectionContent(sectionId) {
  switch(sectionId) {
    case "information-collect":
      return (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            We collect information that you provide to us directly, such as when you register for an account,
            sign up for webinars or training, or contact us. Our data collection follows the principle of 
            data minimization, gathering only what's necessary for your learning experience.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 mb-2">Personal Details</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Name, email address, and phone number
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Professional title and company
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Account credentials (encrypted)
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <h4 className="font-semibold text-amber-800 mb-2">Learning Data</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Course progress and completion
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Assessment results and feedback
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Platform interaction metrics
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
      
    case "information-use":
      return (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100">
                  <FiEye className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Service Delivery</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Provide and improve our training programs and resources
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FiMail className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Communication</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Updates about courses, events, and platform improvements
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <FiSettings className="text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Personalization</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Tailored learning recommendations and content
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <FiShield className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Compliance</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Legal and regulatory obligations fulfillment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
    case "data-protection":
      return (
        <div className="space-y-6">
          <p className="text-slate-700 leading-relaxed">
            We employ enterprise-grade security measures to protect your personal information from 
            unauthorized access, alteration, or disclosure. Our security framework is built on multiple 
            layers of protection and is regularly audited by third-party security experts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600 mb-2">AES-256</div>
              <div className="text-xs text-slate-600">Encryption</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-amber-50 to-white border border-amber-100">
              <div className="text-2xl font-bold text-amber-600 mb-2">SOC 2</div>
              <div className="text-xs text-slate-600">Compliant</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-xs text-slate-600">Monitoring</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-b from-green-50 to-white border border-green-100">
              <div className="text-2xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-xs text-slate-600">Uptime SLA</div>
            </div>
          </div>
        </div>
      );
      
    case "sharing":
      return (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            We do not sell, rent, or trade your personal information. We may share your data with 
            trusted third-party service providers who assist us in operating our platform, 
            always under strict data processing agreements.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3">Trusted Partners</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-white border border-slate-200">Payment Processors</div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">Cloud Infrastructure</div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">Analytics Services</div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">Email Services</div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">Support Platforms</div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">Learning Tools</div>
            </div>
          </div>
        </div>
      );
      
    case "cookies":
      return (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Our website uses cookies and similar technologies to enhance your learning experience, 
            analyze platform usage, and personalize content. You have full control over your 
            cookie preferences through our cookie consent manager.
          </p>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <div className="flex items-start gap-3">
              <FiCoffee className="text-amber-600 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Cookie Management</h4>
                <p className="text-sm text-slate-700">
                  You can adjust your cookie settings at any time by clicking the "Cookie Settings" 
                  link in our website footer. Essential cookies cannot be disabled as they are 
                  required for basic platform functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
      
    case "rights":
      return (
        <div className="space-y-6">
          <p className="text-slate-700 leading-relaxed">
            You have comprehensive rights over your personal data. We provide easy-to-use tools 
            to exercise these rights through your account settings or by contacting our 
            Data Protection Officer.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">Data Subject Rights</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">1</span>
                  </div>
                  <span className="text-slate-700">Access and download your data</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 text-xs font-bold">2</span>
                  </div>
                  <span className="text-slate-700">Request data correction</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 text-xs font-bold">3</span>
                  </div>
                  <span className="text-slate-700">Withdraw consent at any time</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800">Additional Protections</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-bold">4</span>
                  </div>
                  <span className="text-slate-700">Data portability</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 text-xs font-bold">5</span>
                  </div>
                  <span className="text-slate-700">Processing restriction</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 text-xs font-bold">6</span>
                  </div>
                  <span className="text-slate-700">Right to be forgotten</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
      
    case "changes":
      return (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            We may update this privacy policy periodically to reflect changes in our practices, 
            technology, legal requirements, and business operations. Significant changes will be 
            communicated to you through email and platform notifications.
          </p>
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200">
            <div className="flex items-start gap-3">
              <FiRefreshCw className="text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Update Notification Process</h4>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li>• Email notification 30 days before changes take effect</li>
                  <li>• In-platform banner notification for major updates</li>
                  <li>• Version history available in account settings</li>
                  <li>• Continued use after updates signifies acceptance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
      
    case "contact":
      return (
        <div className="space-y-6">
          <p className="text-slate-700 leading-relaxed">
            For any questions, concerns, or requests regarding your privacy and data protection, 
            our dedicated privacy team is available to assist you through multiple channels.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 text-center">
              <FiMail className="text-emerald-600 text-2xl mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 mb-2">Primary Contact</h4>
              <p className="text-sm text-slate-700">privacy@peopleskilltraining.com</p>
              <p className="text-xs text-slate-500 mt-2">Response within 24 hours</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 text-center">
              <FiUserCheck className="text-amber-600 text-2xl mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 mb-2">Data Protection Officer</h4>
              <p className="text-sm text-slate-700">dpo@peopleskilltraining.com</p>
              <p className="text-xs text-slate-500 mt-2">For formal data requests</p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 text-center">
              <FiShield className="text-blue-600 text-2xl mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 mb-2">Security Team</h4>
              <p className="text-sm text-slate-700">security@peopleskilltraining.com</p>
              <p className="text-xs text-slate-500 mt-2">For security incidents</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-sm text-slate-700">
              <strong>Mailing Address:</strong> PeopleSkillTraining Inc., 123 Tech Park Drive, 
              Suite 500, San Francisco, CA 94107
            </p>
          </div>
        </div>
      );
      
    default:
      return null;
  }
}
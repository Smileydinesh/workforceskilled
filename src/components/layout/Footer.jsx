import { FiMail, FiPhone, FiMapPin, FiChevronRight, FiGlobe, FiVideo, FiBriefcase, FiUser, FiFileText, FiShield, FiPackage, FiRefreshCw } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlineAcademicCap, HiOutlineDocumentText, HiOutlineShieldCheck, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineLiveTv, MdOutlinePlayCircle, MdBusinessCenter, MdRocketLaunch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/icons/logo2.png";


export default function Footer() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <footer className="bg-gradient-to-b from-emerald-950 to-emerald-900 text-gray-100 relative overflow-hidden">

      {/* Animated Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-yellow-400/10 to-emerald-400/5"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Top gradient line with shine effect */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-emerald-400 to-yellow-400 animate-shine" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand with Icon */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-3xl bg-gradient-to-br from-yellow-500 to-emerald-400 shadow-lg flex items-center justify-center">
                <img
                    src={logo}
                    alt="ComplianceTrained Logo"
                    className="w-8 h-8 object-contain"
                />
                </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  WorkForce<span className="text-yellow-400">Skilled</span>
                </h3>
                <p className="text-emerald-300/90 text-sm font-medium mt-1">
                  Professional Learning Hub
                </p>
              </div>
            </div>
            <p className="text-emerald-300/80 text-sm leading-relaxed pr-4">
              Your trusted partner for expert compliance training solutions. 
              Stay ahead of regulatory requirements with our comprehensive 
              webinars and certification programs.
            </p>
          </div>

          {/* Training Column with Icons */}
          <div>
            <h4 className="text-white font-semibold mb-7 text-lg tracking-wide flex items-center gap-2">
              <div className="w-1.5 h-5 bg-gradient-to-b from-yellow-400 to-emerald-400 rounded-full"></div>
              Training
            </h4>
            <ul className="space-y-3.5">
              {[
                { text: "Live Webinars", icon: MdOutlineLiveTv, color: "text-red-400" },
                { text: "On-Demand Courses", icon: MdOutlinePlayCircle, color: "text-blue-400" },
                { text: "Enterprise Solutions", icon: MdBusinessCenter, color: "text-purple-400" },
                { text: "Get Started", icon: MdRocketLaunch, color: "text-yellow-400" }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onMouseEnter={() => setHoveredItem(`training-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="w-full text-left flex items-center gap-3 group relative"
                  >
                    {/* Animated border effect */}
                    <div className={`absolute -inset-2 rounded-lg border transition-all duration-300 ${
                      hoveredItem === `training-${idx}` 
                        ? 'border-yellow-400/50 bg-yellow-400/5' 
                        : 'border-transparent'
                    }`} />
                    
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <div className={`p-2 rounded-lg bg-emerald-900/50 group-hover:bg-emerald-800/70 transition-all duration-300 ${
                        hoveredItem === `training-${idx}` ? 'scale-110' : ''
                      }`}>
                        <item.icon className={`text-lg ${item.color}`} />
                      </div>
                      <span className="text-emerald-300/90 group-hover:text-white transition-colors duration-300 font-medium text-sm">
                        {item.text}
                      </span>
                      <FiChevronRight className={`ml-auto text-emerald-500 transition-all duration-300 ${
                        hoveredItem === `training-${idx}` ? 'translate-x-1 opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column with Icons */}
          <div>
            <h4 className="text-white font-semibold mb-7 text-lg tracking-wide flex items-center gap-2">
              <div className="w-1.5 h-5 bg-gradient-to-b from-yellow-400 to-emerald-400 rounded-full"></div>
              Company
            </h4>
            <ul className="space-y-3.5">
              {[
                { text: "About Us", icon: HiOutlineUserGroup, color: "text-emerald-400" },
                { text: "Contact", icon: FiUser, color: "text-sky-400" }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onMouseEnter={() => setHoveredItem(`company-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="w-full text-left flex items-center gap-3 group relative"
                  >
                    {/* Animated border effect */}
                    <div className={`absolute -inset-2 rounded-lg border transition-all duration-300 ${
                      hoveredItem === `company-${idx}` 
                        ? 'border-yellow-400/50 bg-yellow-400/5' 
                        : 'border-transparent'
                    }`} />
                    
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <div className={`p-2 rounded-lg bg-emerald-900/50 group-hover:bg-emerald-800/70 transition-all duration-300 ${
                        hoveredItem === `company-${idx}` ? 'scale-110' : ''
                      }`}>
                        <item.icon className={`text-lg ${item.color}`} />
                      </div>
                      <span className="text-emerald-300/90 group-hover:text-white transition-colors duration-300 font-medium text-sm">
                        {item.text}
                      </span>
                      <FiChevronRight className={`ml-auto text-emerald-500 transition-all duration-300 ${
                        hoveredItem === `company-${idx}` ? 'translate-x-1 opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column with Icons */}
          <div>
            <h4 className="text-white font-semibold mb-7 text-lg tracking-wide flex items-center gap-2">
              <div className="w-1.5 h-5 bg-gradient-to-b from-yellow-400 to-emerald-400 rounded-full"></div>
              Legal
            </h4>
            <ul className="space-y-3.5">
              {[
                { text: "Terms & Conditions", icon: FiFileText, color: "text-orange-400" },
                { text: "Privacy Policy", icon: FiShield, color: "text-green-400" },
                { text: "Refund Policy", icon: FiRefreshCw, color: "text-pink-400" },
                { text: "Shipping Policy", icon: FiPackage, color: "text-indigo-400" }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onMouseEnter={() => setHoveredItem(`legal-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="w-full text-left flex items-center gap-3 group relative"
                  >
                    {/* Animated border effect */}
                    <div className={`absolute -inset-2 rounded-lg border transition-all duration-300 ${
                      hoveredItem === `legal-${idx}` 
                        ? 'border-yellow-400/50 bg-yellow-400/5' 
                        : 'border-transparent'
                    }`} />
                    
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <div className={`p-2 rounded-lg bg-emerald-900/50 group-hover:bg-emerald-800/70 transition-all duration-300 ${
                        hoveredItem === `legal-${idx}` ? 'scale-110' : ''
                      }`}>
                        <item.icon className={`text-lg ${item.color}`} />
                      </div>
                      <span className="text-emerald-300/90 group-hover:text-white transition-colors duration-300 font-medium text-sm">
                        {item.text}
                      </span>
                      <FiChevronRight className={`ml-auto text-emerald-500 transition-all duration-300 ${
                        hoveredItem === `legal-${idx}` ? 'translate-x-1 opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Email Support */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-500" />
            <div className="relative bg-emerald-900/40 backdrop-blur-sm border border-emerald-800/30 rounded-xl p-6 transition-all duration-300 group-hover:border-emerald-700/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-emerald-400/20 group-hover:scale-110 transition-transform duration-300">
                  <FiMail className="text-yellow-400 text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2 text-lg">Email Support</h4>
                  <p className="text-emerald-200 font-medium text-base">support@compliancetrained.com</p>
                  <p className="text-emerald-400 text-sm mt-2">Fast response within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-yellow-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-500" />
            <div className="relative bg-emerald-900/40 backdrop-blur-sm border border-emerald-800/30 rounded-xl p-6 transition-all duration-300 group-hover:border-emerald-700/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400/20 to-yellow-400/20 group-hover:scale-110 transition-transform duration-300">
                  <FiMapPin className="text-emerald-400 text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2 text-lg">Our Location</h4>
                  <p className="text-emerald-200 font-medium text-base">
                    375 Redondo Ave #1190<br />
                    Long Beach, CA 90814<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Certifications - Horizontal */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { text: "SHRM Approved", color: "from-blue-500/20 to-blue-600/20", border: "border-blue-700/30" },
            { text: "HRCI Certified", color: "from-green-500/20 to-green-600/20", border: "border-green-700/30" },
            { text: "ISO 9001 Compliant", color: "from-purple-500/20 to-purple-600/20", border: "border-purple-700/30" }
          ].map((cert, idx) => (
            <div 
              key={idx}
              className={`px-5 py-3 rounded-lg bg-gradient-to-br ${cert.color} backdrop-blur-sm 
                       border ${cert.border} text-emerald-100 font-medium text-sm
                       transition-all duration-300 hover:scale-105 hover:shadow-lg 
                       hover:border-emerald-500/50 flex items-center gap-2`}
            >
              <HiOutlineShieldCheck className="text-lg" />
              {cert.text}
            </div>
          ))}
        </div>

        {/* Divider with subtle gradient */}
        <div className="relative my-12">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-700 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                      px-6 py-2 bg-emerald-950 rounded-full">
            <div className="w-8 h-1 bg-gradient-to-r from-yellow-400/50 via-emerald-400/50 to-yellow-400/50 rounded-full" />
          </div>
        </div>

        {/* Bottom Bar - Copyright Only */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <p className="text-emerald-400/90 text-sm">
            © {new Date().getFullYear()} WorkForceSkilled. All rights reserved.
          </p>
          <p className="text-emerald-500/80 text-xs max-w-md">
            Empowering businesses through expert WorkForceSkilled.
          </p>
        </div>

      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>

    </footer>
  );
}
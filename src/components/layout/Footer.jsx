import {
  FiMail,
  FiMapPin,
  FiChevronRight,
  FiFileText,
  FiShield,
  FiPackage,
  FiRefreshCw,
} from "react-icons/fi";
import { HiOutlineShieldCheck, HiOutlineUserGroup } from "react-icons/hi";
import {
  MdOutlineLiveTv,
  MdOutlinePlayCircle,
  MdRocketLaunch,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/icons/final.jpeg";

export default function Footer() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white text-gray-800 border-t border-emerald-100">
      {/* Animated top accent line */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* COMPACT MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* BRAND - Compact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400/30 to-teal-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden group-hover:scale-95 transition-transform duration-300">
                    <img
                      src={logo}
                      alt="WorkForceSkilled Logo"
                      className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
                  WorkForce<span className="text-emerald-600">Skilled</span>
                </h3>
                <p className="text-gray-600 text-xs font-medium">
                  Professional Learning Hub
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed pr-4">
              Your trusted partner for expert compliance training solutions.
            </p>
          </div>

          {/* TRAINING - Compact */}
          <FooterColumn
            title="Training"
            prefix="training"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              {
                text: "Live Webinars",
                path: "/live-webinars",
                icon: MdOutlineLiveTv,
                color: "text-emerald-500",
              },
              {
                text: "Recorded Webinars",
                path: "/recorded-webinars",
                icon: MdOutlinePlayCircle,
                color: "text-emerald-500",
              },
              {
                text: "Join With Us",
                path: "/signup",
                icon: MdRocketLaunch,
                color: "text-emerald-500",
              },
            ]}
          />

          {/* COMPANY - Compact */}
          <FooterColumn
            title="Company"
            prefix="company"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              {
                text: "About Us",
                path: "/about",
                icon: HiOutlineUserGroup,
                color: "text-emerald-500",
              },
              {
                text: "Contact",
                path: "/contact",
                icon: FiMapPin,
                color: "text-emerald-500",
              },
            ]}
          />

          {/* LEGAL - Compact */}
          <FooterColumn
            title="Legal"
            prefix="legal"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              {
                text: "Terms & Conditions",
                path: "/terms-and-conditions",
                icon: FiFileText,
                color: "text-emerald-500",
              },
              {
                text: "Privacy Policy",
                path: "/privacy-policy",
                icon: FiShield,
                color: "text-emerald-500",
              },
              {
                text: "Refund Policy",
                path: "/refund-cancellation-policy",
                icon: FiRefreshCw,
                color: "text-emerald-500",
              },
              {
                text: "Shipping & Return",
                path: "/shipping-return-policy",
                icon: FiPackage,
                color: "text-emerald-500",
              },
            ]}
          />
        </div>

        {/* ENHANCED CONTACT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white group-hover:scale-105 transition-transform duration-300">
                <FiMail size={22} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">Support Center</h4>
                <p className="text-emerald-700 font-medium text-base mb-1">support@workforceskilled.com</p>
                <p className="text-gray-600 text-sm">Response within 24 hours | Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-xl p-6 hover:border-teal-500 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white group-hover:scale-105 transition-transform duration-300">
                <FiMapPin size={22} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">Our Location</h4>
                <p className="text-gray-700 text-base leading-relaxed">
                  375 Redondo Ave #1190<br />
                  Long Beach, CA 90814<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT CERTIFICATIONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {["SHRM Approved", "HRCI Certified", "ISO 9001 Compliant"].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-emerald-200 text-sm font-medium text-emerald-700 hover:border-emerald-500 hover:shadow-md hover:scale-105 transition-all duration-300 group"
            >
              <HiOutlineShieldCheck size={18} className="group-hover:scale-110 transition-transform duration-300" />
              {text}
            </div>
          ))}
        </div>

        {/* COMPACT COPYRIGHT */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} WorkForceSkilled. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/terms-and-conditions" 
                className="hover:text-emerald-600 hover:border-b hover:border-emerald-600 transition-all duration-300 pb-0.5"
              >
                Terms
              </Link>
              <Link 
                to="/privacy-policy" 
                className="hover:text-emerald-600 hover:border-b hover:border-emerald-600 transition-all duration-300 pb-0.5"
              >
                Privacy
              </Link>
              <Link 
                to="/shipping-return-policy" 
                className="hover:text-emerald-600 hover:border-b hover:border-emerald-600 transition-all duration-300 pb-0.5"
              >
                Shipping & Return
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}

/* ================= COMPACT FOOTER COLUMN ================= */
function FooterColumn({ title, items, prefix, hoveredItem, setHoveredItem }) {
  return (
    <div>
      <h4 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
        <div className="w-1 h-3 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, idx) => {
          const isHovered = hoveredItem === `${prefix}-${idx}`;
          
          return (
            <li key={idx}>
              <Link
                to={item.path}
                onMouseEnter={() => setHoveredItem(`${prefix}-${idx}`)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center gap-3 group py-1.5 rounded-lg border border-transparent transition-all duration-300 ${
                  isHovered 
                    ? 'border-emerald-300 bg-emerald-50' 
                    : 'hover:border-emerald-200 hover:bg-emerald-50/50'
                }`}
              >
                {/* Icon with animation */}
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                  isHovered 
                    ? 'bg-emerald-100 border border-emerald-300 scale-110' 
                    : 'bg-gray-100 group-hover:bg-emerald-100 group-hover:border group-hover:border-emerald-200'
                }`}>
                  <item.icon className={`transition-colors duration-300 ${
                    isHovered ? 'text-emerald-600' : item.color
                  }`} size={16} />
                </div>
                
                {/* Text */}
                <span className={`text-sm transition-all duration-300 ${
                  isHovered 
                    ? 'text-emerald-700 font-medium translate-x-1' 
                    : 'text-gray-600 group-hover:text-emerald-700'
                }`}>
                  {item.text}
                </span>
                
                {/* Arrow indicator */}
                <FiChevronRight
                  className={`ml-auto transition-all duration-300 ${
                    isHovered 
                      ? 'opacity-100 translate-x-0 text-emerald-500' 
                      : 'opacity-0 -translate-x-1'
                  }`}
                  size={14}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
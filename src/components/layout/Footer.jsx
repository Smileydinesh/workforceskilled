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
    <footer className="bg-gradient-to-br from-slate-50 to-emerald-50/50 text-slate-800 border-t-2 border-emerald-200/50 relative overflow-hidden">
      {/* Compact Animated Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400/80 via-teal-400/80 to-emerald-500/80 shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* COMPACT MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* COMPACT BRAND - NEW LOGO STYLE */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 group">
              {/* NEW MODERN LOGO DESIGN */}
              <div className="relative p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg border-2 border-white/30 group-hover:shadow-emerald-400/40 transition-all duration-400">
                <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-md overflow-hidden group-hover:bg-white group-hover:scale-105 transition-all duration-400">
                  <img
                    src={logo}
                    alt="WorkForceSkilled Logo"
                    className="w-8 h-8 object-contain group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
                {/* Logo Glow Ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 opacity-0 group-hover:opacity-20 blur-xl rounded-xl transition-all duration-500 animate-ping" />
              </div>

              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-emerald-900 bg-clip-text text-transparent">
                  WorkForce<span className="text-emerald-600 font-black">Skilled</span>
                </h3>
                <p className="text-emerald-600 font-medium text-sm tracking-wide">Learning Hub</p>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Expert compliance training with industry certifications.
            </p>
          </div>

          {/* TRAINING */}
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

          {/* COMPANY */}
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

          {/* LEGAL */}
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

        {/* COMPACT CONTACT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50 hover:border-emerald-400/70 hover:shadow-lg transition-all duration-400">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-md group-hover:scale-105 transition-all duration-300">
                <FiMail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-base">Support</h4>
                <a href="mailto:support@workforceskilled.com" className="text-emerald-600 font-semibold hover:text-emerald-700 block mb-1">
                  support@workforceskilled.com
                </a>
                <p className="text-xs text-slate-600">24hr response | Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 hover:border-teal-400/70 hover:shadow-lg transition-all duration-400">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-xl shadow-md group-hover:scale-105 transition-all duration-300">
                <FiMapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-base">Location</h4>
                <p className="text-slate-700 text-sm leading-tight">
                  375 Redondo Ave #1190<br />
                  Long Beach, CA 90814
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COMPACT CERTIFICATIONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["SHRM Approved", "HRCI Certified", "ISO 9001"].map((text, i) => (
            <div
              key={i}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 border border-emerald-200/60 backdrop-blur-sm text-sm font-semibold text-emerald-700 hover:border-emerald-400 hover:shadow-md hover:scale-105 transition-all duration-300 shadow-sm"
            >
              <HiOutlineShieldCheck size={16} className="group-hover:scale-110 transition-transform" />
              {text}
            </div>
          ))}
        </div>

        {/* COMPACT COPYRIGHT */}
        <div className="pt-6 border-t border-slate-200/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-medium">
            <span>© {new Date().getFullYear()} WorkForceSkilled. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link to="/terms-and-conditions" className="hover:text-emerald-600 hover:underline font-semibold transition-all duration-300">
                Terms
              </Link>
              <Link to="/privacy-policy" className="hover:text-emerald-600 hover:underline font-semibold transition-all duration-300">
                Privacy
              </Link>
              <Link to="/shipping-return-policy" className="hover:text-emerald-600 hover:underline font-semibold transition-all duration-300">
                Shipping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 3s ease-in-out infinite;
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </footer>
  );
}

/* COMPACT ENHANCED FOOTER COLUMN */
function FooterColumn({ title, items, prefix, hoveredItem, setHoveredItem }) {
  return (
    <div>
      <h4 className="text-slate-900 font-bold mb-6 text-base uppercase tracking-wide flex items-center gap-2 pb-2">
        <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full shadow-sm" />
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
                className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border border-transparent transition-all duration-400 group ${
                  isHovered 
                    ? 'border-emerald-300/70 bg-emerald-50 shadow-md scale-105 translate-x-1' 
                    : 'hover:border-emerald-200 hover:bg-emerald-50/60 hover:shadow-sm'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-400 shrink-0 ${
                  isHovered 
                    ? 'bg-emerald-500/90 shadow-lg' 
                    : 'bg-slate-100 hover:bg-emerald-100/70'
                }`}>
                  <item.icon className={`transition-colors duration-400 ${
                    isHovered ? 'text-white' : 'text-slate-600 group-hover:text-emerald-600'
                  }`} size={16} />
                </div>
                
                <span className={`text-sm font-medium transition-all duration-400 flex-1 ${
                  isHovered ? 'text-emerald-800 font-semibold' : 'text-slate-700'
                }`}>
                  {item.text}
                </span>
                
                <FiChevronRight
                  className={`ml-auto transition-all duration-400 ${
                    isHovered 
                      ? 'opacity-100 translate-x-1 text-emerald-500 scale-110' 
                      : 'opacity-0 -translate-x-2 scale-90'
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

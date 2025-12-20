import { FiMail, FiMapPin, FiChevronRight, FiFileText, FiShield, FiPackage, FiRefreshCw } from "react-icons/fi";
import { HiOutlineShieldCheck, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineLiveTv, MdOutlinePlayCircle, MdRocketLaunch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/icons/logo5.jpeg";

export default function Footer() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <footer className="bg-gradient-to-b from-emerald-950 to-emerald-900 text-gray-100 relative overflow-hidden">

      {/* SUBTLE INFINITE MOVING BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -inset-x-full top-0 h-full bg-gradient-to-r 
          from-transparent via-yellow-400/10 to-transparent animate-footer-flow" />
      </div>

      {/* Top gradient shine line (unchanged) */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-emerald-400 to-yellow-400 animate-shine" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* BRAND (LOGO + TITLE ONLY UPDATED VISUALLY) */}
          <div className="space-y-6">
            <div className="group flex items-center gap-4">

              {/* LOGO */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-400/40 to-emerald-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-emerald-500 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-emerald-950 flex items-center justify-center">
                    <img src={logo} alt="WorkForceSkilled Logo" className="w-7 h-7 object-contain" />
                  </div>
                </div>
              </div>

              {/* TITLE */}
              <div className="leading-tight">
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-yellow-300 transition-colors">
                  WorkForce<span className="text-yellow-400">Skilled</span>
                </h3>
                <p className="text-emerald-300/90 text-sm font-medium group-hover:text-emerald-200 transition-colors">
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

          {/* TRAINING */}
          <FooterColumn
            title="Training"
            prefix="training"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              { text: "Live Webinars", path: "/live-webinars", icon: MdOutlineLiveTv, color: "text-red-400" },
              { text: "Recorded Webinars", path: "/recorded-webinars", icon: MdOutlinePlayCircle, color: "text-blue-400" },
              { text: "Join With Us", path: "/signup", icon: MdRocketLaunch, color: "text-yellow-400" },
            ]}
          />

          {/* COMPANY */}
          <FooterColumn
            title="Company"
            prefix="company"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              { text: "About Us", path: "/about", icon: HiOutlineUserGroup, color: "text-emerald-400" },
              { text: "Contact", path: "/contact", icon: FiMapPin, color: "text-sky-400" },
            ]}
          />

          {/* LEGAL */}
          <FooterColumn
            title="Legal"
            prefix="legal"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              { text: "Terms & Conditions", path: "/terms-and-conditions", icon: FiFileText, color: "text-orange-400" },
              { text: "Privacy Policy", path: "/privacy-policy", icon: FiShield, color: "text-green-400" },
              { text: "Refund & Cancellation", path: "/refund-cancellation-policy", icon: FiRefreshCw, color: "text-pink-400" },
              { text: "Shipping & Return", path: "/shipping-return-policy", icon: FiPackage, color: "text-indigo-400" },
            ]}
          />

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
          <h4 className="text-white font-semibold mb-2 text-lg">
            Email Support
          </h4>
          <p className="text-emerald-200 font-medium text-base">
            support@workforceskilled.com
          </p>
          <p className="text-emerald-400 text-sm mt-2">
            Fast response within 24 hours
          </p>
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
          <h4 className="text-white font-semibold mb-2 text-lg">
            Our Location
          </h4>
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


        {/* CERTIFICATIONS (UNCHANGED) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["SHRM Approved", "HRCI Certified", "ISO 9001 Compliant"].map((text, i) => (
            <div key={i} className="px-5 py-3 rounded-lg bg-emerald-900/40 border border-emerald-700/30 text-sm flex items-center gap-2 hover:scale-105 transition">
              <HiOutlineShieldCheck />
              {text}
            </div>
          ))}
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-sm text-emerald-400">
          © {new Date().getFullYear()} WorkForceSkilled. All rights reserved.
        </div>

      </div>

      {/* FOOTER ANIMATIONS */}
      <style jsx>{`
        @keyframes footer-flow {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
        .animate-footer-flow {
          animation: footer-flow 20s linear infinite;
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

/* REUSABLE COLUMN — NO LOGIC CHANGED */
function FooterColumn({ title, items, prefix, hoveredItem, setHoveredItem }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-7 text-lg flex items-center gap-2">
        <div className="w-1.5 h-5 bg-gradient-to-b from-yellow-400 to-emerald-400 rounded-full"></div>
        {title}
      </h4>
      <ul className="space-y-3.5">
        {items.map((item, idx) => (
          <li key={idx}>
            <Link
              to={item.path}
              onMouseEnter={() => setHoveredItem(`${prefix}-${idx}`)}
              onMouseLeave={() => setHoveredItem(null)}
              className="flex items-center gap-3 group relative"
            >
              <div className={`absolute -inset-2 rounded-lg transition ${
                hoveredItem === `${prefix}-${idx}` ? "bg-yellow-400/5 border border-yellow-400/50" : ""
              }`} />
              <div className="relative flex items-center gap-3 w-full">
                <div className="p-2 rounded-lg bg-emerald-900/50 group-hover:scale-110 transition">
                  <item.icon className={item.color} />
                </div>
                <span className="text-emerald-300 group-hover:text-white text-sm font-medium">
                  {item.text}
                </span>
                <FiChevronRight className={`ml-auto transition ${
                  hoveredItem === `${prefix}-${idx}` ? "opacity-100 translate-x-1" : "opacity-0"
                }`} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

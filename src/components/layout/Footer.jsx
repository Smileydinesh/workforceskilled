import {
  FiMail,
  FiMapPin,
  FiChevronRight,
  FiFileText,
  FiShield,
  FiPackage,
  FiRefreshCw,
} from "react-icons/fi";
import { MdWorkspacePremium } from "react-icons/md";

import { HiOutlineUserGroup } from "react-icons/hi";
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
    <footer className="bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 text-slate-800 border-t border-sky-200 relative overflow-hidden">

      {/* TOP GRADIENT BORDER */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-500 shadow-sm" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">

          {/* BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative p-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg border border-white/40">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow overflow-hidden">
                  <img
                    src={logo}
                    alt="WorkForceSkilled Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  WorkForce
                  <span className="text-sky-600 font-black">Skilled</span>
                </h3>
                <p className="text-sky-600 text-sm font-medium">
                  Professional Learning Hub
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Your trusted platform for expert-led webinars and professional
              learning experiences.
            </p>
          </div>

          {/* TRAINING */}
          <FooterColumn
            title="Training"
            prefix="training"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              { text: "Live Webinars", path: "/live-webinars", icon: MdOutlineLiveTv },
              { text: "Recorded Webinars", path: "/recorded-webinars", icon: MdOutlinePlayCircle },
              { text: "Join With Us", path: "/signup", icon: MdRocketLaunch },
              { text: "Subscription Plans", path: "subscriptions/checkout", icon: MdWorkspacePremium },
            ]}
          />

          {/* COMPANY */}
          <FooterColumn
            title="Company"
            prefix="company"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              { text: "About Us", path: "/about", icon: HiOutlineUserGroup },
              { text: "Contact", path: "/contact", icon: FiMapPin },
            ]}
          />

          {/* LEGAL */}
          <FooterColumn
            title="Legal"
            prefix="legal"
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            items={[
              { text: "Terms & Conditions", path: "/terms-and-conditions", icon: FiFileText },
              { text: "Privacy Policy", path: "/privacy-policy", icon: FiShield },
              { text: "Refund Policy", path: "/refund-cancellation-policy", icon: FiRefreshCw },
              { text: "Shipping & Return", path: "/shipping-return-policy", icon: FiPackage },
            ]}
          />
        </div>

        {/* ================= CONTACT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-xl p-6 border border-sky-200 shadow-sm">
            <div className="flex gap-4">
              <div className="p-3 mt-3 mb-3 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-lg">
                <FiMail size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Support</h4>
                <a
                  href="mailto:support@workforceskilled.com"
                  className="text-sky-600 font-semibold hover:underline"
                >
                  support@workforceskilled.com
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Mon–Fri • 9AM–6PM EST
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-200 shadow-sm">
            <div className="flex gap-4">
              <div className="p-3 mt-3 mb-3 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-lg">
                <FiMapPin size={18} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Location</h4>
                <p className="text-sm text-slate-700">
                  375 Redondo Ave #1190<br />
                  Long Beach, CA 90814
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="pt-6 border-t border-sky-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <span>© {new Date().getFullYear()} WorkForceSkilled. All rights reserved.</span>
            <div className="flex gap-4">
              <Link to="/terms-and-conditions" className="hover:text-sky-600 font-semibold">Terms</Link>
              <Link to="/privacy-policy" className="hover:text-sky-600 font-semibold">Privacy</Link>
              <Link to="/shipping-return-policy" className="hover:text-sky-600 font-semibold">Shipping</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* ================= FOOTER COLUMN ================= */
function FooterColumn({ title, items, prefix, hoveredItem, setHoveredItem }) {
  return (
    <div>
      <h4 className="text-slate-900 font-bold mb-4 uppercase text-sm flex items-center gap-2">
        <span className="w-1 h-5 bg-gradient-to-b from-sky-500 to-blue-600 rounded-full" />
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
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isHovered
                    ? "bg-sky-100 text-sky-700 shadow-sm"
                    : "hover:bg-sky-50"
                }`}
              >
                <item.icon
                  size={16}
                  className={isHovered ? "text-sky-600" : "text-slate-500"}
                />
                <span className="text-sm font-medium flex-1">{item.text}</span>
                <FiChevronRight
                  size={14}
                  className={`transition ${
                    isHovered ? "opacity-100 translate-x-1" : "opacity-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

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
import logo from "../../assets/images/icons/logo5.jpeg";

export default function Footer() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
<footer className="bg-white from-emerald-50 via-white to-emerald-50 text-emerald-900 relative overflow-hidden">
      {/* SUBTLE MOVING BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -inset-x-full top-0 h-full bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent animate-footer-flow" />
      </div>

      {/* TOP SHINE */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 animate-shine" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* BRAND */}
          <div className="space-y-6">
            <div className="group flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-emerald-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 rounded-full bg-emerald-600 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-emerald-50 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="WorkForceSkilled Logo"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="leading-tight">
                <h3 className="text-2xl font-bold group-hover:text-emerald-700 transition">
                  WorkForce<span className="text-emerald-600">Skilled</span>
                </h3>
                <p className="text-emerald-700 text-sm font-medium">
                  Professional Learning Hub
                </p>
              </div>
            </div>

            <p className="text-emerald-700 text-sm leading-relaxed pr-4">
              Your trusted partner for expert compliance training solutions.
              Learn from professionals with confidence.
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
                color: "text-emerald-700",
              },
              {
                text: "Recorded Webinars",
                path: "/recorded-webinars",
                icon: MdOutlinePlayCircle,
                color: "text-emerald-700",
              },
              {
                text: "Join With Us",
                path: "/signup",
                icon: MdRocketLaunch,
                color: "text-emerald-700",
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
                color: "text-emerald-700",
              },
              {
                text: "Contact",
                path: "/contact",
                icon: FiMapPin,
                color: "text-emerald-700",
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
                color: "text-emerald-700",
              },
              {
                text: "Privacy Policy",
                path: "/privacy-policy",
                icon: FiShield,
                color: "text-emerald-700",
              },
              {
                text: "Refund & Cancellation",
                path: "/refund-cancellation-policy",
                icon: FiRefreshCw,
                color: "text-emerald-700",
              },
              {
                text: "Shipping & Return",
                path: "/shipping-return-policy",
                icon: FiPackage,
                color: "text-emerald-700",
              },
            ]}
          />
        </div>

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ContactCard
            icon={<FiMail className="text-emerald-700 text-xl" />}
            title="Email Support"
            content="support@workforceskilled.com"
            sub="Response within 24 hours"
          />
          <ContactCard
            icon={<FiMapPin className="text-emerald-700 text-xl" />}
            title="Our Location"
            content={
              <>
                375 Redondo Ave #1190
                <br />
                Long Beach, CA 90814
                <br />
                United States
              </>
            }
          />
        </div>

        {/* CERTIFICATIONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["SHRM Approved", "HRCI Certified", "ISO 9001 Compliant"].map(
            (text, i) => (
              <div
                key={i}
                className="px-5 py-3 rounded-lg bg-emerald-100 border border-emerald-300 text-sm flex items-center gap-2 hover:scale-105 transition"
              >
                <HiOutlineShieldCheck className="text-emerald-700" />
                {text}
              </div>
            )
          )}
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-sm text-emerald-700">
          © {new Date().getFullYear()} WorkForceSkilled. All rights reserved.
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes footer-flow {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
        .animate-footer-flow {
          animation: footer-flow 22s linear infinite;
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 2.5s infinite;
        }
      `}</style>
    </footer>
  );
}

/* ================= REUSABLE COLUMN ================= */
function FooterColumn({ title, items, prefix, hoveredItem, setHoveredItem }) {
  return (
    <div>
      <h4 className="text-emerald-900 font-semibold mb-7 text-lg flex items-center gap-2">
        <div className="w-1.5 h-5 bg-emerald-600 rounded-full" />
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
              <div
                className={`absolute -inset-2 rounded-lg transition ${
                  hoveredItem === `${prefix}-${idx}`
                    ? "bg-emerald-200/60 border border-emerald-400"
                    : ""
                }`}
              />
              <div className="relative flex items-center gap-3 w-full">
                <div className="p-2 rounded-lg bg-emerald-200 group-hover:scale-110 transition">
                  <item.icon className={item.color} />
                </div>
                <span className="text-emerald-800 group-hover:text-emerald-900 text-sm font-medium">
                  {item.text}
                </span>
                <FiChevronRight
                  className={`ml-auto transition ${
                    hoveredItem === `${prefix}-${idx}`
                      ? "opacity-100 translate-x-1"
                      : "opacity-0"
                  }`}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================= CONTACT CARD ================= */
function ContactCard({ icon, title, content, sub }) {
  return (
    <div className="relative bg-emerald-100 border border-emerald-300 rounded-xl p-6 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-emerald-200">{icon}</div>
        <div>
          <h4 className="text-emerald-900 font-semibold mb-2">{title}</h4>
          <p className="text-emerald-800">{content}</p>
          {sub && <p className="text-emerald-600 text-sm mt-2">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

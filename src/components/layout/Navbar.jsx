import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSearch,
  FiChevronRight
} from "react-icons/fi";
import { MdOutlineLiveTv } from "react-icons/md";
import logo from "../../assets/images/icons/logo2.png";

const links = [
  { label: "About", href: "/about" },
  { label: "Live Webinars", href: "/live-webinars" },
  { label: "Recorded Webinars", href: "/recorded-webinars" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartCount] = useState(2);
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-emerald-900/95 via-emerald-900/90 to-emerald-950/95 backdrop-blur-xl border-b border-emerald-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo + Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-1 shadow-2xl shadow-emerald-500/30">
              <motion.div
                animate={{ x: [-100, 200] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              <div className="relative w-full h-full bg-gradient-to-br from-emerald-600/90 to-emerald-700/90 rounded-xl flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
            </div>

            <div>
              <h1 className="text-lg lg:text-xl font-bold text-white">
                Workforce<span className="text-yellow-400">Skilled</span>
              </h1>
              <p className="text-xs text-emerald-300/80">Professional Learning Hub</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Search */}
            <motion.div
              animate={{ width: searchFocused ? "300px" : "240px" }}
              className="relative"
            >
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-300/80" />
              <input
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search webinars"
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white/5 text-white border border-emerald-700/30"
              />
            </motion.div>

            {/* Links */}
            <div className="flex gap-8">
              {links.map((link, i) => (
                <a key={i} href={link.href} className="text-white/90 hover:text-white text-sm">
                  {link.label}
                  {link.label === "Live Webinars" && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                      LIVE
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">

              {/* Cart */}
              <div className="relative">
                <FiShoppingCart className="text-white text-lg" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 rounded-full">
                  {cartCount}
                </span>
              </div>

              {/* Login */}
              <button className="text-white text-sm px-4 py-2 rounded-xl border border-emerald-700/30">
                Login
              </button>

              {/* ✅ NEW SIGN UP BUTTON (ONLY CHANGE) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  relative px-5 py-2.5 rounded-xl text-sm font-semibold
                  text-yellow-300
                  border border-yellow-400/60
                  backdrop-blur-md
                  bg-white/5
                  hover:bg-yellow-400/10
                  hover:text-yellow-200
                  shadow-[0_0_0_0_rgba(250,204,21,0.4)]
                  hover:shadow-[0_0_25px_-5px_rgba(250,204,21,0.6)]
                  transition-all
                "
              >
                Sign Up
              </motion.button>

            </div>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
            {open ? <FiX /> : <FiMenu />}
          </button>

        </div>
      </div>
    </nav>
  );
}

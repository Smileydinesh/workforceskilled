import { useState } from "react";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSearch,
  FiChevronRight
} from "react-icons/fi";
// import { MdOutlineLiveTv } from "react-icons/md";
import logo from "../../assets/images/icons/logo3.jpg";

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
  // const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-emerald-900/95 via-emerald-900/90 to-emerald-950/95 backdrop-blur-xl border-b border-emerald-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo + Title */}
<Link to="/" className="group flex items-center gap-3">
  <motion.div
    whileHover={{ scale: 1.06 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="relative"
  >
    {/* Glow — BEHIND everything */}
    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-400/40 to-emerald-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

    {/* Ring */}
    <div className="relative z-10 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-gradient-to-br from-yellow-400 to-emerald-500 p-[1.5px] overflow-hidden">
      
      {/* ✅ SHINE EFFECT (YOUR ORIGINAL IDEA — RESTORED) */}
      <motion.div
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />

      {/* Glass */}
      <div className="relative z-10 w-full h-full rounded-full bg-emerald-950/80 backdrop-blur flex items-center justify-center">
        <img
          src={logo}
          alt="WorkforceSkilled Logo"
          className="w-7 h-8 lg:w-8 lg:h-8 object-contain"
        />
      </div>
    </div>
  </motion.div>

  {/* Text */}
  <div>
    <h1 className="text-lg lg:text-xl font-bold text-white tracking-tight">
      Workforce<span className="text-yellow-400">Skilled</span>
    </h1>
    <p className="text-xs text-emerald-300/80">
      Professional Learning Hub
    </p>
  </div>
</Link>



          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Search */}
            <motion.div
             animate={{ width: searchFocused ? "260px" : "240px" }}
             transition={{ duration: 0.25, ease: "easeOut" }}

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
                 <Link
                    key={i}
                    to={link.href}
                    className="
                      relative text-white/90 text-sm
                      transition-colors duration-300 ease-out
                      hover:text-white
                      after:content-['']
                      after:absolute after:left-1/2 after:-bottom-1
                      after:h-[2px] after:w-0
                      after:bg-gradient-to-r after:from-yellow-300 after:to-emerald-400
                      after:transition-all after:duration-300 after:ease-out
                      hover:after:w-full hover:after:left-0
                    "
                  >
                    {link.label}

                    {link.label === "Live Webinars" && (
                      <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                        LIVE
                      </span>
                    )}
                  </Link>

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
              <Link
                to="/login"
                className="text-white text-sm px-4 py-2 rounded-xl border border-emerald-700/30 hover:bg-white/10"
              >
                Login
              </Link>


              {/* ✅ NEW SIGN UP BUTTON (ONLY CHANGE) */}
              <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-5 py-2.5 rounded-xl text-sm font-semibold
                        text-yellow-300 border border-yellow-400/60
                        backdrop-blur-md bg-white/5 hover:bg-yellow-400/10
                        hover:text-yellow-200 transition-all"
                    >
                      Sign Up
                    </motion.button>
                  </Link>


            </div>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
            {open ? <FiX /> : <FiMenu />}
          </button>

        </div>
              {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-gradient-to-b from-emerald-900 to-emerald-950/95 border-t border-emerald-700/30"
          >
            <div className="px-4 py-6 space-y-4">

              {/* Mobile Search */}
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-300" />
                <input
                  type="text"
                  placeholder="Search webinars"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white border border-emerald-700/30"
                />
              </div>

              {/* Mobile Links */}
             {/* Mobile Links */}
              <div className="space-y-1">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block p-3 rounded-xl text-white hover:bg-emerald-700/30"
                  >
                    <div className="flex justify-between items-center">
                      <span>{link.label}</span>
                      {link.label === "Live Webinars" && (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                          LIVE
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>


              {/* Mobile Actions */}
              <div className="pt-4 border-t border-emerald-700/30 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white">Cart</span>
                  <span className="bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                    {cartCount}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 rounded-xl border border-emerald-700/30 text-white">
                    Login
                  </button>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-5 py-2.5 rounded-xl text-sm font-semibold
                        text-yellow-300 border border-yellow-400/60
                        backdrop-blur-md bg-white/5 hover:bg-yellow-400/10
                        hover:text-yellow-200 transition-all"
                    >
                      Sign Up
                    </motion.button>
                  </Link>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </nav>
  );
}

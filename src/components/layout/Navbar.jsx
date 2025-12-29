import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";
import logo from "../../assets/images/icons/logo5.jpeg";
import { useCart } from "../../context/CartContext";

const links = [
  { label: "About", href: "/about" },
  { label: "Live Webinars", href: "/live-webinars" },
  { label: "Recorded Webinars", href: "/recorded-webinars" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const { cartCount, fetchCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartCount();

    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchCartCount();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-gradient-to-b from-white via-emerald-50 to-emerald-100
        backdrop-blur-xl
        border-b border-emerald-200
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* LOGO + TITLE */}
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute -inset-1 rounded-full bg-emerald-300/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-[1.5px]">
                <motion.div
                  animate={{ x: [-120, 220] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <img
                    src={logo}
                    alt="WorkforceSkilled Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
            </motion.div>

            <div className="leading-tight">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                Workforce<span className="text-emerald-600">Skilled</span>
              </h1>
              <p className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors">
                Professional Learning Hub
              </p>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center gap-8">

            {/* SEARCH */}
            <motion.div
              animate={{ width: searchFocused ? "245px" : "230px" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative"
            >
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" />
              <input
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search webinars"
                className="
                  w-full pl-12 pr-12 py-2.5 rounded-xl
                  bg-white text-gray-900
                  border border-emerald-300
                  text-sm placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/50
                "
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition">
                <FiSearch />
              </button>
            </motion.div>

            {/* LINKS */}
            <div className="flex gap-8">
              {links.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.href}
                  className={({ isActive }) =>
                    `relative text-sm font-semibold transition-colors duration-300
                    ${isActive ? "text-emerald-700" : "text-gray-800 hover:text-emerald-700"}
                    after:content-['']
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-full
                    after:bg-emerald-600
                    after:scale-x-0 after:origin-center
                    after:transition-transform after:duration-300
                    hover:after:scale-x-100
                    ${isActive ? "after:scale-x-100" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">

              {/* CART */}
              <Link to="/cart" className="relative">
                <FiShoppingCart className="text-gray-800 text-lg hover:text-emerald-700 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold px-2 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* AUTH */}
              {user ? (
                <>
                  <span className="text-gray-700 text-sm font-semibold">
                    Hi, {user.first_name}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="
                      px-5 py-2.5 rounded-xl text-sm font-semibold
                      text-white bg-emerald-600 hover:bg-emerald-700
                      transition-all flex items-center gap-2
                    "
                  >
                    <FiLogOut />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-800 text-sm px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
                  >
                    Login
                  </Link>

                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        px-5 py-2.5 rounded-xl text-sm font-semibold
                        text-white bg-emerald-600 hover:bg-emerald-700
                        transition-all
                      "
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-900">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="
                lg:hidden
                bg-white
                border-t border-emerald-200
              "
            >
              <div className="px-4 py-6 space-y-3">
                {links.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block p-3 rounded-xl text-gray-800 hover:bg-emerald-50"
                  >
                    {link.label}
                  </NavLink>
                ))}

                {user && (
                  <button
                    onClick={handleLogout}
                    className="w-full p-3 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 text-left"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

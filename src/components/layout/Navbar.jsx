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


  /* ---------------- LOAD USER & CART ---------------- */
  useEffect(() => {
    fetchCartCount();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-emerald-900/95 via-emerald-900/90 to-emerald-950/95 backdrop-blur-xl border-b border-emerald-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* LOGO + TITLE */}
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-400/40 to-emerald-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-emerald-500 p-[1.5px]">
                <motion.div
                  animate={{ x: [-120, 220] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                />
                <div className="w-full h-full rounded-full bg-emerald-950/80 flex items-center justify-center">
                  <img src={logo} alt="WorkforceSkilled Logo" className="w-8 h-8 object-contain" />
                </div>
              </div>
            </motion.div>

            <div className="leading-tight">
              <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight group-hover:text-yellow-300 transition-colors">
                Workforce<span className="text-yellow-400">Skilled</span>
              </h1>
              <p className="text-sm text-emerald-300/80 group-hover:text-emerald-200 transition-colors">
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
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-300/80" />
              <input
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search webinars"
                className="w-full pl-12 pr-12 py-2.5 rounded-xl bg-white/5 text-white border border-emerald-700/30 text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 transition">
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
                    `relative text-sm font-medium transition-colors duration-300
                    ${isActive ? "text-yellow-300" : "text-white/90 hover:text-white"}
                    after:content-['']
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-full
                    after:bg-gradient-to-r after:from-yellow-300 after:to-emerald-400
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
                <FiShoppingCart className="text-white text-lg hover:text-yellow-300 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-emerald-950 text-xs font-bold px-2 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* AUTH */}
              {user ? (
                <>
                  {/* USER NAME */}
                  <span className="text-yellow-300 text-sm font-semibold">
                    Hi, {user.first_name}
                  </span>

                  {/* LOGOUT */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold
                      text-yellow-300 border border-yellow-400/60
                      backdrop-blur-md bg-white/5 hover:bg-yellow-400/10
                      hover:text-yellow-200 transition-all flex items-center gap-2"
                  >
                    <FiLogOut />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white text-sm px-4 py-2 rounded-xl border border-emerald-700/30 hover:bg-white/10"
                  >
                    Login
                  </Link>

                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold
                        text-yellow-300 border border-yellow-400/60
                        backdrop-blur-md bg-white/5 hover:bg-yellow-400/10
                        hover:text-yellow-200 transition-all"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
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
              className="lg:hidden bg-gradient-to-b from-emerald-900 to-emerald-950/95 border-t border-emerald-700/30"
            >
              <div className="px-4 py-6 space-y-3">
                {links.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block p-3 rounded-xl text-white hover:bg-emerald-700/30"
                  >
                    {link.label}
                  </NavLink>
                ))}

                {user && (
                  <button
                    onClick={handleLogout}
                    className="w-full p-3 rounded-xl text-yellow-300 hover:bg-emerald-700/30 text-left"
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

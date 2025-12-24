import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiVideo,
  FiUsers,
  FiClock,
  FiMonitor,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- LOGIN SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid email or password");
        setLoading(false);
        return;
      }

      /* ---------------- STORE TOKENS ---------------- */
      if (remember) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("access", data.access);
        sessionStorage.setItem("refresh", data.refresh);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }


      /* ---------------- REDIRECT ---------------- */
      navigate("/");

    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 flex">
      
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20"
      >
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <FiMonitor className="text-2xl text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">WorkForceSkilled</h2>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            Your journey to professional excellence starts here
          </h1>
        </div>

        <div className="space-y-8">
          <Feature icon={<FiMonitor />} title="Live Webinars" />
          <Feature icon={<FiVideo />} title="Recorded Library" />
          <Feature icon={<FiClock />} title="Flexible Learning" />
          <Feature icon={<FiUsers />} title="Expert Network" />
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl opacity-40 -z-10" />

          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <FiMonitor className="text-2xl text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">WorkForceSkilled</h2>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-emerald-300 text-sm mt-2">
              Sign in to your WorkForceSkilled account
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div>
              <label className="block text-sm text-emerald-200 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-emerald-200 mb-1">
                Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50"
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* ACTIONS */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-emerald-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-emerald-400 w-4 h-4"
                />
                Remember me
              </label>
              <Link
                to="#"
                className="text-emerald-400 hover:text-emerald-300 hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition shadow-emerald-500/25 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
              <FiArrowRight />
            </motion.button>
          </form>

          {/* FOOTER */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-emerald-300 text-sm">
              New to WorkForceSkilled?{" "}
              <Link
                to="/signup"
                className="text-emerald-400 font-semibold hover:text-emerald-300 hover:underline transition"
              >
                Create an account
              </Link>
            </p>
            <p className="text-emerald-300/70 text-xs mt-4">
              © 2025 WorkForceSkilled. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- FEATURE COMPONENT ---------------- */
function Feature({ icon, title }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-emerald-300/80">
          Professional learning designed for real-world impact
        </p>
      </div>
    </div>
  );
}

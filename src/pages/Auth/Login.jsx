import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiVideo,
  FiUsers,
  FiArrowLeft,
  FiCheck,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/icons/final.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
      const res = await fetch(`${API_BASE}/api/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid email or password");
        return;
      }

      if (remember) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("access", data.access);
        sessionStorage.setItem("refresh", data.refresh);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-6">

      {/* Back Button */}
      <div className="w-full max-w-4xl mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-[1fr_1.3fr] gap-10">

        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white"
        >
          <div className="flex flex-col h-full justify-between">

            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-white/15 flex items-center justify-center">
                  <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">WorkForceSkilled</h1>
                  <p className="text-sky-100">Professional Learning Platform</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">
                Welcome Back 👋
              </h2>
              <p className="text-sky-100 mb-8">
                Sign in to continue your professional learning journey.
              </p>

              <div className="space-y-4">
                {[
                  "Resume your learning",
                  "Join live webinars",
                  "Access recorded sessions",
                  "Connect with experts",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FiCheck className="w-5 h-5" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/20 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white/20">
                  <FiVideo className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Recorded Library</h4>
                  <p className="text-sm text-sky-100">Learn anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white/20">
                  <FiUsers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Expert Network</h4>
                  <p className="text-sm text-sky-100">Industry professionals</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Sign In
          </h3>
          <p className="text-slate-600 mb-8">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-sky-600"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-sky-600 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-slate-300"
                  : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg"
              }`}
            >
              {loading ? "Signing in..." : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <FiArrowRight />
                </span>
              )}
            </motion.button>

            {/* Signup */}
            <p className="text-center text-sm text-slate-600 pt-4 border-t">
              New here?{" "}
              <Link
                to="/signup"
                className="text-sky-600 font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>

            {/* Footer */}
            <div className="text-center text-xs text-slate-500 mt-6">
              © 2025 WorkForceSkilled
            </div>

          </form>
        </motion.div>
      </div>

      {/* INPUT STYLES */}
      <style>{`
        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #334155;
          margin-bottom: 0.25rem;
        }
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.25);
          outline: none;
        }
      `}</style>
    </div>
  );
}

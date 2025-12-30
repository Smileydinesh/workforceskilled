import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiVideo,
  FiUsers,
  FiClock,
  FiMonitor,
  FiArrowLeft,
  FiCheck,
  FiGlobe,
  FiBriefcase,
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col items-center justify-center px-4 py-6">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-[1fr_1.3fr] gap-10">


        {/* Left Panel - Welcome Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl shadow-xl p-8 text-white"
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
  <img
    src={logo}
    alt="WorkForceSkilled Logo"
    className="w-12 h-12 object-contain rounded-lg"
  />
</div>
                <div>
                  <h1 className="text-3xl font-bold">WorkForceSkilled</h1>
                  <p className="text-emerald-100">Comprehensive Educational Platform</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Welcome Back to Your Learning Journey</h2>
              <p className="text-emerald-100 mb-8">
                Continue your path to professional excellence. Access your courses, track progress, and connect with experts.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5" />
                  <span>Resume where you left off</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5" />
                  <span>Access personalized recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5" />
                  <span>Join live sessions and webinars</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5" />
                  <span>Connect with peers and mentors</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-emerald-500/30">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <FiVideo className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Recorded Library</h4>
                    <p className="text-sm text-emerald-200">Access 500+ hours of content</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <FiUsers className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Expert Network</h4>
                    <p className="text-sm text-emerald-200">Learn from industry leaders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <FiLock className="w-4 h-4" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Sign In to Your Account</h3>
            </div>
            <p className="text-gray-600">
              Enter your credentials to access your personalized dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <div className="relative">
                {/* <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="pl-10 input"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use the email you registered with
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <div className="relative">
                {/* <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="pl-10 input"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <FiCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white pointer-events-none" />
                </div>
                <span>Remember me</span>
              </label>
              
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl"
              } text-white flex items-center justify-center gap-2`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                <>
                  Sign In
                  <FiArrowRight />
                </>
              )}
            </motion.button>

          

            {/* Sign Up Link */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                New to WorkForceSkilled?{" "}
                <Link
                  to="/signup"
                  className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 mt-6">
              <p>© 2025 WorkForceSkilled. All rights reserved.</p>
              <div className="flex justify-center gap-4 mt-2">
                <Link to="/terms" className="hover:text-gray-700">Terms</Link>
                <Link to="/privacy" className="hover:text-gray-700">Privacy</Link>
                <Link to="/support" className="hover:text-gray-700">Support</Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          outline: none;
          font-size: 0.875rem;
          transition: all 0.2s;
          background-color: white;
        }
        .input:hover {
          border-color: #10b981;
        }
        .input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }
        .input:disabled {
          background-color: #f9fafb;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
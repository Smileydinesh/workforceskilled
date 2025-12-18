import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiVideo, FiUsers, FiClock, FiMonitor } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 flex">
      
      {/* Left Panel - Features */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20"
      >
        {/* Header */}
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

        {/* Features Grid */}
        <div className="space-y-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <FiMonitor className="text-2xl text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Live Webinars</h3>
              <p className="text-emerald-300/80">
                Real-time interactive sessions with expert Q&A and networking
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <FiVideo className="text-2xl text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Recorded Library</h3>
              <p className="text-emerald-300/80">
                Access 2000+ sessions anytime, learn at your own pace
              </p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <FiClock className="text-2xl text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Flexible Learning</h3>
              <p className="text-emerald-300/80">
                Pause, rewind, and repeat - learn on your schedule
              </p>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <FiUsers className="text-2xl text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Network</h3>
              <p className="text-emerald-300/80">
                Connect with 500+ industry professionals
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl opacity-40 -z-10" />

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <FiMonitor className="text-2xl text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">WrokForceSkilled</h2>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>
            <p className="text-emerald-300 text-sm mt-2">
              Sign in to your WorkForceSkilled account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-emerald-200 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-emerald-200 mb-1">
                Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-emerald-300 cursor-pointer">
                <input type="checkbox" className="accent-emerald-400 w-4 h-4" />
                Remember me
              </label>
              <Link to="#" className="text-emerald-400 hover:text-emerald-300 hover:underline transition">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition shadow-emerald-500/25"
            >
              Sign In
              <FiArrowRight />
            </motion.button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-emerald-300 text-sm">
              New to WorkForceSkilled?{" "}
              <Link to="/signup" className="text-emerald-400 font-semibold hover:text-emerald-300 hover:underline transition">
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
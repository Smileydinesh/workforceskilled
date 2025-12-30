import { motion } from "framer-motion";
import { FiMail, FiArrowLeft, FiSend } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP DUMMY LOGIC
    if (email) {
      navigate("/reset-password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <FiMail className="text-emerald-600 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Forgot Password?
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your registered email to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="pl-10 input"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2"
          >
            <FiSend />
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline"
          >
            <FiArrowLeft />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      
      {/* SUBTLE BACKGROUND PATTERN */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,rgba(0,0,0,0.2)_2px,transparent_2px)] bg-[size:50px_50px]"></div>
        </div>
      </div>
      
      {/* SOFT COLOR ACCENTS */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-20" />

      {/* VERY SUBTLE FLOATING BUBBLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, Math.random() * -40 - 20],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-gradient-to-br from-blue-100/10 to-indigo-100/5"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* CENTERED CONTENT */}
      <div className="relative z-10 w-full px-6 py-20 text-center">

        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block mb-6 text-sm font-semibold tracking-wider text-blue-600 uppercase">
            A SOCIAL LEARNING PLATFORM
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8"
        >
          Connect & learn <br />
          <span className="text-blue-600">from the experts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Learn faster with live webinars, expert-led courses,
          and real-world learning experiences.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-lg"
          >
            Sign Up →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/live-webinars")}
            className="px-10 py-5 rounded-full bg-white text-gray-800 font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-lg"
          >
            Browse Webinars
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/demo")}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* LOGIN LINK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
          className="mt-10"
        >
          <p className="text-gray-600 text-lg">
            Already joined?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors hover:underline"
            >
              Log in
            </span>
          </p>
        </motion.div>

      </div>

    </section>
  );
}
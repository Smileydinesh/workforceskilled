import { motion } from "framer-motion";
import BubbleBackground from "../../components/effects/BubbleBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
        }}
      />

      {/* DARK GREEN OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D2E]/90 via-[#1E6F5C]/70 to-black/80" />

      {/* GLASS BLUR LAYER */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* BUBBLE EFFECT */}
      <BubbleBackground />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 text-sm font-semibold tracking-wide text-[#FACC15]"
          >
            A SOCIAL LEARNING PLATFORM
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Connect & learn <br /> from the experts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 text-lg text-gray-200 max-w-xl"
          >
            Learn faster with live webinars, expert-led courses,
            and real-world learning experiences.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-[#FACC15]
                         text-black font-semibold shadow-lg"
            >
              Sign Up →
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-4 rounded-full border border-white
                         text-white hover:bg-white hover:text-[#0F3D2E] transition"
            >
              Browse Webinars
            </motion.button>
          </motion.div>

          <p className="mt-4 text-sm text-gray-300">
            Already joined? <span className="underline cursor-pointer">Log in</span>
          </p>
        </motion.div>

        {/* RIGHT VISUAL AREA */}
        <div className="relative h-[520px]">

          {/* MENTOR IMAGE CARD */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute top-0 left-10 w-44 h-44 rounded-3xl
                       backdrop-blur-xl bg-white/20 border border-white/30
                       shadow-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="Mentor"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full bg-black/40 text-white text-sm font-semibold text-center py-2">
              Senior Mentor
            </div>
          </motion.div>

          {/* GLASS IMAGE CARD */}
          <motion.div
            animate={{ y: [0, 25, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute top-40 right-0 w-56 h-56 rounded-3xl
                       backdrop-blur-xl bg-white/20 border border-white/30
                       shadow-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="Live Learning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          {/* STATS BUBBLE */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
            className="absolute bottom-0 left-32 w-56 h-56 rounded-full
                       bg-[#1E6F5C]/90 text-white flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-sm">Live Webinar</p>
              <h4 className="text-3xl font-extrabold text-[#FACC15]">
                Join NoW
              </h4>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

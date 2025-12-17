import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend, FiMessageCircle, FiSmartphone, FiUsers, FiTarget, FiTrendingUp } from "react-icons/fi";
import { MdOutlineFlashOn, MdOutlineChatBubbleOutline, MdOutlineLocationOn, MdOutlineAttachEmail } from "react-icons/md";
import { TbMessage2 } from "react-icons/tb";

export default function Contact() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-24 overflow-hidden">
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Mail */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10"
        >
          <div className="text-4xl opacity-10">
            <MdOutlineAttachEmail />
          </div>
        </motion.div>

        {/* Floating Chat Bubbles */}
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-16"
        >
          <div className="text-5xl opacity-5">
            <TbMessage2 />
          </div>
        </motion.div>

        {/* Floating Smartphone */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 left-20"
        >
          <div className="text-3xl opacity-15 text-emerald-400">
            <FiSmartphone />
          </div>
        </motion.div>

        {/* Floating Location Pin */}
        <motion.div
          animate={{
            y: [0, 35, 0],
            x: [0, -15, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-1/4 right-24"
        >
          <div className="text-4xl opacity-10 text-yellow-500">
            <MdOutlineLocationOn />
          </div>
        </motion.div>

        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          {/* Enhanced badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full text-sm font-semibold
              bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Get in Touch
          </motion.span>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Us</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions, need support,
            or want to learn more about our services, our team is here to help.
            Reach out to us today, and let's start working together to ensure
            your organization stays compliant and secure.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT SIDE - Contact Cards */}
          <div className="space-y-6">
            {/* Email Card with enhanced styling */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100
                hover:shadow-2xl hover:border-emerald-200 transition-all duration-300"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-50 to-transparent rounded-2xl opacity-0 
                group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-start gap-5">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 
                  text-emerald-600 group-hover:from-emerald-100 group-hover:to-emerald-50 transition-all duration-300">
                  <FiMail className="text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    Email Us
                  </h3>
                  <p className="text-emerald-600 font-semibold text-base">
                    support@workforceskilled.com
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    For general inquiries and support
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Location Card with enhanced styling */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100
                hover:shadow-2xl hover:border-yellow-200 transition-all duration-300"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-50 to-transparent rounded-2xl opacity-0 
                group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-start gap-5">
                <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 
                  text-yellow-600 group-hover:from-yellow-100 group-hover:to-yellow-50 transition-all duration-300">
                  <FiMapPin className="text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    Our Location
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    375 Redondo Ave #1199 <br />
                    Long Beach, CA 90814 <br />
                    United States
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Response Card with enhanced styling */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl p-6 text-white
                bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 shadow-xl hover:shadow-2xl"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="relative flex items-start gap-5">
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm">
                  <MdOutlineFlashOn className="text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Quick Response Guaranteed</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    We typically respond to all inquiries within 24 hours
                    during business days. For urgent matters, please email
                    us directly.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white/80 text-xs">Average response time: 4-6 hours</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE – Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Form background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100/30 to-teal-100/30 
              rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 
              backdrop-blur-sm bg-white/95">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100">
                  <FiMessageCircle className="text-2xl text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 
                        focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 
                        focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 
                        focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 
                        focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Company"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 
                        focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 
                        focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 
                        focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 
                        focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 
                      focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 
                      focus:outline-none transition-all duration-300 appearance-none"
                  >
                    <option>Select a subject *</option>
                    <option>General Enquiry</option>
                    <option>Support</option>
                    <option>Partnership</option>
                    <option>Careers</option>
                    <option>Feedback</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 rotate-45" />
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows="5"
                    placeholder="Your Message *"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 
                      focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 
                      focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3
                    bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600
                    hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500
                    text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl
                    transition-all duration-300 group"
                >
                  <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Enhanced READY TO JOIN SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mt-32 overflow-hidden"
        >
          {/* Enhanced Floating Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { icon: "📧", top: "10%", left: "5%", color: "text-emerald-300/30", duration: 8 },
              { icon: "📱", top: "40%", right: "8%", color: "text-yellow-300/30", duration: 10 },
              { icon: "💬", top: "70%", left: "15%", color: "text-teal-300/40", duration: 9 },
              { icon: "📍", top: "20%", right: "15%", color: "text-emerald-400/20", duration: 7 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: [0, -30, 0, 20, 0],
                  x: [0, 15, 0, -10, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.5
                }}
                className={`absolute text-4xl ${item.color}`}
                style={{ top: item.top, left: item.left, right: item.right }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>

          {/* Container */}
          <div className="relative max-w-6xl mx-auto px-4">

            {/* Enhanced Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full text-sm font-semibold
                  bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Careers & Opportunities
              </motion.span>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Ready To Join With{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  Exceptional Quality
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                At ComplianceTrained, we're always looking for passionate individuals to
                join our team. If you're eager to make an impact in the world of
                compliance training, work in a collaborative environment, and grow your
                career, we'd love to hear from you.
              </p>
            </motion.div>

            {/* Enhanced Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FiTarget className="text-2xl" />,
                  title: "Make Impact",
                  description: "Shape the future of compliance training",
                  color: "from-emerald-50 to-teal-50",
                  iconColor: "text-emerald-600",
                  bgColor: "bg-emerald-100"
                },
                {
                  icon: <FiUsers className="text-2xl" />,
                  title: "Collaborative",
                  description: "Work with passionate professionals",
                  color: "from-yellow-50 to-amber-50",
                  iconColor: "text-yellow-600",
                  bgColor: "bg-yellow-100"
                },
                {
                  icon: <FiTrendingUp className="text-2xl" />,
                  title: "Grow Career",
                  description: "Unlimited growth opportunities",
                  color: "from-teal-50 to-emerald-50",
                  iconColor: "text-teal-600",
                  bgColor: "bg-teal-100"
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 
                    shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-200 
                    transition-all duration-300 overflow-hidden"
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <div className={`mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl
                      ${card.bgColor} ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600">
                      {card.description}
                    </p>
                    
                    {/* Hover arrow */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 translate-x-[-10px] 
                      group-hover:translate-x-0 transition-all duration-300">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
                  bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700
                  text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Open Positions
                <div className="w-2 h-2 border-r-2 border-b-2 border-white rotate-[-45deg] translate-y-[-1px]" />
              </motion.button> */}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
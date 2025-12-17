import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { MdOutlineFlashOn } from "react-icons/md";

export default function Contact() {
  return (
    <section className="relative bg-[#FAFAF9] py-24 overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-yellow-50" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          {/* Get in Touch badge */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold
            bg-emerald-100 text-emerald-700">
            Get in Touch
          </span>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            Contact Us
          </h1>

          <p className="text-gray-600 leading-relaxed">
            We'd love to hear from you! Whether you have questions, need support,
            or want to learn more about our services, our team is here to help.
            Reach out to us today, and let's start working together to ensure
            your organization stays compliant and secure.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* Email Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Email Us
                  </h3>
                  <p className="text-emerald-700 font-medium">
                    support@workforceskilled.com
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Our Location
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    375 Redondo Ave #1199 <br />
                    Long Beach, CA 90814 <br />
                    United States
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Response */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl p-6 text-white
                bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/20">
                  <MdOutlineFlashOn className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quick Response</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    We typically respond to all inquiries within 24 hours
                    during business days. For urgent matters, please email
                    us directly.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE – FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>

              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                <option>Select a subject *</option>
                <option>General Enquiry</option>
                <option>Support</option>
                <option>Partnership</option>
              </select>

              <textarea
                rows="4"
                placeholder="Your Message *"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2
                  bg-gradient-to-r from-emerald-600 to-teal-600
                  text-white font-semibold py-3 rounded-xl shadow-lg"
              >
                <FiSend />
                Send Message
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
      {/* READY TO JOIN SECTION */}
<section className="relative mt-28 overflow-hidden">
  {/* Floating Icons */}
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-10 left-10 text-emerald-300/40"
    >
      📧
    </motion.div>

    <motion.div
      animate={{ y: [0, 20, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute top-40 right-16 text-yellow-300/40"
    >
      📱
    </motion.div>

    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 4.5, repeat: Infinity }}
      className="absolute bottom-10 left-1/3 text-emerald-400/30"
    >
      💬
    </motion.div>
  </div>

  {/* Container */}
  <div className="relative max-w-7xl mx-auto px-6">

    {/* Title */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold
        bg-emerald-100 text-emerald-700">
        Careers
      </span>

      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
        Ready To Join with <span className="text-emerald-600">Exceptional Quality</span>
      </h2>

      <p className="text-gray-600 leading-relaxed">
        At ComplianceTrained, we're always looking for passionate individuals to
        join our team. If you're eager to make an impact in the world of
        compliance training, work in a collaborative environment, and grow your
        career, we'd love to hear from you.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Card 1 */}
      <motion.div
        whileHover={{ y: -6 }}
        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
      >
        <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl
          bg-emerald-100 text-emerald-700 text-xl">
          🚀
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Make Impact
        </h3>
        <p className="text-gray-600">
          Shape the future of compliance training
        </p>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        whileHover={{ y: -6 }}
        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
      >
        <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl
          bg-yellow-100 text-yellow-600 text-xl">
          🤝
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Collaborative
        </h3>
        <p className="text-gray-600">
          Work with passionate professionals
        </p>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        whileHover={{ y: -6 }}
        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
      >
        <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl
          bg-emerald-100 text-emerald-700 text-xl">
          📈
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Grow Career
        </h3>
        <p className="text-gray-600">
          Unlimited growth opportunities
        </p>
      </motion.div>

    </div>
  </div>
</section>

    </section>
  );
}

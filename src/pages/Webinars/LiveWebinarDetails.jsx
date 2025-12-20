import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiHash,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";

export default function LiveWebinarDetails() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">

      {/* HERO HEADER */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <span className="inline-block mb-3 px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          COMPLETED
        </span>

        <h1 className="text-3xl md:text-4xl font-bold max-w-4xl">
          HR Metrics and Analytics 2026 – Update on Strategic Planning,
          Application Activities, and Operational Impact
        </h1>

        {/* SCHEDULE CARD */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="flex gap-4 items-start">
            <FiCalendar className="text-emerald-400 text-xl mt-1" />
            <div>
              <p className="text-sm text-gray-400">Date</p>
              <p className="font-medium">Wednesday, December 17, 2025</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <FiClock className="text-emerald-400 text-xl mt-1" />
            <div>
              <p className="text-sm text-gray-400">Time</p>
              <p className="font-medium">9:00 AM PST | 12:00 PM EST</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <FiHash className="text-emerald-400 text-xl mt-1" />
            <div>
              <p className="text-sm text-gray-400">Webinar ID</p>
              <p className="font-medium">WEB2510051</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-[1fr_380px] gap-10">

        {/* LEFT CONTENT */}
        <div className="space-y-10">

          {/* DETAILS */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-slate-800">
            <h2 className="text-xl font-bold mb-4">Webinar Details</h2>

            <p className="text-sm leading-relaxed mb-6">
              As organizations move into 2026, the ability to use HR metrics and
              analytics strategically has become a defining factor for success.
              This session provides a comprehensive update on the latest HR
              analytics trends and tools.
            </p>

            <h3 className="font-semibold mb-3">Why You Should Attend</h3>
            <ul className="space-y-3">
              {[
                "Learn the latest developments in HR analytics",
                "Use data for evidence-based decision making",
                "Understand productivity and workforce planning",
                "Apply AI tools in HR analytics",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <FiCheckCircle className="text-emerald-500 mt-1" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SPEAKER */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-slate-800">
            <h2 className="text-xl font-bold mb-6">Meet Your Speaker</h2>

            <div className="flex gap-6 items-start">
              <img
                src="https://i.pravatar.cc/150?img=58"
                alt="Speaker"
                className="w-24 h-24 rounded-full border"
              />

              <div>
                <h3 className="text-lg font-bold">Ronald Adler</h3>
                <p className="text-sm text-indigo-600 font-medium">
                  President & CEO – Laurdon Associates, Inc.
                </p>

                <p className="text-sm mt-4 leading-relaxed">
                  Ronald Adler is a veteran HR consultant with over 30 years of
                  experience in HR audits, metrics, compliance, and analytics.
                  He has worked with organizations across the US and
                  internationally.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6">

          {/* PRICING CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-slate-800">
            <h3 className="font-bold mb-4">Live Version</h3>

            <div className="border rounded-xl p-4 mb-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Single Attendee</p>
                <p className="text-xs text-gray-500">
                  Individual access
                </p>
              </div>
              <p className="font-bold text-indigo-600">$147</p>
            </div>

            <h3 className="font-bold mb-4">Recorded Version</h3>

            <div className="border rounded-xl p-4 mb-6 flex justify-between items-center">
              <div>
                <p className="font-medium">Recorded Access</p>
                <p className="text-xs text-gray-500">
                  6 months access
                </p>
              </div>
              <p className="font-bold text-indigo-600">$189</p>
            </div>

            <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
              Add to Cart – $147
            </button>

            <button className="w-full mt-3 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
              Buy Now
            </button>
          </div>

          {/* GUARANTEE */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-slate-800">
            <p className="font-semibold">100% Money Back Guarantee</p>
            <p className="text-xs text-gray-500 mt-2">
              Refund available as per policy
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

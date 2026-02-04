import { FiCheckCircle, FiArrowRight, FiPlayCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function DemoVideoPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-sky-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-sky-900">
            Live Webinar Demo Session
          </h1>

          <p className="mt-4 text-sky-700 text-lg">
            Watch this short demo to understand how our live sessions work and
            what you’ll gain by attending.
          </p>
        </div>

        {/* ================= VIDEO SECTION ================= */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl bg-black">

          {/* RELATIVE WRAPPER IS IMPORTANT */}
          <div className="relative w-full aspect-square md:aspect-video">

            {/* VIDEO */}
            <video
              controls
              preload="metadata"
              controlsList="nodownload"
              poster="/videos/demoimage.jpg"
              className="absolute inset-0 w-full h-full object-contain bg-black z-10"
            >
              <source src="/videos/demo1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* OVERLAY – NOW 100% VISIBLE */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <div
                className="
                  text-white/40
                  text-3xl md:text-5xl
                  font-extrabold
                  tracking-widest
                  rotate-[-15deg]
                  select-none
                  drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]
                "
              >
                DEMO PREVIEW
              </div>
            </div>

          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">

          {/* LEFT – LEARNING POINTS */}
          <div>
            <h2 className="text-2xl font-semibold text-sky-900">
              What you’ll learn in the live webinar
            </h2>

            <ul className="mt-6 space-y-4 text-sky-800">
              {[
                "How the live session is structured",
                "Real-world project examples",
                "Interactive live Q&A with the instructor",
                "Access to session recordings",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <FiCheckCircle className="text-sky-500 text-xl mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT – CTA CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-sky-100">
            <h3 className="text-xl font-semibold text-sky-900">
              Ready to join the full session?
            </h3>

            <p className="text-sky-700 mt-3">
              Get full access to the live webinar, recordings, and exclusive
              learning resources.
            </p>

            <div className="mt-6 space-y-4">
              <button
                onClick={() => navigate("/live-webinars")}
                className="
                  w-full py-3 rounded-xl
                  bg-sky-500 text-white font-semibold
                  flex items-center justify-center gap-2
                  hover:bg-sky-600
                  transition-all duration-200
                "
              >
                Join Live Webinar
                <FiArrowRight />
              </button>

              <div className="flex items-center justify-center gap-2 text-sky-600 text-sm">
                <FiPlayCircle />
                <span>No payment required for demo</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

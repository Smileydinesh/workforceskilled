import { FiPlayCircle, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function DemoVideoPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Live Webinar Demo Session
          </h1>

          <p className="mt-3 text-gray-600 text-lg">
            Watch this short demo to understand how our live sessions work and
            what you’ll gain by attending.
          </p>
        </div>

        {/* VIDEO SECTION */}
        <div className="mt-10 rounded-2xl overflow-hidden shadow-xl bg-black relative">

          {/* VIDEO */}
          <video
                controls
                preload="metadata"
                controlsList="nodownload"
                className="w-full h-[220px] sm:h-[360px] md:h-[480px] object-cover"
                poster="/videos/demoimage.jpg" // optional thumbnail
                >
                <source src="/videos/media.mp4" type="video/mp4" />
                Your browser does not support the video tag.
        </video>

          {/* OPTIONAL PLAY ICON OVERLAY (UI polish) */}
          <div className="pointer-events-none absolute inset-0">
    <div className="
      w-full h-full
      flex items-center justify-center
      opacity-20
      text-white
      text-4xl md:text-6xl
      font-bold
      tracking-widest
      rotate-[-20deg]
      select-none
    ">
      PREVIEW ONLY
    </div>
  </div>
        </div>

        {/* CONTENT */}
        <div className="mt-10 grid md:grid-cols-2 gap-8 items-start">

          {/* LEFT – VALUE */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              What you’ll learn in the live webinar
            </h2>

            <ul className="mt-5 space-y-4 text-gray-700">
              {[
                "How the live session is structured",
                "Real-world examples & case studies",
                "Live Q&A with the instructor",     
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <FiCheckCircle className="text-blue-600 text-xl mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT – CTA CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Ready to join the full session?
            </h3>

            <p className="text-gray-600 mt-2">
              Get full access to the live webinar, recordings, and exclusive
              resources.
            </p>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate("/live-webinars")}
                className="
                  w-full py-3 rounded-xl
                  bg-blue-600 text-white font-semibold
                  flex items-center justify-center gap-2
                  hover:bg-blue-700 transition
                "
              >
                Join Live Webinar
                <FiArrowRight />
              </button>

              
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

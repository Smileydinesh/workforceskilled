const features = [
  {
    title: "Live Webinars",
    desc: "Attend expert-led live sessions with real-time interaction.",
    icon: "🎥",
  },
  {
    title: "Expert Mentors",
    desc: "Learn directly from industry professionals and leaders.",
    icon: "👨‍🏫",
  },
  {
    title: "Certificates",
    desc: "Earn shareable certificates to boost your career profile.",
    icon: "📜",
  },
  {
    title: "Flexible Learning",
    desc: "Learn anytime with on-demand recordings and resources.",
    icon: "⏱️",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#FAFAF9] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-[#0F3D2E]">
            Everything You Need to Learn Better
          </h2>
          <p className="mt-4 text-gray-600">
            Powerful features designed to give learners a real-world edge.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-gray-200
                         hover:border-[#FACC15] hover:-translate-y-2
                         transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full bg-[#FACC15]/20
                           flex items-center justify-center text-2xl mb-6
                           group-hover:bg-[#FACC15] transition"
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-[#0F3D2E] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

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
    <section className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.03] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/50 via-transparent to-indigo-50/50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200 mb-6">
            🚀 Accelerate Your Learning Journey
          </span>
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent leading-tight">
            Everything You Need<br />to Learn Better
          </h2>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Powerful features designed to give learners a real-world edge with cutting-edge tools and expert guidance.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-white/50
                       shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10
                       hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 ease-out
                       before:absolute before:inset-0 before:rounded-3xl 
                       before:bg-gradient-to-br before:from-yellow-400/5 before:to-indigo-500/5
                       before:opacity-0 before:group-hover:opacity-100 before:transition-all before:duration-500
                       before:border before:border-transparent before:group-hover:border-yellow-200/50
                       hover:border-yellow-200/50 overflow-hidden"
            >
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-2xl -rotate-12 group-hover:rotate-0 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-xl rotate-12 group-hover:-rotate-12 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

              {/* Icon */}
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200
                              flex items-center justify-center text-3xl mb-8 shadow-lg
                              group-hover:from-yellow-400 group-hover:to-orange-500
                              group-hover:text-white group-hover:shadow-yellow-500/25
                              group-hover:scale-110 transition-all duration-700 ease-out
                              border-4 border-white/50 group-hover:border-yellow-200/50">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-slate-900 mb-4 relative group-hover:text-indigo-900 transition-colors duration-500">
                {item.title}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-500" />
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-base leading-relaxed group-hover:text-slate-700 transition-colors duration-500">
                {item.desc}
              </p>

              {/* Hover Pulse Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 opacity-0 group-hover:opacity-20 blur-xl animate-ping-slow scale-150 transition-all duration-1000" />
            </div>
          ))}
        </div>

        {/* CTA Gradient Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-24 mx-auto max-w-2xl" />
      </div>
    </section>
  );
}
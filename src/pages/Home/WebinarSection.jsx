import { motion } from "framer-motion";

const webinars = [
  {
    title: "Master React for Real Projects",
    description:
      "Build scalable, production-ready React applications with hands-on guidance.",
    speaker: "Arun Kumar",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    rating: 4.8,
    duration: "2h 30m",
    date: "Today",
    time: "7:00 PM",
    price: "$49",
    tag: "LIVE",
  },
  {
    title: "Django + React Full Stack",
    description:
      "Learn how to build and deploy a complete full-stack web application.",
    speaker: "Sanjay Dev",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    rating: 4.9,
    duration: "3h",
    date: "Tomorrow",
    time: "6:30 PM",
    price: "$69",
    tag: "UPCOMING",
  },
  {
    title: "UI/UX Design for Developers",
    description:
      "Understand UI/UX principles to design intuitive, user-friendly interfaces.",
    speaker: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    rating: 4.7,
    duration: "2h",
    date: "Anytime",
    time: "On-Demand",
    price: "$39",
    tag: "ON-DEMAND",
  },
];

export default function WebinarSection() {
  return (
    <section className="bg-[#FAFAF9] py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-extrabold text-[#0F3D2E]">
            Featured Webinars
          </h2>
          <p className="mt-4 text-gray-600">
            Learn directly from industry experts through live and on-demand sessions.
          </p>
        </motion.div>

        {/* WEBINAR CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {webinars.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden
                         shadow-lg hover:shadow-2xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* TAG */}
                <span
                  className={`absolute top-4 left-4 px-4 py-1 text-xs font-bold rounded-full
                  ${
                    item.tag === "LIVE"
                      ? "bg-red-500 text-white"
                      : item.tag === "UPCOMING"
                      ? "bg-yellow-400 text-black"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {item.tag}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {item.description}
                </p>

                {/* INSTRUCTOR */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={item.avatar}
                    alt={item.speaker}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#0F3D2E]">
                      {item.speaker}
                    </p>
                    <p className="text-xs text-gray-500">
                      ⭐ {item.rating} Rating
                    </p>
                  </div>
                </div>

                {/* META */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <span>⏱ {item.duration}</span>
                  <span>📅 {item.date}</span>
                  <span>🕒 {item.time}</span>
                </div>

                {/* PRICE + CTA */}
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-extrabold text-[#0F3D2E]">
                    {item.price}
                  </p>

                  <button
                    className="px-6 py-3 rounded-full bg-[#0F3D2E] text-white
                               font-semibold hover:bg-[#1E6F5C]
                               transition"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

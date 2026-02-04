import { FiUser, FiBriefcase, FiGlobe, FiCheckCircle } from "react-icons/fi";

export default function MeetYourSpeaker({ webinar }) {
  const instructor = webinar?.instructor;
  if (!instructor) return null;

  return (
    <section className="w-full flex justify-center mt-10">
      {/* Outer width control */}
      <div
        className="
          w-full max-w-8xl
          bg-white
          border border-slate-300
          rounded-xl
          transition-shadow duration-300
          hover:shadow-lg
        "
      >
        {/* ================= HEADER ================= */}
        <div className="px-6 py-4 border-b border-slate-300 flex items-center gap-3">
          <FiUser className="text-blue-700 text-lg" />
          <h2 className="text-lg font-bold text-slate-900 tracking-wide">
            Meet Your Speaker
          </h2>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* LEFT – IMAGE */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <img
                  src={instructor.photo}
                  alt={instructor.name}
                  className="
                    w-32 h-32
                    rounded-full
                    object-cover
                    border-2 border-slate-400
                    transition-transform duration-300
                    group-hover:scale-[1.03]
                  "
                />

                {/* Verified badge */}
                <span
                  className="
                    absolute bottom-1 right-1
                    w-7 h-7
                    rounded-full
                    bg-teal-600
                    flex items-center justify-center
                    shadow-sm
                  "
                >
                  <FiCheckCircle className="text-white text-sm" />
                </span>
              </div>
            </div>

            {/* RIGHT – DETAILS */}
            <div className="flex-1">

              {/* NAME */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {instructor.name}
              </h3>

              {/* ROLE + ORG */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">

                <div className="flex items-center gap-2 font-semibold text-blue-700">
                  <FiBriefcase className="text-blue-600" />
                  {instructor.designation}
                </div>

                {instructor.organization && (
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <FiGlobe className="text-slate-500" />
                    {instructor.organization}
                  </div>
                )}

              </div>

              {/* DIVIDER */}
              <div className="mt-4 mb-5 w-14 h-[2px] bg-blue-700"></div>

              {/* BIO */}
              <div className="space-y-4">
                {instructor.bio
                  .split("\n\n")
                  .map((para, idx) => (
                    <p
                      key={idx}
                      className="
                        text-[15px] sm:text-base
                        leading-relaxed sm:leading-loose
                        text-slate-900
                        font-medium
                        transition-colors duration-300
                        hover:text-slate-950
                      "
                    >
                      {para}
                    </p>
                  ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

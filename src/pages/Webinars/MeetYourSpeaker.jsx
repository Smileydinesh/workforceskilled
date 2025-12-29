import { FiUser, FiCheckCircle } from "react-icons/fi";

export default function MeetYourSpeaker({ webinar }) {
  const instructor = webinar?.instructor;
  if (!instructor) return null;

  return (
    <section className="relative w-full mt-1">

      {/* Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-200 pb-4">
          <FiUser className="text-emerald-600 text-xl" />
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">
            Meet Your Speaker
          </h2>
        </div>

        {/* Speaker Card */}
        <div
          className="
            bg-white
            border border-emerald-200/70
            rounded-2xl
            p-6 sm:p-8
            flex flex-col md:flex-row
            gap-6 sm:gap-8
            items-start
            shadow-md
          "
        >
          {/* Speaker Image */}
          <div className="relative shrink-0">
            <img
              src={instructor.photo}
              alt={instructor.name}
              className="
                w-28 h-28 sm:w-32 sm:h-32
                rounded-full
                object-cover
                border-4 border-emerald-200
                shadow-sm
              "
            />

            {/* Verified Badge */}
            <span className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
              <FiCheckCircle className="text-white text-sm" />
            </span>
          </div>

          {/* Speaker Info */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-900">
              {instructor.name}
            </h3>

            <p className="mt-1 text-emerald-700 font-medium text-sm sm:text-base">
              {instructor.designation}
              {instructor.organization && (
                <>
                  {" "}
                  • {instructor.organization}
                </>
              )}
            </p>

            <div className="mt-4 text-emerald-900/80 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
              {instructor.bio}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

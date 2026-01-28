import {
  FiUser,
  FiBriefcase,
  FiGlobe,
  FiCheckCircle,
} from "react-icons/fi";

export default function MeetYourSpeaker({ webinar }) {
  const instructor = webinar?.instructor;
  if (!instructor) return null;

  return (
    <section className="w-full bg-gradient-to-b from-sky-50 to-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-5">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-sky-200/40 rounded-full blur-2xl"></div>

              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-br from-sky-400 to-blue-500">
                <img
                  src={instructor.photo}
                  alt={instructor.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>

              {/* Verified */}
              <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                <FiCheckCircle className="text-white text-lg" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {instructor.name}
          </h2>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-sky-200 shadow-sm">
              <FiBriefcase className="text-sky-600" />
              <span className="font-medium text-gray-800">
                {instructor.designation}
              </span>
            </div>

            {instructor.organization && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-sky-200 shadow-sm">
                <FiGlobe className="text-sky-600" />
                <span className="font-medium text-gray-800">
                  {instructor.organization}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= BIO / DESCRIPTION ================= */}
        <div className="w-full bg-white border border-sky-200 rounded-2xl shadow-xl p-6 sm:p-10">
          <h3 className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-sky-800 mb-6">
            <FiUser className="text-sky-600" />
            About the Speaker
          </h3>

          <div className="
            text-gray-700
            text-sm sm:text-base
            leading-relaxed sm:leading-loose
            whitespace-pre-line
          ">
            {instructor.bio}
          </div>
        </div>

      </div>
    </section>
  );
}

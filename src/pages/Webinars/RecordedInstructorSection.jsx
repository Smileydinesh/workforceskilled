import { motion } from "framer-motion";
import { FiUserCheck, FiAward, FiBriefcase } from "react-icons/fi";

export default function RecordedInstructorSection({ instructor }) {
  if (!instructor) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="
        bg-white
        rounded-3xl
        border border-sky-200
        shadow-xl
        p-8
      "
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 mb-7">
        <div className="
          p-3 rounded-xl
          bg-gradient-to-br from-sky-100 to-sky-50
          border border-sky-200
          text-sky-600
        ">
          <FiUserCheck className="text-xl" />
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900">
          Meet Your Instructor
        </h2>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">

        {/* PHOTO */}
        <div className="relative shrink-0">
          <img
            src={instructor.photo}
            alt={instructor.name}
            className="
              w-28 h-28
              rounded-full
              object-cover
              border-4 border-sky-400
              shadow-lg
            "
          />

          <span className="
            absolute -bottom-2 left-1/2 -translate-x-1/2
            bg-sky-600
            text-white
            text-xs font-bold
            px-3 py-1
            rounded-full
            shadow
          ">
            Expert Instructor
          </span>
        </div>

        {/* DETAILS */}
        <div className="flex-1 space-y-4">

          {/* NAME + ROLE */}
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">
              {instructor.name}
            </h3>

            <p className="
              text-sm
              text-sky-700
              font-semibold
              flex items-center gap-2
              mt-1
            ">
              <FiBriefcase className="text-sky-600" />
              {instructor.designation}
              {instructor.organization
                ? ` · ${instructor.organization}`
                : ""}
            </p>
          </div>

          {/* BIO */}
          {instructor.bio && (
            <p className="
              text-[15px]
              text-gray-800
              font-medium
              leading-relaxed
            ">
              {instructor.bio}
            </p>
          )}

          {/* TRUST / CREDENTIALS */}
          <div className="
            grid sm:grid-cols-2 gap-4
            pt-4
            border-t border-sky-200
          ">
            <TrustItem
              icon={<FiAward />}
              title="Industry Expertise"
              text="Recognized professional with strong real-world experience"
            />
            <TrustItem
              icon={<FiUserCheck />}
              title="Proven Educator"
              text="Trusted by thousands of learners across platforms"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ================= SUB COMPONENT ================= */

function TrustItem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="
        w-9 h-9
        rounded-lg
        bg-sky-100
        border border-sky-200
        flex items-center justify-center
        text-sky-600
      ">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-gray-900">
          {title}
        </p>
        <p className="text-xs text-gray-700 font-medium">
          {text}
        </p>
      </div>
    </div>
  );
}

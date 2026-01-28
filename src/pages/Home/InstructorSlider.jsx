import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

export default function InstructorSlider() {
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();
  const controls = useAnimation();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/instructors/`)
      .then((res) => res.json())
      .then((data) => {
        setInstructors([...data, ...data]); // duplicate
      });
  }, []);

  /* START AUTO SCROLL */
  useEffect(() => {
    startAnimation();
  }, [instructors]);

  const startAnimation = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        ease: "linear",
        duration: 35,
        repeat: Infinity,
      },
    });
  };

  const stopAnimation = () => {
    controls.stop();
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-sky-50 to-blue-50 overflow-hidden">

      {/* HEADER */}
      <div className="text-center mb-14 relative z-10">
        <h2 className="text-4xl font-black text-gray-900">
          Learn from Industry Experts
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Click an instructor to explore their webinars
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative z-10 overflow-hidden">
        <motion.div
          className="flex"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.08}
          onHoverStart={stopAnimation}   // 🖥 desktop hover pause
          onHoverEnd={startAnimation}
          onDragStart={stopAnimation}    // 📱 pause while swiping
          onDragEnd={startAnimation}
          style={{ cursor: "grab" }}
        >
          {instructors.map((inst, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/search?q=${encodeURIComponent(inst.name)}`)
              }
              className="
                w-[160px]
                shrink-0
                flex flex-col items-center
                cursor-pointer
                group
              "
            >
              {/* IMAGE */}
              <div className="relative">
                <div className="
                  absolute inset-0
                  rounded-full
                  bg-gradient-to-br from-blue-400 to-indigo-500
                  blur-xl
                  opacity-0
                  group-hover:opacity-50
                  transition
                " />

                <img
                  src={inst.photo}
                  alt={inst.name}
                  className="
                    relative z-10
                    w-28 h-28
                    rounded-full
                    object-cover
                    border-4 border-white
                    shadow-lg
                    group-hover:scale-110
                    transition-all duration-300
                  "
                />
              </div>

              {/* NAME */}
              <p className="mt-5 text-sm font-bold text-gray-900 text-center group-hover:text-blue-600 transition">
                {inst.name}
              </p>

              {/* DESIGNATION */}
              <p className="text-xs text-gray-500 text-center mt-1 px-2">
                {inst.designation}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

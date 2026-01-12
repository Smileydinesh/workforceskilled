import { FiUser, FiCheckCircle, FiAward, FiBriefcase, FiGlobe, FiStar } from "react-icons/fi";

export default function MeetYourSpeaker({ webinar }) {
  const instructor = webinar?.instructor;
  if (!instructor) return null;

  return (
    <section className="relative w-full mt-10 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-cyan-50/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/10 to-blue-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Header with Animation */}
        <div 
          className="flex items-center gap-4 mb-8 sm:mb-12 animate-slideIn"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <FiUser className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
              Meet Your Speaker
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">Learn from an industry expert</p>
          </div>
        </div>

        {/* Speaker Card with Enhanced Design */}
        <div className="relative animate-slideIn" style={{ animationDelay: '0.2s' }}>
          {/* Background Glow Effect */}
          <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-blue-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Main Card */}
          <div className="
            relative
            bg-gradient-to-br from-white via-white to-gray-50/30
            border border-gray-200
            rounded-2xl sm:rounded-3xl
            p-6 sm:p-10
            flex flex-col lg:flex-row
            gap-8 lg:gap-12
            items-start
            shadow-2xl
            backdrop-blur-sm
            transform transition-all duration-500
            hover:shadow-3xl hover:shadow-emerald-500/10
            hover:border-emerald-200/70
            hover:scale-[1.005]
            group
          ">

            {/* Left Column - Speaker Image */}
            <div className="relative shrink-0 mx-auto lg:mx-0">
              {/* Image Container with Glow */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 via-cyan-400/20 to-blue-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                
                {/* Image Frame */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 group-hover:from-emerald-500 group-hover:via-cyan-500 group-hover:to-blue-500 transition-all duration-500">
                  <img
                    src={instructor.photo}
                    alt={instructor.name}
                    className="
                      w-full h-full
                      rounded-full
                      object-cover
                      border-4 border-white
                      shadow-lg
                      transform transition-all duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Verified Badge */}
                <div className="
                  absolute bottom-3 right-3
                  w-10 h-10 sm:w-12 sm:h-12
                  rounded-full
                  bg-gradient-to-br from-emerald-500 to-cyan-500
                  border-3 border-white
                  flex items-center justify-center
                  shadow-xl
                  transform transition-all duration-300
                  group-hover:scale-110 group-hover:rotate-12
                  animate-pulse-subtle
                ">
                  <FiCheckCircle className="text-white text-base sm:text-lg" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
                <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce-subtle"></div>
              </div>
            </div>

            {/* Right Column - Speaker Info */}
            <div className="flex-1 space-y-6 sm:space-y-8">

              {/* Name and Title */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent group-hover:from-emerald-800 group-hover:to-cyan-700 transition-all duration-500">
                  {instructor.name}
                </h3>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-cyan-50 px-4 py-2 rounded-xl border border-emerald-100 group-hover:border-emerald-200 transition-colors duration-300">
                    <FiBriefcase className="text-emerald-500 text-base" />
                    <span className="font-semibold text-gray-800">{instructor.designation}</span>
                  </div>
                  
                  {instructor.organization && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-xl border border-blue-100 group-hover:border-blue-200 transition-colors duration-300">
                      <FiGlobe className="text-blue-500 text-base" />
                      <span className="font-medium text-gray-800">{instructor.organization}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400/30 via-cyan-400/30 to-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="
                  text-gray-700 leading-relaxed sm:leading-loose
                  space-y-4
                  text-sm sm:text-base
                  group-hover:text-gray-800
                  transition-colors duration-300
                  whitespace-pre-line
                ">
                  {instructor.bio}
                </div>
              </div>

              {/* Expertise Tags */}
              {instructor.expertise && (
                <div className="pt-4 border-t border-gray-100 group-hover:border-emerald-100 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <FiAward className="text-amber-500" />
                    <h4 className="font-semibold text-gray-800">Areas of Expertise</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(instructor.expertise) 
                      ? instructor.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="
                              inline-flex items-center gap-1
                              px-3 py-1.5
                              rounded-full
                              bg-gradient-to-r from-emerald-50 to-cyan-50
                              border border-emerald-200
                              text-sm font-medium text-gray-700
                              transform transition-all duration-300
                              hover:scale-105 hover:shadow-md
                              hover:from-emerald-100 hover:to-cyan-100
                              hover:border-emerald-300
                            "
                          >
                            <FiStar className="text-amber-500 text-xs" />
                            {skill}
                          </span>
                        ))
                      : null}
                  </div>
                </div>
              )}

              {/* Stats if available */}
              {instructor.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100 group-hover:border-cyan-100 transition-colors duration-300">
                  {Object.entries(instructor.stats).map(([key, value], index) => (
                    <div
                      key={key}
                      className="text-center p-3 rounded-xl bg-gradient-to-b from-white to-gray-50/50 border border-gray-100 group-hover:border-cyan-100 transition-colors duration-300"
                    >
                      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                        {value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1 capitalize">
                        {key.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse"></div>
            <span>Industry expert with proven track record</span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>

      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulseSubtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 2s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 2s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
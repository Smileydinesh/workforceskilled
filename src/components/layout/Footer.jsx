import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlineAcademicCap, HiOutlineDocumentText, HiOutlineShieldCheck } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-emerald-950 to-emerald-900 text-emerald-100 relative overflow-hidden">

      {/* Animated Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-yellow-400/10 to-emerald-400/5"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Top gradient line with shine effect */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-emerald-400 to-yellow-400 animate-shine" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand with Icon */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-emerald-400">
                <HiOutlineAcademicCap className="text-emerald-950 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Workforce<span className="text-yellow-400">Skilled</span>
              </h3>
            </div>
            <p className="text-emerald-300/80 text-sm leading-relaxed pr-8">
              Empowering professionals through high-quality learning,
              live webinars, and industry-ready skills that drive career advancement.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-4">
              {[
                { icon: FaFacebookF, color: "hover:bg-blue-600" },
                { icon: FaTwitter, color: "hover:bg-sky-500" },
                { icon: FaLinkedinIn, color: "hover:bg-blue-700" },
                { icon: FaInstagram, color: "hover:bg-pink-600" },
                { icon: FaYoutube, color: "hover:bg-red-600" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-900/80 backdrop-blur-sm 
                           border border-emerald-800/30 
                           text-emerald-200 hover:text-white 
                           transition-all duration-300 
                           hover:scale-110 hover:shadow-lg cursor-pointer"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-yellow-400 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {["Home", "About", "Live Webinars", "Contact"].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                    className="text-emerald-300/80 hover:text-yellow-400 transition-all 
                             duration-300 flex items-center gap-3 group"
                  >
                    <div className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-yellow-400 rounded-full" />
              Resources
            </h4>
            <ul className="space-y-4">
              {[
                { text: "Privacy Policy", icon: HiOutlineShieldCheck },
                { text: "Terms & Conditions", icon: HiOutlineDocumentText },
                { text: "Support Center", icon: FiMail },
                { text: "Career Opportunities", icon: HiOutlineAcademicCap }
              ].map((item, idx) => (
                <li 
                  key={idx}
                  className="flex items-center gap-3 text-emerald-300/80 hover:text-yellow-400 
                           transition-all duration-300 group cursor-pointer"
                >
                  <item.icon className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-yellow-400 rounded-full" />
              Contact Info
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="p-2 rounded-lg bg-emerald-900/50 group-hover:bg-yellow-400/20 
                            transition-colors duration-300">
                  <FiMail className="text-yellow-400 text-lg" />
                </div>
                <div>
                  <p className="text-sm text-emerald-400 mb-1">Email Support</p>
                  <p className="text-emerald-200 group-hover:text-yellow-400 transition-colors duration-300">
                    support@workforceskilled.com
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="p-2 rounded-lg bg-emerald-900/50 group-hover:bg-yellow-400/20 
                            transition-colors duration-300">
                  <FiPhone className="text-yellow-400 text-lg" />
                </div>
                <div>
                  <p className="text-sm text-emerald-400 mb-1">Phone Number</p>
                  <p className="text-emerald-200 group-hover:text-yellow-400 transition-colors duration-300">
                    +1 (555) 234-5678
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="p-2 rounded-lg bg-emerald-900/50 group-hover:bg-yellow-400/20 
                            transition-colors duration-300">
                  <FiMapPin className="text-yellow-400 text-lg" />
                </div>
                <div>
                  <p className="text-sm text-emerald-400 mb-1">Our Location</p>
                  <p className="text-emerald-200 group-hover:text-yellow-400 transition-colors duration-300">
                    Long Beach, CA<br />United States
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider with gradient */}
        <div className="relative my-10">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-700 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                      px-4 py-2 bg-emerald-950 rounded-full">
            <div className="w-12 h-0.5 bg-yellow-400/50 rounded-full" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">

          <p className="text-sm text-emerald-400/80 text-center md:text-left">
            © {new Date().getFullYear()} WorkforceSkilled. All rights reserved.
          </p>

          {/* Certifications */}
          <div className="flex flex-wrap justify-center gap-3">
            {["SHRM Approved", "HRCI Certified", "ISO 9001 Compliant"].map((cert, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 rounded-full border border-emerald-700/30 
                         bg-emerald-900/30 backdrop-blur-sm text-xs text-emerald-300/80
                         hover:bg-emerald-800/40 hover:border-emerald-600/50 
                         transition-all duration-300 hover:scale-105"
              >
                {cert}
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* ComplianceTrained Info Section */}
      <section className="bg-gradient-to-t from-emerald-950 to-emerald-900/50 
                       border-t border-emerald-800/20 relative overflow-hidden">
        
        {/* More bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-yellow-400/5 to-emerald-400/3"
              style={{
                width: `${Math.random() * 40 + 15}px`,
                height: `${Math.random() * 40 + 15}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-slow ${Math.random() * 15 + 20}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

            {/* Email Support Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-emerald-400 
                           rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-emerald-900/40 backdrop-blur-sm 
                           border border-emerald-800/30 rounded-2xl p-6
                           transition-all duration-300 hover:bg-emerald-900/60">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-emerald-400/20">
                    <FiMail className="text-yellow-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email Support</h4>
                    <p className="text-emerald-300 text-sm">Fast response guaranteed</p>
                  </div>
                </div>
                <p className="text-emerald-200 text-lg font-medium pl-16">
                  support@compliancetrained.com
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-yellow-400 
                           rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-emerald-900/40 backdrop-blur-sm 
                           border border-emerald-800/30 rounded-2xl p-6
                           transition-all duration-300 hover:bg-emerald-900/60">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400/20 to-yellow-400/20">
                    <FiMapPin className="text-emerald-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Our Location</h4>
                    <p className="text-emerald-300 text-sm">Visit our headquarters</p>
                  </div>
                </div>
                <p className="text-emerald-200 pl-16">
                  375 Redondo Ave #1199<br />
                  Long Beach, CA 90814<br />
                  United States
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Add CSS animations to your global styles or component */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>

    </footer>
  );
}
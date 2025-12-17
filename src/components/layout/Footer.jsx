import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 relative overflow-hidden">

      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-yellow-400" />

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Workforce<span className="text-yellow-400">Skilled</span>
            </h3>
            <p className="text-emerald-300 text-sm leading-relaxed">
              Empowering professionals through high-quality learning,
              live webinars, and industry-ready skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
              <li><Link to="/live-webinars" className="hover:text-yellow-400 transition">Live Webinars</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-yellow-400 transition cursor-pointer">Privacy Policy</li>
              <li className="hover:text-yellow-400 transition cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-yellow-400 transition cursor-pointer">Support</li>
              <li className="hover:text-yellow-400 transition cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FiMail className="text-yellow-400" />
                support@workforceskilled.com
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-yellow-400" />
                +1 (555) 234-5678
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-yellow-400 mt-1" />
                Long Beach, CA <br /> United States
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 border-t border-emerald-800/50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-emerald-400">
            © {new Date().getFullYear()} WorkforceSkilled. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a className="p-2 rounded-full bg-emerald-900 hover:bg-yellow-400 hover:text-emerald-900 transition cursor-pointer">
              <FaFacebookF />
            </a>
            <a className="p-2 rounded-full bg-emerald-900 hover:bg-yellow-400 hover:text-emerald-900 transition cursor-pointer">
              <FaTwitter />
            </a>
            <a className="p-2 rounded-full bg-emerald-900 hover:bg-yellow-400 hover:text-emerald-900 transition cursor-pointer">
              <FaLinkedinIn />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

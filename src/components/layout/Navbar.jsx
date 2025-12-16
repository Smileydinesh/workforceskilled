import { useState } from "react";
import logo from "../../assets/images/icons/logo2.png";

const links = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Webinars", href: "/webinars" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0F3D2E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <img
  src={logo}
  alt="WorkforceSkilled Logo"
  className="w-10 h-10 object-contain"
/>


          {/* Title & Subtitle */}
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold">
              Workforce<span className="text-emerald-400">Skilled</span>
            </h1>
            <p className="text-xs text-gray-300">
              Best Learning Platform
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-gray-200 hover:text-white font-medium transition"
            >
              {link.label}
            </a>
          ))}

          <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-md font-semibold">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-4">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-gray-200 hover:text-white font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-white/10">
              <button
                className="text-left text-gray-200 hover:text-white font-semibold"
                onClick={() => setOpen(false)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

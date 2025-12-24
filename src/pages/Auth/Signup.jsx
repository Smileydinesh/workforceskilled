import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCheck,
  FiGlobe,
  FiBriefcase,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ---------------- COUNTRY DATA ---------------- */
const countries = [
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "India", code: "+91", flag: "🇮🇳" },
];

export default function Signup() {
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  /* ---------------- PASSWORD STRENGTH ---------------- */
  useEffect(() => {
    let strength = 0;
    const p = formData.password;
    if (p.length >= 8) strength += 25;
    if (/[A-Z]/.test(p)) strength += 25;
    if (/[a-z]/.test(p)) strength += 25;
    if (/\d/.test(p)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  /* ---------------- HANDLERS ---------------- */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      company: formData.company,
      country: selectedCountry.name,
      phone: `${selectedCountry.code}${phoneNumber}`,
      password: formData.password,
      confirm_password: formData.confirmPassword,
    };

    try {
      const res = await fetch("http://localhost:8000/api/accounts/register/", {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Registration failed");
        setLoading(false);
        return;
      }

      // Optional: store token if returned
      if (data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
      }

      alert("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strengthColor =
    passwordStrength < 50
      ? "bg-red-500"
      : passwordStrength < 75
      ? "bg-yellow-500"
      : "bg-green-500";

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-white">
            Create Your Account
          </h1>
          <p className="text-emerald-300 text-sm mt-1">
            Start learning with WorkforceSkilled
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Input icon={<FiUser />} name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
            <Input icon={<FiUser />} name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
          </div>

          <Input icon={<FiMail />} name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
          <Input icon={<FiBriefcase />} name="company" placeholder="Company" value={formData.company} onChange={handleInputChange} />

          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="input"
              value={selectedCountry.name}
              onChange={(e) =>
                setSelectedCountry(
                  countries.find((c) => c.name === e.target.value)
                )
              }
            >
              {countries.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>

            <div className="relative">
              <FiPhone className="icon" />
              <input
                className="input pl-10"
                placeholder={`${selectedCountry.code} Phone Number`}
                value={phoneNumber}
                onChange={handlePhoneChange}
                required
              />
            </div>
          </div>

          <Input icon={<FiLock />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />

          <div className="h-1 bg-white/10 rounded">
            <div className={`h-full ${strengthColor}`} style={{ width: `${passwordStrength}%` }} />
          </div>

          <Input icon={<FiLock />} type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />

          <label className="flex items-center gap-2 text-sm text-emerald-300">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} required />
            I agree to Terms & Privacy Policy
          </label>

          <button
            type="submit"
            disabled={loading || !formData.agreeTerms}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-emerald-300 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

/* ---------------- REUSABLE INPUT ---------------- */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="icon">{icon}</span>
      <input {...props} className="input pl-10" required />
    </div>
  );
}

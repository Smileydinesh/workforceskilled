import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCheck,
  FiGlobe,
  FiBriefcase,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/icons/logo5.jpeg";
import countryData from "country-data"; // You'll need to install: npm install country-data

export default function Signup() {
  const navigate = useNavigate();

  // Get all countries with full data
  const countries = useMemo(() => {
    const allCountries = countryData.countries.all;
    return Object.values(allCountries)
      .filter(c => c.countryCallingCodes && c.countryCallingCodes[0])
      .map(c => ({
        name: c.name,
        code: c.countryCallingCodes[0],
        alpha2: c.alpha2,
        flag: c.emoji || "🌐",
        currency: c.currencies ? c.currencies[0] : "",
        continent: c.continent || ""
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  const [strengthText, setStrengthText] = useState("");

  /* ---------------- PASSWORD STRENGTH ---------------- */
  useEffect(() => {
    let strength = 0;
    const p = formData.password;
    
    if (p.length >= 8) strength += 25;
    if (/[A-Z]/.test(p)) strength += 25;
    if (/[a-z]/.test(p)) strength += 25;
    if (/\d/.test(p)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(p)) strength += 25;
    
    // Cap at 100
    strength = Math.min(strength, 100);
    setPasswordStrength(strength);
    
    // Set strength text
    if (p.length === 0) setStrengthText("");
    else if (strength < 50) setStrengthText("Weak");
    else if (strength < 75) setStrengthText("Fair");
    else if (strength < 90) setStrengthText("Good");
    else setStrengthText("Strong");
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
    // Allow only numbers and + for international format
    const value = e.target.value.replace(/[^\d+]/g, "");
    setPhoneNumber(value);
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
      });

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

  const strengthColor = () => {
    if (passwordStrength < 50) return "bg-gradient-to-r from-red-500 to-red-600";
    if (passwordStrength < 75) return "bg-gradient-to-r from-yellow-500 to-yellow-600";
    return "bg-gradient-to-r from-green-500 to-emerald-600";
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/30 relative overflow-hidden"
      >
        {/* Header with logo and title */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-emerald-900/50 to-amber-900/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center shadow-lg">
              <img 
                src={logo} 
                alt="WorkforceSkilled Logo" 
                className="w-10 h-10 rounded-md object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">
                WorkforceSkilled
              </h1>
              <p className="text-emerald-200/80 text-sm font-light mt-1">
                Create your account and start your learning journey
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-amber-400 rounded-full"></div>
              Personal Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-xl p-1">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent pl-10 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-xl p-1">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-300" />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent pl-10 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-1">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent pl-10 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-1">
                <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-300" />
                <input
                  name="company"
                  placeholder="Company (Optional)"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-transparent pl-10 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-emerald-400 rounded-full"></div>
              Contact Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Country Selector */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-xl p-1">
                  <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 z-10" />
                  <select
                    className="w-full bg-transparent pl-10 pr-4 py-3 text-white focus:outline-none appearance-none cursor-pointer"
                    value={selectedCountry.name}
                    onChange={(e) =>
                      setSelectedCountry(
                        countries.find((c) => c.name === e.target.value)
                      )
                    }
                  >
                    {countries.map((c) => (
                      <option key={c.name} value={c.name} className="bg-slate-900 text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <span className="text-xl">{selectedCountry.flag}</span>
                  </div>
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-xl p-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-emerald-300 font-medium">{selectedCountry.code}</span>
                  </div>
                  <FiPhone className="absolute left-16 top-1/2 transform -translate-y-1/2 text-white/50 text-sm" />
                  <input
                    className="w-full bg-transparent pl-24 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-yellow-400 rounded-full"></div>
              Security Information
            </h2>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-1">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-transparent pl-10 pr-12 py-3 text-white placeholder:text-white/50 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Password Strength Meter */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Password Strength</span>
                  <span className={`font-medium ${
                    passwordStrength < 50 ? "text-red-400" :
                    passwordStrength < 75 ? "text-yellow-400" :
                    "text-green-400"
                  }`}>
                    {strengthText}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${passwordStrength}%` }}
                    transition={{ duration: 0.3 }}
                    className={`h-full ${strengthColor()} rounded-full`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/50">
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 8 ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
                    <span>8+ characters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
                    <span>Uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(formData.password) ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
                    <span>Lowercase letter</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(formData.password) ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
                    <span>Number</span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Password Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-emerald-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-1">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-transparent pl-10 pr-12 py-3 text-white placeholder:text-white/50 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-6 pt-4">
            <label className="flex items-start gap-3 group cursor-pointer">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
                  formData.agreeTerms 
                    ? 'bg-gradient-to-r from-emerald-500 to-amber-500 border-transparent' 
                    : 'border-white/30 group-hover:border-emerald-400'
                }`}>
                  {formData.agreeTerms && (
                    <FiCheck className="text-white text-sm" />
                  )}
                </div>
              </div>
              <span className="text-sm text-white/80 leading-relaxed">
                I agree to the{" "}
                <span className="text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-amber-300 hover:text-amber-200 transition-colors cursor-pointer">
                  Privacy Policy
                </span>{" "}
                of WorkforceSkilled
              </span>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !formData.agreeTerms}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                loading || !formData.agreeTerms
                  ? 'bg-gradient-to-r from-emerald-900/50 to-amber-900/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 hover:shadow-lg hover:shadow-emerald-500/25'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </motion.button>

            <div className="text-center">
              <p className="text-white/70 text-sm">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-gradient bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent font-semibold hover:from-emerald-200 hover:to-amber-200 transition-all duration-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
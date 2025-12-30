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
  FiArrowLeft,
  FiChevronRight
} from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/icons/final.jpeg";
import countryData from "country-data";

export default function Signup() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  /* ---------------- COUNTRIES ---------------- */
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

  

  /* ---------------- DEFAULT US ---------------- */
  const usCountry = countries.find(c => c.alpha2 === "US") || countries[0];

  const [selectedCountry, setSelectedCountry] = useState(usCountry);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });



  const filteredCountries = useMemo(
    () =>
      countries.filter((c) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase())
      ),
    [countries, countrySearch]
  );

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("");

  /* ---------------- CALCULATE PROGRESS ---------------- */
  useEffect(() => {
    let filledFields = 0;
    const totalFields = 7; // firstName, lastName, email, company, country, phone, password
    
    if (formData.firstName.trim()) filledFields++;
    if (formData.lastName.trim()) filledFields++;
    if (formData.email.trim()) filledFields++;
    if (formData.company.trim()) filledFields++;
    if (selectedCountry) filledFields++;
    if (phoneNumber.trim()) filledFields++;
    if (formData.password.trim()) filledFields++;
    
    setProgress(Math.round((filledFields / totalFields) * 100));
  }, [formData, selectedCountry, phoneNumber]);

  useEffect(() => {
  const closeDropdown = () => setShowCountryDropdown(false);
  window.addEventListener("click", closeDropdown);
  return () => window.removeEventListener("click", closeDropdown);
}, []);

  /* ---------------- PASSWORD STRENGTH ---------------- */
  useEffect(() => {
    let strength = 0;
    const p = formData.password;
    const requirements = [];

    if (p.length >= 8) {
      strength += 20;
      requirements.push("✓ 8+ characters");
    } else {
      requirements.push("✗ 8+ characters");
    }
    
    if (/[A-Z]/.test(p)) {
      strength += 20;
      requirements.push("✓ Uppercase letter");
    } else {
      requirements.push("✗ Uppercase letter");
    }
    
    if (/[a-z]/.test(p)) {
      strength += 20;
      requirements.push("✓ Lowercase letter");
    } else {
      requirements.push("✗ Lowercase letter");
    }
    
    if (/\d/.test(p)) {
      strength += 20;
      requirements.push("✓ Number");
    } else {
      requirements.push("✗ Number");
    }
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(p)) {
      strength += 20;
      requirements.push("✓ Special character");
    } else {
      requirements.push("✗ Special character");
    }

    strength = Math.min(strength, 100);
    setPasswordStrength(strength);

    if (!p) {
      setStrengthText("");
    } else if (strength < 50) {
      setStrengthText("Weak");
    } else if (strength < 75) {
      setStrengthText("Fair");
    } else if (strength < 90) {
      setStrengthText("Good");
    } else {
      setStrengthText("Strong");
    }
  }, [formData.password]);

  /* ---------------- HANDLERS ---------------- */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e) => {
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
      const res = await fetch(`${API_BASE}/api/accounts/register/`, {
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

      if (data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
      }

      alert("Account created successfully");
      navigate("/login");
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-yellow-400";
    return "bg-emerald-500";
  };

  const strengthTextColor = () => {
    if (passwordStrength < 50) return "text-red-500";
    if (passwordStrength < 75) return "text-yellow-500";
    return "text-emerald-500";
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col items-center justify-center px-4 py-6">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-6">
        <Link 
          to="/login" 
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
        >
          <FiArrowLeft className="mr-2" />
          Back to Sign In
        </Link>
      </div>

      <div className="w-full max-w-4xl">

      <div className="mb-10 text-center">
  <img
    src={logo}
    alt="Logo"
    className="mx-auto w-16 h-16 rounded-xl object-cover mb-4"
  />

  <h1 className="text-3xl font-bold text-emerald-700">
    Create Your Account
  </h1>

  <p className="text-gray-500 mt-1">
    Join thousands of learners and instructors in our comprehensive educational platform. Start your learning journey today.
  </p>

</div>


        {/* Left Panel - Welcome Message */}
        

        {/* Right Panel - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
            
              <h3 className="text-lg font-semibold text-gray-700">Registration Progress</h3>
              <span className="text-emerald-600 font-bold">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FiUser className="w-3 h-3" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <div className="relative">
                    {/* <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                    <input 
                      name="firstName" 
                      placeholder="Enter your first name" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      required 
                      className="pl-10 input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <div className="relative">
                    {/* <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                    <input 
                      name="lastName" 
                      placeholder="Enter your last name" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      required 
                      className="pl-10 input"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <div className="relative">
                  {/* <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    className="pl-10 input"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  We'll use this for account verification and notifications
                </p>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <div className="relative">
                  {/* <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                  <input 
                    name="company" 
                    placeholder="Enter your company name" 
                    value={formData.company} 
                    onChange={handleInputChange} 
                    className="pl-10 input"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FiGlobe className="w-3 h-3" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
    <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Country*
  </label>

  <div
    className="relative"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Trigger Field */}
    <div
      onClick={() => setShowCountryDropdown((v) => !v)}
      className="pl-10 pr-10 input cursor-pointer flex items-center"
    >
      {selectedCountry.name}
    </div>

    {/* <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
    <FiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 w-5 h-5" />

    {/* Dropdown */}
    {showCountryDropdown && (
      <div className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow-lg">

        {/* SEARCH BAR (this was missing) */}
        <div className="p-2 border-b">
          <input
            type="text"
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
            placeholder="Search options..."
            className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* LIST */}
        <div className="max-h-60 overflow-auto">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => {
                  setSelectedCountry(c);
                  setCountrySearch("");
                  setShowCountryDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-emerald-50"
              >
                {c.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No country found
            </div>
          )}
        </div>
      </div>
    )}
  </div>
</div>


                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      {/* <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                      <input 
                        placeholder="Enter your phone number" 
                        value={phoneNumber} 
                        onChange={handlePhoneChange} 
                        required 
                        className="pl-10 input"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Format: {selectedCountry.code} XXX XXX XXXX
                  </p>
                </div>
              </div>
            </div>

            {/* Account Security Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <FiLock className="w-3 h-3" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Account Security</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    {/* <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      placeholder="Create a strong password" 
                      value={formData.password} 
                      onChange={handleInputChange} 
                      required 
                      className="pl-10 pr-10 input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                  
                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Password Strength</span>
                        <span className={`text-sm font-semibold ${strengthTextColor()}`}>
                          {strengthText}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full ${strengthColor()} transition-all duration-300`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password*
                  </label>
                  <div className="relative">
                    {/* <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      name="confirmPassword" 
                      placeholder="Confirm your password" 
                      value={formData.confirmPassword} 
                      onChange={handleInputChange} 
                      required 
                      className="pl-10 pr-10 input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="pt-4 border-t border-gray-200">
              <label className="flex items-start gap-3">
                <div className="relative mt-1">
                  <input 
                    type="checkbox" 
                    name="agreeTerms" 
                    checked={formData.agreeTerms} 
                    onChange={handleInputChange} 
                    required 
                    className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <FiCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" />
                </div>
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms-and-conditions" className="text-emerald-600 font-medium hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-emerald-600 font-medium hover:underline">
                    Privacy Policy
                  </Link>
                  *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.agreeTerms}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                loading || !formData.agreeTerms
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl"
              } text-white`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          outline: none;
          font-size: 0.875rem;
          transition: all 0.2s;
          background-color: white;
        }
        .input:hover {
          border-color: #10b981;
        }
        .input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }
        .input:disabled {
          background-color: #f9fafb;
          cursor: not-allowed;
        }
        select.input {
          background-image: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
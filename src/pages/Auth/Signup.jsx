import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiLock, FiChevronLeft, FiCheck, FiGlobe, FiBriefcase, FiSearch } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Comprehensive country data with codes
const countries = [
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
];

export default function Signup() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [progress, setProgress] = useState(0);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const countryDropdownRef = useRef(null);

  // Filter countries based on search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.includes(searchQuery)
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate progress based on form completion
  useEffect(() => {
    const fields = Object.entries(formData);
    const filledFields = fields.filter(([key, value]) => {
      if (key === 'agreeTerms') return value;
      return value && value.trim().length > 0;
    }).length;
    
    const totalFields = fields.length;
    const phoneFilled = phoneNumber.trim().length > 0 ? 1 : 0;
    const countrySelected = selectedCountry ? 1 : 0;
    
    const totalProgress = (filledFields + phoneFilled + countrySelected) / (totalFields + 2) * 100;
    setProgress(Math.min(totalProgress, 100));
  }, [formData, phoneNumber, selectedCountry]);

  // Calculate password strength
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format based on country code
    if (selectedCountry.code === '+1') {
      if (value.length > 0) value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    } else {
      if (value.length > 0) value = value.replace(/(\d{3})(?=\d)/g, '$1 ');
    }
    
    setPhoneNumber(value);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setSearchQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      country: selectedCountry,
      phone: phoneNumber
    });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header with Logo */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-emerald-900/40 to-teal-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <div className="text-xl font-bold text-white">WS</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">WorkForceSkilled</h1>
                <p className="text-emerald-300/80 text-sm">Professional Excellence Platform</p>
              </div>
            </div>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 hover:text-white transition group border border-white/20"
              >
                <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-emerald-300/90">
              Join thousands of learners and instructors in our comprehensive educational platform. 
              Start your learning journey today.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-emerald-300">Registration Progress</span>
              <span className="text-base font-bold text-emerald-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              />
            </div>
          </div>

          {/* Form Container */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Information Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white">Personal Information</h3>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder-emerald-300/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder-emerald-300/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-emerald-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder-emerald-300/50"
                      required
                    />
                  </div>
                  <p className="text-emerald-400/70 text-xs mt-2">
                    We'll use this for account verification and notifications
                  </p>
                </div>

                {/* Company */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-emerald-300 mb-2">
                    Company *
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="text"
                      name="company"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder-emerald-300/50"
                      required
                    />
                  </div>
                </div>

                {/* Country & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      Country *
                    </label>
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 hover:border-emerald-500 focus:border-emerald-500 focus:outline-none transition-all text-left flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <FiGlobe className="text-emerald-400" />
                          <span className="text-white">{selectedCountry.flag} {selectedCountry.name}</span>
                        </div>
                        <svg 
                          className={`w-4 h-4 text-emerald-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showCountryDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-2 bg-slate-800 border border-emerald-700/40 rounded-xl shadow-xl overflow-hidden"
                        >
                          {/* Search Bar */}
                          <div className="p-3 border-b border-emerald-700/40 bg-slate-800/80">
                            <div className="relative">
                              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                              <input
                                type="text"
                                placeholder="Search country..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-500 placeholder-emerald-300/50"
                                autoFocus
                              />
                            </div>
                          </div>
                          
                          {/* Country List */}
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <button
                                  key={country.name}
                                  type="button"
                                  onClick={() => handleCountrySelect(country)}
                                  className={`w-full px-4 py-3 text-left text-white hover:bg-emerald-900/30 transition flex items-center justify-between border-b border-emerald-700/20 last:border-b-0 ${
                                    selectedCountry.name === country.name ? 'bg-emerald-900/40' : ''
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">{country.flag}</span>
                                    <span>{country.name}</span>
                                  </div>
                                  <span className="text-emerald-400 font-medium">{country.code}</span>
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-center text-emerald-300/70">
                                No countries found
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-shrink-0">
                        <div className="px-3 py-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 font-medium flex items-center h-full">
                          {selectedCountry.code}
                        </div>
                      </div>
                      <div className="relative flex-1">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                        <input
                          type="tel"
                          placeholder={`Enter your phone number`}
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder-emerald-300/50"
                          required
                        />
                      </div>
                    </div>
                    <p className="text-emerald-400/70 text-xs mt-2">
                      Format: {selectedCountry.code} {selectedCountry.code === '+1' ? 'XXX XXX XXXX' : 'XXXX XXXX'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-6"></div>

              {/* Account Security Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white">Account Security</h3>
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-emerald-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder-emerald-300/50"
                      required
                    />
                  </div>
                  
                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="space-y-1 mt-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-300">Password Strength</span>
                        <span className={`font-medium ${
                          passwordStrength < 50 ? 'text-red-400' :
                          passwordStrength < 75 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {passwordStrength < 50 ? 'Weak' :
                           passwordStrength < 75 ? 'Medium' : 'Strong'}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength}%` }}
                          transition={{ type: "spring" }}
                          className={`h-full ${getPasswordStrengthColor()}`}
                        />
                      </div>
                    </div>
                  )}
                  
                  <p className="text-emerald-400/70 text-xs mt-2">
                    Must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-emerald-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-emerald-700/40 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder-emerald-300/50"
                      required
                    />
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="sr-only"
                        required
                      />
                      <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center group-hover:border-emerald-400 ${
                        formData.agreeTerms 
                          ? 'bg-emerald-500 border-emerald-500' 
                          : 'border-emerald-300/30'
                      }`}>
                        {formData.agreeTerms && (
                          <FiCheck className="text-white text-xs" />
                        )}
                      </div>
                    </div>
                    <span className="text-emerald-300 text-sm group-hover:text-emerald-200 transition">
                      I agree to the{" "}
                      <Link to="/terms" className="text-emerald-400 font-medium hover:text-emerald-300 hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-emerald-400 font-medium hover:text-emerald-300 hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      *
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.agreeTerms || progress < 100}
              >
                Create Account
              </motion.button>

              {/* Already have account */}
              <div className="text-center pt-5 border-t border-white/10">
                <p className="text-emerald-300 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 hover:underline transition">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-emerald-300/70 text-xs">
                © 2025 ComplianceTrained. All rights reserved.
              </p>
              <div className="flex gap-5 mt-3 md:mt-0">
                <Link to="/terms" className="text-emerald-400 hover:text-emerald-300 hover:underline transition text-xs">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300 hover:underline transition text-xs">
                  Privacy Policy
                </Link>
                <Link to="/support" className="text-emerald-400 hover:text-emerald-300 hover:underline transition text-xs">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
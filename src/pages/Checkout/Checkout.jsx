import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiMapPin,
  FiGlobe,
  FiLock,
  FiShield,
  FiCreditCard,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiPackage,
  FiMap,
  FiHome,
  FiNavigation
} from "react-icons/fi";

export default function Checkout() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);


  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  });

  /* ------------------------------------
     AUTH TOKEN
  ------------------------------------ */
  const token =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");

  /* ------------------------------------
     REDIRECT IF NOT LOGGED IN
  ------------------------------------ */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCheckoutData();
  }, [token]);

  /* ------------------------------------
     FETCH CHECKOUT DATA (STEP 1)
  ------------------------------------ */
  const fetchCheckoutData = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/orders/checkout/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (data.detail === "Cart is empty") {
        navigate("/cart");
        return;
      }

      setCart(data.cart);

      setForm({
        first_name: data.user.first_name || "",
        last_name: data.user.last_name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        company: data.user.company || "",
        country: data.user.country || "United States",
        address: "",
        city: "",
        state: "",
        zip_code: "",
      });
    } catch (err) {
      console.error("Checkout fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------
     INPUT HANDLER
  ------------------------------------ */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ------------------------------------
     SUBMIT CHECKOUT (STEP 2)
  ------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(
        `${API_BASE}/api/orders/checkout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        // Add success animation before navigation
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate("/payment");
      } else {
        const errorData = await res.json();
        console.error("Checkout error:", errorData);
        alert("Checkout failed. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-50">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-emerald-200 rounded-full">
              <div className="absolute inset-0 m-2 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute -inset-4 border-4 border-amber-200 rounded-full animate-ping"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Preparing Your Checkout</h3>
          <p className="text-gray-500 text-sm mt-2">Securely loading your information...</p>
        </div>
      </div>
    );
  }

  /* ------------------------------------
     ANIMATION VARIANTS
  ------------------------------------ */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-50 py-12 px-4 sm:px-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                1
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-emerald-600">Cart</div>
                <div className="text-xs text-gray-500">Review Items</div>
              </div>
            </div>
            
            {/* Connector */}
            <div className="w-16 h-1 bg-emerald-200 mx-4"></div>
            
            {/* Step 2 */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-200">
                <FiUser className="text-lg" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-800">Details</div>
                <div className="text-xs text-emerald-600">Billing Info</div>
              </div>
            </div>
            
            {/* Connector */}
            <div className="w-16 h-1 bg-gray-200 mx-4"></div>
            
            {/* Step 3 */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">
                <FiCreditCard className="text-lg" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-400">Payment</div>
                <div className="text-xs text-gray-400">Secure Checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT – FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="lg:col-span-2 space-y-8"
        >
          {/* Form Header */}
          <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200">
                <FiUser className="text-2xl text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
                <p className="text-gray-500">Please provide your details for order confirmation</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className={`relative rounded-xl transition-all duration-300 ${
                  activeField === 'first_name' 
                    ? 'ring-2 ring-emerald-500 ring-offset-2' 
                    : ''
                }`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiUser />
                  </div>
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('first_name')}
                    onBlur={() => setActiveField(null)}
                    placeholder="John"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                  />
                </div>
              </motion.div>

              {/* Last Name */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className={`relative rounded-xl transition-all duration-300 ${
                  activeField === 'last_name' 
                    ? 'ring-2 ring-emerald-500 ring-offset-2' 
                    : ''
                }`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiUser />
                  </div>
                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('last_name')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Doe"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                  />
                </div>
              </motion.div>
            </div>

            {/* Email */}
            <motion.div variants={itemVariants} className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className={`relative rounded-xl transition-all duration-300 ${
                activeField === 'email' 
                  ? 'ring-2 ring-emerald-500 ring-offset-2' 
                  : ''
              }`}>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiMail />
                </div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Phone */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className={`relative rounded-xl transition-all duration-300 ${
                  activeField === 'phone' 
                    ? 'ring-2 ring-emerald-500 ring-offset-2' 
                    : ''
                }`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiPhone />
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setActiveField('phone')}
                    onBlur={() => setActiveField(null)}
                    placeholder="+1 (555) 123-4567"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                  />
                </div>
              </motion.div>

              {/* Company */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className={`relative rounded-xl transition-all duration-300 ${
                  activeField === 'company' 
                    ? 'ring-2 ring-emerald-500 ring-offset-2' 
                    : ''
                }`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiBriefcase />
                  </div>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    onFocus={() => setActiveField('company')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Your Company Inc."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Billing Address */}
          <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200">
                <FiHome className="text-2xl text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Billing Address</h2>
                <p className="text-gray-500">Where should we send your order confirmation?</p>
              </div>
            </div>

            {/* Address */}
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <div className={`relative rounded-xl transition-all duration-300 ${
                activeField === 'address' 
                  ? 'ring-2 ring-emerald-500 ring-offset-2' 
                  : ''
              }`}>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiMapPin />
                </div>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  onFocus={() => setActiveField('address')}
                  onBlur={() => setActiveField(null)}
                  placeholder="123 Main Street, Apt 4B"
                  required
                  rows="3"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300 resize-none"
                />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* City */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className={`relative rounded-xl transition-all duration-300 ${
                  activeField === 'city' 
                    ? 'ring-2 ring-emerald-500 ring-offset-2' 
                    : ''
                }`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiNavigation />
                  </div>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    onFocus={() => setActiveField('city')}
                    onBlur={() => setActiveField(null)}
                    placeholder="New York"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                  />
                </div>
              </motion.div>

              {/* State */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State / Province
                </label>
                <div className={`relative rounded-xl transition-all duration-300 ${
                  activeField === 'state' 
                    ? 'ring-2 ring-emerald-500 ring-offset-2' 
                    : ''
                }`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiMap />
                  </div>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    onFocus={() => setActiveField('state')}
                    onBlur={() => setActiveField(null)}
                    placeholder="NY"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                  />
                </div>
              </motion.div>

              {/* ZIP Code */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP / Postal Code
                </label>
                <div className={`relative rounded-xl transition-all duration-300 ${
                  activeField === 'zip_code' 
                    ? 'ring-2 ring-emerald-500 ring-offset-2' 
                    : ''
                }`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiPackage />
                  </div>
                  <input
                    name="zip_code"
                    value={form.zip_code}
                    onChange={handleChange}
                    onFocus={() => setActiveField('zip_code')}
                    onBlur={() => setActiveField(null)}
                    placeholder="10001"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                  />
                </div>
              </motion.div>
            </div>

            {/* Country */}
            <motion.div variants={itemVariants} className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <div className={`relative rounded-xl transition-all duration-300 ${
                activeField === 'country' 
                  ? 'ring-2 ring-emerald-500 ring-offset-2' 
                  : ''
              }`}>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiGlobe />
                </div>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  onFocus={() => setActiveField('country')}
                  onBlur={() => setActiveField(null)}
                  placeholder="United States"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Form Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              to="/cart"
              className="group flex items-center gap-2 px-6 py-3.5 text-gray-700 hover:text-emerald-700 font-medium transition-all duration-300"
            >
              <FiChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Cart</span>
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-900/30 transition-all duration-500 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Payment</span>
                    <FiChevronRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </motion.div>
        </motion.form>

        {/* RIGHT – SUMMARY */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="space-y-6"
        >
          {/* Order Summary */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-7 sticky top-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200">
                <FiPackage className="text-xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              <AnimatePresence>
                {Array.isArray(cart.items) && cart.items.map((item, i) => (

                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                  >
                    <img
                        src={item.cover_image}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover border"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.instructor}</p>
                      <p className="text-xs text-emerald-600 font-medium">
                        {item.purchase_type?.replaceAll("_", " ") || "Standard"}

                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">${item.subtotal}</div>
                      <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-800">${cart.total}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold text-gray-800">$0.00</span>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    ${cart.total}
                  </div>
                  <div className="text-sm text-gray-500">USD • One-time payment</div>
                </div>
              </div>
            </div>

            {/* Security Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                  <FiShield className="text-lg text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Secure Payment</h4>
                  <p className="text-sm text-gray-600">
                    Powered by Stripe • 256-bit SSL encryption • PCI DSS compliant
                  </p>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiCheckCircle className="text-emerald-500 flex-shrink-0" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiLock className="text-amber-500 flex-shrink-0" />
                  <span>Your data is protected and private</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiShield className="text-emerald-500 flex-shrink-0" />
                  <span>Enterprise-grade security</span>
                </div>
              </div>
            </div>
          </div>

          {/* Need Help Section */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200 p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600">
                <FiPhone className="text-lg text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Our support team is here to assist you 24/7
                </p>
                <a 
                  href="mailto:support@academy.com" 
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                >
                  support@workforceskilled.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
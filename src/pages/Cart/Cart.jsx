import { useEffect, useState } from "react";
import { FiTrash2, FiShoppingCart, FiChevronRight, FiShield, FiLock, FiArrowLeft, FiZap, FiCheckCircle, FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(null);
  const [isHoveringCheckout, setIsHoveringCheckout] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  /* ---------------- FETCH CART ---------------- */
  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cart/`, {
        credentials: "include",
      });

      const data = await res.json();
      setCart(data);
      
      // Trigger item animations after data loads
      setTimeout(() => setAnimateItems(true), 100);
    } catch (err) {
      console.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ---------------- REMOVE ITEM ---------------- */
  const removeItem = async (id) => {
    setIsRemoving(id);
    try {
      await fetch(`${API_BASE}/api/cart/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ item_id: id }),
      });

      // 🔥 update cart instantly
      await fetchCart();

      // 🔥 update navbar counter instantly
      await fetchCartCount();
    } catch (err) {
      console.error("Failed to remove item");
    } finally {
      setIsRemoving(null);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-sky-50/20 to-gray-50">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-sky-200 rounded-full">
              <div className="absolute inset-0 m-2 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute -inset-4 border-4 border-amber-200 rounded-full animate-ping"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Loading Your Cart</h3>
          <p className="text-gray-500 text-sm mt-2">Fetching your selected courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-sky-50/20 to-gray-50 py-16 px-4 sm:px-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-sky-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <button 
              onClick={() => navigate("/live-webinars")}
              className="flex items-center gap-1 hover:text-sky-600 transition-colors duration-300"
            >
              <FiArrowLeft className="text-xs" />
              <span>Back to Courses</span>
            </button>
            <FiChevronRight className="text-xs" />
            <span className="text-sky-600 font-medium">Your Cart</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg">
                  <FiShoppingCart className="text-2xl" />
                </div>
                {cart.items.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center animate-bounce">
                    {cart.items.length}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Your Learning Cart</h1>
                <p className="text-gray-500">Review and manage your selected courses</p>
              </div>
            </div>
            
            {cart.items.length > 0 && (
              <div className="px-4 py-2 rounded-full bg-sky-50 border border-sky-200">
                <span className="text-sky-700 font-medium">
                  {cart.items.length} item{cart.items.length !== 1 ? 's' : ''} • ${cart.total}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* EMPTY CART */}
        {cart.items.length === 0 && (
          <div className="animate-slide-up">
            <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center border border-sky-200">
                <FiShoppingCart className="text-4xl text-sky-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-8">
                It looks like you haven't added any courses to your cart yet. Start exploring our premium webinars!
              </p>
              <button
                onClick={() => navigate("/live-webinars")}
                className="group px-8 py-3.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-sky-900/20 inline-flex items-center gap-2"
              >
                <span>Browse Courses</span>
                <FiZap className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        )}

        {/* CART CONTENT */}
        {cart.items.length > 0 && (
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 animate-slide-up">
            
            {/* LEFT - ITEMS */}
            <div className="space-y-4">
              {/* Security Banner */}
              <div className="bg-gradient-to-r from-sky-50 to-amber-50 rounded-2xl border border-sky-200 p-5 mb-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200">
                    <FiShield className="text-xl text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Secure Checkout</h4>
                    <p className="text-sm text-gray-600">Your cart is protected with 256-bit SSL encryption</p>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              {cart.items.map((item, index) => (
                <div
                  key={item.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-sky-300 transition-all duration-500 hover:shadow-xl hover:shadow-sky-100/50 overflow-hidden ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    animation: animateItems ? `slideUp 0.5s ease-out ${index * 100}ms both` : 'none'
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-6 p-6">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        className="w-full sm:w-36 h-32 rounded-xl object-cover shadow-lg border border-gray-100"
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                        ${item.price}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-sky-700 transition-colors duration-300">
                            {item.title}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium border border-sky-200">
                              <FiPackage className="text-xs" />
                              {item.purchase_type.replaceAll("_", " ")}
                            </span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-600 font-medium">{item.instructor}</span>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2">
                            {/* <div className="flex items-center gap-1 text-xs text-sky-600">
                              <FiCheckCircle className="text-xs" />
                              <span>Certificate</span>
                            </div> */}
                            <div className="flex items-center gap-1 text-xs text-amber-600">
                              <FiCheckCircle className="text-xs" />
                              <span>Lifetime Access</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-sky-600">
                              <FiCheckCircle className="text-xs" />
                              <span>Q&A Support</span>
                            </div>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-sky-600">${item.subtotal}</div>
                            <div className="text-sm text-gray-500">
                              <span className="text-gray-600 font-medium">${item.price}</span>
                              <span className="mx-1">×</span>
                              <span className="px-2 py-0.5 bg-gray-100 rounded">{item.quantity}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={isRemoving === item.id}
                            className="group flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 disabled:opacity-50"
                          >
                            {isRemoving === item.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin"></div>
                                <span className="text-sm">Removing...</span>
                              </>
                            ) : (
                              <>
                                <FiTrash2 className="group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-sm font-medium">Remove</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar Animation on Remove */}
                  {isRemoving === item.id && (
                    <div className="h-1 bg-gradient-to-r from-red-500 to-red-600 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <aside className="space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-7 h-fit sticky top-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200">
                    <FiPackage className="text-xl text-sky-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal ({cart.items.length} items)</span>
                    <span className="font-semibold text-gray-800">${cart.total}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-sky-600">$0.00</span>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                        ${cart.total}
                      </div>
                      <div className="text-sm text-gray-500">USD • One-time payment</div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  onMouseEnter={() => setIsHoveringCheckout(true)}
                  onMouseLeave={() => setIsHoveringCheckout(false)}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white shadow-lg hover:shadow-xl hover:shadow-sky-900/30 transition-all duration-500 transform hover:-translate-y-1 active:translate-y-0"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span>Proceed to Checkout</span>
                    <FiChevronRight className={`text-xl transition-transform duration-300 ${
                      isHoveringCheckout ? 'translate-x-2' : ''
                    }`} />
                  </div>
                </button>

                {/* Guarantees */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FiShield className="text-sky-500 flex-shrink-0" />
                      <span>30-Day Money Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FiLock className="text-amber-500 flex-shrink-0" />
                      <span>Secure SSL Encrypted Payment</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FiCheckCircle className="text-sky-500 flex-shrink-0" />
                      <span>Instant Access After Purchase</span>
                    </div>
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => navigate("/")}
                    className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all duration-300 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Savings Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200 p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600">
                    <FiZap className="text-lg text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Want to Save More?</h4>
                    <p className="text-sm text-gray-600">
                      Add more courses to qualify for bundle discounts and special offers!
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
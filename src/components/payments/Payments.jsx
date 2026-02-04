import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PayPalButton from "../../components/payments/PayPalButton";
import {
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiPackage,
  FiCreditCard,
} from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Payments() {
  const { orderId } = useParams();
  const navigate = useNavigate();
 

  const token =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [paypalKey, setPaypalKey] = useState(0); // 🔥 force remount

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchOrderDetails();
    // eslint-disable-next-line
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/orders/${orderId}/details/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Order details API failed:", res.status, text);
        alert("Unable to load payment details.");
        return;
      }

      const data = await res.json();

      if (data.status === "PAID") {
        navigate("/userdashboard");
        return;
      }

      setOrder(data);
    } catch (err) {
      console.error("Order fetch error:", err);
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) return null;

  /* ---------------- ANIMATIONS ---------------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sky-50 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* BILLING */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">
              Confirm Billing Address
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <FiUser className="text-sky-500" />
                {order.billing.first_name} {order.billing.last_name}
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-sky-500" />
                {order.billing.email}
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="text-sky-500" />
                {order.billing.phone}
              </p>
              <p className="flex items-center gap-2 sm:col-span-2">
                <FiMapPin className="text-sky-500" />
                {order.billing.address}, {order.billing.city},{" "}
                {order.billing.state} {order.billing.zip_code},{" "}
                {order.billing.country}
              </p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">
              What You’re Buying
            </h2>

            <div className="space-y-4">
              {order.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.type.replaceAll("_", " ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${item.subtotal}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="space-y-6 sticky top-24"
        >
          {/* TOTAL */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${order.total}</span>
            </div>

            <div className="flex justify-between text-lg font-bold pt-3 border-t">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <FiCreditCard className="text-sky-600" />
              <h2 className="text-xl font-bold">
                Payment Details
              </h2>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Secure debit / credit card payment
            </p>

            {/* 🔥 PAYPAL (KEY FIX INCLUDED) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={paypalKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PayPalButton
                    key={paypalKey}                      // 🔥 FORCE REMOUNT
                    orderId={order.id}
                    onSuccess={() => navigate("/userdashboard")}
                    onCancel={() => setPaypalKey(k => k + 1)}   // 🔁 RESET
                    />

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

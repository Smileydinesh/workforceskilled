import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SubscriptionToast({ show, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          fixed bottom-6 left-1/2 -translate-x-1/2
          z-[100]
          w-[95%] sm:max-w-xl
          bg-white
          border border-sky-200
          shadow-2xl
          rounded-2xl
          p-5
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <FiX size={18} />
        </button>

        {/* CONTENT */}
        <div className="flex gap-4 items-start">
          {/* ICON */}
          <div className="
            w-10 h-10
            rounded-full
            bg-sky-100
            flex items-center justify-center
            text-sky-600
            flex-shrink-0
          ">
            <FiZap />
          </div>

          {/* TEXT */}
          <div className="flex-1">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Learn smarter with our Subscription 🚀
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Get <b>FREE access to live webinars</b>, save big on recorded
              sessions, and upskill continuously — all with one subscription.
            </p>

            {/* CTA */}
            <button
              onClick={() => navigate("/subscriptions/checkout")}
              className="
                inline-flex items-center gap-2
                bg-sky-600 hover:bg-sky-700
                text-white
                px-4 py-2
                rounded-lg
                text-sm
                font-semibold
                transition
              "
            >
              View Subscription →
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

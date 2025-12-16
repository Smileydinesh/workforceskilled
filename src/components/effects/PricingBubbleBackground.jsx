import { motion } from "framer-motion";

export default function PricingBubbleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-md"
          style={{
            width: `${60 + i * 6}px`,
            height: `${60 + i * 6}px`,
            left: `${(i * 13) % 100}%`,
            top: `${(i * 17) % 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 30, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 18 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

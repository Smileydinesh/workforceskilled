export default function BubbleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 bg-white/40 rounded-full
                     animate-bubble"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 20}px`,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

    </div>
  );
}

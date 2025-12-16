export default function HeroGlow() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px]
                      bg-[#FACC15]/30 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px]
                      bg-[#1E6F5C]/40 rounded-full blur-[140px]" />
    </div>
  );
}

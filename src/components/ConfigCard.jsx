export default function Card({ children }) {
  return (
    <div className="bg-black/60 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-6 shadow-[0_0_25px_#10b98122]">
      {children}
    </div>
  );
}
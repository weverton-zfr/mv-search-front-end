export default function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="mt-4 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:scale-[1.01]">
      {children}
    </button>
  );
}
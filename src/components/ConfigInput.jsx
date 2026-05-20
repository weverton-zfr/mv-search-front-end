export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange
}) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full mt-2 p-3 rounded-xl bg-black text-white border border-emerald-400/20 focus:ring-2 focus:ring-emerald-500 outline-none"
      />
    </div>
  );
}
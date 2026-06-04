import { valueOrDefault } from "../hooks/useFormat";
import { useTheme } from "../context/ThemeContext";

export default function SearchCard({ label, value }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return(
    <div
      className={`
        rounded-2xl
        p-4
        border
        break-words
        ${
          isDark
            ? "bg-black/25 border-white/5"
            : "bg-white/65 border-slate-300/40"
        }
      `}
    >
      <p className={`text-[11px] uppercase tracking-wider mb-1 ${isDark ? "text-gray-500" : "text-slate-500"}`}>
        {label}
      </p>

      <h3 className={`text-sm sm:text-base font-semibold break-words ${isDark ? "text-green-100" : "text-emerald-950"}`}>
        {valueOrDefault(value)}
      </h3>
    </div>
  );
}
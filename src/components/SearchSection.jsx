import { useTheme } from "../context/ThemeContext";

export default function SectionSearch({ icon, title, count, children }){
    const { theme } = useTheme();
    const isDark = theme === "dark";
    
    return(
    <div
      className={`
        rounded-3xl
        border
        p-4
        sm:p-5
        transition
        ${
          isDark
            ? "bg-white/[0.025] border-white/10"
            : "bg-white/70 border-slate-300/50 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
        }
      `}
    >
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className={`text-lg sm:text-xl font-black ${isDark ? "text-green-100" : "text-emerald-900"}`}>
          <span className="mr-2">{icon}</span>
          {title}
        </h2>

        {count !== undefined && (
          <span
            className={`
              w-fit
              px-3
              py-1
              rounded-full
              border
              text-xs
              font-semibold
              ${
                isDark
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                  : "bg-emerald-700/10 text-emerald-800 border-emerald-700/20"
              }
            `}
          >
            {count} registro{count === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
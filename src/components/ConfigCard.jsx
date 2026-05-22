import { useTheme } from "../context/ThemeContext";

export default function Card({
  children,
  className = ""
}) {

  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (

    <div
      className={`
        w-full

        rounded-3xl

        p-4
        sm:p-5
        md:p-6

        backdrop-blur-xl

        border

        transition-all
        duration-300

        ${
          isDark
            ? `
              bg-black/60
              border-emerald-400/20
              shadow-[0_0_25px_#10b98115]
            `
            : `
              bg-white/70
              border-slate-300/50
              shadow-[0_0_30px_rgba(15,23,42,0.06)]
            `
        }

        ${className}
      `}
    >

      {children}

    </div>

  );

}
import { useTheme } from "../context/ThemeContext";

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false
}) {

  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (

    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        sm:w-auto

        px-5
        sm:px-6

        py-3

        rounded-2xl

        font-semibold

        transition-all
        duration-200

        hover:scale-[1.01]
        active:scale-[0.99]

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${
          isDark
            ? `
              bg-green-700
              hover:bg-green-600

              text-white

              shadow-[0_0_20px_#16653422]
            `
            : `
              bg-emerald-700
              hover:bg-emerald-600

              text-white

              shadow-[0_0_20px_rgba(4,120,87,0.15)]
            `
        }

        ${className}
      `}
    >

      {children}

    </button>

  );

}
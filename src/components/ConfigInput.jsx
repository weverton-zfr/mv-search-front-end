import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  required = false
}) {

  const { theme } = useTheme();

  const isDark = theme === "dark";

  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (

    <div className="w-full">

      {
        label &&
        <label
          className={`
            text-sm
            font-medium
            transition-colors

            ${
              isDark
                ? "text-gray-300"
                : "text-slate-700"
            }
          `}
        >
          {label}
        </label>
      }

      <div className="relative">

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full

            mt-2

            p-3
            sm:p-3.5

            ${
              type === "password"
                ? "pr-12"
                : ""
            }

            rounded-2xl

            border

            outline-none

            transition-all
            duration-200

            disabled:opacity-50
            disabled:cursor-not-allowed

            ${
              isDark
                ? `
                  bg-black/60

                  text-white

                  placeholder:text-gray-500

                  border-emerald-400/10

                  hover:border-emerald-500/30

                  focus:ring-2
                  focus:ring-emerald-500/30

                  focus:border-emerald-500
                `
                : `
                  bg-white/75

                  text-slate-900

                  placeholder:text-slate-400

                  border-slate-300/60

                  shadow-[0_0_15px_rgba(15,23,42,0.03)]

                  hover:border-emerald-700/30

                  focus:ring-2
                  focus:ring-emerald-700/20

                  focus:border-emerald-700
                `
            }

            ${className}
          `}
        />

        {
          type === "password" &&
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className={`
              absolute

              right-4
              top-1/2
              -translate-y-1/2

              transition-colors

              ${
                isDark
                  ? "text-gray-400 hover:text-green-400"
                  : "text-slate-500 hover:text-emerald-700"
              }
            `}
          >

            {
              showPassword
                ? <FaEyeSlash />
                : <FaEye />
            }

          </button>
        }

      </div>

    </div>

  );

}
import ConfigCard from "../../components/ConfigCard";
import { useTheme } from "../../context/ThemeContext";

export default function Theme() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <ConfigCard>
      <div className="flex flex-col gap-1 mb-8">
        <h2
          className={`
            text-2xl
            sm:text-3xl
            font-bold

            ${isDark ? "text-white" : "text-emerald-950"}
          `}
        >
          Tema
        </h2>

        <p
          className={`
            text-sm

            ${isDark ? "text-gray-400" : "text-slate-600"}
          `}
        >
          Personalize a aparência do sistema entre modo claro e escuro.
        </p>
      </div>

      <div
        className={`
          rounded-3xl
          border
          p-5
          sm:p-6
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-5
          transition-all

          ${
            isDark
              ? "bg-white/[0.03] border-white/5"
              : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
          }
        `}
      >
        <div className="flex flex-col gap-2">
          <span
            className={`
              text-sm

              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            Tema atual
          </span>

          <h3
            className={`
              text-xl
              font-bold

              ${isDark ? "text-emerald-300" : "text-emerald-900"}
            `}
          >
            {isDark ? "🌙 Tema Escuro" : "☀️ Tema Claro"}
          </h3>

          <p
            className={`
              text-sm
              max-w-[500px]
              leading-relaxed

              ${isDark ? "text-gray-500" : "text-slate-600"}
            `}
          >
            O tema altera toda a aparência do sistema e fica salvo automaticamente
            no navegador.
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="
            w-full
            sm:w-auto
            px-6
            py-3
            rounded-2xl
            bg-emerald-700
            hover:bg-emerald-600
            active:scale-[0.98]
            transition-all
            text-white
            font-semibold
            shadow-[0_0_20px_rgba(4,120,87,0.18)]
          "
        >
          {isDark ? "☀️ Alternar para Claro" : "🌙 Alternar para Escuro"}
        </button>
      </div>
    </ConfigCard>
  );
}
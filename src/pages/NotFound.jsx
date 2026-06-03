import { Link } from "react-router";
import { useTheme } from "../context/ThemeContext";
import ContainerDefault from "../components/ContainerDefault";

export default function NotFound() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <ContainerDefault>
      <div
        className={`
          absolute
          w-[500px]
          h-[500px]
          blur-[140px]
          rounded-full
          z-0

          ${
            isDark
              ? "bg-green-500/10"
              : "bg-emerald-700/10"
          }
        `}
      />

      <div
        className={`
          relative
          z-10
          w-full
          max-w-[700px]
          rounded-3xl
          border
          backdrop-blur-xl
          p-6
          sm:p-10
          flex
          flex-col
          items-center
          transition-all

          ${
            isDark
              ? "bg-black/50 border-emerald-400/20 shadow-[0_0_25px_#10b98122]"
              : "bg-white/70 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]"
          }
        `}
      >
        <h1
          className={`
            text-7xl
            sm:text-8xl
            md:text-9xl
            font-black
            drop-shadow-[0_0_25px_rgba(34,197,94,0.35)]

            ${
              isDark
                ? "text-green-500"
                : "text-emerald-800"
            }
          `}
        >
          404
        </h1>

        <h2
          className={`
            mt-4
            text-2xl
            sm:text-4xl
            font-bold

            ${
              isDark
                ? "text-white"
                : "text-emerald-950"
            }
          `}
        >
          Página não encontrada
        </h2>

        <p
          className={`
            mt-4
            max-w-[520px]
            text-sm
            sm:text-base
            leading-relaxed

            ${
              isDark
                ? "text-gray-400"
                : "text-slate-600"
            }
          `}
        >
          A página que você tentou acessar não existe,
          foi removida ou o endereço está incorreto.
        </p>

        <Link
          to="/"
          className="
            mt-8
            w-full
            sm:w-auto
            px-6
            sm:px-8
            py-3
            rounded-2xl
            bg-emerald-700
            hover:bg-emerald-600
            text-white
            font-semibold
            transition-all
            duration-200
            hover:scale-[1.02]
            active:scale-[0.98]
            shadow-[0_0_25px_rgba(4,120,87,0.25)]
          "
        >
          ← Voltar ao início
        </Link>
      </div>
    </ContainerDefault>
  );
}
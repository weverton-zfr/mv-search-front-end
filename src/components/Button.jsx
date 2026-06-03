import { useTheme } from "../context/ThemeContext";

export default function Button({onClick, disabled, loading, color, method}){
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return(
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
              py-4
              px-5
              rounded-2xl
              font-semibold
              transition-all
              duration-200
              ${
                color === "green" ?
                    loading
                        ? "bg-emerald-900 cursor-not-allowed opacity-70"
                        : "bg-emerald-700 hover:bg-emerald-600 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    
                    :
                        isDark
                        ? "bg-white/10 hover:bg-white/15 text-gray-300"
                        : "bg-slate-200 hover:bg-slate-300 text-slate-700"
              }

              ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
          >

            {color === "green" ?
             loading
                ? "Gerando pagamento..."
                : method === "pix"
                  ? "Gerar pagamento PIX"
                  : "Ir para pagamento com cartão"
                :
                "Voltar"
            }
          </button>
    )
}
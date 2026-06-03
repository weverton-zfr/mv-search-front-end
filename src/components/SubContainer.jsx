import { useTheme } from "../context/ThemeContext";

export default function SubContainer({children}){
    const { theme } = useTheme();
    const isDark = theme === "dark";
    
    return(
        <div className={`
            rounded-2xl
            sm:rounded-3xl
            border
            flex
            flex-col
            items-center
            overflow-hidden
            p-3
            sm:p-6
            lg:p-10
            backdrop-blur-xl
            transition-all
            ${
                isDark
                ? "bg-black/70 border-emerald-400/20 shadow-[0_0_25px_#10b98122]"
                : "bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]"
            }`}>
        {children}
      </div>
    )
}

{`
          
          min-h-[95vh]
          rounded-2xl
          sm:rounded-3xl
          border
          flex
          flex-col
          items-center
          overflow-hidden
          p-3
          sm:p-6
          lg:p-10
          backdrop-blur-xl
          transition-all
`}
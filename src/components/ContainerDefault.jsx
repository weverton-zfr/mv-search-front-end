import { useTheme } from "../context/ThemeContext";

export default function ContainerDefault({children}){
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return(
        <section
        className={`
            min-h-[100dvh]
            flex
            justify-center
            items-center
            px-2
            sm:px-3
            py-3
            sm:py-4
            transition-colors
            duration-300
            ${
            isDark
                ? "bg-[radial-gradient(circle_at_top,#022c22,#000)] text-white"
                : "bg-[linear-gradient(135deg,#dbe4ee_0%,#c7d2da_100%)] text-slate-900"
            } `} >
        {children}
        </section>
    )
}
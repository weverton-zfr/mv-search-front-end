import { useState } from "react";

import Security from "./Security";
import Plans from "./Plans";
import Acount from "./Acount";
import Theme from "./Theme";

import { useTheme } from "../../context/ThemeContext";

const tabs = [
  "Conta",
  "Segurança",
  "Plano",
  "Tema"
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Conta");

  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <section
      className={`
        min-h-[100dvh]
        flex
        flex-col
        lg:flex-row
        transition-colors
        duration-300
        relative

        ${
          isDark
            ? "bg-[radial-gradient(circle_at_top,#022c22,#000)] text-white"
            : "bg-[linear-gradient(135deg,#dbe4ee_0%,#c7d2da_100%)] text-slate-900"
        }
      `}
    >
      <aside
        className={`
          w-full
          lg:w-72
          lg:min-h-[100dvh]
          backdrop-blur-xl
          border-b
          lg:border-b-0
          lg:border-r
          p-4
          sm:p-6
          transition-all

          ${
            isDark
              ? "bg-black/70 border-emerald-400/10"
              : "bg-white/70 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.05)]"
          }
        `}
      >
        <h2
          className={`
            text-2xl
            font-bold
            mb-6
            transition-colors
            pt-15

            ${isDark ? "text-emerald-400" : "text-emerald-950"}
          `}
        >
          Configurações
        </h2>

        <div
          className="
            flex
            flex-row
            lg:flex-col
            gap-2
            overflow-x-auto
            lg:overflow-visible
            pb-2
          "
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap
                  text-left
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  border
                  font-medium

                  ${
                    isActive
                      ? isDark
                        ? "bg-green-600/20 border-green-500/30 text-white shadow-[0_0_15px_#10b98122]"
                        : "bg-emerald-700/10 border-emerald-700/20 text-emerald-900 shadow-[0_0_15px_rgba(4,120,87,0.10)]"
                      : isDark
                        ? "border-transparent hover:bg-white/5 text-gray-300"
                        : "border-transparent hover:bg-white/70 text-slate-700"
                  }
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </aside>

      <main
        className="
          flex-1
          p-4
          sm:p-6
          md:p-8
          lg:p-10
          overflow-y-auto
        "
      >
        <div className="max-w-[1100px] mx-auto">
          {activeTab === "Conta" && <Acount />}
          {activeTab === "Segurança" && <Security />}
          {activeTab === "Plano" && <Plans />}
          {activeTab === "Tema" && <Theme />}
        </div>
      </main>
    </section>
  );
}
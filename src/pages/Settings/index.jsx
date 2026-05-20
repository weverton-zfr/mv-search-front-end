import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../lib/api";
import Security from "./Security"
import Plains from "./Plains"
import Acount from "./Acount"

const tabs = [
  "Conta",
  "Segurança",
  "Plano"
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Conta");

  return (
    <div className="flex h-screen bg-[radial-gradient(circle_at_top,#022c22,#000)] text-white">
      <div className="ml-[15vw] w-64 bg-black/70 backdrop-blur-xl border-r border-emerald-400/10 p-6">
        <h2 className="text-lg font-semibold mb-6 text-emerald-400">
          Configurações
        </h2>
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-green-600/20 text-white border border-green-500/30"
                  : "hover:bg-white/5 text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-10 overflow-y-auto">

        {activeTab === "Conta" && <Acount />}
        {activeTab === "Segurança" && <Security />}
        {activeTab === "Plano" && <Plains />}

      </div>
    </div>
  );
}





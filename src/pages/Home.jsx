import { searchItems } from "../data/searchItems";
import { useNavigate } from "react-router";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import HomeCard from "../components/HomeCard";
import ContainerDefault from "../components/ContainerDefault";
import SubContainer from "../components/SubContainer";

export default function Home() {
  const [search, setSearch] = useState("");
  const { subscription } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigation = useNavigate();

  const data = searchItems.filter(item =>
    item.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(
        search
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
  );

  return (
    <ContainerDefault>
      <SubContainer>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-5 sm:mb-8 text-center sm:text-left">
          <img
            src="/icon.png"
            alt="logo mv search"
            className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
          />

          <div>
            <h1
              className={`
                text-2xl
                sm:text-4xl
                lg:text-5xl
                font-black
                ${isDark ? "text-green-100" : "text-emerald-950"}
            `}>
              MV SEARCH
            </h1>

            <p className={`
                text-xs
                sm:text-base
                mt-1
                ${isDark ? "text-gray-400" : "text-slate-600"}
            `}>
              Escolha o tipo de consulta desejado.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[700px]">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Pesquisar tipo de consulta..."
            className={`
              w-full
              h-11
              sm:h-12
              rounded-xl
              sm:rounded-2xl
              border
              px-4
              sm:px-5
              text-sm
              sm:text-base
              outline-none
              transition-all
              ${
                isDark
                  ? "bg-black/40 border-green-900 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-green-700"
                  : "bg-white/80 border-slate-300/60 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
              }
            `}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-5 mt-6 sm:mt-10">
          {data.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-20">
              <h2 className={`
                  text-2xl
                  sm:text-3xl
                  font-bold
                  ${isDark ? "text-green-900" : "text-emerald-900"}
              `}>
                Nenhum resultado encontrado
              </h2>

              <p className={`mt-2 ${isDark ? "text-gray-600" : "text-slate-600"}`}>
                Tente pesquisar outro tipo de consulta.
              </p>
            </div>
          ) : (
            data.map((itens, i) => {
              const isFree = subscription?.plan === "Free";
              return (
              <HomeCard
                onClick={() =>
                  !isFree &&
                  navigation("/search", {
                    state: {
                      type: itens.type,
                      title: itens.title,
                      inpType: itens.inpType
                    }
                  })}
                itens={itens}
                isFree={isFree}
              />
              );
            })
          )}
        </div>
      </SubContainer>
    </ContainerDefault>
  );
} 
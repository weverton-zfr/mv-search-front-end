import { PiIdentificationBadgeLight } from "react-icons/pi";
import { BsFillTelephoneFill, BsHousesFill } from "react-icons/bs";
import { RiParentFill } from "react-icons/ri";
import { MdEmail, MdPerson } from "react-icons/md";
import { FaMapMarked, FaCar, FaBuilding } from "react-icons/fa";

import { useNavigate } from "react-router";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const navigation = useNavigate();

  const { subscription } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const [search, setSearch] = useState("");

  const itens = [
    {
      icon: <PiIdentificationBadgeLight className="size-10 sm:size-12" />,
      title: "CPF",
      info: "Localize dados vinculados a um CPF de forma rápida e segura.",
      type: "cpf",
      inpType: "number",
      plan: "basic_mensal"
    },
    {
      icon: <PiIdentificationBadgeLight className="size-10 sm:size-12" />,
      title: "Consulta por CNS",
      info: "Encontre informações associadas a um CNS de maneira eficiente e confiável.",
      type: "cns",
      inpType: "number"
    },
    {
      icon: <MdPerson className="size-10 sm:size-12" />,
      title: "Consulta por Nome",
      info: "Acesse dados relacionados a um nome completo de forma rápida e precisa.",
      type: "nome",
      inpType: "text"
    },
    {
      icon: <RiParentFill className="size-10 sm:size-12" />,
      title: "Nome da Mãe",
      info: "Consulte informações associadas ao nome da mãe.",
      type: "nome_mae",
      inpType: "text"
    },
    {
      icon: <RiParentFill className="size-10 sm:size-12" />,
      title: "Nome do Pai",
      info: "Localize informações associadas ao nome do pai.",
      type: "nome_pai",
      inpType: "text"
    },
    {
      icon: <MdEmail className="size-10 sm:size-12" />,
      title: "Consulta por Email",
      info: "Acesse informações vinculadas a um email.",
      type: "email",
      inpType: "email"
    },
    {
      icon: <FaMapMarked className="size-10 sm:size-12" />,
      title: "Consulta por CEP",
      info: "Descubra dados relacionados a um CEP.",
      type: "cep",
      inpType: "number"
    },
    {
      icon: <FaBuilding className="size-10 sm:size-12" />,
      title: "Consulta por CNPJ",
      info: "Acesse dados vinculados a um CNPJ.",
      type: "cnpj",
      inpType: "number"
    },
    {
      icon: <PiIdentificationBadgeLight className="size-10 sm:size-12" />,
      title: "Titulo de Eleitor",
      info: "Encontre informações associadas a um título de eleitor.",
      type: "titulo_eleitor",
      inpType: "number"
    },
    {
      icon: <BsFillTelephoneFill className="size-10 sm:size-12" />,
      title: "Consulta por Telefone",
      info: "Acesse informações vinculadas a um telefone.",
      type: "telefone",
      inpType: "number"
    },
    {
      icon: <BsHousesFill className="size-10 sm:size-12" />,
      title: "Consulta por Vizinhos",
      info: "Localize dados sobre vizinhos próximos.",
      type: "vizinho",
      inpType: "text"
    },
    {
      icon: <FaCar className="size-10 sm:size-12" />,
      title: "Consulta por Placa",
      info: "Acesse informações vinculadas a uma placa.",
      type: "placa",
      inpType: "text"
    }
  ];

  const data = itens.filter(item =>
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
    <section
      className={`
        min-h-[100dvh]
        flex
        justify-center
        items-center
        px-3
        py-4
        transition-colors
        duration-300

        ${
          isDark
            ? "bg-[radial-gradient(circle_at_top,#022c22,#000)] text-white"
            : "bg-[linear-gradient(135deg,#dbe4ee_0%,#c7d2da_100%)] text-slate-900"
        }
      `}
    >
      <div
        className={`
          w-full
          xl:w-[90%]
          min-h-[95vh]
          rounded-3xl
          border
          flex
          flex-col
          items-center
          overflow-hidden
          p-4
          sm:p-6
          lg:p-10
          backdrop-blur-xl
          transition-all

          ${
            isDark
              ? "bg-black/70 border-green-900/40 shadow-[0_0_25px_#10b98122]"
              : "bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]"
          }
        `}
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            gap-4
            mb-8
            text-center
            sm:text-left
          "
        >
          <img
            src="/icon.png"
            alt="logo mv search"
            className="
              w-16
              h-16
              sm:w-20
              sm:h-20
              object-contain
            "
          />

          <div>
            <h1
              className={`
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-black

                ${isDark ? "text-green-100" : "text-emerald-950"}
              `}
            >
              MV SEARCH
            </h1>

            <p
              className={`
                text-sm
                sm:text-base
                mt-1

                ${isDark ? "text-gray-400" : "text-slate-600"}
              `}
            >
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
              h-12
              rounded-2xl
              border
              px-5
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

        <div
          className="
            w-full
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
            mt-10
          "
        >
          {data.length === 0 ? (
            <div
              className="
                col-span-full
                flex
                flex-col
                items-center
                justify-center
                text-center
                py-20
              "
            >
              <h2
                className={`
                  text-2xl
                  sm:text-3xl
                  font-bold

                  ${isDark ? "text-green-900" : "text-emerald-900"}
                `}
              >
                Nenhum resultado encontrado
              </h2>

              <p
                className={`
                  mt-2

                  ${isDark ? "text-gray-600" : "text-slate-600"}
                `}
              >
                Tente pesquisar outro tipo de consulta.
              </p>
            </div>
          ) : (
            data.map((itens, i) => {
              const isFree = subscription?.plan === "free";

              return (
                <div
                  key={i}
                  onClick={() =>
                    !isFree &&
                    navigation("/search", {
                      state: {
                        type: itens.type,
                        title: itens.title,
                        inpType: itens.inpType
                      }
                    })
                  }
                  className={`
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    text-center
                    sm:text-left
                    gap-4
                    rounded-3xl
                    p-5
                    border
                    transition-all
                    duration-300

                    ${
                      isFree
                        ? isDark
                          ? "bg-gray-800/80 border-white/5 cursor-not-allowed opacity-70"
                          : "bg-slate-200/70 border-slate-300/50 cursor-not-allowed opacity-70"
                        : isDark
                          ? "bg-green-950/20 border-white/10 cursor-pointer hover:shadow-[0_0_15px_#14532d] hover:border-green-800/40 hover:-translate-y-1"
                          : "bg-white/65 border-slate-300/40 cursor-pointer shadow-[0_0_18px_rgba(15,23,42,0.04)] hover:border-emerald-700/40 hover:shadow-[0_0_25px_rgba(4,120,87,0.12)] hover:-translate-y-1"
                    }
                  `}
                >
                  <div
                    className={`
                      shrink-0

                      ${
                        isFree
                          ? isDark
                            ? "text-gray-500"
                            : "text-slate-500"
                          : isDark
                            ? "text-green-400"
                            : "text-emerald-800"
                      }
                    `}
                  >
                    {itens.icon}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2
                      className={`
                        text-xl
                        sm:text-2xl
                        font-bold

                        ${
                          isFree
                            ? isDark
                              ? "text-gray-500"
                              : "text-slate-500"
                            : isDark
                              ? "text-white"
                              : "text-emerald-950"
                        }
                      `}
                    >
                      {itens.title}
                    </h2>

                    <p
                      className={`
                        text-sm
                        sm:text-base
                        leading-relaxed

                        ${
                          isFree
                            ? isDark
                              ? "text-gray-500"
                              : "text-slate-500"
                            : isDark
                              ? "text-gray-400"
                              : "text-slate-700"
                        }
                      `}
                    >
                      {itens.info}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
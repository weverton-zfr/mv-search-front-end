import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { IMaskInput } from "react-imask";

import { useTheme } from "../context/ThemeContext";
import ContainerDefault from "../components/ContainerDefault";
import SearchResult from "../components/searchResult/SearchResult";

import { searchMasks } from "../data/searchMasks";
import { getFlatText } from "../utils/searchUtils";
import { copyToClipboard } from "../utils/copyToClipboard";
import { downloadSearchPDF } from "../utils/downloadSearchPDF";

export default function Search() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [vacinas, setVacinas] = useState(false);
  const [foto, setFoto] = useState(false);
  const [sus, setSus] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { type, title, inpType } = location.state || {};

  const numericModules = [
    "cpf",
    "phone",
    "cep",
    "cnpj",
    "cns",
    "title",
    "vizinhos",
    "veiculos",
    "proprietarios"
  ];

  const copyResults = () => {
    if (!result) return;

    copyToClipboard(getFlatText(result));
  };

  const downloadPDF = () => {
    if (!result) return;

    downloadSearchPDF({
      result,
      type
    });
  };

async function handleSearch() {
  if (!search.trim()) return;

  const minLengthByType = {
    cpf: 11,
    phone: 10,
    cep: 8,
    cnpj: 14,
    cns: 15,
    title: 12
  };

  const onlyNumbers = search.replace(/\D/g, "");
  const minLength = minLengthByType[type];

  if (minLength && onlyNumbers.length < minLength) {
    setResult(null);
    setError(`Digite todos os ${minLength} números para realizar esta consulta.`);
    return;
  }

  try {
    setLoading(true);
    setError("");
    setResult(null);

    const textModulesToUppercase = [
      "mother",
      "father"
    ];

    const consulta = numericModules.includes(type)
      ? onlyNumbers
      : textModulesToUppercase.includes(type)
        ? search.trim().toUpperCase()
        : search.trim();

    const params = {
      token: import.meta.env.VITE_API_TOKEN,
      modulo: type,
      consulta
    };

    if (type === "cpf") {
      params.vacinas = vacinas ? "on" : "off";
      params.foto = foto ? "on" : "off";
      params.sus = sus ? "on" : "off";
    }

    const { data } = await axios.get(import.meta.env.VITE_API_URL, {
      params,
      validateStatus: () => true
    });

    console.log(data);

    const emptyOwnerResult =
      Array.isArray(data?.veiculo) &&
      Array.isArray(data?.historico) &&
      data.veiculo.length === 0 &&
      data.historico.length === 0;

    const apiError =
      data?.status === 400 ||
      data?.status === 401 ||
      data?.status === 403 ||
      data?.status === 500 ||
      data?.code === 400 ||
      data?.code === 401 ||
      data?.code === 403 ||
      data?.statusMsg === "Forbidden" ||
      data?.message === "request validation failed";

    const notFound =
      !data ||
      data?.status === 404 ||
      data?.statusMsg === "Not found" ||
      data?.statusMsg === "Nenhum possuidor localizado." ||
      data?.reason === "Document not found." ||
      data?.total === 0 ||
      (Array.isArray(data?.msg) && data.msg.length === 0) ||
      (Array.isArray(data?.data) && data.data.length === 0) ||
      (Array.isArray(data?.vizinhos) && data.vizinhos.length === 0) ||
      emptyOwnerResult;

    if (apiError || notFound) {
      setResult(null);

      if (data?.status === 403 || data?.statusMsg === "Forbidden") {
        setError("Consulta inválida ou parâmetro ausente.");
        return;
      }

      if (
        data?.code === 400 ||
        data?.status === 400 ||
        data?.message === "request validation failed"
      ) {
        setError("Dados inválidos. Verifique a informação digitada.");
        return;
      }

      setError("Nenhum resultado encontrado para esta consulta.");
      return;
    }

    setResult(data);
  } catch (err) {
    console.error(err);

    setResult(null);
    setError("Erro ao consultar API.");
  } finally {
    setLoading(false);
  }
}
  if (!type) {
    return (
      <section className="min-h-[100dvh] flex items-center justify-center px-4 py-6 transition-colors">
        <div
          className={`
            w-full
            max-w-md
            rounded-3xl
            border
            p-6
            text-center
            backdrop-blur-xl
            ${
              isDark
                ? "bg-black/70 border-emerald-400/20"
                : "bg-white/80 border-slate-300/60"
            }
          `}
        >
          <h1
            className={`
              text-2xl
              font-bold
              ${isDark ? "text-emerald-300" : "text-emerald-800"}
            `}
          >
            Tipo de pesquisa inválido
          </h1>

          <p
            className={
              isDark
                ? "mt-3 text-gray-400"
                : "mt-3 text-slate-600"
            }
          >
            Volte para o início e selecione uma consulta.
          </p>

          <button
            onClick={() => navigate("/")}
            className="
              mt-6
              w-full
              px-6
              py-3
              rounded-2xl
              bg-emerald-700
              hover:bg-emerald-600
              text-white
              font-semibold
              transition
            "
          >
            Voltar ao início
          </button>
        </div>
      </section>
    );
  }

  return (
    <ContainerDefault>
      <div
        className={`
          w-full
          max-w-[1280px]
          rounded-3xl
          backdrop-blur-xl
          border
          p-4
          sm:p-6
          md:p-8
          lg:p-10
          transition-all
          ${
            isDark
              ? "bg-black/70 border-green-900/40 shadow-[0_0_25px_#10b98122]"
              : "bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]"
          }
        `}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <img
              src="/icon.png"
              alt="logo mv search"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />

            <div>
              <h1
                className={`
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-black
                  ${isDark ? "text-green-100" : "text-emerald-900"}
                `}
              >
                MV SEARCH
              </h1>

              <p
                className={
                  isDark
                    ? "text-sm text-gray-400"
                    : "text-sm text-slate-600"
                }
              >
                Consulta por {title}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className={`
              w-full
              sm:w-auto
              px-5
              py-2.5
              rounded-2xl
              border
              font-medium
              transition
              ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  : "bg-white/70 border-slate-300/60 text-slate-700 hover:bg-white"
              }
            `}
          >
            ← Voltar
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <label
                className={
                  isDark
                    ? "text-sm text-gray-400"
                    : "text-sm text-slate-600"
                }
              >
                Digite sua pesquisa
              </label>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  border
                  text-xs
                  font-semibold
                  uppercase
                  ${
                    isDark
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                      : "bg-emerald-700/10 text-emerald-800 border-emerald-700/20"
                  }
                `}
              >
                {type}
              </span>
            </div>

            {searchMasks[type] ? (
              <IMaskInput
                mask={searchMasks[type]}
                value={search}
                onAccept={(value) => setSearch(value)}
                placeholder={`Digite ${title}...`}
                className={`
                  w-full
                  p-3
                  sm:p-3.5
                  rounded-2xl
                  border
                  outline-none
                  transition
                  ${
                    isDark
                      ? "bg-black/70 text-white placeholder:text-gray-500 border-emerald-400/20 focus:ring-2 focus:ring-emerald-500"
                      : "bg-white/80 text-slate-900 placeholder:text-slate-400 border-slate-300/60 focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-700"
                  }
                `}
              />
            ) : (
              <input
                type={inpType || "text"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Digite ${title}...`}
                className={`
                  w-full
                  p-3
                  sm:p-3.5
                  rounded-2xl
                  border
                  outline-none
                  transition
                  ${
                    isDark
                      ? "bg-black/70 text-white placeholder:text-gray-500 border-emerald-400/20 focus:ring-2 focus:ring-emerald-500"
                      : "bg-white/80 text-slate-900 placeholder:text-slate-400 border-slate-300/60 focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-700"
                  }
                `}
              />
            )}

            {type === "cpf" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                {[
                  ["vacinas", vacinas, setVacinas],
                  ["foto", foto, setFoto],
                  ["sus", sus, setSus]
                ].map(([label, value, setter]) => (
                  <label
                    key={label}
                    className={`
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      font-medium
                      cursor-pointer
                      ${
                        isDark
                          ? "bg-black/40 border-white/10 text-gray-300"
                          : "bg-white/70 border-slate-300/60 text-slate-700"
                      }
                    `}
                  >
                    <span>{label.toUpperCase()}</span>

                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setter(e.target.checked)}
                      className="accent-emerald-700"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-2xl
              bg-emerald-700
              text-white
              font-semibold
              hover:bg-emerald-600
              hover:scale-[1.01]
              active:scale-[0.99]
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
              shadow-[0_0_20px_rgba(4,120,87,0.18)]
            "
          >
            {loading ? "Pesquisando..." : "Pesquisar"}
          </button>
        </form>

        {error && (
          <div
            className={`
              mt-8
              border
              rounded-2xl
              p-4
              text-center
              ${
                isDark
                  ? "border-red-500/20 bg-red-500/10 text-red-300"
                  : "border-red-300/60 bg-red-100/70 text-red-700"
              }
            `}
          >
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={copyResults}
              className={`
                flex-1
                py-3
                rounded-2xl
                border
                font-medium
                transition
                ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                    : "bg-white/70 border-slate-300/60 text-slate-700 hover:bg-white"
                }
              `}
            >
              Copiar Dados
            </button>

            <button
              onClick={downloadPDF}
              className="
                flex-1
                py-3
                rounded-2xl
                bg-emerald-700
                text-white
                font-semibold
                hover:bg-emerald-600
                transition
                active:scale-[0.98]
              "
            >
              Baixar PDF
            </button>
          </div>
        )}

        <SearchResult
          result={result}
          type={type}
          foto={foto}
          vacinas={vacinas}
          sus={sus}
        />
      </div>
    </ContainerDefault>
  );
}
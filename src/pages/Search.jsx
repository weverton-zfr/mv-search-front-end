import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IMaskInput } from "react-imask";

import { api } from "../lib/api";
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

  const [dataNascimento, setDataNascimento] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const [vacinas, setVacinas] = useState(false);
  const [foto, setFoto] = useState(false);
  const [sus, setSus] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { type, title, inpType } = location.state || {};

  const moduleType = String(type || "").toLowerCase().trim();

  const numericModules = [
    "cpf",
    "phone",
    "cep",
    "cnpj",
    "cns",
    "title",
    "vizinhos",
    "veiculos"
  ];

  const plateModules = ["proprietarios"];

  const shouldUseMask =
    searchMasks[moduleType] && !plateModules.includes(moduleType);

  const copyResults = () => {
    if (!result) return;
    copyToClipboard(getFlatText(result));
  };

  const downloadPDF = () => {
    if (!result) return;

    downloadSearchPDF({
      result,
      type: moduleType
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
      title: 12,
      vizinhos: 11,
      veiculos: 11,
      proprietarios: 7
    };

    const onlyNumbers = search.replace(/\D/g, "");
    const onlyPlate = search.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    const minLength = minLengthByType[moduleType];

    const isNumericModule = numericModules.includes(moduleType);
    const isPlateModule = plateModules.includes(moduleType);

    const currentLength = isPlateModule
      ? onlyPlate.length
      : isNumericModule
        ? onlyNumbers.length
        : search.trim().length;

    if (minLength && currentLength < minLength) {
      setResult(null);

      if (isPlateModule) {
        setError(`Digite uma placa válida com ${minLength} caracteres.`);
      } else {
        setError(`Digite todos os ${minLength} números para realizar esta consulta.`);
      }

      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const textModulesToUppercase = ["mother", "father"];

      const consulta = isNumericModule
        ? onlyNumbers
        : isPlateModule
          ? onlyPlate
          : textModulesToUppercase.includes(moduleType)
            ? search.trim().toUpperCase()
            : search.trim();

      const params = {
        modulo: moduleType,
        consulta
      };

      if (moduleType === "cpf") {
        params.vacinas = vacinas ? "on" : "off";
        params.foto = foto ? "on" : "off";
        params.sus = sus ? "on" : "off";
      }

      if (moduleType === "name") {
        if (dataNascimento) {
          params.dataNascimento = dataNascimento;
        }

        if (cidade.trim()) {
          params.cidade = cidade.trim().toUpperCase();
        }

        if (uf.trim()) {
          params.uf = uf.trim().toUpperCase();
        }
      }

      const { data } = await api.get("/search", {
        params,
        validateStatus: () => true
      });

      console.log("PARAMS ENVIADOS:", params);
      console.log("RESULTADO DA API:", data);

     const isEmptyArray = (value) => Array.isArray(value) && value.length === 0;

const hasClearError =
  !data ||
  data?.status === 404 ||
  data?.statusMsg === "Not found" ||
  data?.statusMsg === "Nenhum possuidor localizado." ||
  data?.statusMsg === "Nenhum veículo localizado." ||
  data?.statusMsg === "Nenhum veiculo localizado." ||
  data?.reason === "Document not found.";

const hasApiError =
  data?.status === 400 ||
  data?.status === 401 ||
  data?.status === 403 ||
  data?.status === 500 ||
  data?.code === 400 ||
  data?.code === 401 ||
  data?.code === 403 ||
  data?.success === false ||
  data?.statusMsg === "Forbidden" ||
  data?.message === "request validation failed";

const hasEmptyArrayResult =
  ["name", "mother", "father", "phone", "mail"].includes(moduleType) &&
  (
    data?.total === 0 ||
    isEmptyArray(data?.msg)
  );

const hasEmptyVehicleResult =
  moduleType === "veiculos" &&
  Array.isArray(data?.veiculos) &&
  data.veiculos.length === 0;

const hasEmptyOwnerResult =
  moduleType === "proprietarios" &&
  Array.isArray(data?.veiculo) &&
  Array.isArray(data?.historico) &&
  data.veiculo.length === 0 &&
  data.historico.length === 0;

const notFound =
  hasClearError ||
  hasEmptyArrayResult ||
  hasEmptyVehicleResult ||
  hasEmptyOwnerResult;

if (hasApiError || notFound) {
  setResult(null);

  if (data?.error) {
    setError(data.error);
    return;
  }

  if (data?.status === 403 || data?.statusMsg === "Forbidden") {
    setError("Consulta inválida, parâmetro ausente ou plano sem permissão.");
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

  if (!moduleType) {
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

          <p className={isDark ? "mt-3 text-gray-400" : "mt-3 text-slate-600"}>
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

              <p className={isDark ? "text-sm text-gray-400" : "text-sm text-slate-600"}>
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
              <label className={isDark ? "text-sm text-gray-400" : "text-sm text-slate-600"}>
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
                {moduleType}
              </span>
            </div>

            {shouldUseMask ? (
              <IMaskInput
                mask={searchMasks[moduleType]}
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
                type={plateModules.includes(moduleType) ? "text" : inpType || "text"}
                value={search}
                onChange={(e) => {
                  const value = plateModules.includes(moduleType)
                    ? e.target.value.toUpperCase()
                    : e.target.value;

                  setSearch(value);
                }}
                placeholder={`Digite ${title}...`}
                maxLength={plateModules.includes(moduleType) ? 7 : undefined}
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

            {moduleType === "name" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  className={`
                    w-full
                    p-3
                    rounded-2xl
                    border
                    outline-none
                    transition
                    ${
                      isDark
                        ? "bg-black/70 text-white border-emerald-400/20 focus:ring-2 focus:ring-emerald-500"
                        : "bg-white/80 text-slate-900 border-slate-300/60 focus:ring-2 focus:ring-emerald-600/40"
                    }
                  `}
                />

                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Cidade"
                  className={`
                    w-full
                    p-3
                    rounded-2xl
                    border
                    outline-none
                    transition
                    ${
                      isDark
                        ? "bg-black/70 text-white placeholder:text-gray-500 border-emerald-400/20 focus:ring-2 focus:ring-emerald-500"
                        : "bg-white/80 text-slate-900 placeholder:text-slate-400 border-slate-300/60 focus:ring-2 focus:ring-emerald-600/40"
                    }
                  `}
                />

                <input
                  type="text"
                  value={uf}
                  onChange={(e) => setUf(e.target.value.slice(0, 2).toUpperCase())}
                  placeholder="UF"
                  maxLength={2}
                  className={`
                    w-full
                    p-3
                    rounded-2xl
                    border
                    outline-none
                    uppercase
                    transition
                    ${
                      isDark
                        ? "bg-black/70 text-white placeholder:text-gray-500 border-emerald-400/20 focus:ring-2 focus:ring-emerald-500"
                        : "bg-white/80 text-slate-900 placeholder:text-slate-400 border-slate-300/60 focus:ring-2 focus:ring-emerald-600/40"
                    }
                  `}
                />
              </div>
            )}

            {moduleType === "cpf" && (
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
          type={moduleType}
          foto={foto}
          vacinas={vacinas}
          sus={sus}
        />
      </div>
    </ContainerDefault>
  );
}
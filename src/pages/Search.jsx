import { useState } from "react";
import response from "../data/data.json";
import { useLocation, useNavigate } from "react-router";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { IMaskInput } from "react-imask";

export default function Search() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const masks = {
    cpf: "000.000.000-00",
    telefone: "(00) 00000-0000",
    cep: "00000-000",
    cnpj: "00.000.000/0000-00",
    titulo_eleitor: "0000 0000 0000"
  }

  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const { type, title, inpType } = location.state || {};

  const normalize = (value) =>
    value
      ?.toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  async function handleSearch() {
    if (!search.trim()) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const found = response.results.find((item) =>
        normalize(item[type])?.includes(normalize(search))
      );

      if (!found) {
        setError("Nenhum resultado encontrado.");
        return;
      }

      const formatted = Object.entries(found).map(([key, value]) => ({
        label: key.replaceAll("_", " ").toUpperCase(),
        value
      }));

      setResult({ results: formatted });
    } catch (err) {
      setError("Erro ao pesquisar.");
    } finally {
      setLoading(false);
    }
  }

  function copyResults() {
    if (!result?.results) return;

    const text = result.results
      .map((item) => `${item.label}: ${item.value || "Não informado"}`)
      .join("\n");

    navigator.clipboard.writeText(text);

    toast.success("Dados copiados com sucesso!", {
      id: "copy_results_success"
    });
  }

  function downloadPDF() {
    if (!result?.results) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MV SEARCH", 20, 20);

    doc.setFontSize(12);

    let y = 40;

    result.results.forEach((item) => {
      const text = `${item.label}: ${item.value || "Não informado"}`;
      const lines = doc.splitTextToSize(text, 170);

      doc.text(lines, 20, y);

      y += lines.length * 8 + 4;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`resultado-${type}.pdf`);
  }

  if (!type) {
    return (
      <section
        className={`
          min-h-[100dvh]
          flex
          items-center
          justify-center
          px-4
          py-6
          transition-colors
        `}
      >
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
    <section
      className={`
        min-h-[100dvh]
        px-3
        py-6
        flex
        justify-center
        items-center
        transition-colors

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
          max-w-[1050px]
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
              ? "bg-black/60 border-emerald-400/20 shadow-[0_0_25px_#10b98122]"
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
                {type}
              </span>
            </div>

            <IMaskInput
              mask={masks[type]}
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

        {result?.results && (
          <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {result.results.map((item, index) => (
                <div
                  key={index}
                  className={`
                    rounded-2xl
                    p-4
                    break-words
                    border
                    transition

                    ${
                      isDark
                        ? "bg-white/[0.02] border-white/5"
                        : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
                    }
                  `}
                >
                  <p className={isDark ? "text-xs text-gray-500 uppercase mb-1 tracking-wider" : "text-xs text-slate-500 uppercase mb-1 tracking-wider"}>
                    {item.label}
                  </p>

                  <h2
                    className={`
                      text-base
                      sm:text-lg
                      font-semibold
                      break-all

                      ${isDark ? "text-green-100" : "text-emerald-900"}
                    `}
                  >
                    {item.value || (
                      <span className={isDark ? "text-gray-500 italic" : "text-slate-500 italic"}>
                        Não informado
                      </span>
                    )}
                  </h2>
                </div>
              ))}
            </div>

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
          </>
        )}
      </div>
    </section>
  );
}
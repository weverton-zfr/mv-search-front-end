import { useState } from "react";
import axios from "axios";
import response from "../data/data.json"
import { useLocation } from "react-router";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

export default function Search() {

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const {
    type,
    title,
    inpType
  } = location.state;

  async function handleSearch() {

  if (!search.trim()) return;

  try {

    setLoading(true);
    setError("");
    setResult(null);

    // FUTURA API
    // const response = await axios.get(
    //   `http://localhost:3000/search?query=${search}`
    // );

    // JSON LOCAL TEMPORÁRIO

    const found = response.results.find(item =>

    item[type]
    ?.toString()
    .toLowerCase()
    .includes(search.toLowerCase())

    );

    if (!found) {
      setError("Nenhum resultado encontrado.");
      return;
    }

    // transforma objeto em array dinâmico
    const formatted = Object.entries(found).map(([key, value]) => ({

      label: key
        .replaceAll("_", " ")
        .toUpperCase(),

      value

    }));

    setResult({
      results: formatted
    });

  } catch (err) {

    setError("Erro ao pesquisar.");

  } finally {

    setLoading(false);

  }
}

function copyResults() {

  if (!result?.results) return;

  const text = result.results
    .map(item => `${item.label}: ${item.value}`)
    .join('\n');

  navigator.clipboard.writeText(text);

  toast.success("Dados copiados com sucesso!", {
  id: "copy_results_success",
  style: {
    background: "#052e16",
    color: "#dcfce7",
    border: "1px solid #14532d"
  }
});

}

function downloadPDF() {

  if (!result?.results) return;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("MV SEARCH", 20, 20);

  doc.setFontSize(12);

  let y = 40;

  result.results.forEach(item => {

    doc.text(
      `${item.label}: ${item.value}`,
      20,
      y
    );

    y += 10;

  });

  doc.save("resultado-mv-search.pdf");

}
  return (
    <section
      className="
      min-h-[100dvh]
      px-3
      py-6
      bg-[radial-gradient(circle_at_top,#022c22,#000)]
      text-white
      flex
      justify-center
      items-center
    "
    >

      <div
        className="
        w-full
        max-w-[950px]
        bg-black/60
        backdrop-blur-xl
        border
        border-emerald-400/20
        rounded-2xl
        p-4
        sm:p-6
        md:p-8
        lg:p-10
        shadow-[0_0_25px_#10b98122]
      "
      >

        {/* HEADER */}
        <div
          className="
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          sm:justify-start
          gap-3
          mb-8
          text-center
          sm:text-left
        "
        >

          <img
            src="/icon.png"
            alt="logo mv search"
            className="
              w-14
              h-14
              sm:w-16
              sm:h-16
              object-contain
            "
          />

          <h1
            className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-black
            text-green-100
          "
          >
            MV SEARCH
          </h1>

        </div>

        {/* SEARCH */}
        <div className="flex flex-col gap-4">

          <div>

            <label className="text-sm text-gray-400">
              Digite sua pesquisa
            </label>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Digite ${title}...`}
              className="
                w-full
                mt-2
                p-3
                rounded-xl
                bg-black/70
                text-white
                border
                border-emerald-400/20
                focus:ring-2
                focus:ring-emerald-500
                outline-none
                transition
              "
            />

          </div>

          <button
            onClick={handleSearch}
            className="
              w-full
              py-3
              rounded-xl
              bg-green-600
              text-white
              font-semibold
              hover:scale-[1.01]
              hover:bg-green-500
              active:scale-[0.99]
              transition-all
            "
          >

            {
              loading
              ? "Pesquisando..."
              : "Pesquisar"
            }

          </button>

        </div>

        {/* ERROR */}
        {
          error &&
          <div
            className="
              mt-8
              border
              border-red-500/20
              bg-red-500/10
              rounded-xl
              p-4
              text-red-300
              text-center
            "
          >
            {error}
          </div>
        }

        {/* RESULT */}
       {
  result?.results &&
  <div
    className="
      mt-8
      border
      border-emerald-400/10
      bg-black/40
      rounded-2xl
      p-5
      grid
      grid-cols-1
      md:grid-cols-2
      gap-4
    "
  >

    {
      result.results.map((item, index) => (
        <div
          key={index}
          className="
            bg-white/[0.02]
            border
            border-white/5
            rounded-xl
            p-4
            break-words
          "
        >

          <p
            className="
              text-xs
              text-gray-500
              uppercase
              mb-1
              tracking-wider
            "
          >
            {item.label}
          </p>

          <h2
            className="
              text-base
              sm:text-lg
              font-semibold
              text-green-100
            "
          >
            {item.value || "Não informado"}
          </h2>

        </div>
      ))
    }

  </div>
}
{
  result?.results &&
  <div className="
    mt-8
    flex
    flex-col
    sm:flex-row
    gap-4
  ">

    <button
      onClick={copyResults}
      className="
        flex-1
        py-3
        rounded-xl
        bg-white/5
        border
        border-white/10
        hover:bg-white/10
        transition
      "
    >
      Copiar Dados
    </button>

    <button
      onClick={downloadPDF}
      className="
        flex-1
        py-3
        rounded-xl
        bg-green-700
        hover:bg-green-600
        transition
      "
    >
      Baixar PDF
    </button>

  </div>
}

      </div>

    </section>
  );
}
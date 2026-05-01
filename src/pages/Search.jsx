import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const [type, setType] = useState(state);
  const [url, setUrl] = useState(type[0].toLowerCase())
  

  async function handleSearch() {
    if (!query) return;
      navigate("/results", { state: url });
  }

  return (
    <section className="h-screen p-10 bg-[radial-gradient(circle_at_top,#022c22,#000)] text-white flex justify-center items-center">
      {/* Card */}
    <div className="max-w-2xl bg-black/60 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-10 shadow-[0_0_25px_#10b98122]">
        <h1 className="text-2xl mb-6 text-white font-bold text-center">
            PESQUISAR POR {type[0] || "DADOS"}
        </h1>
        {/* Input */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Digite o valor</label>

          <input
            value={query}
            onChange={(e) => setUrl(...e.target.value)}
            type={type[1]}
            placeholder="Digite aqui..."
            className="w-full mt-2 p-3 rounded-xl bg-black text-white border border-emerald-400/20 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Botão */}
        <button
          onClick={handleSearch}
          className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:scale-[1.01] transition-all"
        >
          Pesquisar
        </button>

      </div>
    </section>
  );
}
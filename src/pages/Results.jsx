import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Results() {
  const { state } = useLocation();
  const [url, setUrl] = useState(state);
  const [data, setData] = useState();

  if (!data || data.length === 0) {
    return (
      <div className="ml-[10vw] w-full flex flex-col items-center gap-4 h-screen justify-center">
        <h1 className="font-black text-3xl">Nenhum resultado encontrado.</h1>
        <button
          onClick={() => window.history.back()}
          className="ml-4 px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
        >
          Voltar
          </button>
      </div>
    );
  }

  const columns = [
    { 
    nome: "Nome",
    cpf: "CPF",
    telefone: "Telefone",}
  ];

  console.log(data)

  return (
    <div className="ml-[15vw] overflow-x-auto">
      <table className="w-full border-collapse rounded-xl overflow-hidden">

        {/* HEADER */}
        <thead>
          <tr className="bg-emerald-500/10 text-emerald-400 text-left">
            {columns.map(col => (
              <th key={col} className="p-3 text-sm font-semibold uppercase">
                {col.name || col.cpf || col.telefone || col.nome}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {/* {data.map((row, i) => (
            <tr key={i} className=" border-b border-white/5 hover:bg-emerald-500/5 transition-all">
              {columns.map((col) => (
                <td key={col} className="p-3 text-sm text-gray-300">
                  {row[col] || "-"}
                </td>
              ))}
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
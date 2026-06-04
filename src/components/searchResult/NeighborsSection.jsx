import SearchSection from "../SearchSection";
import { formatCpf, formatDate, valueOrDefault } from "../../hooks/useFormat";
import { useTheme } from "../../context/ThemeContext";

export default function NeighborsSection({ result }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const neighbors = result?.vizinhos || [];

  if (!neighbors?.length) return null;

  const tdClass = `
    px-3
    py-3
    text-sm
    first:rounded-l-2xl
    last:rounded-r-2xl
    ${isDark ? "bg-black/25 text-gray-200" : "bg-white/70 text-slate-700"}
  `;

  return (
    <SearchSection icon="🏘" title="Vizinhos" count={neighbors.length}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr>
              {["Nome", "CPF", "Nascimento", "Idade", "Sexo", "Mãe"].map((column) => (
                <th
                  key={column}
                  className={`px-3 py-2 text-xs uppercase tracking-wider ${
                    isDark ? "text-gray-500" : "text-slate-500"
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {neighbors.map((neighbor, index) => (
              <tr key={index}>
                <td className={tdClass}>{valueOrDefault(neighbor.nome)}</td>
                <td className={tdClass}>{formatCpf(neighbor.cpf)}</td>
                <td className={tdClass}>{formatDate(neighbor.dataNascimento)}</td>
                <td className={tdClass}>
                  {neighbor.idade ? `${neighbor.idade} anos` : "Não informado"}
                </td>
                <td className={tdClass}>{valueOrDefault(neighbor.sexo)}</td>
                <td className={tdClass}>{valueOrDefault(neighbor.nomeMae)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SearchSection>
  );
}
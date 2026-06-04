import SearchSection from "../SearchSection";
import { formatDate, valueOrDefault } from "../../hooks/useFormat";
import { useTheme } from "../../context/ThemeContext";

export default function VaccineSection({ result }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const vaccines = result?.imunoBiologicos || [];

  if (!vaccines?.length) return null;

  const tdClass = `
    px-3
    py-3
    text-sm
    first:rounded-l-2xl
    last:rounded-r-2xl
    ${isDark ? "bg-black/25 text-gray-200" : "bg-white/70 text-slate-700"}
  `;

  return (
    <SearchSection icon="💉" title="Histórico Vacinal" count={vaccines.length}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr>
              {["Vacina", "Dose", "Data", "Fabricante", "Lote", "Status"].map((column) => (
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
            {vaccines.map((vaccine, index) => (
              <tr key={index}>
                <td className={tdClass}>{valueOrDefault(vaccine.VacinaNome)}</td>
                <td className={tdClass}>{valueOrDefault(vaccine.VacinaDescricaoDose)}</td>
                <td className={tdClass}>{formatDate(vaccine.VacinaDataAplicacao)}</td>
                <td className={tdClass}>{valueOrDefault(vaccine.VacinaFabricanteNome)}</td>
                <td className={tdClass}>{valueOrDefault(vaccine.VacinaLote)}</td>
                <td className={tdClass}>{valueOrDefault(vaccine.Status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SearchSection>
  );
}
import SearchSection from "../SearchSection";
import { formatPhone, valueOrDefault } from "../../hooks/useFormat";
import { useTheme } from "../../context/ThemeContext";

export default function PhonesSection({ result }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const phones = normalizePhones(result);

  if (!phones.length) return null;

  const tdClass = `
    px-3
    py-3
    text-sm
    first:rounded-l-2xl
    last:rounded-r-2xl
    ${isDark ? "bg-black/25 text-gray-200" : "bg-white/70 text-slate-700"}
  `;

  return (
    <SearchSection icon="📞" title="Telefones" count={phones.length}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr>
              {["Telefone", "Tipo", "Operadora", "Status", "WhatsApp"].map((column) => (
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
            {phones.map((phone, index) => (
              <tr key={index}>
                <td className={tdClass}>{formatPhone(phone.telefone)}</td>
                <td className={tdClass}>{valueOrDefault(phone.tipo)}</td>
                <td className={tdClass}>{valueOrDefault(phone.operadora)}</td>
                <td className={tdClass}>{valueOrDefault(phone.status)}</td>
                <td className={tdClass}>{valueOrDefault(phone.whatsapp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SearchSection>
  );
}

function normalizePhones(result) {
  if (!Array.isArray(result?.telefones)) return [];

  return result.telefones.map((phone) => {
    if (typeof phone === "string") {
      return { telefone: phone };
    }

    return {
      telefone: phone?.telefone || `${phone?.area || ""}${phone?.number || ""}`,
      tipo: phone?.type || phone?.tipo,
      operadora: phone?.operadora,
      status: phone?.status,
      whatsapp: phone?.whatsapp
    };
  });
}
import SearchSection from "../SearchSection";
import { valueOrDefault } from "../../hooks/useFormat";
import { useTheme } from "../../context/ThemeContext";

export default function EmailsSection({ result }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const emails = normalizeEmails(result);

  if (!emails.length) return null;

  const tdClass = `
    px-3
    py-3
    text-sm
    first:rounded-l-2xl
    last:rounded-r-2xl
    ${isDark ? "bg-black/25 text-gray-200" : "bg-white/70 text-slate-700"}
  `;

  return (
    <SearchSection icon="📧" title="E-mails" count={emails.length}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr>
              {["E-mail", "Prioridade", "Qualidade", "Pessoal", "Blacklist"].map((column) => (
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
            {emails.map((email, index) => (
              <tr key={index}>
                <td className={tdClass}>{valueOrDefault(email.email)}</td>
                <td className={tdClass}>{valueOrDefault(email.prioridade)}</td>
                <td className={tdClass}>{valueOrDefault(email.qualidade)}</td>
                <td className={tdClass}>{valueOrDefault(email.emailPessoal)}</td>
                <td className={tdClass}>{valueOrDefault(email.blacklist)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SearchSection>
  );
}

function normalizeEmails(result) {
  if (!Array.isArray(result?.emails)) return [];

  return result.emails.map((email) => {
    if (typeof email === "string") {
      return { email };
    }

    return {
      email: email?.email || email?.address,
      prioridade: email?.prioridade,
      qualidade: email?.qualidade,
      emailPessoal: email?.emailPessoal || email?.ownership,
      blacklist: email?.blacklist
    };
  });
}
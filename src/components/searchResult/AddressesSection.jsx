import SearchSection from "../SearchSection";
import { formatCep, valueOrDefault } from "../../hooks/useFormat";
import { useTheme } from "../../context/ThemeContext";

export default function AddressesSection({ result }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const addresses = normalizeAddresses(result);

  if (!addresses.length) return null;

  return (
    <SearchSection icon="🏠" title="Endereços" count={addresses.length}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {addresses.map((address, index) => {
          const street = address?.logradouro || address?.street;
          const number = address?.logradouroNumero || address?.numero || address?.number;
          const neighborhood = address?.bairro || address?.district;
          const city = address?.cidade || address?.municipio || address?.city;
          const uf = address?.uf || address?.state;
          const cep = address?.cep || address?.zip;

          return (
            <div
              key={index}
              className={`
                rounded-2xl
                border
                p-4
                ${
                  isDark
                    ? "bg-black/25 border-white/5"
                    : "bg-white/70 border-slate-300/40"
                }
              `}
            >
              <h3 className={`font-bold ${isDark ? "text-green-100" : "text-emerald-950"}`}>
                {valueOrDefault(street)}
                {number ? `, ${number}` : ""}
              </h3>

              <p className={isDark ? "mt-2 text-sm text-gray-400" : "mt-2 text-sm text-slate-600"}>
                {address?.complemento || address?.details
                  ? `${address?.complemento || address?.details} • `
                  : ""}
                {valueOrDefault(neighborhood)}
              </p>

              <p className={isDark ? "mt-1 text-sm text-gray-400" : "mt-1 text-sm text-slate-600"}>
                {valueOrDefault(city)}/{valueOrDefault(uf)}
              </p>

              <span
                className={`
                  inline-block
                  mt-3
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${
                    isDark
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-emerald-700/10 text-emerald-800"
                  }
                `}
              >
                CEP {formatCep(cep)}
              </span>
            </div>
          );
        })}
      </div>
    </SearchSection>
  );
}

function normalizeAddresses(result) {
  if (Array.isArray(result?.enderecos)) return result.enderecos;
  if (Array.isArray(result?.addresses)) return result.addresses;

  if (result?.endereco && !Array.isArray(result.endereco)) {
    return [result.endereco];
  }

  if (result?.address) return [result.address];

  return [];
}
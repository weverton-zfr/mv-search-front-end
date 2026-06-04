import SearchSection from "../SearchSection";
import SearchCard from "../SearchCard";
import { formatLabel } from "../../hooks/useFormat";
import { useTheme } from "../../context/ThemeContext";

export default function ConsumptionSection({ result }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const consumption = result?.perfilConsumo || {};
  const consumptionEntries = Object.entries(consumption);

  const booleanConsumption = consumptionEntries.filter(
    ([, value]) => typeof value === "boolean"
  );

  const probabilityConsumption = consumptionEntries.filter(
    ([, value]) => typeof value === "string" && value.includes("%")
  );

  if (!booleanConsumption.length && !probabilityConsumption.length) {
    return null;
  }

  return (
    <SearchSection icon="🛒" title="Perfil de Consumo">
      {booleanConsumption.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {booleanConsumption.map(([key, value]) => (
            <BooleanBadge
              key={key}
              label={formatLabel(key)}
              value={value}
              isDark={isDark}
            />
          ))}
        </div>
      )}

      {probabilityConsumption.length > 0 && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {probabilityConsumption.map(([key, value]) => (
            <SearchCard
              key={key}
              label={formatLabel(key)}
              value={value}
            />
          ))}
        </div>
      )}
    </SearchSection>
  );
}

function BooleanBadge({ label, value, isDark }) {
  return (
    <div
      className={`
        rounded-2xl
        border
        px-3
        py-2
        text-sm
        font-medium
        flex
        items-center
        justify-between
        gap-3
        ${
          isDark
            ? "bg-black/25 border-white/5 text-gray-200"
            : "bg-white/70 border-slate-300/40 text-slate-700"
        }
      `}
    >
      <span>{label}</span>

      <span
        className={
          value
            ? "text-emerald-500 font-black"
            : isDark
              ? "text-red-300 font-black"
              : "text-red-600 font-black"
        }
      >
        {value ? "Sim" : "Não"}
      </span>
    </div>
  );
}
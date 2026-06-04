import SearchSection from "../SearchSection";
import SearchCard from "../SearchCard";

export default function EconomicDataSection({ result }) {
  const economic = result?.DadosEconomicos;

  if (!economic) return null;

  return (
    <SearchSection icon="💰" title="Dados Econômicos">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <SearchCard
          label="Renda"
          value={economic?.renda ? `R$ ${economic.renda}` : null}
        />

        <SearchCard
          label="Poder Aquisitivo"
          value={economic?.poderAquisitivo?.poderAquisitivoDescricao}
        />

        <SearchCard
          label="Faixa de Renda"
          value={economic?.poderAquisitivo?.faixaPoderAquisitivo}
        />

        <SearchCard
          label="Score CSB"
          value={economic?.score?.scoreCSB}
        />

        <SearchCard
          label="Risco CSB"
          value={economic?.score?.scoreCSBFaixaRisco}
        />

        <SearchCard
          label="Score CSBA"
          value={economic?.score?.scoreCSBA}
        />

        <SearchCard
          label="Risco CSBA"
          value={economic?.score?.scoreCSBAFaixaRisco}
        />
      </div>
    </SearchSection>
  );
}
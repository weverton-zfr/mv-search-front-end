import SearchSection from "../SearchSection";
import SearchCard from "../SearchCard";

export default function SusSection({ result, basic }) {
  const documentsCns = result?.listaDocumentos?.CNS;

  if (!basic?.cns && !documentsCns?.length) return null;

  return (
    <SearchSection icon="🏥" title="Dados SUS">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <SearchCard label="CNS" value={basic?.cns} />
        <SearchCard
          label="Documentos CNS"
          value={documentsCns?.length || 0}
        />
      </div>
    </SearchSection>
  );
}
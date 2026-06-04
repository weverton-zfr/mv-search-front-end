import BasicDataSection from "./BasicDataSection";
import EconomicDataSection from "./EconomicDataSection";
import PhonesSection from "./PhonesSection";
import EmailsSection from "./EmailsSection";
import AddressesSection from "./AddressesSection";
import NeighborsSection from "./NeighborsSection";
import VaccineSection from "./VaccineSection";
import SusSection from "./SusSection";
import ConsumptionSection from "./ConsumptionSection";
import CompanySection from "./CompanySection";

export default function SearchResult({
  result,
  type,
  foto = false,
  vacinas = false,
  sus = false
}) {
  if (!result) return null;

  if (type === "cnpj" || result?.company) {
    return (
      <div className="mt-8">
        <CompanySection result={result} />
      </div>
    );
  }

  const people = normalizePeople(result, type);
  const isMultiplePeople = people.length > 1;

  return (
    <div className="mt-8 space-y-5">
      {isMultiplePeople && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
          Foram encontrados {people.length} resultados.
        </div>
      )}

      {people.map((person, index) => {
        const basic = person?.DadosBasicos || person;

        return (
          <div key={basic?.cpf || basic?.cpf_cnpj || index} className="space-y-5">
            <BasicDataSection
              result={person}
              basic={basic}
              foto={foto}
              title={isMultiplePeople ? `Resultado ${index + 1}` : undefined}
            />

            <EconomicDataSection result={person} />
            <PhonesSection result={person} />
            <EmailsSection result={person} />
            <AddressesSection result={person} />

            {type !== "vizinhos" && <NeighborsSection result={person} />}

            {vacinas && <VaccineSection result={person} />}
            {sus && <SusSection result={person} basic={basic} />}

            <ConsumptionSection result={person} />
          </div>
        );
      })}
    </div>
  );
}

function normalizePeople(result, type) {
  if (Array.isArray(result?.data)) return result.data;

  if (Array.isArray(result?.msg)) return result.msg;

  if (type === "vizinhos" && Array.isArray(result?.vizinhos)) {
    return result.vizinhos;
  }

  return [result];
}
import SearchSection from "../SearchSection";
import SearchCard from "../SearchCard";
import AddressesSection from "./AddressesSection";
import PhonesSection from "./PhonesSection";
import EmailsSection from "./EmailsSection";
import { formatCnpj, formatDate } from "../../hooks/useFormat";

export default function CompanySection({ result }) {
  if (!result) return null;

  const company = result?.company;

  return (
    <div className="space-y-5">
      <SearchSection icon="🏢" title="Dados da Empresa">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          <SearchCard label="Razão Social" value={company?.name} />
          <SearchCard label="Nome Fantasia" value={result?.alias} />
          <SearchCard label="CNPJ" value={formatCnpj(result?.taxId)} />
          <SearchCard label="Fundação" value={formatDate(result?.founded)} />
          <SearchCard label="Status" value={result?.status?.text} />
          <SearchCard label="Natureza" value={company?.nature?.text} />
          <SearchCard label="Porte" value={company?.size?.text} />
          <SearchCard label="Capital Social" value={company?.equity ? `R$ ${company.equity}` : null} />
          <SearchCard label="Atividade Principal" value={result?.mainActivity?.text} />
        </div>
      </SearchSection>

      <AddressesSection result={result} />
      <PhonesSection result={result} />
      <EmailsSection result={result} />
    </div>
  );
}
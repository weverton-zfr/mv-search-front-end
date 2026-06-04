import SearchSection from "../SearchSection";
import SearchCard from "../SearchCard";
import { formatCpf, formatDate, valueOrDefault } from "../../hooks/useFormat";
import { getAge } from "../../utils/searchUtils";
import { useTheme } from "../../context/ThemeContext";

export default function BasicDataSection({
  result,
  basic,
  foto = false,
  title
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!basic) return null;

  const cpf = basic?.cpf || basic?.cpf_cnpj;
  const age = basic?.idade || getAge(basic?.dataNascimento);

  const hasPhoto = foto && result?.foto?.foto;
  const hasSignature = foto && result?.foto?.assinatura;

  return (
    <SearchSection
      icon="👤"
      title={title || (hasPhoto ? "Perfil encontrado" : "Dados Básicos")}
    >
      <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
        {hasPhoto && (
          <div
            className={`
              shrink-0
              rounded-3xl
              border
              p-2
              ${
                isDark
                  ? "bg-black/40 border-emerald-400/20"
                  : "bg-white/80 border-slate-300/60"
              }
            `}
          >
            <img
              src={`data:image/jpeg;base64,${result.foto.foto}`}
              alt="Foto encontrada"
              className="w-40 h-52 sm:w-48 sm:h-60 rounded-2xl object-cover"
            />
          </div>
        )}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          <SearchCard label="Nome" value={basic?.nome?.trim?.() || basic?.nome} />
          <SearchCard label="CPF/CNPJ" value={formatCpf(cpf)} />
          <SearchCard label="CNS" value={basic?.cns} />
          <SearchCard label="Nascimento" value={formatDate(basic?.dataNascimento)} />
          <SearchCard label="Idade" value={age ? `${age} anos` : null} />
          <SearchCard label="Sexo" value={basic?.sexo} />
          <SearchCard label="Renda" value={basic?.renda ? `R$ ${basic.renda}` : null} />
          <SearchCard label="Nome da Mãe" value={basic?.nomeMae || result?.nome_mae} />
          <SearchCard label="Nome do Pai" value={basic?.nomePai || result?.nome_pai} />
          <SearchCard
            label="Situação Cadastral"
            value={
              basic?.situacaoCadastral?.descricaoSituacaoCadastral ||
              valueOrDefault(basic?.situacaoCadastral)
            }
          />
        </div>
      </div>

      {hasSignature && (
        <div className="mt-5">
          <p className={isDark ? "text-sm text-gray-400 mb-2" : "text-sm text-slate-600 mb-2"}>
            Assinatura
          </p>

          <div
            className={`
              rounded-2xl
              border
              p-4
              w-fit
              ${
                isDark
                  ? "bg-white border-white/10"
                  : "bg-white border-slate-300/60"
              }
            `}
          >
            <img
              src={`data:image/jpeg;base64,${result.foto.assinatura}`}
              alt="Assinatura encontrada"
              className="max-w-[280px] max-h-28 object-contain"
            />
          </div>
        </div>
      )}
    </SearchSection>
  );
}
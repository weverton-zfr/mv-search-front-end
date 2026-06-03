import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { IMaskInput } from "react-imask";
import ContainerDefault from "../components/ContainerDefault";

export default function Search() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [vacinas, setVacinas] = useState(false);
  const [foto, setFoto] = useState(false);
  const [sus, setSus] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { type, title, inpType } = location.state || {};

  const masks = {
    cpf: "000.000.000-00",
    phone: "(00) 00000-0000",
    cep: "00000-000",
    cnpj: "00.000.000/0000-00",
    title: "0000 0000 0000",
    cns: "000000000000000"
  };

  const isEmpty = (value) => {
    if (value === null || value === undefined || value === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return true;
    return false;
  };

  const valueOrDefault = (value) => {
    if (isEmpty(value)) return "Não informado";
    if (typeof value === "boolean") return value ? "Sim" : "Não";
    return value;
  };

  const formatLabel = (value) =>
    value
      ?.toString()
      .replaceAll("_", " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/__/g, "")
      .trim()
      .toUpperCase();

  const formatCpf = (value) => {
    const cpf = value?.toString().replace(/\D/g, "");
    if (!cpf || cpf.length !== 11) return valueOrDefault(value);
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatCnpj = (value) => {
    const cnpj = value?.toString().replace(/\D/g, "");
    if (!cnpj || cnpj.length !== 14) return valueOrDefault(value);
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  const formatCep = (value) => {
    const cep = value?.toString().replace(/\D/g, "");
    if (!cep || cep.length !== 8) return valueOrDefault(value);
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const formatPhone = (value) => {
    const phone = value?.toString().replace(/\D/g, "");
    if (!phone) return valueOrDefault(value);

    if (phone.length === 11) return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    if (phone.length === 10) return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

    return value;
  };

  const formatDate = (value) => {
    if (!value) return "Não informado";

    const text = value.toString();

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) return text;

    const date = new Date(text);

    if (Number.isNaN(date.getTime())) return text;

    return date.toLocaleDateString("pt-BR");
  };

  const getAge = (date) => {
    if (!date) return null;

    let birth;

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      const [day, month, year] = date.split("/");
      birth = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      birth = new Date(date);
    }

    if (Number.isNaN(birth.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age -= 1;
    }

    return age;
  };

  async function handleSearch() {
    if (!search.trim()) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const numericModules = [
        "cpf",
        "phone",
        "cep",
        "cnpj",
        "cns",
        "title",
        "vizinhos",
        "veiculos",
        "proprietarios"
      ];

      const consulta = numericModules.includes(type)
        ? search.replace(/\D/g, "")
        : search.trim();

      const params = {
        token: import.meta.env.VITE_API_TOKEN,
        modulo: type,
        consulta
      };

      if (type === "cpf") {
        params.vacinas = vacinas ? "on" : "off";
        params.foto = foto ? "on" : "off";
        params.sus = sus ? "on" : "off";
      }

      const { data } = await axios.get(
        import.meta.env.VITE_API_URL,
        {
          params,
          validateStatus: () => true
        }
      );

      console.log(data);

      if (
        !data ||
        data?.status === 404 ||
        data?.statusMsg === "Not found" ||
        data?.reason === "Document not found."
      ) {
        setResult(null);
        setError("Nenhum resultado encontrado para esta consulta.");
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);

      setResult(null);
      setError("Erro ao consultar API.");
    } finally {
      setLoading(false);
    }
  }

  function getFlatText(data) {
    return JSON.stringify(data, null, 2);
  }

  async function copyResults() {
  if (!result) return;

  const text = getFlatText(result);

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");

      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "-9999px";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const copied = document.execCommand("copy");

      document.body.removeChild(textarea);

      if (!copied) {
        throw new Error("Falha ao copiar");
      }
    }

    toast.success("Dados copiados com sucesso!", {
      id: "copy_results_success"
    });
  } catch (error) {
    console.error(error);

    toast.error("Não foi possível copiar no celular.", {
      id: "copy_results_error"
    });
  }
  }

  function getFlatText(data, prefix = "") {
  let text = "";

  Object.entries(data).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();

    const isImage =
      lowerKey.includes("foto") ||
      lowerKey.includes("imagem") ||
      lowerKey.includes("image") ||
      lowerKey.includes("base64") ||
      (typeof value === "string" &&
        (value.startsWith("data:image") ||
         value.length > 1000));

    if (isImage) {
      return;
    }

    if (Array.isArray(value)) {
      text += `\n${prefix}${key}:\n`;

      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          text += `${prefix}${index + 1}.\n`;
          text += getFlatText(item, `${prefix}  `);
        } else {
          text += `${prefix}${index + 1}. ${item}\n`;
        }
      });

      return;
    }

    if (typeof value === "object" && value !== null) {
      text += `\n${prefix}${key}:\n`;
      text += getFlatText(value, `${prefix}  `);
      return;
    }

    text += `${prefix}${key}: ${value}\n`;
  });

  return text;
  }

  function formatPDFData(data, prefix = "") {
  let output = [];

  Object.entries(data).forEach(([key, value]) => {
    const label = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const lowerKey = key.toLowerCase();

    const isImage =
      lowerKey.includes("foto") ||
      lowerKey.includes("image") ||
      lowerKey.includes("imagem") ||
      lowerKey.includes("base64") ||
      (typeof value === "string" && value.startsWith("data:image"));

    if (isImage) {
      return;
    }

    if (value === null || value === undefined || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      output.push(`\n${prefix}${label}:`);

      value.forEach((item, index) => {
        output.push(`${prefix}  ${index + 1}.`);

        if (typeof item === "object" && item !== null) {
          output.push(...formatPDFData(item, `${prefix}    `));
        } else {
          output.push(`${prefix}    ${item}`);
        }
      });

      return;
    }

    if (typeof value === "object") {
      output.push(`\n${prefix}${label}:`);
      output.push(...formatPDFData(value, `${prefix}  `));
      return;
    }

    output.push(`${prefix}${label}: ${value}`);
  });

  return output;
  }

  function downloadPDF() {
    if (!result) return;

    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const marginX = 15;
    const maxWidth = pageWidth - marginX * 2;

    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("MV SEARCH", marginX, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Resultado da consulta: ${type.toUpperCase()}`, marginX, y);

    y += 10;

    doc.setDrawColor(16, 185, 129);
    doc.line(marginX, y, pageWidth - marginX, y);

    y += 10;

    const lines = formatPDFData(result);

    lines.forEach((line) => {
      const isTitle = line.trim().endsWith(":") && !line.includes(": ");

      if (isTitle) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        y += 3;
      } else {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
      }

      const wrappedLines = doc.splitTextToSize(line, maxWidth);

      wrappedLines.forEach((wrappedLine) => {
        if (y > pageHeight - 15) {
          doc.addPage();
          y = 20;
        }

        doc.text(wrappedLine, marginX, y);
        y += isTitle ? 7 : 5.5;
      });
    });

    doc.save(`resultado-${type}.pdf`);
  }

  const Section = ({ icon, title, count, children }) => (
    <div
      className={`
        rounded-3xl
        border
        p-4
        sm:p-5
        transition
        ${
          isDark
            ? "bg-white/[0.025] border-white/10"
            : "bg-white/70 border-slate-300/50 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
        }
      `}
    >
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className={`text-lg sm:text-xl font-black ${isDark ? "text-green-100" : "text-emerald-900"}`}>
          <span className="mr-2">{icon}</span>
          {title}
        </h2>

        {count !== undefined && (
          <span
            className={`
              w-fit
              px-3
              py-1
              rounded-full
              border
              text-xs
              font-semibold
              ${
                isDark
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                  : "bg-emerald-700/10 text-emerald-800 border-emerald-700/20"
              }
            `}
          >
            {count} registro{count === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {children}
    </div>
  );

  const InfoCard = ({ label, value }) => (
    <div
      className={`
        rounded-2xl
        p-4
        border
        break-words
        ${
          isDark
            ? "bg-black/25 border-white/5"
            : "bg-white/65 border-slate-300/40"
        }
      `}
    >
      <p className={`text-[11px] uppercase tracking-wider mb-1 ${isDark ? "text-gray-500" : "text-slate-500"}`}>
        {label}
      </p>

      <h3 className={`text-sm sm:text-base font-semibold break-words ${isDark ? "text-green-100" : "text-emerald-950"}`}>
        {valueOrDefault(value)}
      </h3>
    </div>
  );

  const EmptyMessage = () => (
    <p className={isDark ? "text-sm text-gray-500" : "text-sm text-slate-500"}>
      Nenhuma informação encontrada.
    </p>
  );

  const Td = ({ children }) => (
    <td
      className={`
        px-3
        py-3
        text-sm
        first:rounded-l-2xl
        last:rounded-r-2xl
        ${
          isDark
            ? "bg-black/25 text-gray-200"
            : "bg-white/70 text-slate-700"
        }
      `}
    >
      {children}
    </td>
  );

  const Table = ({ columns, data, renderRow }) => {
    if (!data?.length) return <EmptyMessage />;

    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className={`px-3 py-2 text-xs uppercase tracking-wider ${isDark ? "text-gray-500" : "text-slate-500"}`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{data.map(renderRow)}</tbody>
        </table>
      </div>
    );
  };

  const BooleanBadge = ({ label, value }) => (
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

  const renderResult = () => {
    if (!result) return null;

    const basic = result?.DadosBasicos || result;
    const economic = result?.DadosEconomicos;
    const age = getAge(basic?.dataNascimento);
    const consumption = result?.perfilConsumo || {};
    const consumptionEntries = Object.entries(consumption);
    const booleanConsumption = consumptionEntries.filter(([, value]) => typeof value === "boolean");
    const probabilityConsumption = consumptionEntries.filter(([, value]) => typeof value === "string" && value.includes("%"));

    return (
      <>
        <div className="mt-8 space-y-5 ">
          <Section icon="👤" title={result?.foto?.foto ? "Perfil encontrado" : "Dados Básicos"}>
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
              {foto && result?.foto?.foto && (
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
                    className="
                      w-40
                      h-52
                      sm:w-48
                      sm:h-60
                      rounded-2xl
                      object-cover
                    "
                  />
                </div>
              )}

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                <InfoCard label="Nome" value={basic?.nome} />
                <InfoCard label="CPF" value={formatCpf(basic?.cpf)} />
                <InfoCard label="CNS" value={basic?.cns} />
                <InfoCard label="Nascimento" value={formatDate(basic?.dataNascimento)} />
                <InfoCard label="Idade" value={age ? `${age} anos` : null} />
                <InfoCard label="Sexo" value={basic?.sexo} />
                <InfoCard label="Cor" value={basic?.cor} />
                <InfoCard label="Escolaridade" value={basic?.escolaridade} />
                <InfoCard label="Estado Civil" value={basic?.estadoCivil} />
                <InfoCard label="Nacionalidade" value={basic?.nacionalidade} />
                <InfoCard label="Nome da Mãe" value={basic?.nomeMae || result?.nome_mae} />
                <InfoCard label="Nome do Pai" value={basic?.nomePai || result?.nome_pai} />
                <InfoCard label="Óbito" value={basic?.obito?.obito} />
                <InfoCard label="Data do Óbito" value={basic?.obito?.dataObito} />
                <InfoCard label="Situação Cadastral" value={basic?.situacaoCadastral?.descricaoSituacaoCadastral} />
              </div>
            </div>

            {foto && result?.foto?.assinatura && (
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
                    className="
                      max-w-[280px]
                      max-h-28
                      object-contain
                    "
                  />
                </div>
              </div>
            )}
          </Section>

          <Section icon="💰" title="Dados Econômicos">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              <InfoCard label="Renda" value={economic?.renda ? `R$ ${economic.renda}` : null} />
              <InfoCard label="Poder Aquisitivo" value={economic?.poderAquisitivo?.poderAquisitivoDescricao} />
              <InfoCard label="Faixa de Renda" value={economic?.poderAquisitivo?.faixaPoderAquisitivo} />
              <InfoCard label="Score CSB" value={economic?.score?.scoreCSB} />
              <InfoCard label="Risco CSB" value={economic?.score?.scoreCSBFaixaRisco} />
              <InfoCard label="Score CSBA" value={economic?.score?.scoreCSBA} />
              <InfoCard label="Risco CSBA" value={economic?.score?.scoreCSBAFaixaRisco} />
            </div>
          </Section>

          <Section icon="📞" title="Telefones" count={result?.telefones?.length || 0}>
            <Table
              columns={["Telefone", "Tipo", "Operadora", "Status", "WhatsApp"]}
              data={result?.telefones}
              renderRow={(phone, index) => (
                <tr key={index}>
                  <Td>{formatPhone(phone.telefone)}</Td>
                  <Td>{valueOrDefault(phone.tipo)}</Td>
                  <Td>{valueOrDefault(phone.operadora)}</Td>
                  <Td>{valueOrDefault(phone.status)}</Td>
                  <Td>{valueOrDefault(phone.whatsapp)}</Td>
                </tr>
              )}
            />
          </Section>

          <Section icon="📧" title="E-mails" count={result?.emails?.length || 0}>
            <Table
              columns={["E-mail", "Prioridade", "Qualidade", "Pessoal", "Blacklist"]}
              data={result?.emails}
              renderRow={(email, index) => (
                <tr key={index}>
                  <Td>{valueOrDefault(email.email)}</Td>
                  <Td>{valueOrDefault(email.prioridade)}</Td>
                  <Td>{valueOrDefault(email.qualidade)}</Td>
                  <Td>{valueOrDefault(email.emailPessoal)}</Td>
                  <Td>{valueOrDefault(email.blacklist)}</Td>
                </tr>
              )}
            />
          </Section>

          <Section icon="🏠" title="Endereços" count={result?.enderecos?.length || 0}>
            {result?.enderecos?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {result.enderecos.map((address, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border p-4 ${
                      isDark
                        ? "bg-black/25 border-white/5"
                        : "bg-white/70 border-slate-300/40"
                    }`}
                  >
                    <h3 className={`font-bold ${isDark ? "text-green-100" : "text-emerald-950"}`}>
                      {valueOrDefault(address.tipoLogradouro)} {valueOrDefault(address.logradouro)}, {valueOrDefault(address.logradouroNumero)}
                    </h3>

                    <p className={isDark ? "mt-2 text-sm text-gray-400" : "mt-2 text-sm text-slate-600"}>
                      {address.complemento && `${address.complemento} • `}
                      {valueOrDefault(address.bairro)}
                    </p>

                    <p className={isDark ? "mt-1 text-sm text-gray-400" : "mt-1 text-sm text-slate-600"}>
                      {valueOrDefault(address.cidade)}/{valueOrDefault(address.uf)}
                    </p>

                    <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      isDark
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-emerald-700/10 text-emerald-800"
                    }`}>
                      CEP {formatCep(address.cep)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyMessage />
            )}
          </Section>

          <Section icon="🏘" title="Vizinhos" count={result?.vizinhos?.length || 0}>
            <Table
              columns={["Nome", "CPF", "Nascimento", "Idade", "Sexo", "Mãe"]}
              data={result?.vizinhos}
              renderRow={(neighbor, index) => (
                <tr key={index}>
                  <Td>{valueOrDefault(neighbor.nome)}</Td>
                  <Td>{formatCpf(neighbor.cpf)}</Td>
                  <Td>{formatDate(neighbor.dataNascimento)}</Td>
                  <Td>{neighbor.idade ? `${neighbor.idade} anos` : "Não informado"}</Td>
                  <Td>{valueOrDefault(neighbor.sexo)}</Td>
                  <Td>{valueOrDefault(neighbor.nomeMae)}</Td>
                </tr>
              )}
            />
          </Section>

          {vacinas && (
          <Section icon="💉" title="Histórico Vacinal" count={result?.imunoBiologicos?.length || 0}>
            <Table
              columns={["Vacina", "Dose", "Data", "Fabricante", "Lote", "Status"]}
              data={result?.imunoBiologicos}
              renderRow={(vaccine, index) => (
                <tr key={index}>
                  <Td>{valueOrDefault(vaccine.VacinaNome)}</Td>
                  <Td>{valueOrDefault(vaccine.VacinaDescricaoDose)}</Td>
                  <Td>{formatDate(vaccine.VacinaDataAplicacao)}</Td>
                  <Td>{valueOrDefault(vaccine.VacinaFabricanteNome)}</Td>
                  <Td>{valueOrDefault(vaccine.VacinaLote)}</Td>
                  <Td>{valueOrDefault(vaccine.Status)}</Td>
                </tr>
              )}
            />
          </Section>
          )}

          {sus && (
            <Section icon="🏥" title="Dados SUS">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                <InfoCard label="CNS" value={basic?.cns} />
                <InfoCard label="Documentos CNS" value={result?.listaDocumentos?.CNS?.length || 0} />
              </div>
            </Section>
          )}

          <Section icon="🛒" title="Perfil de Consumo">
            {booleanConsumption.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {booleanConsumption.map(([key, value]) => (
                  <BooleanBadge key={key} label={formatLabel(key)} value={value} />
                ))}
              </div>
            ) : (
              <EmptyMessage />
            )}

            {probabilityConsumption.length > 0 && (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {probabilityConsumption.map(([key, value]) => (
                  <InfoCard key={key} label={formatLabel(key)} value={value} />
                ))}
              </div>
            )}
          </Section>
        </div>
      </>
    );
  };

  if (!type) {
    return (
      <section className="min-h-[100dvh] flex items-center justify-center px-4 py-6 transition-colors">
        <div
          className={`
            w-full
            max-w-md
            rounded-3xl
            border
            p-6
            text-center
            backdrop-blur-xl
            ${
              isDark
                ? "bg-black/70 border-emerald-400/20"
                : "bg-white/80 border-slate-300/60"
            }
          `}
        >
          <h1 className={`text-2xl font-bold ${isDark ? "text-emerald-300" : "text-emerald-800"}`}>
            Tipo de pesquisa inválido
          </h1>

          <p className={isDark ? "mt-3 text-gray-400" : "mt-3 text-slate-600"}>
            Volte para o início e selecione uma consulta.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold transition"
          >
            Voltar ao início
          </button>
        </div>
      </section>
    );
  }

  return (
    <ContainerDefault>
      <div
        className={`
          w-full
          max-w-[1280px]
          rounded-3xl
          backdrop-blur-xl
          border
          p-4
          sm:p-6
          md:p-8
          lg:p-10
          transition-all
          ${
            isDark
              ? "bg-black/70 border-green-900/40 shadow-[0_0_25px_#10b98122]"
              : "bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]"
          }
        `}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <img
              src="/icon.png"
              alt="logo mv search"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />

            <div>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black ${isDark ? "text-green-100" : "text-emerald-900"}`}>
                MV SEARCH
              </h1>

              <p className={isDark ? "text-sm text-gray-400" : "text-sm text-slate-600"}>
                Consulta por {title}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className={`
              w-full
              sm:w-auto
              px-5
              py-2.5
              rounded-2xl
              border
              font-medium
              transition
              ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  : "bg-white/70 border-slate-300/60 text-slate-700 hover:bg-white"
              }
            `}
          >
            ← Voltar
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <label className={isDark ? "text-sm text-gray-400" : "text-sm text-slate-600"}>
                Digite sua pesquisa
              </label>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  border
                  text-xs
                  font-semibold
                  uppercase
                  ${
                    isDark
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                      : "bg-emerald-700/10 text-emerald-800 border-emerald-700/20"
                  }
                `}
              >
                {type}
              </span>
            </div>

            {masks[type] ? (
              <IMaskInput
                mask={masks[type]}
                value={search}
                onAccept={(value) => setSearch(value)}
                placeholder={`Digite ${title}...`}
                className={`
                  w-full
                  p-3
                  sm:p-3.5
                  rounded-2xl
                  border
                  outline-none
                  transition
                  ${
                    isDark
                      ? "bg-black/70 text-white placeholder:text-gray-500 border-emerald-400/20 focus:ring-2 focus:ring-emerald-500"
                      : "bg-white/80 text-slate-900 placeholder:text-slate-400 border-slate-300/60 focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-700"
                  }
                `}
              />
            ) : (
              <input
                type={inpType || "text"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Digite ${title}...`}
                className={`
                  w-full
                  p-3
                  sm:p-3.5
                  rounded-2xl
                  border
                  outline-none
                  transition
                  ${
                    isDark
                      ? "bg-black/70 text-white placeholder:text-gray-500 border-emerald-400/20 focus:ring-2 focus:ring-emerald-500"
                      : "bg-white/80 text-slate-900 placeholder:text-slate-400 border-slate-300/60 focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-700"
                  }
                `}
              />
            )}

            {type === "cpf" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                {[
                  ["vacinas", vacinas, setVacinas],
                  ["foto", foto, setFoto],
                  ["sus", sus, setSus]
                ].map(([label, value, setter]) => (
                  <label
                    key={label}
                    className={`
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      font-medium
                      cursor-pointer
                      ${
                        isDark
                          ? "bg-black/40 border-white/10 text-gray-300"
                          : "bg-white/70 border-slate-300/60 text-slate-700"
                      }
                    `}
                  >
                    <span>{label.toUpperCase()}</span>

                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setter(e.target.checked)}
                      className="accent-emerald-700"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-2xl
              bg-emerald-700
              text-white
              font-semibold
              hover:bg-emerald-600
              hover:scale-[1.01]
              active:scale-[0.99]
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
              shadow-[0_0_20px_rgba(4,120,87,0.18)]
            "
          >
            {loading ? "Pesquisando..." : "Pesquisar"}
          </button>
        </form>

        {error && (
          <div
            className={`
              mt-8
              border
              rounded-2xl
              p-4
              text-center
              ${
                isDark
                  ? "border-red-500/20 bg-red-500/10 text-red-300"
                  : "border-red-300/60 bg-red-100/70 text-red-700"
              }
            `}
          >
            {error}
          </div>
        )}
         <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={copyResults}
            className={`
              flex-1
              py-3
              rounded-2xl
              border
              font-medium
              transition
              ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                  : "bg-white/70 border-slate-300/60 text-slate-700 hover:bg-white"
              }
            `}
          >
            Copiar Dados
          </button>

          <button
            onClick={downloadPDF}
            className="
              flex-1
              py-3
              rounded-2xl
              bg-emerald-700
              text-white
              font-semibold
              hover:bg-emerald-600
              transition
              active:scale-[0.98]
            "
          >
            Baixar PDF
          </button>
        </div>
        {renderResult()}
      </div>
    </ContainerDefault>
  );
}
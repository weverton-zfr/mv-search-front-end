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

export { 
    formatCep,
    formatCnpj,
    formatCpf,
    formatDate,
    formatLabel,
    formatPhone,
    formatPDFData,
    valueOrDefault,
    isEmpty
}
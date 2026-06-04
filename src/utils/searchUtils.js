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

async function copyResults() {
  if (!result) return;

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


export {getAge, getFlatText}
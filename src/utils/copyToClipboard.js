import toast from "react-hot-toast";

export async function copyToClipboard(text) {
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

    return true;

  } catch (error) {

    console.error(error);

    toast.error("Não foi possível copiar os dados.", {
      id: "copy_results_error"
    });

    return false;
  }
}
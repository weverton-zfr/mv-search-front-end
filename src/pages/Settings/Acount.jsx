import { useEffect, useState } from "react";

import ConfigButton from "../../components/ConfigButton";
import ConfigCard from "../../components/ConfigCard";
import ConfigInput from "../../components/ConfigInput";

import { api } from "../../lib/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export default function Acount() {
  const { theme } = useTheme();
  const { profile, fetchProfile } = useAuth();

  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(profile?.name || "");
    setEmail(profile?.email || "");
    setAvatarPreview(profile?.avatar_url || "");
  }, [profile]);

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Selecione uma imagem válida.", {
        id: "avatar_invalid"
      });
    }

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("A imagem deve ter no máximo 2MB.", {
        id: "avatar_size"
      });
    }

    if (avatarPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      return toast.error("Preencha nome e email.", {
        id: "empty_profile_fields"
      });
    }

    try {
      setLoading(true);

      const avatarBase64 = avatarFile ? await fileToBase64(avatarFile) : null;

      await api.put("/profile", {
        name: trimmedName,
        email: trimmedEmail,
        avatarBase64,
        avatarType: avatarFile?.type || null
      });

      await fetchProfile();

      toast.success("Informações alteradas com sucesso!", {
        id: "alter_success",
        duration: 2000
      });

      setAvatarFile(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao atualizar perfil", {
        id: "alter_error"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfigCard>
      <div className="flex flex-col gap-1 mb-8">
        <h2
          className={`
            text-2xl sm:text-3xl font-bold transition-colors
            ${isDark ? "text-white" : "text-emerald-950"}
          `}
        >
          Conta
        </h2>

        <p
          className={`
            text-sm transition-colors
            ${isDark ? "text-gray-400" : "text-slate-600"}
          `}
        >
          Gerencie suas informações pessoais.
        </p>
      </div>

      <div
        className={`
          rounded-3xl border p-5 sm:p-6 mb-6 transition-all
          ${
            isDark
              ? "bg-white/[0.03] border-white/5"
              : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
          }
        `}
      >
        <div className="flex flex-col gap-2">
          <h3
            className={`
              text-lg font-bold transition-colors
              ${isDark ? "text-white" : "text-emerald-950"}
            `}
          >
            Informações da conta
          </h3>

          <p
            className={`
              text-sm leading-relaxed transition-colors
              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            Atualize seus dados pessoais, incluindo sua foto de perfil.
          </p>
        </div>
      </div>

      <div
        className={`
          rounded-3xl border p-5 sm:p-6 transition-all
          ${
            isDark
              ? "bg-black/40 border-white/10"
              : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
          }
        `}
      >
        <div className="mb-6 flex flex-col items-center gap-3">
          <label className="cursor-pointer group">
            <div
              className={`
                w-24 h-24 rounded-full overflow-hidden border flex items-center justify-center
                transition-all duration-300 group-hover:scale-105
                ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-400"
                    : "bg-slate-100 border-slate-300 text-slate-500"
                }
              `}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="px-3 text-center text-xs">
                  Adicionar foto
                </span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={loading}
              className="hidden"
            />
          </label>

          <p className={isDark ? "text-xs text-gray-500" : "text-xs text-slate-500"}>
            Clique na imagem para alterar. Máximo 2MB.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <ConfigInput
            label="Nome"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />

          <ConfigInput
            label="Email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <ConfigButton onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </ConfigButton>
        </div>
      </div>
    </ConfigCard>
  );
}
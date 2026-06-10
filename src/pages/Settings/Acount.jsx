import { useEffect, useState } from "react";

import ConfigButton from "../../components/ConfigButton";
import ConfigCard from "../../components/ConfigCard";
import ConfigInput from "../../components/ConfigInput";

import { api } from "../../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useTheme } from "../../context/ThemeContext";

export default function Acount() {
  const navigate = useNavigate();

  const { theme } = useTheme();

  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data } = await api.get("/me");

        setName(data.profile?.name || "");
        setEmail(data.profile?.email || "");
      } catch {
        toast.error("Erro ao carregar perfil", {
          id: "load_profile_error"
        });
      }
    }

    loadProfile();
  }, []);

  async function handleSave() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      toast.error("Preencha nome e email.", {
        id: "empty_profile_fields"
      });

      return;
    }

    try {
      setLoading(true);

      await api.put("/profile", {
        name: trimmedName,
        email: trimmedEmail
      });

      toast.success("Informações alteradas com sucesso!", {
        id: "alter_success",
        duration: 2000
      });

      setTimeout(() => {
        navigate(0);
      }, 2000);
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
            text-2xl
            sm:text-3xl
            font-bold
            transition-colors
            ${isDark ? "text-white" : "text-emerald-950"}
          `}
        >
          Conta
        </h2>

        <p
          className={`
            text-sm
            transition-colors
            ${isDark ? "text-gray-400" : "text-slate-600"}
          `}
        >
          Gerencie suas informações pessoais.
        </p>
      </div>

      <div
        className={`
          rounded-3xl
          border
          p-5
          sm:p-6
          mb-6
          transition-all
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
              text-lg
              font-bold
              transition-colors
              ${isDark ? "text-white" : "text-emerald-950"}
            `}
          >
            Informações da conta
          </h3>

          <p
            className={`
              text-sm
              leading-relaxed
              transition-colors
              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            Atualize seus dados pessoais. As alterações são salvas automaticamente
            após confirmação.
          </p>
        </div>
      </div>

      <div
        className={`
          rounded-3xl
          border
          p-5
          sm:p-6
          transition-all
          ${
            isDark
              ? "bg-black/40 border-white/10"
              : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
          }
        `}
      >
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
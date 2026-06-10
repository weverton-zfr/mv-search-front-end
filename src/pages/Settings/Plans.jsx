import { useNavigate } from "react-router";

import ConfigButton from "../../components/ConfigButton";
import ConfigCard from "../../components/ConfigCard";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Plans() {
  const navigate = useNavigate();

  const { subscription } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";

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
          Plano
        </h2>

        <p
          className={`
            text-sm
            transition-colors

            ${isDark ? "text-gray-400" : "text-slate-600"}
          `}
        >
          Gerencie sua assinatura e acompanhe a validade do plano.
        </p>
      </div>

      <div
        className={`
          rounded-3xl
          border
          p-5
          sm:p-6
          flex
          flex-col
          gap-5
          transition-all

          ${
            isDark
              ? "bg-white/[0.03] border-white/5"
              : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
          }
        `}
      >
        <div className="flex flex-col gap-2">
          <span
            className={`
              text-sm

              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            Plano atual
          </span>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3
              className={`
                text-xl
                sm:text-2xl
                font-bold

                ${isDark ? "text-emerald-400" : "text-emerald-900"}
              `}
            >
              {subscription?.plan || "Plano Gratuito"}
            </h3>

            <span
              className={`
                px-4
                py-1.5
                rounded-full
                text-sm
                border
                font-medium

                ${
                  subscription?.plan === "Plano Gratuito"
                    ? isDark
                      ? "border-slate-500/20 bg-slate-500/10 text-slate-300"
                      : "border-slate-400/30 bg-slate-200/70 text-slate-700"
                    : isDark
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : "border-emerald-700/20 bg-emerald-700/10 text-emerald-800"
                }
              `}
            >
              {subscription?.plan === "Plano Gratuito" ? "Gratuito" : "Ativo"}
            </span>
          </div>
        </div>

        {subscription?.plan !== "Plano Gratuito" && (
          <div
            className={`
              flex
              flex-col
              gap-2
              border-t
              pt-5

              ${isDark ? "border-white/5" : "border-slate-300/40"}
            `}
          >
            <span
              className={`
                text-sm

                ${isDark ? "text-gray-400" : "text-slate-600"}
              `}
            >
              Validade
            </span>

            <p
              className={`
                text-base
                sm:text-lg
                font-semibold

                ${isDark ? "text-emerald-100" : "text-emerald-900"}
              `}
            >
              {new Date(subscription?.expires_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <ConfigButton onClick={() => navigate("/plans")}>
          {subscription?.plan === "Plano Gratuito" ? "Fazer upgrade" : "Gerenciar plano"}
        </ConfigButton>
      </div>
    </ConfigCard>
  );
}
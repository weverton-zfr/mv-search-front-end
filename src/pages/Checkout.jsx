import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { api } from "../lib/api";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

import ContainerDefault from "../components/ContainerDefault";
import SubContainer from "../components/SubContainer";
import Button from "../components/Button";

export default function Checkout() {
  const { state } = useLocation();
  const navigation = useNavigate();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";

  const plan = state?.plan;
  const method = state?.method;

  useEffect(() => {
    if (!plan || !method) {
      navigation("/plans", { replace: true });
    }
  }, [plan, method, navigation]);

  if (!plan || !method) return null;

  async function handleConfirmPayment() {
    try {
      setLoading(true);

      if (method === "pix") {
        const response = await api.post("/payments/create-payment", {
          planID: plan.id
        });

        navigation("/plans/payment", {
          replace: true,
          state: {
            ...response.data,
            method: "pix"
          }
        });

        return;
      }

      if (method === "card") {
        const response = await api.post("/payments/create-card-payment", {
          planID: plan.id
        });

        if (!response.data?.checkoutUrl) {
          toast.error("Erro ao gerar checkout do cartão");
          return;
        }

        navigation("/plans/payment", {
          replace: true,
          state: {
            ...response.data,
            method: "card"
          }
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao iniciar pagamento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContainerDefault>
      <SubContainer>
        <div className="text-center mb-8">
          <h1
            className={`
              text-3xl
              sm:text-4xl
              font-black
              ${isDark ? "text-emerald-400" : "text-emerald-900"}
            `}
          >
            CONFIRMAR PAGAMENTO
          </h1>

          <p
            className={`
              mt-3
              text-sm
              sm:text-base
              ${isDark ? "text-green-300/70" : "text-slate-700"}
            `}
          >
            Revise os dados antes de continuar.
          </p>
        </div>

        <div
          className={`
            rounded-3xl
            border
            p-5
            sm:p-6
            mb-6
            w-full
            ${
              isDark
                ? "bg-green-950/20 border-white/10"
                : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
            }
          `}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p
                className={`
                  text-sm
                  mb-1
                  ${isDark ? "text-green-300/70" : "text-slate-600"}
                `}
              >
                Plano selecionado
              </p>

              <h2
                className={`
                  text-2xl
                  font-bold
                  ${isDark ? "text-white" : "text-emerald-950"}
                `}
              >
                {plan.title}
              </h2>

              {plan.duration && (
                <p
                  className={`
                    text-sm
                    mt-1
                    ${isDark ? "text-green-200/70" : "text-emerald-700"}
                  `}
                >
                  Duração: {plan.duration}
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <p
                className={`
                  text-sm
                  mb-1
                  ${isDark ? "text-green-300/70" : "text-slate-600"}
                `}
              >
                Valor
              </p>

              <p
                className={`
                  text-2xl
                  font-black
                  ${isDark ? "text-green-400" : "text-emerald-800"}
                `}
              >
                {plan.price}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`
            rounded-3xl
            border
            p-5
            sm:p-6
            mb-6
            ${
              isDark
                ? "bg-zinc-950/70 border-white/10"
                : "bg-slate-50/80 border-slate-300/50"
            }
          `}
        >
          <p
            className={`
              text-sm
              mb-2
              ${isDark ? "text-green-300/70" : "text-slate-600"}
            `}
          >
            Forma de pagamento
          </p>

          <div
            className={`
              rounded-2xl
              px-4
              py-3
              font-semibold
              border
              ${
                method === "pix"
                  ? isDark
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                    : "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : isDark
                    ? "bg-blue-950/40 border-blue-500/30 text-blue-300"
                    : "bg-blue-50 border-blue-300 text-blue-800"
              }
            `}
          >
            {method === "pix" ? "PIX" : "Cartão de crédito"}
          </div>

          <p
            className={`
              mt-4
              text-sm
              leading-relaxed
              ${isDark ? "text-green-100/70" : "text-slate-700"}
            `}
          >
            {method === "pix"
              ? "Após confirmar, você será direcionado para a tela com QR Code e código copia e cola."
              : "Após confirmar, você será direcionado para o checkout seguro do Stripe."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigation("/plans")} loading={loading} />

          <Button
            onClick={handleConfirmPayment}
            color="green"
            loading={loading}
            method={method}
          />
        </div>
      </SubContainer>
    </ContainerDefault>
  );
}
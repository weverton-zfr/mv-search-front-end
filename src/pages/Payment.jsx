import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { api } from "../lib/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Payment() {
  const navigation = useNavigate();
  const { state } = useLocation();
  const { fetchProfile } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const method = state?.method || "pix";
  const isCard = method === "card";

  const amountCents = state?.amountCents ? state.amountCents / 100 : 0;

  useEffect(() => {
    if (!state) {
      navigation("/plans", { replace: true });
      return;
    }

    if (isCard) return;

    const interval = setInterval(async () => {
      try {
        const response = await api.post(
          `/payments/payment/${state.paymentId}/confirm`,
          {
            plan: state.productName
          }
        );

        if (response.data.paid) {
          await fetchProfile();

          toast.success("Pagamento confirmado! Seu plano foi ativado!", {
            id: "success_payment"
          });

          clearInterval(interval);
          navigation("/");
        }
      } catch (err) {
        toast.error("Erro ao verificar pagamento", {
          id: "error_payment"
        });

        console.log(err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [state, isCard, navigation, fetchProfile]);

  function copyPixCode() {
    navigator.clipboard.writeText(state.pix.brCode);

    toast.success("Código PIX copiado!", {
      id: "copy_pix_success"
    });
  }

  function goToCardCheckout() {
    if (!state?.checkoutUrl) {
      toast.error("Checkout do cartão não encontrado");
      return;
    }

    window.location.href = state.checkoutUrl;
  }

  if (!state) return null;

  return (
    <section
      className={`
        min-h-[100dvh]
        flex
        justify-center
        items-center
        px-3
        py-6
        transition-colors
        duration-300

        ${
          isDark
            ? "bg-[radial-gradient(circle_at_top,#022c22,#000)] text-white"
            : "bg-[linear-gradient(135deg,#dbe4ee_0%,#c7d2da_100%)] text-slate-900"
        }
      `}
    >
      <div
        className={`
          w-full
          max-w-[1000px]
          rounded-3xl
          border
          backdrop-blur-xl
          p-4
          sm:p-6
          md:p-8
          lg:p-10
          transition-all

          ${
            isDark
              ? "bg-black/70 border-green-900/50 shadow-[0_0_25px_#10b98122]"
              : "bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]"
          }
        `}
      >
        <div className="text-center mb-8">
          <h1
            className={`
              text-3xl
              sm:text-4xl
              font-black

              ${isDark ? "text-green-200" : "text-emerald-900"}
            `}
          >
            {isCard ? "PAGAMENTO COM CARTÃO" : "PAGAMENTO PIX"}
          </h1>

          <p
            className={`
              mt-3
              text-sm
              sm:text-base

              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            {isCard
              ? "Finalize sua assinatura no checkout seguro do cartão."
              : "Escaneie o QR Code ou copie o código PIX para finalizar sua assinatura."}
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[380px_1fr]
            gap-6
            items-start
          "
        >
          <div
            className={`
              rounded-3xl
              border
              p-5
              flex
              flex-col
              items-center
              transition-all

              ${
                isDark
                  ? "bg-black/40 border-white/10"
                  : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
              }
            `}
          >
            {isCard ? (
              <>
                <div
                  className={`
                    w-full
                    max-w-[320px]
                    aspect-square
                    rounded-2xl
                    p-6
                    flex
                    flex-col
                    items-center
                    justify-center
                    border
                    text-center

                    ${
                      isDark
                        ? "bg-blue-950/20 border-blue-400/20"
                        : "bg-blue-50 border-blue-200"
                    }
                  `}
                >
                  <span className="text-6xl mb-4">💳</span>

                  <h2
                    className={`
                      text-xl
                      font-bold

                      ${isDark ? "text-blue-200" : "text-blue-900"}
                    `}
                  >
                    Checkout Seguro
                  </h2>

                  <p
                    className={`
                      mt-2
                      text-sm

                      ${isDark ? "text-blue-200/70" : "text-blue-800/70"}
                    `}
                  >
                    Você será redirecionado para concluir o pagamento com cartão.
                  </p>
                </div>

                <span
                  className={`
                    mt-4
                    text-xs

                    ${isDark ? "text-gray-400" : "text-slate-500"}
                  `}
                >
                  Status: {state.status || "pending"}
                </span>
              </>
            ) : (
              <>
                <div
                  className="
                    w-full
                    max-w-[320px]
                    aspect-square
                    rounded-2xl
                    bg-white
                    p-4
                    flex
                    items-center
                    justify-center
                    border
                    border-slate-200
                  "
                >
                  <img
                    src={state.pix.qrCodeImage}
                    alt="Código QR de cobrança do plano"
                    className="w-full h-full object-contain"
                  />
                </div>

                <span
                  className={`
                    mt-4
                    text-xs

                    ${isDark ? "text-gray-400" : "text-slate-500"}
                  `}
                >
                  Aguardando confirmação automática...
                </span>

                <div className="mt-3 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                  </span>

                  <span
                    className={`
                      text-sm
                      font-medium

                      ${isDark ? "text-emerald-400" : "text-emerald-800"}
                    `}
                  >
                    Verificando pagamento
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div
              className={`
                rounded-3xl
                border
                p-5

                ${
                  isDark
                    ? "bg-black/40 border-white/10"
                    : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
                }
              `}
            >
              <p
                className={`
                  text-sm

                  ${isDark ? "text-gray-400" : "text-slate-600"}
                `}
              >
                Plano selecionado
              </p>

              <h2
                className={`
                  mt-1
                  text-2xl
                  font-bold

                  ${isDark ? "text-green-200" : "text-emerald-900"}
                `}
              >
                {state.productName}
              </h2>

              <p
                className={`
                  mt-3
                  text-xl
                  font-semibold

                  ${isDark ? "text-white" : "text-slate-800"}
                `}
              >
                {amountCents.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>
            </div>

            {isCard ? (
              <div
                className={`
                  rounded-3xl
                  border
                  p-5

                  ${
                    isDark
                      ? "bg-black/40 border-white/10"
                      : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
                  }
                `}
              >
                <p
                  className={`
                    text-sm
                    mb-2

                    ${isDark ? "text-gray-400" : "text-slate-600"}
                  `}
                >
                  Pagamento com cartão
                </p>

                <p
                  className={`
                    text-sm
                    leading-relaxed
                    mb-4

                    ${isDark ? "text-gray-300" : "text-slate-700"}
                  `}
                >
                  Clique no botão abaixo para abrir o checkout seguro e finalizar
                  sua assinatura com cartão.
                </p>

                <button
                  onClick={goToCardCheckout}
                  className="
                    w-full
                    py-3
                    rounded-2xl
                    bg-blue-700
                    hover:bg-blue-600
                    text-white
                    font-semibold
                    transition
                    active:scale-[0.98]
                    shadow-[0_0_20px_rgba(37,99,235,0.18)]
                  "
                >
                  Ir para checkout do cartão
                </button>
              </div>
            ) : (
              <div
                className={`
                  rounded-3xl
                  border
                  p-5

                  ${
                    isDark
                      ? "bg-black/40 border-white/10"
                      : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
                  }
                `}
              >
                <p
                  className={`
                    text-sm
                    mb-2

                    ${isDark ? "text-gray-400" : "text-slate-600"}
                  `}
                >
                  Código PIX copia e cola
                </p>

                <div
                  className={`
                    max-h-[140px]
                    overflow-auto
                    rounded-2xl
                    border
                    p-4
                    text-sm
                    break-all

                    ${
                      isDark
                        ? "bg-black/50 border-white/5 text-gray-300"
                        : "bg-white/70 border-slate-300/60 text-slate-700"
                    }
                  `}
                >
                  {state.pix.brCode}
                </div>

                <button
                  onClick={copyPixCode}
                  className="
                    mt-4
                    w-full
                    py-3
                    rounded-2xl
                    bg-emerald-700
                    hover:bg-emerald-600
                    text-white
                    font-semibold
                    transition
                    active:scale-[0.98]
                    shadow-[0_0_20px_rgba(4,120,87,0.18)]
                  "
                >
                  Copiar código PIX
                </button>
              </div>
            )}

            <div
              className={`
                rounded-3xl
                border
                p-5
                text-sm
                leading-relaxed

                ${
                  isDark
                    ? "bg-black/40 border-white/10 text-gray-400"
                    : "bg-white/65 border-slate-300/40 text-slate-700 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
                }
              `}
            >
              {isCard
                ? "Para concluir sua compra, prossiga para o checkout do cartão. Após a aprovação, seu acesso será liberado automaticamente pelo sistema."
                : "Para concluir sua compra, realize o pagamento via PIX usando o QR Code ou o código copia e cola. Após o pagamento, a confirmação pode levar alguns instantes. Quando aprovado, seu acesso será liberado automaticamente."}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigation("/plans")}
                className={`
                  w-full
                  py-3
                  rounded-2xl
                  font-semibold
                  transition
                  active:scale-[0.98]

                  ${
                    isDark
                      ? "bg-white/10 hover:bg-white/15 text-gray-300"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  }
                `}
              >
                Voltar para planos
              </button>

              <button
                onClick={() => navigation("/")}
                className="
                  w-full
                  py-3
                  rounded-2xl
                  bg-emerald-700
                  hover:bg-emerald-600
                  text-white
                  font-semibold
                  transition
                  active:scale-[0.98]
                  shadow-[0_0_20px_rgba(4,120,87,0.18)]
                "
              >
                Voltar para início
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
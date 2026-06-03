import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import ContainerDefault from "../components/ContainerDefault";

export default function Plans() {
  const { subscription } = useAuth();
  const { theme } = useTheme();
  const navigation = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmPlan, setConfirmPlan] = useState(null);

  const isDark = theme === "dark";

  const plans = [
    {
      title: "Plano Basic Mensal",
      price: "R$ 39,99",
      id: "6a12868f7d9c8f18eb320995",
      level: 1,
      benefits: [
        "✅ Ideal para começar",
        "✅ Flexibilidade mensal",
        "✅ Sem fidelidade"
      ]
    },
    {
      title: "Plano Basic Trimensal",
      price: "R$ 99,99",
      id: "6a1286af7d9c8f18eb320a9c",
      level: 2,
      benefits: [
        "✅ Acesso a pesquisas avançadas",
        "✅ Melhor custo-benefício",
        "✅ Economia no médio prazo"
      ]
    },
    {
      title: "Plano Anual",
      price: "R$ 199,99",
      id: "6a1286bb7d9c8f18eb320b67",
      level: 3,
      benefits: [
        "✅ Melhor preço",
        "✅ Economia máxima",
        "✅ Acesso contínuo"
      ]
    }
  ];

  const currentPlan = plans.find((plan) => plan.title === subscription?.plan);
  const currentLevel = currentPlan?.level || 0;

  const openPaymentModal = (plan) => {
    const hasActivePlan = currentLevel > 0;
    const isChangingPlan = subscription?.plan !== plan.title;

    if (hasActivePlan && isChangingPlan) {
      setConfirmPlan(plan);
      return;
    }

    setSelectedPlan(plan);
  };

  const confirmChangePlan = () => {
    setSelectedPlan(confirmPlan);
    setConfirmPlan(null);
  };

  const closeConfirmModal = () => {
    setConfirmPlan(null);
  };

  const closePaymentModal = () => {
    setSelectedPlan(null);
  };

  const goToPayment = (method) => {
    navigation("/plans/checkout", {
      state: {
        plan: selectedPlan,
        method
      }
    });
  };

  return (
  <>
    <ContainerDefault>
      <div
        className={`
          w-full
          max-w-[1400px]
          rounded-3xl
          border
          backdrop-blur-xl
          p-5
          sm:p-8
          lg:p-10
          transition-all
          ${
            isDark
              ? "bg-black/70 border-emerald-400/20 shadow-[0_0_25px_#10b98122]"
              : "bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]"
          }
        `}
      >
        <div className="text-center mb-10">
          <h1
            className={`
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              ${isDark ? "text-emerald-400" : "text-emerald-900"}
            `}
          >
            ASSINATURAS
          </h1>

          <p
            className={`
              mt-3
              text-sm
              sm:text-base
              ${isDark ? "text-green-300/70" : "text-slate-700"}
            `}
          >
            Escolha o plano ideal para suas pesquisas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = subscription?.plan === plan.title;
            const isBlocked = currentLevel >= plan.level;

            const badge =
              plan.level === 1
                ? "Flexível"
                : plan.level === 2
                  ? "Mais Popular"
                  : "Melhor Oferta";

            const description =
              plan.level === 1
                ? "Ideal para começar e testar a plataforma."
                : plan.level === 2
                  ? "O melhor equilíbrio entre custo e benefício."
                  : "Máxima economia e acesso contínuo durante todo o ano.";

            const monthlyEquivalent =
              plan.level === 2
                ? "Equivale a R$ 33,33/mês"
                : plan.level === 3
                  ? "Equivale a apenas R$ 16,66/mês"
                  : null;

            return (
              <div
                key={plan.id}
                className={`
                  rounded-3xl
                  border
                  p-6
                  flex
                  flex-col
                  transition-all
                  duration-300
                  relative
                  overflow-hidden
                  ${
                    isBlocked
                      ? isDark
                        ? "bg-gray-800 border-white/10 opacity-70"
                        : "bg-slate-200/70 border-slate-300/60 opacity-70"
                      : isDark
                        ? "bg-green-950/20 border-white/10 hover:border-green-700/40 hover:shadow-[0_0_25px_#14532d22] hover:-translate-y-1"
                        : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)] hover:border-emerald-700/40 hover:shadow-[0_0_25px_rgba(4,120,87,0.12)] hover:-translate-y-1"
                  }
                `}
              >
                {!isBlocked && (
                  <div className="mb-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        border
                        ${
                          plan.level === 1
                            ? isDark
                              ? "bg-white/5 border-white/10 text-gray-300"
                              : "bg-slate-100 border-slate-200 text-slate-700"
                            : plan.level === 2
                              ? "bg-emerald-500/15 border-emerald-500/20 text-emerald-400"
                              : "bg-yellow-500/15 border-yellow-500/20 text-yellow-300"
                        }
                      `}
                    >
                      {badge}
                    </span>
                  </div>
                )}

                <h2
                  className={`
                    text-2xl
                    font-bold
                    mb-2
                    ${
                      isBlocked
                        ? isDark
                          ? "text-gray-500"
                          : "text-slate-500"
                        : isDark
                          ? "text-white"
                          : "text-emerald-950"
                    }
                  `}
                >
                  {plan.title}
                </h2>

                <p
                  className={`
                    text-lg
                    font-semibold
                    ${
                      isBlocked
                        ? isDark
                          ? "text-gray-500"
                          : "text-slate-500"
                        : isDark
                          ? "text-green-400"
                          : "text-emerald-800"
                    }
                  `}
                >
                  {plan.price}
                </p>

                {monthlyEquivalent && (
                  <p
                    className={`
                      text-sm
                      mt-1
                      mb-3
                      ${isDark ? "text-green-200/70" : "text-emerald-700"}
                    `}
                  >
                    {monthlyEquivalent}
                  </p>
                )}

                <p
                  className={`
                    text-sm
                    leading-relaxed
                    mb-6
                    ${
                      isBlocked
                        ? isDark
                          ? "text-gray-500"
                          : "text-slate-500"
                        : isDark
                          ? "text-gray-300"
                          : "text-slate-600"
                    }
                  `}
                >
                  {description}
                </p>

                <ul
                  className={`
                    space-y-3
                    mb-8
                    text-sm
                    sm:text-base
                    ${
                      isBlocked
                        ? isDark
                          ? "text-gray-500"
                          : "text-slate-500"
                        : isDark
                          ? "text-green-100"
                          : "text-slate-700"
                    }
                  `}
                >
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>

                <button
                  disabled={isBlocked}
                  onClick={() => openPaymentModal(plan)}
                  className={`
                    mt-auto
                    py-3
                    px-5
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      isBlocked
                        ? isDark
                          ? "bg-red-950 text-gray-400 cursor-not-allowed"
                          : "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-emerald-700 hover:bg-emerald-600 hover:scale-[1.01] active:scale-[0.99] text-white cursor-pointer shadow-[0_0_20px_rgba(4,120,87,0.18)]"
                    }
                  `}
                >
                  {isCurrentPlan
                    ? "Plano Atual"
                    : isBlocked
                      ? "Plano Indisponível"
                      : `Assinar ${plan.title}`}
                </button>
              </div>
            );
          })}
        </div>

        <div
          className={`
            mt-10
            rounded-3xl
            border
            p-6
            sm:p-8
            text-center
            transition-all
            ${
              isDark
                ? "border-white/10 bg-green-950/20"
                : "border-slate-300/50 bg-white/65 shadow-[0_0_18px_rgba(15,23,42,0.04)]"
            }
          `}
        >
          <h2
            className={`
              text-2xl
              sm:text-3xl
              font-bold
              mb-4
              ${isDark ? "text-white" : "text-emerald-950"}
            `}
          >
            Por que escolher nossos planos?
          </h2>

          <p
            className={`
              max-w-[800px]
              mx-auto
              text-sm
              sm:text-base
              leading-relaxed
              ${isDark ? "text-green-100/80" : "text-slate-700"}
            `}
          >
            Nossos planos foram criados para oferecer pesquisas rápidas,
            resultados completos e suporte especializado para todas as suas
            necessidades.
          </p>

          <button
            className="
              mt-6
              px-6
              py-3
              rounded-2xl
              bg-emerald-700
              hover:bg-emerald-600
              text-white
              font-semibold
              transition-all
              duration-200
              hover:scale-[1.01]
              active:scale-[0.99]
              shadow-[0_0_20px_rgba(4,120,87,0.18)]
            "
          >
            Contate-nos
          </button>
        </div>
      </div>
    </ContainerDefault>

    {confirmPlan && (
      <div className="fixed inset-0 z-[9999] grid h-[100dvh] place-items-center overflow-y-auto bg-black/70 px-4 py-6">
        <div
          className={`
            w-full
            max-w-md
            rounded-3xl
            border
            p-6
            shadow-2xl
            ${
              isDark
                ? "bg-zinc-950 border-white/10 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }
          `}
        >
          <h2 className="text-2xl font-bold mb-3">
            Confirmar troca de plano
          </h2>

          <p
            className={`
              text-sm
              leading-relaxed
              mb-6
              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            Você já possui o plano <strong>{subscription?.plan}</strong>. Ao
            contratar o <strong>{confirmPlan.title}</strong>, o tempo restante
            do plano atual poderá ser perdido. Deseja continuar?
          </p>

          <div className="space-y-3">
            <button
              onClick={confirmChangePlan}
              className="
                w-full
                py-3
                rounded-2xl
                bg-red-700
                hover:bg-red-600
                text-white
                font-semibold
                transition-all
              "
            >
              Sim, quero continuar
            </button>

            <button
              onClick={closeConfirmModal}
              className={`
                w-full
                py-3
                rounded-2xl
                font-semibold
                transition-all
                ${
                  isDark
                    ? "bg-white/10 hover:bg-white/15 text-gray-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }
              `}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}

    {selectedPlan && (
      <div className="fixed inset-0 z-[9999] grid h-[100dvh] place-items-center overflow-y-auto bg-black/70 px-4 py-6">
        <div
          className={`
            w-full
            max-w-md
            rounded-3xl
            border
            p-6
            shadow-2xl
            ${
              isDark
                ? "bg-zinc-950 border-white/10 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }
          `}
        >
          <h2 className="text-2xl font-bold mb-2">
            Forma de pagamento
          </h2>

          <p
            className={`
              text-sm
              mb-6
              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            Escolha como deseja pagar o {selectedPlan.title}.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => goToPayment("pix")}
              className="
                w-full
                py-3
                rounded-2xl
                bg-emerald-700
                hover:bg-emerald-600
                text-white
                font-semibold
                transition-all
              "
            >
              Pagar com PIX
            </button>

            <button
              onClick={() => goToPayment("card")}
              className="
                w-full
                py-3
                rounded-2xl
                bg-blue-700
                hover:bg-blue-600
                text-white
                font-semibold
                transition-all
              "
            >
              Pagar com Cartão
            </button>

            <button
              onClick={closePaymentModal}
              className={`
                w-full
                py-3
                rounded-2xl
                font-semibold
                transition-all
                ${
                  isDark
                    ? "bg-white/10 hover:bg-white/15 text-gray-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }
              `}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}
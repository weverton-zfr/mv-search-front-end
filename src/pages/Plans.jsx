import { useNavigate } from "react-router";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

export default function Plans() {
  const { profile, subscription } = useAuth();
  const { theme } = useTheme();
  const navigation = useNavigate();

  const isDark = theme === "dark";

  const handleSubscribe = async (planID) => {
    try {
      const response = await api.post("/payments/create-payment", {
        planID,
        customer: {
          name: profile.name,
          email: profile.email
        }
      });

      navigation("/plans/payment", {
        replace: true,
        state: response.data
      });
    } catch (err) {
      toast.error("Erro ao solicitar pagamento", {
        id: "payment_error"
      });

      console.log(err);
    }
  };

  const plans = [
    {
      title: "Plano Basic Mensal",
      price: "R$ 39,99",
      id: "6a0d59a429cd04f4c3d49e5f",
      benefits: [
        "✅ Acesso a pesquisas básicas",
        "✅ Suporte por email",
        "❌ Resultados limitados"
      ]
    },
    {
      title: "Plano Basic Trimensal",
      price: "R$ 99,99",
      id: "6a0d59d729cd04f4c3d4a0c7",
      benefits: [
        "✅ Acesso a pesquisas avançadas",
        "✅ Suporte prioritário",
        "✅ Resultados ilimitados"
      ]
    },
    {
      title: "Plano Anual",
      price: "R$ 199,99",
      id: "6a0d59f229cd04f4c3d4a306",
      benefits: [
        "✅ Acesso a todas as pesquisas",
        "✅ Suporte 24/7",
        "✅ Resultados ilimitados"
      ]
    }
  ];

  return (
    <section
      className={`
        min-h-[100dvh]
        flex
        justify-center
        items-center
        px-4
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
          {plans.map((plan, index) => {
            const currentPlan = subscription?.plan === plan.title;

            return (
              <div
                key={index}
                className={`
                  rounded-3xl
                  border
                  p-6
                  flex
                  flex-col
                  transition-all
                  duration-300

                  ${
                    currentPlan
                      ? isDark
                        ? "bg-gray-800 border-white/10 opacity-70"
                        : "bg-slate-200/70 border-slate-300/60 opacity-70"
                      : isDark
                        ? "bg-green-950/20 border-white/10 hover:border-green-700/40 hover:shadow-[0_0_25px_#14532d22] hover:-translate-y-1"
                        : "bg-white/65 border-slate-300/40 shadow-[0_0_18px_rgba(15,23,42,0.04)] hover:border-emerald-700/40 hover:shadow-[0_0_25px_rgba(4,120,87,0.12)] hover:-translate-y-1"
                  }
                `}
              >
                <h2
                  className={`
                    text-2xl
                    font-bold
                    mb-2

                    ${
                      currentPlan
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
                    mb-6
                    font-semibold

                    ${
                      currentPlan
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

                <ul
                  className={`
                    space-y-3
                    mb-8
                    text-sm
                    sm:text-base

                    ${
                      currentPlan
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
                  disabled={currentPlan}
                  onClick={() => handleSubscribe(plan.id)}
                  className={`
                    mt-auto
                    py-3
                    px-5
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      currentPlan
                        ? isDark
                          ? "bg-red-950 text-gray-400 cursor-not-allowed"
                          : "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-emerald-700 hover:bg-emerald-600 hover:scale-[1.01] active:scale-[0.99] text-white cursor-pointer shadow-[0_0_20px_rgba(4,120,87,0.18)]"
                    }
                  `}
                >
                  {currentPlan ? "Plano Atual" : `Assinar ${plan.title}`}
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
    </section>
  );
}
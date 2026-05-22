import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

import { useTheme } from "../context/ThemeContext";

function UpgradeButton({
  plan,
  text,
  className = ""
}) {

  const { theme } = useTheme();

  const isDark = theme === "dark";

  const handleUpgrade = async () => {

    try {

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {

        toast.error(
          "Você precisa estar logado.",
          {
            style: {
              background: isDark ? "#450a0a" : "#fee2e2",
              color: isDark ? "#fecaca" : "#7f1d1d",
              border: isDark
                ? "1px solid #7f1d1d"
                : "1px solid #fca5a5"
            }
          }
        );

        return;

      }

      const durations = {
        free: 30,
        basic_mensal: 30,
        basic_trimestral: 90,
        anual: 365
      };

      const days = durations[plan];

      const { error } = await supabase
        .from("subscriptions")
        .update({
          plan,
          start_date: new Date(),
          end_date: new Date(
            Date.now() + days * 86400000
          )
        })
        .eq("user_id", user.id);

      if (error) {

        toast.error(
          error.message,
          {
            style: {
              background: isDark ? "#450a0a" : "#fee2e2",
              color: isDark ? "#fecaca" : "#7f1d1d",
              border: isDark
                ? "1px solid #7f1d1d"
                : "1px solid #fca5a5"
            }
          }
        );

        return;

      }

      toast.success(
        "Plano atualizado com sucesso!",
        {
          style: {
            background: isDark ? "#052e16" : "#dcfce7",
            color: isDark ? "#dcfce7" : "#14532d",
            border: isDark
              ? "1px solid #14532d"
              : "1px solid #86efac"
          }
        }
      );

    } catch (err) {

      toast.error(
        "Erro ao atualizar plano.",
        {
          style: {
            background: isDark ? "#450a0a" : "#fee2e2",
            color: isDark ? "#fecaca" : "#7f1d1d",
            border: isDark
              ? "1px solid #7f1d1d"
              : "1px solid #fca5a5"
          }
        }
      );

      console.log(err);

    }

  };

  return (

    <button
      onClick={handleUpgrade}
      className={`
        w-full
        sm:w-auto

        px-5
        sm:px-6

        py-3

        rounded-2xl

        font-semibold

        transition-all
        duration-200

        hover:scale-[1.01]
        active:scale-[0.99]

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${
          isDark
            ? `
              bg-green-700
              hover:bg-green-600
              text-white
              shadow-[0_0_20px_#16653422]
            `
            : `
              bg-emerald-700
              hover:bg-emerald-600
              text-white
              shadow-[0_0_20px_rgba(4,120,87,0.15)]
            `
        }

        ${className}
      `}
    >

      Assinar {text}

    </button>

  );

}

export default UpgradeButton;
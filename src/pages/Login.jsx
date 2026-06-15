import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/FormInput";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import ContainerDefault from "../components/ContainerDefault";
import { translateSupabaseError } from "../utils/supabaseErrors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { theme } = useTheme();

  const isDark = theme === "dark";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Preencha email e senha.", {
        id: "login_empty"
      });

      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        toast.error(translateSupabaseError(error), {
          id: "login_error"
        });

        return;
      }

      toast.success("Login realizado com sucesso!", {
        id: "login_success"
      });

      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Erro ao logar. Tente novamente.", {
        id: "login_error"
      });

      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerDefault>
      <div
        className={`
          absolute
          w-[450px]
          h-[450px]
          rounded-full
          blur-[120px]
          z-0
          ${isDark ? "bg-green-500/10" : "bg-emerald-700/10"}
        `}
      />

      <form
        onSubmit={handleLogin}
        className={`
          relative
          z-10
          w-full
          max-w-md
          rounded-3xl
          border
          backdrop-blur-xl
          p-5
          sm:p-8
          transition-all
          duration-300
          ${
            isDark
              ? `
                bg-[#111111de]
                border-green-900/50
                text-white
                shadow-[0_0_30px_#10b98122]
              `
              : `
                bg-white/75
                border-slate-300/50
                text-slate-900
                shadow-[0_0_35px_rgba(15,23,42,0.08)]
              `
          }
        `}
      >
        <div className="flex items-center gap-3 mb-8">
          <div
            className={`
              w-12
              h-12
              rounded-2xl
              overflow-hidden
              flex
              items-center
              justify-center
              border
              ${
                isDark
                  ? "bg-black/20 border-white/10"
                  : "bg-white/60 border-slate-300/50"
              }
            `}
          >
            <img
              src="/icon.png"
              alt="logo mv search"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1
              className={`
                text-lg
                font-black
                ${isDark ? "text-white" : "text-emerald-950"}
              `}
            >
              MV SEARCH
            </h1>

            <p
              className={`
                text-xs
                uppercase
                tracking-[0.1em]
                ${isDark ? "text-green-400" : "text-emerald-700"}
              `}
            >
              Painel Profissional de Buscas
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2
            className={`
              text-2xl
              sm:text-3xl
              font-bold
              ${isDark ? "text-white" : "text-emerald-950"}
            `}
          >
            Bem-vindo de volta
          </h2>

          <p
            className={`
              mt-2
              text-sm
              leading-relaxed
              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            Entre com email e senha para acessar sua dashboard.
          </p>
        </div>

        <div className="space-y-1">
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            mt-6
            py-3
            rounded-2xl
            bg-emerald-700
            hover:bg-emerald-600
            text-white
            font-semibold
            cursor-pointer
            transition-all
            duration-200
            hover:scale-[1.01]
            hover:shadow-[0_0_20px_rgba(4,120,87,0.25)]
            active:scale-[0.99]
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
          {loading ? "Entrando..." : "→ Entrar"}
        </button>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
            mt-6
            text-sm
          "
        >
          <span className={isDark ? "text-gray-500" : "text-slate-600"}>
            Não tem conta?
          </span>

          <button
            type="button"
            disabled={loading}
            onClick={() => navigate("/register")}
            className={`
              font-medium
              transition-all
              duration-200
              hover:underline
              cursor-pointer
              disabled:opacity-60
              disabled:cursor-not-allowed
              ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-emerald-700 hover:text-emerald-600"
              }
            `}
          >
            Criar conta
          </button>
        </div>
      </form>
    </ContainerDefault>
  );
}
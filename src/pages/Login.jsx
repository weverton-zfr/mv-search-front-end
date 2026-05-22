import { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../components/FormInput';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const handleLogin = async (e) => {

    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {

      toast.error(
        'Erro ao logar: ' + error.message,
        {
          id: 'login_error'
        }
      );

      return;

    }

    toast.success(
      'Login realizado com sucesso!',
      {
        id: 'login_success'
      }
    );

    navigate('/', { replace: true });

  };

  return (

    <main
      className={`
        min-h-[100dvh]
        flex
        items-center
        justify-center
        px-4
        py-6
        relative
        overflow-hidden
        transition-colors
        duration-300

        ${
          isDark
            ? 'bg-[radial-gradient(circle_at_center,#022c22,#000000)]'
            : 'bg-[linear-gradient(135deg,#dbe4ee_0%,#c7d2da_100%)]'
        }
      `}
    >

      {/* GLOW */}
      <div
        className={`
          absolute
          w-[450px]
          h-[450px]
          rounded-full
          blur-[120px]
          z-0

          ${
            isDark
              ? 'bg-green-500/10'
              : 'bg-emerald-700/10'
          }
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

        {/* HEADER */}
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
                  ? 'bg-black/20 border-white/10'
                  : 'bg-white/60 border-slate-300/50'
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

                ${
                  isDark
                    ? 'text-white'
                    : 'text-emerald-950'
                }
              `}
            >
              MV SEARCH
            </h1>

            <p
              className={`
                text-xs
                uppercase
                tracking-[0.25em]

                ${
                  isDark
                    ? 'text-green-400'
                    : 'text-emerald-700'
                }
              `}
            >
              Painel de Consultas
            </p>

          </div>

        </div>

        {/* TITLE */}
        <div className="mb-6">

          <h2
            className={`
              text-2xl
              sm:text-3xl
              font-bold

              ${
                isDark
                  ? 'text-white'
                  : 'text-emerald-950'
              }
            `}
          >
            Bem-vindo de volta
          </h2>

          <p
            className={`
              mt-2
              text-sm
              leading-relaxed

              ${
                isDark
                  ? 'text-gray-400'
                  : 'text-slate-600'
              }
            `}
          >
            Entre com email e senha para acessar sua dashboard.
          </p>

        </div>

        {/* INPUTS */}
        <div className="space-y-1">

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
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
          "
        >
          → Entrar
        </button>

        {/* FOOTER */}
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

          <span
            className={
              isDark
                ? 'text-gray-500'
                : 'text-slate-600'
            }
          >
            Não tem conta?
          </span>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className={`
              font-medium
              transition-all
              duration-200
              hover:underline
              cursor-pointer

              ${
                isDark
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-emerald-700 hover:text-emerald-600'
              }
            `}
          >
            Criar conta
          </button>

        </div>

      </form>

    </main>

  );

}
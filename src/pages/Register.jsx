import { useState } from 'react';
import { useNavigate } from 'react-router';

import Input from '../components/FormInput';

import { toast } from 'react-hot-toast';

import { api } from '../lib/api';

import { useTheme } from '../context/ThemeContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return toast.error('Preencha todos os campos!', {
        id: 'register_null'
      });
    }

    if (password.length < 6) {
      return toast.error('A senha deve ter pelo menos 6 caracteres.', {
        id: 'password_min'
      });
    }

    try {
      setLoading(true);

      await api.post('/register', {
        name,
        email,
        password
      });

      toast.success('Conta criada com sucesso! Verifique seu email.', {
        id: 'register_success'
      });

      setTimeout(() => {
        navigate('/login', {
          replace: true
        });
      }, 1800);
    } catch (err) {
      toast.error(
        'Erro ao registrar: ' +
          (err.response?.data?.error || 'Erro desconhecido'),
        {
          id: 'register_error'
        }
      );
    } finally {
      setLoading(false);
    }
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
        transition-colors
        duration-300

        ${
          isDark
            ? 'bg-[radial-gradient(circle_at_center,#022c22,#000000)] text-white'
            : 'bg-[linear-gradient(135deg,#dbe4ee_0%,#c7d2da_100%)] text-slate-900'
        }
      `}
    >
      <form
        onSubmit={handleRegister}
        className={`
          relative
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
              ? 'bg-[#111111de] border-green-900/50 shadow-2xl'
              : 'bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]'
          }
        `}
      >
        <button
          type="button"
          onClick={() => navigate('/login')}
          className={`
            absolute
            top-5
            right-5
            px-4
            py-2
            rounded-xl
            border
            text-sm
            font-medium
            transition-all
            duration-200
            hover:scale-[1.02]
            active:scale-[0.98]

            ${
              isDark
                ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                : 'bg-white/70 border-slate-300/60 text-slate-700 hover:bg-white'
            }
          `}
        >
          Voltar
        </button>

        <div className="flex items-center gap-3 mb-6 pr-20">
          <div
            className={`
              w-12
              h-12
              rounded-xl
              overflow-hidden
              flex
              items-center
              justify-center
              border

              ${
                isDark
                  ? 'bg-black/30 border-white/5'
                  : 'bg-white/80 border-slate-300/40'
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
                font-bold
                text-lg

                ${isDark ? 'text-white' : 'text-emerald-950'}
              `}
            >
              MV SEARCH
            </h1>

            <p
              className={`
                text-xs
                uppercase
                tracking-[0.25em]

                ${isDark ? 'text-green-400' : 'text-emerald-800'}
              `}
            >
              Painel de Consultas
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2
            className={`
              text-2xl
              sm:text-3xl
              font-bold

              ${isDark ? 'text-white' : 'text-slate-900'}
            `}
          >
            Criar conta
          </h2>

          <p
            className={`
              mt-2
              text-sm
              leading-relaxed

              ${isDark ? 'text-gray-400' : 'text-slate-600'}
            `}
          >
            Registre sua conta para acessar o sistema.
          </p>
        </div>

        <div className="space-y-1">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            transition-all
            duration-200
            hover:shadow-[0_0_20px_rgba(4,120,87,0.35)]
            hover:scale-[1.01]
            active:scale-[0.99]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>

        <div className="mt-6 text-center text-sm">
          <span className={isDark ? 'text-gray-500' : 'text-slate-600'}>
            Já possui uma conta?
          </span>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className={`
              ml-2
              font-medium
              hover:underline
              transition

              ${isDark ? 'text-green-400 hover:text-green-300' : 'text-emerald-800 hover:text-emerald-700'}
            `}
          >
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
}
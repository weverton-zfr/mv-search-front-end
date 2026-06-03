import { useState } from 'react';
import { useNavigate } from 'react-router';

import Input from '../components/FormInput';

import { toast } from 'react-hot-toast';

import { api } from '../lib/api';

import { useTheme } from '../context/ThemeContext';
import { translateSupabaseError } from '../utils/supabaseErrors';
import ContainerDefault from '../components/ContainerDefault';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

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

    if (password.length > 72) {
      return toast.error('A senha não pode ter mais de 72 caracteres.', {
        id: 'password_max'
      });
    }

    if (!termsAccepted) {
      return toast.error('Você precisa aceitar os Termos de Uso e a Política de Privacidade.', {
        id: 'terms_required'
      });
    }

    try {
      setLoading(true);

      await api.post('/register', {
        name,
        email,
        password,
        termsAccepted
      });

      toast.success('Conta criada com sucesso! Verifique seu email.', {
        id: 'register_success'
      });

      setTimeout(() => {
        navigate('/login', {
          replace: true
        });
      }, 1800);
    } catch (error) {
  console.log('ERRO COMPLETO:', error)
  console.log('STATUS:', error.response?.status)
  console.log('RESPOSTA DO BACKEND:', error.response?.data)

  const message =
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message

  toast.error(translateSupabaseError(message), {
    id: 'register_error'
  })
}
  };

  return (
    <ContainerDefault>
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

        <div className="mt-5 flex items-start gap-3">
          <input
            id="termsAccepted"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="
              mt-1
              h-4
              w-4
              cursor-pointer
              accent-emerald-700
            "
          />

          <label
            htmlFor="termsAccepted"
            className={`
              text-xs
              sm:text-sm
              leading-relaxed
              select-none

              ${isDark ? 'text-gray-400' : 'text-slate-600'}
            `}
          >
            Li e aceito os{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className={`
                font-semibold
                underline
                underline-offset-2
                transition

                ${isDark ? 'text-green-400 hover:text-green-300' : 'text-emerald-800 hover:text-emerald-700'}
              `}
            >
              Termos de Uso e a Política de Privacidade
            </button>
            .
          </label>
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

      {showTermsModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            px-4
            bg-black/60
            backdrop-blur-sm
          "
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-title"
            className={`
              w-full
              max-w-lg
              rounded-3xl
              border
              p-5
              sm:p-6
              shadow-2xl
              max-h-[85dvh]
              overflow-y-auto
              transition-all

              ${
                isDark
                  ? 'bg-[#111111] border-green-900/50 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }
            `}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="terms-title"
                  className={`
                    text-xl
                    font-bold

                    ${isDark ? 'text-white' : 'text-slate-900'}
                  `}
                >
                  Termos de Uso e Política de Privacidade
                </h3>

                <p
                  className={`
                    mt-1
                    text-sm

                    ${isDark ? 'text-gray-400' : 'text-slate-600'}
                  `}
                >
                  Leia com atenção antes de criar sua conta.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className={`
                  px-3
                  py-1.5
                  rounded-xl
                  border
                  text-sm
                  transition

                  ${
                    isDark
                      ? 'border-white/10 text-gray-300 hover:bg-white/10'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                Fechar
              </button>
            </div>

            <div
              className={`
                mt-5
                space-y-4
                text-sm
                leading-relaxed

                ${isDark ? 'text-gray-300' : 'text-slate-700'}
              `}
            >
              <section>
                <h4 className={`font-semibold ${isDark ? 'text-green-400' : 'text-emerald-800'}`}>
                  1. Uso da plataforma
                </h4>

                <p className="mt-1">
                  Ao criar uma conta no MV SEARCH, você declara que utilizará a plataforma de forma responsável,
                  legal e em conformidade com a legislação aplicável, incluindo normas de proteção de dados.
                </p>
              </section>

              <section>
                <h4 className={`font-semibold ${isDark ? 'text-green-400' : 'text-emerald-800'}`}>
                  2. Responsabilidade do usuário
                </h4>

                <p className="mt-1">
                  O usuário é responsável pelas informações fornecidas, pelas consultas realizadas e pelo uso dos
                  dados obtidos dentro da plataforma. É proibido utilizar o sistema para fins ilegais, abusivos,
                  discriminatórios ou não autorizados.
                </p>
              </section>

              <section>
                <h4 className={`font-semibold ${isDark ? 'text-green-400' : 'text-emerald-800'}`}>
                  3. Privacidade e proteção de dados
                </h4>

                <p className="mt-1">
                  Coletamos apenas os dados necessários para cadastro, autenticação, segurança, funcionamento do
                  sistema e melhoria da experiência do usuário.
                </p>
              </section>

              <section>
                <h4 className={`font-semibold ${isDark ? 'text-green-400' : 'text-emerald-800'}`}>
                  4. Consultas e LGPD
                </h4>

                <p className="mt-1">
                  Ao utilizar recursos de consulta, você declara possuir base legal, autorização ou justificativa
                  legítima para realizar a pesquisa, assumindo total responsabilidade pelo uso das informações
                  acessadas.
                </p>
              </section>

              <section>
                <h4 className={`font-semibold ${isDark ? 'text-green-400' : 'text-emerald-800'}`}>
                  5. Aceite
                </h4>

                <p className="mt-1">
                  Ao marcar a caixa de aceite e continuar o cadastro, você confirma que leu, compreendeu e concorda
                  com estes Termos de Uso e com a Política de Privacidade.
                </p>
              </section>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setTermsAccepted(true);
                  setShowTermsModal(false);
                }}
                className="
                  w-full
                  py-3
                  rounded-2xl
                  bg-emerald-700
                  hover:bg-emerald-600
                  text-white
                  font-semibold
                  transition-all
                  duration-200
                  hover:shadow-[0_0_20px_rgba(4,120,87,0.35)]
                  active:scale-[0.99]
                "
              >
                Aceitar e continuar
              </button>

              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className={`
                  w-full
                  py-3
                  rounded-2xl
                  border
                  font-semibold
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  ${
                    isDark
                      ? 'border-white/10 text-gray-300 hover:bg-white/10'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </ContainerDefault>
  );
}
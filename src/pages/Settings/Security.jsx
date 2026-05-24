import { useState } from 'react';

import ConfigButton from '../../components/ConfigButton';
import ConfigCard from '../../components/ConfigCard';
import ConfigInput from '../../components/ConfigInput';

import { toast } from 'react-hot-toast';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function Security() {
  const { profile } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState(profile?.email || '');
  const [loading, setLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const isDark = theme === 'dark';

  function openConfirmModal() {
    if (!email) {
      return toast.error('Informe seu email', {
        id: 'empty_email'
      });
    }

    setConfirmModalOpen(true);
  }

  async function handleSendPasswordEmail() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return toast.error(translateSupabaseError(error), {
          id: 'reset_password_error'
        });
      }

      toast.success('Enviamos um email de confirmação para redefinir sua senha.', {
        id: 'reset_password_success'
      });

      setConfirmModalOpen(false);
    } catch (err) {
      console.log(err);

      toast.error('Erro ao enviar email de redefinição', {
        id: 'reset_password_error'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ConfigCard>
        <div className="flex flex-col gap-1 mb-8">
          <h2
            className={`
              text-2xl
              sm:text-3xl
              font-bold
              transition-colors

              ${isDark ? 'text-white' : 'text-emerald-950'}
            `}
          >
            Segurança
          </h2>

          <p
            className={`
              text-sm
              transition-colors

              ${isDark ? 'text-gray-400' : 'text-slate-600'}
            `}
          >
            Redefina sua senha com confirmação por email.
          </p>
        </div>

        <div
          className={`
            mb-6
            rounded-3xl
            border
            p-5
            transition-all

            ${
              isDark
                ? `
                  bg-white/[0.03]
                  border-white/5
                `
                : `
                  bg-white/65
                  border-slate-300/40
                  shadow-[0_0_18px_rgba(15,23,42,0.04)]
                `
            }
          `}
        >
          <h3
            className={`
              text-lg
              font-bold
              mb-2
              transition-colors

              ${isDark ? 'text-white' : 'text-emerald-950'}
            `}
          >
            Alteração de senha
          </h3>

          <p
            className={`
              text-sm
              leading-relaxed
              transition-colors

              ${isDark ? 'text-gray-400' : 'text-slate-600'}
            `}
          >
            Para sua segurança, enviaremos um link para seu Gmail. A senha só
            será alterada depois que você acessar o link recebido.
          </p>
        </div>

        <div
          className={`
            rounded-3xl
            border
            p-5
            sm:p-6
            transition-all

            ${
              isDark
                ? `
                  bg-black/40
                  border-white/10
                `
                : `
                  bg-white/65
                  border-slate-300/40
                  shadow-[0_0_18px_rgba(15,23,42,0.04)]
                `
            }
          `}
        >
          <div className="flex flex-col gap-2">
            <ConfigInput
              label="Email da conta"
              type="email"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <ConfigButton onClick={openConfirmModal} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar email de redefinição'}
            </ConfigButton>
          </div>
        </div>
      </ConfigCard>

      {confirmModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
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
                  ? 'bg-zinc-950 border-white/10 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }
            `}
          >
            <h2 className="text-2xl font-bold mb-3">
              Tem certeza que deseja alterar?
            </h2>

            <p
              className={`
                text-sm
                leading-relaxed
                mb-6

                ${isDark ? 'text-gray-400' : 'text-slate-600'}
              `}
            >
              Enviaremos um email para <strong>{email}</strong>. A senha só será
              alterada depois que você confirmar pelo Gmail.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleSendPasswordEmail}
                disabled={loading}
                className={`
                  w-full
                  py-3
                  rounded-2xl
                  text-white
                  font-semibold
                  transition-all

                  ${
                    loading
                      ? 'bg-emerald-900 cursor-not-allowed opacity-70'
                      : 'bg-emerald-700 hover:bg-emerald-600'
                  }
                `}
              >
                {loading ? 'Enviando...' : 'Sim, enviar email'}
              </button>

              <button
                onClick={() => setConfirmModalOpen(false)}
                disabled={loading}
                className={`
                  w-full
                  py-3
                  rounded-2xl
                  font-semibold
                  transition-all

                  ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/15 text-gray-300'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
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
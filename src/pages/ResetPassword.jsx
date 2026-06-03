import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import { translateSupabaseError } from '../utils/supabaseErrors';
import ContainerDefault from '../components/ContainerDefault';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    try {
      if (!newPassword || !confirmPassword) {
        return toast.error('Preencha todos os campos');
      }

      if (newPassword !== confirmPassword) {
        return toast.error('As senhas não coincidem');
      }

      if (newPassword.length < 6) {
        return toast.error('A senha precisa ter pelo menos 6 caracteres');
      }

      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return toast.error(translateSupabaseError(error));
      }

      toast.success('Senha alterada com sucesso!');

      navigate('/login', {
        replace: true
      });
    } catch (err) {
      console.log(err);
      toast.error('Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContainerDefault>
      <div
        className={`
          w-full
          max-w-[520px]
          rounded-3xl
          border
          p-6
          sm:p-8

          ${
            isDark
              ? 'bg-black/70 border-emerald-400/20 shadow-[0_0_25px_#10b98122]'
              : 'bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.08)]'
          }
        `}
      >
        <h1
          className={`
            text-3xl
            font-black
            mb-3

            ${isDark ? 'text-emerald-400' : 'text-emerald-900'}
          `}
        >
          Redefinir senha
        </h1>

        <p
          className={`
            text-sm
            mb-6

            ${isDark ? 'text-gray-400' : 'text-slate-600'}
          `}
        >
          Digite sua nova senha para concluir a alteração.
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className={`
              w-full
              rounded-2xl
              border
              px-4
              py-3
              outline-none

              ${
                isDark
                  ? 'bg-black/40 border-white/10 text-white placeholder:text-gray-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
              }
            `}
          />

          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={`
              w-full
              rounded-2xl
              border
              px-4
              py-3
              outline-none

              ${
                isDark
                  ? 'bg-black/40 border-white/10 text-white placeholder:text-gray-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
              }
            `}
          />

          <button
            onClick={handleResetPassword}
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
            {loading ? 'Alterando...' : 'Alterar senha'}
          </button>
        </div>
      </div>
    </ContainerDefault>
  );
}
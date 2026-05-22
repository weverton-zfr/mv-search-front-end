import { useState } from 'react';

import ConfigButton from '../../components/ConfigButton';
import ConfigCard from '../../components/ConfigCard';
import ConfigInput from '../../components/ConfigInput';

import { api } from '../../lib/api';

import { toast } from 'react-hot-toast';

import { useTheme } from '../../context/ThemeContext';

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();

  const isDark = theme === 'dark';

  async function handleChangePassword() {
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        return toast.error('Preencha todos os campos', {
          id: 'empty_fields'
        });
      }

      if (newPassword !== confirmPassword) {
        return toast.error('As senhas não coincidem', {
          id: 'password_not_match'
        });
      }

      if (newPassword.length < 6) {
        return toast.error('A senha precisa ter pelo menos 6 caracteres', {
          id: 'password_length'
        });
      }

      setLoading(true);

      const token = localStorage.getItem('token');

      await api.put(
        '/profile/password',
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Senha alterada com sucesso!', {
        id: 'password_success'
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.log(err.response?.data);

      toast.error(err.response?.data?.error || 'Erro ao alterar senha', {
        id: 'password_error'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfigCard>
      {/* HEADER */}
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
          Altere sua senha para manter sua conta protegida.
        </p>
      </div>

      {/* INFO CARD */}
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
          Use uma senha forte com pelo menos 6 caracteres. Após alterar, utilize
          a nova senha no próximo login.
        </p>
      </div>

      {/* INPUTS */}
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
            label="Senha atual"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />

          <ConfigInput
            label="Nova senha"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />

          <ConfigInput
            label="Confirmar senha"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <ConfigButton onClick={handleChangePassword} disabled={loading}>
            {loading ? 'Alterando...' : 'Alterar senha'}
          </ConfigButton>
        </div>
      </div>
    </ConfigCard>
  );
}
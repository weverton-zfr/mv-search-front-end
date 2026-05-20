import { useState } from 'react'

import ConfigButton from '../../components/ConfigButton'
import ConfigCard from '../../components/ConfigCard'
import ConfigInput from '../../components/ConfigInput'

import { api } from '../../lib/api'

import { toast } from 'react-hot-toast'

export default function Security() {

  const [currentPassword, setCurrentPassword] = useState('')

  const [newPassword, setNewPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleChangePassword() {

    try {

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {
        return toast.error('Preencha todos os campos')
      }

      if (newPassword !== confirmPassword) {
        return toast.error('As senhas não coincidem')
      }

      const token = localStorage.getItem('token')

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
      )

      toast.success('Senha alterada com sucesso')

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

    } catch (err) {

      console.log(err.response?.data)

      toast.error(
        err.response?.data?.error ||
        'Erro ao alterar senha'
      )

    }

  }

  return (
    <ConfigCard>

      <h2 className="text-xl mb-6">
        Segurança
      </h2>

      <ConfigInput
        label="Senha atual"
        type="password"
        placeholder="••••••••"
        value={currentPassword}
        onChange={e =>
          setCurrentPassword(e.target.value)
        }
      />

      <ConfigInput
        label="Nova senha"
        type="password"
        placeholder="••••••••"
        value={newPassword}
        onChange={e =>
          setNewPassword(e.target.value)
        }
      />

      <ConfigInput
        label="Confirmar senha"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={e =>
          setConfirmPassword(e.target.value)
        }
      />

      <ConfigButton onClick={handleChangePassword}>
        Alterar senha
      </ConfigButton>

    </ConfigCard>
  )
}
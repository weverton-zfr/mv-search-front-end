import { useEffect, useState } from 'react'

import ConfigButton from "../../components/ConfigButton"
import ConfigCard from "../../components/ConfigCard"
import ConfigInput from "../../components/ConfigInput"

import { api } from "../../lib/api"
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router'

export default function Acount() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {

    async function loadProfile() {

      try {

        const token = localStorage.getItem('token')

        const { data } = await api.get(
          '/me',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setName(data.profile?.name || '')
        setEmail(data.profile?.email || '')

      } catch (err) {

        console.log(err)

      }

    }

    loadProfile()

  }, [])

  async function handleSave() {

    try {
      
      const token = localStorage.getItem('token')

      console.log({
        name,
        email
      })

      await api.put(
        '/profile',
        {
          name,
          email 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success(
        'Informações alteradas com sucesso!',
        {
          id: 'alter_success',
          duration: 2000
        }
      )
      setTimeout(() => {
       navigate(0)
      }, 2000)

    } catch (err) {
      toast.error('Erro: '+ err, { id: 'alter_error' })
    }

  }

  return (
    <ConfigCard>

      <h2 className="text-xl mb-6">
        Conta
      </h2>

      <ConfigInput
        label="Nome"
        placeholder={name}
        value={name}
        onChange={e => setName(e.target.value)}

      />

      <ConfigInput
        label="Email"
        type="email"
        placeholder={email}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <ConfigButton onClick={handleSave}>
        Salvar alterações
      </ConfigButton>

    </ConfigCard>
  )
}
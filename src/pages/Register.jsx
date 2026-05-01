import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Input from '../components/Form/Input'
import { supabase } from '../lib/supabase'
import { toast,Toaster } from 'react-hot-toast'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messagem, setMessagem] = useState()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
      data: {
      name: name
    }} })

    if (error) {
      toast.error(error.message, { id: 'register_error' })
      return
    }
    if (data) {
      toast.success('Registro realizado com sucesso! Verifique seu email para confirmar sua conta.', { id: 'register_success' })
      navigate('/login', { replace: true })
      return
    }
    
  }
  return (
     <main className="h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,#022c22,#000000)]">
        <form onSubmit={handleRegister} class="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border-1 border-green-900/50 bg-[#111111de] shadow-2xl">
          <div className='absolute top-8 right-8 rounded-xl border border-green-900 p-2 bg-green-800 text-white font-medium hover:shadow-[0_0_10px_#14532d] transition cursor-pointer' 
          onClick={() => navigate('/login')}>
              Voltar
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-800 text-black font-bold">
              MV
            </div>
            
            <div>
              <h1 className="text-white font-semibold">MV SEARCH</h1>
              <p className="text-xs text-green-400 tracking-widest">PAINEL DE CONSULTAS</p>
            </div>
          </div>

          <h2 class="text-2xl text-white font-semibold mb-2">
            Bem-vindo
          </h2>
          <p class="text-sm text-gray-400 mb-6">
            Registre sua conta.
          </p>
          <Input type="text" placeholder="Seu Nome" onChange={e => setName(e.target.value)} />
          <Input type="email" placeholder="seu@email.com" onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} />

          <button 
          class="
              w-full py-3 rounded-xl
              bg-green-800 text-white font-semibold
              hover:shadow-[0_0_10px_#14532d]
              hover:scale-[1.01]
              cursor-pointer
              transition-all duration-200
              "
          type="submit">
            Registrar
          </button>

        </form>
      </main>
  )
}
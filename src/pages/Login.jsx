import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Input from '../components/FormInput'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  
  const handleLogin = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error('Erro ao logar '+ error.message, { id: 'login_error' })
      return
    }

    toast.success('Login realizado com sucesso!', { id: 'login_success' })
    navigate('/', { replace: true })
  }

  return (
          <main className="h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,#022c22,#000000)]">
            <form onSubmit={handleLogin} className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border-1 border-green-900/50 bg-[#111111de] shadow-2xl">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 flex items-center justify-center text-black font-bold">
                 <img src="/icon.png" alt="logo mv search" className='size-full'/>
                </div>

                <div>
                  <h1 className="text-white font-semibold">MV SEARCH</h1>
                  <p className="text-xs text-green-400 tracking-widest">PAINEL DE CONSULTAS</p>
                </div>
              </div>

              <h2 className="text-2xl text-white font-semibold mb-2">
                Bem-vindo de volta
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Entre com email e senha para acessar a dashboard.
              </p>
              <Input label="Email" type="email" placeholder="seu@email.com" onChange={e => setEmail(e.target.value)} />
              <Input label="Senha" type="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} />

              <button 
              className="
                  w-full py-3 rounded-xl
                  bg-green-800 text-white font-semibold
                  hover:shadow-[0_0_10px_#14532d]
                  hover:scale-[1.01]
                  cursor-pointer
                  transition-all duration-200
                  "
              type="submit">
                → Entrar
              </button>

              <div className="flex justify-between mt-6 text-sm">
                <span className="text-gray-500">Não tem conta?</span>
                <span 
                className='text-green-400 hover:underline cursor-pointer'
                onClick={() => navigate('/register')}>
                  Criar conta
                </span>
              </div>

            </form>
          </main>
  )
}



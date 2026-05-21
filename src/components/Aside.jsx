import { Link, useNavigate } from "react-router";
import { useOutletContext } from 'react-router'
import { FaWhatsapp } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RiAccountCircleFill } from "react-icons/ri";
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Aside() {
    const {
        profile,
        subscription
    } = useAuth()
    const [message, setMessage] = useState('')

    const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        toast.error(error.message)
        return
    }
    toast.success('Logout realizado com sucesso!')
    navigate('/login')
    }


    const [activeMenu, setActiveMenu] = useState('inicio');
    const navigate = useNavigate() 
    const menuItems = [
        { id: '/', label: 'Início' },
        { id: 'plans', label: 'Planos' },
        { id: 'settings', label: 'Configurações' }
    ];


    return(
        <aside className="w-[15vw] fixed h-[100vh] bg-black/70 backdrop-blur-xl border-r border-white/5  border-r border-white/10 z-10 backdrop-blur-xl">
            <div className="h-20 flex justify-center items-center border-b border-b-white/10">
                <h1 className="text-green-100 text-2xl font-black">MV SEARCH</h1>
            </div>
            <div className="flex justify-center items-center flex-col gap-2 p-4">
                    <RiAccountCircleFill className="size-28"/>
                    <span className="px-3 py-1 bg-green-950/10 rounded-full">Olá, {profile?.name}</span>
                    <span className="px-3 py-1 bg-green-950/10 rounded-full">{profile?.email}</span>
                    <span className="px-3 py-1 bg-green-950/10 rounded-full">Seu plano: {subscription?.plan}</span>
            </div>
            <nav className="mt-3 p-4 space-y-2 border-t border-white/10 z-10">
            {menuItems.map((item) => 
                <Link
                key={item.id} 
                to={item.id}>
                    <button
                        onClick={() => setActiveMenu(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-lg ${
                        activeMenu === item.id
                            ? 'bg-green-600/20 text-white border border-green-500/30'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                        >
                        <span>{item.label}</span>
                    </button>
                </Link>
            )}
            
            <button 
                className="mt-10 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 text-lg" 
                onClick={handleLogout}>
                <CiLogout/>
                <span>
                    Sair
                </span>
            </button>
            
            <a href="">
                <button className="mt-10 w-full flex items-center gap-3 px-4 py-3 rounded-3xl transition-all bg-green-600 text-green-50" >
                    <FaWhatsapp/>
                        WhatsApp
                </button>
            </a>
            </nav>
        </aside>
    )
}



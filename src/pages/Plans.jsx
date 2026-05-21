import { useNavigate } from "react-router";
import UpgradeButton from "../components/UpgradeButton";
import { useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Plans() {
    const {profile, subscription} = useAuth()
    const navigation = useNavigate()
    const handleSubscribe = async (planID) => {
        try {
        const response = await api.post('/payments/create-payment', {
            planID,
            customer: {
                name: profile.name,
                email: profile.email
            }
        })
        navigation('/plans/payment', {
            replace: true,
            state: response.data
        })
        console.log(response)
        } catch (err) {
         toast.error('Erro ao solicitar pagamento', {
            id: 'payment_error'
        })
         console.log(err)
        }
    }
 console.log(subscription.plan)
    return(
        <section className="h-[100vh] flex flex-col items-center justify-center">
            <div className="w-[90%] h-[80%] bg-black/70 rounded-md border border-green-900/50 flex justify-center items-center gap-10 flex-col">
                <h1 className="text-emerald-100 text-4xl font-bold mb-4r">ASSINATURAS</h1>
                <p className="text-green-300/70 mb-6">Aqui estão os planos disponíveis:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["Plano Basic Trimensal", "Plano Anual", "Plano Basic Mensal"].includes(subscription.plan) ?
                    <div className="bg-gray-800 border-2 border-white/10 rounded-2xl p-6 text-center cursor-not-allowed">
                        <h2 className="text-2xl font-bold mb-2 text-gray-600">Plano Basic Mensal</h2>
                        <p className="text-gray-600 mb-4">R$ 39,99</p>
                        <ul className="text-gray-600 mb-6">
                            <li>✅ Acesso a pesquisas básicas</li>
                            <li>✅ Suporte por email</li>
                            <li>❌ Resultados limitados</li>
                        </ul>
                        <button className="bg-red-900 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-not-allowed">
                            Assinar Plano Basic Mensal
                        </button>
                    </div>
                    :
                    <div className="bg-green-950/40 border-2 border-white/10 rounded-2xl p-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">Plano Basic Mensal</h2>
                        <p className="text-green-400 mb-4">R$ 39,99</p>
                        <ul className="text-green-200 mb-6">
                            <li>✅ Acesso a pesquisas básicas</li>
                            <li>✅ Suporte por email</li>
                            <li>❌ Resultados limitados</li>
                        </ul>
                        <button onClick={() => handleSubscribe("6a0d59a429cd04f4c3d49e5f")} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors cursor-pointer">
                            Assinar Plano Basic Mensal
                        </button>
                    </div>
                    }

                    {["Plano Basic Trimensal", "Plano Anual"].includes(subscription.plan) ?
                        <div className="bg-gray-800 border-2 border-white/10 rounded-2xl p-6 text-center cursor-not-allowed">
                            <h2 className="text-2xl font-bold mb-2 text-gray-600">Plano Basic Trimensal</h2>
                            <p className="text-gray-600 mb-4">R$ 99,99</p>
                            <ul className="text-gray-600 mb-6">
                                <li>✅ Acesso a pesquisas avançadas</li>
                                <li>✅ Suporte prioritário</li>
                                <li>✅ Resultados ilimitados</li>
                            </ul>
                            <button className="bg-red-900 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-not-allowed">
                                Assinar Plano Basic Trimensal
                            </button>
                        </div>
                    :
                        <div className="bg-green-950/40 border-2 border-white/10 rounded-2xl p-6 text-center">
                            <h2 className="text-2xl font-bold mb-2">Plano Basic Trimensal</h2>
                            <p className="text-green-400 mb-4">R$ 99,99</p>
                            <ul className="text-green-200 mb-6">
                                <li>✅ Acesso a pesquisas avançadas</li>
                                <li>✅ Suporte prioritário</li>
                                <li>✅ Resultados ilimitados</li>
                            </ul>
                            <button onClick={() => handleSubscribe("6a0d59d729cd04f4c3d4a0c7")} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors cursor-pointer">
                                Assinar Plano Basic Trimensal
                            </button>
                        </div>
                    }       
                    {subscription.plan === "Plano Anual" ? 
                     <div className="bg-gray-800 border-2 border-white/10 rounded-2xl p-6 text-center cursor-not-allowed">
                            <h2 className="text-2xl font-bold mb-2 text-gray-600">Plano Anual</h2>
                            <p className="text-gray-600 mb-4">R$ 199,99</p>
                            <ul className="text-gray-600 mb-6">
                                <li>✅ Acesso a todas as pesquisas</li>
                                <li>✅ Suporte 24/7</li>
                                <li>✅ Resultados ilimitados com análises detalhadas</li>
                            </ul>
                            <button className="bg-red-900 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-not-allowed">
                                Assinar Plano Anual
                            </button>
                        </div>
                    : 
                        <div className="bg-green-950/40 border-2 border-white/10 rounded-2xl p-6 text-center">
                            <h2 className="text-2xl font-bold mb-2">Plano Anual</h2>
                            <p className="text-green-400 mb-4">R$ 199,99</p>
                            <ul className="text-green-200 mb-6">
                                <li>✅ Acesso a todas as pesquisas</li>
                                <li>✅ Suporte 24/7</li>
                                <li>✅ Resultados ilimitados com análises detalhadas</li>
                            </ul>
                            <button onClick={() => handleSubscribe("6a0d59f229cd04f4c3d4a306")} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors cursor-pointer">
                                Assinar Plano Anual
                            </button>
                        </div>
                    }

                    <div className="md:col-span-3 bg-green-950/40 border-2 border-white/10 rounded-2xl p-6 text-center mt-8">
                        <h2 className="text-2xl font-bold mb-4">Por que escolher nossos planos?</h2>
                        <p className="text-green-200">Nossos planos são projetados para oferecer o melhor em pesquisas e suporte, adaptados às suas necessidades. Entre em contato para mais detalhes.</p>
                        <button className="mt-4 bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                            Contate-nos
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
import UpgradeButton from "../components/UpgradeButton";

export default function Plans(){
//     toast.promise(promise, {
//     loading: 'Atualizando plano...',
//     success: 'Plano atualizado 🚀',
//     error: 'Erro ao atualizar 😢'
//   })
    return(
        <section className="h-[100vh] flex flex-col items-center justify-center">
            <div className="w-[90%] h-[80%] bg-black/70 rounded-md border border-green-900/50 flex justify-center items-center gap-10 flex-col">
                <h1 className="text-emerald-100 text-4xl font-bold mb-4r">ASSINATURAS</h1>
                <p className="text-green-300/70 mb-6">Aqui estão os planos disponíveis:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-950/40 border-2 border-white/10 rounded-2xl p-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">Plano Basic Mensal</h2>
                        <p className="text-green-400 mb-4">R$ 39,99</p>
                        <ul className="text-green-200 mb-6">
                            <li>✅ Acesso a pesquisas básicas</li>
                            <li>✅ Suporte por email</li>
                            <li>❌ Resultados limitados</li>
                        </ul>
                        <UpgradeButton plan="basic_mensal" text="Plano Basic Mensal" />
                    </div>
                    <div className="bg-green-950/40 border-2 border-white/10 rounded-2xl p-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">Plano Basic Trimensal</h2>
                        <p className="text-green-400 mb-4">R$ 99,99/mês</p>
                        <ul className="text-green-200 mb-6">
                            <li>✅ Acesso a pesquisas avançadas</li>
                            <li>✅ Suporte prioritário</li>
                            <li>✅ Resultados ilimitados</li>
                        </ul>
                        <UpgradeButton plan="basic_trimestral" text="Plano Basic Trimensal" />
                    </div>
                    <div className="bg-green-950/40 border-2 border-white/10 rounded-2xl p-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">Plano Anual</h2>
                        <p className="text-green-400 mb-4">R$ 199,99/mês</p>
                        <ul className="text-green-200 mb-6">
                            <li>✅ Acesso a todas as pesquisas</li>
                            <li>✅ Suporte 24/7</li>
                            <li>✅ Resultados ilimitados com análises detalhadas</li>
                        </ul>
                        <UpgradeButton plan="anual" text="Plano Anual" />
                    </div>
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
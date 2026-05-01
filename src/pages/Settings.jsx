import { useState } from "react";

const tabs = [
  "Conta",
  "Segurança",
  "Plano",
  "Uso"
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Conta");

  return (
    <div className="flex h-screen bg-[radial-gradient(circle_at_top,#022c22,#000)] text-white">

      {/* Sidebar */}
      <div className="ml-[15vw] w-64 bg-black/70 backdrop-blur-xl border-r border-emerald-400/10 p-6">
        <h2 className="text-lg font-semibold mb-6 text-emerald-400">
          Configurações
        </h2>

        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-green-600/20 text-white border border-green-500/30"
                  : "hover:bg-white/5 text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-10 overflow-y-auto">

        {activeTab === "Conta" && <Acount />}
        {activeTab === "Segurança" && <Security />}
        {activeTab === "Plano" && <Plains />}
        {activeTab === "Uso" && <Consume />}

      </div>
    </div>
  );
}

//////////////////// COMPONENTES ////////////////////

function Card({ children }) {
  return (
    <div className="bg-black/60 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-6 shadow-[0_0_25px_#10b98122]">
      {children}
    </div>
  );
}

function Input({ label, type = "text", placeholder }) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 p-3 rounded-xl bg-black text-white border border-emerald-400/20 focus:ring-2 focus:ring-emerald-500 outline-none"
      />
    </div>
  );
}

function Button({ children }) {
  return (
    <button className="mt-4 px-6 py-3 rounded-xl bg-green-700 text-white font-bold hover:scale-[1.01]">
      {children}
    </button>
  );
}

//////////////////// ABAS ////////////////////

function Acount() {
  return (
    <Card>
      <h2 className="text-xl mb-6">Conta</h2>

      <Input label="Nome" placeholder="Seu nome" />
      <Input label="Email" type="email" placeholder="seu@email.com" />

      <Button>Salvar alterações</Button>
    </Card>
  );
}

function Security() {
  return (
    <Card>
      <h2 className="text-xl mb-6">Segurança</h2>

      <Input label="Senha atual" type="password" />
      <Input label="Nova senha" type="password" />
      <Input label="Confirmar senha" type="password" />

      <Button>Alterar senha</Button>

      <button className="mt-6 ml-5 text-red-400 hover:underline">
        Encerrar todas as sessões
      </button>
    </Card>
  );
}

function Plains() {
  return (
    <Card>
      <h2 className="text-xl mb-6">Plano</h2>

      <p className="text-gray-400 mb-2">Plano atual:</p>
      <p className="text-emerald-400 font-semibold mb-4">Basic Anual</p>

      <p className="text-gray-400 mb-2">Validade:</p>
      <p className="mb-6">31/04/2027</p>

      <Button>Fazer upgrade</Button>
    </Card>
  );
}

function Consume() {
  return (
    <Card>
      <h2 className="text-xl mb-6">Uso</h2>

      <div className="mb-4">
        <p className="text-gray-400">Consultas hoje</p>
        <p className="text-emerald-400 text-lg">23 / 100</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-400">Consultas no mês</p>
        <p className="text-emerald-400 text-lg">320</p>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-white/10 rounded-full h-3 mt-4">
        <div className="bg-emerald-500 h-3 rounded-full w-[23%]"></div>
      </div>
    </Card>
  );
}
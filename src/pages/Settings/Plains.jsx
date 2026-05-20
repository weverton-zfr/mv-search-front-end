import { useNavigate } from "react-router"
import ConfigButton from "../../components/ConfigButton"
import ConfigCard from "../../components/ConfigCard"
import { useAuth } from '../../context/AuthContext'

export default function Plains() {
  const navigate = useNavigate()
  const {
    subscription
  } = useAuth()
  const planNames = {
        free: 'Free',
        basic_mensal: 'Basic Mensal',
        basic_trimestral: 'Basic Trimestral',
        anual: 'Plano Anual'
    }
  return (
    <ConfigCard>
      <h2 className="text-xl mb-6">Plano</h2>

      <p className="text-gray-400 mb-2">Plano atual:</p>
      <p className="text-emerald-400 font-semibold mb-4">{planNames[subscription?.plan]}</p>
      {
       subscription.plan !== 'free' ? 
       <>
        <p className="text-gray-400 mb-2">Validade:</p>
        <p className="text-emerald-200 font-semibold mb-6">{
        new Date(subscription.expires_at)
        .toLocaleDateString('pt-BR',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }
        )
      }</p>
      </> : 
      <></>
      }

      

      <ConfigButton
      onClick={() => navigate('/plans')}>Fazer upgrade</ConfigButton>
    </ConfigCard>
  );
}
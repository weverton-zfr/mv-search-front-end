import { supabase } from '../lib/supabase'

function UpgradeButton({ plan, text}) {
const handleUpgrade = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const durations = {
      free: 30,
      basic_mensal: 30,
      basic_trimestral: 90,
      anual: 365
    }

    const days = durations[plan]

    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        plan,
        start_date: new Date(),
        end_date: new Date(Date.now() + days * 86400000)
      })
      .eq('user_id', user.id)
      .select()
    console.log('USER ID:', user.id)
    console.log(data, error)

    if (error) {
      console.log(error.message)
    }
  }

  return (
    <button onClick={handleUpgrade} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors cursor-pointer">
      Assinar {text}
    </button>
  )
}

export default UpgradeButton
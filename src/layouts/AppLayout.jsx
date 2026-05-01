import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Aside from '../components/Aside'
import { Outlet } from 'react-router'
import Login from '../pages/Login'

export default function AppLayout() {

  const [profile, setProfile] = useState(null)
  const [subscription, setSubscription] = useState(null)

useEffect(() => {
  let channel

  async function loadUser(sessionUser) {
    if (!sessionUser) {
      // 🔥 limpa tudo no logout
      setProfile(null)
      setSubscription(null)
      return
    }

    // 👤 profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionUser.id)
      .single()

    // 💳 subscription
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', sessionUser.id)
      .single()

    setProfile(profileData)
    setSubscription(subData)
  }

  // 🔹 pega usuário inicial
  supabase.auth.getUser().then(({ data }) => {
    loadUser(data.user)
  })

  // 🔥 escuta login/logout
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      loadUser(session?.user ?? null)
    }
  )

  return () => {
    listener.subscription.unsubscribe()
    if (channel) supabase.removeChannel(channel)
  }
}, [])

  return (
    <>
      {profile ? 
      <>
        <Aside profile={profile} subscription={subscription}/>
        <Outlet/>
      </> 
      : 
      <Login />}
    </>
  )
}
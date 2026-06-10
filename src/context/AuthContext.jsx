import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { supabase } from '../lib/supabase'
import { api } from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [profile, setProfile] = useState(null)
  const [subscription, setSubscription] = useState(null)

  const [loading, setLoading] = useState(true)
  

  useEffect(() => {

    async function loadUser(session) {

      try {

        if (!session?.access_token) {
          setLoading(false)
          return
        }

        const token = session.access_token
        const { data } = await api.get(
          '/me',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setProfile(data.profile)
        setSubscription(data.subscription)

      } catch (err) {

        console.log(err)

      } finally {

        setLoading(false)

      }

    }

    supabase.auth.getSession()
      .then(({ data }) => {
        loadUser(data.session)
      })

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (_event, session) => { 
          loadUser(session)
        }
      )

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

const fetchProfile = async () => {

  const response = await api.get('/me')

  setProfile(response.data.profile)

}


  return (
    <AuthContext.Provider
    value={{
      profile,
      subscription,
      loading,
      fetchProfile
    }}
  >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
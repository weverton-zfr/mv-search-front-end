import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined) // undefined = carregando

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  if (user === undefined) {
    return <div>Carregando...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
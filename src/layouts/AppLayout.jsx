import { Outlet } from 'react-router'

import Aside from '../components/Aside'
import Login from '../pages/Login'

import { useAuth } from '../context/AuthContext'

export default function AppLayout() {

  const {
    profile,
    loading
  } = useAuth()

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <>
      {profile ? (
        <>
          <Aside />
          <Outlet />
        </>
      ) : (
        <Login />
      )}
    </>
  )
}
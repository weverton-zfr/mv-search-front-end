import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RoutesApp from './routes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
  </ThemeProvider>
  </StrictMode>,
)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['frontend', 'trombone-those-overreact.ngrok-free.dev'],
    hmr: {
      protocol: 'wss',
      host: 'trombone-those-overreact.ngrok-free.dev',
      clientPort: 443
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})

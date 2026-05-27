import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'frontend',
      'trombone-those-overreact.ngrok-free.dev'
    ]
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
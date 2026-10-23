import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Fixed port: the R2 bucket CORS policy allows this exact origin.
    // 5175 instead of Vite's default 5173, which Windows keeps reserved on the dev machine.
    port: 5175,
    strictPort: true,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Cổng frontend
    port: 3001,
    proxy: {
      '/api': {
        // Backend chạy ở cổng 3000
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})

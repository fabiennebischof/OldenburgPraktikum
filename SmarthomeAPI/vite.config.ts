import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_IP = "https://192.168.137.26";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    "/api": {
      target: API_IP,
      changeOrigin: true,
      secure: false
    }}
  },
})

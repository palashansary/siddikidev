import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Firebase Hosting serves the web app config at /__/firebase/init.json.
    // Proxy it in dev so the admin panel works locally without a .env file.
    proxy: {
      '/__': { target: 'https://siddikiansary.web.app', changeOrigin: true },
    },
  },
})

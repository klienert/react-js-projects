import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    cacheDir: '../node_modules/.vite-client', // <-- cache in 'root' node_modules
    envPrefix: 'VITE_',
    server: {
        open: true,
        proxy: {
          "/api": {
            target: "http://localhost:3000",
            changeOrigin: true,
            secure: false
          },
          // socket.io (for later)
          "/socket.io": {
            target: "http://localhost:3000",
            changeOrigin: true,
            secure: false,
          }
        }
    },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const SERVER_URL = 'http://localhost:3000';

export default defineConfig({
    plugins: [react()],
    cacheDir: '../node_modules/.vite-client', // <-- cache in 'root' node_modules
    envPrefix: 'VITE_',
    server: {
        open: true,
        proxy: {
          "/api": {
            target: SERVER_URL,
            changeOrigin: true,
            secure: false
          },
          // socket.io (for later)
          "/socket.io": {
            target: SERVER_URL,
            changeOrigin: true,
            secure: false,
          }
        }
    },
})

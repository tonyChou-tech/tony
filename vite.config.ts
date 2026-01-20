import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tony/', // GitHub repo 名稱
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})

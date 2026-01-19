import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tony-1/', // 替換成你的 GitHub repo 名稱
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})

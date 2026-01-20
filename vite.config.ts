import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          VITE_ADSENSE_CLIENT_ID: process.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-8356436630244164',
        },
      },
    }),
  ],
  base: '/tony/', // GitHub repo 名稱
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})

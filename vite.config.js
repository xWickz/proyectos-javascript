import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import taildwindcss from '@tailwindcss/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served from https://crossfiber.github.io/plant-locker/
  base: '/plant-locker/',
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Three.js is heavy, so it's split into its own chunk that only loads when the
// AI core mounts (see AICore.jsx dynamic import).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2019',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
})

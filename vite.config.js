import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        entryFileNames: `assets/[name].js`, // Ensures .js extension
      }
    }
  }
})
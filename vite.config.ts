import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project sites live under /<repo-name>/.
// Change this if you rename the repository.
export default defineConfig({
  base: '/ournexttrip/',
  plugins: [react(), tailwindcss()],
})

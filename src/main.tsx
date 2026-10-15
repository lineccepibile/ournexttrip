import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/anton'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/caveat'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/manrope'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

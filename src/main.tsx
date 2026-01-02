
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.tsx'
import { MotionConfig, motion } from 'framer-motion';
// import {MotionConfig} from 'motion/react'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig>
        <motion.div viewport={{ once: true }}>
          <App />
        </motion.div>
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>,
)





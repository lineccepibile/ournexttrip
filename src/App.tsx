import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import { Hero } from './components/Hero'
import { MapSection } from './components/MapSection'
import { Worlds } from './components/Worlds'
import { Gallery } from './components/Gallery'
import { Reels } from './components/Reels'
import { Itinerary } from './components/Itinerary'
import { Reality } from './components/Reality'
import { Decision } from './components/Decision'
import { Footer } from './components/Footer'
import { Dock } from './components/Dock'
import { WorldProvider } from './components/ui'

function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg,#a8ecd9,#19c3c0,#ff7a5c,#ff2fa0,#7b3cff,#2f6bff)' }}
    />
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <WorldProvider>
        <div className="grain">
          <Progress />
          <main>
            <Hero />
            <MapSection />
            <Worlds />
            <Gallery />
            <Reels />
            <Itinerary />
            <Reality />
            <Decision />
          </main>
          <Footer />
          <Dock />
        </div>
      </WorldProvider>
    </MotionConfig>
  )
}

import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, ClipboardCheck, Compass, Globe2, Heart, Images, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { scrollToId } from './ui'

const items = [
  { id: 'explore', label: 'Map', icon: Globe2 },
  { id: 'worlds', label: 'Worlds', icon: Compass },
  { id: 'experiences', label: 'Do', icon: Images },
  { id: 'watch', label: 'Watch', icon: Play },
  { id: 'itinerary', label: 'Days', icon: CalendarDays },
  { id: 'practical', label: 'Facts', icon: ClipboardCheck },
  { id: 'decide', label: 'Vote', icon: Heart },
]

/** Floating thumb-reach section nav, shown once the opening screen is scrolled past. */
export function Dock() {
  const [active, setActive] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Sections"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <ul className="flex max-w-full items-center gap-0.5 rounded-full border border-white/15 bg-[#0b0b12]/80 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
            {items.map(({ id, label, icon: Icon }) => {
              const on = active === id
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(id)}
                    aria-label={label}
                    aria-current={on ? 'true' : undefined}
                    className={`relative flex h-11 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-bold transition-colors ${on ? 'text-ink' : 'text-white/65'}`}
                  >
                    {on && (
                      <motion.span
                        layoutId="dock-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(100deg,#a8ecd9,#19c3c0 40%,#8fa8ff)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <Icon className="relative h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
                    {on && <span className="relative hidden min-[400px]:inline">{label}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Plane } from 'lucide-react'
import type { WorldId } from '../data/types'
import { Globe } from './Globe'
import { SectionHead, scrollToId, useWorld } from './ui'

const stops: { id: WorldId; name: string; country: string; line: string; color: string }[] = [
  { id: 'mauritius', name: 'Mauritius', country: 'Island nation · Indian Ocean', line: 'South over the Indian Ocean, non-stop', color: '#19c3c0' },
  { id: 'shenzhen', name: 'Shenzhen', country: 'Guangdong · China', line: 'East to the Pearl River Delta, non-stop', color: '#ff2fa0' },
]

export function MapSection() {
  const [focus, setFocus] = useState<WorldId | null>(null)
  const [zoom, setZoom] = useState(false)
  const { setWorld } = useWorld()
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  /** Spin + zoom the globe onto the destination, then glide to its panel. */
  const flyTo = (id: WorldId) => {
    timers.current.forEach(clearTimeout)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setFocus(id)
    setZoom(true)
    setWorld(id)
    timers.current = [
      window.setTimeout(() => scrollToId('worlds'), reduce ? 0 : 1500),
      window.setTimeout(() => { setZoom(false); setFocus(null) }, reduce ? 400 : 3200),
    ]
  }
  return (
    <section id="explore" className="relative scroll-mt-4 overflow-hidden bg-ink pt-24 md:pt-36">
      <SectionHead index="01" kicker="Where in the world" title={<>Two ways<br /><span className="serif normal-case tracking-normal text-white/80">out of Dubai</span></>}>
        One island in the Indian Ocean. One megacity on China’s south coast. Drag the globe to spin it.
      </SectionHead>

      <div className="gutter mx-auto mt-10 grid max-w-7xl items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Globe focus={focus} zoom={zoom} />
        </motion.div>

        <div className="flex flex-col gap-3">
          {stops.map((s) => {
            const active = focus === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => flyTo(s.id)}
                aria-label={`Fly to ${s.name}`}
                className={`group flex items-center gap-4 rounded-2xl p-4 text-left ring-1 transition-colors md:p-5 ${active ? 'bg-white/10 ring-white/30' : 'bg-white/[0.03] ring-white/10 hover:bg-white/[0.07]'}`}
              >
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: s.color }} />
                  <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: s.color }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`t-${s.id} block ${s.id === 'mauritius' ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>{s.name}</span>
                  <span className="mt-1 block text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: s.color }}>{s.country}</span>
                  <span className="mt-1.5 block text-sm text-white/65">{s.line}</span>
                </span>
                <span className="flex shrink-0 flex-col items-center gap-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/60 group-hover:text-white">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-transform group-hover:-rotate-12 group-active:scale-90" style={{ background: s.color }}>
                    <Plane className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                  </span>
                  Fly there
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

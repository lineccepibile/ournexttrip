import { motion } from 'motion/react'
import { useState } from 'react'
import type { WorldId } from '../data/types'
import { Globe } from './Globe'
import { SectionHead } from './ui'

const stops: { id: WorldId; name: string; country: string; line: string; color: string }[] = [
  { id: 'mauritius', name: 'Mauritius', country: 'Island nation · Indian Ocean', line: 'South over the ocean, ≈ 6h 35m non-stop', color: '#19c3c0' },
  { id: 'shenzhen', name: 'Shenzhen', country: 'Guangdong · China', line: 'East to the Pearl River Delta, ≈ 8h non-stop', color: '#ff2fa0' },
]

export function MapSection() {
  const [focus, setFocus] = useState<WorldId | null>(null)
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
          <Globe focus={focus} />
        </motion.div>

        <div className="flex flex-col gap-3">
          {stops.map((s) => {
            const active = focus === s.id
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFocus(active ? null : s.id)}
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
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45 group-hover:text-white/80">{active ? 'Both' : 'Fly there'}</span>
              </button>
            )
          })}
          <p className="mt-2 text-xs text-white/45">Flight times are typical non-stop Emirates block times. Schedules change, so check before booking.</p>
        </div>
      </div>
    </section>
  )
}

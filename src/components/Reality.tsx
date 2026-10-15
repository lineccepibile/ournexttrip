import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { comparison, practical } from '../data/destinations'
import { namedIcon } from './ui'

export function Reality() {
  return (
    <section id="practical" className="relative bg-paper py-24 text-ink md:py-36">
      <div className="gutter mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="kicker mb-5 flex items-center gap-3 text-ink/55"><span>06</span><span className="h-px w-8 bg-ink/30" />The reality check</p>
          <h2 className="display text-[clamp(2.4rem,8.5vw,7rem)]">The practical stuff.</h2>
          <p className="serif mt-3 text-[clamp(1.5rem,4.5vw,2.6rem)] leading-tight text-ink/75">Because even adventure needs a plan.</p>
        </motion.header>

        <div className="mt-12 overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] ring-1 ring-ink/10">
          <div className="grid grid-cols-2 md:grid-cols-[1fr_1.2fr_1.2fr]">
            <div className="hidden md:block" />
            <div className="bg-[#04363b] px-4 py-4 text-white md:px-6">
              <p className="t-mauritius text-2xl md:text-3xl">Mauritius 🌴</p>
            </div>
            <div className="bg-[#0a0b24] px-4 py-4 text-white md:px-6">
              <p className="t-shenzhen text-base md:text-xl">Shenzhen 🤖</p>
            </div>
          </div>
          {comparison.map((row, i) => {
            const Icon = namedIcon[row.icon]
            return (
              <motion.div
                key={row.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="grid grid-cols-2 border-t border-ink/10 md:grid-cols-[1fr_1.2fr_1.2fr]"
              >
                <div className="col-span-2 flex items-center gap-3 px-4 pt-4 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink/70 md:col-span-1 md:px-6 md:py-5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ background: 'linear-gradient(140deg,#19c3c0,#7b3cff 60%,#ff2fa0)' }}>
                    <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                  </span>
                  {row.label}
                </div>
                <div className="px-4 pb-4 pt-1.5 text-[0.95rem] font-semibold leading-snug md:px-6 md:py-5 md:text-base">{row.mauritius}</div>
                <div className="border-l border-ink/10 px-4 pb-4 pt-1.5 text-[0.95rem] font-semibold leading-snug md:px-6 md:py-5 md:text-base">{row.shenzhen}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(['mauritius', 'shenzhen'] as const).map((id) => {
            const p = practical[id]
            const dark = id === 'mauritius' ? '#04363b' : '#0a0b24'
            return (
              <div key={id} className="rounded-[1.5rem] p-6 text-white md:p-8" style={{ background: dark }}>
                <p className={`s-${id} ${id === 'mauritius' ? 'text-3xl md:text-4xl' : 'text-lg md:text-xl'}`}>{p.summary}</p>
                <p className="mt-5 text-sm leading-relaxed text-white/70">{p.visa}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{p.flight}</p>
                {'drive' in p && <p className="mt-3 text-sm leading-relaxed text-white/70">{p.drive}</p>}
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={p.visaLink} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-1.5 rounded-full bg-white/10 px-4 text-xs font-bold uppercase tracking-[0.12em] hover:bg-white/20">
                    Entry rules <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                  <a href={p.flightLink} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-1.5 rounded-full bg-white/10 px-4 text-xs font-bold uppercase tracking-[0.12em] hover:bg-white/20">
                    Flight info <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-ink/55">
          {practical.weather} No prices are shown on purpose. They change too often to be trusted here. Researched October 2026.
        </p>
      </div>
    </section>
  )
}

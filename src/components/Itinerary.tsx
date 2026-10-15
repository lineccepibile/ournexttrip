import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { worlds } from '../data/destinations'
import { Img, SectionHead, WorldSwitch, theme, useWorld } from './ui'

export function Itinerary() {
  const { world } = useWorld()
  const w = worlds[world]
  const [day, setDay] = useState(0)
  useEffect(() => setDay(0), [world])
  const plan = w.itinerary[day]
  const lead = w.experiences.find((e) => plan.slots.some((s) => s.experienceId === e.id))
  const photo = lead?.photo ?? w.hero

  return (
    <section id="itinerary" className="relative overflow-hidden py-24 md:py-36" style={{ background: world === 'mauritius' ? '#f1dfc0' : '#0a0b24', transition: 'background 1s' }}>
      <div className={world === 'mauritius' ? 'text-ink' : 'text-white'}>
        <SectionHead tone={world === 'mauritius' ? 'dark' : 'light'} index="04" kicker="Five days, sketched" title={<>What our<br />five days<br /><span className="serif normal-case tracking-normal">could look like</span></>}>
            One or two big moments a day. Lots of room for nothing at all.
          </SectionHead>

        <div className="gutter mx-auto mt-10 max-w-7xl">
          <div className={world === 'mauritius' ? 'rounded-full bg-ink/90 inline-block' : 'inline-block'}>
            <WorldSwitch />
          </div>

          <div role="tablist" aria-label="Days" className="mt-8 grid grid-cols-5 gap-1.5 md:gap-3">
            {w.itinerary.map((d, i) => {
              const active = i === day
              return (
                <button
                  key={d.date}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDay(i)}
                  className={`relative min-h-16 rounded-2xl px-1 py-3 text-center transition-colors md:py-4 ${active ? '' : world === 'mauritius' ? 'bg-ink/5 hover:bg-ink/10' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  {active && (
                    <motion.span
                      layoutId="day-pill"
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: world === 'mauritius' ? '#04363b' : 'linear-gradient(140deg,#2f6bff,#7b3cff)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative block text-[0.62rem] font-bold uppercase tracking-[0.18em] ${active ? 'text-white/70' : 'opacity-60'}`}>{d.weekday}</span>
                  <span className={`display relative mt-1 block text-xl md:text-3xl ${active ? 'text-white' : ''}`}>{d.date.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={world + day}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 grid overflow-hidden rounded-[1.75rem] md:grid-cols-[1.1fr_1fr]"
              style={{ background: world === 'mauritius' ? '#04363b' : '#14143a' }}
              role="tabpanel"
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[440px]">
                <Img photo={photo} world={world} kenburns />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                <p className="kicker absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur-md">
                  Day {day + 1} · {plan.weekday} {plan.date}
                </p>
              </div>
              <div className="flex flex-col p-6 text-white md:p-10">
                <h3 className={`display text-[clamp(2.2rem,8vw,4rem)] ${theme[world].textGradient}`}>{plan.title}</h3>
                <p className="serif mt-2 text-2xl text-white/85">{plan.mood}</p>
                <ol className="mt-7 space-y-5">
                  {plan.slots.map((s) => (
                    <li key={s.text} className="grid grid-cols-[5.5rem_1fr] gap-3 border-t border-white/15 pt-4">
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: theme[world].accent2 }}>{s.time}</span>
                      <span className="text-base leading-snug text-white/90">{s.text}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-auto pt-8 text-xs text-white/50">Inspiration only. Nothing is booked, and flight and ticket times still need confirming.</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex justify-between">
            <button type="button" disabled={day === 0} onClick={() => setDay(day - 1)} className="min-h-11 px-2 text-sm font-semibold opacity-80 disabled:opacity-25">← Previous day</button>
            <button type="button" disabled={day === w.itinerary.length - 1} onClick={() => setDay(day + 1)} className="min-h-11 px-2 text-sm font-semibold opacity-80 disabled:opacity-25">Next day →</button>
          </div>
        </div>
      </div>
    </section>
  )
}

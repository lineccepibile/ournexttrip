import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { worlds } from '../data/destinations'
import type { Experience, WorldId } from '../data/types'
import { IconBadge, Img, Instagram, LoopVideo, SectionHead, WorldSwitch, categoryIcon, categoryLabel, theme, useWorld } from './ui'

function Card({ exp, world, index }: { exp: Experience; world: WorldId; index: number }) {
  const Icon = categoryIcon[exp.category]
  const t = theme[world]
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: Math.min(index, 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[4/5.6] w-[80vw] max-w-[420px] shrink-0 overflow-hidden rounded-[1.5rem] ring-1 ring-white/10 sm:w-[46vw] lg:w-[30vw]"
    >
      <Img photo={exp.photo} world={world} className="transition-transform duration-[1.6s] ease-out group-hover:scale-105" sizes="(min-width:1024px) 30vw, 80vw" />
      {exp.video && <LoopVideo src={exp.video} poster={exp.photo.src} />}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
        <span className="flex items-center gap-2.5 rounded-full bg-black/45 py-1 pl-1 pr-4 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-md">
          <IconBadge icon={Icon} world={world} size="md" solid />
          {categoryLabel[exp.category]}
        </span>
        <span className="mt-1.5 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-2 text-xs font-bold text-white backdrop-blur-md">
          <Clock className="h-4 w-4" style={{ color: t.accent }} aria-hidden />
          {exp.duration}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em]" style={{ color: t.accent }}>
          {String(index + 1).padStart(2, '0')} · {exp.place}
        </p>
        <h3 className={`t-${world} mt-2 ${world === 'mauritius' ? 'text-[clamp(2rem,8.4vw,2.7rem)]' : 'text-[clamp(1.25rem,5.4vw,1.7rem)]'}`}>{exp.title}</h3>
        <p className="mt-2.5 text-sm leading-snug text-white/80">{exp.line}</p>
        {exp.status && (
          <p className="mt-3 inline-flex rounded-md border border-white/20 px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-white/70">
            {exp.status}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={exp.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-extrabold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            {exp.link.label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
          {exp.reel && (
            <a
              href={exp.reel}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1.5 rounded-full border border-white/30 px-4 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md"
            >
              <Instagram className="h-3.5 w-3.5" aria-hidden /> Reel
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Gallery() {
  const { world } = useWorld()
  const data = worlds[world]
  const track = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: 0 })
    setPos(0)
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null
      if (!first) return
      setPos(Math.round(el.scrollLeft / (first.offsetWidth + 16)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [world])

  const step = (dir: 1 | -1) => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (el && first) el.scrollBy({ left: dir * (first.offsetWidth + 16), behavior: 'smooth' })
  }

  return (
    <section id="experiences" className="relative scroll-mt-4 overflow-hidden py-24 md:py-36">
      {/* Background crossfades between worlds */}
      <AnimatePresence initial={false}>
        <motion.div
          key={world}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
          style={{
            background:
              world === 'mauritius'
                ? 'radial-gradient(120% 60% at 0% 0%, #0b5d5c 0%, transparent 60%), radial-gradient(90% 60% at 100% 100%, rgba(255,122,92,.35) 0%, transparent 60%), #04262a'
                : 'radial-gradient(120% 60% at 100% 0%, #2a1a7a 0%, transparent 60%), radial-gradient(90% 60% at 0% 100%, rgba(255,47,160,.25) 0%, transparent 60%), #0a0b24',
          }}
        />
      </AnimatePresence>

      <SectionHead
        index="03"
        kicker="Experience gallery"
        title={<>What we<br /><span className={theme[world].textGradient}>could do</span></>}
      >
        Real places, real links. Swipe through, tap to look closer.
      </SectionHead>

      <div className="gutter mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <WorldSwitch />
        <div className="flex items-center gap-3">
          <span className="text-sm tabular-nums text-white/60" aria-live="polite">
            {String(Math.min(pos + 1, data.experiences.length)).padStart(2, '0')} / {String(data.experiences.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => step(-1)} aria-label="Previous experience" className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-ink sm:flex">
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next experience" className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-ink sm:flex">
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={track}
        key={world}
        className="snap-track mt-8 gap-4 px-[10vw] pb-4 sm:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        aria-label={`${data.name} experiences`}
      >
        {data.experiences.map((exp, i) => (
          <Card key={exp.id} exp={exp} world={world} index={i} />
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <div className="gutter mx-auto mt-5 max-w-7xl">
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: world === 'mauritius' ? 'linear-gradient(90deg,#a8ecd9,#ff7a5c)' : 'linear-gradient(90deg,#2f6bff,#ff2fa0)' }}
            animate={{ width: `${((Math.min(pos, data.experiences.length - 1) + 1) / data.experiences.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </div>
        <p className="mt-4 text-xs text-white/45">
          Links go to the attraction or a booking site. Nothing is booked yet. Anything marked “Schedule to be confirmed” has no published December 2026 dates.
        </p>
      </div>
    </section>
  )
}

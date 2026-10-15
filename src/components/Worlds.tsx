import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { mauritius, practical, shenzhen } from '../data/destinations'
import type { World } from '../data/types'
import { IconBadge, Img, SectionHead, namedIcon, scrollToId, theme, useWorld } from './ui'

function Panel({ world }: { world: World }) {
  const { setWorld } = useWorld()
  const t = theme[world.id]
  return (
    <article
      className="relative flex w-[86vw] max-w-[640px] shrink-0 flex-col overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 md:w-auto md:max-w-none"
      style={{ background: t.bg }}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Img photo={world.hero} world={world.id} kenburns sizes="(min-width:768px) 50vw, 86vw" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 35%, ${t.bg})` }} />
        <div className="absolute bottom-0 left-0 p-5 md:p-8">
          <p className="kicker text-white/70">{world.escape}</p>
          <h3 className={`t-${world.id} mt-2 ${world.id === 'mauritius' ? 'text-[clamp(3rem,13vw,6rem)]' : 'text-[clamp(1.9rem,8.4vw,4rem)]'} ${t.textGradient}`}>{world.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-5 pt-2 md:p-8 md:pt-2">
        <p className={`s-${world.id} text-white ${world.id === 'mauritius' ? 'text-4xl md:text-5xl' : 'text-lg md:text-xl'}`}>{world.tagline}</p>

        <dl className="grid grid-cols-2 gap-2.5">
          {world.stats.map((s, i) => {
            const Icon = namedIcon[s.icon]
            return (
              <div key={s.label} className={`rounded-2xl bg-white/[0.06] p-3.5 ring-1 ring-white/10 ${i === world.stats.length - 1 ? 'col-span-2' : ''}`}>
                <dt className="flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/60">
                  <IconBadge icon={Icon} world={world.id} size="sm" />
                  {s.label}
                </dt>
                <dd className="mt-1.5 text-lg font-bold leading-tight text-white">{s.value}</dd>
                {s.note && <dd className="mt-0.5 text-xs leading-snug text-white/55">{s.note}</dd>}
              </div>
            )
          })}
        </dl>

        <ul className="space-y-2">
          {world.highlights.map((h) => (
            <li key={h} className="flex items-center gap-3 text-[0.98rem] font-medium text-white/90">
              <span className="mt-[-2px]"><IconBadge icon={Sparkles} world={world.id} size="sm" solid /></span>
              {h}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => { setWorld(world.id); scrollToId('experiences') }}
          className="group mt-auto flex min-h-12 items-center justify-between rounded-full px-5 text-sm font-extrabold uppercase tracking-[0.16em] text-ink transition-transform active:scale-[0.98]"
          style={{ background: world.id === 'mauritius' ? 'linear-gradient(100deg,#a8ecd9,#19c3c0)' : 'linear-gradient(100deg,#c9ced8,#8fa8ff)' }}
        >
          Explore {world.name}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </button>
      </div>
    </article>
  )
}

export function Worlds() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const first = el.children[0] as HTMLElement | undefined
      if (!first) return
      setActive(Math.round(el.scrollLeft / (first.offsetWidth + 12)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const go = (i: number) => {
    const el = track.current
    const child = el?.children[i] as HTMLElement | undefined
    if (el && child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: 'smooth' })
  }

  return (
    <section id="worlds" className="relative scroll-mt-4 bg-ink py-24 md:py-36">
      <SectionHead index="02" kicker="The contenders" title={<>Pick a world<br /><span className="serif normal-case tracking-normal text-white/80">to explore</span></>}>
        Two very different ways to spend five days. Swipe between them.
      </SectionHead>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-12 max-w-7xl md:gutter"
      >
        <div
          ref={track}
          className="snap-track gap-3 px-[7vw] pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0"
          aria-label="Destinations"
        >
          <Panel world={mauritius} />
          <Panel world={shenzhen} />
        </div>

        <div className="mt-6 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Destination slides">
          {[mauritius, shenzhen].map((w, i) => (
            <button
              key={w.id}
              role="tab"
              aria-selected={active === i}
              aria-label={`Show ${w.name}`}
              onClick={() => go(i)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-white' : 'w-1.5 bg-white/35'}`} />
            </button>
          ))}
        </div>

        <p className="gutter mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-white/50 md:mt-12">
          {practical.weather} Visa notes are general guidance, not legal advice. See “The practical stuff” below for sources.
        </p>
      </motion.div>
    </section>
  )
}

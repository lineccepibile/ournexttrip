import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, Bot, Palmtree } from 'lucide-react'
import { useRef } from 'react'
import { mauritius, shenzhen } from '../data/destinations'
import { siteConfig } from '../config'
import type { World } from '../data/types'
import { IconBadge, Img, scrollToId } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  )
}

function DestinationCard({ world, delay }: { world: World; delay: number }) {
  const isM = world.id === 'mauritius'
  return (
    <motion.button
      type="button"
      onClick={() => scrollToId('explore')}
      initial={{ opacity: 0, y: 60, rotate: isM ? -3 : 3 }}
      animate={{ opacity: 1, y: 0, rotate: isM ? -1.5 : 1.5 }}
      whileHover={{ rotate: 0, scale: 1.02, y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 1.1, delay, ease }}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] text-left shadow-2xl shadow-black/60 ring-1 ring-white/10 md:aspect-[4/5] md:rounded-[1.75rem]"
      aria-label={`${world.name} — ${world.escape}`}
    >
      <Img photo={world.hero} world={world.id} kenburns eager sizes="(min-width:768px) 40vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
      <div
        className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: isM ? 'linear-gradient(180deg,transparent,#ff7a5c)' : 'linear-gradient(180deg,transparent,#ff2fa0)' }}
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-end gap-2 p-3 sm:justify-between md:p-5">
        <span className="kicker hidden truncate rounded-full bg-black/35 px-2.5 py-1.5 text-[0.6rem] sm:inline text-white/90 backdrop-blur-md md:text-[0.68rem]">
          {world.escape}
        </span>
        <IconBadge icon={isM ? Palmtree : Bot} world={world.id} size="md" solid />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-6">
        <p className={`t-${world.id} ${isM ? 'text-gradient-mru text-[clamp(1.7rem,8vw,4.2rem)]' : 'text-gradient-szx text-[clamp(1.05rem,5vw,2.9rem)]'}`}>{world.name}</p>
        <p className={`s-${world.id} mt-1.5 leading-tight text-white/90 ${isM ? 'text-[clamp(1.15rem,4.6vw,2rem)]' : 'text-[clamp(0.66rem,2.6vw,1.05rem)]'}`}>{world.slogan}</p>
      </div>
    </motion.button>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink pb-16 pt-[max(1.5rem,env(safe-area-inset-top))]">
      {/* Aurora — one warm, one electric */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-1/3 h-[70vmax] w-[70vmax] rounded-full opacity-25 blur-3xl" style={{ background: 'radial-gradient(circle, #19c3c0, transparent 60%)' }} />
        <div className="absolute -right-1/4 top-0 h-[70vmax] w-[70vmax] rounded-full opacity-25 blur-3xl" style={{ background: 'radial-gradient(circle, #7b3cff, transparent 60%)' }} />
      </div>

      <motion.div style={{ y, opacity: fade }} className="gutter mx-auto flex max-w-7xl flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="kicker flex items-center justify-between text-white/55"
        >
          <span>{siteConfig.partnerName ? `An invitation for ${siteConfig.partnerName}` : 'An invitation'}</span>
          <span className="tabular-nums">{siteConfig.dates.label}</span>
        </motion.div>

        <h1 className="display mt-[9svh] text-[clamp(4.2rem,20vw,10.5rem)] md:mt-[8svh]">
          <Line text="Two worlds." delay={0.25} />
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 0.45, ease }}>
              <span className="text-gradient-mru">One</span> <span className="text-gradient-szx">escape.</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
          className="serif mt-6 max-w-md text-[clamp(1.35rem,4.6vw,2.1rem)] leading-[1.15] text-white/85"
        >
          {siteConfig.dates.short}. You, me, and somewhere new.
        </motion.p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:gap-8 md:px-[6vw]">
          <DestinationCard world={mauritius} delay={1.05} />
          <DestinationCard world={shenzhen} delay={1.2} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease }}
          className="mt-10 flex flex-col items-center gap-4 md:mt-14"
        >
          <p className="kicker text-white/45">Five days · Two destinations · One impossible decision</p>
          <motion.button
            type="button"
            onClick={() => scrollToId('explore')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-full p-px"
          >
            <span aria-hidden className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(100deg,#a8ecd9,#19c3c0,#ff7a5c,#ff2fa0,#7b3cff,#2f6bff)' }} />
            <span className="relative flex min-h-14 items-center gap-3 rounded-full bg-ink px-7 text-[0.8rem] font-extrabold uppercase tracking-[0.2em] text-white transition-colors group-hover:bg-ink/70">
              Show me the possibilities
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

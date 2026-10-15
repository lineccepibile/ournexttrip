import { motion } from 'motion/react'
import { Play } from 'lucide-react'
import { worlds } from '../data/destinations'
import { reels } from '../data/reels'
import type { Photo } from '../data/types'
import { Img, Instagram, SectionHead, WorldSwitch, theme, useWorld } from './ui'

const toPhoto = (thumb: string | undefined, fallback: Photo, alt: string): Photo =>
  thumb ? { src: /^https?:/.test(thumb) ? thumb : `${import.meta.env.BASE_URL}${thumb}`, alt, fallbacks: [fallback.src] } : { ...fallback, alt }

export function Reels() {
  const { world, setWorld } = useWorld()
  const other = world === 'mauritius' ? 'shenzhen' : 'mauritius'
  const otherCount = reels.filter((r) => r.world === other).length
  const list = reels.filter((r) => r.world === world)
  const w = worlds[world]

  return (
    <section id="watch" className="relative bg-ink py-24 md:py-36">
      <SectionHead index="04" kicker="Watch the experience" title={<>Press<br /><span className="serif normal-case tracking-normal">play</span> <span className={theme[world].textGradient}>on it</span></>}>
        Little films that sold me on each idea. Tap one to watch it on Instagram.
      </SectionHead>

      <div className="gutter mx-auto mt-10 max-w-7xl">
        <WorldSwitch />
      </div>

      {list.length > 0 ? (
        <div className="snap-track mt-8 gap-3 px-[max(1rem,calc((100vw-80rem)/2+2.5rem))] pb-4">
          {list.map((r, i) => (
            <motion.a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.06 }}
              className="group relative aspect-[9/16] w-[62vw] max-w-[300px] shrink-0 overflow-hidden rounded-[1.4rem] ring-1 ring-white/10"
            >
              <Img photo={toPhoto(r.thumbnail, w.experiences[i % w.experiences.length].photo, r.title)} world={world} className="transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] backdrop-blur-md">
                <Instagram className="h-3.5 w-3.5" aria-hidden /> Reel
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-transform group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 fill-white" aria-hidden />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em]" style={{ color: theme[world].accent }}>{w.name}</p>
                <p className="mt-1 text-lg font-bold leading-tight">{r.title}</p>
                <p className="mt-1 text-sm leading-snug text-white/75">{r.caption}</p>
                <p className="mt-2 text-xs font-semibold text-white/60">{r.credit ? `${r.credit} · ` : ''}Watch on Instagram ↗</p>
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="gutter mx-auto mt-8 max-w-7xl">
          <div className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-white/10">
            <div className="relative grid grid-cols-3 gap-px opacity-60 md:grid-cols-5">
              {w.experiences.slice(0, 5).map((e, i) => (
                <div key={e.id} className={`relative aspect-[9/16] ${i > 2 ? 'hidden md:block' : ''}`}>
                  <Img photo={e.photo} world={world} />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 p-6 text-center backdrop-blur-[2px]">
              <Instagram className="h-8 w-8" aria-hidden />
              <p className="display mt-4 text-3xl md:text-5xl">Reels incoming</p>
              <p className="serif mt-2 text-xl text-white/80">The best {w.name} clips are being hand-picked.</p>
              {otherCount > 0 && (
                <button type="button" onClick={() => setWorld(other)} className="mt-6 flex min-h-11 items-center rounded-full bg-white px-5 text-xs font-extrabold uppercase tracking-[0.16em] text-ink">
                  Watch {otherCount} {worlds[other].name} reels
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

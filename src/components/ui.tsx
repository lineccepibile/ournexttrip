import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  Anchor, Building2, CloudRain, Compass, Cpu, Fish, Gamepad2, Landmark, Leaf, Moon, Palette,
  Plane, ShoppingBag, Sparkles, Stamp, Sun, Theater, Thermometer, Trees, Umbrella, Utensils, Waves,
  type LucideIcon,
} from 'lucide-react'
import type { Category, Photo, WorldId } from '../data/types'

/* ---------- Shared "which world are we looking at" state ---------- */

const WorldCtx = createContext<{ world: WorldId; setWorld: (w: WorldId) => void }>({
  world: 'mauritius',
  setWorld: () => {},
})
export function WorldProvider({ children }: { children: ReactNode }) {
  const [world, setWorld] = useState<WorldId>('mauritius')
  return <WorldCtx.Provider value={{ world, setWorld }}>{children}</WorldCtx.Provider>
}
export const useWorld = () => useContext(WorldCtx)

/* ---------- Icons ---------- */

export const categoryIcon: Record<Category, LucideIcon> = {
  sail: Anchor, flight: Plane, nature: Leaf, beach: Umbrella, culture: Landmark, theatre: Theater,
  dining: Utensils, play: Gamepad2, tech: Cpu, shopping: ShoppingBag, art: Palette, night: Moon,
  wildlife: Fish, coast: Compass,
}
export const categoryLabel: Record<Category, string> = {
  sail: 'Sail', flight: 'Fly', nature: 'Nature', beach: 'Beach', culture: 'Culture', theatre: 'Theatre',
  dining: 'Dine', play: 'Play', tech: 'Tech', shopping: 'Shop', art: 'Art', night: 'Night',
  wildlife: 'Wildlife', coast: 'Explore',
}
export const namedIcon: Record<string, LucideIcon> = {
  sun: Sun, waves: Waves, rain: CloudRain, plane: Plane, passport: Stamp, thermometer: Thermometer,
  'cloud-rain': CloudRain, stamp: Stamp, sparkles: Sparkles, trees: Trees, utensils: Utensils, building: Building2,
}

/* ---------- Theme tokens per world ---------- */

export const theme = {
  mauritius: {
    gradient: 'linear-gradient(135deg, #04363b 0%, #0b6d6b 40%, #19c3c0 70%, #ff7a5c 100%)',
    bg: '#04262a',
    accent: '#19c3c0',
    accent2: '#ff7a5c',
    textGradient: 'text-gradient-mru',
  },
  shenzhen: {
    gradient: 'linear-gradient(135deg, #0a0b24 0%, #1a1a6b 40%, #7b3cff 72%, #ff2fa0 100%)',
    bg: '#0a0b24',
    accent: '#2f6bff',
    accent2: '#ff2fa0',
    textGradient: 'text-gradient-szx',
  },
} as const

/* ---------- Image with fallbacks, lazy loading and a designed placeholder ---------- */

export function Img({
  photo, world, className = '', kenburns = false, eager = false, sizes,
}: { photo: Photo; world: WorldId; className?: string; kenburns?: boolean; eager?: boolean; sizes?: string }) {
  const sources = [photo.src, ...(photo.fallbacks ?? [])]
  const [i, setI] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const failed = i >= sources.length
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ background: theme[world].gradient }}>
      {/* Designed placeholder (also the permanent fallback if every image fails) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            world === 'mauritius'
              ? 'radial-gradient(120% 80% at 80% 110%, rgba(255,122,92,.55), transparent 60%), radial-gradient(90% 70% at 10% 0%, rgba(168,236,217,.35), transparent 60%)'
              : 'radial-gradient(100% 70% at 85% 0%, rgba(255,47,160,.45), transparent 60%), radial-gradient(90% 80% at 0% 100%, rgba(47,107,255,.5), transparent 60%)',
        }}
      />
      {!failed && (
        <img
          key={sources[i]}
          src={sources[i]}
          alt={photo.alt}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          // @ts-expect-error fetchpriority is valid HTML
          fetchpriority={eager ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(false); setI((n) => n + 1) }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} ${kenburns ? 'kenburns' : ''}`}
          style={{ objectPosition: photo.position ?? 'center' }}
        />
      )}
      {failed && <span className="sr-only">{photo.alt}</span>}
    </div>
  )
}

/* ---------- Muted looping video that only plays on screen (photo is poster/fallback) ---------- */

export function LoopVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ok, setOk] = useState(true)
  useEffect(() => {
    const v = ref.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  if (!ok) return null
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      onError={() => setOk(false)}
    />
  )
}

/* ---------- Section heading ---------- */

export function SectionHead({ index, kicker, title, children, align = 'left', tone = 'light' }: {
  index: string; kicker: string; title: ReactNode; children?: ReactNode; align?: 'left' | 'center'; tone?: 'light' | 'dark'
}) {
  const d = tone === 'dark'
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`gutter mx-auto max-w-7xl ${align === 'center' ? 'text-center' : ''}`}
    >
      <p className={`kicker mb-5 flex items-center gap-3 ${d ? 'text-ink/60' : 'text-white/60'}`} style={align === 'center' ? { justifyContent: 'center' } : undefined}>
        <span className={`tabular-nums ${d ? 'text-ink/40' : 'text-white/40'}`}>{index}</span>
        <span className={`h-px w-8 ${d ? 'bg-ink/30' : 'bg-white/30'}`} />
        {kicker}
      </p>
      <h2 className="display text-[clamp(2.6rem,9vw,7.5rem)]">{title}</h2>
      {children && <div className={`mt-5 max-w-xl text-base md:text-lg ${d ? 'text-ink/70' : 'text-white/70'} ${align === 'center' ? 'mx-auto' : ''}`}>{children}</div>}
    </motion.header>
  )
}

/* ---------- Mauritius / Shenzhen segmented switch ---------- */

export function WorldSwitch({ className = '' }: { className?: string }) {
  const { world, setWorld } = useWorld()
  const opts: { id: WorldId; label: string; emoji: string }[] = [
    { id: 'mauritius', label: 'Mauritius', emoji: '🌴' },
    { id: 'shenzhen', label: 'Shenzhen', emoji: '🤖' },
  ]
  return (
    <div role="tablist" aria-label="Choose destination" className={`relative inline-flex rounded-full border border-white/15 bg-black/30 p-1 backdrop-blur-md ${className}`}>
      {opts.map((o) => {
        const active = world === o.id
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => setWorld(o.id)}
            className={`relative z-10 flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors md:px-5 ${active ? 'text-ink' : 'text-white/70 hover:text-white'}`}
          >
            {active && (
              <motion.span
                layoutId="world-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: o.id === 'mauritius' ? 'linear-gradient(100deg,#a8ecd9,#19c3c0)' : 'linear-gradient(100deg,#c9ced8,#8fa8ff)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span aria-hidden>{o.emoji}</span>
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

/** Simple camera-glyph (Lucide no longer ships brand logos). */
export function Instagram({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

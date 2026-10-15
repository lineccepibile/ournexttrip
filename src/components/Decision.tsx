import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Copy, Dices, MessageCircle, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { siteConfig } from '../config'
import { worlds } from '../data/destinations'
import type { WorldId } from '../data/types'
import { Img, theme } from './ui'

const choices: { id: WorldId; line: string }[] = [
  { id: 'mauritius', line: 'Take me to paradise.' },
  { id: 'shenzhen', line: 'Take me to the future.' },
]

function whatsappUrl(text: string) {
  const n = siteConfig.whatsappNumber.replace(/\D/g, '')
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

function Burst({ id }: { id: WorldId }) {
  const reduce = useReducedMotion()
  const bits = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        x: (Math.random() - 0.5) * 100,
        d: 2.6 + Math.random() * 2.4,
        delay: Math.random() * 0.8,
        s: 0.8 + Math.random() * 1.4,
        e: (id === 'mauritius' ? ['🌴', '🌊', '🐚', '☀️', '🍹'] : ['🤖', '✨', '🌃', '⚡', '🛸'])[i % 5],
      })),
    [id],
  )
  if (reduce) return null
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[-10%] left-1/2 select-none"
          style={{ fontSize: `${b.s * 1.6}rem` }}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
          animate={{ x: `${b.x}vw`, y: '-115vh', opacity: [0, 1, 1, 0], rotate: b.x * 4 }}
          transition={{ duration: b.d, delay: b.delay, ease: [0.2, 0.7, 0.3, 1] }}
        >
          {b.e}
        </motion.span>
      ))}
    </div>
  )
}

function Reveal({ id, surprised, onClose }: { id: WorldId; surprised: boolean; onClose: () => void }) {
  const w = worlds[id]
  const message = siteConfig.messages[id]
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`You chose ${w.name}`}
      className="fixed inset-0 z-50 overflow-y-auto"
      initial={{ clipPath: 'circle(0% at 50% 60%)' }}
      animate={{ clipPath: 'circle(150% at 50% 60%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      style={{ background: theme[id].bg }}
    >
      <div className="absolute inset-0">
        <Img photo={w.hero} world={id} kenburns eager />
        <div className="absolute inset-0" style={{ background: id === 'mauritius' ? 'linear-gradient(180deg, rgba(4,54,59,.55), rgba(4,38,42,.92))' : 'linear-gradient(180deg, rgba(10,11,36,.5), rgba(10,11,36,.94))' }} />
      </div>
      <Burst id={id} />

      <div className="gutter relative mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center py-16 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="kicker text-white/70">
          {surprised ? 'Fate has spoken' : 'Decision made'}
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`display mt-4 text-[clamp(3.4rem,17vw,10rem)] ${theme[id].textGradient}`}
        >
          {w.name}
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="serif mt-3 text-[clamp(1.5rem,5vw,2.4rem)] leading-tight">
          {id === 'mauritius' ? 'Paradise it is.' : 'The future it is.'}
          {siteConfig.partnerName && <> Good call, {siteConfig.partnerName}.</>}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-4 max-w-md text-base text-white/75">
          {w.closing}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }} className="mt-9 flex w-full max-w-sm flex-col gap-3">
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-white text-sm font-extrabold uppercase tracking-[0.18em] text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden /> Send my choice
          </a>
          <button
            type="button"
            onClick={async () => setCopied(await copyText(message))}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md hover:bg-white/10"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
            {copied ? 'Copied. Paste it anywhere' : 'No WhatsApp? Copy the message'}
          </button>
          <p className="text-xs text-white/55">“{message}”. This opens WhatsApp with the message ready to send. Nothing is saved anywhere.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1.2 }} className="mt-14 border-t border-white/15 pt-8">
          <p className="serif text-[clamp(1.4rem,4.6vw,2.2rem)] leading-snug text-white/90">
            The best part isn’t where we go.<br />It’s that we’re going together.
          </p>
        </motion.div>

        <button type="button" onClick={onClose} className="mt-10 flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/60 hover:text-white">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Change my mind
        </button>
      </div>
    </motion.div>
  )
}

export function Decision() {
  const [choice, setChoice] = useState<WorldId | null>(null)
  const [surprised, setSurprised] = useState(false)
  const [shuffling, setShuffling] = useState<WorldId | null>(null)
  const reduce = useReducedMotion()

  const surprise = () => {
    if (shuffling) return
    const final: WorldId = Math.random() < 0.5 ? 'mauritius' : 'shenzhen'
    if (reduce) { setSurprised(true); setChoice(final); return }
    let n = 0
    const total = 12 + (final === 'shenzhen' ? 1 : 0)
    const tick = () => {
      n++
      setShuffling(n % 2 ? 'shenzhen' : 'mauritius')
      if (n < total) setTimeout(tick, 70 + n * n * 2.2)
      else setTimeout(() => { setShuffling(null); setSurprised(true); setChoice(final) }, 450)
    }
    tick()
  }

  return (
    <section id="decide" className="relative bg-ink pb-[max(4rem,env(safe-area-inset-bottom))] pt-24 md:pt-36">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="gutter mx-auto max-w-7xl text-center"
      >
        <p className="kicker text-white/55">06 · The final decision</p>
        <h2 className="display mt-5 text-[clamp(2.6rem,10vw,8.5rem)]">
          So… where are we <span className="serif normal-case tracking-normal text-gradient-mru">disap</span><span className="serif normal-case tracking-normal text-gradient-szx">pearing</span> to?
        </h2>
      </motion.header>

      <div className="mt-12 flex flex-col gap-2 md:mt-16">
        {choices.map(({ id, line }) => {
          const w = worlds[id]
          const lit = shuffling === id
          const dim = shuffling !== null && !lit
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => { setSurprised(false); setChoice(id) }}
              whileTap={{ scale: 0.985 }}
              className="group relative block h-[38svh] min-h-[260px] w-full overflow-hidden text-left md:h-[46vh]"
              animate={{ opacity: dim ? 0.35 : 1 }}
              aria-label={`${line} ${w.name}`}
            >
              <Img photo={w.hero} world={id} className="transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-70" style={{ background: id === 'mauritius' ? 'linear-gradient(90deg, rgba(4,54,59,.9), rgba(4,54,59,.25))' : 'linear-gradient(270deg, rgba(10,11,36,.92), rgba(10,11,36,.25))' }} />
              {lit && <div className="absolute inset-0 ring-4 ring-inset" style={{ ['--tw-ring-color' as string]: theme[id].accent2 }} />}
              <div className={`gutter absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center ${id === 'shenzhen' ? 'items-end text-right' : ''}`}>
                <p className="kicker text-white/75">{w.emoji} {w.name}</p>
                <p className="display mt-3 max-w-[12ch] text-[clamp(2.3rem,9vw,6.5rem)] transition-transform duration-700 group-hover:translate-x-2">
                  {line}
                </p>
                <span className={`mt-5 inline-flex min-h-11 items-center rounded-full bg-white/15 ${id === 'shenzhen' ? 'self-end' : 'self-start'} px-5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-ink`}>
                  Choose {w.name}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={surprise}
          disabled={!!shuffling}
          className="group flex min-h-12 items-center gap-2.5 rounded-full border border-white/25 px-6 text-xs font-bold uppercase tracking-[0.2em] text-white/85 transition-colors hover:bg-white hover:text-ink disabled:opacity-60"
        >
          <Dices className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" aria-hidden />
          {shuffling ? 'Spinning…' : 'Surprise me'}
        </button>
      </div>

      <AnimatePresence>{choice && <Reveal key={choice} id={choice} surprised={surprised} onClose={() => setChoice(null)} />}</AnimatePresence>
    </section>
  )
}

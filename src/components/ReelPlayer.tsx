import { motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Reel } from '../data/reels'

/** Instagram's official embed page for a public post/Reel. */
export function embedUrl(url: string) {
  const m = url.match(/instagram\.com\/(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/)
  if (!m) return null
  const kind = m[1] === 'reels' ? 'reel' : m[1]
  return `https://www.instagram.com/${kind}/${m[2]}/embed/`
}

export function ReelPlayer({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  const src = embedUrl(reel.url)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[94svh] w-full max-w-[440px] flex-col overflow-hidden rounded-t-[1.75rem] bg-[#111118] sm:rounded-[1.75rem]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="mx-auto h-1 w-10 rounded-full bg-white/25 sm:hidden" aria-hidden />
        </div>
        <div className="flex items-center justify-between gap-3 px-4 pb-3">
          <p className="min-w-0 truncate text-sm font-bold">{reel.title}</p>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto bg-white" style={{ WebkitOverflowScrolling: 'touch' }}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#111118] text-sm text-white/60">Loading the Reel…</div>
          )}
          {src && (
            <iframe
              src={src}
              title={reel.title}
              className="block h-[min(78svh,760px)] w-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
              loading="eager"
              onLoad={() => setLoaded(true)}
            />
          )}
        </div>

        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/70 hover:text-white"
        >
          Not playing? Open in Instagram <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </motion.div>
    </motion.div>
  )
}

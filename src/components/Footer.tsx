import { allPhotos } from '../data/photos'

export function Footer() {
  const unique = Array.from(new Map(allPhotos.filter((p) => p.credit).map((p) => [p.credit!.href, p.credit!])).values())
  return (
    <footer className="gutter mx-auto max-w-7xl border-t border-white/10 pb-28 pt-10 text-xs text-white/40">
      <p className="display text-lg text-white/70">Two worlds. One escape.</p>
      <p className="mt-2">A personal invitation, made with love. Not affiliated with any venue, airline or booking site.</p>
      <details className="mt-5">
        <summary className="cursor-pointer select-none py-2 font-semibold text-white/55 hover:text-white">Photo credits</summary>
        <p className="mt-2">Photos from Wikimedia Commons under free licences. Each link shows the author and licence.</p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {unique.map((c) => (
            <li key={c.href} className="truncate">
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white">
                {c.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </footer>
  )
}

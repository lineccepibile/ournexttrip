import { Plane } from 'lucide-react'
import type { Flight, WorldId } from '../data/types'
import { theme } from './ui'

function Leg({ f, world }: { f: Flight; world: WorldId }) {
  const t = theme[world]
  return (
    <div className="px-4 py-3.5">
      <div className="flex items-center justify-between text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/55">
        <span style={{ color: f.leg === 'Outbound' ? t.accent : t.accent2 }}>{f.leg}</span>
        <span>{f.date}</span>
      </div>
      <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <div>
          <p className="text-[1.65rem] font-extrabold leading-none tabular-nums">{f.dep}</p>
          <p className="mt-1 text-xs font-bold tracking-[0.12em] text-white/70">{f.from}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.66rem] font-semibold text-white/60">{f.duration}</span>
          <span className="relative flex w-full items-center">
            <span className="h-px flex-1 border-t border-dashed border-white/35" />
            <Plane className={`mx-1 h-4 w-4 shrink-0 ${f.leg === 'Return' ? 'rotate-180' : ''}`} style={{ color: f.leg === 'Outbound' ? t.accent : t.accent2 }} strokeWidth={2.2} aria-hidden />
            <span className="h-px flex-1 border-t border-dashed border-white/35" />
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.14em] text-white/45">Non-stop</span>
        </div>
        <div className="text-right">
          <p className="text-[1.65rem] font-extrabold leading-none tabular-nums">{f.arr}</p>
          <p className="mt-1 text-xs font-bold tracking-[0.12em] text-white/70">{f.to}</p>
        </div>
      </div>
      <p className="mt-2 text-[0.7rem] text-white/50">
        Emirates {f.flight} · {f.aircraft}
        {f.note && <> · {f.note}</>}
      </p>
    </div>
  )
}

/** Ticket-style card showing the outbound and return flights. */
export function BoardingPass({ flights, world }: { flights: Flight[]; world: WorldId }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
      {flights.map((f, i) => (
        <div key={f.flight}>
          {i > 0 && (
            <div className="relative h-0 border-t border-dashed border-white/20" aria-hidden>
              <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full" style={{ background: theme[world].bg }} />
              <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full" style={{ background: theme[world].bg }} />
            </div>
          )}
          <Leg f={f} world={world} />
        </div>
      ))}
    </div>
  )
}

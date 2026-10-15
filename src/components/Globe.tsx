import { useEffect, useRef, useState } from 'react'
import { geoDistance, geoInterpolate, geoOrthographic, geoPath, geoGraticule10, type GeoPermissibleObjects } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { Feature, FeatureCollection } from 'geojson'
import worldUrl from 'world-atlas/countries-110m.json?url'
import mauritiusShape from '../data/geo/mauritius.json'
import type { WorldId } from '../data/types'

type Pin = { id: WorldId | 'dubai'; label: string; sub: string; lonLat: [number, number]; color: string }

export const pins: Pin[] = [
  { id: 'dubai', label: 'Dubai', sub: 'Home base', lonLat: [55.27, 25.2], color: '#f6f1ea' },
  { id: 'mauritius', label: 'Mauritius', sub: '≈ 6h 35m', lonLat: [57.55, -20.2], color: '#19c3c0' },
  { id: 'shenzhen', label: 'Shenzhen', sub: '≈ 8h', lonLat: [114.06, 22.54], color: '#ff2fa0' },
]

const HOME_VIEW: [number, number] = [-80, -4] // centred between all three

export function Globe({ focus }: { focus: WorldId | null }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const focusRef = useRef(focus)
  focusRef.current = focus
  const [labels, setLabels] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([])
  const state = useRef({
    rotate: [HOME_VIEW[0], HOME_VIEW[1]] as [number, number],
    target: null as [number, number] | null,
    dragging: false,
    lastX: 0,
    idleUntil: 0,
  })

  // Ease towards a destination when one is focused.
  useEffect(() => {
    const target: [number, number] = focus
      ? (() => { const p = pins.find((x) => x.id === focus)!; return [-p.lonLat[0], -p.lonLat[1] * 0.6] as [number, number] })()
      : HOME_VIEW
    state.current.target = target
    state.current.idleUntil = performance.now() + (focus ? 6000 : 1500)
  }, [focus])

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let countries: Feature[] = []
    let china: Feature | undefined
    let uae: Feature | undefined
    const mauritius = mauritiusShape as unknown as Feature
    let raf = 0
    let visible = true
    let size = 0
    let dpr = 1

    const projection = geoOrthographic().clipAngle(90).precision(0.6)
    const path = geoPath(projection, ctx)
    const sphere = { type: 'Sphere' } as GeoPermissibleObjects
    const graticule = geoGraticule10()
    const arcs = pins.slice(1).map((p) => {
      const interp = geoInterpolate(pins[0].lonLat, p.lonLat)
      return { color: p.color, line: { type: 'LineString', coordinates: Array.from({ length: 48 }, (_, i) => interp(i / 47)) } as GeoPermissibleObjects }
    })

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      size = el.clientWidth
      el.width = size * dpr
      el.height = size * dpr
      projection.translate([size / 2, size / 2]).scale(size / 2 - 2)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    fetch(worldUrl)
      .then((r) => r.json())
      .then((topo: Topology<{ countries: GeometryCollection }>) => {
        const fc = feature(topo, topo.objects.countries) as FeatureCollection
        countries = fc.features
        china = countries.find((f) => String(f.id) === '156')
        uae = countries.find((f) => String(f.id) === '784')
      })
      .catch(() => {})

    let t0 = performance.now()
    const draw = (now: number) => {
      const dt = Math.min(now - t0, 64)
      t0 = now
      const s = state.current
      if (s.target) {
        const [tx, ty] = s.target
        let dx = tx - s.rotate[0]
        dx = ((dx + 540) % 360) - 180
        s.rotate = [s.rotate[0] + dx * 0.06, s.rotate[1] + (ty - s.rotate[1]) * 0.06]
        if (Math.abs(dx) < 0.2 && Math.abs(ty - s.rotate[1]) < 0.2) s.target = null
      } else if (!reduce && !s.dragging && now > s.idleUntil) {
        s.rotate = [s.rotate[0] + dt * 0.006, s.rotate[1] + (-8 - s.rotate[1]) * 0.01]
      }
      projection.rotate(s.rotate)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)

      // Ocean
      const g = ctx.createRadialGradient(size * 0.38, size * 0.32, size * 0.05, size / 2, size / 2, size / 2)
      g.addColorStop(0, '#16205a')
      g.addColorStop(1, '#070a1f')
      ctx.beginPath(); path(sphere); ctx.fillStyle = g; ctx.fill()

      ctx.beginPath(); path(graticule); ctx.strokeStyle = 'rgba(201,206,216,0.07)'; ctx.lineWidth = 0.6; ctx.stroke()

      // Land
      ctx.beginPath()
      for (const f of countries) if (f !== china) path(f)
      ctx.fillStyle = 'rgba(201,206,216,0.16)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(7,7,10,0.5)'; ctx.lineWidth = 0.5; ctx.stroke()

      // Highlighted countries
      if (china) {
        ctx.beginPath(); path(china)
        ctx.fillStyle = focusRef.current === 'mauritius' ? 'rgba(255,47,160,0.45)' : 'rgba(255,47,160,0.75)'
        ctx.fill(); ctx.strokeStyle = '#ff7cc4'; ctx.lineWidth = 1; ctx.stroke()
      }
      if (uae) { ctx.beginPath(); path(uae); ctx.fillStyle = 'rgba(246,241,234,0.7)'; ctx.fill() }
      ctx.beginPath(); path(mauritius); ctx.fillStyle = '#19c3c0'; ctx.fill()

      // Flight arcs from Dubai
      for (const a of arcs) {
        ctx.beginPath(); path(a.line)
        ctx.setLineDash([3, 4]); ctx.strokeStyle = a.color; ctx.lineWidth = 1.4; ctx.stroke(); ctx.setLineDash([])
      }

      // Pins (pulse)
      const centre: [number, number] = [-s.rotate[0], -s.rotate[1]]
      const next = pins.map((p) => {
        const vis = geoDistance(p.lonLat, centre) < Math.PI / 2 - 0.05
        const [x, y] = projection(p.lonLat) ?? [0, 0]
        if (vis) {
          const pulse = reduce ? 0 : (now / 1400 + (p.id === 'shenzhen' ? 0.5 : 0)) % 1
          ctx.beginPath(); ctx.arc(x, y, 4 + pulse * 14, 0, Math.PI * 2)
          ctx.strokeStyle = p.color; ctx.globalAlpha = 1 - pulse; ctx.lineWidth = 1.5; ctx.stroke(); ctx.globalAlpha = 1
          ctx.beginPath(); ctx.arc(x, y, p.id === 'dubai' ? 3 : 4.5, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill()
        }
        return { id: p.id, x: x / size, y: y / size, visible: vis }
      })
      setLabels((prev) =>
        prev.length && prev.every((l, i) => l.visible === next[i].visible && Math.abs(l.x - next[i].x) < 0.002 && Math.abs(l.y - next[i].y) < 0.002) ? prev : next,
      )

      // Rim light
      ctx.beginPath(); path(sphere); ctx.strokeStyle = 'rgba(143,168,255,0.35)'; ctx.lineWidth = 1; ctx.stroke()

      if (visible) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) { t0 = performance.now(); raf = requestAnimationFrame(draw) }
    })
    io.observe(el)

    // Horizontal drag to spin (vertical swipes still scroll the page)
    const down = (e: PointerEvent) => { state.current.dragging = true; state.current.lastX = e.clientX; state.current.target = null }
    const move = (e: PointerEvent) => {
      if (!state.current.dragging) return
      state.current.rotate[0] += (e.clientX - state.current.lastX) * (180 / size)
      state.current.lastX = e.clientX
    }
    const up = () => { if (state.current.dragging) { state.current.dragging = false; state.current.idleUntil = performance.now() + 2500 } }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect()
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div aria-hidden className="absolute inset-[-12%] rounded-full opacity-50 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(123,60,255,.35), rgba(25,195,192,.12) 55%, transparent 70%)' }} />
      <canvas
        ref={canvas}
        className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
        role="img"
        aria-label="Globe showing Dubai, Mauritius in the Indian Ocean, and Shenzhen in southern China, with flight paths from Dubai"
      />
      {labels.map((l) => {
        const p = pins.find((x) => x.id === l.id)!
        return (
          <div
            key={l.id}
            aria-hidden
            className="pointer-events-none absolute whitespace-nowrap transition-opacity duration-300"
            style={{ left: `${l.x * 100}%`, top: `${l.y * 100}%`, opacity: l.visible ? 1 : 0, transform: 'translate(10px, -50%)' }}
          >
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em]" style={{ color: p.color, textShadow: '0 1px 8px rgba(0,0,0,.8)' }}>{p.label}</p>
            <p className="text-[0.65rem] text-white/60" style={{ textShadow: '0 1px 8px rgba(0,0,0,.8)' }}>{p.sub}</p>
          </div>
        )
      })}
    </div>
  )
}

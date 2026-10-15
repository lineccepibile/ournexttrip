export type WorldId = 'mauritius' | 'shenzhen'

export type Category =
  | 'sail'
  | 'flight'
  | 'nature'
  | 'beach'
  | 'culture'
  | 'theatre'
  | 'dining'
  | 'play'
  | 'tech'
  | 'shopping'
  | 'art'
  | 'night'
  | 'wildlife'
  | 'coast'
  | 'drive'

export interface Photo {
  /** Image URL (remote or a file in /public). */
  src: string
  /** Responsive sources, e.g. 'a-800.webp 800w, a.webp 1600w'. */
  srcSet?: string
  /** Backup URLs tried in order if `src` fails to load. */
  fallbacks?: string[]
  /** Short accessible description. */
  alt: string
  /** Credit line + link to the licence page. */
  credit?: { text: string; href: string }
  /** CSS object-position, e.g. 'center 30%'. */
  position?: string
}

export interface Experience {
  id: string
  title: string
  place: string
  line: string
  duration: string
  category: Category
  photo: Photo
  /** Optional short muted video loop (mp4/H.264 for iPhone). Photo is the poster. */
  video?: string
  link: { label: string; href: string }
  reel?: string
  /** e.g. 'Schedule to be confirmed' */
  status?: string
}

export interface Stat {
  icon: 'sun' | 'waves' | 'rain' | 'plane' | 'passport'
  label: string
  value: string
  note?: string
}

export interface DayPlan {
  date: string
  weekday: string
  title: string
  mood: string
  slots: { time: string; text: string; experienceId?: string }[]
}

export interface World {
  id: WorldId
  name: string
  escape: string
  slogan: string
  tagline: string
  emoji: string
  hero: Photo
  stats: Stat[]
  highlights: string[]
  experiences: Experience[]
  itinerary: DayPlan[]
  closing: string
}

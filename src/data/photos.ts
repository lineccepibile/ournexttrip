/**
 * Photography — real, freely licensed photos (Wikimedia Commons), stored in /public/photos
 * as WebP at 800px and 1600px. Author & licence for each are in photo-credits.json
 * and shown in the site footer.
 *
 * To swap a photo: drop `name.webp` and `name-800.webp` into /public/photos and
 * point a slot at it with local('name', 'alt text').
 */
import type { Photo } from './types'
import credits from './photo-credits.json'

const base = import.meta.env.BASE_URL

const local = (name: string, alt: string, position?: string): Photo => {
  const c = (credits as Record<string, { title: string; author: string; license: string; page: string }>)[name]
  return {
    src: `${base}photos/${name}.webp`,
    srcSet: `${base}photos/${name}-800.webp 800w, ${base}photos/${name}.webp 1600w`,
    alt,
    position,
    credit: c
      ? { text: `${c.title.replace(/^File:/, '').replace(/\.(jpe?g|png)$/i, '')} — ${c.author || 'Unknown'} (${c.license})`, href: c.page }
      : undefined,
  }
}

export const photos = {
  mru: {
    hero: local('mru-hero', 'Le Morne peninsula and its turquoise lagoon from the air'),
    sail: local('mru-sail', 'Île aux Cerfs and its shallow turquoise lagoon from above'),
    sunset: local('mru-sunset', 'A couple watching the sunset at Flic-en-Flac'),
    heli: local('mru-heli', "The 'underwater waterfall' illusion off Le Morne, seen from the air"),
    waterfall: local('mru-waterfall', 'Chamarel Waterfall plunging into a green gorge'),
    earth: local('mru-earth', 'The rippled, multicoloured dunes of Chamarel'),
    beach: local('mru-beach', 'Wooden jetty and pavilion at dusk, Bel Ombre beach'),
    market: local('mru-market', 'Colourful umbrellas over the walkway at Caudan Waterfront, Port Louis'),
    gorges: local('mru-gorges', 'Forested valleys of Black River Gorges National Park'),
    dolphins: local('mru-dolphins', 'Spinner dolphins swimming in clear blue water (illustrative)'),
    drive: local('mru-drive', 'A quiet coastal road winding through Mauritius'),
  },
  szx: {
    hero: local('szx-hero', 'Ping An Finance Centre lit up above Shenzhen at night'),
    minghua: local('szx-minghua', 'The Minghua ship moored at Sea World, Shekou'),
    banquet: local('szx-banquet', 'Dancers in flowing pink silk performing a Chinese classical dance (illustrative)'),
    play: local('szx-play', 'Go-karts racing on an indoor track (illustrative)'),
    tech: local('szx-tech', 'Inside a DJI store in Shenzhen'),
    robots: local('szx-robots', 'A four-legged robot dog (illustrative)'),
    hqb: local('szx-hqb', 'The glass atrium of Huaqiang Electronics World, Huaqiangbei'),
    k11: local('szx-k11', 'K11 ECOAST lit up at night'),
    skyline: local('szx-skyline', 'Ping An Finance Centre towering over the Shenzhen skyline'),
    bay: local('szx-bay', 'Shenzhen Bay office towers glowing at night'),
    beach: local('szx-beach', 'Waves rolling onto Dameisha Beach'),
  },
}

/** Every photo, for the credits list. */
export const allPhotos: Photo[] = [...Object.values(photos.mru), ...Object.values(photos.szx)]

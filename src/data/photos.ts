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
    hero: local('szx-hero', 'Futian skyscrapers glowing in a citywide light show, Shenzhen'),
    minghua: local('szx-minghua', 'The Minghua ship lit up at night, Sea World, Shekou'),
    banquet: local('szx-banquet', 'A dancer mid-spin with long flowing white sleeves (illustrative)'),
    play: local('szx-play', 'A player lost in virtual reality (illustrative)'),
    tech: local('szx-tech', 'A DJI drone in flight (illustrative)'),
    robots: local('szx-robots', 'A humanoid robot and a robot dog on a futuristic stage (illustrative)'),
    hqb: local('szx-hqb', 'The glass atrium of Huaqiang Electronics World, Huaqiangbei'),
    k11: local('szx-k11', 'K11 ECOAST lit up at night'),
    skyline: local('szx-skyline', 'Crowds under Ping An Finance Centre during a light show'),
    bay: local('szx-bay', 'The Shenzhen Bay skyline light show at night'),
    beach: local('szx-beach', 'Waves rolling onto Dameisha Beach'),
  },
}

/** Every photo, for the credits list. */
export const allPhotos: Photo[] = [...Object.values(photos.mru), ...Object.values(photos.szx)]

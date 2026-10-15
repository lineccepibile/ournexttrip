/**
 * WATCH THE EXPERIENCE — Instagram inspiration.
 *
 * Add one object per public Reel/post. Fields:
 *  - title:       experience name, e.g. 'The Deal — immersive theatre'
 *  - world:       'mauritius' | 'shenzhen'
 *  - url:         the public Instagram link, e.g. 'https://www.instagram.com/reel/XXXXXXXXX/'
 *  - caption:     one short line
 *  - thumbnail:   optional. Put your own screenshot in /public/reels/ and write 'reels/my-shot.jpg'.
 *                 If omitted, a destination photo is used instead.
 *  - credit:      optional, e.g. '@creatorname'
 *
 * Tapping a card plays the Reel inside the site using Instagram's official embed
 * (nothing is downloaded or re-hosted). An 'Open in Instagram' fallback is always shown.
 */
import type { WorldId } from './types'

export interface Reel {
  title: string
  world: WorldId
  url: string
  caption: string
  thumbnail?: string
  credit?: string
}

export const reels: Reel[] = [
  {
    title: 'Mauritius in motion · 01',
    world: 'mauritius',
    url: 'https://www.instagram.com/reel/Ddy96pIza7v/',
    caption: '',
  },
  {
    title: 'Mauritius in motion · 02',
    world: 'mauritius',
    url: 'https://www.instagram.com/reel/Dcd2DgfBcxJ/',
    caption: '',
  },
  {
    title: 'Mauritius in motion · 03',
    world: 'mauritius',
    url: 'https://www.instagram.com/reel/DcVvQJGqbW5/',
    caption: '',
  },
  {
    title: 'Mauritius in motion · 04',
    world: 'mauritius',
    url: 'https://www.instagram.com/reel/DYr3E6KMxmG/',
    caption: '',
  },
  {
    title: 'Mauritius in motion · 05',
    world: 'mauritius',
    url: 'https://www.instagram.com/reel/Deeq_FzslRi/',
    caption: '',
  },
  {
    title: 'Mauritius in motion · 06',
    world: 'mauritius',
    url: 'https://www.instagram.com/reel/DcV_payIR_l/',
    caption: '',
  },
  {
    title: 'Mauritius in motion · 07',
    world: 'mauritius',
    url: 'https://www.instagram.com/reel/DULf0zOiH0G/',
    caption: '',
  },
  {
    title: 'Shenzhen in motion · 01',
    world: 'shenzhen',
    url: 'https://www.instagram.com/reel/Daeo2s8TIoe/',
    caption: '',
  },
  {
    title: 'Shenzhen in motion · 02',
    world: 'shenzhen',
    url: 'https://www.instagram.com/reel/DapyKkACUqh/',
    caption: '',
  },
  {
    title: 'Shenzhen in motion · 03',
    world: 'shenzhen',
    url: 'https://www.instagram.com/reel/DYeFlluxgPi/',
    caption: '',
  },
  {
    title: 'Shenzhen in motion · 04',
    world: 'shenzhen',
    url: 'https://www.instagram.com/reel/DXRed8YTvHD/',
    caption: '',
  },
  {
    title: 'Shenzhen in motion · 05',
    world: 'shenzhen',
    url: 'https://www.instagram.com/reel/DWv5BrUgdkF/',
    caption: '',
  },
  {
    title: 'Shenzhen in motion · 06',
    world: 'shenzhen',
    url: 'https://www.instagram.com/reel/DWMYj7NDqo4/',
    caption: '',
  },
  {
    title: 'Shenzhen in motion · 07',
    world: 'shenzhen',
    url: 'https://www.instagram.com/reel/DbrUzG_khqS/',
    caption: '',
  },
  {
    title: 'Shenzhen in motion · 08',
    world: 'shenzhen',
    url: 'https://www.instagram.com/p/Dd200UcglgT/',
    caption: '',
  },
  // Example (uncomment and replace the URL with a real public Reel):
  // {
  //   title: 'The Deal aboard the Minghua',
  //   world: 'shenzhen',
  //   url: 'https://www.instagram.com/reel/XXXXXXXXXXX/',
  //   caption: 'Theatre you walk through, deck by deck.',
  //   thumbnail: 'reels/the-deal.jpg',
  //   credit: '@someone',
  // },
]

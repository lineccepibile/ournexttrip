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
 * The site shows a preview card that opens the Reel on Instagram (no video is
 * downloaded or re-hosted).
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

/**
 * Photography — Wikimedia Commons (free licences; author & licence on each file page).
 * `commons('File_name.jpg', width)` builds a resizing URL. Each photo lists backups
 * that load automatically if the first one fails.
 *
 * To use your own photos: drop files into /public/photos/ and set
 *   src: `${import.meta.env.BASE_URL}photos/your-file.jpg`
 */
import type { Photo } from './types'

const commons = (file: string, width = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`

const pic = (alt: string, files: string[], opts: { width?: number; position?: string } = {}): Photo => ({
  src: commons(files[0], opts.width),
  fallbacks: files.slice(1).map((f) => commons(f, opts.width)),
  alt,
  position: opts.position,
  credit: { text: files[0].replace(/_/g, ' '), href: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(files[0])}` },
})

export const photos = {
  mru: {
    hero: pic('Le Morne peninsula and its turquoise lagoon from the air', ['Underwater_waterfall_Mauritius_HDR.jpg', 'Le_Morne_Peninsula_in_Mauritius_(53697779236).jpg'], { width: 1800 }),
    sail: pic('Turquoise lagoon at Île aux Cerfs', ['Île_aux_Cerfs,_Mauritius.jpg', 'Mauritius_Île_aux_Cerfs.jpg', 'Île_aux_Cerfs,_île_Maurice.jpg']),
    sunset: pic('Flic en Flac beach on the west coast', ['Flic_en_Flac_Beach_in_Mauiritius_(53697781931).jpg', 'Spiaggia_di_Flic_en_Flac_-_Mauritius_(banner).jpg']),
    heli: pic("Aerial view of the 'underwater waterfall' off Le Morne", ['Aerial_view_of_the_underwater_waterfall_in_Mauritius_(53697770576).jpg', 'Aerial_view_of_the_southwest_part_of_Mauritius_(53697771591).jpg']),
    waterfall: pic('Chamarel Waterfall plunging into green forest', ['Chamarel_Waterfall_in_Mauritius_(53698126454).jpg', 'Chamarel_Falls_-_5.jpg', 'Chamarel_Falls_Mauritius_2.JPG']),
    earth: pic('The rippled, multicoloured dunes of Chamarel', ['Seven_Coloured_Earths_Geopark_in_Chamarel,_Mauritius_(53697998768).jpg', 'Seven_coloured_earths_mauritius.jpg', 'Chamarel_terre_des_7_couleurs.JPG']),
    beach: pic('Palm-fringed white beach and clear water', ['Aerial_view_of_the_Trou_aux_Biches_Beach_in_Mauritius,_as_seen_from_the_south_(53698114274).jpg', 'Trou_Aux_Biches,_Mauritius.jpg', 'Mauritius_belle_mare_beach.jpg']),
    market: pic('Port Louis Central Market', ['Port_Louis_Central_Market.JPG', 'Mauritius_Port-Louis_CaudanWaterfront.JPG', 'Umbrellas_at_Caudan_Waterfront_Mall.JPG']),
    gorges: pic('Black River Gorges viewpoint', ['Black_River_Gorges_National_Park,_Mauritius.jpg', 'Chamarel_view_point,_Black_River_Gorges_National_Park,_Mauritius.JPG', 'Mauritius_Black-River-Gorges-National-Park-01.jpg']),
    dolphins: pic('Le Morne mountain above the west-coast sea', ['Le_Morne,_Mauritius2.JPG', 'Le_Morne_mountain_morning_shadow.jpg']),
  },
  szx: {
    hero: pic('Ping An Finance Centre glowing above Shenzhen at night', ['Ping_An_International_Finance_Center_Night_View.jpg', 'The_sky_line_of_ShenZhen_深圳天际线.jpg'], { width: 1800 }),
    minghua: pic('The Minghua ship at Sea World, Shekou', ['Shenzhen_Zhaoshangju_Square_Building_and_Minghua_Ship_of_Shekou_Sea_World_4.jpg', 'Sea_World_in_Shekou_Shenzhen2021.jpg', 'SEA_WORLD,_SHENZHEN_(9).jpg']),
    banquet: pic('Traditional Chinese dance performance', ['Traditional_Chinese_Dance_Performance.jpg', 'Chinese_umbrella_dance.jpg']),
    play: pic('Shenzhen Bay seen from above', ['Overlook_of_Shenzhen_Bay_from_CFC_20220627.jpg', 'China_Resources_Headquarters&Shenzhen_Bay_gymnasium_in_Nanshan_District2020.jpg']),
    tech: pic('DJI headquarters tower in Shenzhen', ['DJI_Headquarters_Tower_(cropped).jpg']),
    robots: pic('Futuristic towers of Shenzhen Bay', ['China_Resources_Headquarters&Shenzhen_Bay_gymnasium_in_Nanshan_District2020.jpg', 'The_panorama_of_Futian_Shenzhen.jpg']),
    hqb: pic('Huaqiangbei electronics district', ['Huaqiangbei_walking_street.jpg', 'Huaqiangbei&Shennan_Cross2021.jpg']),
    k11: pic('K11 ECOAST in Shenzhen', ['K11_Shenzhen.jpg', 'SZ_深圳_Shenzhen_Futian_Fuzhong_Road_MOCAPE_Museum_of_Contemporary_Art_&_Planning_Exhibition_facade_Sept_2017_IX1_03.jpg']),
    skyline: pic('Shenzhen skyline from Nanshan', ['Shenzhen_Skyline_from_Nanshan.jpg', 'The_panorama_of_Futian_Shenzhen.jpg']),
    bay: pic('Talent Park on Shenzhen Bay', ['Shenzhen_Talents_Park_2.jpg', 'SUNSET_OF_XILI,_NANSHAN_DISTRICT,_SHENZHEN_(10).jpg']),
    beach: pic('Dameisha beach', ['China-Yantian-Dameisha-and-Xiaomeisha-Beach-Aug-2001-00.JPG', 'SZ_深圳灣公園_Shenzhen_Bay_Park_waterfront_promenade_terrace_June_2017_IX1.jpg']),
  },
}

/** Every photo, for the credits list. */
export const allPhotos: Photo[] = [...Object.values(photos.mru), ...Object.values(photos.szx)]

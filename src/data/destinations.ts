/**
 * ALL DESTINATION CONTENT LIVES HERE.
 * Edit text, links, durations and images freely — the site updates on rebuild.
 *
 * Research notes (October 2026):
 * - Links were found via search results from each provider's own domain.
 *   Prices, hours and December 2026 schedules are NOT confirmed unless stated.
 * - Weather figures are long-term climate averages, not forecasts.
 */
import type { World } from './types'
import { photos } from './photos'

const TBC = 'Schedule to be confirmed'

export const mauritius: World = {
  id: 'mauritius',
  name: 'Mauritius',
  escape: 'The Wild Escape',
  slogan: 'Less routine. More turquoise.',
  tagline: 'The ocean is calling.',
  emoji: '🌴',
  hero: photos.mru.hero,
  stats: [
    { icon: 'sun', label: 'Daytime', value: '28–30°C', note: 'December average' },
    { icon: 'waves', label: 'Sea', value: '27–28°C', note: 'Warm enough to stay in for hours' },
    { icon: 'rain', label: 'Rain', value: 'Passing showers', note: 'Tropical summer, short bursts' },
    { icon: 'plane', label: 'From Dubai', value: '≈ 6h 35m direct', note: 'Emirates EK701, non-stop' },
    { icon: 'passport', label: 'Entry', value: 'Visa on arrival*', note: 'Generally, for Jordanian passports' },
  ],
  highlights: ['Lagoons in four shades of blue', 'An ocean that tricks the eye', 'Barefoot dinners at sunset'],
  experiences: [
    {
      id: 'mru-sail',
      title: 'Sail into the blue',
      place: 'Catamaran to Île aux Cerfs',
      line: 'Snorkel stop, BBQ lunch on board, then lazy hours on the island.',
      duration: '7–8 h',
      category: 'sail',
      photo: photos.mru.sail,
      link: { label: 'GetYourGuide', href: 'https://www.getyourguide.com/mauritius-l2105/mauritius-catamaran-cruise-from-bluebay-to-ile-aux-cerfs-t216339/' },
      status: TBC,
    },
    {
      id: 'mru-sunset',
      title: 'Golden hour, on deck',
      place: 'West coast sunset catamaran',
      line: 'Two hours on the lagoon with drinks as the sun drops behind the sea.',
      duration: '≈ 2 h',
      category: 'sail',
      photo: photos.mru.sunset,
      link: { label: 'GetYourGuide', href: 'https://www.getyourguide.com/mauritius-l169137/mauritius-western-sunset-catamaran-cruise-drinks-snacks-t1132216/' },
      status: TBC,
    },
    {
      id: 'mru-heli',
      title: 'The underwater illusion',
      place: 'Helicopter over Le Morne',
      line: "See the 'underwater waterfall' — sand flowing off the reef — from above.",
      duration: '≈ 40 min',
      category: 'flight',
      photo: photos.mru.heli,
      link: { label: 'GetYourGuide', href: 'https://www.getyourguide.com/plaine-magnien-l189534/mauritius-underwater-waterfall-by-helicopter-tour-t816673/' },
      status: 'Weather dependent · ' + TBC,
    },
    {
      id: 'mru-waterfall',
      title: 'Chase waterfalls',
      place: 'Chamarel Waterfall',
      line: "The island's tallest falls, from easy viewpoints — no real hiking.",
      duration: '1–2 h',
      category: 'nature',
      photo: photos.mru.waterfall,
      link: { label: 'Official site', href: 'https://chamarel7colouredearth.com/experiences/chamarel-waterfall/' },
    },
    {
      id: 'mru-earth',
      title: 'A sea of colour',
      place: 'Seven Coloured Earth Geopark',
      line: 'Rippling volcanic dunes in seven shades — plus giant tortoises.',
      duration: '1–2 h',
      category: 'nature',
      photo: photos.mru.earth,
      link: { label: 'Official site', href: 'https://chamarel7colouredearth.com/experiences/geopark/' },
    },
    {
      id: 'mru-beachclub',
      title: 'Barefoot luxury',
      place: 'C Beach Club, Bel Ombre',
      line: 'Toes in the sand, cocktails in hand, dinner by the ocean.',
      duration: 'Half day / evening',
      category: 'dining',
      photo: photos.mru.beach,
      link: { label: 'Official site', href: 'https://heritageresorts.mu/experiences/c-beach-club' },
      status: 'Check opening hours',
    },
    {
      id: 'mru-portlouis',
      title: 'An island adventure',
      place: 'Port Louis street food & market',
      line: 'Caudan Waterfront, the Central Market and Chinatown, one bite at a time.',
      duration: '≈ 3 h',
      category: 'culture',
      photo: photos.mru.market,
      link: { label: 'GetYourGuide', href: 'https://www.getyourguide.com/port-louis-l1858/port-louis-street-food-tour-t229797/' },
      status: TBC,
    },
    {
      id: 'mru-south',
      title: 'The scenic road south',
      place: 'Volcanoes, gorges & Chamarel day trip',
      line: 'Crater rims, the sacred lake and Black River Gorges from the car window.',
      duration: '≈ 8 h',
      category: 'coast',
      photo: photos.mru.gorges,
      link: { label: 'GetYourGuide', href: 'https://www.getyourguide.com/port-louis-l1858/southern-mauritius-volcanoes-coloured-earth-t514085/' },
      status: TBC,
    },
    {
      id: 'mru-dolphins',
      title: 'Quiet company',
      place: 'Tamarin Bay kayak with dolphins',
      line: 'Paddle-powered, small group — operator says no chasing the dolphins.',
      duration: 'Morning',
      category: 'wildlife',
      photo: photos.mru.dolphins,
      link: { label: 'GetYourGuide', href: 'https://www.getyourguide.com/tamarin-l110542/tamarin-guided-kayak-tour-with-dolphins-t433933/' },
      status: 'Optional · ' + TBC,
    },
  ],
  itinerary: [
    {
      date: '1 Dec',
      weekday: 'Tue',
      title: 'Hello, turquoise',
      mood: 'Land, exhale, swim.',
      slots: [
        { time: 'Morning', text: 'Overnight Emirates flight lands mid-morning (typical schedule)' },
        { time: 'Sunset', text: 'Golden hour on a west-coast catamaran', experienceId: 'mru-sunset' },
      ],
    },
    {
      date: '2 Dec',
      weekday: 'Wed',
      title: 'Into the blue',
      mood: 'Salt hair, no plans.',
      slots: [{ time: 'All day', text: 'Catamaran, snorkelling and Île aux Cerfs', experienceId: 'mru-sail' }],
    },
    {
      date: '3 Dec',
      weekday: 'Thu',
      title: 'From above',
      mood: 'The view that breaks your brain.',
      slots: [
        { time: 'Morning', text: 'Helicopter over the underwater waterfall', experienceId: 'mru-heli' },
        { time: 'Evening', text: 'Dinner barefoot at the beach club', experienceId: 'mru-beachclub' },
      ],
    },
    {
      date: '4 Dec',
      weekday: 'Fri',
      title: 'Wild south',
      mood: 'Waterfalls, colours, slow roads.',
      slots: [
        { time: 'Morning', text: 'Seven Coloured Earth & Chamarel Waterfall', experienceId: 'mru-earth' },
        { time: 'Afternoon', text: 'Lagoon swim, long lunch, nap' },
      ],
    },
    {
      date: '5 Dec',
      weekday: 'Sat',
      title: 'One more bite',
      mood: 'Markets, then home.',
      slots: [
        { time: 'Morning', text: 'Port Louis street food & Central Market', experienceId: 'mru-portlouis' },
        { time: 'Later', text: 'Fly home (times to be confirmed)' },
      ],
    },
  ],
  closing: 'Pack light. Sunscreen, swimwear, and that look you get when you see the sea.',
}

export const shenzhen: World = {
  id: 'shenzhen',
  name: 'Shenzhen',
  escape: 'The Future Escape',
  slogan: 'Tomorrow is already here.',
  tagline: 'The future is waiting.',
  emoji: '🤖',
  hero: photos.szx.hero,
  stats: [
    { icon: 'sun', label: 'Daytime', value: '19–23°C', note: 'December average' },
    { icon: 'waves', label: 'Sea', value: '20–22°C', note: 'Coastal walks > swimming' },
    { icon: 'rain', label: 'Rain', value: 'Mostly dry', note: 'One of the driest months' },
    { icon: 'plane', label: 'From Dubai', value: '≈ 8h direct', note: 'Emirates EK328, non-stop' },
    { icon: 'passport', label: 'Entry', value: 'Visa in advance', note: 'Chinese tourist (L) visa' },
  ],
  highlights: ['Theatre on a vintage ocean liner', 'Robots, drones and gadget heaven', 'A skyline that glows all night'],
  experiences: [
    {
      id: 'szx-deal',
      title: 'Step inside the story',
      place: '“The Deal” aboard the Minghua, Sea World',
      line: 'Walk-through immersive theatre across seven decks of a 1962 liner.',
      duration: '≈ 1.5 h (est.)',
      category: 'theatre',
      photo: photos.szx.minghua,
      link: { label: 'About the show', href: 'https://www.wingontravel.com/discovery/scenic-immersive-physical-theater-%22the-deal%22-153100121' },
      status: TBC + ' · strobe & smoke',
    },
    {
      id: 'szx-banquet',
      title: 'Dinner becomes theatre',
      place: 'Xuyan 叙宴 · Tang-court dining show',
      line: 'Dress in hanfu, dine on many courses, watch dance and swordplay.',
      duration: '≈ 1.5 h',
      category: 'dining',
      photo: photos.szx.banquet,
      link: { label: 'Trip.com', href: 'https://sg.trip.com/things-to-do/detail/101302166/' },
      status: TBC,
    },
    {
      id: 'szx-kpfun',
      title: 'Play in the future',
      place: 'KP-FUN Super Party, K11 ECOAST',
      line: 'Two sea-view levels of go-karts, VR racing and laser tag.',
      duration: '2–3 h',
      category: 'play',
      photo: photos.szx.play,
      link: { label: 'Shenzhen News', href: 'https://www.sznews.com/news/content/2026-06/29/content_32106282.htm' },
    },
    {
      id: 'szx-dji',
      title: 'Meet tomorrow',
      place: 'DJI Flagship Store, OCT Harbour',
      line: "Four floors of drones and cameras in DJI's home city.",
      duration: '45–60 min',
      category: 'tech',
      photo: photos.szx.tech,
      link: { label: 'About the store', href: 'https://world-architects.com/de/various-associates-shenzhen/project/dji-flagship-store' },
    },
    {
      id: 'szx-robots',
      title: 'Shake hands with a robot',
      place: 'Robot experience space, Longhua',
      line: 'Take the controls of robot dogs and walking humanoids.',
      duration: '≈ 1 h',
      category: 'tech',
      photo: photos.szx.robots,
      link: { label: 'Shenzhen Gov', href: 'https://www.sz.gov.cn/en_szgov/news/latest/content/post_12300084.html' },
      status: 'Check it is open before going',
    },
    {
      id: 'szx-hqb',
      title: "The world's electronics playground",
      place: 'Huaqiangbei 华强北',
      line: 'Twenty-plus towers of gadgets, parts and things you never knew existed.',
      duration: '2–3 h',
      category: 'shopping',
      photo: photos.szx.hqb,
      link: { label: 'Guide', href: 'https://www.wanderinchina.com/destinations/shenzhen/huaqiangbei/' },
    },
    {
      id: 'szx-k11',
      title: 'Art meets architecture',
      place: 'K11 ECOAST, Prince Bay',
      line: 'A waterfront art-and-design district built for wandering.',
      duration: '2–3 h',
      category: 'art',
      photo: photos.szx.k11,
      link: { label: 'Shenzhen Gov', href: 'https://www.sz.gov.cn/en_szgov/aboutsz/photos/content/post_12140438.html' },
    },
    {
      id: 'szx-skyline',
      title: 'City of lights',
      place: 'Free Sky 116 · Ping An Finance Centre',
      line: 'Floor 116 of the tallest tower in town, timed for sunset.',
      duration: '1–1.5 h',
      category: 'night',
      photo: photos.szx.skyline,
      link: { label: 'Klook', href: 'https://www.klook.com/en-US/activity/10507-ping-an-financial-center-in-shenzhen-guangdong/' },
    },
    {
      id: 'szx-lightshow',
      title: 'Shenzhen Bay after dark',
      place: 'Talent Park light & drone shows',
      line: 'Free weekend shows over the bay — book a slot a few days ahead.',
      duration: '≈ 20 min',
      category: 'night',
      photo: photos.szx.bay,
      link: { label: 'Guide', href: 'https://www.travelofchina.com/shenzhen-talent-park/' },
      status: TBC,
    },
    {
      id: 'szx-beach',
      title: 'Coastal escape',
      place: 'Dameisha Beach 大梅沙',
      line: 'A free city beach by metro — sand, sea breeze, zero hiking.',
      duration: '2–3 h',
      category: 'coast',
      photo: photos.szx.beach,
      link: { label: 'Shenzhen Gov', href: 'https://www.sz.gov.cn/en_szgov/news/infocus/park/csgy/content/post_10986843.html' },
    },
  ],
  itinerary: [
    {
      date: '1 Dec',
      weekday: 'Tue',
      title: 'Neon arrival',
      mood: 'Land late, look up.',
      slots: [
        { time: 'Day', text: 'Daytime Emirates flight (2025 timetable: lands ≈ 22:00)' },
        { time: 'Night', text: 'Late noodles and a first glimpse of the glowing skyline' },
      ],
    },
    {
      date: '2 Dec',
      weekday: 'Wed',
      title: 'Gadget day',
      mood: 'Touch the future, then feast like emperors.',
      slots: [
        { time: 'Afternoon', text: 'Huaqiangbei, then the DJI flagship', experienceId: 'szx-hqb' },
        { time: 'Evening', text: 'Tang-court banquet theatre', experienceId: 'szx-banquet' },
      ],
    },
    {
      date: '3 Dec',
      weekday: 'Thu',
      title: 'Play & plot',
      mood: 'Race, wander, get lost in a story.',
      slots: [
        { time: 'Afternoon', text: 'K11 ECOAST art + KP-FUN racing', experienceId: 'szx-kpfun' },
        { time: 'Evening', text: '“The Deal” aboard the Minghua', experienceId: 'szx-deal' },
      ],
    },
    {
      date: '4 Dec',
      weekday: 'Fri',
      title: 'Sea, then sky',
      mood: 'Slow morning, electric night.',
      slots: [
        { time: 'Day', text: 'Dameisha Beach, coffee by the water', experienceId: 'szx-beach' },
        { time: 'Night', text: 'Sunset on floor 116, then the bay light show', experienceId: 'szx-skyline' },
      ],
    },
    {
      date: '5 Dec',
      weekday: 'Sat',
      title: 'Robots & goodbye',
      mood: 'One last wow.',
      slots: [
        { time: 'Day', text: 'Robot experience space + Shenzhen Bay walk', experienceId: 'szx-robots' },
        { time: 'Late', text: 'Overnight flight home (2025 timetable: departs ≈ 23:55)' },
      ],
    },
  ],
  closing: 'Charge everything. Bring comfy shoes. Prepare to say “wow” in a new language.',
}

export const worlds = { mauritius, shenzhen } as const

/** The Reality Check comparison. */
export const comparison = [
  { icon: 'thermometer', label: 'Temperature', mauritius: '28–30°C · summer', shenzhen: '19–23°C · mild' },
  { icon: 'cloud-rain', label: 'Rain risk', mauritius: 'Brief tropical showers', shenzhen: 'Low · mostly dry' },
  { icon: 'waves', label: 'Swimming', mauritius: 'Perfect · 27–28°C sea', shenzhen: 'Brisk · 20–22°C sea' },
  { icon: 'plane', label: 'Flight', mauritius: '≈ 6h 35m direct', shenzhen: '≈ 8h direct' },
  { icon: 'stamp', label: 'Visa', mauritius: 'Generally on arrival*', shenzhen: 'Required in advance' },
  { icon: 'sparkles', label: 'Style', mauritius: 'Slow, sunny, barefoot', shenzhen: 'Fast, immersive, wow' },
  { icon: 'trees', label: 'Nature vs city', mauritius: '90% nature', shenzhen: '90% city' },
  { icon: 'utensils', label: 'Food & night', mauritius: 'Seafood & sunsets', shenzhen: 'Banquets & neon' },
] as const

export const practical = {
  mauritius: {
    summary: 'Warm sea, tropical weather, straightforward entry for Jordanian travellers.',
    visa:
      '*Jordanian ordinary-passport holders are generally reported as eligible for a visa on arrival, subject to official entry conditions (return ticket, accommodation, funds, passport validity, and the All-in-One Travel Form). Confirm with the Mauritius Passport & Immigration Office before booking.',
    visaLink: 'https://passport.govmu.org/passport/?page_id=605',
    flight: 'Emirates EK701 DXB→MRU is a direct flight of about 6h 35m. Times vary by date.',
    flightLink: 'https://www.emirates.com/ae/english/destinations/dxb/mru/flights-from-dubai-to-mauritius/',
  },
  shenzhen: {
    summary: 'Milder temperatures, generally drier, extraordinary urban experiences — but a Chinese visa is required.',
    visa:
      'Jordanian ordinary passports need a Chinese tourist (L) visa in advance. Apply online at visaforchina.cn, then submit your original passport in person at the Chinese Visa Application Service Center in Dubai. Allow time for the 4-working-day regular service, and check whether you need an appointment.',
    visaLink: 'https://www.visaforchina.cn/DXB3_EN/tongzhigonggao/400954502653546496.html',
    flight:
      'Emirates has flown DXB→SZX non-stop (EK328) since July 2025, about 8 h. Times quoted here are from the 2025 timetable; check December 2026 times on emirates.com.',
    flightLink:
      'https://www.emirates.com/media-centre/emirates-expands-global-network-with-the-official-introduction-of-three-new-destinations--shenzhen-in-china-da-nang-in-vietnam-and-siem-reap-in-cambodia/',
  },
  weather:
    'Temperatures and rainfall are long-term December averages, not forecasts. Check a real forecast about 10 days before you fly.',
}

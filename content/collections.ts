import type { Collection, CraftGroup } from '@/types';

/** Six catalogue collections, each with a card image and a wide page header. */
export const collections: Collection[] = [
  {
    slug: 'mithai-candles',
    name: 'Mithai Candles',
    craftGroup: 'candles',
    tagline: 'Mithai that looks delicious… but is made to glow.',
    description:
      'Modak, laddu, kaju katli, kesar pedha and rasmalai — sculpted in soy wax with real silver-varq detailing.',
    intro:
      'This is the range we are known for. Every sweet is hand-moulded in 100% soy wax, demoulded one at a time and finished with real silver varq — so it sits on a pooja thali looking exactly like the mithai beside it, until someone lights it. Choose your colours to match your décor, your packaging or your mandap.',
    href: '/collections/mithai-candles',
    image: {
      id: 'collection-mithai-candles',
      label: 'Mithai Candles',
      alt: 'An assortment of mithai candles arranged on a brass thali',
      aspect: '4:5',
      note: 'Group shot of all five mithai types together on a brass thali. This is the brand hero image — shoot it best.',
    },
    hero: {
      id: 'collection-mithai-candles-hero',
      label: 'Mithai Candles — banner',
      alt: 'A wide spread of handmade mithai candles with marigolds and diyas',
      aspect: '21:9',
      note: 'Wide banner: mithai candles spread across a brass tray with marigolds and a lit diya. Leave space on the left for the page title.',
      src: '/images/home-hero.png',
    },
  },
  {
    slug: 'floral-candles',
    name: 'Floral Candles',
    craftGroup: 'candles',
    tagline: 'A touch of floral beauty, a glow of serenity.',
    description: 'Hibiscus, daisy, tulip, rose, peony and marigold — plus t-lights in any colour you like.',
    intro:
      'Flowers that will not wilt. Poured petal by petal in soy wax, our floral range runs from ₹30 t-lights for a wedding gift table to full bouquets wrapped like a florist would. Every shape can be made in any colour and any fragrance you like.',
    href: '/collections/floral-candles',
    image: {
      id: 'collection-floral-candles',
      label: 'Floral Candles',
      alt: 'Floral candles in pastel colours arranged on cream fabric',
      aspect: '4:5',
      note: 'Cluster of floral candles — tulip bouquet, daisies, hibiscus t-lights — on cream fabric in soft daylight.',
    },
    hero: {
      id: 'collection-floral-candles-hero',
      label: 'Floral Candles — banner',
      alt: 'A wide arrangement of floral soy wax candles in soft daylight',
      aspect: '21:9',
      note: 'Wide banner: floral candles laid across cream fabric with fresh petals scattered. Soft, airy, high-key light.',
    },
  },
  {
    slug: 'decor-candles',
    name: 'Décor & Novelty Candles',
    craftGroup: 'candles',
    tagline: 'The pieces that earn their place on the shelf.',
    description: 'Bubble cubes, woven hearts, teddies, couples, jars, pillars and tapers.',
    intro:
      'The candles people buy for themselves. Sculptural shapes and quiet textures that look considered on a shelf long before they are ever lit — and burn clean when they are. Sizes from a 30 ml jar at ₹60 up to layered jars that run for thirty hours.',
    href: '/collections/decor-candles',
    image: {
      id: 'collection-decor-candles',
      label: 'Décor & Novelty Candles',
      alt: 'Décor candles styled on a shelf with books and a plant',
      aspect: '4:5',
      note: 'Styled shelf vignette: bubble candle, layered jar, tapers, a book and a small plant. Lifestyle, not product-on-white.',
    },
    hero: {
      id: 'collection-decor-candles-hero',
      label: 'Décor & Novelty — banner',
      alt: 'Décor candles styled across a living room shelf',
      aspect: '21:9',
      note: 'Wide banner: a styled shelf or console with bubble candles, jars and tapers. Warm interior, lived-in feel.',
    },
  },
  {
    slug: 'resin-art',
    name: 'Resin Art',
    craftGroup: 'resin-art',
    tagline: 'Freeze your special moments.',
    description: 'Ganesha standees, personalised keepsake frames, polaroid magnets and coasters.',
    intro:
      'Resin is where the studio gets personal. Send us a photograph and we set it in clear resin with your names, your date and real dried flowers. Alongside the keepsakes sit our Ganesha standees — made for car dashboards, office desks and home mandirs, in around eight colourways.',
    href: '/collections/resin-art',
    image: {
      id: 'collection-resin-art',
      label: 'Resin Art',
      alt: 'A resin Ganesha standee beside a personalised keepsake frame',
      aspect: '4:5',
      note: 'Ganesha standee and a keepsake frame together, angled to avoid glare on the resin.',
    },
    hero: {
      id: 'collection-resin-art-hero',
      label: 'Resin Art — banner',
      alt: 'Resin keepsake frames and Ganesha standees arranged together',
      aspect: '21:9',
      note: 'Wide banner: keepsake frames, magnets and standees laid out on a wooden surface. Angle the light to avoid glare.',
    },
  },
  {
    slug: 'lippan-clay',
    name: 'Lippan & Clay Art',
    craftGroup: 'lippan-clay',
    tagline: 'Kutch mirror work, raised by hand.',
    description: 'Traditional mud-and-mirror wall frames, multi-panel installations and clay miniatures.',
    intro:
      'Lippan is a Kutchi craft: clay raised into relief by hand, then set with mirrors that catch every bit of light in the room. Each frame is drawn freehand — the peacocks, the diyas, the borders — so no two are ever identical. We take commissions for full multi-panel walls, planned with you before we begin.',
    href: '/collections/lippan-clay',
    image: {
      id: 'collection-lippan-clay',
      label: 'Lippan & Clay Art',
      alt: 'A Lippan art mirror frame hanging on a wall',
      aspect: '4:5',
      note: 'Single Lippan round frame on a plain wall, raking side light so relief and mirrors both read.',
    },
    hero: {
      id: 'collection-lippan-clay-hero',
      label: 'Lippan & Clay — banner',
      alt: 'A multi-panel Lippan art installation on a living room wall',
      aspect: '21:9',
      note: 'Wide banner: full Lippan wall installation in situ. Raking light so the raised clay casts shadow and mirrors sparkle.',
    },
  },
  {
    slug: 'marathi-craft',
    name: 'Marathi & MDF Craft',
    craftGroup: 'marathi-craft',
    tagline: 'जय महाराष्ट्र — craft with a postcode.',
    description: 'Marathi quote nameplates, जय महाराष्ट्र map cutouts, calendars and custom nameplates.',
    intro:
      'The most local thing we make. Layered MDF nameplates carrying the lines Maharashtrians grow up with, the state map cut out and finished in saffron, and our yearly Marathi calendar with every tithi marked. Cut, sanded, painted and assembled by hand — and made in your family name if you like.',
    href: '/collections/marathi-craft',
    image: {
      id: 'collection-marathi-craft',
      label: 'Marathi & MDF Craft',
      alt: 'A Marathi quote nameplate and a Jai Maharashtra map cutout on a wall',
      aspect: '4:5',
      note: 'Marathi nameplate and Maharashtra cutout styled together on a wall. Devanagari must be sharp and correct.',
    },
    hero: {
      id: 'collection-marathi-craft-hero',
      label: 'Marathi & MDF Craft — banner',
      alt: 'Marathi nameplates and MDF craft pieces arranged on a wall',
      aspect: '21:9',
      note: 'Wide banner: nameplates, map cutouts and a calendar arranged together. Devanagari lettering must be crisp.',
    },
  },
];

/** The four cards in "Shop by Craft". */
export const craftGroups: CraftGroup[] = [
  {
    id: 'candles',
    name: 'Candles',
    tagline: 'Mithai, florals and décor — all poured in 100% soy wax.',
    href: '/collections/mithai-candles',
    collectionSlugs: ['mithai-candles', 'floral-candles', 'decor-candles'],
    image: {
      id: 'craft-candles',
      label: 'Candles',
      alt: 'A spread of handmade soy wax candles including modak, florals and jars',
      aspect: '4:5',
      note: 'Wide spread showing the breadth of the candle range in one frame — mithai, florals, jars, tapers.',
    },
  },
  {
    id: 'resin-art',
    name: 'Resin Art',
    tagline: 'Ganesha standees and keepsakes that hold a memory in place.',
    href: '/collections/resin-art',
    collectionSlugs: ['resin-art'],
    image: {
      id: 'craft-resin-art',
      label: 'Resin Art',
      alt: 'Resin art pieces including a Ganesha standee and photo magnets',
      aspect: '4:5',
      note: 'Ganesha standee, keepsake frame and polaroid magnets grouped together on a wooden surface.',
    },
  },
  {
    id: 'lippan-clay',
    name: 'Lippan & Clay Art',
    tagline: 'Traditional Kutch mirror work for your walls.',
    href: '/collections/lippan-clay',
    collectionSlugs: ['lippan-clay'],
    image: {
      id: 'craft-lippan-clay',
      label: 'Lippan & Clay Art',
      alt: 'Lippan mirror art frames and clay miniatures',
      aspect: '4:5',
      note: 'Two Lippan frames of different sizes with a clay miniature in the foreground.',
    },
  },
  {
    id: 'marathi-craft',
    name: 'Marathi & MDF Craft',
    tagline: 'जय महाराष्ट्र — nameplates, cutouts and calendars with Maharashtra in them.',
    href: '/collections/marathi-craft',
    collectionSlugs: ['marathi-craft'],
    image: {
      id: 'craft-marathi-craft',
      label: 'Marathi & MDF Craft',
      alt: 'Marathi nameplates and MDF craft pieces',
      aspect: '4:5',
      note: 'Marathi nameplate, Maharashtra cutout and calendar arranged together. Devanagari sharp.',
    },
  },
];

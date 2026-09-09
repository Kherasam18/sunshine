import type { Product } from '@/types';
import { palette, productImage } from './_shared';

/** Lippan & clay — traditional Kutch mud-and-mirror work, made in Pune. */
export const lippanClay: Product[] = [
  {
    slug: 'lippan-art-wall-frame',
    name: 'Lippan Art Wall Frame',
    category: 'lippan-clay',
    shortDescription: 'Traditional Kutch mud-and-mirror work, raised by hand into a wall frame.',
    longDescription:
      'Lippan is a Kutchi craft: clay raised into relief by hand, then set with mirrors that catch every bit of light in the room. Each frame is drawn freehand — the peacocks, the diyas, the borders — so no two are ever identical. Choose your size and your background colour.',
    price: 1200,
    priceLabel: 'From ₹1,200',
    materials: ['Clay relief work', 'Glass mirrors', 'MDF base', 'Matte finish'],
    dimensions: '12 in round · 16 in round · custom',
    colours: [palette.terracotta, palette.white, palette.cocoa, palette.gold],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['housewarming', 'diwali', 'weddings-return-gifts'],
    featured: true,
    badges: ['Traditional craft', 'One of a kind'],
    images: [
      productImage(
        'lippan-art-wall-frame',
        'Lippan Art Wall Frame',
        'Round Lippan frame hung on a plain wall, lit from the side so the raised clay casts shadow and the mirrors sparkle.',
        { aspect: '4:5' },
      ),
    ],
  },
  {
    slug: 'lippan-art-panel-set',
    name: 'Lippan Art Panel Set',
    category: 'lippan-clay',
    shortDescription: 'A multi-panel wall installation — a whole feature wall in traditional relief.',
    longDescription:
      'Three or five panels designed to hang together as one composition, sized to your wall. Commissioned for living rooms, entryways and boutique hotel lobbies — we plan the layout with you before we start.',
    price: null,
    priceLabel: 'Quoted on enquiry',
    materials: ['Clay relief work', 'Glass mirrors', 'MDF panels'],
    dimensions: 'Made to your wall',
    colours: [palette.terracotta, palette.white, palette.cocoa, palette.sage],
    fragrances: [],
    customisable: true,
    leadTimeDays: 30,
    occasions: ['housewarming', 'diwali'],
    featured: false,
    badges: ['Commission'],
    images: [
      productImage(
        'lippan-art-panel-set',
        'Lippan Art Panel Set',
        'Full multi-panel Lippan installation in situ on a living-room wall. Wide shot showing scale against furniture.',
        { aspect: '3:2' },
      ),
    ],
  },
  {
    slug: 'clay-miniature-piece',
    name: 'Clay Miniature Piece',
    category: 'lippan-clay',
    shortDescription: 'Tiny hand-shaped clay scenes — the details that make a frame sing.',
    longDescription:
      'Hand-shaped clay miniatures — diyas, pots, little village scenes — sold on their own as shelf pieces or set into frames and standees. Small work, slow work, entirely done by hand.',
    price: 350,
    priceLabel: 'From ₹350',
    materials: ['Air-dry clay', 'Hand-painted finish'],
    dimensions: 'Approx. 6–10 cm',
    colours: [palette.terracotta, palette.saffron, palette.sage, palette.white],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['housewarming', 'diwali', 'weddings-return-gifts'],
    featured: false,
    images: [
      productImage('clay-miniature-piece', 'Clay Miniature Piece', 'Macro of a clay miniature scene on a shelf, shallow depth of field, warm light.', { aspect: '1:1' }),
    ],
  },
];

import type { Product } from '@/types';
import { palette, productImage } from './_shared';

/** Marathi & MDF craft — the local, cultural heart of the studio. */
export const marathiCraft: Product[] = [
  {
    slug: 'marathi-quote-nameplate',
    name: 'Marathi Quote Nameplate',
    category: 'marathi-craft',
    shortDescription: 'लाभले आम्हास भाग्य बोलतो मराठी — cut, layered and finished by hand.',
    longDescription:
      'A layered MDF nameplate carrying the line every Maharashtrian grows up with: लाभले आम्हास भाग्य बोलतो मराठी. Cut, sanded, painted and assembled by hand — add your family name and it becomes the first thing guests read at your door.',
    price: 850,
    priceLabel: 'From ₹850',
    materials: ['Laser-cut MDF', 'Hand-painted finish', 'Wall mount fittings'],
    dimensions: '12 in × 8 in · custom sizes on request',
    colours: [palette.cocoa, palette.terracotta, palette.gold, palette.white],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['housewarming', 'diwali'],
    featured: true,
    badges: ['Personalised'],
    images: [
      productImage(
        'marathi-quote-nameplate',
        'Marathi Quote Nameplate',
        'Layered Marathi quote nameplate mounted beside a front door. Straight-on shot, Devanagari lettering crisp and fully legible.',
        { aspect: '3:2' },
      ),
    ],
  },
  {
    slug: 'jai-maharashtra-map-cutout',
    name: 'Jai Maharashtra Map Cutout',
    category: 'marathi-craft',
    shortDescription: 'जय महाराष्ट्र — the state map, cut out and ready for a wall or a fridge.',
    longDescription:
      'The outline of Maharashtra with जय महाराष्ट्र across it, cut in MDF and finished in saffron and deep brown. Sold as a wall piece or as a fridge magnet — a small, proud thing that sells hard around Maharashtra Din.',
    price: 400,
    priceLabel: 'From ₹400',
    bulkTiers: [
      { moq: 20, pricePerUnit: 350, label: 'MOQ 20 pieces' },
      { moq: 50, pricePerUnit: 300, label: '50 pieces and above' },
    ],
    materials: ['Laser-cut MDF', 'Hand-painted finish'],
    dimensions: '10 in wall piece · 3 in magnet',
    colours: [palette.saffron, palette.cocoa, palette.gold, palette.white],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['housewarming', 'diwali'],
    featured: false,
    images: [
      productImage(
        'jai-maharashtra-map-cutout',
        'Jai Maharashtra Map Cutout',
        'Maharashtra map cutout on a saffron-washed wall. Devanagari lettering must be sharp and correctly rendered.',
        { aspect: '1:1' },
      ),
    ],
  },
  {
    slug: 'marathi-calendar',
    name: 'Marathi Calendar',
    category: 'marathi-craft',
    shortDescription: 'A handmade Marathi calendar with every tithi and festival marked.',
    longDescription:
      'Our yearly Marathi calendar, hand-assembled with festival dates and tithis marked. Made in a limited run each year — corporate buyers can have their logo added to the header.',
    price: 550,
    priceLabel: 'From ₹550',
    bulkTiers: [{ moq: 20, pricePerUnit: 480, label: 'MOQ 20 pieces' }],
    materials: ['Printed board', 'MDF stand', 'Hand assembly'],
    dimensions: 'A4 desk calendar',
    colours: [palette.saffron, palette.cocoa, palette.gold],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['diwali', 'housewarming'],
    featured: false,
    badges: ['Corporate branding available'],
    images: [
      productImage('marathi-calendar', 'Marathi Calendar', 'Marathi desk calendar standing on a work desk, current month page open, Devanagari legible.', { aspect: '4:5' }),
    ],
  },
  {
    slug: 'custom-mdf-nameplate',
    name: 'Custom MDF Nameplate',
    category: 'marathi-craft',
    shortDescription: 'Your family name, your language, your colours — cut to order.',
    longDescription:
      'Tell us the name, the script and the palette, and we design a layered MDF nameplate around it — Marathi, Hindi or English. A standing housewarming gift that arrives ready to mount.',
    price: null,
    priceLabel: 'Quoted on enquiry',
    materials: ['Laser-cut MDF', 'Hand-painted finish', 'Wall mount fittings'],
    dimensions: 'Made to order',
    colours: [palette.cocoa, palette.terracotta, palette.gold, palette.sage, palette.white],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['housewarming', 'weddings-return-gifts'],
    featured: false,
    badges: ['Personalised'],
    images: [
      productImage('custom-mdf-nameplate', 'Custom MDF Nameplate', 'Three custom nameplates in different palettes laid out flat, showing range of styles.', { aspect: '3:2' }),
    ],
  },
];

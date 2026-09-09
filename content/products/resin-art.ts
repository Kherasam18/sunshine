import type { Product } from '@/types';
import { palette, productImage } from './_shared';

/** Resin art — the personalised, keepsake end of the studio. */
export const resinArt: Product[] = [
  {
    slug: 'resin-ganesha-standee',
    name: 'Resin Ganesha Standee',
    category: 'resin-art',
    shortDescription: 'Bappa for your dashboard, your desk or your mandir — in eight colours.',
    longDescription:
      'A slim resin Ganesha standee with a gold-leaf finish, cast to sit steadily on a car dashboard, an office desk or a home mandir shelf. Available in around eight colourways, and one of our most-ordered return gifts for Ganesh Chaturthi and satyanarayan pooja.',
    price: 250,
    priceLabel: 'From ₹250',
    bulkTiers: [
      { moq: 20, pricePerUnit: 220, label: 'MOQ 20 pieces' },
      { moq: 50, pricePerUnit: 200, label: '50 pieces and above' },
    ],
    materials: ['Epoxy resin', 'Gold leaf detailing', 'Wooden base'],
    dimensions: 'Approx. 10 cm tall',
    colours: [palette.saffron, palette.red, palette.gold, palette.sage, palette.sky, palette.lilac, palette.white, palette.terracotta],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['ganesh-chaturthi', 'diwali', 'housewarming', 'weddings-return-gifts'],
    featured: true,
    badges: ['8 colours', 'Return gift favourite'],
    images: [
      productImage(
        'resin-ganesha-standee',
        'Resin Ganesha Standee',
        'Resin Ganesha standee on a wooden slice with a lit diya and marigold beside it. Gold leaf must catch the light.',
      ),
    ],
  },
  {
    slug: 'personalised-keepsake-frame',
    name: 'Personalised Keepsake Frame',
    category: 'resin-art',
    shortDescription: 'Freeze your special moments — your photo, names and date, set in resin with dried flowers.',
    longDescription:
      'Send us your favourite photograph and we set it in clear resin with your names, your date and real dried flowers pressed around it. Made one at a time for weddings, anniversaries and engagements — the gift people keep on the shelf for years.',
    price: null,
    priceLabel: 'Quoted on enquiry',
    materials: ['Epoxy resin', 'Your printed photograph', 'Real dried flowers', 'Wooden backing'],
    dimensions: 'A5 and A4 sizes',
    colours: [palette.blush, palette.white, palette.gold, palette.sage],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['valentines', 'weddings-return-gifts', 'housewarming'],
    featured: true,
    badges: ['Personalised', 'Made one at a time'],
    images: [
      productImage(
        'personalised-keepsake-frame',
        'Personalised Keepsake Frame',
        'Couple keepsake frame with names and date, dried flowers around the photo. Shoot straight on, no glare on the resin.',
      ),
    ],
  },
  {
    slug: 'polaroid-photo-magnet',
    name: 'Polaroid Photo Magnet',
    category: 'resin-art',
    shortDescription: 'Your photographs as little polaroids for the fridge.',
    longDescription:
      'Your photos set in resin as polaroid-style magnets, with a handwritten caption if you like. Order a set of six for a birthday, or a hundred for a wedding welcome table.',
    price: 80,
    priceLabel: 'From ₹80',
    bulkTiers: [
      { moq: 20, pricePerUnit: 70, label: 'MOQ 20 pieces' },
      { moq: 50, pricePerUnit: 60, label: '50 pieces and above' },
    ],
    materials: ['Epoxy resin', 'Your printed photograph', 'Neodymium magnet'],
    dimensions: 'Approx. 6 cm × 7.5 cm',
    colours: [palette.white, palette.cream],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['weddings-return-gifts', 'valentines', 'housewarming'],
    featured: false,
    badges: ['Personalised'],
    images: [
      productImage('polaroid-photo-magnet', 'Polaroid Photo Magnet', 'Six polaroid resin magnets arranged on a fridge door, handwritten captions visible.'),
    ],
  },
  {
    slug: 'resin-coaster-set',
    name: 'Resin Coaster Set',
    category: 'resin-art',
    shortDescription: 'Four coasters, gold-veined, no two ever the same.',
    longDescription:
      'A set of four resin coasters poured with gold veining and a gilded edge, with a matching stand. A safe, handsome choice for corporate gifting and housewarmings.',
    price: 750,
    priceLabel: 'From ₹750 / set of 4',
    bulkTiers: [{ moq: 20, pricePerUnit: 650, label: 'MOQ 20 sets' }],
    materials: ['Epoxy resin', 'Gold leaf', 'Resin stand'],
    dimensions: '10 cm each, set of 4',
    colours: [palette.terracotta, palette.sage, palette.sky, palette.white, palette.gold],
    fragrances: [],
    customisable: true,
    leadTimeDays: 20,
    occasions: ['housewarming', 'diwali', 'weddings-return-gifts'],
    featured: false,
    images: [
      productImage('resin-coaster-set', 'Resin Coaster Set', 'Set of four coasters fanned out with the stand, gold veining catching light, on a dark wood table.'),
    ],
  },
];

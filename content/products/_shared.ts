import type { AspectRatio, BulkTier, Colour, ImageSlot } from '@/types';

/** Builds a product image slot with a consistent id scheme: `product-<slug>`. */
export function productImage(
  slug: string,
  label: string,
  note: string,
  options: { aspect?: AspectRatio; alt?: string; suffix?: string; src?: string } = {},
): ImageSlot {
  const { aspect = '4:5', alt, suffix, src } = options;
  return {
    id: suffix ? `product-${slug}-${suffix}` : `product-${slug}`,
    label,
    alt: alt ?? `${label} — handmade by Sunshine Creations`,
    aspect,
    note,
    src,
  };
}

export const palette = {
  white: { name: 'Ivory white', hex: '#F6F1E7' },
  saffron: { name: 'Saffron', hex: '#F4922B' },
  purple: { name: 'Royal purple', hex: '#9B7BB8' },
  pink: { name: 'Rose pink', hex: '#F2C4C8' },
  orange: { name: 'Marigold orange', hex: '#E8712F' },
  gold: { name: 'Antique gold', hex: '#C9A227' },
  red: { name: 'Kumkum red', hex: '#C1392B' },
  blush: { name: 'Blush', hex: '#F6D8D5' },
  sage: { name: 'Sage green', hex: '#9CAF88' },
  sky: { name: 'Powder blue', hex: '#A9C4D9' },
  lilac: { name: 'Lilac', hex: '#C3B1DB' },
  butter: { name: 'Butter yellow', hex: '#F2D48B' },
  terracotta: { name: 'Terracotta', hex: '#D2691E' },
  cocoa: { name: 'Cocoa brown', hex: '#6B4A32' },
  pista: { name: 'Pista green', hex: '#BFD8A3' },
  cream: { name: 'Cream', hex: '#FDF8F0' },
} satisfies Record<string, Colour>;

export const mithaiColours: Colour[] = [
  palette.white,
  palette.saffron,
  palette.purple,
  palette.pink,
  palette.orange,
];

export const fragrances = {
  standard: ['Vanilla', 'Rose', 'Sandalwood', 'Jasmine', 'Lavender', 'Unscented'],
  festive: ['Kesar Elaichi', 'Sandalwood', 'Mogra', 'Rose', 'Vanilla', 'Unscented'],
  floral: ['Rose', 'Mogra', 'Jasmine', 'Lavender', 'Lily', 'Unscented'],
};

/** The published mithai wholesale ladder, shared by modak and laddu. */
export const mithaiBulkTiers: BulkTier[] = [
  { moq: 20, pricePerUnit: 35, label: 'MOQ 20 pieces' },
  { moq: 50, pricePerUnit: 30, label: '50 pieces and above' },
];

export const soyMaterials = ['100% soy wax', 'Cotton wick', 'Skin-safe colour', 'Premium fragrance oil'];

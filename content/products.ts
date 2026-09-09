import type { ImageSlot, Product, ProductCategory, VideoSlot } from '@/types';
import { mithaiCandles } from './products/mithai-candles';
import { floralCandles } from './products/floral-candles';
import { decorCandles } from './products/decor-candles';
import { resinArt } from './products/resin-art';
import { lippanClay } from './products/lippan-clay';
import { marathiCraft } from './products/marathi-craft';

/** Styling direction per craft, used to write the default angle briefs. */
const styling: Record<ProductCategory, string> = {
  'mithai-candles': 'on a brass thali with marigold petals',
  'floral-candles': 'on cream fabric in soft daylight with fresh petals nearby',
  'decor-candles': 'on a styled shelf beside books and a small plant',
  'resin-art': 'in a home setting, angled so the resin does not glare',
  'lippan-clay': 'on a plain wall with raking side light',
  'marathi-craft': 'mounted beside a doorway in daylight',
};

/**
 * Every product page shows a main image plus three supporting angles. Rather
 * than hand-authoring 100+ near-identical slots, the standard angles are
 * generated here and flagged `optional` so ASSETS-MANIFEST.md can separate
 * them from the shots the site genuinely needs.
 */
function defaultAngles(product: Product): ImageSlot[] {
  const context = styling[product.category];
  return [
    {
      id: `product-${product.slug}-detail`,
      label: `${product.name} — detail`,
      alt: `Close detail of the ${product.name}`,
      aspect: '1:1',
      note: `Macro of the finish on the ${product.name} — texture, silver leaf, edges. Fill the frame and keep it tack sharp.`,
      optional: true,
    },
    {
      id: `product-${product.slug}-styled`,
      label: `${product.name} — styled`,
      alt: `The ${product.name} styled in a home setting`,
      aspect: '4:5',
      note: `The ${product.name} ${context}. Lifestyle framing, not product-on-white.`,
      optional: true,
    },
    {
      id: `product-${product.slug}-scale`,
      label: `${product.name} — in hand`,
      alt: `The ${product.name} held in hand to show its size`,
      aspect: '1:1',
      note: `The ${product.name} held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot.`,
      optional: true,
    },
  ];
}

function defaultReel(product: Product): VideoSlot {
  return {
    id: `product-${product.slug}-reel`,
    label: `${product.name} — making-of reel`,
    aspect: '9:16',
    note: `Vertical reel of the ${product.name} being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920.`,
  };
}

/** Appends the standard gallery angles and reel without disturbing authored ones. */
function withMedia(product: Product): Product {
  const authored = new Set(product.images.map((image) => image.id));
  const generated = defaultAngles(product).filter((image) => !authored.has(image.id));

  return {
    ...product,
    images: [...product.images, ...generated],
    reel: product.reel ?? defaultReel(product),
  };
}

/**
 * The full catalogue. Split by category into ./products/* purely for
 * readability — this file is the single import point for the data layer,
 * and the one to replace with a CMS query later.
 */
export const products: Product[] = [
  ...mithaiCandles,
  ...floralCandles,
  ...decorCandles,
  ...resinArt,
  ...lippanClay,
  ...marathiCraft,
].map(withMedia);

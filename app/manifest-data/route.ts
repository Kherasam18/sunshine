import { NextResponse } from 'next/server';
import {
  getBulkContent,
  getBulkImage,
  getCollections,
  getContactImage,
  getCraftGroups,
  getHeroImage,
  getOccasions,
  getProcess,
  getProducts,
  getStory,
  getStudioFeed,
} from '@/lib/content';

/**
 * Development-only endpoint feeding scripts/generate-manifest.mjs, which
 * regenerates ASSETS-MANIFEST.md from the same getters the site renders from —
 * so the photography brief can never drift from the catalogue.
 */
export const dynamic = 'force-static';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not found', { status: 404 });
  }

  const [hero, bulkBanner, feed, making, collections, crafts, occasions, products, bulk, story, contact] =
    await Promise.all([
      getHeroImage(),
      getBulkImage(),
      getStudioFeed(),
      getProcess(),
      getCollections(),
      getCraftGroups(),
      getOccasions(),
      getProducts(),
      getBulkContent(),
      getStory(),
      getContactImage(),
    ]);

  const rows = [
    { section: 'Home — Hero', slots: [hero] },
    { section: 'Home — Bulk banner', slots: [bulkBanner] },
    { section: 'Home — Made by Hand', slots: making.steps.map((step) => step.image) },
    { section: 'Home — From the Studio', slots: feed },
    { section: 'Home — Shop by Craft', slots: crafts.map((craft) => craft.image) },
    { section: 'Home — Shop by Occasion', slots: occasions.map((occasion) => occasion.image) },
    { section: 'Collection cards', slots: collections.map((collection) => collection.image) },
    { section: 'Collection page banners', slots: collections.map((collection) => collection.hero) },
    { section: 'Occasion page banners', slots: occasions.map((occasion) => occasion.hero) },
    { section: 'Bulk & Corporate — banner', slots: [bulk.hero] },
    { section: 'Bulk & Corporate — gallery', slots: bulk.gallery },
    { section: 'Our Story', slots: [story.hero, story.portrait, story.studio] },
    { section: 'Contact', slots: [contact] },
    ...products.map((product) => ({
      section: `Product — ${product.name}`,
      slots: product.images,
      category: product.category,
    })),
  ];

  const videos = [
    { section: 'Home — Made by Hand', slot: making.video },
    ...products
      .filter((product) => product.reel)
      .map((product) => ({ section: `Product — ${product.name}`, slot: product.reel })),
  ];

  return NextResponse.json({ rows, videos, productCount: products.length });
}

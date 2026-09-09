import type {
  BrandingOption,
  BulkUseCase,
  CareTip,
  Collection,
  CraftGroup,
  FaqItem,
  ImageSlot,
  OrderStep,
  StoryChapter,
  StudioHours,
  NavItem,
  Occasion,
  ProcessStep,
  Product,
  ProductCategory,
  Testimonial,
  VideoSlot,
  WholesaleTier,
} from '@/types';

import { products } from '@/content/products';
import { collections, craftGroups } from '@/content/collections';
import { occasions } from '@/content/occasions';
import { testimonials } from '@/content/testimonials';
import { careTips, faqs, orderSteps } from '@/content/order-process';
import {
  brandingOptions,
  bulkBudgetBands,
  bulkGallery,
  bulkHero,
  bulkQuantityBands,
  bulkUseCases,
} from '@/content/bulk';
import { founderPortrait, storyChapters, storyHero, storyStats, studioImage } from '@/content/story';
import {
  bulkImage,
  contactImage,
  footerNav,
  heroImage,
  policyNav,
  primaryNav,
  processSteps,
  processVideo,
  secondaryNav,
  site,
  studioFeed,
  studioHours,
  trustPoints,
  wholesaleTiers,
} from '@/content/site';

/**
 * The content API.
 *
 * Components import from here and nowhere else. Every getter is async and
 * returns plain typed data, so each body can later be swapped for a CMS fetch
 * (Sanity, Payload, anything) without touching a single component.
 */

type TrustPoint = (typeof trustPoints)[number];

/** Local reads are synchronous; the async signature is the future-proofing. */
async function resolve<T>(value: T): Promise<T> {
  return value;
}

/* ------------------------------------------------------------------ site */

export async function getSiteConfig() {
  return resolve(site);
}

export async function getNavigation(): Promise<{
  primary: NavItem[];
  secondary: NavItem[];
  footer: typeof footerNav;
  policy: NavItem[];
}> {
  return resolve({
    primary: primaryNav,
    secondary: secondaryNav,
    footer: footerNav,
    policy: policyNav,
  });
}

export async function getTrustPoints(): Promise<readonly TrustPoint[]> {
  return resolve(trustPoints);
}

export async function getWholesaleTiers(): Promise<WholesaleTier[]> {
  return resolve(wholesaleTiers);
}

export async function getHeroImage(): Promise<ImageSlot> {
  return resolve(heroImage);
}

export async function getBulkImage(): Promise<ImageSlot> {
  return resolve(bulkImage);
}

export async function getStudioFeed(): Promise<ImageSlot[]> {
  return resolve(studioFeed);
}

export async function getProcess(): Promise<{ steps: ProcessStep[]; video: VideoSlot }> {
  return resolve({ steps: processSteps, video: processVideo });
}

/* -------------------------------------------------------------- products */

export async function getProducts(): Promise<Product[]> {
  return resolve(products);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return resolve(products.find((product) => product.slug === slug));
}

/** Preserves the order of the slugs passed in — used for occasion edits. */
export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  return resolve(slugs.map((slug) => bySlug.get(slug)).filter((p): p is Product => Boolean(p)));
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  return resolve(products.filter((product) => product.category === category));
}

export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  const featured = products.filter((product) => product.featured);
  return resolve(typeof limit === 'number' ? featured.slice(0, limit) : featured);
}

export async function getProductsByOccasion(occasionSlug: string): Promise<Product[]> {
  return resolve(products.filter((product) => product.occasions.includes(occasionSlug)));
}

/* ----------------------------------------------------------- collections */

export async function getCollections(): Promise<Collection[]> {
  return resolve(collections);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
  return resolve(collections.find((collection) => collection.slug === slug));
}

export async function getCraftGroups(): Promise<CraftGroup[]> {
  return resolve(craftGroups);
}

/* ------------------------------------------------------------- occasions */

/**
 * Returns occasions with `site.featuredOccasion` moved to the front, so the
 * current festival always leads the strip. Change the config value, not this.
 */
export async function getOccasions(): Promise<Occasion[]> {
  const featuredSlug = site.featuredOccasion;
  const ordered = [...occasions].sort((a, b) => {
    if (a.slug === featuredSlug) return -1;
    if (b.slug === featuredSlug) return 1;
    return 0;
  });
  return resolve(ordered);
}

export async function getFeaturedOccasion(): Promise<Occasion | undefined> {
  return resolve(occasions.find((occasion) => occasion.slug === site.featuredOccasion));
}

export async function getOccasionBySlug(slug: string): Promise<Occasion | undefined> {
  return resolve(occasions.find((occasion) => occasion.slug === slug));
}

/* ---------------------------------------------------------- testimonials */

export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  return resolve(typeof limit === 'number' ? testimonials.slice(0, limit) : testimonials);
}

/* --------------------------------------------------- order process & help */

export async function getOrderSteps(): Promise<OrderStep[]> {
  return resolve(orderSteps);
}

export async function getCareTips(): Promise<CareTip[]> {
  return resolve(careTips);
}

export async function getFaqs(group?: FaqItem['group']): Promise<FaqItem[]> {
  return resolve(group ? faqs.filter((faq) => faq.group === group) : faqs);
}

/* ------------------------------------------------------------------ bulk */

export async function getBulkContent(): Promise<{
  useCases: BulkUseCase[];
  branding: BrandingOption[];
  gallery: ImageSlot[];
  hero: ImageSlot;
  quantityBands: string[];
  budgetBands: string[];
}> {
  return resolve({
    useCases: bulkUseCases,
    branding: brandingOptions,
    gallery: bulkGallery,
    hero: bulkHero,
    quantityBands: [...bulkQuantityBands],
    budgetBands: [...bulkBudgetBands],
  });
}

/* ----------------------------------------------------------------- story */

export async function getStory(): Promise<{
  chapters: StoryChapter[];
  hero: ImageSlot;
  portrait: ImageSlot;
  studio: ImageSlot;
  stats: typeof storyStats;
}> {
  return resolve({
    chapters: storyChapters,
    hero: storyHero,
    portrait: founderPortrait,
    studio: studioImage,
    stats: storyStats,
  });
}

/* --------------------------------------------------------------- contact */

export async function getStudioHours(): Promise<StudioHours[]> {
  return resolve(studioHours);
}

export async function getContactImage(): Promise<ImageSlot> {
  return resolve(contactImage);
}

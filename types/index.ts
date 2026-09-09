/**
 * Content contracts for Sunshine Creations.
 *
 * These interfaces are the single source of truth shared by the local content
 * files (/content) and the async getters in /lib/content.ts. A headless CMS can
 * later populate the exact same shapes without a single component changing.
 */

export type AspectRatio = '1:1' | '4:5' | '3:4' | '3:2' | '16:9' | '21:9' | '9:16';

/** A single photography slot. Until `src` is supplied a brand placeholder renders. */
export interface ImageSlot {
  /** Stable id, also used as the row key in ASSETS-MANIFEST.md */
  id: string;
  /** Short human label, shown inside the placeholder */
  label: string;
  /** Alt text — always written, placeholder or not */
  alt: string;
  aspect: AspectRatio;
  /** Art direction for the client: what this photo must show */
  note: string;
  /** Supply a real photo path to swap the placeholder out */
  src?: string;
  /**
   * Art-directed crop served below `md`. A landscape hero squashed into a
   * phone viewport loses its subject, so wide slots get a portrait version.
   */
  mobileSrc?: string;
  /** What the mobile crop needs to show, when it differs from the main shot. */
  mobileNote?: string;
  /**
   * Secondary angles the site works fine without. Kept separate in
   * ASSETS-MANIFEST.md so the client knows what is genuinely required.
   */
  optional?: boolean;
}

export interface VideoSlot {
  id: string;
  label: string;
  note: string;
  aspect: AspectRatio;
  /** Muted, looping source. Placeholder renders until supplied. */
  src?: string;
  poster?: ImageSlot;
}

export type ProductCategory =
  | 'mithai-candles'
  | 'floral-candles'
  | 'decor-candles'
  | 'resin-art'
  | 'lippan-clay'
  | 'marathi-craft';

export type CraftGroupId = 'candles' | 'resin-art' | 'lippan-clay' | 'marathi-craft';

export interface Colour {
  name: string;
  /** Hex swatch used for the colour dots on product cards */
  hex: string;
}

export interface BulkTier {
  /** Minimum order quantity for this tier */
  moq: number;
  pricePerUnit: number;
  label: string;
}

export interface BoxOption {
  pieces: number;
  price: number;
  label: string;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  longDescription: string;
  /** Retail price per piece in INR. Null when quoted on enquiry. */
  price: number | null;
  priceLabel: string;
  bulkTiers?: BulkTier[];
  boxOption?: BoxOption;
  materials: string[];
  burnTime?: string;
  dimensions?: string;
  colours: Colour[];
  fragrances: string[];
  customisable: boolean;
  leadTimeDays: number;
  /** Occasion slugs this product is pitched for */
  occasions: string[];
  images: ImageSlot[];
  /** Vertical making-of reel shown on the product page. */
  reel?: VideoSlot;
  /** What arrives in the box, for the specs block. */
  boxContents?: string;
  featured: boolean;
  /** Optional short flags rendered as badges, e.g. "Bestseller" */
  badges?: string[];
}

export interface Collection {
  slug: string;
  name: string;
  craftGroup: CraftGroupId;
  tagline: string;
  description: string;
  /** Longer opening paragraph for the collection page. */
  intro: string;
  href: string;
  /** Card image used on the home page. */
  image: ImageSlot;
  /** Wide banner for the collection page header. */
  hero: ImageSlot;
}

/** The four top-level crafts shown in "Shop by Craft". */
export interface CraftGroup {
  id: CraftGroupId;
  name: string;
  tagline: string;
  href: string;
  image: ImageSlot;
  collectionSlugs: string[];
}

export interface Occasion {
  slug: string;
  name: string;
  /** e.g. "Aug–Sep" — helps the client see why the order rotates */
  season: string;
  tagline: string;
  description: string;
  /** Opening copy on the occasion page. */
  intro: string;
  /** A warm, specific gifting note — what people actually buy and why. */
  giftNote: string;
  href: string;
  image: ImageSlot;
  hero: ImageSlot;
  productSlugs: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  context: string;
  rating: 4 | 5;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface WholesaleTier {
  quantity: string;
  pricePerUnit: string;
  bestFor: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  image: ImageSlot;
}

/* --------------------------------------------------------- page content */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  group: 'ordering' | 'shipping' | 'handmade' | 'care' | 'bulk';
}

export interface OrderStep {
  step: string;
  title: string;
  description: string;
  /** Optional reassurance line shown in a lighter tone. */
  note?: string;
  icon: string;
}

export interface CareTip {
  title: string;
  description: string;
  icon: string;
}

export interface BulkUseCase {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BrandingOption {
  title: string;
  description: string;
  icon: string;
}

export interface StoryChapter {
  id: string;
  eyebrow: string;
  title: string;
  /** Paragraphs, rendered in order. */
  body: string[];
  image?: ImageSlot;
  /** Pull quote in the founder's own voice. */
  quote?: string;
}

export interface StudioHours {
  days: string;
  hours: string;
}

/** One step in the /customise request builder. */
export interface CustomiseStep {
  id: 'craft' | 'product' | 'colour' | 'fragrance' | 'quantity' | 'details' | 'occasion' | 'date';
  title: string;
  helper: string;
}

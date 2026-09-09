import type { ImageSlot, NavItem, ProcessStep, StudioHours, VideoSlot, WholesaleTier } from '@/types';

/**
 * Brand configuration. Everything a client would want to edit without a
 * developer — nav, contact, the leading festival — lives here.
 */
export const site = {
  name: 'Sunshine Creations',
  legalName: 'Sunshine Creations Studio',
  tagline: 'Creating Handmade Happiness for You!',
  shortPitch: 'Premium handmade candles, resin art & décor — made by hand in Pune.',
  description:
    'Sunshine Creations is a Pune handmade studio turning Indian festive tradition into objects you can light, gift and keep — hyper-realistic modak and laddu candles, floral soy wax, resin Ganesha standees, Lippan mirror art and Marathi craft.',
  location: {
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    display: 'Pune, Maharashtra, India',
  },
  contact: {
    whatsapp: '+91 9270402030',
    /** Digits only — used to build wa.me deep links */
    whatsappNumber: '919270402030',
  },
  social: {
    instagram: 'https://www.instagram.com/sunshinecreations_studio',
    instagramHandle: '@sunshinecreations_studio',
    youtube: 'https://www.youtube.com/@sunshinecreations_studio',
  },
  /**
   * Drives the order of the "Shop by Occasion" strip — the current festival
   * always leads. Change this one value each season.
   */
  featuredOccasion: 'ganesh-chaturthi',
  /** Headline used by the pre-booking capture section. */
  preBooking: {
    occasionName: 'Ganesh Chaturthi',
    open: true,
  },
  order: {
    leadTimeDays: 20,
    minBulkQuantity: 20,
    startingPrice: 30,
  },
} as const;

/** Header and drawer navigation. */
export const primaryNav: NavItem[] = [
  { label: 'Mithai Candles', href: '/collections/mithai-candles' },
  { label: 'Collections', href: '/#crafts' },
  { label: 'Occasions', href: '/#occasions' },
  { label: 'Bulk & Corporate', href: '/bulk' },
  { label: 'Customise', href: '/customise' },
];

/** Shown beneath the primary items in the mobile drawer and in the footer. */
export const secondaryNav: NavItem[] = [
  { label: 'Our Story', href: '/story' },
  { label: 'How to Order', href: '/how-to-order' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Shop',
    items: [
      { label: 'Mithai Candles', href: '/collections/mithai-candles' },
      { label: 'Floral Candles', href: '/collections/floral-candles' },
      { label: 'Décor & Novelty', href: '/collections/decor-candles' },
      { label: 'Resin Art', href: '/collections/resin-art' },
      { label: 'Lippan & Clay Art', href: '/collections/lippan-clay' },
      { label: 'Marathi & MDF Craft', href: '/collections/marathi-craft' },
    ],
  },
  {
    title: 'Gifting',
    items: [
      { label: 'Bulk & Corporate', href: '/bulk' },
      { label: 'Customise Your Gift', href: '/customise' },
      { label: 'Wedding Return Gifts', href: '/occasions/weddings-return-gifts' },
      { label: 'Ganesh Chaturthi', href: '/occasions/ganesh-chaturthi' },
      { label: 'Diwali Gifting', href: '/occasions/diwali' },
    ],
  },
  {
    title: 'Studio',
    items: [
      { label: 'Our Story', href: '/story' },
      { label: 'How to Order', href: '/how-to-order' },
      { label: 'Contact', href: '/contact' },
      { label: 'Kind Words', href: '/#testimonials' },
    ],
  },
];

export const policyNav: NavItem[] = [
  { label: 'How to Order', href: '/how-to-order' },
  { label: 'Our Handmade Promise', href: '/how-to-order#handmade' },
  { label: 'Shipping & Care', href: '/how-to-order#faqs' },
];

export const trustPoints = [
  { icon: 'leaf', label: '100% Soy Wax', detail: 'Clean, eco-friendly, non-toxic' },
  { icon: 'hand', label: 'Handmade to Order', detail: 'Poured for you, never mass-made' },
  { icon: 'palette', label: 'Fully Customisable', detail: 'Any colour, any fragrance' },
  { icon: 'boxes', label: 'Bulk Orders Welcome', detail: 'From 20 pieces upward' },
] as const;

export const wholesaleTiers: WholesaleTier[] = [
  { quantity: 'Retail · 1–19 pieces', pricePerUnit: '₹40 / piece', bestFor: 'Single gifts & festive hampers' },
  { quantity: 'Bulk · MOQ 20', pricePerUnit: '₹35 / piece', bestFor: 'Return gifts & pooja favours' },
  { quantity: 'Wholesale · 50 +', pricePerUnit: '₹30 / piece', bestFor: 'Corporate & event volume' },
  { quantity: 'Gift box · set of 4', pricePerUnit: '₹185 / box', bestFor: 'Ready-to-hand-over gifting' },
];

export const heroImage: ImageSlot = {
  id: 'home-hero',
  label: 'Hero — mithai candles on brass',
  alt: 'Handmade modak candles arranged on a brass platter with marigold flowers',
  aspect: '16:9',
  note: 'Full-bleed hero. Modak candles on a brass platter with fresh marigolds, warm natural side light, shallow depth of field. Leave clear negative space in the left third for the headline.',
  mobileNote:
    'Portrait 4:5 crop of the same set-up for phones — subject lower in the frame, clear space across the top two-thirds for the headline. Over 90% of visitors arrive on a phone, so shoot this one properly rather than cropping the landscape.',
};

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Poured',
    description:
      'Soy wax is melted, tinted and scented in small batches, then hand-poured into moulds one piece at a time.',
    image: {
      id: 'process-poured',
      label: 'Pouring the wax',
      alt: 'Hands pouring warm soy wax into a modak mould in the studio',
      aspect: '1:1',
      note: 'Close crop of hands pouring wax into a modak mould. Steam, warm light, wax pitcher in frame.',
    },
  },
  {
    step: '02',
    title: 'Detailed',
    description:
      'Every piece is demoulded by hand and finished — silver varq laid on, petals shaped, edges cleaned.',
    image: {
      id: 'process-detailed',
      label: 'Adding silver varq',
      alt: 'Silver varq being applied by hand to a laddu candle',
      aspect: '1:1',
      note: 'Macro shot of silver varq being laid onto a laddu candle with a brush or fingertip. Sharp on the detail.',
    },
  },
  {
    step: '03',
    title: 'Packed with love',
    description:
      'Wrapped, boxed and tied by hand with a note, then packed to travel safely anywhere in India.',
    image: {
      id: 'process-packed',
      label: 'Packing an order',
      alt: 'A finished gift box of candles being tied with ribbon before dispatch',
      aspect: '1:1',
      note: 'Open gift box of four mithai candles being tied with ribbon, tissue and thank-you card visible.',
    },
  },
];

export const processVideo: VideoSlot = {
  id: 'process-reel',
  label: 'Making-of reel',
  aspect: '9:16',
  note: 'Muted, looping vertical reel (15–25s): wax pouring, demoulding, varq detailing, finished piece. Export 1080×1920, H.264 MP4, under 6 MB.',
};

export const studioFeed: ImageSlot[] = [
  { id: 'feed-1', label: 'Modak gift box', alt: 'A boxed set of four modak candles', aspect: '1:1', note: 'Flat-lay of a four-piece modak gift box on cream fabric.' },
  { id: 'feed-2', label: 'Hand-held candle', alt: 'A hand holding a single laddu candle', aspect: '1:1', note: 'Signature hand-in-frame shot holding one laddu candle against a white brick wall.' },
  { id: 'feed-3', label: 'Lippan wall frame', alt: 'A Lippan art mirror frame on a wall', aspect: '1:1', note: 'Lippan mud-and-mirror frame styled on a wall, raking side light to catch the mirrors.' },
  { id: 'feed-4', label: 'Resin Ganesha', alt: 'A resin Ganesha standee in soft light', aspect: '1:1', note: 'Resin Ganesha standee on a wooden slice with a lit diya beside it.' },
  { id: 'feed-5', label: 'Tulip bouquet candle', alt: 'A tulip bouquet candle in pastel colours', aspect: '1:1', note: 'Tulip bouquet candle in three colourways, soft daylight, cream backdrop.' },
  { id: 'feed-6', label: 'Bulk order dispatch', alt: 'A large bulk order packed and ready to dispatch', aspect: '1:1', note: 'Table covered with 50+ packed candle boxes ready for dispatch — proof of bulk capability.' },
];

export const bulkImage: ImageSlot = {
  id: 'bulk-banner',
  label: 'Bulk order spread',
  alt: 'A large table of handmade candles packed for a bulk return-gift order',
  aspect: '16:9',
  note: 'Wide shot of a completed bulk order — rows of boxed candles with tags. Warm light, expose slightly under so white text sits comfortably on top.',
};

/** Shown on /contact. The studio is home-based, so these are reply windows. */
export const studioHours: StudioHours[] = [
  { days: 'Monday – Saturday', hours: '10:00 – 19:00' },
  { days: 'Sunday', hours: 'Messages only — we reply on Monday' },
  { days: 'Festive season', hours: 'Longer hours, faster replies, fuller order book' },
];

export const contactImage: ImageSlot = {
  id: 'contact-studio',
  label: 'The studio table',
  alt: 'The Sunshine Creations work table with wax, moulds and finished pieces',
  aspect: '4:5',
  note: 'The work table mid-project — moulds, colour pots, a half-finished piece. Warm and human, not staged.',
};

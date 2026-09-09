# Sunshine Creations — Website

Front-end for a Pune handmade studio: mithai candles, resin art, Lippan mirror
work and Marathi craft. Built as a client pitch build — the UI is complete and
production-quality; there is deliberately **no backend, no CMS and no payment
integration** yet.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — every route prerenders statically
```

Deploys to Vercel with zero configuration.

---

## Pages

| Route | What it does |
|---|---|
| `/` | Home — hero, mithai signature range, crafts, occasions, bulk, process, testimonials, pre-booking |
| `/collections/[slug]` | Six collections with client-side filtering by occasion, price, colour and customisability |
| `/products/[slug]` | 36 product pages — gallery, colour/fragrance/quantity selectors, bulk tiers, specs, care, making-of reel, occasion cross-sell |
| `/occasions/[slug]` | Six festival pages — curated picks plus everything else that suits |
| `/bulk` | The B2B page: use cases, wholesale tiers, custom branding, completed-order gallery, enquiry form |
| `/customise` | Guided request builder with a live brief panel that composes a WhatsApp message |
| `/story` | Founder-led story, in her own voice |
| `/how-to-order` | Six-step timeline, handmade promise, candle care and FAQ |
| `/contact` | Channels, studio hours and an enquiry form |
| `404` | On-brand, with routes back into the catalogue |

---

## What is real and what is not

| Works for real | Front-end only |
|---|---|
| Every WhatsApp link — real number, composed from live selections | All three forms (pre-booking, bulk enquiry, contact) show an on-brand success state and store nothing |
| Instagram and YouTube links | Photography — on-brand placeholders until shot (see `ASSETS-MANIFEST.md`) |
| Full catalogue, pricing, bulk tiers and filtering | Making-of videos (component accepts a source; placeholder until supplied) |
| Responsive layout, accessibility, SEO metadata, JSON-LD | Search, accounts, checkout |

**There is no cart, and that is deliberate.** Advance payment only, a 20-day
lead time, per-order customisation and ₹30–60 unit prices mean a checkout would
fight the business model. Every product ends in a WhatsApp enquiry instead —
with the colour, fragrance and quantity already written into the message.

---

## Architecture

Content is fully separated from presentation so a headless CMS can be dropped in
without touching a component.

```
content/          Typed source data — products (split by category), collections,
                  occasions, testimonials, bulk, story, order process, brand config
lib/content.ts    The content API. Every getter is async and returns typed data;
                  swap each body for a CMS fetch and nothing else changes.
lib/whatsapp.ts   wa.me deep-link builders — product, bulk, customise, contact
hooks/            useProductFilters — catalogue filtering, kept out of the view
types/            The contracts shared by both sides
components/
  brand/          Logo, sunburst, marigold/sunflower line art, rangoli corners
  ui/             Button, Section, SectionHeading, BrandImage, BrandVideo,
                  ProductCard, Badge, Divider, Accordion, TierTable, PageHero,
                  Breadcrumbs, EmptyState, Skeleton, Field, SelectField, Reveal
  layout/         Header, MobileDrawer, Footer, WhatsAppFloat
  home/ collection/ product/ bulk/ customise/ contact/   page sections
```

**Rule:** components import from `lib/content.ts` only — never from `content/*`
directly. That single boundary is what makes the CMS swap cheap.

### Swapping in a CMS

Replace the body of each getter in `lib/content.ts`. For example:

```ts
export async function getProducts(): Promise<Product[]> {
  return sanity.fetch(`*[_type == "product"]`); // was: return resolve(products)
}
```

Because every getter is already `async` and every component already `await`s it,
nothing above that line changes. Add ISR with `export const revalidate = 60` on
the pages that should refresh.

---

## Adding photography

Placeholders render until a slot has a `src`. To add a real photo:

1. Drop the file in `public/images/` named after its slot ID.
2. Add `src: '/images/<slot-id>.jpg'` to that slot in `content/`.

`ASSETS-MANIFEST.md` lists every slot — 87 required images, 108 optional extra
angles and 37 video slots — with aspect ratios, pixel sizes and the shot needed
for each. That document is what goes to the client. Regenerate it after
catalogue changes:

```bash
npm run dev                          # in one terminal
node scripts/generate-manifest.mjs   # in another
```

---

## Mobile

Over 90% of traffic arrives on a phone from Instagram, so mobile is the primary
surface. `MOBILE-QA.md` records the breakpoint matrix, every fix, and — most
importantly — the list of components that render differently on a phone than on
desktop. Read that list before changing layout code.

```bash
npm run qa:mobile     # screenshots + overflow + touch-target audit
npm run qa:interact   # drawer, filter sheet, sticky action bars
npm run qa:a11y       # pinch-zoom, reduced motion, image loading
```

All three run against `http://localhost:3200`, so build and `next start -p 3200`
first. They exit non-zero on failure and are safe to wire into CI.

---

## Design system

Tokens live in `tailwind.config.ts` and mirror `app/globals.css`.

| Token | Hex | Use |
|---|---|---|
| `sun` | `#F4922B` | Primary CTAs, accents, fills — **never** small text on cream |
| `terracotta` | `#D2691E` | Large display headings, borders |
| `terracotta-deep` | `#A6440F` | Small text and links (added: brand terracotta is only 3.4:1 on cream) |
| `cream` / `ivory` | `#FDF8F0` / `#FFFDF9` | Page ground / raised surfaces |
| `gold` | `#C9A227` | Hairlines and ornament only — decorative, never text |
| `cocoa` / `cocoa-soft` | `#3B302A` / `#6B5D53` | Body and secondary text |

**Type:** Cormorant Garamond (display) + Poppins (body), with Noto Sans
Devanagari chained behind both so Marathi resolves automatically.

**Motion:** fade-and-rise on scroll, hero parallax, a flame flicker on the logo.
Everything honours `prefers-reduced-motion`.

Note: the Tailwind config declares a full 0–100 opacity scale. Tailwind's
default scale silently drops values like `/8` and `/97`, which costs you
backgrounds with no build error.

---

## Changing the festive season

One value drives the occasion strip order and the pre-booking headline:

```ts
// content/site.ts
featuredOccasion: 'ganesh-chaturthi',
preBooking: { occasionName: 'Ganesh Chaturthi', open: true },
```

---

## Phase 2 — what comes next

Deliberately out of scope for this build, in rough priority order:

1. **Cart and checkout** — Razorpay or UPI, once volume justifies the payment
   reconciliation. The content layer already carries prices and bulk tiers, so
   this is additive rather than a rewrite.
2. **Real form endpoints** — the three forms currently show a success state.
   Point them at a form service or a small API route, with a WhatsApp
   notification to the studio.
3. **Order tracking** — a status lookup by order number, replacing the manual
   "tracking details shared on WhatsApp" step.
4. **Customer accounts** — order history and reordering, which matters most for
   repeat corporate buyers.
5. **A live customisation configurator** — shape → colour → fragrance →
   packaging with a live price. `/customise` is the skeleton of this already.
6. **Blog for SEO** — "Diwali return gift ideas under ₹100", "what is Lippan
   art" — the studio's discovery problem is Google, and these are the queries.
7. **Marathi language toggle** — the cultural range deserves it, and the font
   stack already renders Devanagari.
8. **Analytics** — GA4, Meta Pixel and WhatsApp click tracking, so the client
   can see which products drive enquiries.

Alongside launch: a Google Business Profile for Pune local search, Search
Console, and a WhatsApp Business catalogue mirroring the site.

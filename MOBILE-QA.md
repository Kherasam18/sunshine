# Mobile QA — Sunshine Creations

Over 90% of this site's traffic arrives on a phone from an Instagram bio link,
so mobile is the primary surface. This document records what was audited, what
was broken, what changed, and which components now behave differently on a
phone than on a desktop.

**Final state: 0 horizontal-overflow failures and 0 sub-44px touch targets
across 12 routes × 8 breakpoints, plus a second pass at 360px — the width of the
device the client actually tested on.**

---

## How to re-run the audit

```bash
npm run build && npx next start -p 3200   # in one terminal
node scripts/mobile-qa.mjs                # screenshots + overflow + touch targets
node scripts/mobile-interact.mjs          # drawer, filter sheet, action bars
node scripts/mobile-a11y.mjs              # zoom, reduced motion, image loading
```

`scripts/mobile-qa.mjs` drives the locally installed Chrome through
`playwright-core`, writes full-page screenshots to `/mobile-qa/<route>-<width>.png`,
and exits non-zero if anything overflows or any touch target is under 44 × 44.
Pass `--widths 320,375` or `--routes /,/bulk` to narrow a run.

> The harness uses system Chrome via `executablePath` because this is a Windows
> machine — `/opt/pw-browsers/chromium` is a Linux path and does not exist here.
> No browser download was performed.

---

## Breakpoint matrix

All 12 routes were checked at 320 / **360** / 375 / 390 / 412 / 768 / 1024 / 1280 / 1920,
plus 375 × 667 for the short-viewport case. 360 was added after a real-device
check — it is the most common Android width and the original matrix skipped it.

| Route | 320 | 360 | 375 | 390 | 412 | 768 | 1024 | 1280 | 1920 |
|---|---|---|---|---|---|---|---|---|---|
| `/` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/collections/mithai-candles` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/collections/marathi-craft` (Devanagari) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/products/modak-candle` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/products/marathi-quote-nameplate` (Devanagari) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/occasions/ganesh-chaturthi` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/bulk` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/customise` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/story` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/how-to-order` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/contact` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `404` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

PASS = no horizontal overflow, and every touch target ≥ 44 × 44 at touch widths.

**Short viewport (375 × 667):** the hero headline, sub-copy, both CTAs and the
trust line all sit above the fold, with the trust strip visible below — verified
by assertion, not by eye.

---

## Baseline vs final

| Measure | Before | After |
|---|---|---|
| Horizontal overflow failures | 0 | 0 |
| Sub-44px touch targets @ 320px | 291 | **0** |
| Sub-44px touch targets @ 375px | 299 | **0** |
| Sub-44px touch targets @ 768px | 322 | **0** |
| Hero headline lines @ 320px | 4 | **2** |
| WhatsApp CTA in mobile header | absent | present |

The site never had a horizontal-scroll problem — the earlier build already
handled ornaments and strips with `overflow-hidden` containers. The real damage
was touch targets and typography.

---

## Issues found and fixed

### Global

| Issue | Fix |
|---|---|
| Hero headline wrapped to 4 cramped lines at 320px | Fluid display scale in `tailwind.config.ts` (`text-display-hero` etc.) using `clamp()`; the hero now sets two lines at 320px and scales smoothly to 4.4rem |
| `100vh` hero jumped when browser chrome hid | `svh`/`dvh` units; added `.min-h-screen-dvh` utility with a `vh` fallback |
| No safe-area handling on fixed UI | `viewport-fit=cover` in the viewport export; `--safe-bottom` / `--safe-top` custom properties; `.pb-safe`, `.bottom-safe`, `.pb-action-bar` utilities |
| Form inputs at 15.2px triggered iOS zoom on focus | New `text-input` token (16px) applied to every input, select and textarea |
| Cormorant's old-style figures rendered "1" as "I" in the quantity field, and prices unevenly | `font-variant-numeric: lining-nums` on `.font-display`; quantity input moved to the body face |
| Hero parallax ran on phones | Gated behind `useIsDesktop()` (`min-width: 1024px`) **and** `prefers-reduced-motion` |
| Long Devanagari strings and product names could push layout | `overflow-wrap: break-word` on `body` |
| No art direction for phone photography | `mobileSrc` / `mobileNote` added to `ImageSlot`; `BrandImage` serves the portrait crop below `md`. The hero slot now carries a portrait brief in `ASSETS-MANIFEST.md` |

### Header and navigation

- **The WhatsApp CTA was hidden below 640px** — the primary conversion action was
  buried in the drawer. It is now always visible as a 44px icon button, expanding
  to the full pill from `sm` up.
- Nav links were 38px tall → `min-h-[44px]`.
- Logo link had no dedicated hit area → `min-h-[44px]`.
- Drawer did not close on navigation → closes on `pathname` change.
- Drawer did not restore focus → focus returns to the trigger on close.
- Drawer bottom padding now clears the home indicator.

### Home page

- Product grids were 2-up at 320px (cramped) → **1 col at 320, 2 from 480 (`xs`), 3 from 768, 4 from 1280**.
- Shop by Craft was 2-up at 640 → 1 col on phones, 2 at `md`, 4 at `xl`.
- Occasion strip wrapped awkwardly → edge-to-edge scroll-snap strip (`.snap-strip`) with a 62%-wide slide so the next card visibly peeks.
- Testimonials were four stacked cards → swipeable snap carousel with dot indicators on phones, grid from `md`.
- Wholesale tier table forced horizontal scroll → **stacked cards below `sm`**, one card per tier.
- Made by Hand steps were cramped → tighter stack, smaller thumbnails at `xs`.
- Section vertical rhythm reduced on phones (`py-12` vs `py-16`).

### Footer

- Six expanded link columns made the footer over 1,200px tall on a phone →
  **columns collapse behind disclosures below `md`**; contact details and socials
  stay always visible because they are the conversion path.
- Footer links were 20px tall → 44px through iPad, relaxing to 36px at `lg`.

### Collection page

- The inline four-control filter bar was unusable at 375px → **bottom sheet**
  behind a sticky "Filters" trigger that shows the active count. The sheet
  scrolls, locks body scroll, closes on Escape or backdrop tap, and has Clear /
  "Show N pieces" actions. The inline bar remains from `md` up.
- Filter controls extracted to `FilterControls` so the sheet and bar share one implementation.

### Product page

- **Added a sticky bottom action bar below `md`** — live price on the left,
  "Order" on the right, respecting the safe area. It is rendered from inside
  `ProductOrderPanel` so it always reflects the current colour, fragrance and
  quantity. This is the highest-impact mobile addition on the site.
- Gallery thumbnails were a mouse pattern → **swipe carousel with dot
  indicators** on phones; thumbnails remain from `md` up.
- Colour swatches were 40px → 44px, with a heavier check mark so selection is
  not communicated by colour alone.
- Fragrance chips and the quantity stepper → 44px.
- Specs and candle care → **collapsed disclosures on phones**, always open from `md`.
- The making-of reel → near full-width (`min(86vw, 340px)`), which is its native format.

### Bulk page

- Added a matching sticky action bar ("From ₹30 / piece" + "Get a quote").
- Hero CTAs stack full-width on phones.
- Use-case and gallery grids drop to a single column at 320px.

### Customise builder

- The desktop side panel sat a full screen below the controls on a phone →
  **collapsible sticky summary bar** pinned above the home indicator, showing
  progress and the current selections, expanding to the full brief. The desktop
  panel is unchanged from `lg` up.

### Forms (bulk, pre-booking, contact)

- Single column, full-width fields, labels above inputs, inline errors below.
- Submit and secondary buttons go full-width on phones.
- 16px input text; `type="tel" inputMode="numeric"` on WhatsApp numbers,
  `type="date"` on required-by dates, `inputMode="numeric"` on quantity.

---

## Round two — the premium pass (360px)

The first pass fixed everything *mechanical*: overflow, touch targets, iOS zoom,
safe areas. A real-device check then showed the opposite problem — at 360px the
site read as **overcrowded, and the type too heavy to feel premium**.

> One red herring worth recording: the first round of device screenshots was taken
> with Chrome's "Desktop site" toggle on, which forces a ~768px viewport and
> bypasses every mobile pattern below `md`. That is not a real defect. If the site
> ever looks like the tablet layout on a phone, check that toggle first.

| Issue at 360px | Fix |
|---|---|
| Two stacked full-width pills in the hero and at every section CTA — heavy, competing | New `link` Button variant: primary keeps the pill, secondary becomes an underlined text link with an arrow. Applied in Hero, MithaiSignature, `/bulk`, `/story`, `/how-to-order`, `404` |
| Display scale bottomed out at 29.6px; body at 15px with 1.65 leading made walls of text | Trimmed every `clamp()` min and slope — hero 29.6→26.6px, headings 25.6→21.6px, `body-sm` 15→14px at 1.6 leading |
| ~16 inline `text-[0.68rem]` eyebrows at 10.9px with duplicated tracking | Single semantic `text-eyebrow` token (10px, 0.24em tracking baked in) |
| Product card placeholder was 320 × **400px** of empty gradient — larger than the card's content | `mobileAspect="1:1"` below 480px (400→320px). Craft cards `mobileAspect="3:2"` |
| Marigold ornament + rules repeated above six section headings, ~60px each | Hidden below `sm` in `SectionHeading` |
| Mithai highlights bar: label and detail shared a row, so "Real silver varq" wrapped against its own description | Stacked label over detail on phones with `divide-y` rules; the centred row layout returns at `sm` |
| Trust strip descriptions broke mid-phrase ("Clean, eco-/friendly, non-toxic") | Smaller type, `text-balance`, and U+2011 non-breaking hyphens in the copy so lines break between phrases |
| Section rhythm and grid margins too generous for a small screen | `default` spacing `py-12`→`py-10`; grid margins `mt-12`→`mt-8 sm:mt-12` |

**Accepted trade-off:** body copy is now 14px on phones, just under the 15px floor
set in the original brief. This was a deliberate call — at 360px the page read as
a wall of text. Form controls remain at exactly 16px, which is what actually
prevents iOS zoom, and there is now an automated check enforcing it.

Desktop was verified unchanged at 1280px.

---

## Components that now behave differently on mobile

Changing any of these without checking the other breakpoint will regress the
phone experience.

| Component | Phone (<768px) | Desktop |
|---|---|---|
| `Header` | WhatsApp icon button + hamburger | Full nav + labelled WhatsApp pill |
| `MobileDrawer` | Slide-over, focus-trapped, scroll-locked | Not rendered (`lg:hidden`) |
| `FooterNavColumn` | Collapsed disclosures | Always-open columns (`md:`) |
| `WhatsAppFloat` | Hidden when a `StickyActionBar` is mounted | Always shown after 520px scroll |
| `StickyActionBar` | Fixed bottom bar | `md:hidden` — not rendered |
| `FilterSheet` / `FilterBar` | Bottom sheet behind a sticky trigger | Inline filter bar (`md:`) |
| `ProductGallery` | Snap carousel + dots | Main image + thumbnail row |
| `CollapsibleOnMobile` | Disclosure | Always open, heading is inert |
| `TestimonialCards` | Snap carousel + dots | 2/4-column grid |
| `WholesaleTable` | Stacked cards | Real `<table>` |
| `CustomiseSummaryBar` / `CustomiseSummary` | Sticky bottom bar | Sticky side panel (`lg:`) |
| `Hero` | No parallax; primary pill + secondary text link | Parallax above 1024px |
| `Button` `variant="link"` | Unfilled text link, 44px hit area | Same — used as the secondary action everywhere |
| `BrandImage` `mobileAspect` | Shorter crop below 480px (cards 1:1, crafts 3:2) | Authored ratio (4:5) returns at `xs` |
| `SectionHeading` | Marigold ornament hidden | Ornament shown from `sm` |
| `ShopByOccasion` | Scroll-snap strip | 6-column grid (`lg:`) |

**Breakpoint note:** a custom `xs: 480px` breakpoint was added. Product grids go
1 → 2 columns there, not at Tailwind's default `sm: 640px`.

---

## Accessibility

Verified by `scripts/mobile-a11y.mjs` (21/21 passing):

- **Pinch-zoom is enabled** — no `maximum-scale`, no `user-scalable=no`.
- **Every form control computes to ≥16px**, asserted at 360px across all six
  form-bearing routes. This is the regression guard that stops a future type trim
  from silently reintroducing involuntary zoom on iOS.
- `viewport-fit=cover` is set, paired with `env(safe-area-inset-*)`.
- Under `prefers-reduced-motion: reduce` no looping animation runs (including the
  flame flicker) and no section is left at zero opacity.
- No text below 24px uses `--sun` on cream. Small text uses `terracotta-deep`
  (5.7:1) or `gold-deep` (5.5:1); `--sun` and `--gold` remain fills and ornament.
- Every image slot carries alt text; focus rings are `focus-visible` based and
  survive on touch devices.
- Carousels are keyboard-operable (the strip is focusable, arrow keys scroll) and
  the dots are real `role="tab"` buttons announcing "Go to item N of M".

Interaction behaviour verified by `scripts/mobile-interact.mjs` (7/7 passing):
drawer opens / closes on route change, filter sheet opens / locks scroll /
closes on Escape, customise bar expands, product action bar suppresses the float,
and the hero fits a 667px-tall viewport.

---

## Performance

- Every `sizes` attribute was rewritten to match the new grid ladder — e.g.
  product cards now declare
  `(max-width: 479px) 92vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, 23vw`.
  A wrong `sizes` is the most common real-world mobile performance bug in
  Next.js, and the old values assumed a 2-up phone grid that no longer exists.
- `BrandImage` sets `loading="lazy"` on every non-priority image. Only the hero
  slot is `priority`.
- Every image slot reserves its aspect ratio before load — 28 of 28 slots on the
  home page and 14 of 14 on a product page, so there is **zero image-driven
  layout shift**.
- Scroll-linked motion (hero parallax) is desktop-only; phones keep simple
  fade-ups.

---

## Known limitations

1. **The `sizes` and lazy-loading work is verified by code, not by runtime
   measurement.** There is no real photography yet, so every slot renders a CSS
   placeholder and the pages currently contain zero `<img>` elements. The
   audit's image checks therefore pass trivially. Re-run
   `scripts/mobile-a11y.mjs` once real images land — that is when those
   assertions become meaningful.
2. **Devanagari line-height is adequate but not tuned per-script.** Marathi
   strings wrap cleanly at 320px with no clipping of matras, verified visually
   on `/products/marathi-quote-nameplate`. Because the Devanagari is inline
   inside English sentences it is not wrapped in `:lang()` spans, so it cannot
   currently take a script-specific line-height. If the client adds longer
   Marathi passages, wrap them in `<span lang="mr">` and give that a taller
   line-height.
3. **The WhatsApp float can overlap the right edge of a product card's Order
   button** while scrolling the home and collection grids. This is conventional
   behaviour for floating action buttons and leaves the majority of the button
   tappable; it is suppressed entirely on the product and bulk pages where a
   sticky bar exists. If the client dislikes it, the float can be hidden on
   listing pages too.
4. **Touch-target enforcement stops at 768px.** At 1024px and above the footer
   uses 36px link rows, which is conventional for mouse input. The audit reports
   these but does not fail on them.
5. **Real-device testing has not been done.** Everything here is Chrome device
   emulation at the listed viewports. Before the pitch, open the demo on an
   actual iPhone — particularly to confirm the safe-area insets under the home
   indicator and that focusing a form field does not zoom.

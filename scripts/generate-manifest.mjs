/**
 * Regenerates ASSETS-MANIFEST.md from the live content layer.
 *
 * Usage:  npm run dev   (in one terminal)
 *         node scripts/generate-manifest.mjs
 *
 * It reads /manifest-data — a development-only route that walks the same
 * getters the site uses — so the manifest can never drift from the catalogue.
 */
import { writeFile } from 'node:fs/promises';

const ENDPOINT = process.env.MANIFEST_ENDPOINT ?? 'http://localhost:3000/manifest-data';

const RECOMMENDED = {
  '1:1': '1400 × 1400',
  '4:5': '1200 × 1500',
  '3:4': '1200 × 1600',
  '3:2': '1800 × 1200',
  '16:9': '2400 × 1350',
  '21:9': '2400 × 1030',
  '9:16': '1080 × 1920',
};

const CATEGORY_NAMES = {
  'mithai-candles': 'Mithai Candles',
  'floral-candles': 'Floral Candles',
  'decor-candles': 'Décor & Novelty Candles',
  'resin-art': 'Resin Art',
  'lippan-clay': 'Lippan & Clay Art',
  'marathi-craft': 'Marathi & MDF Craft',
};

const escape = (value) => String(value).replace(/\|/g, '\\|');

function table(rows, secondColumn = 'Where it appears') {
  const head = `| Slot ID | ${secondColumn} | Ratio | Recommended px | What the shot should show |\n|---|---|---|---|---|`;
  const body = rows
    .map(
      ({ slot, section }) =>
        `| \`${slot.id}\` | ${escape(section)} | ${slot.aspect} | ${RECOMMENDED[slot.aspect] ?? '—'} | ${escape(slot.note)} |`,
    )
    .join('\n');
  return `${head}\n${body}`;
}

const response = await fetch(ENDPOINT);
if (!response.ok) throw new Error(`Could not reach ${ENDPOINT} — is the dev server running?`);
const { rows, videos, productCount } = await response.json();

const flat = rows.flatMap((row) =>
  row.slots.map((slot) => ({ slot, section: row.section, category: row.category })),
);

const required = flat.filter((row) => !row.slot.optional);
/** Slots that also need an art-directed portrait crop for phones. */
const mobileCrops = flat.filter((row) => row.slot.mobileNote);
const optional = flat.filter((row) => row.slot.optional);

const pageRows = required.filter((row) => !row.section.startsWith('Product —'));
const productRows = required.filter((row) => row.section.startsWith('Product —'));

const groupProducts = (source) =>
  Object.entries(CATEGORY_NAMES).map(([key, name]) => ({
    name,
    rows: source
      .filter((row) => row.category === key)
      .map((row) => ({ slot: row.slot, section: row.section.replace('Product — ', '') })),
  }));

const bySection = (rowsToGroup) => {
  const groups = new Map();
  rowsToGroup.forEach((row) => {
    if (!groups.has(row.section)) groups.set(row.section, []);
    groups.get(row.section).push(row);
  });
  return [...groups.entries()];
};

const markdown = `# Sunshine Creations — Photography & Asset Manifest

**For:** Sunshine Creations Studio (@sunshinecreations_studio)
**Purpose:** every image and video the website expects, with the shot needed for each.

| | Count |
|---|---|
| **Required images** | ${required.length} |
| Optional extra angles | ${optional.length} |
| Videos | ${videos.length} |
| Products covered | ${productCount} |

Until a real file is supplied, each slot renders an on-brand placeholder (warm
gradient, sunburst motif, slot label) — the site never looks broken while the
photography is collected.

**Required** slots are the ones the site leans on. **Optional** slots are the
extra product angles that fill the gallery thumbnails on product pages; the
page works perfectly with just the primary image, so treat those as a nice-to-have.

---

## How to supply files

1. Name each file after its **Slot ID** — e.g. \`product-modak-candle.jpg\`.
2. Drop the files into \`/public/images/\`.
3. In the matching content file, add \`src: '/images/<slot-id>.jpg'\` to that slot.
   That is the only change needed per photo — no component edits.

**Format:** JPEG (quality 80–90) or WebP. Next.js re-encodes to AVIF/WebP and
generates responsive sizes automatically, so supply the largest version you have
— at minimum the recommended pixel size below.

---

## Shoot these first

These ten carry the pitch. If time is short, shoot only these:

| Priority | Slot ID | Why it matters |
|---|---|---|
| 1 | \`home-hero\` | The first thing every visitor from Instagram sees. |
| 2 | \`product-modak-candle\` | The hero product and the brand's whole wedge. |
| 3 | \`product-modak-candle-lit\` | Proves the mithai is genuinely a candle. |
| 4 | \`product-laddu-candle\` | Second signature piece; the Diwali seller. |
| 5 | \`bulk-hero\` | Opens the highest-value page on the site. |
| 6 | \`collection-mithai-candles-hero\` | Banner for the collection people click first. |
| 7 | \`craft-candles\` | Anchors the whole candle range in one frame. |
| 8 | \`process-detailed\` | Silver varq going on — the trust-builder. |
| 9 | \`story-founder-portrait\` | The founder story is what converts on social. |
| 10 | \`occasion-ganesh-chaturthi-hero\` | Leads the current festive season. |

---

## House style (applies to every shot)

Carried over from the existing Instagram grid, which already looks consistent:

- **Light:** warm, natural, side-lit. No flash, no cool white balance.
- **Ground:** cream fabric, white brick wall, or pale wood.
- **Props:** brass and gold platters, wooden slices, marigolds, diyas, fairy lights.
- **Hand-in-frame:** the signature shot — one hand holding a single piece. Keep using it.
- **Negative space:** leave breathing room; the site sets images on cream with generous whitespace.
- **Banners (21:9):** shoot wide with the subject off-centre — page titles sit over the left third.
- **Colour:** let the saffron, marigold and terracotta lead. Avoid cool blue-grey casts.
- **Sharpness:** silver varq, Lippan mirrors and resin detail must be tack sharp — those details are the product.

---

## Required — pages

${bySection(pageRows)
  .map(([section, group]) => `### ${section}\n\n${table(group)}`)
  .join('\n\n')}

---

## Required — product photography

The primary image for each product. Used on cards, collection grids and as the
main product-page image.

${groupProducts(productRows)
  .filter((group) => group.rows.length > 0)
  .map((group) => `### ${group.name}\n\n${table(group.rows, 'Product')}`)
  .join('\n\n')}

---

## Optional — extra product angles

Three supporting angles per product, shown as gallery thumbnails on the product
page. Shoot these for the bestsellers first; the rest can follow.

${groupProducts(optional)
  .filter((group) => group.rows.length > 0)
  .map((group) => `### ${group.name}\n\n${table(group.rows, 'Product')}`)
  .join('\n\n')}

---

## Mobile crops

Over 90% of visitors arrive on a phone. These wide slots also need a portrait
version — a landscape hero cropped to a phone viewport loses its subject. Name
the file \`<slot-id>-mobile.jpg\` and set \`mobileSrc\` on the slot.

| Slot ID | Where it appears | Ratio | Recommended px | What the mobile crop needs |
|---|---|---|---|---|
${mobileCrops
  .map(
    ({ slot, section }) =>
      `| \`${slot.id}-mobile\` | ${escape(section)} | 4:5 | 1200 × 1500 | ${escape(slot.mobileNote)} |`,
  )
  .join('\n')}

---

## Video

All videos play muted, looping and without controls. Keep each under 25 seconds
— they loop, so they should not feel like a film. Existing "let's make…" reels
can be re-cut for these.

| Slot ID | Where it appears | Ratio | Recommended | What it should show |
|---|---|---|---|---|
${videos
  .map(
    ({ slot, section }) =>
      `| \`${slot.id}\` | ${escape(section)} | ${slot.aspect} | 1080 × 1920, MP4 (H.264), < 6 MB | ${escape(slot.note)} |`,
  )
  .join('\n')}

Product reels are optional — one good generic making-of reel can be reused
across several products by pointing multiple slots at the same file.

---

## Logo & brand assets

The site currently ships a **hand-built placeholder logo** — an inline SVG
recreation of the Instagram mark (circular keyline, orange watercolour sun over
rippled water) with the wordmark set in live type.

**Still needed from the client:**

| Asset | Format | Notes |
|---|---|---|
| Primary logo lockup | SVG or AI/EPS | Vector master. The current mark is a redraw, not the original artwork. |
| Logo mark only | SVG | Circular sun mark without the wordmark, for the header and favicon. |
| Wordmark | SVG with outlined type | The "Sunshine" script is currently substituted with Cormorant Garamond italic — the real script face is different. |
| Favicon / app icon | 512 × 512 PNG | Generated from the mark. |
| Open Graph image | 1200 × 630 JPEG | Shown when the site is shared on WhatsApp and Instagram. |

Replace \`components/brand/LogoMark.tsx\` with the supplied vector once available.

---

## Also worth collecting

Not blocking the build, but each one strengthens the site:

- **Customer testimonial permission** — the WhatsApp screenshots are excellent social proof, but need consent before publishing.
- **Packaging shots** — boxes, tags, inserts. Corporate buyers ask about branding first.
- **Completed bulk orders** — more of them. It is the strongest B2B proof there is.
- **A confirmed retail price list** — the wholesale tiers are published, but retail was cropped in the original creative.

---

_Generated from the content layer by \`scripts/generate-manifest.mjs\`. Re-run it whenever products are added or changed._
`;

await writeFile(new URL('../ASSETS-MANIFEST.md', import.meta.url), markdown, 'utf8');
console.log(
  `ASSETS-MANIFEST.md written — ${required.length} required images, ${optional.length} optional, ${videos.length} videos.`,
);

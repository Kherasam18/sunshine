# Sunshine Creations — Photography & Asset Manifest

**For:** Sunshine Creations Studio (@sunshinecreations_studio)
**Purpose:** every image and video the website expects, with the shot needed for each.

| | Count |
|---|---|
| **Required images** | 87 |
| Optional extra angles | 108 |
| Videos | 37 |
| Products covered | 36 |

Until a real file is supplied, each slot renders an on-brand placeholder (warm
gradient, sunburst motif, slot label) — the site never looks broken while the
photography is collected.

**Required** slots are the ones the site leans on. **Optional** slots are the
extra product angles that fill the gallery thumbnails on product pages; the
page works perfectly with just the primary image, so treat those as a nice-to-have.

---

## How to supply files

1. Name each file after its **Slot ID** — e.g. `product-modak-candle.jpg`.
2. Drop the files into `/public/images/`.
3. In the matching content file, add `src: '/images/<slot-id>.jpg'` to that slot.
   That is the only change needed per photo — no component edits.

**Format:** JPEG (quality 80–90) or WebP. Next.js re-encodes to AVIF/WebP and
generates responsive sizes automatically, so supply the largest version you have
— at minimum the recommended pixel size below.

---

## Shoot these first

These ten carry the pitch. If time is short, shoot only these:

| Priority | Slot ID | Why it matters |
|---|---|---|
| 1 | `home-hero` | The first thing every visitor from Instagram sees. |
| 2 | `product-modak-candle` | The hero product and the brand's whole wedge. |
| 3 | `product-modak-candle-lit` | Proves the mithai is genuinely a candle. |
| 4 | `product-laddu-candle` | Second signature piece; the Diwali seller. |
| 5 | `bulk-hero` | Opens the highest-value page on the site. |
| 6 | `collection-mithai-candles-hero` | Banner for the collection people click first. |
| 7 | `craft-candles` | Anchors the whole candle range in one frame. |
| 8 | `process-detailed` | Silver varq going on — the trust-builder. |
| 9 | `story-founder-portrait` | The founder story is what converts on social. |
| 10 | `occasion-ganesh-chaturthi-hero` | Leads the current festive season. |

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

### Home — Hero

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `home-hero` | Home — Hero | 16:9 | 2400 × 1350 | Full-bleed hero. Modak candles on a brass platter with fresh marigolds, warm natural side light, shallow depth of field. Leave clear negative space in the left third for the headline. |

### Home — Bulk banner

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `bulk-banner` | Home — Bulk banner | 16:9 | 2400 × 1350 | Wide shot of a completed bulk order — rows of boxed candles with tags. Warm light, expose slightly under so white text sits comfortably on top. |

### Home — Made by Hand

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `process-poured` | Home — Made by Hand | 1:1 | 1400 × 1400 | Close crop of hands pouring wax into a modak mould. Steam, warm light, wax pitcher in frame. |
| `process-detailed` | Home — Made by Hand | 1:1 | 1400 × 1400 | Macro shot of silver varq being laid onto a laddu candle with a brush or fingertip. Sharp on the detail. |
| `process-packed` | Home — Made by Hand | 1:1 | 1400 × 1400 | Open gift box of four mithai candles being tied with ribbon, tissue and thank-you card visible. |

### Home — From the Studio

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `feed-1` | Home — From the Studio | 1:1 | 1400 × 1400 | Flat-lay of a four-piece modak gift box on cream fabric. |
| `feed-2` | Home — From the Studio | 1:1 | 1400 × 1400 | Signature hand-in-frame shot holding one laddu candle against a white brick wall. |
| `feed-3` | Home — From the Studio | 1:1 | 1400 × 1400 | Lippan mud-and-mirror frame styled on a wall, raking side light to catch the mirrors. |
| `feed-4` | Home — From the Studio | 1:1 | 1400 × 1400 | Resin Ganesha standee on a wooden slice with a lit diya beside it. |
| `feed-5` | Home — From the Studio | 1:1 | 1400 × 1400 | Tulip bouquet candle in three colourways, soft daylight, cream backdrop. |
| `feed-6` | Home — From the Studio | 1:1 | 1400 × 1400 | Table covered with 50+ packed candle boxes ready for dispatch — proof of bulk capability. |

### Home — Shop by Craft

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `craft-candles` | Home — Shop by Craft | 4:5 | 1200 × 1500 | Wide spread showing the breadth of the candle range in one frame — mithai, florals, jars, tapers. |
| `craft-resin-art` | Home — Shop by Craft | 4:5 | 1200 × 1500 | Ganesha standee, keepsake frame and polaroid magnets grouped together on a wooden surface. |
| `craft-lippan-clay` | Home — Shop by Craft | 4:5 | 1200 × 1500 | Two Lippan frames of different sizes with a clay miniature in the foreground. |
| `craft-marathi-craft` | Home — Shop by Craft | 4:5 | 1200 × 1500 | Marathi nameplate, Maharashtra cutout and calendar arranged together. Devanagari sharp. |

### Home — Shop by Occasion

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `occasion-ganesh-chaturthi` | Home — Shop by Occasion | 1:1 | 1400 × 1400 | Modak candles and a Ganesha standee on a decorated mandap step with marigolds and a diya. |
| `occasion-diwali` | Home — Shop by Occasion | 1:1 | 1400 × 1400 | Diwali hamper flat-lay: mithai candle box, jar candle, diyas and rangoli colour around the edges. |
| `occasion-rakshabandhan` | Home — Shop by Occasion | 1:1 | 1400 × 1400 | Rakhi thali with a sibling figurine candle, a rakhi and a small mithai candle box. |
| `occasion-weddings-return-gifts` | Home — Shop by Occasion | 1:1 | 1400 × 1400 | Gift table at a wedding lined with tagged return gifts. Shows volume and presentation together. |
| `occasion-valentines` | Home — Shop by Occasion | 1:1 | 1400 × 1400 | Rose bouquet candle with a couple candle lit behind it, blush palette, soft evening light. |
| `occasion-housewarming` | Home — Shop by Occasion | 1:1 | 1400 × 1400 | Lippan frame, Marathi nameplate and a jar candle grouped as a gift set in a bright new-home setting. |

### Collection cards

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `collection-mithai-candles` | Collection cards | 4:5 | 1200 × 1500 | Group shot of all five mithai types together on a brass thali. This is the brand hero image — shoot it best. |
| `collection-floral-candles` | Collection cards | 4:5 | 1200 × 1500 | Cluster of floral candles — tulip bouquet, daisies, hibiscus t-lights — on cream fabric in soft daylight. |
| `collection-decor-candles` | Collection cards | 4:5 | 1200 × 1500 | Styled shelf vignette: bubble candle, layered jar, tapers, a book and a small plant. Lifestyle, not product-on-white. |
| `collection-resin-art` | Collection cards | 4:5 | 1200 × 1500 | Ganesha standee and a keepsake frame together, angled to avoid glare on the resin. |
| `collection-lippan-clay` | Collection cards | 4:5 | 1200 × 1500 | Single Lippan round frame on a plain wall, raking side light so relief and mirrors both read. |
| `collection-marathi-craft` | Collection cards | 4:5 | 1200 × 1500 | Marathi nameplate and Maharashtra cutout styled together on a wall. Devanagari must be sharp and correct. |

### Collection page banners

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `collection-mithai-candles-hero` | Collection page banners | 21:9 | 2400 × 1030 | Wide banner: mithai candles spread across a brass tray with marigolds and a lit diya. Leave space on the left for the page title. |
| `collection-floral-candles-hero` | Collection page banners | 21:9 | 2400 × 1030 | Wide banner: floral candles laid across cream fabric with fresh petals scattered. Soft, airy, high-key light. |
| `collection-decor-candles-hero` | Collection page banners | 21:9 | 2400 × 1030 | Wide banner: a styled shelf or console with bubble candles, jars and tapers. Warm interior, lived-in feel. |
| `collection-resin-art-hero` | Collection page banners | 21:9 | 2400 × 1030 | Wide banner: keepsake frames, magnets and standees laid out on a wooden surface. Angle the light to avoid glare. |
| `collection-lippan-clay-hero` | Collection page banners | 21:9 | 2400 × 1030 | Wide banner: full Lippan wall installation in situ. Raking light so the raised clay casts shadow and mirrors sparkle. |
| `collection-marathi-craft-hero` | Collection page banners | 21:9 | 2400 × 1030 | Wide banner: nameplates, map cutouts and a calendar arranged together. Devanagari lettering must be crisp. |

### Occasion page banners

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `occasion-ganesh-chaturthi-hero` | Occasion page banners | 21:9 | 2400 × 1030 | Wide banner: a decorated mandap with modak candles on a brass thali, marigold garlands, warm lamp light. |
| `occasion-diwali-hero` | Occasion page banners | 21:9 | 2400 × 1030 | Wide banner: Diwali hampers with lit diyas and rangoli, shot in low warm light with visible flames. |
| `occasion-rakshabandhan-hero` | Occasion page banners | 21:9 | 2400 × 1030 | Wide banner: a rakhi thali styled with candles, a rakhi and photo magnets on a bright cloth. |
| `occasion-weddings-return-gifts-hero` | Occasion page banners | 21:9 | 2400 × 1030 | Wide banner: a long table of tagged return gifts at a wedding. Show scale — rows and rows of them. |
| `occasion-valentines-hero` | Occasion page banners | 21:9 | 2400 × 1030 | Wide banner: rose bouquet candle, couple candle and a keepsake frame together. Blush palette, candlelit. |
| `occasion-housewarming-hero` | Occasion page banners | 21:9 | 2400 × 1030 | Wide banner: a bright new-home entryway with a nameplate by the door and a Lippan frame on the wall. |

### Bulk & Corporate — banner

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `bulk-hero` | Bulk & Corporate — banner | 21:9 | 2400 × 1030 | Wide banner: a full table of a completed bulk order mid-pack. Expose slightly under so white text sits comfortably on top. |

### Bulk & Corporate — gallery

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `bulk-gallery-modak-order` | Bulk & Corporate — gallery | 4:5 | 1200 × 1500 | Overhead of a completed modak bulk order — trays of finished candles before packing. Shows genuine volume. |
| `bulk-gallery-corporate-boxes` | Bulk & Corporate — gallery | 4:5 | 1200 × 1500 | Stacked branded boxes with printed sleeves and tags. If a real client logo cannot be shown, use a mock sleeve. |
| `bulk-gallery-wedding-favours` | Bulk & Corporate — gallery | 4:5 | 1200 × 1500 | Wedding gift table with rows of tagged favours, guests visible in soft background blur. |
| `bulk-gallery-packing` | Bulk & Corporate — gallery | 4:5 | 1200 × 1500 | The studio mid-pack: bubble wrap, boxes, tape and finished pieces across a full table. |
| `bulk-gallery-tlight-batch` | Bulk & Corporate — gallery | 4:5 | 1200 × 1500 | A tray of 100+ floral t-lights in several colours, shot from above to show range and consistency. |
| `bulk-gallery-dispatch` | Bulk & Corporate — gallery | 4:5 | 1200 × 1500 | Sealed, labelled parcels stacked by the door awaiting pickup. Proof the studio ships at volume. |

### Our Story

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `story-hero` | Our Story | 21:9 | 2400 × 1030 | Wide banner: hands at work finishing a piece, shallow depth of field, warm light. Faceless is fine — this is about the making. |
| `story-founder-portrait` | Our Story | 4:5 | 1200 × 1500 | Natural portrait of the founder at her work table, mid-task rather than posed — hands busy, wax and moulds around her. Warm window light. |
| `story-studio` | Our Story | 3:2 | 1800 × 1200 | Wide shot of the working space: moulds, wax, colour pots, half-finished pieces. Honest and lived-in, not tidied for the camera. |

### Contact

| Slot ID | Where it appears | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `contact-studio` | Contact | 4:5 | 1200 × 1500 | The work table mid-project — moulds, colour pots, a half-finished piece. Warm and human, not staged. |

---

## Required — product photography

The primary image for each product. Used on cards, collection grids and as the
main product-page image.

### Mithai Candles

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-modak-candle` | Modak Candle | 4:5 | 1200 × 1500 | Three modak candles on a brass thali with marigold petals. Silver varq must read clearly — light from the side. |
| `product-modak-candle-lit` | Modak Candle | 1:1 | 1400 × 1400 | The same modak lit in low light, flame visible, warm bokeh behind. Shows it is genuinely a candle. |
| `product-laddu-candle` | Laddu Candle | 4:5 | 1200 × 1500 | Four laddu candles in a window gift box, lid half open. Texture and silver varq must be sharp. |
| `product-kaju-katli-candle` | Kaju Katli Candle | 4:5 | 1200 × 1500 | Six katli diamonds fanned on a round wooden platter, silver leaf catching the light. Overhead flat-lay. |
| `product-kesar-pedha-candle` | Kesar Pedha Candle | 4:5 | 1200 × 1500 | A stack of three saffron pedha candles on a brass coaster, silver leaf visible, warm light. |
| `product-rasmalai-candle` | Rasmalai Candle | 4:5 | 1200 × 1500 | Glass bowl rasmalai candle shot at 45°, pistachio and rose petal detail sharp, cream fabric backdrop. |
| `product-mixed-mithai-bowl-candle` | Mixed Mithai Bowl Candle | 4:5 | 1200 × 1500 | Wooden bowl filled with assorted mithai candles, shot slightly overhead with marigolds and a diya alongside. |

### Floral Candles

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-hibiscus-tlight-candle` | Hibiscus T-light Candle | 4:5 | 1200 × 1500 | Five hibiscus t-lights floating in a brass urli with water and marigold petals. Shot slightly overhead. |
| `product-daisy-candle` | Daisy Candle | 4:5 | 1200 × 1500 | Three daisy candles grouped on a white ceramic dish, soft daylight, cream backdrop. |
| `product-daisy-urli-candle` | Daisy Urli Candle | 4:5 | 1200 × 1500 | A row of daisy urli candles lined up as return gifts with name tags. Shows scale and gift-readiness. |
| `product-tulip-bouquet-candle` | Tulip Bouquet Candle | 4:5 | 1200 × 1500 | Tulip bouquet candle held in one hand against a plain wall, wrap and ribbon visible. Signature hand-in-frame shot. |
| `product-rose-bouquet-candle` | Rose Bouquet Candle | 4:5 | 1200 × 1500 | Rose bouquet candle on a marble surface with scattered dried petals and a lit taper behind. |
| `product-peony-candle` | Peony Candle | 4:5 | 1200 × 1500 | Single peony candle on a linen napkin, side-lit to show petal layers. |
| `product-heart-rose-candle` | Heart Rose Candle | 4:5 | 1200 × 1500 | Heart rose candle in an open gift box with tissue, shot from above. |
| `product-marigold-candle` | Marigold Candle | 4:5 | 1200 × 1500 | Marigold candles beside real marigolds — the point is you cannot tell which is which. |
| `product-floral-tlight-candles` | Floral T-light Candles | 4:5 | 1200 × 1500 | Grid of floral t-lights in square, round and heart shapes across six colours. Flat-lay on cream. |

### Décor & Novelty Candles

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-mini-blooming-jar-candle` | Mini Blooming Jar Candle | 4:5 | 1200 × 1500 | Single 30 ml jar candle held between two fingers, 3D flower facing camera. Include a lit version too. |
| `product-bubble-candle` | Bubble Candle | 4:5 | 1200 × 1500 | Bubble candle on a stack of books beside a plant, soft window light, matte finish visible. |
| `product-woven-heart-candle` | Woven Heart Candle | 4:5 | 1200 × 1500 | Macro of the woven heart texture, raking light so the knit pattern casts shadow. |
| `product-rose-teddy-heart-candle` | Rose Teddy Heart Candle | 4:5 | 1200 × 1500 | Rose teddy heart candle in an open gift box with a ribbon and card. |
| `product-teddy-bear-candle` | Teddy Bear Candle | 4:5 | 1200 × 1500 | Three teddy candles in different pastels lined up on a cream cloth. |
| `product-couple-candle` | Couple Candle | 4:5 | 1200 × 1500 | Couple embrace candle, side profile, single strong side light casting a long soft shadow. |
| `product-marble-effect-mini-jar-candle` | Marble Effect Mini Jar Candle | 4:5 | 1200 × 1500 | Four marbled jars in a row showing colour variation, overhead flat-lay. |
| `product-layered-jar-candle` | Layered Jar Candle | 4:5 | 1200 × 1500 | Layered jar candle lit at dusk, colour bands clearly separated, warm interior background. |
| `product-pillar-candle` | Pillar Candle | 4:5 | 1200 × 1500 | Three pillar candles of different heights grouped on a wooden tray, lit, low ambient light. |
| `product-taper-candle` | Taper Candle | 4:5 | 1200 × 1500 | Pair of twisted tapers in ceramic holders on a set dinner table, evening light. |

### Resin Art

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-resin-ganesha-standee` | Resin Ganesha Standee | 4:5 | 1200 × 1500 | Resin Ganesha standee on a wooden slice with a lit diya and marigold beside it. Gold leaf must catch the light. |
| `product-personalised-keepsake-frame` | Personalised Keepsake Frame | 4:5 | 1200 × 1500 | Couple keepsake frame with names and date, dried flowers around the photo. Shoot straight on, no glare on the resin. |
| `product-polaroid-photo-magnet` | Polaroid Photo Magnet | 4:5 | 1200 × 1500 | Six polaroid resin magnets arranged on a fridge door, handwritten captions visible. |
| `product-resin-coaster-set` | Resin Coaster Set | 4:5 | 1200 × 1500 | Set of four coasters fanned out with the stand, gold veining catching light, on a dark wood table. |

### Lippan & Clay Art

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-lippan-art-wall-frame` | Lippan Art Wall Frame | 4:5 | 1200 × 1500 | Round Lippan frame hung on a plain wall, lit from the side so the raised clay casts shadow and the mirrors sparkle. |
| `product-lippan-art-panel-set` | Lippan Art Panel Set | 3:2 | 1800 × 1200 | Full multi-panel Lippan installation in situ on a living-room wall. Wide shot showing scale against furniture. |
| `product-clay-miniature-piece` | Clay Miniature Piece | 1:1 | 1400 × 1400 | Macro of a clay miniature scene on a shelf, shallow depth of field, warm light. |

### Marathi & MDF Craft

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-marathi-quote-nameplate` | Marathi Quote Nameplate | 3:2 | 1800 × 1200 | Layered Marathi quote nameplate mounted beside a front door. Straight-on shot, Devanagari lettering crisp and fully legible. |
| `product-jai-maharashtra-map-cutout` | Jai Maharashtra Map Cutout | 1:1 | 1400 × 1400 | Maharashtra map cutout on a saffron-washed wall. Devanagari lettering must be sharp and correctly rendered. |
| `product-marathi-calendar` | Marathi Calendar | 4:5 | 1200 × 1500 | Marathi desk calendar standing on a work desk, current month page open, Devanagari legible. |
| `product-custom-mdf-nameplate` | Custom MDF Nameplate | 3:2 | 1800 × 1200 | Three custom nameplates in different palettes laid out flat, showing range of styles. |

---

## Optional — extra product angles

Three supporting angles per product, shown as gallery thumbnails on the product
page. Shoot these for the bestsellers first; the rest can follow.

### Mithai Candles

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-modak-candle-detail` | Modak Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Modak Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-modak-candle-styled` | Modak Candle | 4:5 | 1200 × 1500 | The Modak Candle on a brass thali with marigold petals. Lifestyle framing, not product-on-white. |
| `product-modak-candle-scale` | Modak Candle | 1:1 | 1400 × 1400 | The Modak Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-laddu-candle-detail` | Laddu Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Laddu Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-laddu-candle-styled` | Laddu Candle | 4:5 | 1200 × 1500 | The Laddu Candle on a brass thali with marigold petals. Lifestyle framing, not product-on-white. |
| `product-laddu-candle-scale` | Laddu Candle | 1:1 | 1400 × 1400 | The Laddu Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-kaju-katli-candle-detail` | Kaju Katli Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Kaju Katli Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-kaju-katli-candle-styled` | Kaju Katli Candle | 4:5 | 1200 × 1500 | The Kaju Katli Candle on a brass thali with marigold petals. Lifestyle framing, not product-on-white. |
| `product-kaju-katli-candle-scale` | Kaju Katli Candle | 1:1 | 1400 × 1400 | The Kaju Katli Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-kesar-pedha-candle-detail` | Kesar Pedha Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Kesar Pedha Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-kesar-pedha-candle-styled` | Kesar Pedha Candle | 4:5 | 1200 × 1500 | The Kesar Pedha Candle on a brass thali with marigold petals. Lifestyle framing, not product-on-white. |
| `product-kesar-pedha-candle-scale` | Kesar Pedha Candle | 1:1 | 1400 × 1400 | The Kesar Pedha Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-rasmalai-candle-detail` | Rasmalai Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Rasmalai Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-rasmalai-candle-styled` | Rasmalai Candle | 4:5 | 1200 × 1500 | The Rasmalai Candle on a brass thali with marigold petals. Lifestyle framing, not product-on-white. |
| `product-rasmalai-candle-scale` | Rasmalai Candle | 1:1 | 1400 × 1400 | The Rasmalai Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-mixed-mithai-bowl-candle-detail` | Mixed Mithai Bowl Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Mixed Mithai Bowl Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-mixed-mithai-bowl-candle-styled` | Mixed Mithai Bowl Candle | 4:5 | 1200 × 1500 | The Mixed Mithai Bowl Candle on a brass thali with marigold petals. Lifestyle framing, not product-on-white. |
| `product-mixed-mithai-bowl-candle-scale` | Mixed Mithai Bowl Candle | 1:1 | 1400 × 1400 | The Mixed Mithai Bowl Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |

### Floral Candles

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-hibiscus-tlight-candle-detail` | Hibiscus T-light Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Hibiscus T-light Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-hibiscus-tlight-candle-styled` | Hibiscus T-light Candle | 4:5 | 1200 × 1500 | The Hibiscus T-light Candle on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-hibiscus-tlight-candle-scale` | Hibiscus T-light Candle | 1:1 | 1400 × 1400 | The Hibiscus T-light Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-daisy-candle-detail` | Daisy Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Daisy Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-daisy-candle-styled` | Daisy Candle | 4:5 | 1200 × 1500 | The Daisy Candle on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-daisy-candle-scale` | Daisy Candle | 1:1 | 1400 × 1400 | The Daisy Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-daisy-urli-candle-detail` | Daisy Urli Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Daisy Urli Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-daisy-urli-candle-styled` | Daisy Urli Candle | 4:5 | 1200 × 1500 | The Daisy Urli Candle on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-daisy-urli-candle-scale` | Daisy Urli Candle | 1:1 | 1400 × 1400 | The Daisy Urli Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-tulip-bouquet-candle-detail` | Tulip Bouquet Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Tulip Bouquet Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-tulip-bouquet-candle-styled` | Tulip Bouquet Candle | 4:5 | 1200 × 1500 | The Tulip Bouquet Candle on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-tulip-bouquet-candle-scale` | Tulip Bouquet Candle | 1:1 | 1400 × 1400 | The Tulip Bouquet Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-rose-bouquet-candle-detail` | Rose Bouquet Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Rose Bouquet Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-rose-bouquet-candle-styled` | Rose Bouquet Candle | 4:5 | 1200 × 1500 | The Rose Bouquet Candle on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-rose-bouquet-candle-scale` | Rose Bouquet Candle | 1:1 | 1400 × 1400 | The Rose Bouquet Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-peony-candle-detail` | Peony Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Peony Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-peony-candle-styled` | Peony Candle | 4:5 | 1200 × 1500 | The Peony Candle on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-peony-candle-scale` | Peony Candle | 1:1 | 1400 × 1400 | The Peony Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-heart-rose-candle-detail` | Heart Rose Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Heart Rose Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-heart-rose-candle-styled` | Heart Rose Candle | 4:5 | 1200 × 1500 | The Heart Rose Candle on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-heart-rose-candle-scale` | Heart Rose Candle | 1:1 | 1400 × 1400 | The Heart Rose Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-marigold-candle-detail` | Marigold Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Marigold Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-marigold-candle-styled` | Marigold Candle | 4:5 | 1200 × 1500 | The Marigold Candle on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-marigold-candle-scale` | Marigold Candle | 1:1 | 1400 × 1400 | The Marigold Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-floral-tlight-candles-detail` | Floral T-light Candles | 1:1 | 1400 × 1400 | Macro of the finish on the Floral T-light Candles — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-floral-tlight-candles-styled` | Floral T-light Candles | 4:5 | 1200 × 1500 | The Floral T-light Candles on cream fabric in soft daylight with fresh petals nearby. Lifestyle framing, not product-on-white. |
| `product-floral-tlight-candles-scale` | Floral T-light Candles | 1:1 | 1400 × 1400 | The Floral T-light Candles held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |

### Décor & Novelty Candles

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-mini-blooming-jar-candle-detail` | Mini Blooming Jar Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Mini Blooming Jar Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-mini-blooming-jar-candle-styled` | Mini Blooming Jar Candle | 4:5 | 1200 × 1500 | The Mini Blooming Jar Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-mini-blooming-jar-candle-scale` | Mini Blooming Jar Candle | 1:1 | 1400 × 1400 | The Mini Blooming Jar Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-bubble-candle-detail` | Bubble Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Bubble Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-bubble-candle-styled` | Bubble Candle | 4:5 | 1200 × 1500 | The Bubble Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-bubble-candle-scale` | Bubble Candle | 1:1 | 1400 × 1400 | The Bubble Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-woven-heart-candle-detail` | Woven Heart Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Woven Heart Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-woven-heart-candle-styled` | Woven Heart Candle | 4:5 | 1200 × 1500 | The Woven Heart Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-woven-heart-candle-scale` | Woven Heart Candle | 1:1 | 1400 × 1400 | The Woven Heart Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-rose-teddy-heart-candle-detail` | Rose Teddy Heart Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Rose Teddy Heart Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-rose-teddy-heart-candle-styled` | Rose Teddy Heart Candle | 4:5 | 1200 × 1500 | The Rose Teddy Heart Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-rose-teddy-heart-candle-scale` | Rose Teddy Heart Candle | 1:1 | 1400 × 1400 | The Rose Teddy Heart Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-teddy-bear-candle-detail` | Teddy Bear Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Teddy Bear Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-teddy-bear-candle-styled` | Teddy Bear Candle | 4:5 | 1200 × 1500 | The Teddy Bear Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-teddy-bear-candle-scale` | Teddy Bear Candle | 1:1 | 1400 × 1400 | The Teddy Bear Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-couple-candle-detail` | Couple Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Couple Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-couple-candle-styled` | Couple Candle | 4:5 | 1200 × 1500 | The Couple Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-couple-candle-scale` | Couple Candle | 1:1 | 1400 × 1400 | The Couple Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-marble-effect-mini-jar-candle-detail` | Marble Effect Mini Jar Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Marble Effect Mini Jar Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-marble-effect-mini-jar-candle-styled` | Marble Effect Mini Jar Candle | 4:5 | 1200 × 1500 | The Marble Effect Mini Jar Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-marble-effect-mini-jar-candle-scale` | Marble Effect Mini Jar Candle | 1:1 | 1400 × 1400 | The Marble Effect Mini Jar Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-layered-jar-candle-detail` | Layered Jar Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Layered Jar Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-layered-jar-candle-styled` | Layered Jar Candle | 4:5 | 1200 × 1500 | The Layered Jar Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-layered-jar-candle-scale` | Layered Jar Candle | 1:1 | 1400 × 1400 | The Layered Jar Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-pillar-candle-detail` | Pillar Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Pillar Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-pillar-candle-styled` | Pillar Candle | 4:5 | 1200 × 1500 | The Pillar Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-pillar-candle-scale` | Pillar Candle | 1:1 | 1400 × 1400 | The Pillar Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-taper-candle-detail` | Taper Candle | 1:1 | 1400 × 1400 | Macro of the finish on the Taper Candle — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-taper-candle-styled` | Taper Candle | 4:5 | 1200 × 1500 | The Taper Candle on a styled shelf beside books and a small plant. Lifestyle framing, not product-on-white. |
| `product-taper-candle-scale` | Taper Candle | 1:1 | 1400 × 1400 | The Taper Candle held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |

### Resin Art

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-resin-ganesha-standee-detail` | Resin Ganesha Standee | 1:1 | 1400 × 1400 | Macro of the finish on the Resin Ganesha Standee — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-resin-ganesha-standee-styled` | Resin Ganesha Standee | 4:5 | 1200 × 1500 | The Resin Ganesha Standee in a home setting, angled so the resin does not glare. Lifestyle framing, not product-on-white. |
| `product-resin-ganesha-standee-scale` | Resin Ganesha Standee | 1:1 | 1400 × 1400 | The Resin Ganesha Standee held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-personalised-keepsake-frame-detail` | Personalised Keepsake Frame | 1:1 | 1400 × 1400 | Macro of the finish on the Personalised Keepsake Frame — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-personalised-keepsake-frame-styled` | Personalised Keepsake Frame | 4:5 | 1200 × 1500 | The Personalised Keepsake Frame in a home setting, angled so the resin does not glare. Lifestyle framing, not product-on-white. |
| `product-personalised-keepsake-frame-scale` | Personalised Keepsake Frame | 1:1 | 1400 × 1400 | The Personalised Keepsake Frame held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-polaroid-photo-magnet-detail` | Polaroid Photo Magnet | 1:1 | 1400 × 1400 | Macro of the finish on the Polaroid Photo Magnet — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-polaroid-photo-magnet-styled` | Polaroid Photo Magnet | 4:5 | 1200 × 1500 | The Polaroid Photo Magnet in a home setting, angled so the resin does not glare. Lifestyle framing, not product-on-white. |
| `product-polaroid-photo-magnet-scale` | Polaroid Photo Magnet | 1:1 | 1400 × 1400 | The Polaroid Photo Magnet held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-resin-coaster-set-detail` | Resin Coaster Set | 1:1 | 1400 × 1400 | Macro of the finish on the Resin Coaster Set — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-resin-coaster-set-styled` | Resin Coaster Set | 4:5 | 1200 × 1500 | The Resin Coaster Set in a home setting, angled so the resin does not glare. Lifestyle framing, not product-on-white. |
| `product-resin-coaster-set-scale` | Resin Coaster Set | 1:1 | 1400 × 1400 | The Resin Coaster Set held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |

### Lippan & Clay Art

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-lippan-art-wall-frame-detail` | Lippan Art Wall Frame | 1:1 | 1400 × 1400 | Macro of the finish on the Lippan Art Wall Frame — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-lippan-art-wall-frame-styled` | Lippan Art Wall Frame | 4:5 | 1200 × 1500 | The Lippan Art Wall Frame on a plain wall with raking side light. Lifestyle framing, not product-on-white. |
| `product-lippan-art-wall-frame-scale` | Lippan Art Wall Frame | 1:1 | 1400 × 1400 | The Lippan Art Wall Frame held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-lippan-art-panel-set-detail` | Lippan Art Panel Set | 1:1 | 1400 × 1400 | Macro of the finish on the Lippan Art Panel Set — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-lippan-art-panel-set-styled` | Lippan Art Panel Set | 4:5 | 1200 × 1500 | The Lippan Art Panel Set on a plain wall with raking side light. Lifestyle framing, not product-on-white. |
| `product-lippan-art-panel-set-scale` | Lippan Art Panel Set | 1:1 | 1400 × 1400 | The Lippan Art Panel Set held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-clay-miniature-piece-detail` | Clay Miniature Piece | 1:1 | 1400 × 1400 | Macro of the finish on the Clay Miniature Piece — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-clay-miniature-piece-styled` | Clay Miniature Piece | 4:5 | 1200 × 1500 | The Clay Miniature Piece on a plain wall with raking side light. Lifestyle framing, not product-on-white. |
| `product-clay-miniature-piece-scale` | Clay Miniature Piece | 1:1 | 1400 × 1400 | The Clay Miniature Piece held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |

### Marathi & MDF Craft

| Slot ID | Product | Ratio | Recommended px | What the shot should show |
|---|---|---|---|---|
| `product-marathi-quote-nameplate-detail` | Marathi Quote Nameplate | 1:1 | 1400 × 1400 | Macro of the finish on the Marathi Quote Nameplate — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-marathi-quote-nameplate-styled` | Marathi Quote Nameplate | 4:5 | 1200 × 1500 | The Marathi Quote Nameplate mounted beside a doorway in daylight. Lifestyle framing, not product-on-white. |
| `product-marathi-quote-nameplate-scale` | Marathi Quote Nameplate | 1:1 | 1400 × 1400 | The Marathi Quote Nameplate held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-jai-maharashtra-map-cutout-detail` | Jai Maharashtra Map Cutout | 1:1 | 1400 × 1400 | Macro of the finish on the Jai Maharashtra Map Cutout — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-jai-maharashtra-map-cutout-styled` | Jai Maharashtra Map Cutout | 4:5 | 1200 × 1500 | The Jai Maharashtra Map Cutout mounted beside a doorway in daylight. Lifestyle framing, not product-on-white. |
| `product-jai-maharashtra-map-cutout-scale` | Jai Maharashtra Map Cutout | 1:1 | 1400 × 1400 | The Jai Maharashtra Map Cutout held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-marathi-calendar-detail` | Marathi Calendar | 1:1 | 1400 × 1400 | Macro of the finish on the Marathi Calendar — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-marathi-calendar-styled` | Marathi Calendar | 4:5 | 1200 × 1500 | The Marathi Calendar mounted beside a doorway in daylight. Lifestyle framing, not product-on-white. |
| `product-marathi-calendar-scale` | Marathi Calendar | 1:1 | 1400 × 1400 | The Marathi Calendar held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |
| `product-custom-mdf-nameplate-detail` | Custom MDF Nameplate | 1:1 | 1400 × 1400 | Macro of the finish on the Custom MDF Nameplate — texture, silver leaf, edges. Fill the frame and keep it tack sharp. |
| `product-custom-mdf-nameplate-styled` | Custom MDF Nameplate | 4:5 | 1200 × 1500 | The Custom MDF Nameplate mounted beside a doorway in daylight. Lifestyle framing, not product-on-white. |
| `product-custom-mdf-nameplate-scale` | Custom MDF Nameplate | 1:1 | 1400 × 1400 | The Custom MDF Nameplate held in one hand, or beside its packaging, so the size reads clearly. The studio's signature shot. |

---

## Mobile crops

Over 90% of visitors arrive on a phone. These wide slots also need a portrait
version — a landscape hero cropped to a phone viewport loses its subject. Name
the file `<slot-id>-mobile.jpg` and set `mobileSrc` on the slot.

| Slot ID | Where it appears | Ratio | Recommended px | What the mobile crop needs |
|---|---|---|---|---|
| `home-hero-mobile` | Home — Hero | 4:5 | 1200 × 1500 | Portrait 4:5 crop of the same set-up for phones — subject lower in the frame, clear space across the top two-thirds for the headline. Over 90% of visitors arrive on a phone, so shoot this one properly rather than cropping the landscape. |

---

## Video

All videos play muted, looping and without controls. Keep each under 25 seconds
— they loop, so they should not feel like a film. Existing "let's make…" reels
can be re-cut for these.

| Slot ID | Where it appears | Ratio | Recommended | What it should show |
|---|---|---|---|---|
| `process-reel` | Home — Made by Hand | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Muted, looping vertical reel (15–25s): wax pouring, demoulding, varq detailing, finished piece. Export 1080×1920, H.264 MP4, under 6 MB. |
| `product-modak-candle-reel` | Product — Modak Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Modak Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-laddu-candle-reel` | Product — Laddu Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Laddu Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-kaju-katli-candle-reel` | Product — Kaju Katli Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Kaju Katli Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-kesar-pedha-candle-reel` | Product — Kesar Pedha Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Kesar Pedha Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-rasmalai-candle-reel` | Product — Rasmalai Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Rasmalai Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-mixed-mithai-bowl-candle-reel` | Product — Mixed Mithai Bowl Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Mixed Mithai Bowl Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-hibiscus-tlight-candle-reel` | Product — Hibiscus T-light Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Hibiscus T-light Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-daisy-candle-reel` | Product — Daisy Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Daisy Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-daisy-urli-candle-reel` | Product — Daisy Urli Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Daisy Urli Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-tulip-bouquet-candle-reel` | Product — Tulip Bouquet Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Tulip Bouquet Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-rose-bouquet-candle-reel` | Product — Rose Bouquet Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Rose Bouquet Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-peony-candle-reel` | Product — Peony Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Peony Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-heart-rose-candle-reel` | Product — Heart Rose Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Heart Rose Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-marigold-candle-reel` | Product — Marigold Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Marigold Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-floral-tlight-candles-reel` | Product — Floral T-light Candles | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Floral T-light Candles being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-mini-blooming-jar-candle-reel` | Product — Mini Blooming Jar Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Mini Blooming Jar Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-bubble-candle-reel` | Product — Bubble Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Bubble Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-woven-heart-candle-reel` | Product — Woven Heart Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Woven Heart Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-rose-teddy-heart-candle-reel` | Product — Rose Teddy Heart Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Rose Teddy Heart Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-teddy-bear-candle-reel` | Product — Teddy Bear Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Teddy Bear Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-couple-candle-reel` | Product — Couple Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Couple Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-marble-effect-mini-jar-candle-reel` | Product — Marble Effect Mini Jar Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Marble Effect Mini Jar Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-layered-jar-candle-reel` | Product — Layered Jar Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Layered Jar Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-pillar-candle-reel` | Product — Pillar Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Pillar Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-taper-candle-reel` | Product — Taper Candle | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Taper Candle being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-resin-ganesha-standee-reel` | Product — Resin Ganesha Standee | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Resin Ganesha Standee being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-personalised-keepsake-frame-reel` | Product — Personalised Keepsake Frame | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Personalised Keepsake Frame being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-polaroid-photo-magnet-reel` | Product — Polaroid Photo Magnet | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Polaroid Photo Magnet being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-resin-coaster-set-reel` | Product — Resin Coaster Set | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Resin Coaster Set being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-lippan-art-wall-frame-reel` | Product — Lippan Art Wall Frame | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Lippan Art Wall Frame being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-lippan-art-panel-set-reel` | Product — Lippan Art Panel Set | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Lippan Art Panel Set being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-clay-miniature-piece-reel` | Product — Clay Miniature Piece | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Clay Miniature Piece being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-marathi-quote-nameplate-reel` | Product — Marathi Quote Nameplate | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Marathi Quote Nameplate being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-jai-maharashtra-map-cutout-reel` | Product — Jai Maharashtra Map Cutout | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Jai Maharashtra Map Cutout being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-marathi-calendar-reel` | Product — Marathi Calendar | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Marathi Calendar being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |
| `product-custom-mdf-nameplate-reel` | Product — Custom MDF Nameplate | 9:16 | 1080 × 1920, MP4 (H.264), < 6 MB | Vertical reel of the Custom MDF Nameplate being made: pouring or shaping, demoulding, the finishing detail, the final piece. 15–25s, muted loop, 1080 × 1920. |

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

Replace `components/brand/LogoMark.tsx` with the supplied vector once available.

---

## Also worth collecting

Not blocking the build, but each one strengthens the site:

- **Customer testimonial permission** — the WhatsApp screenshots are excellent social proof, but need consent before publishing.
- **Packaging shots** — boxes, tags, inserts. Corporate buyers ask about branding first.
- **Completed bulk orders** — more of them. It is the strongest B2B proof there is.
- **A confirmed retail price list** — the wholesale tiers are published, but retail was cropped in the original creative.

---

_Generated from the content layer by `scripts/generate-manifest.mjs`. Re-run it whenever products are added or changed._

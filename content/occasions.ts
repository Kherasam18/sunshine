import type { Occasion } from '@/types';

/**
 * Festival and occasion groupings. Display order is decided at read time by
 * `site.featuredOccasion` — see getOccasions() in /lib/content.ts.
 */
export const occasions: Occasion[] = [
  {
    slug: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    season: 'Aug – Sep',
    tagline: 'Modak for Bappa, made to glow.',
    description: 'Modak candles, Ganesha standees and marigold t-lights for the thali, the mandap and the guests.',
    intro:
      'Ten days when every home in Pune smells of modak and marigold. We make the sweets you can light and the Bappa you can keep — for your own mandap, and for everyone who walks through the door during darshan.',
    giftNote:
      'Most families order modak candles by the dozen for prasad bags, and a Ganesha standee for the car or the mandir shelf. If you are hosting, order early — Ganesh Chaturthi is our busiest window of the year.',
    href: '/occasions/ganesh-chaturthi',
    productSlugs: ['modak-candle', 'resin-ganesha-standee', 'marigold-candle', 'mixed-mithai-bowl-candle'],
    image: {
      id: 'occasion-ganesh-chaturthi',
      label: 'Ganesh Chaturthi',
      alt: 'Modak candles and a Ganesha standee set up for Ganesh Chaturthi',
      aspect: '1:1',
      note: 'Modak candles and a Ganesha standee on a decorated mandap step with marigolds and a diya.',
    },
    hero: {
      id: 'occasion-ganesh-chaturthi-hero',
      label: 'Ganesh Chaturthi — banner',
      alt: 'A Ganesh Chaturthi mandap decorated with modak candles and marigolds',
      aspect: '21:9',
      note: 'Wide banner: a decorated mandap with modak candles on a brass thali, marigold garlands, warm lamp light.',
    },
  },
  {
    slug: 'diwali',
    name: 'Diwali',
    season: 'Oct – Nov',
    tagline: 'Hampers that outshine the dry-fruit box.',
    description: 'Mithai candle boxes, layered jars and Lippan frames — for family, staff and clients.',
    intro:
      'Everyone receives the same dry-fruit box. Very few receive a box of laddus that turn out to be candles. Our Diwali range is built for gifting at every scale — one thoughtful hamper, or four hundred boxed sets with your logo on the sleeve.',
    giftNote:
      'Corporate orders start landing with us from late August. If you need branded packaging or a specific colour story, give us a month and we will get it right.',
    href: '/occasions/diwali',
    productSlugs: ['laddu-candle', 'kaju-katli-candle', 'mixed-mithai-bowl-candle', 'layered-jar-candle'],
    image: {
      id: 'occasion-diwali',
      label: 'Diwali',
      alt: 'A Diwali gift hamper of handmade candles with diyas and rangoli',
      aspect: '1:1',
      note: 'Diwali hamper flat-lay: mithai candle box, jar candle, diyas and rangoli colour around the edges.',
    },
    hero: {
      id: 'occasion-diwali-hero',
      label: 'Diwali — banner',
      alt: 'Diwali gift hampers of handmade candles lit with diyas',
      aspect: '21:9',
      note: 'Wide banner: Diwali hampers with lit diyas and rangoli, shot in low warm light with visible flames.',
    },
  },
  {
    slug: 'rakshabandhan',
    name: 'Rakshabandhan',
    season: 'Aug',
    tagline: 'Something more than a box of sweets.',
    description: 'Sibling figurine candles, mithai boxes and personalised magnets to send with the rakhi.',
    intro:
      'The rakhi goes in the envelope every year. This time, send something that stays on their desk afterwards — a photo magnet from a childhood picture, or a box of laddu candles that will make them look twice.',
    giftNote:
      'Sending outside Pune? Order at least three weeks ahead so it reaches before the day, and we will pack it to survive the journey.',
    href: '/occasions/rakshabandhan',
    productSlugs: ['laddu-candle', 'polaroid-photo-magnet', 'floral-tlight-candles', 'mini-blooming-jar-candle'],
    image: {
      id: 'occasion-rakshabandhan',
      label: 'Rakshabandhan',
      alt: 'A Rakshabandhan gift set with a candle, rakhi and sweets',
      aspect: '1:1',
      note: 'Rakhi thali with a sibling figurine candle, a rakhi and a small mithai candle box.',
    },
    hero: {
      id: 'occasion-rakshabandhan-hero',
      label: 'Rakshabandhan — banner',
      alt: 'A decorated rakhi thali with handmade candles and photo magnets',
      aspect: '21:9',
      note: 'Wide banner: a rakhi thali styled with candles, a rakhi and photo magnets on a bright cloth.',
    },
  },
  {
    slug: 'weddings-return-gifts',
    name: 'Weddings & Return Gifts',
    season: 'All year',
    tagline: 'Twenty guests or two hundred, still made by hand.',
    description: 'Daisy urlis, floral t-lights and mini jars — tagged, boxed and ready for the gift table.',
    intro:
      'Return gifts are the part of the wedding nobody plans until the last month. Ours start at ₹30 a piece, arrive tagged and boxed, and look like they cost considerably more than they did. Haldi, mehendi, sangeet, reception — we can match each function to its own colour.',
    giftNote:
      'Planners and families usually order between 100 and 300 pieces. Tell us your per-guest budget and we will show you what it buys — that conversation is faster than a catalogue.',
    href: '/occasions/weddings-return-gifts',
    productSlugs: ['daisy-urli-candle', 'floral-tlight-candles', 'mini-blooming-jar-candle', 'resin-ganesha-standee'],
    image: {
      id: 'occasion-weddings-return-gifts',
      label: 'Weddings & Return Gifts',
      alt: 'A wedding gift table lined with handmade candle return gifts',
      aspect: '1:1',
      note: 'Gift table at a wedding lined with tagged return gifts. Shows volume and presentation together.',
    },
    hero: {
      id: 'occasion-weddings-return-gifts-hero',
      label: 'Weddings & Return Gifts — banner',
      alt: 'A long wedding gift table of handmade return gifts with name tags',
      aspect: '21:9',
      note: 'Wide banner: a long table of tagged return gifts at a wedding. Show scale — rows and rows of them.',
    },
  },
  {
    slug: 'valentines',
    name: "Valentine's",
    season: 'Feb',
    tagline: 'Because your love deserves more than ordinary flowers.',
    description: 'Rose bouquets that never wilt, couple candles and keepsake frames made from your photograph.',
    intro:
      'Fresh roses last four days. A rose bouquet poured in soy wax is still on the shelf next February — and a keepsake frame with your photograph, your names and your date will outlast both of you arguing about where to hang it.',
    giftNote:
      'Personalised frames need your photograph and about three weeks. Order by mid-January if you want it in hand for the day.',
    href: '/occasions/valentines',
    productSlugs: ['rose-bouquet-candle', 'couple-candle', 'personalised-keepsake-frame', 'heart-rose-candle'],
    image: {
      id: 'occasion-valentines',
      label: "Valentine's",
      alt: 'A rose bouquet candle and couple candle styled for Valentine’s Day',
      aspect: '1:1',
      note: 'Rose bouquet candle with a couple candle lit behind it, blush palette, soft evening light.',
    },
    hero: {
      id: 'occasion-valentines-hero',
      label: "Valentine's — banner",
      alt: 'Rose bouquet candles and keepsake frames in a blush-toned setting',
      aspect: '21:9',
      note: 'Wide banner: rose bouquet candle, couple candle and a keepsake frame together. Blush palette, candlelit.',
    },
  },
  {
    slug: 'housewarming',
    name: 'Housewarming',
    season: 'All year',
    tagline: 'The first warm thing in a new home.',
    description: 'Lippan frames, Marathi nameplates and jar candles — a gift set that stays on the wall.',
    intro:
      'A new home has bare walls and no smell of its own yet. A Lippan frame fixes the first problem, a jar candle the second, and a nameplate in their own family name makes the place theirs from the doorway in.',
    giftNote:
      'Nameplates are made to order in Marathi, Hindi or English — send us the spelling exactly as they write it, and allow twenty days.',
    href: '/occasions/housewarming',
    productSlugs: ['lippan-art-wall-frame', 'marathi-quote-nameplate', 'layered-jar-candle', 'resin-coaster-set'],
    image: {
      id: 'occasion-housewarming',
      label: 'Housewarming',
      alt: 'A Lippan frame and nameplate styled as a housewarming gift set',
      aspect: '1:1',
      note: 'Lippan frame, Marathi nameplate and a jar candle grouped as a gift set in a bright new-home setting.',
    },
    hero: {
      id: 'occasion-housewarming-hero',
      label: 'Housewarming — banner',
      alt: 'A new home entryway with a Lippan frame and a Marathi nameplate',
      aspect: '21:9',
      note: 'Wide banner: a bright new-home entryway with a nameplate by the door and a Lippan frame on the wall.',
    },
  },
];

import type { ImageSlot, StoryChapter } from '@/types';

export const founderPortrait: ImageSlot = {
  id: 'story-founder-portrait',
  label: 'Founder portrait',
  alt: 'The founder of Sunshine Creations in her Pune studio',
  aspect: '4:5',
  note: 'Natural portrait of the founder at her work table, mid-task rather than posed — hands busy, wax and moulds around her. Warm window light.',
};

export const studioImage: ImageSlot = {
  id: 'story-studio',
  label: 'The studio',
  alt: 'The Sunshine Creations home studio in Pune',
  aspect: '3:2',
  note: 'Wide shot of the working space: moulds, wax, colour pots, half-finished pieces. Honest and lived-in, not tidied for the camera.',
};

export const storyHero: ImageSlot = {
  id: 'story-hero',
  label: 'Our Story — banner',
  alt: 'Hands finishing a handmade candle in the studio',
  aspect: '21:9',
  note: 'Wide banner: hands at work finishing a piece, shallow depth of field, warm light. Faceless is fine — this is about the making.',
};

export const storyChapters: StoryChapter[] = [
  {
    id: 'beginning',
    eyebrow: 'The beginning',
    title: 'Started with zero.',
    body: [
      'No big setup. No huge audience. No investor, no team, no shop. Just a little dream, a lot of faith, and a kitchen table that slowly stopped being a kitchen table.',
      'The first orders came from friends, then from friends of friends, then from strangers who had seen a photograph somewhere and wanted to know if the modak was real. It was not. That question is still the best compliment this studio gets.',
    ],
    quote: 'Started with ZERO — no big setup, no huge audience, just a little dream and lots of faith.',
    image: founderPortrait,
  },
  {
    id: 'crafts',
    eyebrow: 'Four crafts, one pair of hands',
    title: 'Wax, resin, clay and wood.',
    body: [
      'Most studios pick one material and stay there. This one kept learning. Candles came first and are still the heart of it — the mithai range especially, because nobody else was sculpting modak and laddu with silver varq and getting them to look this convincing.',
      'Then resin, for the couples who wanted their photograph and their date held somewhere permanent. Then Lippan, the Kutchi mud-and-mirror work, drawn freehand onto frames. And then MDF and Marathi lettering, because a nameplate in your own language belongs by your own door.',
      'It means one wedding can get its favours, its keepsake frame and its nameplate from the same person. That is unusual, and it is deliberate.',
    ],
    image: studioImage,
  },
  {
    id: 'making',
    eyebrow: 'How a piece is made',
    title: 'Poured, detailed, packed — one at a time.',
    body: [
      'Soy wax is melted, tinted and scented in small batches, then poured into moulds by hand. Each piece is left to set, demoulded carefully — the part that goes wrong most often — and finished individually. Silver varq is laid on with a fingertip. Petals are shaped. Edges are cleaned.',
      'Then it is wrapped, boxed, tied and packed to survive an Indian courier network. Nothing about this is fast, and none of it happens before you order it.',
    ],
  },
  {
    id: 'variation',
    eyebrow: 'Why no two are identical',
    title: 'The small differences are the point.',
    body: [
      'Every batch of wax is tinted by hand, so one saffron is never exactly the next. Every Lippan frame is drawn freehand, so the peacock on yours will not match the one in the photograph. Sizes shift by a millimetre or two.',
      'We could remove all of that by having a machine make it in a factory. Then it would be identical, and it would not be yours. The variation is the signature — it is how you know a person made this, for you, and not for a shelf.',
    ],
  },
  {
    id: 'pune',
    eyebrow: 'Made in Pune',
    title: 'Rooted here, sent everywhere.',
    body: [
      'Everything is made in Pune and shipped across India with tracking. The Marathi range — the nameplates, the जय महाराष्ट्र cutouts, the calendar — comes from the same place the studio does, and it sells hardest to people who grew up with those words on a wall.',
      'If you are in Pune, come and collect it. There is usually chai.',
    ],
    quote: 'Thank you for believing in our little business.',
  },
];

export const storyStats = [
  { value: '4', label: 'crafts under one roof' },
  { value: '36', label: 'pieces in the catalogue' },
  { value: '20', label: 'minimum for bulk orders' },
  { value: '100%', label: 'soy wax, always' },
];

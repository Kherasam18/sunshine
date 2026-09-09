import type { BrandingOption, BulkUseCase, ImageSlot } from '@/types';

export const bulkUseCases: BulkUseCase[] = [
  {
    id: 'corporate-diwali',
    title: 'Corporate Diwali gifting',
    description:
      'Boxed mithai candles with your logo on the sleeve, for staff and clients. Memorable in a way the dry-fruit box has not been for a decade.',
    icon: 'building',
  },
  {
    id: 'wedding-return-gifts',
    title: 'Wedding return gifts',
    description:
      'From ₹30 a piece, tagged and boxed, in colours matched to each function. Haldi, mehendi, sangeet and reception can each have their own.',
    icon: 'gift',
  },
  {
    id: 'event-favours',
    title: 'Event & party favours',
    description:
      'Baby showers, naming ceremonies, housewarmings and birthdays. Small pieces, personalised with names, that guests actually take home and use.',
    icon: 'party',
  },
  {
    id: 'reseller-stock',
    title: 'Reseller & boutique stock',
    description:
      'Wholesale rates for gift shops and online boutiques, with consistent repeat batches and packaging that suits your own labelling.',
    icon: 'store',
  },
  {
    id: 'hospitality-decor',
    title: 'Café & hotel décor',
    description:
      'Table candles, urli pieces and Lippan wall panels made to your palette. We can hold a repeat order so your tables never run short.',
    icon: 'coffee',
  },
];

export const brandingOptions: BrandingOption[] = [
  {
    title: 'Your colours',
    description:
      'Any shade you like, mixed by hand to match a brand palette, a wedding theme or a room. Send a hex code or a photograph.',
    icon: 'palette',
  },
  {
    title: 'Your fragrance',
    description:
      'Choose from our range — kesar elaichi, sandalwood, mogra, rose, vanilla, lavender — or ask for unscented, which most pooja pieces call for.',
    icon: 'flower',
  },
  {
    title: 'Custom packaging',
    description:
      'Window boxes, kraft sleeves, ribbon and tissue. We can match the box to the piece, or to your brand, and pack it ready to hand over.',
    icon: 'package',
  },
  {
    title: 'Printed tags & inserts',
    description:
      'Your logo, a thank-you note, a couple’s names and date, or a QR code. Printed, tied and packed here so nothing needs assembling at your end.',
    icon: 'tag',
  },
];

export const bulkGallery: ImageSlot[] = [
  {
    id: 'bulk-gallery-modak-order',
    label: 'Bulk modak order',
    alt: 'Hundreds of modak candles laid out for a completed bulk order',
    aspect: '4:5',
    note: 'Overhead of a completed modak bulk order — trays of finished candles before packing. Shows genuine volume.',
  },
  {
    id: 'bulk-gallery-corporate-boxes',
    label: 'Corporate gift boxes',
    alt: 'Branded corporate gift boxes of handmade candles stacked ready to ship',
    aspect: '4:5',
    note: 'Stacked branded boxes with printed sleeves and tags. If a real client logo cannot be shown, use a mock sleeve.',
  },
  {
    id: 'bulk-gallery-wedding-favours',
    label: 'Wedding favour table',
    alt: 'A wedding gift table lined with tagged handmade favours',
    aspect: '4:5',
    note: 'Wedding gift table with rows of tagged favours, guests visible in soft background blur.',
  },
  {
    id: 'bulk-gallery-packing',
    label: 'Packing the order',
    alt: 'A large order being packed by hand in the studio',
    aspect: '4:5',
    note: 'The studio mid-pack: bubble wrap, boxes, tape and finished pieces across a full table.',
  },
  {
    id: 'bulk-gallery-tlight-batch',
    label: 'T-light batch',
    alt: 'A large batch of floral t-light candles in multiple colours',
    aspect: '4:5',
    note: 'A tray of 100+ floral t-lights in several colours, shot from above to show range and consistency.',
  },
  {
    id: 'bulk-gallery-dispatch',
    label: 'Ready for dispatch',
    alt: 'Sealed and labelled parcels ready for courier pickup',
    aspect: '4:5',
    note: 'Sealed, labelled parcels stacked by the door awaiting pickup. Proof the studio ships at volume.',
  },
];

export const bulkHero: ImageSlot = {
  id: 'bulk-hero',
  label: 'Bulk & Corporate — banner',
  alt: 'A large handmade candle order laid out and packed for dispatch',
  aspect: '21:9',
  note: 'Wide banner: a full table of a completed bulk order mid-pack. Expose slightly under so white text sits comfortably on top.',
};

/** Quantity bands offered in the bulk enquiry form. */
export const bulkQuantityBands = [
  '20 – 50 pieces',
  '50 – 100 pieces',
  '100 – 250 pieces',
  '250 – 500 pieces',
  '500 + pieces',
];

export const bulkBudgetBands = [
  'Under ₹5,000',
  '₹5,000 – ₹15,000',
  '₹15,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  'Above ₹1,00,000',
  'Not sure yet',
];

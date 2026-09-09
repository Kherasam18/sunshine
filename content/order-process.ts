import type { CareTip, FaqItem, OrderStep } from '@/types';

/**
 * The six published order steps, rewritten in the studio's own warm voice.
 * The advance-payment and lead-time rules are framed as craftsmanship —
 * never as restriction.
 */
export const orderSteps: OrderStep[] = [
  {
    step: '01',
    title: 'Send us a message',
    description:
      'Say hello on WhatsApp or drop a DM on Instagram, and tell us what caught your eye. We will confirm whether it is available for your date.',
    note: 'We usually reply the same day.',
    icon: 'message',
  },
  {
    step: '02',
    title: 'Share the details',
    description:
      'Product, quantity, colours, fragrance, any personalisation, and your delivery pincode. The more you tell us, the closer the first sample lands.',
    note: 'Sending a reference photo helps enormously.',
    icon: 'list',
  },
  {
    step: '03',
    title: 'Get your confirmation',
    description:
      'We come back with the price, what is possible and a realistic timeline. Once you are happy, your order goes into the book with your name on it.',
    icon: 'check',
  },
  {
    step: '04',
    title: 'Confirm with full payment',
    description:
      'We ask for the full amount upfront. Every piece is poured and finished for your order alone, so that confirmation is what lets us buy the wax and start pouring.',
    note: 'UPI and bank transfer. We are not able to offer cash on delivery.',
    icon: 'wallet',
  },
  {
    step: '05',
    title: 'Give us time to make it',
    description:
      'Please place bulk orders at least 20 days ahead. Handmade work cannot be rushed without showing it, and we would rather it arrived right than early.',
    note: 'Festive seasons fill up faster — Ganesh Chaturthi and Diwali book out weeks in advance.',
    icon: 'clock',
  },
  {
    step: '06',
    title: 'Packed with love, then posted',
    description:
      'Each piece is wrapped by hand, boxed to survive the journey and sent across India with tracking. We share the details the moment it leaves the studio.',
    icon: 'package',
  },
];

/** Candle care — the studio's existing copy, tidied for the web. */
export const careTips: CareTip[] = [
  {
    title: 'Trim the wick before every burn',
    description:
      'Keep it at about ¼ inch. A short wick burns cleanly and evenly; a long one smokes and leaves soot on the glass.',
    icon: 'scissors',
  },
  {
    title: 'Let the first burn reach the edges',
    description:
      'On the first light, leave it burning until the melted wax spreads to the full width. Soy wax remembers its first burn — this is what stops it tunnelling later.',
    icon: 'flame',
  },
  {
    title: 'Keep it out of sun and draughts',
    description:
      'Direct sunlight softens soy wax and fades colour. Draughts make the flame dance, which burns the candle unevenly and faster.',
    icon: 'sun',
  },
  {
    title: 'Never leave a burning candle unattended',
    description:
      'Burn on a heat-safe surface, away from anything that can catch, and out of reach of children and pets. Please put it out before you leave the room.',
    icon: 'shield',
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'faq-lead-time',
    question: 'How long will my order take?',
    answer:
      'Single pieces usually take 7–10 days. For bulk orders, please allow at least 20 days from confirmation — every piece is poured, finished and packed by hand after you order, so nothing is sitting ready on a shelf. During Ganesh Chaturthi and Diwali the book fills up weeks ahead, so the earlier you talk to us, the better.',
    group: 'ordering',
  },
  {
    id: 'faq-payment',
    question: 'Why is full payment needed upfront?',
    answer:
      'Because your order is made especially for you. We buy the wax, mix your colours and pour your pieces only once an order is confirmed, and a personalised piece cannot be sold to anyone else. Paying upfront is what lets a one-person studio take your order seriously. We accept UPI and bank transfer; cash on delivery is not available.',
    group: 'ordering',
  },
  {
    id: 'faq-cancellation',
    question: 'Can I change or cancel my order?',
    answer:
      'Talk to us as early as you can and we will do whatever is still possible — colours and quantities can often be adjusted in the first day or two. Once your pieces are made, though, we are not able to accept cancellations, because each one has been made especially for you and cannot be offered to anyone else.',
    group: 'ordering',
  },
  {
    id: 'faq-shipping',
    question: 'Do you ship across India?',
    answer:
      'Yes. Everything is packed by hand to survive the journey and sent with tracking, which we share as soon as your parcel leaves the studio. Delivery usually takes 3–7 days depending on your pincode. Pune orders can often be collected or delivered locally — just ask.',
    group: 'shipping',
  },
  {
    id: 'faq-damage',
    question: 'What if something arrives damaged?',
    answer:
      'It is rare, but couriers are couriers. Please film your unboxing and send us the video along with photographs within 24 hours of delivery, and we will sort it out — a replacement or a refund of the affected pieces. That short video is all we need to make a claim, which is why we ask for it so quickly.',
    group: 'shipping',
  },
  {
    id: 'faq-variation',
    question: 'Why do colours and sizes vary slightly?',
    answer:
      'Because a person made it, not a machine. Every batch of wax is tinted by hand, every piece is demoulded by hand, and every Lippan frame is drawn freehand. Small differences in shade, size and finish are the fingerprint of handmade work rather than a fault — and it means the piece you receive is genuinely yours alone.',
    group: 'handmade',
  },
  {
    id: 'faq-custom',
    question: 'Can you make something custom?',
    answer:
      'Almost always — it is most of what we do. Any colour, any fragrance, names and dates, your photograph set in resin, custom packaging and tags. Send us a reference image and your budget and we will tell you honestly whether we can do it well.',
    group: 'ordering',
  },
  {
    id: 'faq-fragrance',
    question: 'Are the candles safe and what wax do you use?',
    answer:
      'Everything is poured in 100% soy wax with cotton wicks and skin-safe colour — no paraffin. Soy burns cleaner, slower and cooler than paraffin, and it holds fragrance beautifully. Choose from our fragrance list or ask for unscented, which is what most people prefer for pooja pieces.',
    group: 'care',
  },
  {
    id: 'faq-burn-time',
    question: 'How long do the candles burn?',
    answer:
      'It depends on the piece. T-lights give 2–3 hours, the mithai candles 4–5, a mini jar 10–12, and a layered jar up to 30. Every product page lists its own burn time. Trimming the wick before each burn will always get you more out of it.',
    group: 'care',
  },
  {
    id: 'faq-moq',
    question: 'What is the minimum for a bulk order?',
    answer:
      'Twenty pieces. That gets you ₹35 per piece on modak and laddu candles, dropping to ₹30 at fifty and above. Below twenty we are happy to make whatever you need at retail prices — there is no minimum for a normal order.',
    group: 'bulk',
  },
  {
    id: 'faq-branding',
    question: 'Can you add our company branding?',
    answer:
      'Yes — printed tags, custom box sleeves, a colour palette matched to your brand, and inserts with your message. Send us your logo and we will show you what it looks like before anything is printed. Allow an extra week for branded packaging.',
    group: 'bulk',
  },
  {
    id: 'faq-samples',
    question: 'Can we see a sample before ordering in bulk?',
    answer:
      'For larger orders, yes. We will make a sample piece in your colours and send it over, charged at retail and adjusted against your final invoice. It is the fastest way to be certain about a shade.',
    group: 'bulk',
  },
];

import { site } from '@/content/site';
import type { Product } from '@/types';

/**
 * WhatsApp is the checkout. Every CTA on the site ends in a wa.me deep link
 * carrying a pre-written message, so the studio receives a qualified enquiry
 * rather than a cold "hi".
 *
 * Pattern: https://wa.me/<number>?text=<url-encoded message>
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const GREETING = 'Hi Sunshine Creations!';

/** Product enquiry — leaves the cursor after "Quantity:" for the customer. */
export function productEnquiryLink(product: Pick<Product, 'name'>): string {
  return whatsappLink(`${GREETING} I'd like to order the ${product.name}. Quantity: `);
}

export function collectionEnquiryLink(collectionName: string): string {
  return whatsappLink(`${GREETING} I'd like to see more from your ${collectionName} range.`);
}

export function occasionEnquiryLink(occasionName: string): string {
  return whatsappLink(`${GREETING} I'm looking for ${occasionName} gifts. Could you share some options?`);
}

export function generalEnquiryLink(): string {
  return whatsappLink(`${GREETING} I'd like to place an order. `);
}

export function bulkQuoteLink(): string {
  return whatsappLink(
    `${GREETING} I'd like a bulk quote.\n\nProduct: \nQuantity: \nRequired by: \nCity: `,
  );
}

export function customOrderLink(): string {
  return whatsappLink(
    `${GREETING} I'd like something customised.\n\nWhat I have in mind: \nColour / fragrance: \nRequired by: `,
  );
}

/** Used by the festive pre-booking form's success state. */
export function preBookingLink(name: string, occasionName: string): string {
  const who = name.trim() ? ` This is ${name.trim()}.` : '';
  return whatsappLink(`${GREETING}${who} I'd like to pre-book for ${occasionName}. `);
}

/** Joins only the lines that have an answer, so messages never look half-filled. */
function compose(greeting: string, lines: Array<[string, string | number | undefined]>): string {
  const filled = lines
    .filter(([, value]) => value !== undefined && String(value).trim() !== '')
    .map(([label, value]) => `${label}: ${value}`);
  return [greeting, '', ...filled].join('\n');
}

/**
 * Product page CTA. The message is rebuilt from the live selections, so the
 * studio receives colour, fragrance and quantity without a single question.
 */
export function productOrderLink(options: {
  name: string;
  colour?: string;
  fragrance?: string;
  quantity?: number;
}): string {
  const { name, colour, fragrance, quantity } = options;
  const parts = [`${GREETING} I'd like to order the ${name}.`];
  if (colour) parts.push(`Colour: ${colour}.`);
  if (fragrance) parts.push(`Fragrance: ${fragrance}.`);
  // With a quantity chosen the sentence closes; without one the message ends
  // on "Quantity: " so the customer can simply type the number.
  parts.push(quantity && quantity > 0 ? `Quantity: ${quantity}.` : 'Quantity: ');
  return whatsappLink(parts.join(' '));
}

/** Fallback for the bulk form's "send this on WhatsApp instead" action. */
export function bulkFormLink(form: {
  name?: string;
  company?: string;
  product?: string;
  quantity?: string;
  requiredBy?: string;
  budget?: string;
}): string {
  return whatsappLink(
    compose(`${GREETING} I'd like a bulk quote.`, [
      ['Name', form.name],
      ['Company', form.company],
      ['Product', form.product],
      ['Quantity', form.quantity],
      ['Required by', form.requiredBy],
      ['Budget', form.budget],
    ]),
  );
}

/** The /customise builder composes every answer into one tidy brief. */
export function customiseLink(selection: {
  craft?: string;
  product?: string;
  colour?: string;
  fragrance?: string;
  quantity?: number;
  personalisation?: string;
  occasion?: string;
  requiredBy?: string;
}): string {
  return whatsappLink(
    compose(`${GREETING} I'd like to customise a gift.`, [
      ['Craft', selection.craft],
      ['Piece', selection.product],
      ['Colour', selection.colour],
      ['Fragrance', selection.fragrance],
      ['Quantity', selection.quantity],
      ['Personalisation', selection.personalisation],
      ['Occasion', selection.occasion],
      ['Required by', selection.requiredBy],
    ]),
  );
}

/** Contact page form fallback. */
export function contactFormLink(form: { name?: string; message?: string }): string {
  return whatsappLink(
    compose(`${GREETING}${form.name ? ` This is ${form.name}.` : ''}`, [['Message', form.message]]),
  );
}

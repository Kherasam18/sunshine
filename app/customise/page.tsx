import type { Metadata } from 'next';
import { Palette, Sparkles, Timer } from 'lucide-react';

import { getCollections, getCraftGroups, getOccasions, getProducts } from '@/lib/content';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { CustomiseBuilder, type CraftOption } from '@/components/customise/CustomiseBuilder';

export const metadata: Metadata = {
  title: 'Customise Your Gift — Any Colour, Any Fragrance',
  description:
    'Build your own handmade gift: choose the craft, the piece, the colour, the fragrance and the quantity. Personalised candles, resin keepsakes and Marathi craft, made to order in Pune.',
  alternates: { canonical: '/customise' },
  openGraph: {
    title: 'Customise Your Gift — Sunshine Creations',
    description: 'Choose the craft, colour, fragrance and quantity. We make the rest.',
    type: 'website',
  },
};

const promises = [
  {
    icon: Palette,
    title: 'Any colour you can name',
    detail: 'Send a hex code, a fabric swatch or a photograph and we will mix to match it.',
  },
  {
    icon: Sparkles,
    title: 'Personalised properly',
    detail: 'Names, dates, photographs set in resin, printed tags — not a sticker on a box.',
  },
  {
    icon: Timer,
    title: 'Made after you ask',
    detail: 'Nothing is pre-made. Allow about 20 days for bulk, a little less for single pieces.',
  },
];

export default async function CustomisePage() {
  const [craftGroups, collections, products, occasions] = await Promise.all([
    getCraftGroups(),
    getCollections(),
    getProducts(),
    getOccasions(),
  ]);

  /** Group the catalogue by craft so the builder can walk craft → piece. */
  const crafts: CraftOption[] = craftGroups.map((group) => {
    const categories = collections
      .filter((collection) => collection.craftGroup === group.id)
      .map((collection) => collection.slug);

    return {
      id: group.id,
      name: group.name,
      tagline: group.tagline,
      products: products.filter((product) => categories.includes(product.category)),
    };
  });

  return (
    <>
      <PageHero
        variant="compact"
        eyebrow="Customise your gift"
        title="Tell us what you have in mind."
        intro="Most of what leaves this studio started as a message describing something that did not exist yet. Walk through the steps and we will build your brief as you go — it takes about a minute."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Customise' }]}
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {promises.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun/15 text-terracotta-deep ring-1 ring-inset ring-sun/30">
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.7} />
              </span>
              <span>
                <span className="block font-display text-base font-semibold leading-tight text-cocoa">
                  {title}
                </span>
                <span className="mt-1 block text-[0.82rem] leading-relaxed text-cocoa-soft">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section tone="cream" spacing="default" rangoli>
        <CustomiseBuilder crafts={crafts} occasions={occasions} />
      </Section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MessageCircle } from 'lucide-react';

import {
  getCollectionBySlug,
  getCollections,
  getOccasions,
  getProductsByCategory,
} from '@/lib/content';
import { collectionEnquiryLink } from '@/lib/whatsapp';
import type { ProductCategory } from '@/types';

import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { CollectionBrowser } from '@/components/collection/CollectionBrowser';

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) return { title: 'Collection not found' };

  const title = `${collection.name} — Handmade in Pune`;
  return {
    title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title,
      description: collection.description,
      type: 'website',
      url: `/collections/${collection.slug}`,
    },
  };
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const [products, occasions, allCollections] = await Promise.all([
    getProductsByCategory(collection.slug as ProductCategory),
    getOccasions(),
    getCollections(),
  ]);

  const others = allCollections.filter((item) => item.slug !== collection.slug);

  return (
    <>
      <PageHero
        eyebrow={collection.tagline}
        title={collection.name}
        intro={collection.intro}
        image={collection.hero}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Collections', href: '/#crafts' },
          { label: collection.name },
        ]}
      >
        <Button
          href={collectionEnquiryLink(collection.name)}
          external
          icon={<MessageCircle className="h-[18px] w-[18px]" />}
        >
          Ask about this range
        </Button>
      </PageHero>

      <Section tone="cream" spacing="default">
        <CollectionBrowser products={products} occasions={occasions} />
      </Section>

      <Section tone="ivory" spacing="default">
        <Divider className="mx-auto max-w-sm" motif="marigold" />
        <h2 className="mt-8 text-center font-display text-display-2 font-bold text-terracotta">
          Keep looking
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[0.95rem] text-cocoa-soft">
          One studio, four crafts — a single order can cover the favours, the keepsake and the
          nameplate.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-5">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between gap-4 rounded-2xl bg-cream p-5 ring-1 ring-gold/25 transition duration-400 hover:-translate-y-1 hover:shadow-warm hover:ring-terracotta/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <span className="font-display text-lg font-semibold leading-tight text-cocoa transition-colors group-hover:text-terracotta-deep">
                  {item.name}
                </span>
                <span className="inline-flex items-center gap-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                  Browse
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

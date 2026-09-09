import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getCareTips,
  getCollectionBySlug,
  getProductBySlug,
  getProducts,
} from '@/lib/content';
import type { Product } from '@/types';

import { Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductIntro } from '@/components/product/ProductIntro';
import { ProductSpecs } from '@/components/product/ProductSpecs';
import { CollapsibleOnMobile } from '@/components/product/ProductDetails';
import { ProductReel } from '@/components/product/ProductReel';
import { RelatedProducts } from '@/components/product/RelatedProducts';

const candleCategories = ['mithai-candles', 'floral-candles', 'decor-candles'];

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };

  const title = `${product.name} — ${product.priceLabel}`;
  return {
    title,
    description: `${product.shortDescription} Handmade to order in Pune, fully customisable in colour and fragrance.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title, description: product.shortDescription, type: 'website' },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const [collection, careTips] = await Promise.all([
    getCollectionBySlug(product.category),
    getCareTips(),
  ]);

  const isCandle = candleCategories.includes(product.category);

  return (
    <>
      <Section tone="cream" spacing="none" className="pb-12 pt-24 sm:pt-32 lg:pt-36">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            ...(collection ? [{ label: collection.name, href: collection.href }] : []),
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />
          <ProductIntro product={product} collection={collection} />
        </div>
      </Section>

      <Section tone="ivory" spacing="default">
        <div className="grid gap-4 md:grid-cols-2 md:gap-12 lg:gap-16">
          <CollapsibleOnMobile title="The details">
            <ProductSpecs product={product} />
          </CollapsibleOnMobile>

          {isCandle ? (
            <CollapsibleOnMobile
              title="Caring for your candle"
              intro="Soy wax rewards a little attention. Four habits will get you every hour it has."
            >
              <Accordion
                items={careTips.map((tip) => ({
                  id: tip.title,
                  question: tip.title,
                  answer: tip.description,
                }))}
              />
            </CollapsibleOnMobile>
          ) : (
            <CollapsibleOnMobile title="Looking after it">
              <p className="max-w-prose text-body-sm leading-relaxed text-cocoa-soft">
                Keep it out of direct sunlight, dust it with a dry, soft cloth, and avoid harsh
                cleaners — resin, clay and painted MDF all prefer to be left dry. Handled kindly,
                these pieces outlast the occasion they were bought for by decades.
              </p>
            </CollapsibleOnMobile>
          )}
        </div>
      </Section>

      {product.reel ? <ProductReel reel={product.reel} productName={product.name} /> : null}

      <RelatedProducts product={product} />

      {/* Clearance for the phone action bar */}
      <div aria-hidden="true" className="pb-action-bar md:hidden" />

      <ProductSchema product={product} />
    </>
  );
}

/** Product schema — the catalogue's route into Google Shopping-style results. */
function ProductSchema({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    category: product.category,
    material: product.materials.join(', '),
    brand: { '@type': 'Brand', name: 'Sunshine Creations' },
    ...(product.price !== null
      ? {
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/MadeToOrder',
            seller: { '@type': 'Organization', name: 'Sunshine Creations' },
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

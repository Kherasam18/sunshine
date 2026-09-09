import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MessageCircle } from 'lucide-react';

import {
  getOccasionBySlug,
  getOccasions,
  getProductsByOccasion,
  getProductsBySlugs,
} from '@/lib/content';
import { occasionEnquiryLink } from '@/lib/whatsapp';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal';

export async function generateStaticParams() {
  const occasions = await getOccasions();
  return occasions.map((occasion) => ({ slug: occasion.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const occasion = await getOccasionBySlug(params.slug);
  if (!occasion) return { title: 'Occasion not found' };

  const title = `${occasion.name} Gifts — Handmade in Pune`;
  return {
    title,
    description: occasion.description,
    alternates: { canonical: `/occasions/${occasion.slug}` },
    openGraph: { title, description: occasion.description, type: 'website' },
  };
}

export default async function OccasionPage({ params }: { params: { slug: string } }) {
  const occasion = await getOccasionBySlug(params.slug);
  if (!occasion) notFound();

  const [picks, allForOccasion, allOccasions] = await Promise.all([
    getProductsBySlugs(occasion.productSlugs),
    getProductsByOccasion(occasion.slug),
    getOccasions(),
  ]);

  const pickSlugs = new Set(picks.map((product) => product.slug));
  const more = allForOccasion.filter((product) => !pickSlugs.has(product.slug));
  const others = allOccasions.filter((item) => item.slug !== occasion.slug);

  return (
    <>
      <PageHero
        eyebrow={`${occasion.season} · ${occasion.tagline}`}
        title={occasion.name}
        intro={occasion.intro}
        image={occasion.hero}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Occasions', href: '/#occasions' },
          { label: occasion.name },
        ]}
      >
        <Button
          href={occasionEnquiryLink(occasion.name)}
          external
          icon={<MessageCircle className="h-[18px] w-[18px]" />}
        >
          Ask what suits your budget
        </Button>
      </PageHero>

      <Section tone="cream" spacing="default" labelledBy="picks-heading">
        <SectionHeading
          id="picks-heading"
          eyebrow="Our picks"
          title={`What people order for ${occasion.name}`}
          intro={occasion.giftNote}
        />

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-7"
          stagger={0.07}
        >
          {picks.map((product, index) => (
            <RevealItem key={product.slug} className="h-full">
              <ProductCard
                product={product}
                priority={index < 4}
                sizes="(max-width: 479px) 92vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, 23vw"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {more.length > 0 ? (
        <Section tone="ivory" spacing="default" labelledBy="more-heading">
          <SectionHeading
            id="more-heading"
            eyebrow="Also suitable"
            title="Everything else that works for this one"
            intro="Any of these can be made in your colours, and most can be tagged and boxed ready to hand over."
          />

          <RevealGroup
            className="mt-12 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-7"
            stagger={0.05}
          >
            {more.map((product) => (
              <RevealItem key={product.slug} className="h-full">
                <ProductCard
                  product={product}
                  sizes="(max-width: 479px) 92vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, 23vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      ) : null}

      <Section tone="cream" spacing="default" labelledBy="other-occasions-heading">
        <Reveal>
          <h2
            id="other-occasions-heading"
            className="text-center font-display text-display-2 font-bold text-terracotta"
          >
            Gifting for something else?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[0.95rem] text-cocoa-soft">
            The catalogue is built around the Indian calendar. Pick the moment and we will show you
            what suits it.
          </p>
        </Reveal>

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ivory px-5 font-sans text-[0.9rem] font-medium text-cocoa ring-1 ring-gold/30 transition duration-300 hover:-translate-y-0.5 hover:text-terracotta-deep hover:shadow-warm hover:ring-terracotta/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                {item.name}
                <Badge tone="outline" className="hidden sm:inline-flex">
                  {item.season}
                </Badge>
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-terracotta transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

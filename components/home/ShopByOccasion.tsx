import Link from 'next/link';
import { getOccasions, getSiteConfig } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BrandImage } from '@/components/ui/BrandImage';
import { Badge } from '@/components/ui/Badge';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * The order of this strip is driven by `site.featuredOccasion`, so the
 * current festival always leads. Change that one value each season.
 */
export async function ShopByOccasion() {
  const [occasions, site] = await Promise.all([getOccasions(), getSiteConfig()]);

  return (
    <Section id="occasions" tone="ivory" spacing="default" labelledBy="occasions-heading">
      <SectionHeading
        id="occasions-heading"
        eyebrow="Built around the Indian calendar"
        title="Shop by Occasion"
        intro="We do not retrofit western candle culture. Every range is made for the thali, the mandir, the urli and the gift table."
      />

      <RevealGroup
        className="no-scrollbar snap-strip -mx-5 mt-12 flex gap-4 overflow-x-auto px-5 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
        stagger={0.06}
      >
        {occasions.map((occasion) => {
          const isFeatured = occasion.slug === site.featuredOccasion;
          return (
            <RevealItem
              key={occasion.slug}
              className="w-[62%] shrink-0 xs:w-[44%] sm:w-[31%] lg:w-auto"
              y={18}
            >
              <Link
                href={occasion.href}
                className="group flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
              >
                <div className="relative">
                  <BrandImage
                    slot={occasion.image}
                    aspect="1:1"
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 16vw"
                    className={cn(
                      'rounded-2xl shadow-warm ring-1 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-lift',
                      isFeatured ? 'ring-2 ring-sun' : 'ring-cocoa/8',
                    )}
                    imageClassName="transition duration-700 ease-out group-hover:scale-105"
                  />
                  {isFeatured ? (
                    <Badge tone="sun" className="absolute left-2.5 top-2.5 bg-sun text-cocoa ring-0 shadow-warm">
                      Now on
                    </Badge>
                  ) : null}
                </div>

                <h3 className="mt-3.5 font-display text-lg font-semibold leading-tight text-cocoa transition-colors group-hover:text-terracotta-deep">
                  {occasion.name}
                </h3>
                <p className="mt-1 font-sans text-eyebrow font-medium uppercase tracking-[0.16em] text-cocoa-soft">
                  {occasion.season}
                </p>
                <p className="mt-2 hidden text-[0.82rem] leading-snug text-cocoa-soft lg:block">
                  {occasion.tagline}
                </p>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <p className="mt-6 text-center font-sans text-[0.78rem] text-cocoa-soft lg:hidden">
        Swipe for every occasion →
      </p>
    </Section>
  );
}

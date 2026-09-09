import type { ReactNode } from 'react';
import type { ImageSlot } from '@/types';
import { cn } from '@/lib/utils';
import { BrandImage } from './BrandImage';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { Marigold } from '@/components/brand/Ornaments';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: ImageSlot;
  crumbs: Crumb[];
  /** Extra content under the intro — CTAs, meta, chips. */
  children?: ReactNode;
  /** `compact` for text-led pages with no photography. */
  variant?: 'image' | 'compact';
}

/**
 * The shared header for every inner page. Sits under the fixed header, so it
 * carries its own top padding and a scrim that keeps the nav legible.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs,
  children,
  variant = 'image',
}: PageHeroProps) {
  const withImage = variant === 'image' && Boolean(image);

  return (
    <section
      aria-labelledby="page-title"
      className={cn(
        'relative isolate overflow-hidden',
        withImage
          ? 'flex min-h-[46svh] items-end bg-cream pb-10 pt-24 sm:min-h-[56svh] sm:pb-16 sm:pt-32 lg:pt-40'
          : 'bg-[linear-gradient(180deg,#FDF1E2_0%,#FDF8F0_100%)] pb-10 pt-24 sm:pb-16 sm:pt-32 lg:pt-40',
      )}
    >
      {withImage && image ? (
        <>
          <div className="absolute inset-0 -z-20">
            <BrandImage slot={image} fill priority showLabel={false} sizes="100vw" imageClassName="object-cover" />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(253,248,240,0.94)_0%,rgba(253,248,240,0.45)_30%,rgba(253,248,240,0.35)_55%,rgba(253,248,240,0.92)_100%)]"
          />
        </>
      ) : (
        <Marigold
          aria-hidden="true"
          className="absolute -right-6 top-24 -z-10 hidden h-48 w-48 text-gold opacity-[0.12] sm:block"
        />
      )}

      <div className="container relative">
        <Breadcrumbs items={crumbs} />

        {eyebrow ? (
          <p className="mt-6 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-terracotta-deep">
            {eyebrow}
          </p>
        ) : null}

        <h1
          id="page-title"
          className="mt-3 max-w-3xl font-display text-display-1 font-bold text-terracotta"
        >
          {title}
        </h1>

        {intro ? (
          <p className="mt-4 max-w-2xl text-body-sm leading-relaxed text-cocoa-soft sm:mt-5 sm:text-base">{intro}</p>
        ) : null}

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

import Image from 'next/image';
import type { ReactNode } from 'react';
import type { AspectRatio, ImageSlot } from '@/types';
import { aspectClass, cn } from '@/lib/utils';
import { LogoMark } from '@/components/brand/LogoMark';
import { Sunburst } from '@/components/brand/Ornaments';

interface BrandImageProps {
  slot: ImageSlot;
  /** Overrides the slot's own ratio for a specific layout. */
  aspect?: AspectRatio;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Placeholder label is hidden on large art-directed slots like the hero. */
  showLabel?: boolean;
  /** Fills the positioned parent instead of holding its own aspect ratio. */
  fill?: boolean;
  /** Rendered above the image — gradients, captions, badges. */
  children?: ReactNode;
}

/**
 * Every photograph on the site goes through this component.
 *
 * With no `src` it renders an on-brand placeholder — warm gradient, sunburst
 * motif, logo mark and the slot label — so unshot sections still look
 * deliberate. Supply `slot.src` and it renders next/image instead: swapping in
 * real photography is a one-line change per slot.
 */
export function BrandImage({
  slot,
  aspect,
  className,
  imageClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  priority = false,
  showLabel = true,
  fill = false,
  children,
}: BrandImageProps) {
  const ratio = aspect ?? slot.aspect;

  return (
    <div
      data-slot={slot.id}
      className={cn(
        'relative isolate overflow-hidden bg-cream',
        fill ? 'h-full w-full' : aspectClass[ratio],
        className,
      )}
    >
      {slot.src ? (
        <>
          {/* Art direction: portrait crop on phones, main shot from md up. */}
          {slot.mobileSrc ? (
            <Image
              src={slot.mobileSrc}
              alt={slot.alt}
              fill
              sizes={sizes}
              priority={priority}
              className={cn('object-cover md:hidden', imageClassName)}
            />
          ) : null}
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            className={cn('object-cover', slot.mobileSrc && 'hidden md:block', imageClassName)}
          />
        </>
      ) : (
        <Placeholder slot={slot} showLabel={showLabel} />
      )}
      {children}
    </div>
  );
}

function Placeholder({ slot, showLabel }: { slot: ImageSlot; showLabel: boolean }) {
  return (
    <div
      role="img"
      aria-label={slot.alt}
      className="absolute inset-0 bg-[linear-gradient(145deg,#FFF6E8_0%,#FCE6C8_48%,#F7CE9A_100%)]"
    >
      {/* Sunburst rays fanning from the lower edge, as on the logo */}
      <Sunburst
        rays={28}
        className="absolute left-1/2 top-[62%] h-[190%] w-[190%] -translate-x-1/2 -translate-y-1/2 text-sun opacity-[0.13]"
      />
      {/* Warm horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgba(244,146,43,0.32),rgba(253,248,240,0)_70%)]" />
      <div className="absolute inset-0 ring-1 ring-inset ring-terracotta/10" />

      {/* Art-directed slots (hero, banners) carry copy of their own, so the
          label stack is suppressed to keep the ground clean. */}
      {showLabel ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <LogoMark className="h-9 w-9 text-terracotta/35" title="" />
          <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
          <span className="max-w-[85%] font-sans text-[0.62rem] font-medium uppercase leading-relaxed tracking-[0.24em] text-terracotta-deep/80">
            {slot.label}
          </span>
        </div>
      ) : null}
    </div>
  );
}

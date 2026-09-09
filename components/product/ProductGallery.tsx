'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ImageSlot } from '@/types';
import { cn } from '@/lib/utils';
import { BrandImage } from '@/components/ui/BrandImage';
import { SnapCarousel } from '@/components/ui/SnapCarousel';

/**
 * Phones get a swipeable snap carousel with dot indicators — thumbnails are a
 * mouse pattern and eat vertical space that the phone does not have. Tablet and
 * up keep the main image plus a thumbnail row.
 */
export function ProductGallery({ images, name }: { images: ImageSlot[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();
  const active = images[activeIndex] ?? images[0];
  const gallery = images.slice(0, 4);

  return (
    <div>
      {/* Phone: swipe */}
      <div className="md:hidden">
        <SnapCarousel label={`Photos of the ${name}`} slideClassName="w-full">
          {gallery.map((image, index) => (
            <BrandImage
              key={image.id}
              slot={image}
              aspect="4:5"
              priority={index === 0}
              sizes="100vw"
              className="rounded-3xl shadow-warm ring-1 ring-cocoa/8"
            />
          ))}
        </SnapCarousel>
      </div>

      {/* Tablet and up: main image + thumbnails */}
      <div className="hidden md:block">
        <motion.div
          key={active.id}
          initial={reduced ? false : { opacity: 0.4, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.21, 0.68, 0.35, 1] }}
        >
          <BrandImage
            slot={active}
            aspect="4:5"
            priority
            sizes="(max-width: 1023px) 100vw, 46vw"
            className="rounded-3xl shadow-warm ring-1 ring-cocoa/8"
          />
        </motion.div>

        {gallery.length > 1 ? (
          <ul className="mt-4 grid grid-cols-4 gap-3" aria-label={`More views of the ${name}`}>
            {gallery.map((image, index) => {
              const selected = index === activeIndex;
              return (
                <li key={image.id}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={selected}
                    className={cn(
                      'block min-h-[44px] w-full overflow-hidden rounded-2xl ring-1 transition duration-300',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
                      selected
                        ? 'ring-2 ring-terracotta'
                        : 'opacity-75 ring-cocoa/10 hover:opacity-100 hover:ring-terracotta/40',
                    )}
                  >
                    <BrandImage slot={image} aspect="1:1" showLabel={false} sizes="12vw" />
                    <span className="sr-only">
                      {selected ? 'Currently showing: ' : 'Show '}
                      {image.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SnapCarouselProps {
  children: ReactNode[];
  label: string;
  /** Tailwind width classes for each slide — controls how much of the next peeks. */
  slideClassName?: string;
  className?: string;
  /** Renders dot indicators below the strip. */
  dots?: boolean;
}

/**
 * Horizontal scroll-snap strip with dot indicators.
 *
 * Native scrolling does the work, so it stays smooth on phones and remains
 * keyboard operable (the strip is focusable and arrow keys scroll it). The
 * dots are real buttons and report position to screen readers.
 */
export function SnapCarousel({
  children,
  label,
  slideClassName = 'w-[78%] xs:w-[46%] sm:w-[38%]',
  className,
  dots = true,
}: SnapCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const baseId = useId();

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const mid = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    slides.forEach((slide, index) => {
      const centre = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(centre - mid);
      if (distance < best) {
        best = distance;
        closest = index;
      }
    });
    setActive(closest);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    const slide = el?.children[index] as HTMLElement | undefined;
    if (!el || !slide) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: slide.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className={className}>
      <ul
        ref={scrollerRef}
        // Focusable so arrow keys can scroll it; announced as a list.
        tabIndex={0}
        aria-label={label}
        className="no-scrollbar snap-strip -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4 focus-visible:ring-offset-cream sm:-mx-6 sm:px-6"
      >
        {children.map((child, index) => (
          <li
            key={index}
            id={`${baseId}-slide-${index}`}
            aria-label={`${index + 1} of ${children.length}`}
            className={cn('shrink-0', slideClassName)}
          >
            {child}
          </li>
        ))}
      </ul>

      {dots ? (
        <div className="mt-5 flex items-center justify-center gap-1" role="tablist" aria-label={`${label} pagination`}>
          {children.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`${baseId}-slide-${index}`}
              aria-label={`Go to item ${index + 1} of ${children.length}`}
              onClick={() => goTo(index)}
              className="group flex h-11 w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'block h-2 rounded-full transition-all duration-300',
                  index === active ? 'w-6 bg-terracotta' : 'w-2 bg-cocoa/25 group-hover:bg-cocoa/45',
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

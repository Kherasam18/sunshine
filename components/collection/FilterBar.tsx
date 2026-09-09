'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { FilterControls, type FilterControlProps } from './FilterControls';

interface FilterBarProps extends Omit<FilterControlProps, 'layout' | 'idPrefix'> {
  reset: () => void;
  activeCount: number;
  resultCount: number;
}

/**
 * Inline filter bar for tablet and desktop. Phones get `FilterSheet` instead —
 * four controls squeezed onto a 375px row is unusable.
 */
export function FilterBar({ reset, activeCount, resultCount, ...controls }: FilterBarProps) {
  return (
    <section
      aria-label="Filter products"
      className="hidden rounded-3xl bg-cream/80 p-4 ring-1 ring-gold/25 md:block md:p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta-deep">
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
          Filter
        </h2>

        <div className="flex items-center gap-4">
          <p aria-live="polite" className="font-sans text-[0.85rem] text-cocoa-soft">
            {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
          </p>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 font-sans text-[0.85rem] font-medium text-terracotta-deep underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <X aria-hidden="true" className="h-3.5 w-3.5" />
              Clear
              <span className="sr-only">all {activeCount} filters</span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        <FilterControls {...controls} layout="inline" idPrefix="filter" />
      </div>
    </section>
  );
}

'use client';

import type { Occasion } from '@/types';
import { cn } from '@/lib/utils';
import { priceBands, type FilterState, type PriceBand } from '@/hooks/useProductFilters';

export interface FilterFacets {
  occasions: Occasion[];
  colours: { name: string; hex: string }[];
  hasCustomisable: boolean;
}

export interface FilterControlProps {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  facets: FilterFacets;
  /** `stacked` fills the bottom sheet; `inline` is the desktop bar. */
  layout?: 'inline' | 'stacked';
  idPrefix?: string;
}

const selectClass =
  'min-h-[48px] w-full appearance-none rounded-full border border-cocoa/15 bg-ivory px-4 pr-9 font-sans text-input text-cocoa transition focus:border-terracotta/50 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-cream';

const chevron =
  "bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%236B5D53' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat";

/** The filter inputs themselves, shared by the desktop bar and the mobile sheet. */
export function FilterControls({
  filters,
  setFilter,
  facets,
  layout = 'inline',
  idPrefix = 'filter',
}: FilterControlProps) {
  const stacked = layout === 'stacked';
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <div className={cn('grid gap-4', stacked ? 'grid-cols-1' : 'gap-3 sm:grid-cols-2 lg:grid-cols-4')}>
      <Group label="Occasion" htmlFor={id('occasion')} stacked={stacked}>
        <select
          id={id('occasion')}
          value={filters.occasion}
          onChange={(event) => setFilter('occasion', event.target.value)}
          className={cn(selectClass, chevron)}
        >
          <option value="all">Any occasion</option>
          {facets.occasions.map((occasion) => (
            <option key={occasion.slug} value={occasion.slug}>
              {occasion.name}
            </option>
          ))}
        </select>
      </Group>

      <Group label="Price range" htmlFor={id('price')} stacked={stacked}>
        <select
          id={id('price')}
          value={filters.priceBand}
          onChange={(event) => setFilter('priceBand', event.target.value as PriceBand)}
          className={cn(selectClass, chevron)}
        >
          {priceBands.map((band) => (
            <option key={band.value} value={band.value}>
              {band.label}
            </option>
          ))}
        </select>
      </Group>

      <Group label="Colour" htmlFor={id('colour')} stacked={stacked}>
        <select
          id={id('colour')}
          value={filters.colour}
          onChange={(event) => setFilter('colour', event.target.value)}
          className={cn(selectClass, chevron)}
        >
          <option value="all">Any colour</option>
          {facets.colours.map((colour) => (
            <option key={colour.name} value={colour.name}>
              {colour.name}
            </option>
          ))}
        </select>
      </Group>

      {facets.hasCustomisable ? (
        <label className="flex min-h-[52px] cursor-pointer items-center gap-3 rounded-full border border-cocoa/15 bg-ivory px-4 font-sans text-input text-cocoa transition hover:border-terracotta/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-terracotta">
          <input
            type="checkbox"
            checked={filters.customisableOnly}
            onChange={(event) => setFilter('customisableOnly', event.target.checked)}
            className="h-5 w-5 rounded border-cocoa/30 accent-terracotta focus:outline-none"
          />
          Customisable only
        </label>
      ) : null}
    </div>
  );
}

function Group({
  label,
  htmlFor,
  stacked,
  children,
}: {
  label: string;
  htmlFor: string;
  stacked: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={htmlFor}
        className={cn(
          'font-sans text-[0.82rem] font-medium text-cocoa',
          stacked ? 'mb-2' : 'sr-only',
        )}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

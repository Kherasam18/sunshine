'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Occasion, Product } from '@/types';

export type PriceBand = 'all' | 'under-100' | '100-500' | '500-plus';

export interface FilterState {
  occasion: string;
  priceBand: PriceBand;
  colour: string;
  customisableOnly: boolean;
}

const initialState: FilterState = {
  occasion: 'all',
  priceBand: 'all',
  colour: 'all',
  customisableOnly: false,
};

export const priceBands: { value: PriceBand; label: string }[] = [
  { value: 'all', label: 'Any price' },
  { value: 'under-100', label: 'Under ₹100' },
  { value: '100-500', label: '₹100 – ₹500' },
  { value: '500-plus', label: '₹500 and above' },
];

function matchesPrice(product: Product, band: PriceBand): boolean {
  if (band === 'all') return true;
  // Quote-on-enquiry pieces have no comparable price, so they sit outside bands.
  if (product.price === null) return false;
  if (band === 'under-100') return product.price < 100;
  if (band === '100-500') return product.price >= 100 && product.price <= 500;
  return product.price > 500;
}

/**
 * Client-side catalogue filtering.
 *
 * Deliberately self-contained: state lives here rather than in the component,
 * so it can later be swapped for URL search params (or a server query) without
 * touching the filter bar or the grid.
 */
export function useProductFilters(products: Product[], occasions: Occasion[]) {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const setFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const reset = useCallback(() => setFilters(initialState), []);

  /** Only offer facets that actually exist in this collection. */
  const facets = useMemo(() => {
    const occasionSlugs = new Set(products.flatMap((product) => product.occasions));
    const colours = new Map<string, string>();
    products.forEach((product) => {
      product.colours.forEach((colour) => colours.set(colour.name, colour.hex));
    });

    return {
      occasions: occasions.filter((occasion) => occasionSlugs.has(occasion.slug)),
      colours: [...colours.entries()].map(([name, hex]) => ({ name, hex })),
      hasCustomisable: products.some((product) => product.customisable),
    };
  }, [products, occasions]);

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        if (filters.occasion !== 'all' && !product.occasions.includes(filters.occasion)) return false;
        if (!matchesPrice(product, filters.priceBand)) return false;
        if (filters.colour !== 'all' && !product.colours.some((c) => c.name === filters.colour)) {
          return false;
        }
        if (filters.customisableOnly && !product.customisable) return false;
        return true;
      }),
    [products, filters],
  );

  const activeCount =
    (filters.occasion !== 'all' ? 1 : 0) +
    (filters.priceBand !== 'all' ? 1 : 0) +
    (filters.colour !== 'all' ? 1 : 0) +
    (filters.customisableOnly ? 1 : 0);

  return { filters, setFilter, reset, filtered, facets, activeCount };
}

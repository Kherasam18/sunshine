'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Occasion, Product } from '@/types';
import { useProductFilters } from '@/hooks/useProductFilters';
import { customOrderLink } from '@/lib/whatsapp';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterBar } from './FilterBar';
import { FilterSheet } from './FilterSheet';

/**
 * Filter bar plus grid. Filtering is client-side over the already-loaded
 * collection — 36 products total, so there is nothing to gain from a round trip.
 */
export function CollectionBrowser({
  products,
  occasions,
}: {
  products: Product[];
  occasions: Occasion[];
}) {
  const { filters, setFilter, reset, filtered, facets, activeCount } = useProductFilters(
    products,
    occasions,
  );
  const reduced = useReducedMotion();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div>
      {/* Phones: sticky trigger + bottom sheet. Tablet and up: inline bar. */}
      <FilterSheet
        open={sheetOpen}
        onOpen={() => setSheetOpen(true)}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        setFilter={setFilter}
        reset={reset}
        activeCount={activeCount}
        resultCount={filtered.length}
        facets={facets}
      />

      <FilterBar
        filters={filters}
        setFilter={setFilter}
        reset={reset}
        activeCount={activeCount}
        resultCount={filtered.length}
        facets={facets}
      />

      {/* Rendered directly rather than through an AnimatePresence swap: gating
          results behind an exit animation means a stalled animation (throttled
          tab, reduced power mode) can leave stale cards on screen. */}
      <div className="mt-2 md:mt-8 lg:mt-10">
        {filtered.length > 0 ? (
          <motion.ul
              key="grid"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-7"
            >
              {filtered.map((product, index) => (
                <motion.li
                  key={product.slug}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.24) }}
                  className="h-full"
                >
                  <ProductCard
                    product={product}
                    priority={index < 4}
                    sizes="(max-width: 479px) 92vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, 23vw"
                  />
                </motion.li>
              ))}
            </motion.ul>
        ) : (
          <motion.div
            key="empty"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState>
              <Button onClick={reset} variant="secondary">
                Clear the filters
              </Button>
              <Button
                href={customOrderLink()}
                external
                icon={<MessageCircle className="h-[18px] w-[18px]" />}
              >
                Ask for something custom
              </Button>
            </EmptyState>
          </motion.div>
        )}
      </div>
    </div>
  );
}

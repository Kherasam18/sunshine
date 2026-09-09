'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { FilterControls, type FilterControlProps } from './FilterControls';

interface FilterSheetProps extends Omit<FilterControlProps, 'layout' | 'idPrefix'> {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
  activeCount: number;
  resultCount: number;
}

/**
 * Phone filtering. A cramped inline filter bar is unusable at 375px, so the
 * controls live in a bottom sheet behind a sticky trigger that shows how many
 * filters are active. Filtering applies live; "Show results" just dismisses.
 */
export function FilterSheet({
  open,
  onOpen,
  onClose,
  reset,
  activeCount,
  resultCount,
  ...controls
}: FilterSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('button, select')?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Trigger — sticks under the header while the grid scrolls */}
      <div className="sticky top-[72px] z-30 -mx-5 mb-6 border-y border-gold/25 bg-cream/95 px-5 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-terracotta/35 bg-ivory px-4 font-sans text-[0.9rem] font-medium text-terracotta-deep transition hover:border-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
            Filters
            {activeCount > 0 ? (
              <span className="ml-0.5 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-sun px-1.5 text-[0.72rem] font-semibold text-cocoa">
                {activeCount}
              </span>
            ) : null}
          </button>

          <p aria-live="polite" className="font-sans text-[0.85rem] text-cocoa-soft">
            {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close filters"
              onClick={onClose}
              className="absolute inset-0 h-full w-full cursor-default bg-cocoa/45 backdrop-blur-sm"
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Filter products"
              initial={reduced ? { opacity: 0 } : { y: '100%' }}
              animate={reduced ? { opacity: 1 } : { y: 0 }}
              exit={reduced ? { opacity: 0 } : { y: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.21, 0.68, 0.35, 1] }}
              className="absolute inset-x-0 bottom-0 flex max-h-[86dvh] flex-col rounded-t-[1.75rem] bg-cream shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-gold/25 px-5 py-4">
                <h2 className="font-display text-xl font-semibold text-terracotta">Filter</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close filters"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cocoa ring-1 ring-cocoa/10 transition hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <FilterControls {...controls} layout="stacked" idPrefix="sheet" />
              </div>

              <div className="flex items-center gap-3 border-t border-gold/25 px-5 pb-[calc(1rem+var(--safe-bottom))] pt-4">
                <button
                  type="button"
                  onClick={reset}
                  disabled={activeCount === 0}
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full border border-cocoa/15 font-sans text-[0.95rem] font-medium text-cocoa-soft transition disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[52px] flex-[2] items-center justify-center rounded-full bg-sun font-sans text-[0.95rem] font-medium text-cocoa shadow-warm transition hover:bg-[#EB851F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                >
                  Show {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

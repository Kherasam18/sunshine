'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronUp, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { customiseLink } from '@/lib/whatsapp';
import type { Selection } from './CustomiseSummary';

/**
 * Phone version of the live brief: a collapsed bar pinned above the home
 * indicator that expands into the full summary. On a 375px screen the desktop
 * side panel would sit a full screen below the controls, where nobody sees it.
 */
export function CustomiseSummaryBar({
  selection,
  progress,
  complete,
  onJumpTo,
}: {
  selection: Selection;
  progress: number;
  complete: boolean;
  onJumpTo: (stepId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const rows: { id: string; label: string; value?: string }[] = [
    { id: 'craft', label: 'Craft', value: selection.craft },
    { id: 'product', label: 'Piece', value: selection.product },
    { id: 'colour', label: 'Colour', value: selection.colour },
    { id: 'fragrance', label: 'Fragrance', value: selection.fragrance },
    { id: 'quantity', label: 'Quantity', value: selection.quantity ? String(selection.quantity) : undefined },
    { id: 'details', label: 'Personalisation', value: selection.personalisation || undefined },
    { id: 'occasion', label: 'Occasion', value: selection.occasion },
    { id: 'date', label: 'Required by', value: selection.requiredBy || undefined },
  ];

  const chosen = rows.filter((row) => row.value).length;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="sheet"
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.21, 0.68, 0.35, 1] }}
            className="max-h-[60dvh] overflow-y-auto border-t border-gold/30 bg-cream px-5 pb-3 pt-4"
          >
            <dl className="space-y-1">
              {rows.map((row) => (
                <div key={row.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onJumpTo(row.id);
                      setOpen(false);
                    }}
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg px-1 text-left transition hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    <dt className="shrink-0 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cocoa-soft">
                      {row.label}
                    </dt>
                    <dd
                      className={cn(
                        'truncate text-right font-sans text-[0.9rem]',
                        row.value ? 'font-medium text-cocoa' : 'text-cocoa-soft/60',
                      )}
                    >
                      {row.value ?? 'Not chosen yet'}
                    </dd>
                  </button>
                </div>
              ))}
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="border-t border-gold/30 bg-ivory/95 pb-[var(--safe-bottom)] backdrop-blur-md shadow-[0_-8px_30px_-12px_rgba(59,48,42,0.35)]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="flex min-h-[48px] min-w-0 flex-1 items-center gap-3 rounded-xl px-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-terracotta-deep">
                Your brief · {chosen}/{rows.length}
              </span>
              <span
                aria-hidden="true"
                className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-cream ring-1 ring-inset ring-cocoa/10"
              >
                <span
                  className="block h-full rounded-full bg-sun transition-[width] duration-500"
                  style={{ width: `${Math.max(4, progress * 100)}%` }}
                />
              </span>
            </span>
            <ChevronUp
              aria-hidden="true"
              className={cn('h-5 w-5 shrink-0 text-cocoa-soft transition-transform', open && 'rotate-180')}
            />
          </button>

          <a
            href={customiseLink(selection)}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!complete}
            className={cn(
              'inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-sun px-5 font-sans text-[0.95rem] font-medium text-cocoa shadow-warm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2',
              complete ? 'hover:bg-[#EB851F]' : 'pointer-events-none opacity-50',
            )}
          >
            <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
            Send
          </a>
        </div>
      </div>
    </div>
  );
}

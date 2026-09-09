'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Disclosure list used for the FAQ and the candle care panel. Native buttons
 * with aria-expanded/aria-controls, so it is fully keyboard operable.
 */
export function Accordion({
  items,
  defaultOpenId,
  className,
}: {
  items: AccordionItem[];
  /** Opens one item on load — usually the first. */
  defaultOpenId?: string;
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-gold/25 border-y border-gold/25', className)}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <span className="font-display text-lg font-semibold leading-snug text-cocoa sm:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 transition duration-300',
                    open
                      ? 'rotate-45 bg-sun/20 text-terracotta-deep ring-sun/40'
                      : 'bg-ivory text-cocoa-soft ring-cocoa/12',
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  key="panel"
                  initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.21, 0.68, 0.35, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-6 pr-10 text-body-sm leading-relaxed text-cocoa-soft">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Specs and care panels. Collapsed behind a disclosure on phones so the page
 * gets to the reel and the cross-sell quickly; always open from `md` up.
 */
export function CollapsibleOnMobile({
  title,
  intro,
  children,
  defaultOpen = false,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-gold/25 md:border-0">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex min-h-[56px] w-full items-center justify-between gap-4 text-left font-display text-display-3 font-semibold text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 md:pointer-events-none md:min-h-0 md:cursor-default"
        >
          {title}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-5 w-5 shrink-0 text-cocoa-soft transition-transform duration-300 md:hidden',
              open && 'rotate-180',
            )}
          />
        </button>
      </h2>

      <div className={cn('pb-5 md:!block md:pb-0', open ? 'block' : 'hidden')}>
        {intro ? (
          <p className="mb-4 max-w-prose text-body-sm leading-relaxed text-cocoa-soft md:mt-3">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

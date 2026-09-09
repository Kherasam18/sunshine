'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Footer link column. Collapsed behind a disclosure on phones — six expanded
 * columns made the footer over 1,200px tall — and always open from `md` up,
 * where there is room for them side by side.
 */
export function FooterNavColumn({ title, items }: { title: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-cream/12 md:border-0">
      {/* Phone: a real disclosure button. Desktop: a plain heading. */}
      <h2>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-[52px] w-full items-center justify-between gap-3 text-left font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-[#332821] md:pointer-events-none md:min-h-0 md:cursor-default md:pb-0"
        >
          {title}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 text-cream/50 transition-transform duration-300 md:hidden',
              open && 'rotate-180',
            )}
          />
        </button>
      </h2>

      <nav
        id={panelId}
        aria-label={title}
        className={cn('overflow-hidden md:!block md:h-auto', open ? 'block' : 'hidden')}
      >
        <ul className="space-y-1 pb-3 md:mt-5 md:space-y-3 md:pb-0">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex min-h-[44px] items-center rounded-sm text-[0.95rem] text-cream/75 transition hover:text-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-[#332821] lg:min-h-[36px] lg:text-sm"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  label: string;
  href?: string;
}

/** Compact trail. The last item is the current page and is not a link. */
export function Breadcrumbs({ items, tone = 'default' }: { items: Crumb[]; tone?: 'default' | 'deep' }) {
  const deep = tone === 'deep';

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-sans text-[0.72rem] font-medium">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta lg:min-h-0 lg:min-w-0 lg:justify-start lg:px-0',
                    deep ? 'text-cream/75 hover:text-cream' : 'text-cocoa-soft hover:text-terracotta-deep',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={cn('flex min-h-[44px] items-center lg:min-h-0', deep ? 'text-cream' : 'text-terracotta-deep')}
                >
                  {item.label}
                </span>
              )}
              {!last ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn('h-3 w-3 shrink-0', deep ? 'text-cream/40' : 'text-cocoa-soft/50')}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

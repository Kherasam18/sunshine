'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const EVENT = 'sticky-action-bar-change';
const FLAG = 'stickyActionBar';

/**
 * Fixed bottom action bar for phones (hidden from `md` up).
 *
 * While mounted it flags the document so `WhatsAppFloat` stands down — two
 * floating WhatsApp affordances stacked on top of each other looks broken.
 */
export function StickyActionBar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    const count = Number(document.body.dataset[FLAG] ?? '0') + 1;
    document.body.dataset[FLAG] = String(count);
    window.dispatchEvent(new CustomEvent(EVENT));

    return () => {
      const next = Number(document.body.dataset[FLAG] ?? '1') - 1;
      if (next <= 0) delete document.body.dataset[FLAG];
      else document.body.dataset[FLAG] = String(next);
      window.dispatchEvent(new CustomEvent(EVENT));
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-ivory/95 backdrop-blur-md md:hidden',
        'pb-[var(--safe-bottom)] shadow-[0_-8px_30px_-12px_rgba(59,48,42,0.35)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">{children}</div>
    </div>
  );
}

/** True while any StickyActionBar is mounted on the page. */
export function useHasStickyActionBar(): boolean {
  const [present, setPresent] = useState(false);

  useEffect(() => {
    const read = () => setPresent(Boolean(document.body.dataset[FLAG]));
    read();
    window.addEventListener(EVENT, read);
    return () => window.removeEventListener(EVENT, read);
  }, []);

  return present;
}

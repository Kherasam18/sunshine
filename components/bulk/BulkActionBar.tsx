'use client';

import { MessageCircle } from 'lucide-react';
import { bulkQuoteLink } from '@/lib/whatsapp';
import { StickyActionBar } from '@/components/ui/StickyActionBar';

/**
 * Phone action bar for the bulk page. Replaces the WhatsApp float so there is
 * exactly one persistent conversion affordance on screen.
 */
export function BulkActionBar() {
  return (
    <StickyActionBar>
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg font-semibold leading-none text-terracotta-deep">
          From ₹30<span className="text-[0.8rem] font-normal text-cocoa-soft"> / piece</span>
        </p>
        <p className="mt-1 truncate text-[0.72rem] text-cocoa-soft">MOQ 20 pieces</p>
      </div>

      <a
        href={bulkQuoteLink()}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-sun px-4 font-sans text-[0.92rem] font-medium text-cocoa shadow-warm transition hover:bg-[#EB851F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
      >
        <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
        Get a quote
      </a>
    </StickyActionBar>
  );
}

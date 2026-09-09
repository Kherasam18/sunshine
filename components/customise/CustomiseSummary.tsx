'use client';

import { MessageCircle, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { customiseLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/brand/LogoMark';

export interface Selection {
  craft?: string;
  product?: string;
  colour?: string;
  colourHex?: string;
  fragrance?: string;
  quantity: number;
  personalisation: string;
  occasion?: string;
  requiredBy: string;
}

/** Live brief. Fills in as the visitor chooses, and doubles as navigation. */
export function CustomiseSummary({
  selection,
  onJumpTo,
  complete,
  progress,
}: {
  selection: Selection;
  onJumpTo: (stepId: string) => void;
  complete: boolean;
  progress: number;
}) {
  const rows: { id: string; label: string; value?: string; swatch?: string }[] = [
    { id: 'craft', label: 'Craft', value: selection.craft },
    { id: 'product', label: 'Piece', value: selection.product },
    { id: 'colour', label: 'Colour', value: selection.colour, swatch: selection.colourHex },
    { id: 'fragrance', label: 'Fragrance', value: selection.fragrance },
    { id: 'quantity', label: 'Quantity', value: selection.quantity ? `${selection.quantity}` : undefined },
    { id: 'details', label: 'Personalisation', value: selection.personalisation || undefined },
    { id: 'occasion', label: 'Occasion', value: selection.occasion },
    { id: 'date', label: 'Required by', value: selection.requiredBy || undefined },
  ];

  return (
    <aside
      aria-label="Your brief so far"
      className="rounded-3xl bg-ivory p-6 shadow-warm ring-1 ring-gold/30"
    >
      <div className="flex items-center gap-3">
        <LogoMark className="h-8 w-8 text-terracotta/50" title="" />
        <h2 className="font-display text-xl font-semibold text-terracotta">Your brief</h2>
      </div>

      <div className="mt-4">
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Brief completeness"
          className="h-1.5 w-full overflow-hidden rounded-full bg-cream ring-1 ring-inset ring-cocoa/10"
        >
          <div
            className="h-full rounded-full bg-sun transition-[width] duration-500 ease-out"
            style={{ width: `${Math.max(4, progress * 100)}%` }}
          />
        </div>
      </div>

      <dl className="mt-5 space-y-1">
        {rows.map((row) => (
          <div key={row.id}>
            <button
              type="button"
              onClick={() => onJumpTo(row.id)}
              className="group flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <dt className="shrink-0 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cocoa-soft">
                {row.label}
              </dt>
              <dd className="flex min-w-0 items-center gap-2 text-right">
                {row.swatch && row.value ? (
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: row.swatch }}
                    className="h-3 w-3 shrink-0 rounded-full ring-1 ring-inset ring-cocoa/20"
                  />
                ) : null}
                <span
                  className={cn(
                    'truncate font-sans text-[0.85rem]',
                    row.value ? 'font-medium text-cocoa' : 'text-cocoa-soft/60',
                  )}
                >
                  {row.value ?? 'Not chosen yet'}
                </span>
                <Pencil
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 text-cocoa-soft/0 transition group-hover:text-cocoa-soft"
                />
                <span className="sr-only">Edit {row.label}</span>
              </dd>
            </button>
          </div>
        ))}
      </dl>

      <Button
        href={customiseLink(selection)}
        external
        size="lg"
        className={cn('mt-6 w-full', !complete && 'pointer-events-none opacity-50')}
        aria-disabled={!complete}
        icon={<MessageCircle className="h-[18px] w-[18px]" />}
      >
        Send my brief
      </Button>

      <p className="mt-3 text-center text-[0.76rem] leading-relaxed text-cocoa-soft">
        {complete
          ? 'Opens WhatsApp with everything above already written out.'
          : 'Choose a craft and a piece to send your brief.'}
      </p>
    </aside>
  );
}

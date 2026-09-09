'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Option {
  value: string;
  label: string;
  description?: string;
  hex?: string;
}

/** Selectable cards used for craft, piece, occasion and quantity choices. */
export function OptionGrid({
  options,
  value,
  onSelect,
  columns = 2,
  name,
}: {
  options: Option[];
  value?: string;
  onSelect: (option: Option) => void;
  columns?: 1 | 2 | 3;
  name: string;
}) {
  const gridClass =
    columns === 1 ? 'grid-cols-1' : columns === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div role="radiogroup" aria-label={name} className={cn('grid gap-3', gridClass)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(option)}
            className={cn(
              'group relative flex items-start gap-3 rounded-2xl p-4 text-left transition duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
              selected
                ? 'bg-sun/15 ring-2 ring-sun'
                : 'bg-ivory ring-1 ring-cocoa/10 hover:-translate-y-0.5 hover:shadow-warm hover:ring-terracotta/30',
            )}
          >
            {option.hex ? (
              <span
                aria-hidden="true"
                style={{ backgroundColor: option.hex }}
                className="mt-0.5 h-6 w-6 shrink-0 rounded-full ring-1 ring-inset ring-cocoa/20"
              />
            ) : null}

            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-semibold leading-snug text-cocoa">
                {option.label}
              </span>
              {option.description ? (
                <span className="mt-1 block text-[0.84rem] leading-relaxed text-cocoa-soft">
                  {option.description}
                </span>
              ) : null}
            </span>

            <span
              aria-hidden="true"
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition',
                selected ? 'bg-sun text-cocoa' : 'ring-1 ring-cocoa/20',
              )}
            >
              {selected ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Compact chip variant for fragrance and quantity presets. */
export function OptionChips({
  options,
  value,
  onSelect,
  name,
}: {
  options: Option[];
  value?: string;
  onSelect: (option: Option) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(option)}
            className={cn(
              'rounded-full px-5 py-2.5 font-sans text-[0.88rem] transition duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
              selected
                ? 'bg-sun/20 font-medium text-terracotta-deep ring-2 ring-sun'
                : 'bg-ivory text-cocoa-soft ring-1 ring-cocoa/12 hover:text-cocoa hover:ring-terracotta/40',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

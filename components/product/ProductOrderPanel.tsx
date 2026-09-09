'use client';

import { useMemo, useState } from 'react';
import { Check, Minus, MessageCircle, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { productOrderLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { StickyActionBar } from '@/components/ui/StickyActionBar';

/**
 * Colour, fragrance and quantity selectors. Everything chosen here is written
 * straight into the WhatsApp message, so the studio never has to ask.
 */
export function ProductOrderPanel({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0]?.name ?? '');
  const [fragrance, setFragrance] = useState(product.fragrances[0] ?? '');
  const [quantity, setQuantity] = useState(1);

  /** Applies the best bulk tier the current quantity qualifies for. */
  const pricing = useMemo(() => {
    if (product.price === null) return null;
    const tier = [...(product.bulkTiers ?? [])]
      .sort((a, b) => b.moq - a.moq)
      .find((candidate) => quantity >= candidate.moq);
    const unit = tier ? tier.pricePerUnit : product.price;
    return { unit, total: unit * quantity, tier };
  }, [product, quantity]);

  const href = productOrderLink({
    name: product.name,
    colour: colour || undefined,
    fragrance: fragrance || undefined,
    quantity,
  });

  return (
    <>
    <div className="rounded-3xl bg-ivory p-6 shadow-warm ring-1 ring-gold/25 sm:p-7">
      {product.colours.length > 0 ? (
        <fieldset>
          <legend className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta-deep">
            Colour
            <span className="ml-2 font-normal normal-case tracking-normal text-cocoa-soft">{colour}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.colours.map((option) => {
              const selected = option.name === colour;
              return (
                <label
                  key={option.name}
                  className={cn(
                    'relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ring-1 transition duration-300',
                    'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-terracotta has-[:focus-visible]:ring-offset-2',
                    selected ? 'ring-2 ring-terracotta ring-offset-2 ring-offset-ivory' : 'ring-cocoa/20 hover:ring-terracotta/50',
                  )}
                  style={{ backgroundColor: option.hex }}
                  title={option.name}
                >
                  <input
                    type="radio"
                    name="colour"
                    value={option.name}
                    checked={selected}
                    onChange={() => setColour(option.name)}
                    className="sr-only"
                  />
                  {selected ? <Check aria-hidden="true" className="h-5 w-5 text-cocoa drop-shadow" strokeWidth={3} /> : null}
                  <span className="sr-only">{option.name}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {product.fragrances.length > 0 ? (
        <fieldset className="mt-7">
          <legend className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta-deep">
            Fragrance
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.fragrances.map((option) => {
              const selected = option === fragrance;
              return (
                <label
                  key={option}
                  className={cn(
                    'flex min-h-[44px] cursor-pointer items-center rounded-full px-4 font-sans text-[0.88rem] ring-1 transition duration-300',
                    'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-terracotta',
                    selected
                      ? 'bg-sun/20 text-terracotta-deep ring-sun/50'
                      : 'bg-cream text-cocoa-soft ring-cocoa/12 hover:ring-terracotta/40',
                  )}
                >
                  <input
                    type="radio"
                    name="fragrance"
                    value={option}
                    checked={selected}
                    onChange={() => setFragrance(option)}
                    className="sr-only"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <label
            htmlFor="quantity"
            className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta-deep"
          >
            Quantity
          </label>
          <div className="mt-3 flex items-center gap-1 rounded-full bg-cream p-1 ring-1 ring-cocoa/12">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa transition hover:bg-ivory hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <Minus aria-hidden="true" className="h-4 w-4" />
            </button>
            <input
              id="quantity"
              type="number"
              inputMode="numeric"
              min={1}
              max={9999}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              className="h-11 w-14 border-0 bg-transparent text-center font-sans text-input font-semibold text-cocoa focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(9999, q + 1))}
              aria-label="Increase quantity"
              className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa transition hover:bg-ivory hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {pricing ? (
          <div className="text-right" aria-live="polite">
            <p className="font-display text-3xl font-bold leading-none text-terracotta-deep">
              {formatPrice(pricing.total)}
            </p>
            <p className="mt-1.5 text-[0.78rem] text-cocoa-soft">
              {formatPrice(pricing.unit)} per piece
              {pricing.tier ? ` · ${pricing.tier.label} rate applied` : ''}
            </p>
          </div>
        ) : (
          <p className="text-right font-display text-xl font-semibold text-terracotta-deep">
            Quoted on enquiry
          </p>
        )}
      </div>

      {product.bulkTiers?.length && !pricing?.tier ? (
        <p className="mt-4 rounded-2xl bg-sun/10 px-4 py-3 text-[0.8rem] leading-relaxed text-cocoa">
          Order {product.bulkTiers[0].moq} or more and the price drops to{' '}
          {formatPrice(product.bulkTiers[0].pricePerUnit)} a piece.
        </p>
      ) : null}

      <Button
        href={href}
        external
        size="lg"
        className="mt-6 w-full"
        icon={<MessageCircle className="h-[18px] w-[18px]" />}
      >
        Order on WhatsApp
      </Button>

      <p className="mt-3 text-center text-[0.8rem] leading-relaxed text-cocoa-soft">
        Your selections travel with the message — no forms, no back and forth.
      </p>
    </div>

    {/*
      Phone action bar. Rendered from inside the panel so it always reflects
      the current colour, fragrance and quantity; `StickyActionBar` is fixed,
      so its position in the tree does not matter.
    */}
    <StickyActionBar>
      <div className="min-w-0 flex-1">
        {pricing ? (
          <>
            <p className="font-display text-xl font-bold leading-none text-terracotta-deep">
              {formatPrice(pricing.total)}
            </p>
            <p className="mt-1 truncate text-[0.72rem] text-cocoa-soft">
              {quantity} × {formatPrice(pricing.unit)}
              {pricing.tier ? ' · bulk rate' : ''}
            </p>
          </>
        ) : (
          <p className="font-display text-lg font-semibold leading-tight text-terracotta-deep">
            Quoted on enquiry
          </p>
        )}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-sun px-4 font-sans text-[0.92rem] font-medium text-cocoa shadow-warm transition hover:bg-[#EB851F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
      >
        <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
        Order
        <span className="sr-only">the {product.name} on WhatsApp</span>
      </a>
    </StickyActionBar>
    </>
  );
}

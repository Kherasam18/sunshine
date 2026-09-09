import Link from 'next/link';
import { Clock3 } from 'lucide-react';
import type { Collection, Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ProductTierTable } from '@/components/ui/TierTable';
import { ProductOrderPanel } from './ProductOrderPanel';

/** The right-hand column of the product page: pitch, selectors, tiers, promise. */
export function ProductIntro({
  product,
  collection,
}: {
  product: Product;
  collection?: Collection;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {collection ? (
          <Link
            href={collection.href}
            className="flex min-h-[44px] items-center rounded-sm font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-terracotta-deep underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta lg:min-h-0"
          >
            {collection.name}
          </Link>
        ) : null}
        {product.badges?.map((badge) => (
          <Badge key={badge} tone={badge === 'Bestseller' ? 'sun' : 'outline'}>
            {badge}
          </Badge>
        ))}
      </div>

      <h1 className="mt-3 font-display text-display-1 font-bold text-terracotta">
        {product.name}
      </h1>

      <p className="mt-4 font-display text-display-4 italic leading-snug text-cocoa">
        {product.shortDescription}
      </p>

      <p className="mt-5 max-w-prose text-[0.97rem] leading-relaxed text-cocoa-soft">
        {product.longDescription}
      </p>

      <p className="mt-6 font-display text-2xl font-semibold text-terracotta-deep">
        {product.priceLabel}
        {product.boxOption ? (
          <span className="ml-3 font-sans text-[0.82rem] font-normal text-cocoa-soft">
            {product.boxOption.label} · ₹{product.boxOption.price}
          </span>
        ) : null}
      </p>

      <div className="mt-8">
        <ProductOrderPanel product={product} />
      </div>

      {product.bulkTiers?.length ? (
        <div className="mt-8">
          <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta-deep">
            Bulk pricing
          </h2>
          <ProductTierTable
            tiers={product.bulkTiers}
            retailPrice={product.price}
            className="mt-3"
          />
        </div>
      ) : null}

      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-dashed border-terracotta/30 bg-sun/8 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun/20 text-terracotta-deep ring-1 ring-inset ring-sun/40">
          <Clock3 aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <p className="text-[0.9rem] leading-relaxed text-cocoa">
          <strong className="font-semibold">Handmade to order.</strong>{' '}
          <span className="text-cocoa-soft">
            Please place bulk orders at least {product.leadTimeDays} days in advance, so each piece
            gets the time it deserves.
          </span>
        </p>
      </div>
    </div>
  );
}

import type { BulkTier, WholesaleTier } from '@/types';
import { cn, formatPrice } from '@/lib/utils';

const headCell =
  'pb-3 pr-3 font-sans text-eyebrow font-semibold uppercase tracking-[0.16em] text-cocoa-soft';

/**
 * Wholesale ladder.
 *
 * Below `sm` this renders as stacked cards rather than a table — a
 * horizontally scrolling table is the single worst pattern on a phone, and
 * these rows are short enough to read as label/value pairs.
 */
export function WholesaleTable({ tiers, className }: { tiers: WholesaleTier[]; className?: string }) {
  return (
    <div className={className}>
      {/* Phone: one card per tier */}
      <ul className="space-y-3 sm:hidden">
        {tiers.map((tier) => (
          <li
            key={tier.quantity}
            className="rounded-2xl bg-ivory/90 p-4 ring-1 ring-gold/30"
          >
            <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cocoa-soft">
              {tier.quantity}
            </p>
            <p className="mt-1.5 font-display text-display-3 font-semibold text-terracotta-deep">
              {tier.pricePerUnit}
            </p>
            <p className="mt-1 text-[0.85rem] leading-snug text-cocoa-soft">{tier.bestFor}</p>
          </li>
        ))}
      </ul>

      {/* Tablet and up: the full table */}
      <table className="hidden w-full border-collapse text-left text-sm sm:table">
        <caption className="sr-only">Wholesale pricing tiers by order quantity</caption>
        <thead>
          <tr className="border-b border-gold/40">
            <th scope="col" className={headCell}>Quantity</th>
            <th scope="col" className={headCell}>Price</th>
            <th scope="col" className={headCell}>Best for</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.quantity} className="border-b border-gold/20 last:border-0">
              <th scope="row" className="py-3.5 pr-3 font-sans text-[0.88rem] font-medium text-cocoa">
                {tier.quantity}
              </th>
              <td className="py-3.5 pr-3 font-display text-lg font-semibold text-terracotta-deep">
                {tier.pricePerUnit}
              </td>
              <td className="py-3.5 text-[0.85rem] text-cocoa-soft">{tier.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Per-product tiers. Two short columns, so it stays a table but never scrolls. */
export function ProductTierTable({
  tiers,
  retailPrice,
  className,
}: {
  tiers: BulkTier[];
  retailPrice: number | null;
  className?: string;
}) {
  const rows = [
    ...(retailPrice !== null
      ? [{ label: `1 – ${tiers[0] ? tiers[0].moq - 1 : 19} pieces`, price: formatPrice(retailPrice), muted: true }]
      : []),
    ...tiers.map((tier) => ({ label: tier.label, price: formatPrice(tier.pricePerUnit), muted: false })),
  ];

  return (
    <div className={cn('overflow-hidden rounded-2xl bg-cream ring-1 ring-gold/30', className)}>
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <caption className="sr-only">Bulk pricing for this product</caption>
        <thead>
          <tr className="border-b border-gold/30 bg-sun/8">
            <th scope="col" className={cn(headCell, 'w-3/5 px-4 pt-3')}>Order size</th>
            <th scope="col" className={cn(headCell, 'px-4 pt-3')}>Per piece</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-gold/20 last:border-0">
              <th scope="row" className="px-4 py-3 font-sans text-[0.85rem] font-medium text-cocoa">
                {row.label}
              </th>
              <td
                className={cn(
                  'px-4 py-3 font-display text-lg font-semibold',
                  row.muted ? 'text-cocoa' : 'text-terracotta-deep',
                )}
              >
                {row.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

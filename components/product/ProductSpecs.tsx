import { Clock3, Flame, Package, Ruler, Sparkles } from 'lucide-react';
import type { Product } from '@/types';

/** Specs block: wax, size, burn time, box contents. Only renders what exists. */
export function ProductSpecs({ product }: { product: Product }) {
  const rows = [
    { icon: Flame, label: 'Materials', value: product.materials.join(' · ') },
    { icon: Clock3, label: 'Burn time', value: product.burnTime },
    { icon: Ruler, label: 'Size', value: product.dimensions },
    { icon: Package, label: 'In the box', value: product.boxContents ?? boxSummary(product) },
    {
      icon: Sparkles,
      label: 'Fragrance options',
      value: product.fragrances.length ? product.fragrances.join(' · ') : undefined,
    },
  ].filter((row): row is { icon: typeof Flame; label: string; value: string } => Boolean(row.value));

  if (rows.length === 0) return null;

  return (
    <div>
      <dl className="divide-y divide-gold/25 border-y border-gold/25">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
            <dt className="flex min-w-[11rem] items-center gap-2.5 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-cocoa-soft">
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.7} />
              {label}
            </dt>
            <dd className="text-body-sm leading-relaxed text-cocoa">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function boxSummary(product: Product): string | undefined {
  if (product.boxOption) {
    return `${product.boxOption.label} — ${product.boxOption.pieces} pieces, wrapped and tied by hand`;
  }
  return undefined;
}

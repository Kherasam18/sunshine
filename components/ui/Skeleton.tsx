import { cn } from '@/lib/utils';

/** Warm shimmer block — cream-toned, never grey. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse rounded-lg bg-[linear-gradient(100deg,#F7EADA_0%,#FBF2E7_50%,#F7EADA_100%)]',
        className,
      )}
    />
  );
}

/** Matches ProductCard's geometry so nothing shifts when the real card lands. */
export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-ivory ring-1 ring-cocoa/8 shadow-warm">
      <Skeleton className="aspect-[4/5] rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-3 h-3.5 w-full" />
        <Skeleton className="mt-2 h-3.5 w-5/6" />
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-3.5 w-3.5 rounded-full" />
          ))}
        </div>
        <div className="mt-5 border-t border-gold/25 pt-4">
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="mt-4 h-11 w-full rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading products"
      className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-7"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading products…</span>
    </div>
  );
}

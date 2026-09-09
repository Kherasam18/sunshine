import { Section } from '@/components/ui/Section';
import { Skeleton, ProductGridSkeleton } from '@/components/ui/Skeleton';

/** Matches the collection page's geometry so the swap causes no layout shift. */
export default function CollectionLoading() {
  return (
    <>
      <section className="relative isolate flex min-h-[52svh] items-end overflow-hidden bg-[linear-gradient(180deg,#FDF1E2_0%,#FDF8F0_100%)] pb-12 pt-32 sm:min-h-[56svh] sm:pb-16 lg:pt-40">
        <div className="container">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="mt-6 h-3 w-40" />
          <Skeleton className="mt-4 h-12 w-full max-w-md sm:h-16" />
          <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-4 w-4/5 max-w-xl" />
          <Skeleton className="mt-8 h-12 w-52 rounded-full" />
        </div>
      </section>

      <Section tone="cream" spacing="default">
        <div className="rounded-3xl bg-cream/80 p-4 ring-1 ring-gold/25 sm:p-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-11 rounded-full" />
            ))}
          </div>
        </div>

        <div className="mt-8 lg:mt-10">
          <ProductGridSkeleton count={8} />
        </div>
      </Section>
    </>
  );
}

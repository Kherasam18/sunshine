import type { ReactNode } from 'react';
import { Sunburst } from '@/components/brand/Ornaments';
import { LogoMark } from '@/components/brand/LogoMark';

/**
 * On-brand empty result. Warm rather than apologetic — it should feel like
 * part of the shop, not an error page.
 */
export function EmptyState({
  title = 'Nothing matches that combination — yet.',
  description = 'Almost everything we make can be poured in a different colour or fragrance. Tell us what you had in mind and we will make it.',
  children,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-ivory px-6 py-16 text-center ring-1 ring-gold/25 sm:px-10 sm:py-20">
      <Sunburst
        rays={26}
        className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 text-sun opacity-[0.08]"
      />

      <LogoMark className="mx-auto h-12 w-12 text-terracotta/40" title="" />
      <span aria-hidden="true" className="mx-auto mt-5 block h-px w-12 bg-gold/60" />

      <h2 className="mt-6 font-display text-display-3 font-semibold text-terracotta">{title}</h2>
      <p className="mx-auto mt-4 max-w-md text-body-sm leading-relaxed text-cocoa-soft">{description}</p>

      {children ? <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </div>
  );
}

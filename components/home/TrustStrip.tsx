import { Boxes, HandHeart, Leaf, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getTrustPoints } from '@/lib/content';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

const icons: Record<string, LucideIcon> = {
  leaf: Leaf,
  hand: HandHeart,
  palette: Palette,
  boxes: Boxes,
};

/** Four promises, one line, thin gold rules above and below. */
export async function TrustStrip() {
  const points = await getTrustPoints();

  return (
    <section aria-label="Why order from Sunshine Creations" className="bg-cream">
      <div className="container">
        <div aria-hidden="true" className="h-px w-full bg-gold-rule opacity-70" />

        <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-7 py-7 sm:gap-x-6 sm:py-11 lg:grid-cols-4">
          {points.map((point) => {
            const Icon = icons[point.icon] ?? Leaf;
            return (
              <RevealItem key={point.label} y={16}>
                <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:gap-4 lg:text-left">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun/15 text-terracotta-deep ring-1 ring-inset ring-sun/30 sm:h-12 sm:w-12">
                    <Icon aria-hidden="true" className="h-[19px] w-[19px] sm:h-[22px] sm:w-[22px]" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-balance font-display text-[0.95rem] font-semibold leading-tight text-cocoa sm:text-lg">
                      {point.label}
                    </span>
                    <span className="mt-1 block text-balance text-[0.75rem] leading-snug text-cocoa-soft">
                      {point.detail}
                    </span>
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div aria-hidden="true" className="h-px w-full bg-gold-rule opacity-70" />
      </div>
    </section>
  );
}

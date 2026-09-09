import { Hand, Sparkles, Timer } from 'lucide-react';
import type { VideoSlot } from '@/types';
import { BrandVideo } from '@/components/ui/BrandVideo';
import { Reveal } from '@/components/ui/Reveal';
import { RangoliCorner } from '@/components/brand/Ornaments';

const points = [
  {
    icon: Hand,
    title: 'Made by one pair of hands',
    detail: 'No production line. The person who pours it is the person who packs it.',
  },
  {
    icon: Sparkles,
    title: 'Finished piece by piece',
    detail: 'Silver varq laid on with a fingertip, petals shaped, every edge cleaned by hand.',
  },
  {
    icon: Timer,
    title: 'Started only once you order',
    detail: 'Nothing sits ready on a shelf — which is exactly why it takes the time it does.',
  },
];

/**
 * The making-of reel. For handmade goods, watching it being made is the single
 * strongest trust signal there is — so it gets a full band, not a footnote.
 */
export function ProductReel({ reel, productName }: { reel: VideoSlot; productName: string }) {
  return (
    <section
      aria-labelledby="reel-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FDF8F0_0%,#FBEEDD_55%,#FDF8F0_100%)] py-16 sm:py-20"
    >
      <RangoliCorner className="absolute -left-8 top-8 -z-10 h-52 w-52 text-gold opacity-[0.12]" />
      <RangoliCorner className="absolute -right-8 bottom-8 -z-10 h-52 w-52 rotate-180 text-gold opacity-[0.12]" />

      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-[min(86vw,340px)] lg:max-w-none">
            <BrandVideo slot={reel} className="shadow-lift ring-1 ring-gold/30" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-sans text-eyebrow font-semibold uppercase text-terracotta-deep">
              Watch it being made
            </p>
            <h2
              id="reel-heading"
              className="mt-3 font-display text-display-2 font-bold text-terracotta"
            >
              This is your {productName}, before it was yours.
            </h2>
            <p className="mt-4 max-w-lg text-body-sm leading-relaxed text-cocoa-soft">
              Wax melted and tinted by hand, poured, left to set, demoulded — the part that goes
              wrong most often — then finished one piece at a time.
            </p>

            <ul className="mt-8 space-y-5">
              {points.map(({ icon: Icon, title, detail }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun/15 text-terracotta-deep ring-1 ring-inset ring-sun/30">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight text-cocoa">
                      {title}
                    </span>
                    <span className="mt-1 block text-[0.88rem] leading-relaxed text-cocoa-soft">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

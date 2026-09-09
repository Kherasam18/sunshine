import { Building2, Gift, MessageCircle, PartyPopper, Store } from 'lucide-react';
import { getBulkImage, getSiteConfig, getWholesaleTiers } from '@/lib/content';
import { bulkQuoteLink } from '@/lib/whatsapp';
import { BrandImage } from '@/components/ui/BrandImage';
import { WholesaleTable } from '@/components/ui/TierTable';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const useCases = [
  { icon: Building2, label: 'Corporate Diwali gifting' },
  { icon: Gift, label: 'Wedding return gifts' },
  { icon: PartyPopper, label: 'Event & party favours' },
  { icon: Store, label: 'Boutique reseller stock' },
];

/** The B2B money section: tiers, use cases and a pre-filled quote request. */
export async function BulkBanner() {
  const [tiers, image, site] = await Promise.all([
    getWholesaleTiers(),
    getBulkImage(),
    getSiteConfig(),
  ]);

  return (
    <section
      id="bulk"
      aria-labelledby="bulk-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#7A3410_0%,#A6440F_58%,#C0561A_100%)] py-20 text-cream sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.18] mix-blend-luminosity">
        <BrandImage slot={image} fill showLabel={false} sizes="100vw" imageClassName="object-cover" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(244,146,43,0.35),transparent_60%)]" />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="bulk-heading"
              eyebrow="Bulk & corporate gifting"
              title="Gifting at scale, still made by hand."
              intro="Twenty pieces or two thousand — every candle is still poured, finished and packed by hand in our Pune studio. Pick your colours, your fragrance and your packaging, and we will make the rest match."
              align="left"
              tone="deep"
              ornament={false}
            />

            <Reveal delay={0.1}>
              <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                {useCases.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-[0.92rem] text-cream/90">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/12 ring-1 ring-inset ring-cream/25">
                      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href={bulkQuoteLink()}
                  external
                  variant="onDark"
                  size="lg"
                  icon={<MessageCircle className="h-[18px] w-[18px]" />}
                >
                  Get a Bulk Quote
                </Button>
                <p className="text-sm text-cream/75">
                  Typically answered the same day on {site.contact.whatsapp}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="w-full">
            <div className="overflow-hidden rounded-3xl bg-cream/97 p-6 text-cocoa shadow-lift ring-1 ring-cream/40 sm:p-8">
              <h3 className="font-display text-display-3 font-semibold text-terracotta-deep">
                Wholesale tiers
              </h3>
              <p className="mt-1.5 text-sm text-cocoa-soft">
                Indicative pricing for modak and laddu candles. Other pieces are quoted to the same
                ladder.
              </p>

              <WholesaleTable tiers={tiers} className="mt-6" />

              <p className="mt-6 border-t border-gold/30 pt-5 text-[0.82rem] leading-relaxed text-cocoa-soft">
                Every piece is poured by hand, for you alone — which is why we ask for confirmation
                upfront and {site.order.leadTimeDays} days to make your order properly. Custom
                colours, fragrances, tags and box inserts are all included in the conversation.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

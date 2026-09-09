import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getCraftGroups } from '@/lib/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BrandImage } from '@/components/ui/BrandImage';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

/** Four crafts, one studio — the breadth story. */
export async function ShopByCraft() {
  const crafts = await getCraftGroups();

  return (
    <Section id="crafts" tone="cream" spacing="default" labelledBy="crafts-heading">
      <SectionHeading
        id="crafts-heading"
        eyebrow="One studio, four crafts"
        title="Shop by Craft"
        intro="Candles, resin, clay and cut wood — all made under one roof, so a single order can cover the favours, the keepsake and the nameplate."
      />

      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 xl:grid-cols-4 xl:gap-6">
        {crafts.map((craft) => (
          <RevealItem key={craft.id} className="h-full">
            <Link
              href={craft.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ivory shadow-warm ring-1 ring-cocoa/8 transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lift hover:ring-terracotta/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <BrandImage
                slot={craft.image}
                aspect="4:5"
                sizes="(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 23vw"
                imageClassName="transition duration-700 ease-out group-hover:scale-[1.06]"
                className="transition duration-700 ease-out group-hover:scale-[1.02]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(59,48,42,0)_0%,rgba(59,48,42,0.55)_100%)] opacity-0 transition duration-500 group-hover:opacity-100"
                />
              </BrandImage>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-start justify-between gap-3 font-display text-2xl font-semibold leading-tight text-cocoa">
                  {craft.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-terracotta transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-cocoa-soft">{craft.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta-deep">
                  Browse
                  <span aria-hidden="true" className="h-px w-6 bg-terracotta/50 transition-all duration-300 group-hover:w-10" />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

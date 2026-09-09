import type { Metadata } from 'next';
import {
  Building2,
  Coffee,
  Flower2,
  Gift,
  MessageCircle,
  Package,
  Palette,
  PartyPopper,
  Store,
  Tag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { getBulkContent, getCollections, getSiteConfig, getWholesaleTiers } from '@/lib/content';
import { bulkQuoteLink } from '@/lib/whatsapp';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { BrandImage } from '@/components/ui/BrandImage';
import { WholesaleTable } from '@/components/ui/TierTable';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { BulkEnquiryForm } from '@/components/bulk/BulkEnquiryForm';
import { BulkActionBar } from '@/components/bulk/BulkActionBar';

const icons: Record<string, LucideIcon> = {
  building: Building2,
  gift: Gift,
  party: PartyPopper,
  store: Store,
  coffee: Coffee,
  palette: Palette,
  flower: Flower2,
  package: Package,
  tag: Tag,
};

export const metadata: Metadata = {
  title: 'Bulk & Corporate Gifting — Handmade Candles from ₹30 a Piece',
  description:
    'Corporate Diwali gifting, wedding return gifts and event favours, handmade in Pune. MOQ 20 pieces from ₹35, ₹30 at 50+. Custom colours, fragrance, packaging and branding.',
  alternates: { canonical: '/bulk' },
  openGraph: {
    title: 'Gifting at scale, still made by hand — Sunshine Creations',
    description: 'Bulk handmade candles and gifts from ₹30 a piece. MOQ 20. Made in Pune.',
    type: 'website',
  },
};

export default async function BulkPage() {
  const [bulk, tiers, collections, site] = await Promise.all([
    getBulkContent(),
    getWholesaleTiers(),
    getCollections(),
    getSiteConfig(),
  ]);

  const productOptions = [
    'Modak candles',
    'Laddu candles',
    'Mixed mithai boxes',
    'Floral t-lights',
    'Daisy urli candles',
    'Mini jar candles',
    'Resin Ganesha standees',
    ...collections.map((collection) => collection.name),
    'Not sure — please advise',
  ];

  return (
    <>
      <PageHero
        eyebrow="Bulk & corporate gifting"
        title="Gifting at scale, still made by hand."
        intro="Twenty pieces or two thousand — every candle is still poured, finished and packed by hand in our Pune studio. Pick your colours, your fragrance and your packaging, and we will make the rest match."
        image={bulk.hero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Bulk & Corporate' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            href={bulkQuoteLink()}
            external
            size="lg"
            className="w-full sm:w-auto"
            icon={<MessageCircle className="h-[18px] w-[18px]" />}
          >
            Get a Bulk Quote
          </Button>
          <Button href="#enquiry" variant="secondary" size="lg" className="w-full sm:w-auto">
            Or fill in the form
          </Button>
        </div>
      </PageHero>

      <Section tone="cream" spacing="default" labelledBy="use-cases-heading">
        <SectionHeading
          id="use-cases-heading"
          eyebrow="What we are usually asked for"
          title="Five kinds of order we know well"
          intro="Different buyers, same studio. Each of these has its own rhythm, and we have run all of them before."
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {bulk.useCases.map((useCase) => {
            const Icon = icons[useCase.icon] ?? Gift;
            return (
              <RevealItem key={useCase.id} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-ivory p-6 shadow-warm ring-1 ring-cocoa/8 transition duration-500 hover:-translate-y-1 hover:shadow-lift hover:ring-terracotta/25">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun/15 text-terracotta-deep ring-1 ring-inset ring-sun/30">
                    <Icon aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-cocoa">
                    {useCase.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-cocoa-soft">
                    {useCase.description}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section tone="warm" spacing="default" sunburst labelledBy="tiers-heading">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="tiers-heading"
              eyebrow="Wholesale pricing"
              title="The more you order, the less each piece costs."
              intro="Published rates for modak and laddu candles. Everything else is quoted against the same ladder — ask and we will send exact figures for your piece."
              align="left"
              ornament={false}
            />
            <Reveal delay={0.1} className="mt-8">
              <WholesaleTable tiers={tiers} />
              <p className="mt-6 text-[0.85rem] leading-relaxed text-cocoa-soft">
                Prices include your choice of colour and fragrance. Custom packaging, printed tags
                and branded sleeves are quoted separately — usually a small addition per piece.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <h3 className="font-display text-2xl font-semibold text-terracotta sm:text-3xl">
              Make it yours
            </h3>
            <p className="mt-3 max-w-prose text-[0.93rem] leading-relaxed text-cocoa-soft">
              Four things we can change for you, at no minimum beyond the order itself.
            </p>
            <ul className="mt-7 space-y-4">
              {bulk.branding.map((option) => {
                const Icon = icons[option.icon] ?? Palette;
                return (
                  <li
                    key={option.title}
                    className="flex gap-4 rounded-2xl bg-ivory/80 p-5 ring-1 ring-gold/25"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun/15 text-terracotta-deep ring-1 ring-inset ring-sun/30">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold leading-tight text-cocoa">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-[0.88rem] leading-relaxed text-cocoa-soft">
                        {option.description}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="ivory" spacing="default" labelledBy="gallery-heading">
        <SectionHeading
          id="gallery-heading"
          eyebrow="Orders we have already made"
          title="This is what volume looks like here"
          intro="Not stock photography — these are real orders that left the studio, packed by the same hands that poured them."
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-6" stagger={0.06}>
          {bulk.gallery.map((slot) => (
            <RevealItem key={slot.id} y={18}>
              <BrandImage
                slot={slot}
                aspect="4:5"
                sizes="(max-width: 479px) 92vw, (max-width: 1023px) 46vw, 31vw"
                className="rounded-2xl shadow-warm ring-1 ring-cocoa/8"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="enquiry" tone="cream" spacing="roomy" rangoli labelledBy="enquiry-heading">
        <SectionHeading
          id="enquiry-heading"
          eyebrow="Start the conversation"
          title="Request a bulk quote"
          intro={`Answered personally, usually the same day, on ${site.contact.whatsapp}.`}
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <BulkEnquiryForm
            productOptions={productOptions}
            quantityBands={bulk.quantityBands}
            budgetBands={bulk.budgetBands}
          />
        </div>

        {/* Clearance for the phone action bar */}
        <div aria-hidden="true" className="pb-action-bar md:hidden" />
      </Section>

      <BulkActionBar />
    </>
  );
}

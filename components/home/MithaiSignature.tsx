import { ArrowRight, MessageCircle } from 'lucide-react';
import { getProductsByCategory } from '@/lib/content';
import { collectionEnquiryLink } from '@/lib/whatsapp';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Divider } from '@/components/ui/Divider';

const highlights = [
  { label: 'Real silver varq', detail: 'Laid on by hand, piece by piece' },
  { label: 'From ₹30 a piece', detail: 'Bulk tiers from 20 pieces' },
  { label: 'Boxed sets of 4', detail: 'Ready to hand over at ₹185' },
];

/** The wedge: the mithai range gets the loudest section on the page. */
export async function MithaiSignature() {
  const products = await getProductsByCategory('mithai-candles');

  return (
    <Section
      id="mithai-candles"
      tone="warm"
      spacing="roomy"
      sunburst
      rangoli
      labelledBy="mithai-heading"
    >
      <SectionHeading
        id="mithai-heading"
        eyebrow="The signature collection"
        title="The Mithai Candle Collection"
        intro="Mithai that looks delicious… but is made to glow. Modak, laddu, kaju katli, kesar pedha and rasmalai — sculpted in soy wax, finished with silver varq, and almost always mistaken for the real thing."
      />

      <Reveal delay={0.1}>
        {/* Phones stack label over detail; sharing a row made "Real silver varq"
            wrap against its own description. */}
        <ul className="mx-auto mt-8 flex max-w-3xl flex-col divide-y divide-gold/20 rounded-3xl bg-ivory/70 px-5 py-2 ring-1 ring-gold/25 sm:mt-10 sm:flex-row sm:divide-y-0 sm:justify-between sm:gap-8 sm:px-8 sm:py-5">
          {highlights.map((item) => (
            <li key={item.label} className="flex flex-col gap-0.5 py-3 sm:gap-1 sm:py-0 sm:text-center">
              <span className="font-display text-[1.05rem] font-semibold leading-tight text-terracotta-deep sm:text-xl">
                {item.label}
              </span>
              <span className="text-[0.75rem] leading-snug text-cocoa-soft sm:text-[0.8rem]">
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <RevealGroup
        className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:mt-12 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7"
        stagger={0.07}
      >
        {products.map((product, index) => (
          <RevealItem key={product.slug} className="h-full">
            <ProductCard
              product={product}
              priority={index < 2}
              sizes="(max-width: 479px) 92vw, (max-width: 1023px) 46vw, 31vw"
            />
          </RevealItem>
        ))}
      </RevealGroup>

      <Divider className="mx-auto mt-10 max-w-md sm:mt-14" motif="sunflower" />

      <Reveal className="mt-8 flex flex-col items-center gap-4 text-center">
        <p className="max-w-xl text-body-sm leading-relaxed text-cocoa-soft">
          Every mithai candle is poured to order, so the colours can follow your décor, your
          packaging or your mandap.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={collectionEnquiryLink('Mithai Candle')}
            external
            icon={<MessageCircle className="h-[18px] w-[18px]" />}
          >
            Enquire on WhatsApp
          </Button>
          <Button href="/bulk" variant="link" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            See bulk pricing
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

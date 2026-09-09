import { Clock3 } from 'lucide-react';
import { getProcess, getSiteConfig } from '@/lib/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BrandImage } from '@/components/ui/BrandImage';
import { BrandVideo } from '@/components/ui/BrandVideo';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

/** Poured → Detailed → Packed with love, alongside the making-of reel. */
export async function MadeByHand() {
  const [{ steps, video }, site] = await Promise.all([getProcess(), getSiteConfig()]);

  return (
    <Section id="made-by-hand" tone="warm" spacing="roomy" sunburst labelledBy="made-heading">
      <SectionHeading
        id="made-heading"
        eyebrow="Made by hand"
        title="Three pairs of hands short of a factory."
        intro="There is no production line here — just one studio, one person, and a lot of wax. This is what happens between your message and your parcel."
      />

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[320px] lg:sticky lg:top-28 lg:max-w-none">
          <BrandVideo slot={video} className="shadow-lift ring-1 ring-gold/25" />
          <p className="mt-4 text-center text-[0.8rem] leading-relaxed text-cocoa-soft lg:text-left">
            A minute in the studio — pouring, demoulding and the silver varq going on.
          </p>
        </Reveal>

        <RevealGroup className="relative flex flex-col gap-5 sm:gap-7" stagger={0.1}>
          {steps.map((step) => (
            <RevealItem key={step.step}>
              <article className="relative flex items-start gap-4 rounded-3xl bg-ivory/80 p-4 ring-1 ring-cocoa/8 transition duration-500 hover:ring-terracotta/25 sm:gap-6 sm:p-6">
                <BrandImage
                  slot={step.image}
                  aspect="1:1"
                  sizes="(max-width: 640px) 25vw, 160px"
                  className="w-20 shrink-0 rounded-2xl shadow-warm xs:w-24 sm:w-32"
                />
                <div className="min-w-0">
                  <p className="font-sans text-eyebrow font-semibold uppercase text-gold-deep">
                    Step {step.step}
                  </p>
                  <h3 className="mt-1.5 font-display text-display-3 font-semibold text-cocoa">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-cocoa-soft">
                    {step.description}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}

          <RevealItem>
            <div className="flex items-start gap-4 rounded-3xl border border-dashed border-terracotta/30 bg-sun/8 p-5 sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun/20 text-terracotta-deep ring-1 ring-inset ring-sun/40">
                <Clock3 aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <p className="text-[0.92rem] leading-relaxed text-cocoa">
                <strong className="font-semibold">Please allow {site.order.leadTimeDays} days.</strong>{' '}
                <span className="text-cocoa-soft">
                  Nothing sits ready on a shelf — your order is poured after you confirm it, which is
                  why we ask for confirmation upfront and a little time to make it properly.
                </span>
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}

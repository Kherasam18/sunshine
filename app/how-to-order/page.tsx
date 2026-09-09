import type { Metadata } from 'next';
import {
  CheckCircle2,
  Clock3,
  ListChecks,
  MessageCircle,
  Package,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { getCareTips, getFaqs, getOrderSteps, getSiteConfig } from '@/lib/content';
import { generalEnquiryLink } from '@/lib/whatsapp';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

const icons: Record<string, LucideIcon> = {
  message: MessageCircle,
  list: ListChecks,
  check: CheckCircle2,
  wallet: Wallet,
  clock: Clock3,
  package: Package,
};

export const metadata: Metadata = {
  title: 'How to Order — Six Steps, One WhatsApp Message',
  description:
    'How ordering works at Sunshine Creations: message us, share your details, confirm, and we make it by hand. Plus shipping, candle care and answers to the questions we are asked most.',
  alternates: { canonical: '/how-to-order' },
};

export default async function HowToOrderPage() {
  const [steps, faqs, careTips, site] = await Promise.all([
    getOrderSteps(),
    getFaqs(),
    getCareTips(),
    getSiteConfig(),
  ]);

  return (
    <>
      <PageHero
        variant="compact"
        eyebrow="How to order"
        title="Six steps, and most of them are ours."
        intro="There is no cart here, and that is deliberate. Everything is made to order in your colours, so it starts with a conversation rather than a checkout."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'How to Order' }]}
      >
        <Button
          href={generalEnquiryLink()}
          external
          size="lg"
          icon={<MessageCircle className="h-[18px] w-[18px]" />}
        >
          Start on WhatsApp
        </Button>
      </PageHero>

      <Section tone="cream" spacing="default" labelledBy="steps-heading">
        <SectionHeading
          id="steps-heading"
          eyebrow="The process"
          title="From your first message to your parcel"
        />

        <RevealGroup className="mx-auto mt-14 max-w-3xl" stagger={0.08}>
          <ol className="relative">
            {/* Timeline spine */}
            <span
              aria-hidden="true"
              className="absolute left-[27px] top-3 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold/60 via-gold/40 to-transparent sm:left-[31px]"
            />

            {steps.map((step) => {
              const Icon = icons[step.icon] ?? MessageCircle;
              return (
                <RevealItem key={step.step}>
                  <li className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ivory text-terracotta-deep shadow-warm ring-1 ring-gold/40 sm:h-16 sm:w-16">
                      <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
                    </span>

                    <div className="pt-1.5">
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                        Step {step.step}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-semibold leading-tight text-cocoa sm:text-[1.75rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 max-w-prose text-[0.95rem] leading-relaxed text-cocoa-soft">
                        {step.description}
                      </p>
                      {step.note ? (
                        <p className="mt-3 inline-block rounded-full bg-sun/12 px-3.5 py-1.5 text-[0.8rem] text-cocoa">
                          {step.note}
                        </p>
                      ) : null}
                    </div>
                  </li>
                </RevealItem>
              );
            })}
          </ol>
        </RevealGroup>
      </Section>

      <Section id="handmade" tone="warm" spacing="default" sunburst labelledBy="promise-heading">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            id="promise-heading"
            eyebrow="Our handmade promise"
            title="Made especially for you — and only for you."
            intro="Because each piece is poured after you confirm it, in your colours, we are unable to accept cancellations once your order is under way. It is not a policy we enjoy writing; it is simply what it means to make something for one person."
          />
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              {[
                {
                  title: 'Slight variations are normal',
                  detail:
                    'Hand-tinted wax and freehand work mean small differences in shade and size. That is the signature, not a fault.',
                },
                {
                  title: 'Damage in transit',
                  detail:
                    'Film your unboxing and send it with photos within 24 hours, and we will replace or refund the affected pieces.',
                },
                {
                  title: 'Talk to us early',
                  detail:
                    'Colours and quantities can usually be changed in the first day or two. Message us as soon as you know.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-ivory/80 p-5 ring-1 ring-gold/25">
                  <h3 className="font-display text-lg font-semibold leading-snug text-cocoa">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-cocoa-soft">{item.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="ivory" spacing="default" labelledBy="care-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="care-heading"
              eyebrow="Candle care"
              title="Get every hour out of it."
              intro="Soy wax rewards a little attention. Four habits, and your candle will burn evenly to the last."
              align="left"
              ornament={false}
            />
            <Accordion
              className="mt-8"
              defaultOpenId={careTips[0]?.title}
              items={careTips.map((tip) => ({
                id: tip.title,
                question: tip.title,
                answer: tip.description,
              }))}
            />
          </div>

          <div id="faqs" className="scroll-mt-28">
            <SectionHeading
              eyebrow="Questions"
              title="Everything else you might be wondering"
              align="left"
              ornament={false}
            />
            <Accordion
              className="mt-8"
              items={faqs.map((faq) => ({
                id: faq.id,
                question: faq.question,
                answer: faq.answer,
              }))}
            />
          </div>
        </div>
      </Section>

      <Section tone="cream" spacing="default">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[2rem] font-bold leading-tight text-terracotta sm:text-4xl">
            Still not sure? Just ask.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cocoa-soft">
            There is a real person at the other end of {site.contact.whatsapp}, usually replying the
            same day. No question is too small — most orders start with one.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href={generalEnquiryLink()}
              external
              size="lg"
              icon={<MessageCircle className="h-[18px] w-[18px]" />}
            >
              Message the studio
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Other ways to reach us
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

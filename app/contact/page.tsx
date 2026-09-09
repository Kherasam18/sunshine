import type { Metadata } from 'next';
import { Clock, Instagram, MapPin, MessageCircle, Youtube } from 'lucide-react';

import { getContactImage, getSiteConfig, getStudioHours } from '@/lib/content';
import { generalEnquiryLink } from '@/lib/whatsapp';

import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { BrandImage } from '@/components/ui/BrandImage';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Handmade Candles & Gifts in Pune',
  description:
    'Message Sunshine Creations on WhatsApp at +91 9270402030, or find us on Instagram and YouTube. Based in Pune, shipping across India.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const [site, hours, image] = await Promise.all([
    getSiteConfig(),
    getStudioHours(),
    getContactImage(),
  ]);

  const channels = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: site.contact.whatsapp,
      detail: 'The fastest way to reach us — and where every order happens.',
      href: generalEnquiryLink(),
      primary: true,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: site.social.instagramHandle,
      detail: 'New pieces, festive drops and making-of reels, most days.',
      href: site.social.instagram,
    },
    {
      icon: Youtube,
      label: 'YouTube',
      value: 'Sunshine Creations Studio',
      detail: 'Longer making videos, from first pour to finished piece.',
      href: site.social.youtube,
    },
  ];

  return (
    <>
      <PageHero
        variant="compact"
        eyebrow="Contact"
        title="There is one person at the other end."
        intro="No call centre, no ticket number. Message the studio and you are talking to the person who will make your order."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      >
        <Button
          href={generalEnquiryLink()}
          external
          size="lg"
          icon={<MessageCircle className="h-[18px] w-[18px]" />}
        >
          Message on WhatsApp
        </Button>
      </PageHero>

      <Section tone="cream" spacing="default">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <ul className="space-y-4">
              {channels.map(({ icon: Icon, label, value, detail, href, primary }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-4 rounded-3xl bg-ivory p-5 shadow-warm ring-1 ring-cocoa/8 transition duration-400 hover:-translate-y-1 hover:shadow-lift hover:ring-terracotta/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  >
                    <span
                      className={
                        primary
                          ? 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sun text-cocoa'
                          : 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sun/15 text-terracotta-deep ring-1 ring-inset ring-sun/30'
                      }
                    >
                      <Icon aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-eyebrow font-semibold uppercase text-cocoa-soft">
                        {label}
                      </span>
                      <span className="mt-1 block font-display text-xl font-semibold leading-tight text-cocoa transition-colors group-hover:text-terracotta-deep">
                        {value}
                      </span>
                      <span className="mt-1.5 block text-[0.86rem] leading-relaxed text-cocoa-soft">
                        {detail}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-ivory p-5 ring-1 ring-gold/25">
                <h2 className="flex items-center gap-2 font-sans text-eyebrow font-semibold uppercase text-terracotta-deep">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                  Where we are
                </h2>
                <p className="mt-3 font-display text-lg font-semibold text-cocoa">
                  {site.location.display}
                </p>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-cocoa-soft">
                  A home studio, so we do not keep a shopfront — but Pune orders can often be
                  collected. Everything else ships across India with tracking.
                </p>
              </div>

              <div className="rounded-3xl bg-ivory p-5 ring-1 ring-gold/25">
                <h2 className="flex items-center gap-2 font-sans text-eyebrow font-semibold uppercase text-terracotta-deep">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                  Studio hours
                </h2>
                <dl className="mt-3 space-y-2.5">
                  {hours.map((slot) => (
                    <div key={slot.days}>
                      <dt className="font-sans text-[0.84rem] font-medium text-cocoa">{slot.days}</dt>
                      <dd className="text-[0.82rem] leading-snug text-cocoa-soft">{slot.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <Reveal delay={0.1} className="mt-6">
              <BrandImage
                slot={image}
                aspect="3:2"
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="rounded-3xl shadow-warm ring-1 ring-cocoa/8"
              />
            </Reveal>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}

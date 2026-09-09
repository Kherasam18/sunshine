import type { Metadata } from 'next';
import { MapPin, MessageCircle } from 'lucide-react';

import { getSiteConfig, getStory } from '@/lib/content';
import { generalEnquiryLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { BrandImage } from '@/components/ui/BrandImage';
import { Divider } from '@/components/ui/Divider';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Our Story — A One-Person Handmade Studio in Pune',
  description:
    'Sunshine Creations started with zero — no setup, no audience, just a dream and a lot of faith. The story behind the mithai candles, resin keepsakes and Lippan art made by hand in Pune.',
  alternates: { canonical: '/story' },
  openGraph: {
    title: 'Our Story — Sunshine Creations',
    description: 'Started with zero. Built by hand, in Pune.',
    type: 'website',
  },
};

export default async function StoryPage() {
  const [story, site] = await Promise.all([getStory(), getSiteConfig()]);

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A little dream and a lot of faith."
        intro="Sunshine Creations is one person, four crafts and a work table that used to be a kitchen table. This is how it happened."
        image={story.hero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Story' }]}
      />

      <Section tone="cream" spacing="default">
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {story.stats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold text-terracotta sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.82rem] leading-snug text-cocoa-soft">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      {story.chapters.map((chapter, index) => {
        const reversed = index % 2 === 1;
        return (
          <Section
            key={chapter.id}
            tone={index % 2 === 0 ? 'ivory' : 'warm'}
            spacing="default"
            sunburst={index % 2 === 1}
            labelledBy={`${chapter.id}-heading`}
          >
            <div
              className={cn(
                'grid items-center gap-10 lg:gap-16',
                chapter.image ? 'lg:grid-cols-2' : 'mx-auto max-w-3xl',
              )}
            >
              {chapter.image ? (
                <Reveal className={cn(reversed && 'lg:order-2')}>
                  <BrandImage
                    slot={chapter.image}
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="rounded-3xl shadow-warm ring-1 ring-cocoa/8"
                  />
                </Reveal>
              ) : null}

              <Reveal delay={0.1} className={cn(reversed && 'lg:order-1')}>
                <p className="font-sans text-eyebrow font-semibold uppercase text-terracotta-deep">
                  {chapter.eyebrow}
                </p>
                <h2
                  id={`${chapter.id}-heading`}
                  className="mt-3 font-display text-display-2 font-bold text-terracotta"
                >
                  {chapter.title}
                </h2>

                {chapter.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mt-4 max-w-prose text-body-sm leading-relaxed sm:text-base text-cocoa-soft">
                    {paragraph}
                  </p>
                ))}

                {chapter.quote ? (
                  <blockquote className="mt-7 border-l-2 border-gold/60 pl-5">
                    <p className="font-display text-xl italic leading-snug text-cocoa sm:text-2xl">
                      “{chapter.quote}”
                    </p>
                  </blockquote>
                ) : null}
              </Reveal>
            </div>
          </Section>
        );
      })}

      <Section tone="cream" spacing="roomy" rangoli>
        <Divider className="mx-auto max-w-sm" motif="sunflower" />
        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-sun/15 px-4 py-1.5 font-sans text-eyebrow font-semibold uppercase text-terracotta-deep ring-1 ring-inset ring-sun/30">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            Made in {site.location.city}
          </p>
          <h2 className="mt-6 font-display text-display-2 font-bold text-terracotta">
            Thank you for believing in our little business.
          </h2>
          <p className="mt-5 text-body-sm leading-relaxed sm:text-base text-cocoa-soft">
            Every order — one candle or five hundred — is still a small surprise at this end. If you
            have an idea, send it over. We would love to make it for you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href={generalEnquiryLink()}
              external
              size="lg"
              icon={<MessageCircle className="h-[18px] w-[18px]" />}
            >
              Say hello on WhatsApp
            </Button>
            <Button href="/customise" variant="link">
              Customise something
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

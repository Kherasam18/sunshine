import { Instagram } from 'lucide-react';
import { getSiteConfig, getStudioFeed } from '@/lib/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BrandImage } from '@/components/ui/BrandImage';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * Instagram-style grid. Static slots for now — swap for a live feed embed
 * without changing the layout.
 */
export async function StudioFeed() {
  const [feed, site] = await Promise.all([getStudioFeed(), getSiteConfig()]);

  return (
    <Section id="studio-feed" tone="ivory" spacing="default" labelledBy="studio-feed-heading">
      <SectionHeading
        id="studio-feed-heading"
        eyebrow="From the studio"
        title="Wax, mirrors and a lot of marigolds"
        intro="Work in progress, finished pieces and the odd demoulding disaster — it all goes up on Instagram first."
      />

      <RevealGroup
        className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6 lg:gap-4"
        stagger={0.05}
      >
        {feed.map((slot) => (
          <RevealItem key={slot.id} y={16}>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-2xl shadow-warm ring-1 ring-cocoa/8 transition duration-500 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              <BrandImage
                slot={slot}
                aspect="1:1"
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 16vw"
                imageClassName="transition duration-700 ease-out group-hover:scale-110"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center bg-cocoa/45 opacity-0 transition duration-300 group-hover:opacity-100"
              >
                <Instagram className="h-6 w-6 text-cream" />
              </span>
              <span className="sr-only">View {slot.label} on Instagram</span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-3 text-center">
        <Button
          href={site.social.instagram}
          external
          variant="secondary"
          icon={<Instagram className="h-[18px] w-[18px]" />}
        >
          Follow {site.social.instagramHandle}
        </Button>
        <p className="text-[0.82rem] text-cocoa-soft">
          New pieces, festive drops and making-of reels, most days of the week.
        </p>
      </Reveal>
    </Section>
  );
}

import { getHeroImage, getSiteConfig } from '@/lib/content';
import { generalEnquiryLink } from '@/lib/whatsapp';

import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { MithaiSignature } from '@/components/home/MithaiSignature';
import { ShopByCraft } from '@/components/home/ShopByCraft';
import { ShopByOccasion } from '@/components/home/ShopByOccasion';
import { BulkBanner } from '@/components/home/BulkBanner';
import { MadeByHand } from '@/components/home/MadeByHand';
import { Testimonials } from '@/components/home/Testimonials';
import { StudioFeed } from '@/components/home/StudioFeed';
import { PreBooking } from '@/components/home/PreBooking';

export default async function HomePage() {
  const [hero, site] = await Promise.all([getHeroImage(), getSiteConfig()]);

  return (
    <>
      <Hero image={hero} whatsappHref={generalEnquiryLink()} />
      <TrustStrip />
      <MithaiSignature />
      <ShopByCraft />
      <ShopByOccasion />
      <BulkBanner />
      <MadeByHand />
      <Testimonials />
      <StudioFeed />
      <PreBooking occasionName={site.preBooking.occasionName} />
      <LocalBusinessSchema />
    </>
  );
}

/** LocalBusiness markup — the studio's entire discovery problem is Google. */
async function LocalBusinessSchema() {
  const site = await getSiteConfig();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    telephone: site.contact.whatsapp,
    areaServed: 'IN',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.state,
      addressCountry: 'IN',
    },
    sameAs: [site.social.instagram, site.social.youtube],
    priceRange: '₹₹',
  };

  return (
    <script
      type="application/ld+json"
      // Content is a fixed object from our own config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

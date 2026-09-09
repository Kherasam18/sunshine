import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import { getCollections } from '@/lib/content';
import { generalEnquiryLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { LogoMark } from '@/components/brand/LogoMark';
import { Sunburst } from '@/components/brand/Ornaments';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const collections = await getCollections();

  return (
    <section className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-cream px-5 pb-20 pt-32">
      <Sunburst
        rays={30}
        className="absolute left-1/2 top-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-sun opacity-[0.09]"
      />

      <div className="mx-auto w-full max-w-2xl text-center">
        <LogoMark className="mx-auto h-16 w-16 text-terracotta/45" flicker title="" />

        <p className="mt-8 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-terracotta-deep">
          Page not found
        </p>
        <h1 className="mt-4 font-display text-display-1 font-bold text-terracotta">
          This one seems to have melted.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-cocoa-soft">
          The page you were looking for is not here — but the candles, the resin keepsakes and the
          Lippan frames all are. Start with one of these.
        </p>

        <Divider className="mx-auto mt-10 max-w-xs" />

        <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
          {collections.map((collection) => (
            <li key={collection.slug}>
              <Link
                href={collection.href}
                className="inline-flex min-h-[44px] items-center rounded-full bg-ivory px-4 font-sans text-[0.9rem] font-medium text-cocoa ring-1 ring-gold/30 transition duration-300 hover:-translate-y-0.5 hover:text-terracotta-deep hover:shadow-warm hover:ring-terracotta/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to the home page
          </Button>
          <Button
            href={generalEnquiryLink()}
            external
            variant="secondary"
            size="lg"
            icon={<MessageCircle className="h-[18px] w-[18px]" />}
          >
            Ask us what you were after
          </Button>
        </div>
      </div>
    </section>
  );
}

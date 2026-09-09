import Link from 'next/link';
import { Instagram, MapPin, MessageCircle, Youtube } from 'lucide-react';
import { getNavigation, getSiteConfig } from '@/lib/content';
import { generalEnquiryLink } from '@/lib/whatsapp';
import { Logo } from '@/components/brand/Logo';
import { FooterNavColumn } from './FooterNavColumn';
import { Sunburst } from '@/components/brand/Ornaments';

export async function Footer() {
  const site = await getSiteConfig();
  const { footer, policy } = await getNavigation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-[#332821] text-cream/80">
      <Sunburst
        rays={30}
        className="absolute left-1/2 top-full h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 text-sun opacity-[0.09]"
      />

      <div className="container relative py-12 pb-[calc(3rem+var(--safe-bottom))] sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo size="md" inverted flicker />
            <p className="mt-6 font-display text-2xl font-semibold italic leading-snug text-cream">
              {site.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              A small studio in Pune turning Indian festive tradition into things you can light, gift
              and keep. Everything is poured, sculpted and packed by hand.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <SocialLink href={site.social.instagram} label="Instagram">
                <Instagram aria-hidden="true" className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={site.social.youtube} label="YouTube">
                <Youtube aria-hidden="true" className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={generalEnquiryLink()} label="WhatsApp">
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
            {footer.map((column) => (
              <FooterNavColumn key={column.title} title={column.title} items={column.items} />
            ))}

            {/* Never collapsed — contact is the conversion path. */}
            <div className="pt-4 md:pt-0">
              <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Get in touch
              </h2>
              <ul className="mt-4 space-y-1 text-[0.95rem] md:mt-5 md:space-y-4 md:text-sm">
                <li>
                  <a
                    href={generalEnquiryLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[44px] items-center gap-2.5 rounded-sm text-cream/75 transition hover:text-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-[#332821]"
                  >
                    <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-sun" />
                    <span>{site.contact.whatsapp}</span>
                  </a>
                </li>
                <li className="flex min-h-[44px] items-center gap-2.5 text-cream/75">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-sun" />
                  <span>{site.location.display}</span>
                </li>
                <li>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[44px] items-center gap-2.5 rounded-sm text-cream/75 transition hover:text-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-[#332821]"
                  >
                    <Instagram aria-hidden="true" className="h-4 w-4 shrink-0 text-sun" />
                    <span>{site.social.instagramHandle}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-7">
          <div className="flex flex-col gap-4 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}. Handmade in {site.location.city}.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {policy.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex min-h-[44px] items-center rounded-sm transition hover:text-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun lg:min-h-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream/80 ring-1 ring-cream/20 transition hover:bg-cream/10 hover:text-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-[#332821]"
    >
      {children}
    </a>
  );
}

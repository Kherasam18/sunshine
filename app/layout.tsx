import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Noto_Sans_Devanagari, Poppins } from 'next/font/google';
import './globals.css';

import { getNavigation, getSiteConfig } from '@/lib/content';
import { generalEnquiryLink } from '@/lib/whatsapp';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

/** Display — high-contrast serif echoing the script logo. */
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

/** Body — Poppins, matching the feel of the studio's Instagram creatives. */
const body = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

/**
 * Devanagari coverage. Poppins ships no Devanagari here, so this face sits
 * directly behind it in the font stack: Latin resolves to Poppins, and the
 * Marathi lines (लाभले आम्हास भाग्य बोलतो मराठी, जय महाराष्ट्र) fall through
 * to this one automatically — no per-element classes needed.
 */
const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sunshinecreations.example'),
  title: {
    default: 'Sunshine Creations — Handmade Mithai Candles, Resin Art & Décor in Pune',
    template: '%s · Sunshine Creations',
  },
  description:
    'Handmade soy wax mithai candles — modak, laddu, kaju katli — plus resin art, Lippan mirror work and Marathi craft. Made by hand in Pune. Bulk and return gift orders from 20 pieces.',
  keywords: [
    'handmade candles Pune',
    'modak candles',
    'laddu candle',
    'mithai candles',
    'Diwali return gifts',
    'resin Ganesha standee',
    'Lippan art Pune',
    'Marathi nameplate',
    'soy wax candles India',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Sunshine Creations — Mithai you can light. Memories you can keep.',
    description:
      'Premium handmade candles, resin art & décor — made by hand in Pune. Order on WhatsApp.',
    siteName: 'Sunshine Creations',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FDF8F0',
  width: 'device-width',
  initialScale: 1,
  /** Lets fixed UI reach under the notch; paired with env(safe-area-inset-*). */
  viewportFit: 'cover',
  /** Pinch-zoom stays enabled — no maximumScale, no userScalable: false. */
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteConfig();
  const { primary, secondary } = await getNavigation();
  const whatsappHref = generalEnquiryLink();

  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${devanagari.variable}`}>
      <head>
        {/* Scroll reveals render at opacity 0 until Framer Motion animates
            them in. Without JS that would hide most of the page, so force
            every revealed element visible instead. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-cream font-sans text-cocoa antialiased">
        <Header
          nav={primary}
          secondary={secondary}
          whatsappHref={whatsappHref}
          social={{ instagram: site.social.instagram, youtube: site.social.youtube }}
        />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat href={whatsappHref} />
      </body>
    </html>
  );
}

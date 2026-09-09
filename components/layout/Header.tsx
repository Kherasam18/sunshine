'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, MessageCircle } from 'lucide-react';
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';
import { MobileDrawer } from './MobileDrawer';

/**
 * Transparent over the hero, solid cream once the page scrolls. The mobile
 * drawer carries the same nav plus the WhatsApp CTA.
 */
export function Header({
  nav,
  secondary,
  whatsappHref,
  social,
}: {
  nav: NavItem[];
  secondary: NavItem[];
  whatsappHref: string;
  social: { instagram: string; youtube: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-ivory px-5 py-3 text-sm font-medium text-terracotta-deep shadow-warm focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition duration-500 ease-out',
          scrolled
            ? 'border-b border-gold/25 bg-cream/95 backdrop-blur-md supports-[backdrop-filter]:bg-cream/85'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container flex h-[72px] items-center justify-between gap-4 lg:h-20">
          <Logo size="sm" flicker className={cn('transition', !scrolled && 'drop-shadow-[0_1px_10px_rgba(59,48,42,0.35)]')} />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex min-h-[44px] items-center font-sans text-[0.92rem] font-medium transition-colors',
                  'after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0',
                  'after:bg-terracotta after:transition-transform after:duration-300 hover:after:scale-x-100',
                  'rounded-sm text-cocoa hover:text-terracotta-deep',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4 focus-visible:ring-offset-cream',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Phones get an icon button; the label appears from sm up. */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Order on WhatsApp"
              className="inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full bg-sun px-0 font-sans text-sm font-medium text-cocoa shadow-warm transition duration-300 hover:bg-[#EB851F] hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:px-5"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Order on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/85 text-cocoa ring-1 ring-cocoa/10 transition hover:bg-ivory hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream lg:hidden"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        nav={nav}
        secondary={secondary}
        whatsappHref={whatsappHref}
        social={social}
      />
    </>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Instagram, MessageCircle, X, Youtube } from 'lucide-react';
import type { NavItem } from '@/types';
import { Logo } from '@/components/brand/Logo';
import { Divider } from '@/components/ui/Divider';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
  secondary?: NavItem[];
  whatsappHref: string;
  social?: { instagram: string; youtube: string };
}

/** Slide-over nav. Closes on Escape, locks scroll, and traps focus loosely. */
export function MobileDrawer({ open, onClose, nav, secondary, whatsappHref, social }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();
  /** The element that opened the drawer, so focus can be handed back. */
  const openerRef = useRef<Element | null>(null);

  // Close on navigation — otherwise the drawer stays over the new page.
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    openerRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      // Hand focus back to whatever opened the drawer.
      const opener = openerRef.current;
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-cocoa/45 backdrop-blur-sm"
          />

          <motion.div
            id="mobile-drawer"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'tween', duration: 0.36, ease: [0.21, 0.68, 0.35, 1] }}
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-cream px-6 pt-6 shadow-2xl pb-[calc(1.5rem+var(--safe-bottom))]"
          >
            <div className="flex items-center justify-between">
              <Logo size="sm" href={null} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cocoa ring-1 ring-cocoa/10 transition hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <Divider className="my-6" />

            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="border-b border-gold/20 py-4 font-display text-2xl font-semibold text-cocoa transition-colors hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {secondary?.length ? (
              <nav aria-label="More" className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {secondary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-[44px] items-center rounded-sm font-sans text-[0.95rem] font-medium text-cocoa-soft underline-offset-4 transition hover:text-terracotta-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            ) : null}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-sun px-6 font-sans font-medium text-cocoa shadow-warm transition hover:bg-[#EB851F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              Order on WhatsApp
            </a>

            {social ? (
              <div className="mt-6 flex items-center gap-4">
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cocoa-soft ring-1 ring-cocoa/10 transition hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  aria-label="Instagram"
                >
                  <Instagram aria-hidden="true" className="h-5 w-5" />
                </a>
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cocoa-soft ring-1 ring-cocoa/10 transition hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  aria-label="YouTube"
                >
                  <Youtube aria-hidden="true" className="h-5 w-5" />
                </a>
              </div>
            ) : null}

            <p className="mt-auto pt-8 text-sm leading-relaxed text-cocoa-soft">
              Handmade to order in Pune. Every piece is poured by hand, for you alone.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

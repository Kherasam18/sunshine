'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useHasStickyActionBar } from '@/components/ui/StickyActionBar';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Sticky WhatsApp button, present on every page. Appears once the hero is
 * behind you so it never competes with the hero CTAs, sits above the iPhone
 * home indicator, and stands down on pages that have their own sticky action
 * bar (product, bulk) rather than stacking two floating buttons.
 */
export function WhatsAppFloat({ href, label = 'Order on WhatsApp' }: { href: string; label?: string }) {
  const [scrolledPast, setScrolledPast] = useState(false);
  const reduced = useReducedMotion();
  const hasActionBar = useHasStickyActionBar();
  /** The action bar itself is `md:hidden`, so it only replaces the float here. */
  const isPhone = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The action bar carries WhatsApp on phones; from md up it is hidden, so the
  // float takes over again.
  const visible = scrolledPast && !(hasActionBar && isPhone);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.3, ease: [0.21, 0.68, 0.35, 1] }}
          className="bottom-safe fixed right-4 z-40 sm:right-7"
        >
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="group inline-flex h-14 min-h-[56px] min-w-[56px] items-center justify-center gap-3 rounded-full bg-[#25D366] px-4 text-cocoa shadow-lift ring-1 ring-black/5 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:pl-5 sm:pr-5"
          >
            <MessageCircle aria-hidden="true" className="h-6 w-6 shrink-0" />
            <span className="hidden font-sans text-sm font-semibold sm:inline">{label}</span>
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

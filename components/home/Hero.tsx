'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import type { ImageSlot } from '@/types';
import { BrandImage } from '@/components/ui/BrandImage';
import { Button } from '@/components/ui/Button';
import { useIsDesktop } from '@/hooks/useMediaQuery';

const ease = [0.21, 0.68, 0.35, 1] as const;

/** Full-bleed opening frame: slow parallax on the image, gentle rise on the copy. */
export function Hero({
  image,
  whatsappHref,
  exploreHref = '#mithai-candles',
}: {
  image: ImageSlot;
  whatsappHref: string;
  exploreHref?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  /**
   * Scroll-linked parallax is desktop-only: on phones it stutters against
   * native scrolling and costs battery for an effect nobody notices.
   */
  const isDesktop = useIsDesktop();
  const parallax = isDesktop && !reduced;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', parallax ? '16%' : '0%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, parallax ? 1.08 : 1]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-cream pb-12 pt-28 sm:min-h-[92svh] sm:pb-20 sm:pt-32 lg:items-center lg:pb-28 lg:pt-36"
    >
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 -z-20 will-change-transform">
        <BrandImage slot={image} fill priority showLabel={false} sizes="100vw" imageClassName="object-cover" />
      </motion.div>

      {/* Scrims: keep the header and headline legible over any photograph */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(253,248,240,0.92)_0%,rgba(253,248,240,0.35)_22%,rgba(253,248,240,0.15)_48%,rgba(253,248,240,0.86)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 lg:bg-[linear-gradient(100deg,rgba(253,248,240,0.94)_0%,rgba(253,248,240,0.72)_38%,rgba(253,248,240,0.05)_72%)]" />

      <div className="container relative">
        <div className="max-w-2xl">
          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-terracotta-deep"
          >
            <Flame />
            Handmade in Pune
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-4 font-display text-display-hero font-bold text-terracotta sm:mt-5"
          >
            Mithai you can light.
            <span className="block text-cocoa">Memories you can keep.</span>
          </motion.h1>

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-4 max-w-xl text-body-sm leading-relaxed text-cocoa-soft sm:mt-6 sm:text-[1.08rem]"
          >
            Premium handmade candles, resin art &amp; décor — made by hand in Pune.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
          >
            <Button
              href={whatsappHref}
              external
              size="lg"
              className="w-full sm:w-auto"
              icon={<MessageCircle className="h-[18px] w-[18px]" />}
            >
              Order on WhatsApp
            </Button>
            <Button
              href={exploreHref}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
            >
              Explore the Collection
            </Button>
          </motion.div>

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mt-6 font-sans text-[0.8rem] leading-relaxed text-cocoa-soft sm:mt-8"
          >
            100% soy wax · Fully customisable · Bulk orders from 20 pieces
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/** Small flame accent — the brand's one piece of restless motion. */
function Flame() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 origin-bottom text-sun motion-safe:animate-flicker"
      fill="currentColor"
    >
      <path d="M12 2c2.5 3.2 1.2 5.2.3 6.6-.7 1.1-1.3 2-1.3 3.2a2.4 2.4 0 0 0 2.4 2.4c1.5 0 2.4-1 2.7-2.2 1.3 1.4 2 3 2 4.6A6.1 6.1 0 0 1 12 22a6.1 6.1 0 0 1-6.1-6.1c0-3.3 2-5.4 3.6-7.2C11.2 6.7 12.6 5 12 2Z" />
    </svg>
  );
}

import { Play } from 'lucide-react';
import type { VideoSlot } from '@/types';
import { aspectClass, cn } from '@/lib/utils';
import { Sunburst } from '@/components/brand/Ornaments';

/**
 * Muted, looping studio footage. Renders an on-brand placeholder until a
 * source is supplied — drop `slot.src` in and the real reel plays.
 */
export function BrandVideo({ slot, className }: { slot: VideoSlot; className?: string }) {
  return (
    <div
      data-slot={slot.id}
      className={cn('relative isolate overflow-hidden rounded-3xl bg-cream', aspectClass[slot.aspect], className)}
    >
      {slot.src ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={slot.poster?.src}
          aria-label={slot.label}
        >
          <source src={slot.src} type="video/mp4" />
        </video>
      ) : (
        <div
          role="img"
          aria-label={`${slot.label} — footage to be supplied`}
          className="absolute inset-0 bg-[linear-gradient(160deg,#FFF6E8_0%,#FBDDB8_50%,#F3B778_100%)]"
        >
          <Sunburst
            rays={26}
            className="absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 text-sun opacity-[0.14]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/85 text-terracotta-deep shadow-warm ring-1 ring-terracotta/20">
              <Play aria-hidden="true" className="ml-0.5 h-6 w-6" fill="currentColor" />
            </span>
            <span className="h-px w-10 bg-gold/60" />
            <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.24em] text-terracotta-deep/80">
              {slot.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

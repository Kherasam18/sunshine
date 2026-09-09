import { cn } from '@/lib/utils';

/**
 * Placeholder logo mark: circular keyline, watercolour-style orange sun
 * setting over rippled water. Drawn from the client's existing Instagram
 * logo — real vector source files are still to be supplied (see
 * ASSETS-MANIFEST.md).
 */
export function LogoMark({
  className,
  flicker = false,
  title = 'Sunshine Creations',
}: {
  className?: string;
  /** Adds the gentle flame-flicker animation to the sun. */
  flicker?: boolean;
  /** Pass an empty string when the mark is purely decorative. */
  title?: string;
}) {
  const decorative = title.length === 0;
  return (
    <svg
      viewBox="0 0 200 200"
      {...(decorative ? { 'aria-hidden': true, focusable: false } : { role: 'img', 'aria-label': title })}
      className={cn('h-10 w-10', className)}
    >
      <defs>
        <radialGradient id="sc-sun" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#F9B65C" />
          <stop offset="55%" stopColor="#F4922B" />
          <stop offset="100%" stopColor="#D2691E" />
        </radialGradient>
        <clipPath id="sc-disc">
          <circle cx="100" cy="100" r="88" />
        </clipPath>
      </defs>

      {/* Circular keyline */}
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="4" />

      <g clipPath="url(#sc-disc)">
        {/* Setting sun */}
        <circle
          cx="100"
          cy="96"
          r="42"
          fill="url(#sc-sun)"
          className={cn('origin-center', flicker && 'motion-safe:animate-flicker')}
          style={{ transformBox: 'fill-box' }}
        />
        {/* Soft watercolour bleed */}
        <circle cx="100" cy="96" r="56" fill="#F4922B" opacity="0.16" />

        {/* Rippled water */}
        <g stroke="#D2691E" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M34 118c12-7 24-7 36 0s24 7 36 0 24-7 36 0 24 7 36 0" opacity="0.85" />
          <path d="M28 136c12-7 24-7 36 0s24 7 36 0 24-7 36 0 24 7 36 0" opacity="0.6" />
          <path d="M34 154c12-7 24-7 36 0s24 7 36 0 24-7 36 0 24 7 36 0" opacity="0.38" />
          <path d="M46 171c10-6 20-6 30 0s20 6 30 0 20-6 30 0" opacity="0.2" />
        </g>
      </g>
    </svg>
  );
}

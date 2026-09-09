import { cn } from '@/lib/utils';

/**
 * Decorative brand motifs derived from the logo: a sunburst wash, single
 * stroke marigold and sunflower line drawings, and a rangoli corner.
 * All are purely decorative — hidden from assistive technology.
 */

/** Soft radiating rays used as a background wash behind feature sections. */
export function Sunburst({
  className,
  rays = 24,
  spin = false,
}: {
  className?: string;
  rays?: number;
  spin?: boolean;
}) {
  const wedges = Array.from({ length: rays }, (_, i) => (i * 360) / rays);
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
      className={cn('pointer-events-none select-none', spin && 'motion-safe:animate-slow-spin', className)}
    >
      <g fill="currentColor">
        {wedges.map((angle) => (
          <path
            key={angle}
            d="M200 200 L196 6 L204 6 Z"
            transform={`rotate(${angle} 200 200)`}
            opacity={angle % 30 === 0 ? 0.9 : 0.45}
          />
        ))}
      </g>
    </svg>
  );
}

/** Single-stroke marigold — the centre of the section dividers. */
export function Marigold({ className }: { className?: string }) {
  const petals = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={cn('h-8 w-8', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    >
      {petals.map((angle) => (
        <ellipse key={angle} cx="32" cy="14" rx="5" ry="9" transform={`rotate(${angle} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="7" />
      <circle cx="32" cy="32" r="3" />
    </svg>
  );
}

/** Sunflower sprig with a leaf — used at section corners and dividers. */
export function Sunflower({ className }: { className?: string }) {
  const petals = Array.from({ length: 14 }, (_, i) => (i * 360) / 14);
  return (
    <svg
      viewBox="0 0 64 80"
      aria-hidden="true"
      focusable="false"
      className={cn('h-10 w-8', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    >
      {petals.map((angle) => (
        <path
          key={angle}
          d="M32 24 C28 16 28 10 32 5 C36 10 36 16 32 24 Z"
          transform={`rotate(${angle} 32 24)`}
        />
      ))}
      <circle cx="32" cy="24" r="7" />
      <path d="M32 31v45" />
      <path d="M32 52c9-2 13-8 14-16-8 0-13 6-14 16Z" />
      <path d="M32 66c-8-2-12-7-13-14 7 0 12 5 13 14Z" />
    </svg>
  );
}

/** Quarter mandala for feature-section corners. Keep opacity very low. */
export function RangoliCorner({ className }: { className?: string }) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 90) / 8);
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={cn('h-40 w-40', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <g>
        <circle cx="0" cy="0" r="60" />
        <circle cx="0" cy="0" r="92" />
        <circle cx="0" cy="0" r="128" />
        <circle cx="0" cy="0" r="164" />
        {spokes.map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path d="M60 0 L92 0" />
            <ellipse cx="110" cy="0" rx="18" ry="7" />
            <path d="M128 0 L164 0" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Thin gold hairline rule that fades at both ends. */
export function GoldRule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('h-px w-full bg-gold-rule opacity-60', className)} />;
}

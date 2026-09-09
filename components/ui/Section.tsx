import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { RangoliCorner, Sunburst } from '@/components/brand/Ornaments';

type Tone = 'cream' | 'ivory' | 'warm' | 'deep';

const tones: Record<Tone, string> = {
  cream: 'bg-cream text-cocoa',
  ivory: 'bg-ivory text-cocoa',
  /** Feature sections — a barely-there warm wash over cream. */
  warm: 'bg-[linear-gradient(180deg,#FDF8F0_0%,#FDF1E2_45%,#FDF8F0_100%)] text-cocoa',
  deep: 'bg-[linear-gradient(135deg,#7A3410_0%,#A6440F_55%,#C0561A_100%)] text-cream',
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  /** Vertical rhythm. `tight` for strips, `roomy` for feature sections. */
  spacing?: 'tight' | 'default' | 'roomy' | 'none';
  className?: string;
  containerClassName?: string;
  /** Adds the logo sunburst as a background wash. */
  sunburst?: boolean;
  /** Adds low-opacity rangoli corner ornaments. */
  rangoli?: boolean;
  /** Renders children full-bleed, without the max-width container. */
  bleed?: boolean;
  labelledBy?: string;
  children: ReactNode;
}

const spacings = {
  none: '',
  tight: 'py-7 sm:py-12',
  default: 'py-10 sm:py-20 lg:py-24',
  roomy: 'py-12 sm:py-24 lg:py-32',
};

/** The page's structural building block: tone, rhythm, ornament, container. */
export function Section({
  id,
  tone = 'cream',
  spacing = 'default',
  className,
  containerClassName,
  sunburst = false,
  rangoli = false,
  bleed = false,
  labelledBy,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative isolate overflow-hidden', tones[tone], spacings[spacing], className)}
    >
      {sunburst ? (
        <Sunburst
          rays={30}
          className="absolute left-1/2 top-0 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-sun opacity-[0.07]"
        />
      ) : null}

      {rangoli ? (
        <>
          <RangoliCorner className="absolute -left-4 top-6 -z-10 h-48 w-48 text-gold opacity-[0.13]" />
          <RangoliCorner className="absolute -right-4 bottom-6 -z-10 h-48 w-48 rotate-180 text-gold opacity-[0.13]" />
        </>
      ) : null}

      {bleed ? children : <div className={cn('container', containerClassName)}>{children}</div>}
    </section>
  );
}

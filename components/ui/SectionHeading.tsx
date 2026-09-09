import { cn } from '@/lib/utils';
import { Marigold } from '@/components/brand/Ornaments';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  /** `deep` inverts the colours for use on the terracotta banner. */
  tone?: 'default' | 'deep';
  /** Marigold + hairline ornament above the eyebrow. */
  ornament?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'default',
  ornament = true,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';
  const deep = tone === 'deep';

  return (
    <Reveal className={cn('flex flex-col', centered ? 'items-center text-center' : 'items-start text-left', className)}>
      {ornament ? (
        <span
          aria-hidden="true"
          className={cn('mb-5 flex items-center gap-3', deep ? 'text-cream/60' : 'text-gold')}
        >
          <span className={cn('h-px w-10 sm:w-16', deep ? 'bg-cream/40' : 'bg-gold/70')} />
          <Marigold className="h-6 w-6" />
          <span className={cn('h-px w-10 sm:w-16', deep ? 'bg-cream/40' : 'bg-gold/70')} />
        </span>
      ) : null}

      {eyebrow ? (
        <p
          className={cn(
            'mb-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.28em]',
            deep ? 'text-cream/80' : 'text-terracotta-deep',
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        id={id}
        className={cn(
          'font-display text-display-2 font-bold',
          deep ? 'text-cream' : 'text-terracotta',
        )}
      >
        {title}
      </h2>

      {intro ? (
        <p
          className={cn(
            'mt-4 max-w-prose text-body-sm leading-relaxed sm:mt-5 sm:text-base',
            centered && 'mx-auto',
            deep ? 'text-cream/85' : 'text-cocoa-soft',
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

import { cn } from '@/lib/utils';
import { Marigold, Sunflower } from '@/components/brand/Ornaments';

type Motif = 'marigold' | 'sunflower' | 'rule';

/**
 * Section divider: a thin gold hairline with a single-stroke flower at the
 * centre. Purely decorative.
 */
export function Divider({
  motif = 'marigold',
  className,
  tone = 'gold',
}: {
  motif?: Motif;
  className?: string;
  tone?: 'gold' | 'terracotta' | 'cream';
}) {
  const colour =
    tone === 'gold' ? 'text-gold' : tone === 'terracotta' ? 'text-terracotta/70' : 'text-cream/60';
  const rule =
    tone === 'gold'
      ? 'via-gold/70'
      : tone === 'terracotta'
        ? 'via-terracotta/50'
        : 'via-cream/40';

  return (
    <div aria-hidden="true" className={cn('flex items-center justify-center gap-4', colour, className)}>
      <span className={cn('h-px flex-1 bg-gradient-to-r from-transparent to-transparent', rule)} />
      {motif === 'marigold' ? <Marigold className="h-7 w-7 shrink-0" /> : null}
      {motif === 'sunflower' ? <Sunflower className="h-9 w-7 shrink-0" /> : null}
      {motif === 'rule' ? <span className="h-1.5 w-1.5 rotate-45 bg-current" /> : null}
      <span className={cn('h-px flex-1 bg-gradient-to-r from-transparent to-transparent', rule)} />
    </div>
  );
}

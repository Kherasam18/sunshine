import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'sun' | 'gold' | 'sage' | 'blush' | 'outline' | 'onDark';

const tones: Record<Tone, string> = {
  sun: 'bg-sun/20 text-terracotta-deep ring-1 ring-inset ring-sun/40',
  gold: 'bg-gold/15 text-gold-deep ring-1 ring-inset ring-gold/40',
  sage: 'bg-sage/20 text-[#4A5A3B] ring-1 ring-inset ring-sage/40',
  blush: 'bg-blush/35 text-[#8E4A50] ring-1 ring-inset ring-blush',
  outline: 'bg-ivory/80 text-cocoa-soft ring-1 ring-inset ring-cocoa/15',
  onDark: 'bg-cream/15 text-cream ring-1 ring-inset ring-cream/30',
};

export function Badge({
  children,
  tone = 'sun',
  className,
  icon,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[0.68rem] font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {icon ? <span aria-hidden="true" className="shrink-0">{icon}</span> : null}
      {children}
    </span>
  );
}

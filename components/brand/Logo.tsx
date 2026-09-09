import Link from 'next/link';
import { LogoMark } from './LogoMark';
import { cn } from '@/lib/utils';

const sizes = {
  sm: { mark: 'h-9 w-9', script: 'text-xl', caps: 'text-[0.5rem] tracking-[0.34em]' },
  md: { mark: 'h-11 w-11', script: 'text-2xl', caps: 'text-[0.55rem] tracking-[0.36em]' },
  lg: { mark: 'h-16 w-16', script: 'text-4xl', caps: 'text-[0.7rem] tracking-[0.38em]' },
};

/**
 * Full logo lockup — mark plus wordmark. The wordmark is live text rather
 * than outlines so it stays crisp at every size; swap for the client's real
 * vector lockup when the source files arrive.
 */
export function Logo({
  size = 'md',
  inverted = false,
  flicker = false,
  href = '/',
  className,
}: {
  size?: keyof typeof sizes;
  inverted?: boolean;
  flicker?: boolean;
  href?: string | null;
  className?: string;
}) {
  const s = sizes[size];

  const content = (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark className={cn(s.mark, inverted ? 'text-cream' : 'text-cocoa')} flicker={flicker} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-semibold italic leading-none',
            s.script,
            inverted ? 'text-cream' : 'text-terracotta',
          )}
        >
          Sunshine
        </span>
        <span
          className={cn(
            'mt-1 font-display font-semibold uppercase leading-none',
            s.caps,
            inverted ? 'text-cream/70' : 'text-cocoa-soft',
          )}
        >
          Creations
        </span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label="Sunshine Creations — home"
      className="inline-flex min-h-[44px] items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
    >
      {content}
    </Link>
  );
}

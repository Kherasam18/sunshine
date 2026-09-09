import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'link';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-medium transition ' +
  'duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60';

/** Orange fills always carry cocoa text — white on #F4922B fails AA. */
const variants: Record<Variant, string> = {
  primary: 'bg-sun text-cocoa shadow-warm hover:bg-[#EB851F] hover:shadow-lift active:translate-y-px',
  secondary:
    'border border-terracotta/35 bg-ivory text-terracotta-deep hover:border-terracotta hover:bg-terracotta/10 active:translate-y-px',
  ghost: 'text-cocoa hover:text-terracotta-deep',
  onDark:
    'bg-cream text-terracotta-deep shadow-warm hover:bg-white hover:shadow-lift active:translate-y-px focus-visible:ring-cream focus-visible:ring-offset-terracotta-dark',
  /**
   * Unfilled secondary action. Two stacked pills read heavy on a phone, so the
   * lesser action becomes a link — while keeping a 44px hit area for touch.
   */
  link: 'text-terracotta-deep underline decoration-terracotta/30 underline-offset-4 hover:decoration-terracotta',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[40px] px-4 text-sm',
  md: 'min-h-[48px] px-6 text-[0.95rem]',
  lg: 'min-h-[54px] px-8 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Trailing icon node, e.g. an arrow or the WhatsApp mark. */
  icon?: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps> & { href?: undefined };

type AnchorProps = CommonProps & {
  href: string;
  /** Opens in a new tab with rel="noreferrer" — used for WhatsApp and socials. */
  external?: boolean;
  'aria-label'?: string;
};

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = 'primary', size = 'md', className, children, icon } = props;
  // `link` opts out of the pill sizing but keeps the 44px touch minimum.
  const classes = cn(
    base,
    variants[variant],
    variant === 'link' ? 'min-h-[44px] px-1' : sizes[size],
    className,
  );
  const inner = (
    <>
      {children}
      {icon ? <span aria-hidden="true" className="shrink-0">{icon}</span> : null}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, external, ...rest } = props as AnchorProps;
    const linkProps = external ? { target: '_blank', rel: 'noreferrer' } : {};
    if (external || href.startsWith('http')) {
      return (
        <a href={href} className={classes} aria-label={rest['aria-label']} {...linkProps}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={rest['aria-label']}>
        {inner}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, icon: _i, ...rest } = props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}

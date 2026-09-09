import type { AspectRatio } from '@/types';

/** Minimal class joiner — keeps a clsx dependency off the tree. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Static Tailwind classes per ratio. Written out in full (not interpolated)
 * so Tailwind's JIT scanner can see every one of them.
 */
export const aspectClass: Record<AspectRatio, string> = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '3:4': 'aspect-[3/4]',
  '3:2': 'aspect-[3/2]',
  '16:9': 'aspect-[16/9]',
  '21:9': 'aspect-[21/9]',
  '9:16': 'aspect-[9/16]',
};

/** Recommended export dimensions, mirrored in ASSETS-MANIFEST.md. */
export const recommendedSize: Record<AspectRatio, string> = {
  '1:1': '1400 × 1400',
  '4:5': '1200 × 1500',
  '3:4': '1200 × 1600',
  '3:2': '1800 × 1200',
  '16:9': '2400 × 1350',
  '21:9': '2400 × 1030',
  '9:16': '1080 × 1920',
};

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

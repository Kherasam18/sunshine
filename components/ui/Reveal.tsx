'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds when revealing a group by hand. */
  delay?: number;
  /** Travel distance in px. The house default is a gentle 24. */
  y?: number;
  as?: ElementType;
  once?: boolean;
}

/**
 * Fade-and-rise on scroll. Honours prefers-reduced-motion by rendering the
 * content immediately with no transform.
 */
export function Reveal({ children, className, delay = 0, y = 24, as, once = true }: RevealProps) {
  const reduced = useReducedMotion();
  const Component = (motion[(as ?? 'div') as 'div'] ?? motion.div) as ElementType;

  return (
    <Component
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.68, 0.35, 1] }}
    >
      {children}
    </Component>
  );
}

/**
 * Parent wrapper that staggers its Reveal-like children. Children should use
 * `RevealItem` so the parent controls timing.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  ...rest
}: { children: ReactNode; className?: string; stagger?: number } & HTMLMotionProps<'div'>) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: reduced ? 0 : stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.68, 0.35, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

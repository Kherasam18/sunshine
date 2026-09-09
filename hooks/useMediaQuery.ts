'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media query hook. Starts false so the server and first client
 * render agree, then updates after mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True from the `lg` breakpoint up — the gate for scroll-linked effects. */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

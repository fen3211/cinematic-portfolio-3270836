import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user has requested reduced motion through system preferences.
 * Adheres to WCAG 2.1/2.2 AAA accessibility requirements.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  return prefersReducedMotion;
}

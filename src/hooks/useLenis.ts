import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface UseLenisOptions {
  duration?: number;
  smoothWheel?: boolean;
  enabled?: boolean;
}

export function useLenis(options: UseLenisOptions = {}) {
  const { duration = 1.2, smoothWheel = true, enabled = true } = options;
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Register ScrollTrigger plugin if available
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', handleScroll);

    // Synchronize animation ticker with GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [duration, smoothWheel, enabled]);

  const scrollTo = (target: string | number | HTMLElement, scrollOptions?: Parameters<Lenis['scrollTo']>[1]) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, scrollOptions);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
  };
}

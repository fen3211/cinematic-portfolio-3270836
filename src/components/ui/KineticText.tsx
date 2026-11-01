import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface KineticTextProps {
  children: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  splitBy?: 'chars' | 'words';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  scrollStart?: string;
}

export const KineticText: React.FC<KineticTextProps> = ({
  children,
  tag = 'div',
  splitBy = 'chars',
  className = '',
  delay = 0,
  duration = 0.95,
  stagger = 0.03,
  triggerOnScroll = false,
  scrollStart = 'top 88%',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tokens = el.querySelectorAll('.kinetic-token');
      if (tokens.length === 0) return;

      if (prefersReducedMotion) {
        gsap.set(tokens, { y: '0%', opacity: 1 });
        return;
      }

      gsap.set(tokens, { y: '105%', opacity: 0 });

      const animProps: gsap.TweenVars = {
        y: '0%',
        opacity: 1,
        duration,
        ease: 'power4.out',
        stagger,
        delay,
      };

      if (triggerOnScroll) {
        gsap.to(tokens, {
          ...animProps,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            once: true,
          },
        });
      } else {
        gsap.to(tokens, animProps);
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [children, splitBy, delay, duration, stagger, triggerOnScroll, scrollStart, prefersReducedMotion]);

  // Tokenization: Keep words intact for clean wrapping, split characters within words
  const words = children.split(' ');

  const renderContent = () => {
    if (splitBy === 'words') {
      return words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block overflow-hidden align-top leading-tight mr-[0.28em] last:mr-0"
        >
          <span className="kinetic-token inline-block transform-gpu will-change-transform">
            {word}
          </span>
        </span>
      ));
    }

    // splitBy === 'chars'
    return words.map((word, wordIndex) => (
      <span
        key={wordIndex}
        className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0"
      >
        {Array.from(word).map((char, charIndex) => (
          <span
            key={charIndex}
            className="inline-block overflow-hidden align-top leading-tight"
          >
            <span className="kinetic-token inline-block transform-gpu will-change-transform">
              {char}
            </span>
          </span>
        ))}
      </span>
    ));
  };

  const Component = tag as React.ElementType;

  return (
    <Component
      ref={containerRef}
      className={`inline-block ${className}`}
      aria-label={children}
    >
      <span aria-hidden="true" className="inline-block">
        {renderContent()}
      </span>
    </Component>
  );
};

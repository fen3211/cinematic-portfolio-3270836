import React, { useEffect, useRef, useState } from 'react';
import { useCursorStore } from '../../store/useCursorStore';
import { playLensClick } from '../../utils/audioSynth';
import { CursorMode } from '../../types';

interface LiquidLensCursorProps {
  lerpFactor?: number; // ~0.14 spring responsiveness
}

export const LiquidLensCursor: React.FC<LiquidLensCursorProps> = ({
  lerpFactor = 0.14,
}) => {
  const { mode: storeMode, label: storeLabel, secondaryLabel: storeSecondaryLabel } = useCursorStore();

  const [activeMode, setActiveMode] = useState<CursorMode>('default');
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [activeSecondaryLabel, setActiveSecondaryLabel] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Direct DOM Refs to guarantee 60-120fps zero-lag execution without React state overhead
  const cursorContainerRef = useRef<HTMLDivElement | null>(null);
  const lensBevelRef = useRef<HTMLDivElement | null>(null);

  // Physics state
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ vx: 0, vy: 0 });
  const springScale = useRef(1.0);
  const currentScale = useRef(1.0);
  const targetDiameter = useRef(36);
  const currentDiameter = useRef(36);
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number>(0);

  // Synchronize store overrides with local state
  useEffect(() => {
    if (storeMode && storeMode !== 'default') {
      setActiveMode(storeMode);
      setActiveLabel(storeLabel);
      setActiveSecondaryLabel(storeSecondaryLabel || null);
    }
  }, [storeMode, storeLabel, storeSecondaryLabel]);

  // Determine diameter by mode
  useEffect(() => {
    switch (activeMode) {
      case 'film':
        targetDiameter.current = 120;
        break;
      case 'link':
      case 'hover':
        targetDiameter.current = 64;
        break;
      case 'shockwave':
        targetDiameter.current = 96;
        break;
      case 'hidden':
        targetDiameter.current = 0;
        break;
      case 'default':
      default:
        targetDiameter.current = 36;
        break;
    }
  }, [activeMode]);

  // Touch screen and hardware check
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isCoarse || hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Event Listeners: Mouse Movement & Interaction Target Detection
  useEffect(() => {
    if (isTouchDevice || typeof window === 'undefined') return;

    const handlePointerMove = (e: PointerEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button === 0) {
        setIsMouseDown(true);
        springScale.current = 0.86;
        playLensClick();
      }
    };

    const handlePointerUp = () => {
      setIsMouseDown(false);
      springScale.current = 1.0;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Auto-detect interactive elements under cursor
    const handleElementOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check explicit data-cursor attributes
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const modeAttr = cursorTarget.getAttribute('data-cursor') as CursorMode;
        const labelAttr = cursorTarget.getAttribute('data-cursor-label');
        const secLabelAttr = cursorTarget.getAttribute('data-cursor-secondary');

        setActiveMode(modeAttr || 'link');
        setActiveLabel(labelAttr || (modeAttr === 'film' ? 'VIEW FILM' : null));
        setActiveSecondaryLabel(secLabelAttr || null);
        return;
      }

      // Check interactive links, buttons, inputs
      const interactiveTarget = target.closest('a, button, input, select, textarea, [role="button"]');
      if (interactiveTarget) {
        setActiveMode('link');
        setActiveLabel(null);
        setActiveSecondaryLabel(null);
        return;
      }

      // Revert to store mode or default
      if (!storeMode || storeMode === 'default') {
        setActiveMode('default');
        setActiveLabel(null);
        setActiveSecondaryLabel(null);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementOver, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementOver);
    };
  }, [isTouchDevice, isVisible, storeMode]);

  // 60-120 FPS RAF Physics Engine
  useEffect(() => {
    if (isTouchDevice || typeof window === 'undefined') return;

    const renderLoop = (time: number) => {
      const dt = lastTime.current ? Math.min((time - lastTime.current) / 1000, 0.1) : 0.016;
      lastTime.current = time;

      // Frame-rate independent spring interpolation
      const adjustedLerp = 1 - Math.pow(1 - lerpFactor, dt * 60);

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      velocity.current.vx = dx * adjustedLerp;
      velocity.current.vy = dy * adjustedLerp;

      currentPos.current.x += velocity.current.vx;
      currentPos.current.y += velocity.current.vy;

      // Diameter and Scale interpolation
      const diamDiff = targetDiameter.current - currentDiameter.current;
      currentDiameter.current += diamDiff * adjustedLerp * 1.2;

      const scaleDiff = springScale.current - currentScale.current;
      currentScale.current += scaleDiff * adjustedLerp * 2.0;

      // Apply hardware-accelerated transform to cursor container
      if (cursorContainerRef.current) {
        const x = currentPos.current.x;
        const y = currentPos.current.y;
        const d = currentDiameter.current;
        const s = currentScale.current;

        // Inertial aspect elongation along movement vector
        const speed = Math.hypot(velocity.current.vx, velocity.current.vy);
        const angle = Math.atan2(velocity.current.vy, velocity.current.vx);
        const stretch = Math.min(speed * 0.008, 0.2);

        cursorContainerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) rotate(${angle}rad) scale(${s * (1 + stretch)}, ${s * (1 - stretch * 0.5)}) rotate(${-angle}rad)`;
        cursorContainerRef.current.style.width = `${d}px`;
        cursorContainerRef.current.style.height = `${d}px`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isTouchDevice, lerpFactor]);

  if (isTouchDevice || activeMode === 'hidden') {
    return null;
  }

  return (
    <>
      {/* SVG Chromatic Aberration & Magnification Filter Pipeline */}
      <svg className="fixed pointer-events-none w-0 h-0 opacity-0" aria-hidden="true">
        <defs>
          <filter id="lens-chromatic-refract" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Main Cursor Element */}
      <div
        ref={cursorContainerRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: `${targetDiameter.current}px`,
          height: `${targetDiameter.current}px`,
          transform: `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0px) translate(-50%, -50%)`,
        }}
      >
        {/* Optical Glass Lens Disk */}
        <div
          ref={lensBevelRef}
          className={`relative w-full h-full rounded-full flex items-center justify-center transition-colors duration-200 select-none ${
            activeMode === 'film'
              ? 'bg-[#111111]/40 backdrop-blur-[4px]'
              : activeMode === 'link'
              ? 'bg-[#E09F3E]/10 backdrop-blur-[2px]'
              : 'bg-[#F5F5F5]/5 backdrop-blur-[1.5px]'
          }`}
          style={{
            // 1px specular highlight border & delicate inner shadow
            border:
              activeMode === 'film'
                ? '1px solid rgba(245, 245, 245, 0.4)'
                : activeMode === 'link'
                ? '1px solid rgba(224, 159, 62, 0.7)'
                : '1px solid rgba(245, 245, 245, 0.28)',
            boxShadow:
              activeMode === 'film'
                ? 'inset 0 0 16px rgba(255, 255, 255, 0.08), 0 0 16px rgba(0, 0, 0, 0.6)'
                : activeMode === 'link'
                ? 'inset 0 0 12px rgba(224, 159, 62, 0.15), 0 0 12px rgba(224, 159, 62, 0.25)'
                : 'inset 0 0 8px rgba(255, 255, 255, 0.04)',
          }}
        >
          {/* Chromatic Aberration Fringe Layer: Red Split */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-screen"
            style={{
              transform: 'translate(-0.75px, -0.5px)',
              border: '1px solid rgba(217, 56, 41, 0.45)', // Red chromatic fringe
            }}
          />

          {/* Chromatic Aberration Fringe Layer: Cyan Split */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-screen"
            style={{
              transform: 'translate(0.75px, 0.5px)',
              border: '1px solid rgba(74, 124, 155, 0.45)', // Cold cyan chromatic fringe
            }}
          />

          {/* MODE 1: DEFAULT OPTICAL RETICLE */}
          {activeMode === 'default' && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Hairline Crosshairs */}
              <div className="absolute top-0 bottom-0 w-[1px] bg-[#888888]/40 left-1/2 -translate-x-1/2" />
              <div className="absolute left-0 right-0 h-[1px] bg-[#888888]/40 top-1/2 -translate-y-1/2" />

              {/* Center Optical Aperture Dot */}
              <div
                className={`w-1.5 h-1.5 rounded-full transition-transform duration-150 ${
                  isMouseDown ? 'scale-150 bg-[#E09F3E]' : 'bg-[#F5F5F5]'
                }`}
              />

              {/* 4 Peripheral Viewfinder Tick Marks */}
              <div className="absolute top-0.5 w-1 h-[1px] bg-[#F5F5F5]/60" />
              <div className="absolute bottom-0.5 w-1 h-[1px] bg-[#F5F5F5]/60" />
              <div className="absolute left-0.5 h-1 w-[1px] bg-[#F5F5F5]/60" />
              <div className="absolute right-0.5 h-1 w-[1px] bg-[#F5F5F5]/60" />
            </div>
          )}

          {/* MODE 2: FILM REEL VIEW MODE (120px Lens) */}
          {activeMode === 'film' && (
            <div className="flex flex-col items-center justify-center text-center p-2">
              <span className="font-mono text-[8px] text-[#888888] tracking-widest uppercase mb-0.5">
                {activeSecondaryLabel || '[ 2.39:1 ]'}
              </span>

              <span className="font-mono text-[9px] font-semibold text-[#F5F5F5] tracking-[0.25em] uppercase animate-pulse">
                {activeLabel || 'VIEW FILM'}
              </span>

              <span className="font-mono text-[7px] text-[#E09F3E] tracking-wider uppercase mt-1">
                24 FPS T1.4
              </span>

              {/* Outer Lens Calibrated Dial Marks */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[#555555]/30 pointer-events-none" />
            </div>
          )}

          {/* MODE 3: LINK / INTERACTIVE FOCUS RING (64px) */}
          {(activeMode === 'link' || activeMode === 'hover') && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Corner Focus Brackets */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#E09F3E]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#E09F3E]" />
              <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#E09F3E]" />
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#E09F3E]" />

              {/* Center Micro Dot */}
              <div className="w-1 h-1 rounded-full bg-[#E09F3E]" />

              {activeLabel && (
                <span className="absolute -bottom-5 font-mono text-[8px] text-[#E09F3E] tracking-widest uppercase whitespace-nowrap bg-[#080808]/90 px-1 py-0.5 border border-[#292929]">
                  {activeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

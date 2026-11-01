import { useState, useEffect, useRef } from 'react';

export interface MousePositionState {
  x: number;
  y: number;
  normalizedX: number; // WebGL NDC: -1 (left) to +1 (right)
  normalizedY: number; // WebGL NDC: +1 (top) to -1 (bottom)
  progressX: number;   // 0 (left) to 1 (right)
  progressY: number;   // 0 (top) to 1 (bottom)
  velocityX: number;   // Pixels per millisecond
  velocityY: number;   // Pixels per millisecond
  speed: number;       // Magnitude of velocity
  angle: number;       // Direction in radians
  isInsideViewport: boolean;
}

export function useMousePosition(): MousePositionState {
  const [mousePosition, setMousePosition] = useState<MousePositionState>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    progressX: 0.5,
    progressY: 0.5,
    velocityX: 0,
    velocityY: 0,
    speed: 0,
    angle: 0,
    isInsideViewport: false,
  });

  const lastPosRef = useRef<{ x: number; y: number; time: number }>({
    x: 0,
    y: 0,
    time: 0,
  });

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let isInside = false;

    const handleMouseMove = (event: MouseEvent) => {
      currentX = event.clientX;
      currentY = event.clientY;
      isInside = true;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      setMousePosition((prev) => ({
        ...prev,
        isInsideViewport: false,
        velocityX: 0,
        velocityY: 0,
        speed: 0,
      }));
    };

    const handleMouseEnter = () => {
      isInside = true;
    };

    const updatePosition = () => {
      rafIdRef.current = null;
      const now = performance.now();
      const last = lastPosRef.current;

      const dt = last.time > 0 ? Math.max(1, now - last.time) : 16.67;
      const dx = currentX - last.x;
      const dy = currentY - last.y;

      const vx = dx / dt;
      const vy = dy / dt;
      const speed = Math.hypot(vx, vy);
      const angle = Math.atan2(dy, dx);

      lastPosRef.current = {
        x: currentX,
        y: currentY,
        time: now,
      };

      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;

      // WebGL standard NDC (-1 to 1)
      const normX = (currentX / w) * 2 - 1;
      const normY = -((currentY / h) * 2 - 1);

      setMousePosition({
        x: currentX,
        y: currentY,
        normalizedX: normX,
        normalizedY: normY,
        progressX: Math.min(Math.max(currentX / w, 0), 1),
        progressY: Math.min(Math.max(currentY / h, 0), 1),
        velocityX: vx,
        velocityY: vy,
        speed,
        angle,
        isInsideViewport: isInside,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return mousePosition;
}

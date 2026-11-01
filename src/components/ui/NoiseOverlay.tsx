import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NoiseOverlayProps {
  opacity?: number;
  fps?: number;
  className?: string;
}

/**
 * 35mm Emulsion Film Grain Overlay
 * Generates an authentic photochemical noise texture onto an un-interactive canvas layer.
 * Operates at 24fps cinematic cadence or static when prefers-reduced-motion is active.
 */
export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  opacity = 0.048,
  fps = 24,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Use a compact 256x256 buffer for ultra-fast rendering & zero GC pressure
    const patternSize = 256;
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) return;

    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const buffer32 = new Uint32Array(patternData.data.buffer);
    const bufferLen = buffer32.length;

    let animFrameId: number;
    let lastTime = 0;
    const frameInterval = 1000 / fps;

    const generateNoiseFrame = () => {
      // Direct 32-bit pixel buffer manipulation for instant CPU throughput
      for (let i = 0; i < bufferLen; i++) {
        // High-frequency subtle film grain distribution
        const val = (Math.random() * 255) | 0;
        // 0xAABBGGRR format: Alpha 255 with monochrome RGB
        buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }
      patternCtx.putImageData(patternData, 0, 0);

      // Fill visible canvas with the generated noise tile
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateNoiseFrame();
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    if (prefersReducedMotion) {
      generateNoiseFrame();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const renderLoop = (time: number) => {
      if (time - lastTime >= frameInterval) {
        lastTime = time;
        generateNoiseFrame();
      }
      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [fps, prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-40 select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full mix-blend-soft-light"
      />
    </div>
  );
};

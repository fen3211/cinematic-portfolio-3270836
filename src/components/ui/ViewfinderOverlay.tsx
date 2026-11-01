import React from 'react';

interface ViewfinderOverlayProps {
  showSafeGuides?: boolean;
  showCenterCrosshair?: boolean;
  aspectRatioText?: string;
  className?: string;
}

/**
 * ViewfinderOverlay: Camera framing ticks, 2.39:1 safe action guides,
 * and optical center reticle evoking an ARRI / Panavision cinematic monitor.
 */
export const ViewfinderOverlay: React.FC<ViewfinderOverlayProps> = ({
  showSafeGuides = true,
  showCenterCrosshair = true,
  aspectRatioText = '2.39:1 SCOPE',
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-20 select-none overflow-hidden p-6 md:p-10 lg:p-14 transition-opacity duration-700 ${className}`}
    >
      {/* Outer Viewfinder Frame Container */}
      <div className="relative h-full w-full">
        {/* Top-Left Corner Tick */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#888888]/40" />
        <div className="absolute top-2 left-2 text-[9px] font-mono tracking-widest text-[#555555]">
          TL
        </div>

        {/* Top-Right Corner Tick */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#888888]/40" />
        <div className="absolute top-2 right-2 text-[9px] font-mono tracking-widest text-[#555555]">
          TR
        </div>

        {/* Bottom-Left Corner Tick */}
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#888888]/40" />
        <div className="absolute bottom-2 left-2 text-[9px] font-mono tracking-widest text-[#555555]">
          BL
        </div>

        {/* Bottom-Right Corner Tick */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#888888]/40" />
        <div className="absolute bottom-2 right-2 text-[9px] font-mono tracking-widest text-[#555555]">
          BR
        </div>

        {/* Top Center Frame Guide Badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#555555]/80">
          <span className="h-2 w-[1px] bg-[#292929]" />
          <span>{aspectRatioText}</span>
          <span className="h-2 w-[1px] bg-[#292929]" />
        </div>

        {/* Bottom Center Safe Area Tag */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center space-x-3 text-[9px] font-mono tracking-widest text-[#555555]/60">
          <span>SAFE 90%</span>
          <span>·</span>
          <span>100% CROP</span>
        </div>

        {/* Safe Area Framing Lines (Subtle Hairline Guides) */}
        {showSafeGuides && (
          <div className="absolute inset-4 md:inset-8 border border-[#292929]/30 pointer-events-none">
            {/* 4 Inner Safe Tick Markers */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-[#888888]/30" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-[#888888]/30" />
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 h-4 w-[1px] bg-[#888888]/30" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 h-4 w-[1px] bg-[#888888]/30" />
          </div>
        )}

        {/* Center Optical Crosshair */}
        {showCenterCrosshair && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
            {/* Horizontal Hairline */}
            <div className="w-6 h-[1px] bg-[#F5F5F5]/20" />
            {/* Vertical Hairline */}
            <div className="absolute h-6 w-[1px] bg-[#F5F5F5]/20" />
            {/* Center Reticle Dot */}
            <div className="absolute w-[2px] h-[2px] bg-[#E09F3E]/70 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

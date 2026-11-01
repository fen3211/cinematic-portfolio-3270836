import React, { useState, useEffect } from 'react';
import { ArrowDownRight, Film } from 'lucide-react';
import { KineticText } from '../ui/KineticText';
import { CINEMATOGRAPHER_PROFILE } from '../../data/portfolioData';
import { playLensClick } from '../../utils/audioSynth';

interface HeroSectionProps {
  onExplore?: () => void;
  speed?: number;
  isTracking?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  speed = 0,
  isTracking = true,
}) => {
  const [heroTimecode, setHeroTimecode] = useState('00:00:00:00');

  // Rolling SMPTE 24fps timecode counter
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const totalFrames = frame % (24 * 60 * 60);
      const frames = totalFrames % 24;
      const totalSeconds = Math.floor(totalFrames / 24);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60) % 24;

      const pad = (n: number) => n.toString().padStart(2, '0');
      setHeroTimecode(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    playLensClick();
    onExplore?.();
  };

  return (
    <section
      id="hero"
      aria-label="Cinematic Portfolio Prologue"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-20 border-b border-[#292929] overflow-hidden"
    >
      {/* Background Cinematic Atmosphere Plate */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Subtle ambient video plate */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-75 scale-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-standing-in-a-dark-room-42861-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark Vignette and Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/90" />
        <div className="absolute inset-0 cinema-vignette opacity-80" />
      </div>

      {/* Top Camera Telemetry Sub-bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-mono text-[#888888] tracking-widest uppercase select-none">
        <div className="flex items-center space-x-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E09F3E]" />
          <span>SENSOR // ARRI LPL 36.70 × 25.54 MM</span>
          <span className="hidden sm:inline text-[#333333]">|</span>
          <span className="hidden sm:inline text-[#555555]">
            SHUTTER: 180.0° // KELVIN: 3200K
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>COLOR: ACES 1.3</span>
          <span className="hidden sm:inline text-[#333333]">·</span>
          <span className="hidden sm:inline">GAMMA: LOGC4</span>
          <span className="text-[#333333]">·</span>
          <span className="text-[#E09F3E] font-medium">EI: 800 BASE</span>
        </div>
      </div>

      {/* Center Masthead & Kinetic Typography */}
      <div className="my-auto py-12 max-w-7xl">
        <div className="mb-4 inline-flex items-center space-x-2 border border-[#292929] px-3 py-1 bg-[#111111]/80 font-mono text-[11px] text-[#888888] tracking-wider uppercase">
          <Film className="w-3.5 h-3.5 text-[#E09F3E]" />
          <span>DIRECTOR OF PHOTOGRAPHY ARCHIVE // 2024—2026</span>
        </div>

        {/* Monumental Headline with Kinetic Entrance Animation */}
        <div className="block">
          <KineticText
            tag="h1"
            splitBy="chars"
            delay={0.15}
            duration={1.05}
            stagger={0.035}
            className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-[#F5F5F5] uppercase leading-[0.92]"
          >
            {CINEMATOGRAPHER_PROFILE.name}
          </KineticText>
        </div>

        {/* Subtitle with Word-Split Entrance */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <KineticText
            tag="h2"
            splitBy="words"
            delay={0.4}
            duration={0.85}
            stagger={0.04}
            className="font-sans font-semibold text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#888888] uppercase"
          >
            CINEMATOGRAPHER // DIRECTOR OF PHOTOGRAPHY
          </KineticText>
          <span className="text-[#292929] hidden sm:inline">/</span>
          <span className="font-mono text-xs text-[#555555] tracking-widest">
            {CINEMATOGRAPHER_PROFILE.acronyms}
          </span>
        </div>

        {/* Auteur Philosophical Statement */}
        <p className="mt-6 font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#E09F3E] max-w-2xl font-normal leading-snug">
          &ldquo;{CINEMATOGRAPHER_PROFILE.logline}&rdquo;
        </p>
      </div>

      {/* Bottom Telemetry & Animated Scroll Cue */}
      <div className="flex flex-wrap items-end justify-between gap-6 pt-8 border-t border-[#292929]">
        <div className="max-w-md">
          <span className="font-mono text-[10px] tracking-widest text-[#555555] uppercase block mb-1">
            ANAMORPHIC GLASS ARSENAL
          </span>
          <p className="text-xs text-[#888888] font-mono leading-relaxed">
            Cooke Anamorphic /i Full Frame Plus SF · Panavision C-Series · Zeiss Super Speeds T1.3
          </p>
        </div>

        <div className="flex items-center space-x-6">
          {/* Real-time Cursor & Reticle Velocity Telemetry */}
          <div className="hidden md:block text-right font-mono text-[11px] text-[#555555] tracking-widest">
            <div>CURSOR VELOCITY: {speed.toFixed(2)} PX/MS</div>
            <div>
              OPTICAL RETICLE: {isTracking ? 'LOCKED // TRACKING' : 'IDLE // STANDBY'}
            </div>
          </div>

          {/* Interactive Scroll Action Button */}
          <button
            type="button"
            onClick={handleExploreClick}
            data-cursor="link"
            className="group flex items-center space-x-3 px-6 py-3.5 border border-[#292929] hover:border-[#E09F3E] bg-[#111111] hover:bg-[#E09F3E] hover:text-[#080808] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#E09F3E]"
          >
            <div className="text-left">
              <span className="font-mono text-xs tracking-widest uppercase font-semibold block">
                EXPLORE REEL
              </span>
              <span className="font-mono text-[9px] text-[#888888] group-hover:text-[#080808]/80 font-tabular tracking-wider block">
                SCROLL TO COMMENCE // {heroTimecode}
              </span>
            </div>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { SectionType } from '../../types';

interface HeaderProps {
  activeSection?: SectionType;
  onNavigate?: (sectionId: SectionType) => void;
  isAudioMuted?: boolean;
  onToggleAudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection = 'hero',
  onNavigate,
  isAudioMuted = true,
  onToggleAudio,
}) => {
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [isScrolled, setIsScrolled] = useState(false);

  // SMPTE Running Timecode Counter (24 FPS simulation)
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
      setTimecode(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
    }, 1000 / 24);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems: { id: SectionType; label: string; code: string }[] = [
    { id: 'hero', label: 'INDEX', code: '01' },
    { id: 'particles', label: 'OPTICS', code: '02' },
    { id: 'works', label: 'WORKS', code: '03' },
    { id: 'manifesto', label: 'CRAFT', code: '04' },
    { id: 'contact', label: 'CREDITS', code: '05' },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-[#292929] py-3'
          : 'bg-transparent border-[#292929]/40 py-4'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Tally Light & Identity */}
        <div className="flex items-center space-x-4">
          {/* Pulsing Tally Dot & Recording Status */}
          <div className="flex items-center space-x-2">
            <span
              aria-label="Camera Tally Recording Indicator"
              className="relative flex h-2.5 w-2.5 items-center justify-center"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D93829] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D93829]" />
            </span>
            <span className="font-mono text-[11px] tracking-wider text-[#F5F5F5] uppercase">
              REC <span className="text-[#888888]">24FPS 180°</span>
            </span>
          </div>

          <div className="hidden sm:block h-3.5 w-[1px] bg-[#292929]" />

          {/* Minimalist Auteur Moniker */}
          <button
            type="button"
            onClick={() => onNavigate?.('hero')}
            className="text-left group focus-visible:ring-1 focus-visible:ring-[#E09F3E]"
            aria-label="Return to portfolio hero"
          >
            <span className="font-display font-bold text-xs tracking-wider text-[#F5F5F5] group-hover:text-[#E09F3E] transition-colors">
              ROHAN VANCE
            </span>
            <span className="hidden md:inline font-mono text-[10px] text-[#888888] ml-2 tracking-widest">
              [BSC]
            </span>
          </button>
        </div>

        {/* Center: Editorial Section Nav */}
        <nav
          aria-label="Primary cinematic navigation"
          className="hidden lg:flex items-center space-x-8"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate?.(item.id)}
                className={`font-mono text-[11px] tracking-widest uppercase transition-colors flex items-center space-x-1.5 py-1 ${
                  isActive
                    ? 'text-[#E09F3E] font-medium'
                    : 'text-[#888888] hover:text-[#F5F5F5]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-[9px] text-[#555555]">{item.code}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Timecode & Ambient Audio Toggle */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Running SMPTE Timecode */}
          <div
            aria-label="Running SMPTE Timecode"
            className="hidden sm:flex items-center space-x-2 font-mono text-xs text-[#888888] font-tabular tracking-wider"
          >
            <span className="text-[10px] text-[#555555]">TC</span>
            <span className="text-[#F5F5F5]">{timecode}</span>
          </div>

          <div className="hidden sm:block h-3.5 w-[1px] bg-[#292929]" />

          {/* Audio Ambient Foley / Track Toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={isAudioMuted ? 'Enable ambient soundscape' : 'Mute ambient soundscape'}
            className="flex items-center space-x-2 px-3 py-1.5 border border-[#292929] hover:border-[#888888] active:border-[#E09F3E] bg-[#111111]/80 hover:bg-[#161616] text-xs font-mono transition-all rounded-none"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#888888]" />
                <span className="text-[10px] text-[#888888] tracking-widest">
                  AUDIO: <span className="text-[#555555]">MUTED</span>
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#E09F3E]" />
                {/* 3-bar Animated Waveform Equalizer */}
                <span className="flex items-end space-x-0.5 h-3">
                  <span className="w-0.5 bg-[#E09F3E] animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
                  <span className="w-0.5 bg-[#E09F3E] animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-3" />
                  <span className="w-0.5 bg-[#E09F3E] animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-1.5" />
                </span>
                <span className="text-[10px] text-[#E09F3E] tracking-widest">
                  AUDIO: LIVE
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

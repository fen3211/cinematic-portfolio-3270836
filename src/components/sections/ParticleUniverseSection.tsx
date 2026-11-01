import React, { useState } from 'react';
import {
  ParticleUniverseCanvas,
  AtmosphericPreset,
} from '../canvas/ParticleUniverseCanvas';
import { KineticText } from '../ui/KineticText';
import { Sparkles, Zap, Flame, Compass, Eye } from 'lucide-react';
import { playLensClick, playShutterSound } from '../../utils/audioSynth';
import { CINEMATOGRAPHER_PROFILE } from '../../data/portfolioData';

export const ParticleUniverseSection: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<AtmosphericPreset>('solar-turbulence');
  const [shockwaveCount, setShockwaveCount] = useState(0);

  const handleSelectPreset = (preset: AtmosphericPreset) => {
    playLensClick();
    setSelectedPreset(preset);
  };

  const handleTriggerShockwave = () => {
    playShutterSound();
    setShockwaveCount((prev) => prev + 1);
  };

  const presetLabels: { id: AtmosphericPreset; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'silver-dust',
      label: '35MM SILVER DUST',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      desc: 'Halide grain suspension & low-key atmospheric silver falloff',
    },
    {
      id: 'solar-turbulence',
      label: 'SOLAR TURBULENCE',
      icon: <Flame className="w-3.5 h-3.5" />,
      desc: '3200K tungsten high-velocity curl noise & incandescent embers',
    },
    {
      id: 'deep-space',
      label: 'DEEP SPACE',
      icon: <Compass className="w-3.5 h-3.5" />,
      desc: '5600K anamorphic flare spectrum & slow cosmic drift',
    },
  ];

  return (
    <section
      id="particles"
      aria-label="Particle Universe: Optical Physics & Atmosphere"
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 py-24 border-b border-[#292929] bg-[#0c0c0c] overflow-hidden"
    >
      {/* Real-Time Three.js Atmospheric Cinema Particle Stage */}
      <div className="absolute inset-0 z-0 opacity-85 pointer-events-auto">
        <ParticleUniverseCanvas
          preset={selectedPreset}
          shockwaveTrigger={shockwaveCount}
          intensity={1.0}
        />
      </div>

      {/* Top Section Header */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-[#292929] select-none pointer-events-none">
        <div>
          <span className="font-mono text-xs tracking-widest text-[#888888] uppercase block mb-2">
            02 // OPTICAL PHYSICS & CELLULOID ATMOSPHERE
          </span>
          <KineticText
            tag="h2"
            splitBy="words"
            triggerOnScroll
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F5] uppercase tracking-tight"
          >
            PARTICLE UNIVERSE // PHYSICAL LIGHT & DUST
          </KineticText>
        </div>
        <div className="font-mono text-xs text-[#E09F3E] tracking-widest uppercase">
          SIMULATED 35MM FLUID DYNAMICS
        </div>
      </div>

      {/* Center Interactive Stage & Editorial Statement */}
      <div className="relative z-10 my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pointer-events-none">
        {/* Left: Statement & Optics Science */}
        <div className="lg:col-span-7 space-y-6">
          <blockquote className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-[#F5F5F5] leading-tight">
            &ldquo;{CINEMATOGRAPHER_PROFILE.statement}&rdquo;
          </blockquote>

          <p className="font-sans text-sm sm:text-base text-[#888888] leading-relaxed max-w-2xl">
            Suspended particulate matter—whether theatrical haze, atmospheric smoke, or microscopic silver halide crystals—is not an obstacle to clarity; it is the physical fabric that catches anamorphic horizontal flares and gives spatial depth to optical geometry.
          </p>

          <div className="pt-4 flex items-center space-x-2 font-mono text-xs text-[#555555]">
            <Eye className="w-4 h-4 text-[#E09F3E]" />
            <span>INTERACT: SWEEP CURSOR ACROSS STAGE OR SELECT PRESETS BELOW</span>
          </div>
        </div>

        {/* Right: Interactive HUD Presets & Shockwave Controller */}
        <div className="lg:col-span-5 pointer-events-auto flex flex-col justify-center space-y-4">
          <div className="border border-[#292929] bg-[#111111]/90 backdrop-blur-md p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#292929] pb-3 text-xs font-mono tracking-widest text-[#888888] uppercase">
              <span>ATMOSPHERIC PRESETS</span>
              <span className="text-[#E09F3E]">HUD CONTROLS</span>
            </div>

            {/* Presets List */}
            <div className="space-y-2">
              {presetLabels.map((preset) => {
                const isActive = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`w-full text-left p-3 border transition-all flex items-start space-x-3 ${
                      isActive
                        ? 'border-[#E09F3E] bg-[#E09F3E]/10 text-[#F5F5F5]'
                        : 'border-[#292929] hover:border-[#888888] bg-[#0c0c0c]/80 text-[#888888]'
                    }`}
                  >
                    <span className={`mt-0.5 ${isActive ? 'text-[#E09F3E]' : 'text-[#555555]'}`}>
                      {preset.icon}
                    </span>
                    <div>
                      <div className="font-mono text-xs font-semibold uppercase tracking-wider">
                        {preset.label}
                      </div>
                      <div className="font-sans text-[11px] text-[#666666] mt-0.5">
                        {preset.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Shockwave Trigger Button */}
            <div className="pt-2 border-t border-[#292929]">
              <button
                type="button"
                onClick={handleTriggerShockwave}
                data-cursor="shockwave"
                className="w-full group flex items-center justify-center space-x-2 py-3 px-4 border border-[#E09F3E] bg-[#111111] hover:bg-[#E09F3E] hover:text-[#080808] text-[#E09F3E] font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#E09F3E]"
              >
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>TRIGGER SHOCKWAVE IMPULSE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry HUD Matrix */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#292929] font-mono text-xs select-none pointer-events-none">
        <div>
          <span className="text-[#555555] block">PARTICLE STAGE</span>
          <span className="text-[#F5F5F5] font-tabular">12,000 GPU SPRITES</span>
        </div>
        <div>
          <span className="text-[#555555] block">APERTURE FIELD</span>
          <span className="text-[#F5F5F5]">f/1.4 SHALLOW DOF</span>
        </div>
        <div>
          <span className="text-[#555555] block">ACTIVE SPECTRUM</span>
          <span className="text-[#E09F3E] uppercase">{selectedPreset.replace('-', ' ')}</span>
        </div>
        <div>
          <span className="text-[#555555] block">CHOREOGRAPHY CADENCE</span>
          <span className="text-[#4A7C9B]">24.000 FPS / 60Hz</span>
        </div>
      </div>
    </section>
  );
};

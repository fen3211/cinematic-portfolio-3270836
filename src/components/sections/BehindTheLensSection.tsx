import React from 'react';
import { KineticText } from '../ui/KineticText';
import { CINEMATOGRAPHER_PROFILE } from '../../data/portfolioData';
import { Disc3, Aperture, Layers } from 'lucide-react';

export const BehindTheLensSection: React.FC = () => {
  return (
    <section
      id="manifesto"
      aria-label="Behind the Lens: Craft & Technical Arsenal"
      className="relative min-h-screen px-6 md:px-12 lg:px-20 py-24 border-b border-[#292929] bg-[#0d0d0d]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16 pb-6 border-b border-[#292929]">
        <div>
          <span className="font-mono text-xs tracking-widest text-[#888888] uppercase block mb-2">
            04 // BEHIND THE LENS
          </span>
          <KineticText
            tag="h2"
            splitBy="words"
            triggerOnScroll
            className="font-display font-extrabold text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight"
          >
            SCULPTING SHADOWS & CELLULOID GRAIN
          </KineticText>
        </div>
        <div className="font-mono text-xs text-[#E09F3E] tracking-widest uppercase">
          ACCREDITED BSC // AFC MEMBER
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Portrait Plate with Parallax & Reticle Overlay */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative border border-[#292929] bg-[#141414] overflow-hidden group">
            {/* 35mm Monochromatic Portrait Plate */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#161616]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                alt="Rohan Vance on set with ARRI camera system"
                loading="lazy"
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Film Grain & Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-70 pointer-events-none" />

              {/* Viewfinder Camera Framing Reticle Overlay */}
              <div className="absolute inset-4 border border-[#F5F5F5]/20 pointer-events-none">
                {/* 4 Corner Crop Ticks */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#E09F3E]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#E09F3E]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#E09F3E]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#E09F3E]" />

                {/* Center Crosshair Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-5 h-[1px] bg-[#F5F5F5]/40" />
                  <div className="absolute h-5 w-[1px] bg-[#F5F5F5]/40" />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-[#E09F3E]/80" />
                </div>

                {/* HUD Camera Lens Telemetry Tag */}
                <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#888888] tracking-widest uppercase bg-[#080808]/80 px-2 py-0.5 border border-[#292929]">
                  COOKE 50MM // T1.4 // EI 800
                </div>
              </div>
            </div>

            {/* Portrait Bottom Caption */}
            <div className="p-4 border-t border-[#292929] bg-[#0f0f0f] flex items-center justify-between text-xs font-mono">
              <span className="text-[#F5F5F5] font-semibold">
                ROHAN VANCE, BSC
              </span>
              <span className="text-[#888888]">ON SET // PINEWOOD STUDIOS</span>
            </div>
          </div>

          {/* Master Sensor Specifications Card */}
          <div className="border border-[#292929] p-5 bg-[#111111]/70">
            <h4 className="font-mono text-xs tracking-widest text-[#E09F3E] uppercase mb-4 flex items-center space-x-2">
              <Aperture className="w-3.5 h-3.5" />
              <span>MASTER SENSOR ARCHITECTURE</span>
            </h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="border border-[#292929] p-3 bg-[#0a0a0a]">
                <dt className="text-[#555555] uppercase text-[10px]">Active Sensor</dt>
                <dd className="text-[#F5F5F5] mt-1 font-medium">{CINEMATOGRAPHER_PROFILE.masterSensorSpecs.sensorDimension}</dd>
              </div>
              <div className="border border-[#292929] p-3 bg-[#0a0a0a]">
                <dt className="text-[#555555] uppercase text-[10px]">Color Pipeline</dt>
                <dd className="text-[#E09F3E] mt-1 font-medium">{CINEMATOGRAPHER_PROFILE.masterSensorSpecs.colorScience}</dd>
              </div>
              <div className="border border-[#292929] p-3 bg-[#0a0a0a]">
                <dt className="text-[#555555] uppercase text-[10px]">Dynamic Range</dt>
                <dd className="text-[#F5F5F5] mt-1 font-medium">{CINEMATOGRAPHER_PROFILE.masterSensorSpecs.dynamicRange}</dd>
              </div>
              <div className="border border-[#292929] p-3 bg-[#0a0a0a]">
                <dt className="text-[#555555] uppercase text-[10px]">Dual Native ISO</dt>
                <dd className="text-[#F5F5F5] mt-1 font-medium">{CINEMATOGRAPHER_PROFILE.masterSensorSpecs.nativeIso}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Cinematography Philosophy & Technical Arsenal */}
        <div className="lg:col-span-7 space-y-8">
          {/* Auteur Philosophy Statements */}
          <div className="space-y-6">
            <h3 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F5] leading-snug">
              &ldquo;Light has no weight without darkness. We do not illuminate the scene; we carve visibility out of the void.&rdquo;
            </h3>

            {CINEMATOGRAPHER_PROFILE.bioParagraphs.map((para, i) => (
              <p
                key={i}
                className="text-sm sm:text-base text-[#888888] leading-relaxed font-sans"
              >
                {para}
              </p>
            ))}

            <p className="text-sm sm:text-base text-[#888888] leading-relaxed font-sans">
              Embracing anamorphic barrel distortion, horizontal flare streaks, and chromatic roll-off transforms modern high-resolution digital sensors into living, breathing optical canvases. We reject sterile digital cleanliness in favor of physical celluloid soul.
            </p>
          </div>

          {/* Production Equipment Manifest */}
          <div className="space-y-4 pt-6 border-t border-[#292929]">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs tracking-widest text-[#E09F3E] uppercase flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5" />
                <span>TECHNICAL ARSENAL & OPTICAL SYSTEMS</span>
              </h3>
              <span className="font-mono text-[11px] text-[#555555] uppercase">
                PRODUCTION-READY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CINEMATOGRAPHER_PROFILE.technicalArsenal.map((category) => (
                <div
                  key={category.category}
                  className="border border-[#292929] p-4 bg-[#111111]/50 hover:border-[#888888] transition-colors"
                >
                  <h4 className="font-mono text-xs text-[#F5F5F5] tracking-wider uppercase mb-3 flex items-center space-x-2">
                    <Disc3 className="w-3 h-3 text-[#E09F3E]" />
                    <span>{category.category}</span>
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs text-[#888888]">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#E09F3E] select-none font-mono">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

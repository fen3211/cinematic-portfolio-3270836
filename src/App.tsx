import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { ViewfinderOverlay } from './components/ui/ViewfinderOverlay';
import { useLenis } from './hooks/useLenis';
import { useMousePosition } from './hooks/useMousePosition';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SectionType } from './types';
import { CINEMATOGRAPHER_PROFILE, PORTFOLIO_PROJECTS } from './data/portfolioData';
import { ArrowDownRight, Play, Film, Disc3, Mail } from 'lucide-react';
import { LiquidLensCursor } from './components/canvas/LiquidLensCursor';
import { ParticleUniverseCanvas } from './components/canvas/ParticleUniverseCanvas';
import { LiquidImageDistortion } from './components/canvas/LiquidImageDistortion';
import { startAmbientDrone, stopAmbientDrone } from './utils/audioSynth';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const mousePos = useMousePosition();

  const { scrollTo } = useLenis({
    enabled: !prefersReducedMotion,
  });

  const handleNavigate = (sectionId: SectionType) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      scrollTo(targetElement);
    }
  };

  const handleToggleAudio = () => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      if (!next) {
        startAmbientDrone();
      } else {
        stopAmbientDrone();
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F5F5] font-sans selection:bg-[#E09F3E] selection:text-[#080808]">
      {/* High-Refraction Optical Glass Lens Cursor */}
      <LiquidLensCursor />

      {/* 35mm Emulsion Film Grain Overlay */}
      <NoiseOverlay opacity={0.045} />

      {/* Optical Viewfinder Camera Framing Guides */}
      <ViewfinderOverlay />

      {/* Fixed Telemetry Header Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />

      <main className="relative z-10">
        {/* SECTION 01: IMMERSIVE HERO */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-20 border-b border-[#292929]"
        >
          {/* Top Hero Telemetry Sub-bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-mono text-[#888888] tracking-widest uppercase">
            <div className="flex items-center space-x-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E09F3E]" />
              <span>SENSOR // ARRI LPL 36.70 × 25.54 MM</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>COLOR: ACES 1.3</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">GAMMA: LOGC4</span>
              <span>·</span>
              <span className="text-[#E09F3E]">EI: 800</span>
            </div>
          </div>

          {/* Center Masthead */}
          <div className="my-auto py-12 max-w-7xl">
            <div className="mb-4 inline-flex items-center space-x-2 border border-[#292929] px-3 py-1 bg-[#111111]/70 font-mono text-[11px] text-[#888888] tracking-wider uppercase">
              <Film className="w-3.5 h-3.5 text-[#E09F3E]" />
              <span>FEATURE REEL 2024—2026</span>
            </div>

            <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-[#F5F5F5] uppercase leading-[0.92]">
              {CINEMATOGRAPHER_PROFILE.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h2 className="font-sans font-semibold text-sm md:text-base tracking-[0.25em] text-[#888888] uppercase">
                {CINEMATOGRAPHER_PROFILE.role}
              </h2>
              <span className="text-[#292929] hidden sm:inline">/</span>
              <span className="font-mono text-xs text-[#555555] tracking-widest">
                {CINEMATOGRAPHER_PROFILE.acronyms}
              </span>
            </div>

            <p className="mt-6 font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#E09F3E] max-w-2xl font-normal leading-snug">
              &ldquo;{CINEMATOGRAPHER_PROFILE.logline}&rdquo;
            </p>
          </div>

          {/* Bottom Telemetry & Scroll Cue */}
          <div className="flex flex-wrap items-end justify-between gap-6 pt-8 border-t border-[#292929]">
            <div className="max-w-md">
              <span className="font-mono text-[10px] tracking-widest text-[#555555] uppercase block mb-1">
                LENS PACKAGE
              </span>
              <p className="text-xs text-[#888888] font-mono leading-relaxed">
                Cooke Anamorphic /i Full Frame Plus SF · Panavision C-Series · Zeiss Super Speeds T1.3
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:block text-right font-mono text-[11px] text-[#555555] tracking-widest">
                <div>CURSOR VELOCITY: {mousePos.speed.toFixed(2)} px/ms</div>
                <div>OPTICAL RETICLE: {mousePos.isInsideViewport ? 'TRACKING' : 'IDLE'}</div>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate('works')}
                className="group flex items-center space-x-3 px-5 py-3 border border-[#292929] hover:border-[#E09F3E] bg-[#111111] hover:bg-[#E09F3E] hover:text-[#080808] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#E09F3E]"
              >
                <span className="font-mono text-xs tracking-widest uppercase font-medium">
                  EXPLORE REEL
                </span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 02: OPTICAL PHYSICS & ATMOSPHERE */}
        <section
          id="particles"
          className="relative min-h-[75vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 border-b border-[#292929] bg-[#0c0c0c] overflow-hidden"
        >
          {/* Real-Time Three.js Atmospheric Cinema Particle Stage */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
            <ParticleUniverseCanvas />
          </div>

          <div className="relative z-10 max-w-4xl pointer-events-none">
            <div className="font-mono text-xs tracking-widest text-[#888888] uppercase mb-4">
              02 // OPTICAL PHYSICS & ATMOSPHERIC DISCIPLINE
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F5] leading-tight">
              &ldquo;{CINEMATOGRAPHER_PROFILE.statement}&rdquo;
            </h2>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#292929] font-mono text-xs">
              <div>
                <span className="text-[#555555] block">PARTICLE STAGE</span>
                <span className="text-[#F5F5F5] font-tabular">12,000 PTS</span>
              </div>
              <div>
                <span className="text-[#555555] block">APERTURE FIELD</span>
                <span className="text-[#F5F5F5]">f/1.4 DEPTH</span>
              </div>
              <div>
                <span className="text-[#555555] block">KELVIN TEMP</span>
                <span className="text-[#E09F3E]">3200K TUNGSTEN</span>
              </div>
              <div>
                <span className="text-[#555555] block">CADENCE</span>
                <span className="text-[#4A7C9B]">24.000 FPS</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: SELECTED WORKS */}
        <section
          id="works"
          className="relative min-h-screen px-6 md:px-12 lg:px-20 py-24 border-b border-[#292929]"
        >
          {/* Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16 pb-6 border-b border-[#292929]">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#888888] uppercase block mb-2">
                03 // SELECTED WORKS
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight">
                THEATRICAL REELS
              </h2>
            </div>
            <div className="font-mono text-xs text-[#888888] tracking-widest">
              ARCHIVE // 2024 — 2026
            </div>
          </div>

          {/* Asymmetrical Film Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {PORTFOLIO_PROJECTS.map((project, idx) => {
              // Asymmetric column spans
              const colSpan =
                idx === 0
                  ? 'md:col-span-12'
                  : idx % 2 === 1
                  ? 'md:col-span-5'
                  : 'md:col-span-7';

              return (
                <article
                  key={project.id}
                  data-cursor="film"
                  data-cursor-label="VIEW REEL"
                  data-cursor-secondary={`[ ${project.aspectRatio} ]`}
                  className={`${colSpan} group flex flex-col justify-between border border-[#292929] hover:border-[#888888] bg-[#111111]/60 transition-all duration-300 overflow-hidden cursor-none`}
                >
                  {/* Media Aspect Container with Real-Time WebGL Liquid Wave Distortion */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#161616]">
                    <LiquidImageDistortion
                      imageSrc={project.posterUrl}
                      alt={project.title}
                      aspectRatio="aspect-video"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 pointer-events-none" />

                    {/* Aspect Badge */}
                    <div className="absolute top-4 right-4 bg-[#080808]/80 border border-[#292929] px-2.5 py-1 font-mono text-[10px] text-[#E09F3E] tracking-wider pointer-events-none">
                      {project.aspectRatio}
                    </div>

                    {/* Play Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="h-12 w-12 rounded-full border border-[#F5F5F5] bg-[#080808]/80 flex items-center justify-center text-[#F5F5F5]">
                        <Play className="w-5 h-5 fill-[#F5F5F5] translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Metadata Slate */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1 border-t border-[#292929]">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#888888] tracking-widest uppercase mb-2">
                        <span>{project.category}</span>
                        <span className="font-tabular">{project.year}</span>
                      </div>

                      <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F5F5F5] uppercase group-hover:text-[#E09F3E] transition-colors">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#888888] line-clamp-2 font-sans leading-relaxed">
                        {project.logline}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#292929]/50 flex items-center justify-between text-[11px] font-mono text-[#555555]">
                      <span>{project.metadata.camera}</span>
                      <span className="text-[#E09F3E] group-hover:translate-x-1 transition-transform">
                        DETAILS ↗
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION 04: BEHIND THE LENS (CRAFT MANIFESTO) */}
        <section
          id="manifesto"
          className="relative min-h-screen px-6 md:px-12 lg:px-20 py-24 border-b border-[#292929] bg-[#0d0d0d]"
        >
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16 pb-6 border-b border-[#292929]">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#888888] uppercase block mb-2">
                04 // BEHIND THE LENS
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight">
                CRAFT & ARSENAL
              </h2>
            </div>
            <div className="font-mono text-xs text-[#888888] tracking-widest">
              ACCREDITED BSC // AFC
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Biography & Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#F5F5F5] leading-snug">
                &ldquo;Light is physical weight. We sculpt spatial gravity before striking a single fixture.&rdquo;
              </h3>

              {CINEMATOGRAPHER_PROFILE.bioParagraphs.map((para, i) => (
                <p key={i} className="text-sm sm:text-base text-[#888888] leading-relaxed font-sans">
                  {para}
                </p>
              ))}

              <div className="pt-6 border-t border-[#292929]">
                <h4 className="font-mono text-xs tracking-widest text-[#555555] uppercase mb-4">
                  MASTER SENSOR SPECIFICATIONS
                </h4>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="border border-[#292929] p-3 bg-[#111111]/50">
                    <dt className="text-[#555555]">ACTIVE SENSOR</dt>
                    <dd className="text-[#F5F5F5] mt-1">{CINEMATOGRAPHER_PROFILE.masterSensorSpecs.sensorDimension}</dd>
                  </div>
                  <div className="border border-[#292929] p-3 bg-[#111111]/50">
                    <dt className="text-[#555555]">COLOR SCIENCE</dt>
                    <dd className="text-[#E09F3E] mt-1">{CINEMATOGRAPHER_PROFILE.masterSensorSpecs.colorScience}</dd>
                  </div>
                  <div className="border border-[#292929] p-3 bg-[#111111]/50">
                    <dt className="text-[#555555]">DYNAMIC RANGE</dt>
                    <dd className="text-[#F5F5F5] mt-1">{CINEMATOGRAPHER_PROFILE.masterSensorSpecs.dynamicRange}</dd>
                  </div>
                  <div className="border border-[#292929] p-3 bg-[#111111]/50">
                    <dt className="text-[#555555]">BASE SENSITIVITY</dt>
                    <dd className="text-[#F5F5F5] mt-1">{CINEMATOGRAPHER_PROFILE.masterSensorSpecs.nativeIso}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Right: Technical Arsenal Manifest */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-mono text-xs tracking-widest text-[#888888] uppercase">
                PRODUCTION ARSENAL & SYSTEMS
              </h3>

              <div className="space-y-4">
                {CINEMATOGRAPHER_PROFILE.technicalArsenal.map((category) => (
                  <div
                    key={category.category}
                    className="border border-[#292929] p-5 bg-[#111111]/40"
                  >
                    <h4 className="font-mono text-xs text-[#E09F3E] tracking-wider uppercase mb-3 flex items-center space-x-2">
                      <Disc3 className="w-3.5 h-3.5" />
                      <span>{category.category}</span>
                    </h4>
                    <ul className="space-y-2 font-sans text-sm text-[#888888]">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-[#555555] select-none font-mono text-xs">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: CONTACT / END CREDITS */}
        <section
          id="contact"
          className="relative min-h-screen px-6 md:px-12 lg:px-20 py-24 flex flex-col justify-between"
        >
          {/* Monumental Invitation Headline */}
          <div className="max-w-5xl">
            <span className="font-mono text-xs tracking-widest text-[#888888] uppercase block mb-4">
              05 // INQUIRIES & END CREDITS
            </span>
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#F5F5F5] uppercase leading-[0.95] tracking-tight">
              LET&apos;S CREATE SOMETHING RAW.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#E09F3E] font-medium max-w-xl">
              Available worldwide for narrative feature films, commercial campaigns, and visionary director collaborations.
            </p>
          </div>

          {/* Credits Crawl Two-Column Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-y border-[#292929] my-12">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#555555] uppercase block mb-3">
                WORLDWIDE REPRESENTATION
              </span>
              <div className="space-y-1 font-sans">
                <div className="text-lg font-semibold text-[#F5F5F5]">
                  {CINEMATOGRAPHER_PROFILE.representation.agency}
                </div>
                <div className="text-sm text-[#888888]">
                  Agent: {CINEMATOGRAPHER_PROFILE.representation.agent}
                </div>
                <a
                  href={`mailto:${CINEMATOGRAPHER_PROFILE.representation.email}`}
                  className="inline-flex items-center space-x-1.5 text-sm font-mono text-[#E09F3E] hover:underline pt-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{CINEMATOGRAPHER_PROFILE.representation.email}</span>
                </a>
              </div>
            </div>

            <div>
              <span className="font-mono text-xs tracking-widest text-[#555555] uppercase block mb-3">
                DIRECT STUDIO INQUIRIES
              </span>
              <div className="space-y-1 font-sans">
                <div className="text-lg font-semibold text-[#F5F5F5]">
                  {CINEMATOGRAPHER_PROFILE.contact.location}
                </div>
                <div className="text-sm text-[#888888]">
                  {CINEMATOGRAPHER_PROFILE.contact.studioAddress}
                </div>
                <a
                  href={`mailto:${CINEMATOGRAPHER_PROFILE.contact.email}`}
                  className="inline-flex items-center space-x-1.5 text-sm font-mono text-[#E09F3E] hover:underline pt-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{CINEMATOGRAPHER_PROFILE.contact.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Colophon Slate */}
          <footer className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#555555] tracking-widest uppercase">
            <div>
              © {new Date().getFullYear()} ROHAN VANCE · ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center space-x-4">
              <span>ULTRA-PANAVISION 70 FORMAT</span>
              <span>·</span>
              <span>COLOR BY TECHNICOLOR</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default App;

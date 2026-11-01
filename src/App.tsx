import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { ViewfinderOverlay } from './components/ui/ViewfinderOverlay';
import { LiquidLensCursor } from './components/canvas/LiquidLensCursor';
import { HeroSection } from './components/sections/HeroSection';
import { ParticleUniverseSection } from './components/sections/ParticleUniverseSection';
import { SelectedWorksSection } from './components/sections/SelectedWorksSection';
import { BehindTheLensSection } from './components/sections/BehindTheLensSection';
import { ContactSection } from './components/sections/ContactSection';
import { FilmModal } from './components/ui/FilmModal';
import { useLenis } from './hooks/useLenis';
import { useMousePosition } from './hooks/useMousePosition';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SectionType, Project } from './types';
import { startAmbientDrone, stopAmbientDrone, playLensClick } from './utils/audioSynth';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const mousePos = useMousePosition();

  const { scrollTo } = useLenis({
    enabled: !prefersReducedMotion,
  });

  // Track active visible section for Header telemetry
  useEffect(() => {
    const sectionIds: SectionType[] = ['hero', 'particles', 'works', 'manifesto', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionType);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavigate = (sectionId: SectionType) => {
    playLensClick();
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      scrollTo(targetElement);
    }
  };

  const handleToggleAudio = () => {
    playLensClick();
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

      {/* Main Orchestrated Cinematic Episode Sections */}
      <main className="relative z-10">
        {/* Episode 01: Hero Opening Sequence */}
        <HeroSection
          onExplore={() => handleNavigate('works')}
          speed={mousePos.speed}
          isTracking={mousePos.isInsideViewport}
        />

        {/* Episode 02: Particle Universe (Light & Atmospheric Physics) */}
        <ParticleUniverseSection />

        {/* Episode 03: Selected Works (Asymmetric Widescreen Grid) */}
        <SelectedWorksSection
          onSelectProject={(project) => setActiveProject(project)}
        />

        {/* Episode 04: Behind the Lens (Craft Manifesto & Arsenal) */}
        <BehindTheLensSection />

        {/* Episode 05: Contact & Film End-Credits Crawl */}
        <ContactSection />
      </main>

      {/* Fullscreen A24 Theatrical Film Modal Lightbox */}
      <FilmModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};

export default App;

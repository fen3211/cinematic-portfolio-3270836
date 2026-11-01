import React, { useState } from 'react';
import { Play, Filter } from 'lucide-react';
import { KineticText } from '../ui/KineticText';
import { LiquidImageDistortion } from '../canvas/LiquidImageDistortion';
import { PORTFOLIO_PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { playLensClick } from '../../utils/audioSynth';

interface SelectedWorksSectionProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorksSection: React.FC<SelectedWorksSectionProps> = ({
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories: string[] = ['ALL', 'Feature Film', 'Commercial', 'Documentary', 'Experimental'];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  const handleCardClick = (project: Project) => {
    playLensClick();
    onSelectProject(project);
  };

  const getAspectClass = (ratio: string): string => {
    switch (ratio) {
      case '2.39:1':
        return 'aspect-scope';
      case '4:3':
        return 'aspect-academy';
      case '1:1':
        return 'aspect-square';
      case '2.00:1':
        return 'aspect-univisium';
      case '16:9':
      default:
        return 'aspect-video';
    }
  };

  const getAspectBadge = (ratio: string): string => {
    switch (ratio) {
      case '2.39:1':
        return '2.39:1 SCOPE';
      case '4:3':
        return '4:3 ACADEMY';
      case '1:1':
        return '1:1 SQUARE';
      case '2.00:1':
        return '2.00:1 UNIVISIUM';
      case '16:9':
      default:
        return '16:9 FLAT';
    }
  };

  return (
    <section
      id="works"
      aria-label="Selected Works & Theatrical Reels"
      className="relative min-h-screen px-6 md:px-12 lg:px-20 py-24 border-b border-[#292929]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12 pb-6 border-b border-[#292929]">
        <div>
          <span className="font-mono text-xs tracking-widest text-[#888888] uppercase block mb-2">
            03 // SELECTED ARCHIVE (2024 — 2026)
          </span>
          <KineticText
            tag="h2"
            splitBy="words"
            triggerOnScroll
            className="font-display font-extrabold text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight"
          >
            THEATRICAL REELS
          </KineticText>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] text-[#555555] uppercase mr-2 hidden sm:inline-flex items-center space-x-1">
            <Filter className="w-3 h-3 text-[#E09F3E]" />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playLensClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 font-mono text-[11px] tracking-wider uppercase border transition-all ${
                  isActive
                    ? 'border-[#E09F3E] bg-[#E09F3E] text-[#080808] font-semibold'
                    : 'border-[#292929] hover:border-[#888888] bg-[#111111]/70 text-[#888888]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetrical Film Slate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
        {filteredProjects.map((project, idx) => {
          // Asymmetric column distribution
          let colSpan = 'md:col-span-6';
          if (filteredProjects.length === PORTFOLIO_PROJECTS.length) {
            if (idx === 0) colSpan = 'md:col-span-12';
            else if (idx === 1) colSpan = 'md:col-span-5';
            else if (idx === 2) colSpan = 'md:col-span-7';
            else if (idx === 3) colSpan = 'md:col-span-7';
            else if (idx === 4) colSpan = 'md:col-span-5';
            else if (idx === 5) colSpan = 'md:col-span-12';
          }

          const aspectClass = getAspectClass(project.aspectRatio);
          const aspectBadge = getAspectBadge(project.aspectRatio);

          return (
            <article
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(project);
                }
              }}
              data-cursor="film"
              data-cursor-label="VIEW FILM"
              data-cursor-secondary={`[ ${project.aspectRatio} ]`}
              aria-label={`View film ${project.title}, ${project.category}, ${project.year}`}
              className={`${colSpan} group flex flex-col justify-between border border-[#292929] hover:border-[#E09F3E] bg-[#111111]/70 transition-all duration-300 overflow-hidden cursor-none outline-none focus-visible:ring-2 focus-visible:ring-[#E09F3E]`}
            >
              {/* Media Aspect Container with Real-Time WebGL Liquid Wave Distortion */}
              <div className={`relative ${aspectClass} w-full overflow-hidden bg-[#161616]`}>
                <LiquidImageDistortion
                  imageSrc={project.posterUrl}
                  alt={project.title}
                  aspectRatio={aspectClass}
                  waveIntensity={0.075}
                />

                {/* Subtle Cinematic Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Top Corner Aspect Ratio Badge */}
                <div className="absolute top-4 right-4 bg-[#080808]/85 border border-[#292929] px-2.5 py-1 font-mono text-[10px] text-[#E09F3E] tracking-wider pointer-events-none select-none">
                  {aspectBadge}
                </div>

                {/* Hover Play Prompt Reticle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="h-14 w-14 rounded-full border border-[#E09F3E] bg-[#080808]/85 flex items-center justify-center text-[#E09F3E] shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 fill-[#E09F3E] translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Metadata Slate */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 border-t border-[#292929] bg-[#0e0e0e]/50">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#888888] tracking-widest uppercase mb-2">
                    <span className="text-[#E09F3E]">{project.category}</span>
                    <span className="font-tabular text-[#555555]">{project.year}</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F5F5F5] uppercase group-hover:text-[#E09F3E] transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#888888] line-clamp-2 font-sans leading-relaxed">
                    {project.logline}
                  </p>
                </div>

                {/* Bottom Camera Metadata Strip */}
                <div className="mt-6 pt-4 border-t border-[#292929]/60 flex items-center justify-between text-[11px] font-mono text-[#555555]">
                  <span className="truncate pr-2">
                    {project.metadata.camera} · {project.metadata.lenses}
                  </span>
                  <span className="text-[#E09F3E] font-medium shrink-0 group-hover:translate-x-1 transition-transform">
                    VIEW FILM ↗
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

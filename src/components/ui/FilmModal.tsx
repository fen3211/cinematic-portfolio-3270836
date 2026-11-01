import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Sliders,
  Film,
  Award,
} from 'lucide-react';
import { Project } from '../../types';
import { playLensClick } from '../../utils/audioSynth';

interface FilmModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatSMPTETimecode = (timeInSeconds: number, fps = 24): string => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00:00:00';
  const totalFrames = Math.floor(timeInSeconds * fps);
  const frames = totalFrames % fps;
  const totalSeconds = Math.floor(totalFrames / fps);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
};

export const FilmModal: React.FC<FilmModalProps> = ({ project, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrubBarRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'credits' | 'synopsis'>('telemetry');

  const handleClose = useCallback(() => {
    playLensClick();
    onClose();
  }, [onClose]);

  // Keyboard navigation & focus trapping
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    playLensClick();

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the modal container
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === ' ' && e.target === modalRef.current) {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'Tab' && modalRef.current) {
        // Focus trap
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, handleClose]);

  // Autoplay and video reset when project changes
  useEffect(() => {
    if (isOpen && project && videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser blocks unmuted autoplay
          setIsMuted(true);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => setIsPlaying(false));
          }
        });
      }
    }
  }, [isOpen, project]);

  const togglePlayPause = () => {
    playLensClick();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    playLensClick();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isScrubbing) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleScrub = (clientX: number) => {
    if (!scrubBarRef.current || !videoRef.current || !duration) return;
    const rect = scrubBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleScrubMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    handleScrub(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handleScrub(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsScrubbing(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const toggleFullscreen = () => {
    playLensClick();
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (!isOpen || !project) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const fps = project.metadata.fps || 24;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="film-modal-title"
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-[#080808]/95 backdrop-blur-2xl overflow-y-auto animate-fade-in outline-none"
    >
      {/* Outer Click Backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Main A24 Cinematic Frame Container */}
      <div className="relative w-full max-w-7xl bg-[#0e0e0e] border border-[#292929] shadow-2xl my-auto overflow-hidden flex flex-col">
        {/* Top Telemetry Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#292929] bg-[#111111]/90 text-xs font-mono tracking-widest text-[#888888] select-none">
          <div className="flex items-center space-x-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D93829] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D93829]" />
            </span>
            <span className="text-[#F5F5F5] font-semibold uppercase">
              REEL PLAYBACK // {project.category}
            </span>
            <span className="hidden sm:inline text-[#444444]">|</span>
            <span className="hidden sm:inline text-[#E09F3E]">
              {project.aspectRatio} SCOPE
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-[11px] text-[#555555]">
              PRESS [ESC] TO CLOSE
            </span>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="p-1.5 border border-[#292929] hover:border-[#E09F3E] bg-[#161616] hover:bg-[#E09F3E] hover:text-[#080808] text-[#F5F5F5] transition-all focus-visible:ring-2 focus-visible:ring-[#E09F3E]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2.39:1 Anamorphic Cinema Matte Player Container */}
        <div className="relative w-full bg-[#050505] flex items-center justify-center overflow-hidden">
          {/* Matte Letterbox Container: 2.39:1 ratio framing */}
          <div className="relative w-full aspect-scope max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={project.fullVideoUrl || project.videoPreviewUrl}
              poster={project.posterUrl}
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlayPause}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Corner Camera Reticle Overlays */}
            <div className="pointer-events-none absolute inset-4 border border-[#F5F5F5]/10">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E09F3E]/60" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E09F3E]/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E09F3E]/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E09F3E]/60" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                <div className="w-4 h-[1px] bg-[#F5F5F5]/20" />
                <div className="absolute h-4 w-[1px] bg-[#F5F5F5]/20" />
              </div>
            </div>

            {/* Center Play Overlay on Pause */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
              >
                <div className="h-16 w-16 rounded-full border border-[#E09F3E] bg-[#080808]/80 flex items-center justify-center text-[#E09F3E] shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-[#E09F3E] translate-x-0.5" />
                </div>
              </button>
            )}

            {/* Top Matte Mask with Camera Spec Watermark */}
            <div className="absolute top-3 left-4 text-[10px] font-mono text-[#888888] tracking-widest pointer-events-none bg-[#080808]/70 px-2 py-0.5 border border-[#292929]">
              RAW // {project.metadata.camera} · {project.metadata.lenses}
            </div>
          </div>
        </div>

        {/* Video Player Control Bar */}
        <div className="px-4 sm:px-6 py-3 border-y border-[#292929] bg-[#111111] flex flex-col gap-2">
          {/* Hairline Scrub Bar */}
          <div
            ref={scrubBarRef}
            onClick={handleScrubMouseDown}
            role="slider"
            aria-label="Video timeline scrub bar"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            tabIndex={0}
            className="group relative w-full h-3 cursor-pointer flex items-center focus-visible:outline-none"
          >
            <div className="w-full h-1 bg-[#222222] group-hover:h-1.5 transition-all relative">
              <div
                className="h-full bg-[#E09F3E] relative transition-all"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F5F5F5] border border-[#080808] opacity-0 group-hover:opacity-100 transition-opacity shadow" />
              </div>
            </div>
          </div>

          {/* Controls Cluster & Running Timecode */}
          <div className="flex items-center justify-between text-xs font-mono">
            {/* Play/Pause & Mute Buttons */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="p-1.5 hover:text-[#E09F3E] transition-colors focus-visible:ring-1 focus-visible:ring-[#E09F3E]"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="p-1.5 hover:text-[#E09F3E] transition-colors focus-visible:ring-1 focus-visible:ring-[#E09F3E]"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#888888]" /> : <Volume2 className="w-4 h-4 text-[#E09F3E]" />}
              </button>

              <div className="h-3 w-[1px] bg-[#292929] hidden sm:block" />

              {/* Running SMPTE Timecode Counter: 00:01:24:18 */}
              <div className="flex items-center space-x-2 text-[#F5F5F5] font-tabular tracking-wider">
                <span className="text-[#555555] text-[10px]">SMPTE</span>
                <span className="text-[#E09F3E] font-medium">
                  {formatSMPTETimecode(currentTime, fps)}
                </span>
                <span className="text-[#555555]">/</span>
                <span className="text-[#888888]">
                  {formatSMPTETimecode(duration, fps)}
                </span>
              </div>
            </div>

            {/* Technical Shutter & FPS Tag + Fullscreen */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 text-[11px] text-[#888888]">
                <span>{fps}.000 FPS</span>
                <span>·</span>
                <span>{project.metadata.shutterAngle} SHUTTER</span>
                <span>·</span>
                <span>ISO {project.metadata.nativeIso}</span>
              </div>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="p-1.5 hover:text-[#E09F3E] transition-colors focus-visible:ring-1 focus-visible:ring-[#E09F3E]"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Billing Block: A24 Theatrical Production Manifest */}
        <div className="p-6 md:p-8 space-y-6 bg-[#0a0a0a]">
          {/* Main Title & Masthead */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#292929]">
            <div>
              <div className="flex items-center space-x-3 text-xs font-mono text-[#888888] tracking-widest uppercase mb-2">
                <span>{project.releaseDistribution}</span>
                <span>·</span>
                <span className="text-[#E09F3E]">{project.year}</span>
              </div>
              <h2
                id="film-modal-title"
                className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F5] uppercase tracking-tight"
              >
                {project.title}
              </h2>
              <p className="mt-3 text-base text-[#888888] font-sans max-w-3xl leading-relaxed">
                {project.logline}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-2 border border-[#292929] p-1 bg-[#111111] text-xs font-mono self-start lg:self-end">
              <button
                type="button"
                onClick={() => {
                  playLensClick();
                  setActiveTab('telemetry');
                }}
                className={`px-3 py-1.5 uppercase transition-colors ${
                  activeTab === 'telemetry'
                    ? 'bg-[#E09F3E] text-[#080808] font-semibold'
                    : 'text-[#888888] hover:text-[#F5F5F5]'
                }`}
              >
                Telemetry
              </button>
              <button
                type="button"
                onClick={() => {
                  playLensClick();
                  setActiveTab('credits');
                }}
                className={`px-3 py-1.5 uppercase transition-colors ${
                  activeTab === 'credits'
                    ? 'bg-[#E09F3E] text-[#080808] font-semibold'
                    : 'text-[#888888] hover:text-[#F5F5F5]'
                }`}
              >
                Credits
              </button>
              <button
                type="button"
                onClick={() => {
                  playLensClick();
                  setActiveTab('synopsis');
                }}
                className={`px-3 py-1.5 uppercase transition-colors ${
                  activeTab === 'synopsis'
                    ? 'bg-[#E09F3E] text-[#080808] font-semibold'
                    : 'text-[#888888] hover:text-[#F5F5F5]'
                }`}
              >
                Synopsis
              </button>
            </div>
          </div>

          {/* Tab 1: Full Camera & Lens Telemetry Grid */}
          {activeTab === 'telemetry' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs font-mono">
                <div className="border border-[#292929] p-4 bg-[#111111]/40">
                  <span className="text-[#555555] block mb-1 uppercase tracking-wider">
                    Camera System
                  </span>
                  <span className="text-[#F5F5F5] font-medium">
                    {project.metadata.camera}
                  </span>
                </div>

                <div className="border border-[#292929] p-4 bg-[#111111]/40">
                  <span className="text-[#555555] block mb-1 uppercase tracking-wider">
                    Optical Glass
                  </span>
                  <span className="text-[#F5F5F5] font-medium">
                    {project.metadata.lenses}
                  </span>
                </div>

                <div className="border border-[#292929] p-4 bg-[#111111]/40">
                  <span className="text-[#555555] block mb-1 uppercase tracking-wider">
                    Focal Lengths / Aperture
                  </span>
                  <span className="text-[#F5F5F5] font-medium">
                    {project.metadata.focalLengths || 'Prime Package'} · {project.metadata.aperture || 'T2.0'}
                  </span>
                </div>

                <div className="border border-[#292929] p-4 bg-[#111111]/40">
                  <span className="text-[#555555] block mb-1 uppercase tracking-wider">
                    Sensor Dimensions
                  </span>
                  <span className="text-[#F5F5F5] font-medium">
                    {project.metadata.sensorDimensions}
                  </span>
                </div>

                <div className="border border-[#292929] p-4 bg-[#111111]/40">
                  <span className="text-[#555555] block mb-1 uppercase tracking-wider">
                    Color Timing & LUT
                  </span>
                  <span className="text-[#E09F3E] font-medium">
                    {project.metadata.colorScience}
                  </span>
                </div>

                <div className="border border-[#292929] p-4 bg-[#111111]/40">
                  <span className="text-[#555555] block mb-1 uppercase tracking-wider">
                    Aspect Framing
                  </span>
                  <span className="text-[#F5F5F5] font-medium">
                    {project.aspectRatio} Theatrical
                  </span>
                </div>

                <div className="border border-[#292929] p-4 bg-[#111111]/40">
                  <span className="text-[#555555] block mb-1 uppercase tracking-wider">
                    Recording Codec
                  </span>
                  <span className="text-[#F5F5F5] font-medium">
                    {project.metadata.codec}
                  </span>
                </div>

                <div className="border border-[#292929] p-4 bg-[#111111]/40">
                  <span className="text-[#555555] block mb-1 uppercase tracking-wider">
                    Photometric Kelvin
                  </span>
                  <span className="text-[#F5F5F5] font-medium">
                    {project.metadata.kelvin}K · EI {project.metadata.nativeIso}
                  </span>
                </div>
              </div>

              {/* Lighting & Grade Technical Notes */}
              {(project.lightingNotes || project.colorGradeNotes) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {project.lightingNotes && (
                    <div className="border border-[#292929] p-4 bg-[#111111]/20">
                      <span className="font-mono text-xs text-[#E09F3E] uppercase tracking-wider block mb-2 flex items-center space-x-2">
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Photometric Lighting Design</span>
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-[#888888] leading-relaxed">
                        {project.lightingNotes}
                      </p>
                    </div>
                  )}

                  {project.colorGradeNotes && (
                    <div className="border border-[#292929] p-4 bg-[#111111]/20">
                      <span className="font-mono text-xs text-[#4A7C9B] uppercase tracking-wider block mb-2 flex items-center space-x-2">
                        <Film className="w-3.5 h-3.5" />
                        <span>Color Chemistry & Contrast Curve</span>
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-[#888888] leading-relaxed">
                        {project.colorGradeNotes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Cast & Key Production Credits */}
          {activeTab === 'credits' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {project.credits.map((credit, idx) => (
                  <div
                    key={idx}
                    className="border border-[#292929] p-4 bg-[#111111]/30 font-mono text-xs"
                  >
                    <span className="text-[#555555] uppercase block mb-1 tracking-wider text-[11px]">
                      {credit.role}
                    </span>
                    <span className="text-[#F5F5F5] font-medium text-sm">
                      {credit.name}
                    </span>
                  </div>
                ))}
              </div>

              {project.awards && project.awards.length > 0 && (
                <div className="border border-[#292929] p-5 bg-[#111111]/40">
                  <span className="font-mono text-xs text-[#E09F3E] uppercase tracking-wider block mb-3 flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Festival Accolades & Juried Honors</span>
                  </span>
                  <ul className="space-y-2">
                    {project.awards.map((award, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-[#EDE6DD] font-sans flex items-center space-x-2"
                      >
                        <span className="text-[#E09F3E] select-none">★</span>
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Detailed Synopsis */}
          {activeTab === 'synopsis' && (
            <div className="space-y-4 max-w-4xl text-sm sm:text-base text-[#888888] font-sans leading-relaxed">
              <p>{project.synopsis}</p>
              <div className="pt-4 border-t border-[#292929] flex flex-wrap gap-4 font-mono text-xs text-[#555555]">
                <span>DURATION: {project.duration}</span>
                <span>·</span>
                <span>DISTRIBUTION: {project.releaseDistribution}</span>
                <span>·</span>
                <span>FORMAT: {project.aspectRatio}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

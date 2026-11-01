export type SectionType = 'hero' | 'particles' | 'works' | 'manifesto' | 'contact';

export type AspectRatioType = '2.39:1' | '1.85:1' | '2.00:1' | '16:9' | '4:3' | '1:1';

export type FilmCategory = 'Feature Film' | 'Commercial' | 'Music Video' | 'Documentary' | 'Experimental';

export type CursorMode = 'default' | 'film' | 'link' | 'hover' | 'shockwave' | 'hidden';

export type DeviceTier = 'desktop' | 'tablet' | 'mobile';

export interface FilmMetadata {
  camera: string;
  lenses: string;
  focalLengths?: string;
  aperture?: string;
  shutterAngle: string;
  fps: number;
  nativeIso: number;
  kelvin: number;
  codec: string;
  sensorDimensions: string;
  colorScience: string;
  filmStock?: string;
}

export interface CreditItem {
  role: string;
  name: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: FilmCategory;
  year: number;
  aspectRatio: AspectRatioType;
  logline: string;
  synopsis: string;
  posterUrl: string;
  videoPreviewUrl: string;
  fullVideoUrl: string;
  duration: string;
  releaseDistribution: string;
  metadata: FilmMetadata;
  credits: CreditItem[];
  awards?: string[];
  lightingNotes?: string;
  colorGradeNotes?: string;
  featured?: boolean;
}

export interface CursorState {
  mode: CursorMode;
  targetScale: number;
  targetBlur: number;
  label: string | null;
  secondaryLabel?: string | null;
  setCursorMode: (mode: CursorMode, label?: string | null, secondaryLabel?: string | null) => void;
  resetCursor: () => void;
}

export interface AudioState {
  isMuted: boolean;
  masterVolume: number;
  isAmbientPlaying: boolean;
  toggleMute: () => void;
  setMasterVolume: (volume: number) => void;
  playMicroSound: (sound: 'lens-click' | 'shutter' | 'ambient-whoosh') => void;
}

export interface LightboxState {
  activeProject: Project | null;
  isOpen: boolean;
  openLightbox: (project: Project) => void;
  closeLightbox: () => void;
}

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  velocityX: number;
  velocityY: number;
  speed: number;
}

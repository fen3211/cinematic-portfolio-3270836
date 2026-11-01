# Cinematic Portfolio (KWORK-3270836) — Technical Architecture Specification

**Document Version:** 1.0.0  
**Status:** Approved Architectural Blueprint  
**Target Platform:** Web (Desktop, Tablet, Mobile)  
**Author:** Senior System Architect  
**Classification:** Technical Authority & Implementation Standard

---

## 1. Executive Architectural Overview & Design Thesis

The **Cinematic Portfolio** is an ultra-high-performance, client-side digital experience engineered for visionary cinematographers, film directors, and visual artists. It marries cinematic storytelling with cutting-edge WebGL graphics, real-time GLSL optics, and synchronized kinetic typography.

```
+----------------------------------------------------------------------------------------------------+
|                                    CINEMATIC RUNTIME ARCHITECTURE                                   |
|                                                                                                    |
|  +----------------------------------------------------------------------------------------------+  |
|  |                                  Unified Ticker (GSAP RAF)                                   |  |
|  |     +-------------------------+   +------------------------+   +-------------------------+   |  |
|  |     |   Lenis Smooth Scroll   |   |   GSAP ScrollTrigger   |   |    Three.js Render Loop |   |  |
|  |     +-------------------------+   +------------------------+   +-------------------------+   |  |
|  +----------------------------------------------+-----------------------------------------------+  |
|                                                 |                                                  |
|  +----------------------------------------------v-----------------------------------------------+  |
|  |                                      Application Core                                        |  |
|  |     +----------------------------------------------------------------------------------+     |  |
|  |     | State Engine: CursorStore | AudioStore | LightboxStore | DeviceTierStore         |     |  |
|  |     +----------------------------------------------------------------------------------+     |  |
|  |     +----------------------------------------------------------------------------------+     |  |
|  |     | React 19 UI DOM Layer (Kinetic Typography, Film Grid, Lightbox Modal, Credits)   |     |  |
|  |     +----------------------------------------------------------------------------------+     |  |
|  |     +----------------------------------------------------------------------------------+     |  |
|  |     | Real-Time Canvas Subsystems:                                                     |     |  |
|  |     |   * Particle Universe (Instanced GPU Points, Curl Noise, Shockwaves)             |     |  |
|  |     |   * Liquid Lens Cursor (Screen-space Refraction, Chromatic Aberration)           |     |  |
|  |     |   * Liquid Distortion Mesh (Vertex displacement & UV ripple shaders)             |     |  |
|  |     +----------------------------------------------------------------------------------+     |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

### 1.1 Core Architectural Principles
1. **Zero-Latency Visual Feedback:** Target rock-solid 60 FPS (<=16.6ms frame time budget) on standard hardware; avoid garbage collection pauses by prohibiting per-frame object allocation.
2. **Unified RAF Scheduling:** Single master animation ticker orchestrating Lenis smooth scrolling, GSAP timeline scrubs, and Three.js WebGL draw calls to prevent frame-tearing and layout thrashing.
3. **Decoupled State & Render Pipeline:** Reactive React UI state updates occur strictly for discrete domain events; high-frequency per-frame coordinates and physics vectors reside in mutable zero-allocation references.
4. **Graceful Device Tiering:** Adaptive hardware scaling dynamically throttling particle counts, shader precision, and post-processing complexity across high-end desktop, tablet, and mobile GPUs.
5. **Zero-Backend Serverless Distribution:** Fully client-rendered static Single-Page Application (SPA) deployable with zero infrastructure dependencies to GitHub Pages, Cloudflare Pages, Vercel, or Netlify.

---

## 2. Technology Stack Selection & Justifications

| Layer / Subsystem | Technology Selected | Rationale & Architectural Trade-offs |
| :--- | :--- | :--- |
| **Bundler & Tooling** | **Vite 5 / 6 + TypeScript 5.5+** | Instant HMR (<50ms), native ESM bundling, Rollup production tree-shaking, GLSL shader plugin integration (`vite-plugin-glsl`). TypeScript enforces strict typing across physics buffers and state contracts. |
| **UI Framework** | **React 19 / 18** | Robust component encapsulation, concurrent rendering features, declarative modal portals, and clean lifecycle hooks for WebGL canvas mounting/teardown. |
| **Styling & Design Tokens** | **Tailwind CSS 3.4+** | Zero-runtime CSS footprint, custom cinematic utility classes (anamorphic aspect ratios, letterboxing, ultra-wide tracking, cinema grade scrim gradients). |
| **3D & Graphics Engine** | **Three.js (r160+) + Custom GLSL** | The industry standard for WebGL. Provides battle-tested math utilities, buffer attribute management, WebGLRenderer pipeline, and custom ShaderMaterial pipelines. |
| **Scroll Engine** | **Lenis (v1.1+)** | Hardware-accelerated virtual scrolling providing inertia without breaking native accessibility or touch physics. Integrates seamlessly into the GSAP ticker. |
| **Choreography Engine** | **GSAP 3 + ScrollTrigger** | High-precision kinetic choreography, timeline synchronization, scroll scrub pinning, and fine-grained parametric easing. |
| **Iconography** | **Lucide React** | Ultra-lightweight, customizable SVG icons representing film slate, aperture, lens mm, play, audio waveforms, and controls without bundle bloat. |
| **State Store** | **Zustand (v4.5+)** | Minimalist (1.1 kB), un-opinionated store outside the React context tree. Enables transient subscriptions that update components without triggering tree re-renders. |
| **Audio Synthesis / Playback**| **Web Audio API + Howler.js** | Low-latency spatialized ambient hum, optical lens click micro-interactions, and cinematic audio transitions with master gain fading. |

---

## 3. Component Hierarchy & State Architecture

### 3.1 Structural Component Hierarchy
```
App.tsx
├── SmoothScrollProvider (Lenis context, GSAP RAF bridge, resize listener)
│   ├── Layout
│   │   ├── Navigation (Fixed cinema header, reel status, audio mute toggle)
│   │   ├── LiquidLensCursor (Screen-space optical glass refraction & spring physics)
│   │   ├── SoundController (Web Audio API ambient track & micro-foley)
│   │   │
│   │   ├── <main id="cinematic-canvas-wrapper">
│   │   │   ├── HeroSection
│   │   │   │   ├── BackgroundCanvas (Anamorphic grain & video reel texture)
│   │   │   │   ├── KineticTypography (Split-text letterbox reveal)
│   │   │   │   └── DirectorMeta (Aperture, focal length, aspect ratio HUD)
│   │   │   │
│   │   │   ├── ParticleUniverseSection
│   │   │   │   ├── WebGLParticleStage (GPU BufferGeometry, Curl noise, shockwave canvas)
│   │   │   │   └── InteractiveControls (Attraction / repulsion / blast triggers)
│   │   │   │
│   │   │   ├── SelectedWorksSection
│   │   │   │   ├── SectionHeader ("SELECTED REELS / 2024-2026")
│   │   │   │   ├── AsymmetricalFilmGrid
│   │   │   │   │   └── LiquidHoverCard (x6 instances: WebGL UV wave distortion)
│   │   │   │   └── LightboxPortal
│   │   │   │       └── FilmModal (Director's cut, technical credits, 4K preview)
│   │   │   │
│   │   │   ├── BehindTheLensSection
│   │   │   │   ├── VisualManifesto (Philosophy, methodology)
│   │   │   │   ├── TechnicalArsenal (Cameras: ARRI Alexa 35, RED V-Raptor, Cooke Anamorphic)
│   │   │   │   └── InteractiveTimeline (Career milestones)
│   │   │   │
│   │   │   └── ContactSection
│   │   │       ├── EndCreditsCrawl (Hollywood style rolling production credits)
│   │   │       ├── InteractiveInquiryForm (Custom letterbox input elements)
│   │   │       └── ColophonFooter (Copyright, legal disclosures, build hash)
```

### 3.2 State Stores & Data Contracts

```typescript
// types/state.ts

export type CursorMode = 'default' | 'film' | 'link' | 'hover' | 'shockwave' | 'hidden';

export type DeviceTier = 'desktop' | 'tablet' | 'mobile';

export interface ProjectReel {
  id: string;
  slug: string;
  title: string;
  category: 'Commercial' | 'Feature Film' | 'Music Video' | 'Documentary';
  year: number;
  camera: string;
  lenses: string;
  aspectRatio: '2.39:1' | '1.85:1' | '16:9' | '4:3';
  posterUrl: string;
  videoPreviewUrl: string;
  fullVideoUrl: string;
  synopsis: string;
  credits: { role: string; name: string }[];
}

// Zustand Store Interfaces
export interface CursorState {
  mode: CursorMode;
  targetScale: number;
  targetBlur: number;
  label: string | null;
  setCursorMode: (mode: CursorMode, label?: string) => void;
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
  activeProject: ProjectReel | null;
  isOpen: boolean;
  openLightbox: (project: ProjectReel) => void;
  closeLightbox: () => void;
}

export interface DeviceTierState {
  tier: DeviceTier;
  pixelRatio: number;
  hasWebGL2: boolean;
  reducedMotion: boolean;
  setDeviceTier: (tier: DeviceTier, dpr: number) => void;
}
```

---

## 4. Unified Render & Animation Pipeline (Lenis + GSAP + Three.js)

To achieve flawless 60 FPS synchronization, multiple asynchronous `requestAnimationFrame` loops are strictly prohibited. The system establishes a **Single Master Clock Engine** rooted in `gsap.ticker`.

```
                    +------------------------------------+
                    |       Window requestAnimationFrame |
                    +-----------------+------------------+
                                      |
                                      v
                    +-----------------+------------------+
                    |           gsap.ticker              |
                    | (delta, time in milliseconds)      |
                    +--------+------------------+--------+
                             |                  |
               +-------------v----+        +----v--------------------+
               |   Lenis.raf(time)|        |   ThreeJS Master Scene  |
               | (Computes scroll |        | (Updates particle buffer|
               |  inertial delta) |        |  & renders pass)        |
               +-------------+----+        +-------------------------+
                             |
               +-------------v----+
               |  ScrollTrigger   |
               |  .update()       |
               +------------------+
```

### 4.1 Master Pipeline Implementation Architecture
```typescript
// services/animation/masterTicker.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export class AnimationOrchestrator {
  private static instance: AnimationOrchestrator;
  public lenis: Lenis | null = null;
  private renderCallbacks: Set<(delta: number, time: number) => void> = new Set();
  private isRunning: boolean = false;

  private constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  public static getInstance(): AnimationOrchestrator {
    if (!AnimationOrchestrator.instance) {
      AnimationOrchestrator.instance = new AnimationOrchestrator();
    }
    return AnimationOrchestrator.instance;
  }

  public init(scrollContainer?: HTMLElement): void {
    if (this.isRunning) return;

    // Initialize Lenis with cinematic inertial dampening
    this.lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      wrapper: window,
      content: scrollContainer || document.documentElement,
    });

    // Synchronize Lenis scroll positions with GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    // Bind GSAP ticker to drive Lenis and all WebGL callbacks
    gsap.ticker.add(this.onTick);
    gsap.ticker.lagSmoothing(0); // Prevent erratic catch-up jumps on frame drops

    this.isRunning = true;
  }

  private onTick = (time: number, deltaTime: number, frame: number): void => {
    const deltaSeconds = deltaTime / 1000;
    const timeMs = time * 1000;

    // 1. Step smooth scrolling
    if (this.lenis) {
      this.lenis.raf(timeMs);
    }

    // 2. Dispatch high-frequency scene updates
    for (const callback of this.renderCallbacks) {
      callback(deltaSeconds, timeMs);
    }
  };

  public registerRenderLoop(cb: (delta: number, time: number) => void): () => void {
    this.renderCallbacks.add(cb);
    return () => this.renderCallbacks.delete(cb);
  }

  public destroy(): void {
    gsap.ticker.remove(this.onTick);
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
    this.renderCallbacks.clear();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    this.isRunning = false;
  }
}
```

---

## 5. Graphic & WebGL Shader Pipeline Architecture

### 5.1 Background Particle Universe
The interactive particle universe renders up to 5,000 instanced dust motes representing cinematic 35mm film grain floating in three-dimensional anamorphic space.

```
                              PARTICLE GPU DATA PIPELINE
  
     +-------------------------------------------------------------------------+
     | THREE.BufferGeometry                                                    |
     |   * attribute vec3 position       (Base spatial anchor [X, Y, Z])       |
     |   * attribute vec3 velocity       (Dynamic physics trajectory)          |
     |   * attribute float size          (Varying optical particle diameter)   |
     |   * attribute float randomSeed    (Per-point deterministic noise phase) |
     +------------------------------------+------------------------------------+
                                          |
                                          v
     +------------------------------------+------------------------------------+
     | Particle Vertex Shader (particle.vert.glsl)                             |
     |   - Curl Noise Turbulence Field: 3D Simplex noise gradient              |
     |   - Mouse Repulsion / Attraction Vector field                           |
     |   - Click Shockwave Radial Displacement: r(t) = v * dt, decay envelope  |
     |   - Perspective Depth Attenuation: gl_PointSize = size * (300.0 / -pos.z)|
     +------------------------------------+------------------------------------+
                                          |
                                          v
     +------------------------------------+------------------------------------+
     | Particle Fragment Shader (particle.frag.glsl)                           |
     |   - Anamorphic bokeh disc falloff: length(gl_PointCoord - 0.5)          |
     |   - Chromatic tint: 3200K Tungsten gold / 5600K Daylight cyan split     |
     |   - Dynamic alpha dissipation based on lifetime & distance              |
     +-------------------------------------------------------------------------+
```

#### 5.1.1 Vertex Shader Specification (`particle.vert.glsl`)
```glsl
uniform float uTime;
uniform vec2 uMousePosition; // Normalized device coordinates [-1.0, 1.0]
uniform float uMouseRadius;  // Interaction radius
uniform float uMouseForce;   // Negative for repulsion, positive for attraction
uniform vec3 uShockwave;     // [x, y, activeTime]

attribute vec3 velocity;
attribute float size;
attribute float randomSeed;

varying vec3 vColor;
varying float vAlpha;

// Simplex 3D Curl Noise functions
vec3 snoise3(vec3 x);
vec3 curlNoise(vec3 p) {
  const float e = 0.1;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);

  vec3 p_x0 = snoise3(p - dx);
  vec3 p_x1 = snoise3(p + dx);
  vec3 p_y0 = snoise3(p - dy);
  vec3 p_y1 = snoise3(p + dy);
  vec3 p_z0 = snoise3(p - dz);
  vec3 p_z1 = snoise3(p + dz);

  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

  return normalize(vec3(x, y, z) / (2.0 * e));
}

void main() {
  vec3 pos = position;

  // 1. Curl Noise micro-drift simulation
  vec3 noiseVec = curlNoise(pos * 0.002 + vec3(0.0, 0.0, uTime * 0.05));
  pos += noiseVec * (1.5 + sin(uTime + randomSeed * 6.28) * 0.5);

  // 2. Mouse Repulsion / Attraction Vector
  vec2 screenPos = pos.xy;
  float distToMouse = distance(screenPos, uMousePosition * vec2(16.0, 9.0));
  if (distToMouse < uMouseRadius && distToMouse > 0.001) {
    vec2 forceDir = normalize(screenPos - uMousePosition * vec2(16.0, 9.0));
    float forceStrength = (1.0 - distToMouse / uMouseRadius) * uMouseForce;
    pos.xy += forceDir * forceStrength;
  }

  // 3. Shockwave Impulse Ring
  if (uShockwave.z > 0.0) {
    float waveRadius = uShockwave.z * 18.0; // Expansion speed
    float distToShock = distance(pos.xy, uShockwave.xy);
    float ringWidth = 2.0;
    float shockDiff = abs(distToShock - waveRadius);
    if (shockDiff < ringWidth) {
      float shockForce = (1.0 - shockDiff / ringWidth) * exp(-uShockwave.z * 1.5) * 4.0;
      pos.xy += normalize(pos.xy - uShockwave.xy) * shockForce;
    }
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Anamorphic bokeh size scaling with depth
  gl_PointSize = size * (320.0 / -mvPosition.z);

  // Cinematic color split: warm tungsten gold vs cool anamorphic cyan
  vec3 warmTungsten = vec3(0.95, 0.72, 0.45);
  vec3 anamorphicCyan = vec3(0.35, 0.65, 0.85);
  vColor = mix(warmTungsten, anamorphicCyan, sin(randomSeed * 3.1415 + uTime * 0.2) * 0.5 + 0.5);
  
  // Dissipate alpha towards outer camera bounds
  vAlpha = smoothstep(-40.0, -5.0, mvPosition.z) * (0.4 + 0.6 * sin(uTime * 2.0 + randomSeed * 10.0));
}
```

#### 5.1.2 Fragment Shader Specification (`particle.frag.glsl`)
```glsl
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Compute distance from center of circular point sprite
  vec2 coord = gl_PointCoord - vec2(0.5);
  
  // Anamorphic vertical ellipse compression (cinema lens bokeh: 2.0x squeeze)
  coord.y *= 1.35; 
  float dist = length(coord);

  if (dist > 0.5) discard;

  // Soft Gaussian optical roll-off
  float opticalFalloff = smoothstep(0.5, 0.05, dist);
  gl_FragColor = vec4(vColor, vAlpha * opticalFalloff);
}
```

---

### 5.2 Liquid Lens Cursor (Optical Glass Refraction)
The liquid lens cursor models a high-refraction physical lens element (mimicking a Cooke Anamorphic / ARRI Master Prime front optical element) that floats above DOM elements, refracting whatever sits underneath it with chromatic aberration and Fresnel specular highlights.

```
                           SCREEN-SPACE LENS REFRACTION PIPELINE
  
     +--------------------------------------------------------------------------+
     | Pointer Event Stream (window mousemove / pointermove)                    |
     |   -> Real-time raw coordinates (mouseX, mouseY)                          |
     +------------------------------------+-------------------------------------+
                                          |
                                          v
     +------------------------------------+-------------------------------------+
     | Critically Damped Inertial Physics (2nd Order Spring-Damper)             |
     |   x(t) = x(t-1) + (target - x) * springFactor;                           |
     |   springFactor: 0.12 (heavy camera feel) to 0.18 (responsive)            |
     +------------------------------------+-------------------------------------+
                                          |
                                          v
     +------------------------------------+-------------------------------------+
     | Optical Lens Render Engine                                               |
     |                                                                          |
     |   Primary Mode: Real-Time WebGL Offscreen Pass / Canvas Backbuffer       |
     |     * Render Target Texture: Background DOM & scene snapshot             |
     |     * Normal Map Distortion: Spherical convex lens height field          |
     |     * Chromatic Aberration: Spectral sampling:                           |
     |         R_uv = uv + normal.xy * (refractIndex + dispersion)              |
     |         G_uv = uv + normal.xy * (refractIndex)                           |
     |         B_uv = uv + normal.xy * (refractIndex - dispersion)              |
     |     * Specular Rim Highlight: Fresnel curve: pow(1.0 - N.V, 3.5)         |
     |                                                                          |
     |   Lightweight Fallback: Hardware-Accelerated SVG feDisplacementMap       |
     |     * Dynamic SVG filter `<feDisplacementMap scale="28" xChannelSelector="R">`|
     |     * Smooth CSS backdrop-filter with hardware acceleration              |
     +--------------------------------------------------------------------------+
```

#### 5.2.1 Damped Spring Cursor Physics
```typescript
// hooks/useCriticallyDampedCursor.ts
import { useRef, useEffect } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
}

export function useCriticallyDampedCursor(stiffness: number = 0.14, damping: number = 0.82) {
  const current = useRef<CursorPosition>({ x: window.innerWidth / 2, y: window.innerHeight / 2, vx: 0, vy: 0, scale: 1.0 });
  const target = useRef<{ x: number; y: number; scale: number }>({ x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 1.0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const update = (deltaSeconds: number): CursorPosition => {
    // Frame-rate independent spring physics
    const dtRatio = Math.min(deltaSeconds / 0.0166, 2.0); // Normalize to 60fps base

    const fx = (target.current.x - current.current.x) * stiffness;
    const fy = (target.current.y - current.current.y) * stiffness;

    current.current.vx = (current.current.vx + fx * dtRatio) * Math.pow(damping, dtRatio);
    current.current.vy = (current.current.vy + fy * dtRatio) * Math.pow(damping, dtRatio);

    current.current.x += current.current.vx * dtRatio;
    current.current.y += current.current.vy * dtRatio;

    // Scale dampening
    const scaleDiff = target.current.scale - current.current.scale;
    current.current.scale += scaleDiff * (stiffness * 1.5) * dtRatio;

    return current.current;
  };

  const setTargetScale = (scale: number) => {
    target.current.scale = scale;
  };

  return { current, target, update, setTargetScale };
}
```

#### 5.2.2 Screen-Space Optical Lens Shader (`lens.frag.glsl`)
```glsl
precision highp float;

uniform sampler2D uBackbuffer;  // Snapshot of scene behind the lens
uniform vec2 uLensCenter;       // Lens center coordinates in pixels
uniform float uLensRadius;      // Physical lens aperture radius in pixels
uniform vec2 uResolution;       // Viewport width & height
uniform float uRefractionIndex; // Optical density factor (e.g., 0.08)
uniform float uDispersion;      // Chromatic separation delta (e.g., 0.015)
uniform vec3 uRimColor;         // Lens bevel coating color (e.g., cyan/amber antireflective)

varying vec2 vUv;

void main() {
  vec2 pixelPos = vUv * uResolution;
  float dist = distance(pixelPos, uLensCenter);

  // Outside the optical lens cylinder, render unaffected pass-through
  if (dist > uLensRadius) {
    gl_FragColor = texture2D(uBackbuffer, vUv);
    return;
  }

  // Normalized radial position from lens center [0.0 = center, 1.0 = rim edge]
  float r = dist / uLensRadius;

  // Spherical lens meniscus height equation: h = sqrt(1.0 - r^2)
  float height = sqrt(max(0.0, 1.0 - r * r));
  vec2 lensNormal = normalize(pixelPos - uLensCenter) * (1.0 - height);

  // Chromatic dispersion offsets (separate R, G, B refraction rays)
  vec2 offsetR = lensNormal * (uRefractionIndex + uDispersion) * r;
  vec2 offsetG = lensNormal * uRefractionIndex * r;
  vec2 offsetB = lensNormal * (uRefractionIndex - uDispersion) * r;

  // Sample backbuffer with spectral divergence
  float sampleR = texture2D(uBackbuffer, vUv - offsetR).r;
  float sampleG = texture2D(uBackbuffer, vUv - offsetG).g;
  float sampleB = texture2D(uBackbuffer, vUv - offsetB).b;

  vec3 refractedColor = vec3(sampleR, sampleG, sampleB);

  // Optical magnification factor (center bulging)
  vec2 magnifiedUv = vUv - lensNormal * (0.04 * (1.0 - r));
  vec3 magnifiedBase = texture2D(uBackbuffer, magnifiedUv).rgb;
  refractedColor = mix(magnifiedBase, refractedColor, r);

  // Anti-reflective lens coating Fresnel rim specular highlight
  float fresnel = pow(r, 4.0) * 1.8;
  vec3 finalColor = refractedColor + uRimColor * fresnel;

  // Anti-aliased outer rim boundary
  float edgeAlpha = smoothstep(uLensRadius, uLensRadius - 1.5, dist);

  vec3 passThrough = texture2D(uBackbuffer, vUv).rgb;
  gl_FragColor = vec4(mix(passThrough, finalColor, edgeAlpha), 1.0);
}
```

---

### 5.3 Liquid Image Distortion (Interactive Film Cards)
Each project card in the `SelectedWorksSection` features a WebGL quad rendering video or high-resolution film stills. On cursor velocity or scroll scrub, the image surface behaves as a dynamic liquid medium with wave displacement and time-decay dampening.

```
+-------------------------------------------------------------------------------+
|                      LIQUID IMAGE DISTORTION SYSTEM                            |
|                                                                               |
|  Pointer Movement -> Velocity Vector (dx/dt, dy/dt)                           |
|  Scroll Scrub     -> Scroll Velocity (ds/dt)                                  |
|                                |                                              |
|                                v                                              |
|  Uniform Injection:                                                           |
|    * uVelocity: vec2(normDx, normDy)                                          |
|    * uIntensity: Amplitude scaled by cursor speed                             |
|    * uDecay: Exponential drop-off exp(-4.0 * dt)                              |
|                                |                                              |
|                                v                                              |
|  Fragment Shader:                                                             |
|    * Computes UV displacement via orthogonal wave interference:               |
|      wave = sin(length(uv - center) * freq - time * speed)                    |
|      distortedUV = uv + uVelocity * wave * uIntensity * envelope              |
|    * Bilinear Texture Fetch with chromatic aberration                         |
+-------------------------------------------------------------------------------+
```

#### 5.3.1 Liquid Hover Fragment Shader (`distortion.frag.glsl`)
```glsl
precision highp float;

uniform sampler2D uTexture;
uniform vec2 uPointer;        // Normalized card coordinates [0.0 to 1.0]
uniform vec2 uVelocity;       // Instantaneous pointer velocity
uniform float uHoverProgress; // 0.0 = idle, 1.0 = fully hovered
uniform float uTime;          // Animation time
uniform float uWaveIntensity; // Base distortion amplitude

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Vector from interaction pointer to current UV
  vec2 dir = uv - uPointer;
  float dist = length(dir);

  // Spatial attenuation wave envelope
  float wave = sin(dist * 24.0 - uTime * 6.0);
  float attenuation = exp(-dist * 4.5);

  // Velocity-driven displacement vector
  vec2 displacement = normalize(dir + vec2(0.0001)) * wave * attenuation * uWaveIntensity;
  displacement += uVelocity * 0.15 * attenuation;

  // Modulate displacement by hover progress transition
  vec2 finalUv = uv + displacement * uHoverProgress;

  // RGB Split / Chromatic Aberration on high velocity displacement
  float aberrationStrength = length(displacement) * 0.45;
  float r = texture2D(uTexture, finalUv + vec2(aberrationStrength, 0.0)).r;
  float g = texture2D(uTexture, finalUv).g;
  float b = texture2D(uTexture, finalUv - vec2(aberrationStrength, 0.0)).b;

  // Cinematic tone grade: slight vignette & 35mm letterbox contrast
  vec3 color = vec3(r, g, b);
  float vignette = smoothstep(1.2, 0.4, length(vUv - 0.5));
  color *= mix(0.85, 1.0, vignette);

  gl_FragColor = vec4(color, 1.0);
}
```

---

## 6. Performance, Memory & Resource Budgeting

To guarantee strict compliance with 60 FPS (<=16.6ms per frame) on 95% of target client devices, the architecture specifies strict operational budgets.

### 6.1 Hardware Tiering Matrix
```
+--------------------+---------------------+--------------------+--------------------+
| Parameter / Metric | High-End Desktop    | Tablet / Mid-Tier  | Mobile Phone       |
+--------------------+---------------------+--------------------+--------------------+
| Max Viewport DPR   | Clamped to 1.75     | Clamped to 1.50    | Clamped to 1.25    |
| Particle Count     | 5,000 instanced pts | 2,000 points       | 800 points         |
| Lens Shader Mode   | Full WebGL Offscreen| WebGL or SVG Filter| Native SVG / CSS   |
| Liquid Mesh Waves  | High-precision GLSL | Medium-precision   | Vertex-only wave   |
| Texture Resolution | 2048x1152 (1080p+)  | 1440x810           | 960x540            |
| VRAM Allocation    | <= 64 MB Total      | <= 32 MB Total     | <= 16 MB Total     |
| Draw Calls Target  | <= 35 per frame     | <= 20 per frame    | <= 10 per frame    |
| Frame Time Budget  | <= 12.0 ms (Target) | <= 14.5 ms         | <= 16.0 ms         |
+--------------------+---------------------+--------------------+--------------------+
```

### 6.2 Viewport Culling & IntersectionObserver Lifecycle
Running WebGL render loops on offscreen canvases is a leading cause of mobile GPU battery drain and thermal throttling. Every canvas component is wrapped in an `IntersectionObserverLifecycleManager`.

```
                  +----------------------------------------------+
                  |         IntersectionObserver Root            |
                  +----------------------+-----------------------+
                                         |
                       [Card enters / leaves viewport]
                                         |
                         +---------------+---------------+
                         |                               |
                   isIntersecting                  !isIntersecting
                         |                               |
                         v                               v
           +-----------------------------+ +-----------------------------+
           | - Register to Master Ticker | | - Suspend from Ticker Loop  |
           | - Resume WebGL Draw Calls   | | - Halt WebGL Draw Calls     |
           | - Enable Pointer Listeners  | | - Free transient frame FBOs |
           +-----------------------------+ +-----------------------------+
```

```typescript
// hooks/useCanvasIntersection.ts
import { useEffect, useRef, useState } from 'react';

export function useCanvasIntersection(threshold: number = 0.05) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: '100px 0px', threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { containerRef, isVisible };
}
```

### 6.3 Explicit VRAM & WebGL Resource Teardown Protocol
Three.js and WebGL do **not** automatically free GPU video memory (VRAM) when React components unmount. Stale textures and buffer geometries remain resident in graphics memory, causing memory leaks and eventual tab crashes (`webglcontextlost`).

The system mandates recursive GPU resource disposal on component destruction:

```typescript
// utils/webglDisposal.ts
import * as THREE from 'three';

export function disposeHierarchy(root: THREE.Object3D): void {
  root.traverse((object) => {
    if ((object as THREE.Mesh).isMesh || (object as THREE.Points).isPoints) {
      const renderable = object as THREE.Mesh;

      // 1. Dispose Geometry buffer attributes
      if (renderable.geometry) {
        renderable.geometry.dispose();
      }

      // 2. Dispose Material and associated Textures
      if (renderable.material) {
        if (Array.isArray(renderable.material)) {
          renderable.material.forEach((mat) => disposeMaterial(mat));
        } else {
          disposeMaterial(renderable.material);
        }
      }
    }
  });
}

function disposeMaterial(material: THREE.Material): void {
  // Dispose all uniform textures
  Object.keys(material).forEach((prop) => {
    const value = (material as any)[prop];
    if (value && typeof value === 'object' && value.isTexture) {
      (value as THREE.Texture).dispose();
    }
  });

  material.dispose();
}

export function disposeRenderer(renderer: THREE.WebGLRenderer): void {
  renderer.dispose();
  renderer.forceContextLoss();
  const gl = renderer.getContext();
  if (gl && gl.getExtension('WEBGL_lose_context')) {
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
```

---

## 7. Accessibility, Fallbacks & Reduced Motion Matrix

### 7.1 `prefers-reduced-motion` Enforcement
Cinematic digital experiences must strictly honor user preferences for reduced motion according to WCAG 2.2 Success Criterion 2.3.3 (Animation from Interactions).

```
+--------------------------------------------------------------------------------+
|                   PREFERS-REDUCED-MOTION EXECUTION BRANCH                      |
|                                                                                |
|  CSS Media Query: @media (prefers-reduced-motion: reduce)                      |
|  JS Detection: window.matchMedia('(prefers-reduced-motion: reduce)').matches   |
|                                                                                |
|  When REDUCED MOTION is TRUE:                                                  |
|  1. Lenis Smooth Scroll is COMPLETELY DISABLED (native instantaneous scroll).   |
|  2. GSAP timeline scrubs are collapsed: animations snap to final states.       |
|  3. Three.js Background Particle Universe: Velocity locked to zero (static).   |
|  4. Liquid Lens Cursor: Disabled; replaced with system standard cursor.        |
|  5. Liquid Image Hover Distortion: Replaced with subtle opacity/color shift.   |
|  6. Kinetic typography text-split reveals: Replaced with standard opacity fade. |
+--------------------------------------------------------------------------------+
```

### 7.2 WebGL Context Loss Recovery
If the user's GPU crashes, overheats, or experiences driver reset, the browser fires `webglcontextlost`. The application must not crash with an uncaught runtime exception.

```typescript
// hooks/useWebGLContextGuard.ts
import { useEffect } from 'react';

export function attachContextGuard(
  canvas: HTMLCanvasElement,
  onLost: () => void,
  onRestored: () => void
): () => void {
  const handleLost = (event: Event) => {
    event.preventDefault(); // Prevents default browser abort
    console.warn('[WebGL Context Lost] Pausing graphics engine.');
    onLost();
  };

  const handleRestored = () => {
    console.info('[WebGL Context Restored] Re-compiling shaders & rebuilding buffers.');
    onRestored();
  };

  canvas.addEventListener('webglcontextlost', handleLost, false);
  canvas.addEventListener('webglcontextrestored', handleRestored, false);

  return () => {
    canvas.removeEventListener('webglcontextlost', handleLost);
    canvas.removeEventListener('webglcontextrestored', handleRestored);
  };
}
```

---

## 8. Complete Project File Structure

```
cinematic-portfolio-3270836/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages / CI static deployment pipeline
├── public/
│   ├── audio/
│   │   ├── ambient-drone.mp3       # Sub-bass cinematic atmospheric drone (loop)
│   │   ├── lens-click.mp3          # Optical mechanical switch micro-foley
│   │   └── shutter.mp3             # 35mm film shutter sound effect
│   ├── fonts/
│   │   ├── Syne-Variable.woff2     # SIL OFL 1.1 Open Font (Bold cinematic display)
│   │   ├── Cormorant-Medium.woff2  # SIL OFL 1.1 Open Font (Editorial serif)
│   │   ├── InterVariable.woff2     # SIL OFL 1.1 Open Font (Technical metadata)
│   │   └── JetBrainsMono.woff2     # SIL OFL 1.1 / Apache 2.0 (HUD telemetry)
│   ├── media/
│   │   ├── posters/                # WebP/AVIF compressed high-res stills (x6)
│   │   └── previews/               # H.264 / AV1 1080p looped reels (x6)
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── shaders/
│   │       ├── particle.vert.glsl  # Particle universe vertex shader
│   │       ├── particle.frag.glsl  # Anamorphic bokeh fragment shader
│   │       ├── lens.frag.glsl      # Liquid optical lens chromatic refraction
│   │       ├── distortion.vert.glsl# Liquid image wave plane vertex shader
│   │       └── distortion.frag.glsl# Liquid image UV ripple fragment shader
│   │
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── ParticleUniverseStage.tsx   # Three.js particle canvas
│   │   │   ├── LiquidLensCursor.tsx        # Optical glass lens overlay
│   │   │   └── LiquidHoverPlane.tsx        # Liquid distortion mesh for work cards
│   │   ├── layout/
│   │   │   ├── Navigation.tsx              # Cinematic letterbox header
│   │   │   ├── SoundController.tsx         # Audio mute HUD & visualizer
│   │   │   └── SmoothScrollProvider.tsx    # Lenis + GSAP synchronization root
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx             # Video/Canvas background + kinetic title
│   │   │   ├── ParticleUniverseSection.tsx # Interactive physics playground section
│   │   │   ├── SelectedWorksSection.tsx    # Asymmetrical reel grid
│   │   │   ├── BehindTheLensSection.tsx    # Bio, technical specifications & gear
│   │   │   └── ContactSection.tsx          # Hollywood end credits crawl & contact
│   │   └── ui/
│   │       ├── LiquidHoverCard.tsx         # Single project reel card
│   │       ├── FilmModal.tsx               # 4K lightbox & director technical specs
│   │       └── Button.tsx                  # Anamorphic letterbox button
│   │
│   ├── data/
│   │   ├── projects.ts             # 6 featured cinema projects & metadata
│   │   └── gear.ts                 # Cinema technical specifications (ARRI, Cooke, etc.)
│   │
│   ├── hooks/
│   │   ├── useCriticallyDampedCursor.ts    # Damped spring cursor physics
│   │   ├── useCanvasIntersection.ts       # Viewport culling observer
│   │   ├── useWebGLContextGuard.ts        # GPU context-loss recovery
│   │   └── useAudioController.ts          # Web Audio API spatial manager
│   │
│   ├── services/
│   │   └── animation/
│   │       └── masterTicker.ts     # Unified GSAP + Lenis + Three.js loop
│   │
│   ├── store/
│   │   ├── cursorStore.ts          # Zustand store for cursor states & labels
│   │   ├── audioStore.ts           # Ambient audio and foley state
│   │   ├── lightboxStore.ts        # Lightbox active reel modal state
│   │   └── deviceStore.ts          # Device tiering & reduced motion state
│   │
│   ├── styles/
│   │   └── globals.css             # Tailwind base, typography & custom utilities
│   │
│   ├── types/
│   │   └── index.ts                # TypeScript domain models & shader uniforms
│   │
│   ├── utils/
│   │   ├── webglDisposal.ts        # Recursive VRAM memory cleanup
│   │   └── math.ts                 # Optical refraction & spring math functions
│   │
│   ├── App.tsx                     # Main layout assembly
│   ├── main.tsx                    # React root mount
│   └── vite-env.d.ts               # GLSL module declarations
│
├── .gitignore
├── index.html                      # Anamorphic viewport meta & dark cinema styling
├── package.json                    # Dependencies & scripts
├── postcss.config.js
├── tailwind.config.js              # Cinematic aspect ratios, letterbox tokens
├── tsconfig.json                   # Strict TypeScript compiler options
├── tsconfig.node.json
├── vite.config.ts                  # Vite config with vite-plugin-glsl
└── TECHNICAL.md                    # This document
```

---

## 9. Build, Verification & Deployment Strategy

### 9.1 Static Deployment Architecture
The project compiles to pure static HTML/JS/CSS assets and pre-optimized WebGL shaders. No runtime Node.js server or dynamic backend is required.

```
                    +------------------------------------+
                    |        npm run build (Vite)        |
                    +-----------------+------------------+
                                      |
                                      v
                    +-----------------+------------------+
                    |        dist/ Distribution          |
                    |  * index.html                      |
                    |  * assets/index-[hash].js (<180kB) |
                    |  * assets/index-[hash].css (<25kB) |
                    |  * media/ & audio/ static assets   |
                    +-----------------+------------------+
                                      |
        +-----------------------------+-----------------------------+
        |                             |                             |
        v                             v                             v
+---------------+             +---------------+             +---------------+
| GitHub Pages  |             | Vercel / Edge |             | Netlify CDN   |
+---------------+             +---------------+             +---------------+
```

### 9.2 Verification Protocol & Quality Gates
Before any release or merge into `main`, the implementation must pass four automated verification gates:

1. **TypeScript Type Safety Check:** `tsc --noEmit` returns exit code `0` with zero diagnostic errors.
2. **Bundle Budget Validation:** Combined initial JavaScript bundle (gzipped) must remain `<= 220 kB`.
3. **Runtime Frame Rate Verification:** Chrome DevTools Performance trace over a 10-second continuous scroll sequence must demonstrate:
   - Average Frame Rate: `>= 58.5 FPS`
   - Frame Time: `<= 16.6 ms` (95th percentile)
   - Zero long tasks exceeding `50 ms`
4. **Clean WebGL Lifecycle Test:** Verify zero GPU memory climb after navigating through all 6 project cards and opening/closing the lightbox 5 consecutive times (verified via Chrome DevTools Memory / Heapsnapshot and `console.log(renderer.info.memory)`).

---

**End of Technical Specification.**

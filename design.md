# CINEMATIC PORTFOLIO — VISUAL SPECIFICATION & DESIGN SYSTEM
**Creative Direction: A24 × Freytag Anderson × Active Theory**  
**Document Code:** `SPEC-DS-3270836`  
**Version:** 1.0.0-RELEASE  
**Target Environment:** WebGL / Modern Web (Chrome, Safari, Firefox, Edge)  
**Author:** Lead UI/UX Designer  

---

## 1. CREATIVE MANIFESTO & ART DIRECTION

This design system establishes the visual and ergonomic foundation for the **Cinematic Portfolio** of an auteur cinematographer and visual director. The interface acts as an optical instrument—subservient to the moving image yet possessing an unmistakable editorial presence.

```
       [A24]                        [FREYTAG ANDERSON]                     [ACTIVE THEORY]
Raw Cinematic Gravitas         Monolithic Editorial Discipline           Fluid WebGL Interactivity
• Heavy Film Grain             • Asymmetric Grid Rigor                   • Liquid Optical Refraction
• Anamorphic Aspect Ratios     • Monumental Grotesque Headlines          • Physical Particle Clouds
• Deep Obsidian Blacks         • High-Contrast Editorial Serifs          • Spring Inertia & Damping
• Camera Technical Metadata    • 1px Hairline Architectural Rules        • Real-Time Chromatic Fringe
```

### Anti-AI-Slop Manifesto
1. **Zero Generic Cards:** Content is structured via architectural hairline dividers (`1px solid #292929`), asymmetric proportion blocks, and whitespace tension. No soft-shadow rounded floating rectangles.
2. **Zero Cyber Neon / Purple Glows:** Illumination is strictly grounded in the physical reality of cinematography: **3200K Tungsten Warm Amber** and **5600K Daylight Anamorphic Cold Blue**. No arbitrary violet, magenta, or gradient borders.
3. **Typography as Structure:** Type scale is monumental and purposeful. Grotesque letterforms function as physical structures; classical editorial serifs inject human auteur sensibility; monospace elements evoke professional camera viewfinder HUDs (Heads-Up Displays).
4. **Physicality of Glass & Grain:** Shaders and cursor treatments are physical simulations of anamorphic glass elements (spherical aberration, chromatic separation, refractive index, surface friction), not generic decorative CSS blurs.

---

## 2. DESIGN TOKENS & SYSTEM FOUNDATION

### 2.1 Color Palette & Photometric Tokens

The color space is calibrated for ultra-deep OLED/HDR-capable displays while maintaining strict WCAG 2.1/2.2 AAA/AA accessibility compliance.

```
#080808                    #111111                    #161616                    #292929
Deep Cinema Obsidian       Slate Obsidian             Elevated Dark              Hairline Divider
[Canvas Foundation]        [Surface Base]             [Modal / Floating UI]      [Architectural Rule]

#F5F5F5                    #888888                    #444444                    #E09F3E
Warm Film White            Muted Silver               HUD Dark Grey              Warm Amber 3200K
[Primary Typography]       [Secondary / Meta]         [Timecode / Faded Info]    [Tungsten Accent]

#4A7C9B                    #D93829                    #EDE6DD
Anamorphic Blue 5600K      Tally Red                  Daylight Neutral 5000K
[Cold Anamorphic Flare]    [Live / Rec Indicator]     [Print Stills Tone]
```

#### Token Values & Contrast Matrix

| Token Name | Hex Code | RGB | Purpose / Role | Contrast vs `#080808` | WCAG Rating |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--color-canvas-primary` | `#080808` | `rgb(8, 8, 8)` | Global background, viewport base | N/A | Base |
| `--color-canvas-secondary` | `#111111` | `rgb(17, 17, 17)` | Section alternates, recessed surfaces | 1.15:1 | Structural |
| `--color-surface-elevated` | `#161616` | `rgb(22, 22, 22)` | Modals, floating HUD docks, lightbox | 1.35:1 | Structural |
| `--color-border-hairline` | `#292929` | `rgb(41, 41, 41)` | 1px grid borders, rule lines | 1.48:1 | Graphical Boundary |
| `--color-border-subtle` | `#1F1F1F` | `rgb(31, 31, 31)` | Ghost dividers, nested grid lines | 1.25:1 | Structural |
| `--color-text-primary` | `#F5F5F5` | `rgb(245, 245, 245)` | Monumental headlines, work titles, primary body | **18.2:1** | **AAA (Pass)** |
| `--color-text-secondary` | `#888888` | `rgb(136, 136, 136)` | Editorial subheaders, metadata values | **5.6:1** | **AA (Pass)** |
| `--color-text-tertiary` | `#555555` | `rgb(85, 85, 85)` | Inactive states, timecode inactive digits | 3.1:1 | Incidental / Large |
| `--color-text-muted` | `#444444` | `rgb(68, 68, 68)` | Lens spec labels, camera sensor notes | 2.2:1 | Micro-HUD |
| `--color-accent-amber` | `#E09F3E` | `rgb(224, 159, 62)` | Primary accent: 3200K Tungsten, active state | **7.9:1** | **AAA (Pass)** |
| `--color-accent-blue` | `#4A7C9B` | `rgb(74, 124, 155)` | Secondary accent: 5600K Anamorphic Cold Blue | **4.8:1** | **AA (Pass)** |
| `--color-status-rec` | `#D93829` | `rgb(217, 56, 41)` | Tally light, live playback, warning state | 4.1:1 | Graphical / UI |
| `--color-overlay-film` | `rgba(0, 0, 0, 0.72)` | `rgba(0, 0, 0, 0.72)` | Modal backdrops, video vignette | N/A | Ambient Mask |

---

### 2.2 Typography Hierarchy & System Fonts

The typographic system utilizes a tension pairing: **Heavy Monumental Grotesque** representing brutalist physical film slates and title cards, juxtaposed with **Delicate Editorial Serif** reflecting auteur storytelling, bounded by **Technical Monospace** for camera telemetry.

#### Font Stack Specifications
1. **Monumental Display:** `'Syne', 'Inter Display', 'Anton', sans-serif`  
   *Weights:* 700, 800.  
   *Usage:* Section hero statements, mega-scale numerals, project title mastheads.
2. **Editorial Serif:** `'Playfair Display', 'Cormorant Garamond', Georgia, serif`  
   *Weights:* 400, 400 Italic.  
   *Usage:* Selected auteur phrases, poetic sub-lines, awards accolades, director quotes.
3. **Primary Body & Interface:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`  
   *Weights:* 400 (Book), 500 (Medium).  
   *Usage:* Project descriptions, craft essays, form fields, action buttons.
4. **Cinematographic Telemetry (HUD):** `'JetBrains Mono', 'SF Mono', monospace`  
   *Weights:* 400, 500.  
   *Features:* `font-variant-numeric: tabular-nums;` (Zero jitter on timecode counting).  
   *Usage:* Timecodes, camera specs, aspect badges, shutter angle, audio decibel meters.

#### Typographic Scale & Rhythm

```
DISPLAY HERO:     clamp(3.5rem, 8vw + 1rem, 9.5rem)      [Syne 800, tracking: -0.04em, line-height: 0.92]
TITLE H1:         clamp(2.5rem, 5vw + 0.5rem, 5.5rem)    [Syne 700, tracking: -0.03em, line-height: 1.05]
EDITORIAL H2:     clamp(1.75rem, 3vw + 0.25rem, 3.25rem) [Playfair Display Italic, tracking: -0.01em, line-height: 1.2]
SECTION HEADER:   clamp(1.25rem, 2vw, 2.0rem)            [Syne 700 / Inter 600, uppercase, tracking: 0.08em]
BODY LEAD:        1.25rem (20px)                         [Inter 400, line-height: 1.6, max-width: 68ch]
BODY STANDARD:    1.00rem (16px)                         [Inter 400, line-height: 1.65, max-width: 65ch]
BODY COMPACT:     0.875rem (14px)                        [Inter 400, line-height: 1.5, max-width: 55ch]
HUD / MONO BASE:  0.8125rem (13px)                       [JetBrains Mono 400, uppercase, tracking: 0.06em]
HUD / MICRO MONO: 0.6875rem (11px)                       [JetBrains Mono 500, uppercase, tracking: 0.20em]
TIMECODE NUMERIC: 0.75rem (12px)                         [JetBrains Mono Tabular, tracking: 0.12em]
```

---

### 2.3 Grid, Spacing & Layout Architecture

Built upon a strict **8px baseline module** with an asymmetric 12-column editorial grid.

```
Desktop (1440px+): 12 Columns | 24px Gutter | 64px / 80px Outer Margins
Laptop (1024px):   12 Columns | 20px Gutter | 48px Outer Margins
Tablet (768px):    8 Columns  | 16px Gutter | 32px Outer Margins
Mobile (375px):    4 Columns  | 12px Gutter | 20px Outer Margins
```

#### Spacing Tokens
- `--space-1`: `4px` (Micro gap, indicator offset)
- `--space-2`: `8px` (HUD padding, tag spacing)
- `--space-3`: `12px` (Dense metadata clusters)
- `--space-4`: `16px` (Component inner gutter)
- `--space-6`: `24px` (Grid standard gutter)
- `--space-8`: `32px` (Card / media header spacing)
- `--space-12`: `48px` (Sub-section boundary)
- `--space-16`: `64px` (Standard section vertical buffer)
- `--space-24`: `96px` (Major section transition)
- `--space-32`: `128px` (Monumental pause / breathing room)

---

## 3. LIQUID LENS CURSOR SYSTEM (PHYSICAL SPECIFICATION)

The cursor functions as a physical anamorphic optical lens hovering over the digital film surface.

```
       [ DEFAULT RESTING STATE ]                       [ HOVER OVER VIDEO / MEDIA ]
            + 36px Ring                                        ~110px - 140px Expanded
        ┌────────────────┐                                ┌──────────────────────────────┐
        │       ·        │                                │        /────────────\        │
        │    ── + ──     │   ────────────►                │       /  [ 00:04 ]   \       │
        │       ·        │    Hover Media                 │      │   VIEW FILM    │      │
        └────────────────┘                                │       \  Cooke 40mm  /       │
        Center Haircross                                  │        \────────────/        │
        1px Hairline Silver                               └──────────────────────────────┘
                                                          Magnification: 1.25x | Fringe: 0.015
```

### 3.1 Mathematical & Shader Specification
- **Base Geometry:** Circular viewport mesh, default resting diameter `36px`, expanding dynamically to `110px` on clickable targets and `140px` on film reel thumbnails.
- **Glass Bevel:** Radial border gradient (`border: 1px solid rgba(245, 245, 245, 0.22)`), with an inner optical shadow `inset 0 0 16px rgba(255, 255, 255, 0.04)`.
- **Chromatic Aberration (Fringe):**
  - GLSL fragment shader sampling the underneath framebuffer with RGB channel displacement:
    ```glsl
    vec2 dir = (uv - center);
    float dist = length(dir);
    float displacement = pow(dist, 2.0) * u_chromaticIntensity; // 0.015
    vec4 r = texture2D(u_scene, uv + dir * displacement);
    vec4 g = texture2D(u_scene, uv);
    vec4 b = texture2D(u_scene, uv - dir * displacement);
    gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
    ```
- **Magnification (Optical Refraction):**
  - Center magnification factor: `1.25x` barrel distortion.
  - Linear falloff toward the rim simulating Cooke Anamorphic / Panavision spherical curvature.
- **Physics & Inertial Lag:**
  - Standard smooth interpolation (Lerp):
    $$\text{pos}_{\text{current}} = \text{pos}_{\text{current}} + (\text{pos}_{\text{target}} - \text{pos}_{\text{current}}) \times \alpha$$
    where $\alpha = 0.12$ (standard spring responsiveness) and damping factor $\zeta = 0.85$.
  - Velocity stretch: Elongates slightly along the movement vector axis ($\text{aspect} = 1.0 + \min(\text{velocity} \times 0.003, 0.25)$) at angle $\theta = \operatorname{atan2}(v_y, v_x)$.
- **Hover Micro-Copy & HUD Center:**
  - On hovering works: Centered text `VIEW FILM`, `font-size: 9px`, `font-family: 'JetBrains Mono'`, `font-weight: 500`, `letter-spacing: 0.25em`, `color: #F5F5F5`.
  - Secondary micro-tag below: Aspect ratio indicator (e.g., `[ 2.39:1 ]`) in `#888888`.
- **Click Feedback:**
  - Sudden spring compression to `92px` in 90ms (`cubic-bezier(0.2, 0.9, 0.3, 1)`), followed by optical chromatic flash (`0.035` split), then expanding into full viewport modal transition.
- **Graceful Fallback:**
  - Hidden on touch-enabled devices via `@media (hover: none) and (pointer: coarse)`.
  - Disabled and flattened to a standard high-contrast pointer when `prefers-reduced-motion: reduce` is detected.

---

## 4. SECTION-BY-SECTION ARCHITECTURAL SPECIFICATIONS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 01. IMMERSIVE HERO           [Full-bleed Video/Canvas + Ambient Telemetry]   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 02. PARTICLE UNIVERSE        [Interactive 3D Fluid Dust & Anamorphic Smoke] │
├─────────────────────────────────────────────────────────────────────────────┤
│ 03. SELECTED WORKS           [Asymmetric Widescreen Grid + Modal Player]    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 04. BEHIND THE LENS          [Artistic Philosophy + Technical Gear Spec]    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 05. CONTACT / END CREDITS    [A24 Film Credit Crawl + Production Inquiries] │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### SECTION 01: IMMERSIVE HERO

The opening sequence operates like the prologue of a feature film. It establishes scale, atmospheric weight, and technical precision within the first 1.5 seconds.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [REC ● 24FPS]    [ARRI ALEXA LF // COOKE ANAMORPHIC]     [AUDIO: ON/OFF ∿∿] │
│                                                                              │
│                                                                              │
│               R O H A N   V A N C E                                          │
│         ─── DIRECTOR OF PHOTOGRAPHY ───                                      │
│               "Sculpting shadow into light."                                 │
│                                                                              │
│                                                                              │
│ 00:00:00:00 [TIMECODE ACTIVE]                   SCROLL TO ENTER REEL ↓       │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### Layout & Hierarchy
- **Header Telemetry Bar (Fixed/Top, 48px height):**
  - Left: Red Recording Tally Indicator (`#D93829` 6px pulsing dot, `font-mono: 11px [REC ● 24FPS 180°]`).
  - Center: Master Camera Manifest (`ARRI ALEXA LF // COOKE ANAMORPHIC / 2.39:1`).
  - Right: **Sound/Ambient Toggle** (Custom audio waveform visualizer + `[SOUND: OFF / ON]`).
- **Main Hero Core:**
  - Background: Full-bleed WebGL canvas executing real-time film emulsion grain shader overlaying a silent 4K loop of anamorphic dusk cinematography.
  - Primary Typographic Masthead:
    - Line 1: `ROHAN VANCE` — Monumental Grotesque (`Syne 800`, `clamp(3.5rem, 9vw, 9.5rem)`, letter-spacing `-0.03em`, `#F5F5F5`).
    - Line 2: `DIRECTOR OF PHOTOGRAPHY` — Architectural Spaced Sans (`Inter 600`, `14px`, uppercase, letter-spacing `0.3em`, `#888888`).
    - Line 3: *"Sculpting shadow before shaping light."* — Editorial Contrast Serif (`Playfair Display Italic 400`, `clamp(1.5rem, 2.5vw, 2.75rem)`, `#E09F3E` Warm Amber).
- **Footer Telemetry & Scroll Cue (Bottom, 56px height):**
  - Left: Rolling SMPTE Timecode (`JetBrains Mono`, `00:00:00:00` counting synchronously with user scroll delta).
  - Center: Single 1px hairline scroll progress line descending into Section 02.
  - Right: Micro-action cue: `[ EXPLORE REEL ] ↓` with micro-bounce spring animation (4px vertical travel, 1.8s loop).

#### Film Grain Overlay Specification
- Procedural GLSL grain shader rendered onto a non-blocking `<canvas>` layer:
  ```glsl
  float noise = fract(sin(dot(uv * u_time, vec2(12.9898, 78.233))) * 43758.5453);
  gl_FragColor = vec4(vec3(noise), 0.045); // Subtle 4.5% opacity, soft-light blend
  ```
- Contrast enhancement: Vignette curve falloff $\cos(\text{dist} \times 1.4)$ darkening outer screen boundaries by 35%.

---

### SECTION 02: PARTICLE UNIVERSE (ATMOSPHERIC DEPTH)

This section shifts the sensory experience from the macro view of the film to the micro-physics of photographic light.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 02 / OPTICAL PHYSICS & ATMOSPHERE                                            │
│                                                                              │
│       ·   ·  .       ·   [ CURSOR REPULSION FIELD ]   .   ·       ·          │
│     ·   .   ·   ·          * * *                               .     ·       │
│   ·   ·   .   ·          *       *    (FLUID AMBER DRIFT)        ·   ·   .   │
│ .   ·   ·               *  +110px *                                .   ·     │
│       ·   .              *       *         "Every photon is an intentional   │
│     ·   ·   .              * * *            decision in darkness."           │
│   .   ·   ·   ·      ·   .       ·   .                                       │
│                                                                              │
│ [PARTICLE DENSITY: 12,000 PTS]       [DEPTH FIELD: f/1.4]       [ISO: 800]   │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### Layout & Visual Dynamics
- **WebGL Particle Cloud Architecture:**
  - 12,000 GPU instanced point sprites representing suspended atmospheric haze, studio dust, and warm tungsten flare embers.
  - Color distribution: 70% deep silver/smoke (`#333333` to `#666666`), 20% tungsten amber (`#E09F3E`), 10% anamorphic blue sheen (`#4A7C9B`).
  - Size attenuation: Points vary from `1.5px` to `6.0px` based on Z-depth field (`z` range: `-500` to `+200`).
- **Interactive Cursor Physics:**
  - Cursor presence exerts an inverse-square repulsion force:
    $$\vec{F}_{\text{repel}} = \frac{\vec{P}_{\text{particle}} - \vec{P}_{\text{cursor}}}{\|\vec{P}_{\text{particle}} - \vec{P}_{\text{cursor}}\|^3} \times k_{\text{force}}$$
  - Soft elastic return with fluid damping ($0.94$). As the user sweeps the cursor across the canvas, particles part like smoke and swirl in an organic vortex.
- **Narrative Overlay:**
  - Pinned center-right editorial statement:
    - Label: `02 // ATMOSPHERIC DISCIPLINE` (`JetBrains Mono 11px`, `#888888`, tracking `0.2em`).
    - Statement: *"Light has no meaning without the architecture of darkness. We do not illuminate the scene; we carve visibility out of the void."* (`Syne 700`, `clamp(1.75rem, 3.5vw, 3.25rem)`, `#F5F5F5`).
- **Telemetry Readout (Bottom Border):**
  - Live technical HUD: `DENSITY: 12,000 PTS // OPTICAL DOF: f/1.4 // SENSOR TEMP: 3200K // LATENCY: 16.6MS (60FPS)`.

---

### SECTION 03: SELECTED WORKS (ASYMMETRIC EDITORIAL GRID)

The core portfolio gallery is structured as an intentional editorial film slate layout—avoiding standard symmetrical card grids. Each project occupies an aspect ratio authentic to its theatrical distribution format.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ SELECTED CINEMATOGRAPHY (2022—2026)                      [FILTER: ALL / NARRATIVE / COMMERCIAL / MUSIC]
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────┐                    │
│  │                                                      │ [01] THE BLACK MONOLITH
│  │              ASPECT RATIO 2.39:1                     │      Feature Film · A24 Release
│  │              ANAMORPHIC WIDESCREEN                   │      Arri Alexa 65 / Panavision C
│  │                                                      │      Role: Director of Photography
│  └──────────────────────────────────────────────────────┘      [ VIEW PROJECT ↗ ]
│                                                                              │
│  ┌─────────────────────────────┐  ┌────────────────────────────────────────┐ │
│  │                             │  │                                        │ │
│  │   ASPECT RATIO 4:3          │  │   ASPECT RATIO 16:9                    │ │
│  │   ACADEMY RATIO             │  │   COMMERCIAL FILM                      │ │
│  │   [02] NOSTALGIA FOR ASHES  │  │   [03] CHRONOMASTER LUXURY             │ │
│  │   35mm Kodak 5219 Film      │  │   Red V-Raptor / Master Anamorphic     │ │
│  └─────────────────────────────┘  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### Layout Specifications & Aspect Ratios
- **Asymmetric Grid Rhythm:**
  - **Item 01 (Hero Lead):** Full 12 columns. Aspect Ratio: **`2.39:1` (Scope)**. Reserved for flagship theatrical release.
  - **Item 02 (Left Column):** 5 columns wide. Aspect Ratio: **`4:3` (Academy Ratio)**. Indie / auteur 35mm film project.
  - **Item 03 (Right Column):** 7 columns wide. Aspect Ratio: **`16:9` (Cinema Flat)**. High-concept commercial.
  - **Item 04 (Left Column):** 7 columns wide. Aspect Ratio: **`2.00:1` (Univisium)**. Episodic streaming series.
  - **Item 05 (Right Column):** 5 columns wide. Aspect Ratio: **`1:1` (Square Frame)**. Experimental video art installation.
- **Card Anatomy & Metadata Lockup:**
  - **Media Surface:** Video thumbnail container with hairline border (`1px solid #292929`).
  - **Live Shimmer / Hover Distortion:**
    - On hover, the thumbnail initiates a real-time GLSL water/glass refractive wave distortion reacting to cursor movement speed.
    - Video playback silently scrubs forward on hover.
  - **Metadata Slate (Below Media):**
    - Line 1: `01 / TITLE OF WORK` (`Syne 700`, `22px`, `#F5F5F5`).
    - Line 2: `FEATURE FILM // 2025 // A24 DISTRIBUTION` (`JetBrains Mono 11px`, `#888888`, tracking `0.15em`).
    - Line 3: `ARRI ALEXA LF · COOKE ANAMORPHIC / 24FPS · 2.39:1` (`JetBrains Mono 10px`, `#555555`).
    - Aspect Ratio Badge: Top-right corner of thumbnail, micro pill badge (`background: rgba(8, 8, 8, 0.75); border: 1px solid #292929; padding: 4px 8px; font-mono: 10px; color: #E09F3E;`).

#### Video Lightbox Modal Specification
- Trigger: Clicking any project thumbnail triggers an instantaneous cursor shrink (`92px`) followed by a full-screen cinematic overlay transition (320ms `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Modal Viewport:**
  - Background: 92% opaque Deep Cinema Obsidian (`rgba(8, 8, 8, 0.94)`) with `backdrop-filter: blur(24px)`.
  - Center: Cinema Player locked to the film’s native aspect ratio (up to 85vw, 80vh max).
  - Video Engine: HLS / MP4 adaptive streaming player with custom custom-styled hairline scrub bar (`#292929` track with `#E09F3E` playhead).
  - Top Bar: Project title, aspect badge, and Close Button (`[ESC] ✕` with 44x44px touch area).
  - Bottom Panel: Extended Cinematographer Notes, Lighting Diagram thumbnail, full crew credits, and raw camera look notes.

---

### SECTION 04: BEHIND THE LENS (CRAFT & TECHNICAL MANIFEST)

This section presents the cinematographer's personal craft philosophy alongside an uncompromised, utilitarian technical gear manifest.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 04 / BEHIND THE LENS                                                         │
├──────────────────────────────────────┬───────────────────────────────────────┤
│ [ MONOCHROME HIGH-CONTRAST PORTRAIT ]│ CRAFT STATEMENT                       │
│                                      │ "Light is physical weight."           │
│ 35mm Silver Halide Portrait          │                                       │
│ 1px Hairline Frame                   │ My work centers on the tactile        │
│ Cooke Anamorphic Flare Bleed         │ tension between deep optical shadow   │
│                                      │ and intentional luminescence.         │
│                                      │                                       │
│ SENSOR: 36.70 × 25.54 mm (LF)        ├───────────────────────────────────────┤
│ COLOR SCIENCE: ACEScg Standard       │ TECHNICAL ARSENAL                     │
│ NATIVE ISO: 800 Dual Gain            │ • ARRI Alexa Mini LF / Alexa 35       │
│                                      │ • Cooke Anamorphic /i Full Frame Plus │
│                                      │ • Atlas Orion Anamorphic Series       │
│                                      │ • LiteGear Auroras & Mole Richardson  │
└──────────────────────────────────────┴───────────────────────────────────────┘
```

#### Layout Specifications
- **Two-Column Asymmetric Split (7 cols / 5 cols):**
  - **Left Column (Portrait & Sensor Specs):**
    - High-contrast black and white portrait of the cinematographer on set.
    - Treatment: Silver halide grain texture, 1px `#292929` border, technical frame marks on corners (viewfinder crop marks `┌ ┐ └ ┘`).
    - Under-photo Sensor HUD:
      - `SENSOR DIMENSION: 36.70 × 25.54 mm (ARRI LPL MOUNT)`
      - `COLOR WORKFLOW: ACES 1.3 / KODAK 5207 250D EMULATION`
      - `DYNAMIC RANGE: 14.5+ STOPS`
  - **Right Column (Auteur Statement & Gear Manifest):**
    - Auteur Philosophy Header: *"Lighting is not subtraction of darkness; it is the deliberate preservation of shadow."* (`Playfair Display Italic`, `clamp(1.5rem, 2.8vw, 2.75rem)`, `#F5F5F5`).
    - Body Essay: 2 concise paragraphs on optical texture, lens flare control, and physical spatial blocking (`Inter 400`, `16px`, `#888888`, line-height `1.65`).
    - Technical Arsenal Accordion / Data Grid:
      - Category 01: **Bodies** (ARRI Alexa 35, ARRI Alexa LF, Bolex H16 Reflex).
      - Category 02: **Glass** (Cooke Anamorphic /i SF 32/40/50/75/100mm, Zeiss Super Speeds T1.3, Canon K35).
      - Category 03: **Lighting Systems** (ARRI SkyPanel X21/X22, Astera Titan Tubes, Mole-Richardson Tungsten 5K/10K).
      - Category 04: **Color & Post** (DaVinci Resolve Studio, ACEScg, Custom Film Density LUTs).

---

### SECTION 05: CONTACT / END CREDITS

The closing section breaks the typical web form cliché by transforming contact into a monumental theatrical **End Credits Crawl**.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                         L E T ' S   C R E A T E                              │
│                      S O M E T H I N G   R A W                               │
│                                                                              │
│                                                                              │
│ REPRESENTATION (WORLDWIDE)           PRODUCTION HEADQUARTERS                 │
│ Independent Talent Group             Vance Optical Studio                    │
│ Agent: Sarah Jenkins                 404 Film Row, Studio District           │
│ s.jenkins@independenttalent.co.uk    London & Los Angeles                    │
│                                                                              │
│ DIRECT INQUIRIES                     TECHNICAL TELEMETRY                     │
│ studio@rohanvance.film               CURRENT LOCAL TIME: 23:42:18 GMT        │
│ +44 (0) 20 7946 0912                 SERVER LOCATION: LONDON [UK-LON-1]      │
│                                                                              │
│ ──────────────────────────────────────────────────────────────────────────── │
│ © 2026 ROHAN VANCE · REGISTERED IN ENGLAND & WALES · ALL RIGHTS RESERVED     │
│ PRODUCED IN ULTRA-PANAVISION 70 FORMAT · COLOR BY TECHNICOLOR                │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### Layout Specifications
- **Monumental Title Call:**
  - `LET'S CREATE SOMETHING RAW.` (`Syne 800`, `clamp(2.75rem, 7vw, 7.5rem)`, uppercase, tracking `-0.02em`, `#F5F5F5`).
  - Sub-line in Warm Amber: *"Open for narrative feature films, commercial campaigns, and selected music visions."* (`Inter 500`, `16px`, `#E09F3E`).
- **Two-Column Credits Structure:**
  - Left Column (Role / Title): Monospace uppercase (`JetBrains Mono 12px`, tracking `0.18em`, `#888888`).
  - Right Column (Entity / Details): High-contrast clean sans (`Inter 500`, `16px`, `#F5F5F5`).
  - Active Email & Link Interaction:
    - Hovering an email (`studio@rohanvance.film`) displays an inline copy button: `[CLICK TO COPY DIRECT EMAIL]`.
    - Clicking changes state to `COPIED TO CLIPBOARD ✓` with a subtle amber flash (`#E09F3E`).
- **Production Footer Slate:**
  - Monolithic 1px border separation (`#292929`).
  - Theatrical credit block: `FILMED ON LOCATION · ARRI ALEXA LF · COOKE ANAMORPHIC GLASS · PRODUCED UNDER CINEMATOGRAPHERS GUILD STANDARDS · SOUND DESIGN INTEGRATED`.

---

## 5. COMPONENT SPECIFICATIONS & INTERACTION STATE MATRIX

Every interactive component across the portfolio is specified with strict state coverage.

```
STATE MATRIX FLOW:
[ DEFAULT ] ──► [ HOVER ] ──► [ ACTIVE / PRESS ] ──► [ FOCUS-VISIBLE ] ──► [ DISABLED ]
       │              │                │
       ▼              ▼                ▼
[ LOADING / SKELETON ]  [ EMPTY STATE ]  [ ERROR STATE ]
```

### 5.1 Interactive Component State Matrix

| Component | Default | Hover | Active / Press | Focus-Visible | Disabled | Loading / Skeleton | Error State |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Film Card (Works Grid)** | 1px border `#292929`, static image with 4% grain, metadata `#888888` | Liquid refraction wave active, cursor expands to 140px "VIEW FILM", title `#F5F5F5` | Scale `0.99`, momentary chromatic fringe spike (0.035), lightbox opens | 2px solid `#E09F3E` outline, 2px offset | Opacity `0.4`, `cursor: not-allowed`, tag `[IN PRODUCTION]` | Shimmering 16-shade grey pulse (`#111` to `#181818`), 1.4s cycle | Red tally badge `[REEL CORRUPTED]`, fallback poster loaded |
| **Sound / Ambient Toggle** | Border `#292929`, mono text `[SOUND: OFF]`, static 3-bar waveform | Border `#888888`, text `#F5F5F5`, bars oscillate slightly (2px amplitude) | Immediate audio un-mute, text flips to `[SOUND: ON]`, bars animate | 2px hairline ring `#E09F3E`, outline offset 2px | Opacity `0.3`, text `[AUDIO UNAVAILABLE]` | Sine wave loading spinner `16px` | Micro-alert `[AUDIO ENGINE BLOCKED]`, retry link |
| **Primary CTA (Inquiry)** | Solid `#111111`, border `#292929`, text `#F5F5F5`, 48px height | Background `#E09F3E`, border `#E09F3E`, text `#080808` (high contrast) | Scale `0.97`, background `#C87D28` | 2px ring `#E09F3E`, offset 3px | Background `#161616`, text `#444444`, border `#1F1F1F` | Amber rolling timecode spinner `[TRANSMITTING...]` | Red hairline border `#D93829`, message `[FAILED TO SEND]` |
| **Video Scrub Bar (Lightbox)** | Height 2px, background `#292929`, playhead width matching time | Height expands to 6px, playhead dot appears (`8px #E09F3E`) | Scrubbing active, frame tooltip with SMPTE timecode displays | 2px ring around playhead knob | Height 1px, background `#1F1F1F`, no knob | Indeterminate amber progress line moving left-to-right | Red track `#D93829`, notification `[STREAM BUFFER ERROR]` |
| **Text Input (Contact Form)** | Background `#0D0D0D`, border `#292929`, text `#F5F5F5`, placeholder `#555` | Border `#555555` | Background `#111111`, border `#888888` | Border `#E09F3E`, box-shadow `0 0 0 1px #E09F3E` | Background `#080808`, text `#333`, border `#161616` | Disabled with rolling pulse placeholder | Border `#D93829`, label `[REQUIRED FIELD MISSING]` in red |

---

## 6. SOUND DESIGN & AMBIENT AUDIO ARCHITECTURE

Sound in this system is an organic atmospheric layer that enhances physical tactile presence without causing cognitive fatigue.

### 6.1 Audio Principles
1. **Strictly Opt-In:** In accordance with modern browser policies and user respect, ambient audio starts strictly in the `MUTED` state.
2. **Audio Profile:**
   - **Background Drone:** Low 45Hz sub-bass room tone combined with subtle 35mm optical soundtrack projector hiss (pink noise filtered through a 2.5kHz low-pass filter).
   - **Micro-Interactions (Spatial Clicks):**
     - Hover on work card: Ultra-short mechanical shutter click (duration: `35ms`, frequency: `1.8kHz`, amplitude: `-18dB`).
     - Lightbox open: Deep optical lens focus motor slide (duration: `180ms`, frequency sweep `120Hz → 60Hz`).
     - Audio toggle click: Analog toggle relay switch (`15ms`, `3.2kHz`).
3. **Decibel Limiting:** Master output capped at `-14 LUFS` to prevent jarring acoustic jumps.
4. **Visibility Awareness:** Audio fades out smoothly in 250ms when `document.visibilityState === 'hidden'`.

---

## 7. RESPONSIVE LAYOUT ENGINE & BREAKPOINTS

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ DESKTOP (1440+) │ LAPTOP (1024px) │ TABLET (768px)  │ MOBILE (375px)  │
│ 12 Columns      │ 12 Columns      │ 8 Columns       │ 4 Columns       │
│ Liquid Lens ON  │ Liquid Lens ON  │ Liquid Lens OFF │ Touch Native    │
│ Full Shaders    │ Full Shaders    │ 6k Particles    │ 2.5k Particles  │
│ 80px Margins    │ 48px Margins    │ 32px Margins    │ 20px Margins    │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### 7.1 Breakpoint Specifications

#### Desktop Wide (1440px — 2560px+)
- Container max-width: `1760px`.
- Margin: `80px` left/right.
- Liquid Lens Cursor: Fully active with 110px glass bevel and 0.015 chromatic split.
- Particles: 12,000 points, interactive cursor repulsion active.
- Asymmetric Grid: 12-column editorial distribution (2.39:1, 16:9, 4:3 side-by-side).

#### Laptop Standard (1024px — 1439px)
- Margin: `48px` left/right.
- Typography: Fluid clamp adjustments scale headlines down by ~15%.
- Grid: Retains 12 columns; card gutters reduce from 24px to 20px.
- Performance: WebGL canvas drops DPR to `Math.min(window.devicePixelRatio, 1.5)`.

#### Tablet (768px — 1023px)
- Margin: `32px` left/right.
- Cursor: Liquid lens disabled; standard touch input with 240ms tactile active states.
- Particles: Reduced to 6,000 points; repulsion replaced with gentle touch drag ripple.
- Works Grid: Transitions to alternating 8-column layout (cards span 8 cols or 4+4 cols).

#### Mobile Viewport (375px — 767px)
- Margin: `20px` left/right.
- Grid: 4 columns; single column vertical stack for all film projects.
- Aspect Ratios: Film cards maintain strict aspect ratios (`2.39:1`, `16:9`, `4:3`) with horizontal container bounds.
- Navigation / Header: Collapses to minimalist fixed bottom telemetry bar:
  - Left: `[REC ● 24FPS]`
  - Center: Project title badge
  - Right: `[MENU]` trigger (opens full-bleed dark drawer).
- Touch Targets: All interactive buttons and links have a minimum hit target of `48px × 48px`.
- Particles: Reduced to 2,500 points with static low-overhead ambient drift (30 FPS cap to preserve battery life).

---

## 8. ACCESSIBILITY (A11Y) & MOTION SENSITIVITY

This design guarantees compliance with **WCAG 2.1 / 2.2 AA and AAA** criteria while preserving its high-end cinematic aesthetic.

### 8.1 Reduced Motion (`prefers-reduced-motion: reduce`)
When the user has requested reduced motion at the OS level:
1. **Liquid Lens Cursor:** Disabled immediately. Native OS cursor restored.
2. **WebGL Particles:** Repulsion physics and high-velocity turbulence are stopped. Particles enter a slow, imperceptible laminar drift (`speed: 0.04`).
3. **Liquid Shaders & Wave Distortions:** Liquid refraction shaders on hover are bypassed. Replaced by a clean `180ms` linear opacity fade (`opacity: 0.85 → 1.0`).
4. **Cinematic Hero Video:** Autoplay loop pauses; static high-resolution cinematographic film still is rendered.
5. **Scroll Smoothing:** Inertial smooth-scrolling engines (e.g. Lenis) are detached; standard native browser scrolling is honored.

### 8.2 Contrast & Readability Verification
- Primary text (`#F5F5F5` on `#080808`): **18.2:1** (Exceeds AAA 7.0:1 threshold).
- Secondary metadata (`#888888` on `#080808`): **5.6:1** (Exceeds AA 4.5:1 threshold for normal text, exceeds AAA 4.5:1 for large text).
- Accent Amber (`#E09F3E` on `#080808`): **7.9:1** (Exceeds AAA 7.0:1 threshold).
- Form inputs and clickable buttons: Focus indicators utilize a 2px solid `#E09F3E` ring with `2px` offset (`outline-offset: 2px`).

### 8.3 Screen Reader & Keyboard Navigation
- **Semantic HTML5:** Built using `<main>`, `<header>`, `<nav>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
- **Skip Link:** Hidden keyboard-only link at `body:first-child`: `[Skip to Cinema Works Grid]` focusing `#selected-works`.
- **Screen Reader Announcements:** Dynamic `aria-live="polite"` region announcing video playback status (e.g., *"Now playing: The Black Monolith, runtime 2 minutes 45 seconds"*).
- **Tab Order:** Strict sequential focus path across header controls, works grid items, craft details, and credit contact links.

---

## 9. FRONTEND IMPLEMENTATION GUIDELINES

### 9.1 CSS Root Tokens Ready for Extraction

```css
:root {
  /* Surface & Canvas Tokens */
  --color-canvas-primary: #080808;
  --color-canvas-secondary: #111111;
  --color-surface-elevated: #161616;
  --color-border-hairline: #292929;
  --color-border-subtle: #1F1F1F;

  /* Typographic Color Tokens */
  --color-text-primary: #F5F5F5;
  --color-text-secondary: #888888;
  --color-text-tertiary: #555555;
  --color-text-muted: #444444;

  /* Photometric Accent Tokens */
  --color-accent-amber: #E09F3E;
  --color-accent-amber-glow: rgba(224, 159, 62, 0.18);
  --color-accent-blue: #4A7C9B;
  --color-accent-blue-glow: rgba(74, 124, 155, 0.18);
  --color-status-rec: #D93829;

  /* Typography Families */
  --font-display: 'Syne', 'Inter Display', sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;

  /* Motion & Spring Easing */
  --ease-cinematic-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.2, 0.9, 0.3, 1);
  --ease-shutter: cubic-bezier(0.7, 0, 0.3, 1);

  /* Elevation & Hairlines */
  --border-hairline: 1px solid var(--color-border-hairline);
  --border-subtle: 1px solid var(--color-border-subtle);
}
```

### 9.2 Three.js / WebGL Architecture Skeleton

```
[ Canvas Element: #webgl-viewport ]
├── Scene
│   ├── Camera: PerspectiveCamera(45, aspect, 0.1, 1000)
│   ├── Layer 01: Ambient Dust PointCloud (BufferGeometry + PointsMaterial)
│   ├── Layer 02: Cinematic Video Quad (PlaneGeometry + Anamorphic Distortion Shader)
│   ├── Layer 03: Liquid Lens Mesh (Targeted Framebuffer Render Target)
│   └── Post-Processing Pass:
│       ├── Film Grain Shader (Procedural Emulsion Noise)
│       ├── Anamorphic Chromatic Aberration Pass
│       └── Optical Vignette Pass
```

---

## 10. DESIGN DECISION LOG & QUALITY ASSURANCE

1. **Why `#080808` instead of pure `#000000`?**  
   Pure `#000000` creates harsh clipping with video textures and causes OLED pixel smearing during rapid scroll. `#080808` (Deep Cinema Obsidian) preserves black-level depth while allowing subtle optical shadows and grain textures to breathe.
2. **Why Cooke Anamorphic ratio `2.39:1` as primary visual anchor?**  
   `2.39:1` is the historical standard for widescreen cinematic features. Its wide horizontal field immediately cues theatrical intent, distinguishing the portfolio from standard commercial web design.
3. **Why JetBrains Mono for metadata?**  
   Film production demands precise telemetry. JetBrains Mono features clean tabular glyphs, crystal-clear distinction between `0` and `O`, and sharp optical legibility at `10px` scale.
4. **Why opt-in sound?**  
   Unexpected audio is an anti-pattern that violates user trust and WCAG accessibility standards. An ambient soundscape must be a conscious artistic choice engaged by the viewer.

---
*Signed by Lead UI/UX Designer — Cinematic Web Architecture Division*  
*Document finalized for handoff to frontend development.*

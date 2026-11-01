# CINEMATIC PORTFOLIO — IMMERSIVE DIGITAL EXPERIENCE
**Auteur Cinematographer & Director of Photography Portfolio**  
*Creative Direction: A24 × Freytag Anderson × Active Theory*  
*Project ID: KWORK-3270836*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-E09F3E?style=for-the-badge&logo=github)](https://fen3211.github.io/cinematic-portfolio-3270836/)
[![License: MIT](https://img.shields.io/badge/License-MIT-4A7C9B?style=for-the-badge)](LICENSE)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL2-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)

---

## 📽 Live Demonstration
🌐 **Interactive Web Page:** [https://fen3211.github.io/cinematic-portfolio-3270836/](https://fen3211.github.io/cinematic-portfolio-3270836/)  
📂 **GitHub Repository:** [https://github.com/fen3211/cinematic-portfolio-3270836](https://github.com/fen3211/cinematic-portfolio-3270836)

---

## 🏛 Artistic & Architectural Manifesto

> *"The website should feel like entering a film, not browsing a portfolio."*

Designed under the trifecta of modern digital cinema:
1. **A24 Editorial Gravitas:** Archival bone-white typography (`#F5F5F5`) anchored over deep 35mm obsidian (`#080808`), procedural silver-halide film grain, anamorphic aspect ratios (`2.39:1`, `4:3`, `16:9`), and authentic camera telemetry (ARRI Alexa 65, Cooke Anamorphic /i, Kodak 5219).
2. **Freytag Anderson Asymmetry:** Monolithic 12-column staggered editorial composition, intentional whitespace tension, 1px architectural hairline rules (`#292929`), and viewfinder registration marks.
3. **Active Theory Interactive Systems:** Divergence-free 3D Curl Noise GPU particle universe (12,000 points), real-time optical liquid lens refraction cursor with chromatic dispersion, and velocity-excited GLSL liquid image distortion.

---

## ⚡ Core Feature Highlights

### 1. Liquid Optical Lens Cursor
- **Physical Glass Meniscus:** Simulates true optical crown glass ($n \approx 1.52$) with spherical meniscus refraction and 1.25x barrel magnification.
- **Cauchy Chromatic Dispersion:** Separate sampling of Red, Green, and Blue rays along refracted vectors for delicate real-time optical fringing.
- **2nd-Order Spring Dynamics:** Critically damped follow physics ($\zeta = 0.82$, $\omega_n = 18\text{ rad/s}$) creating an authentic anamorphic camera rig weight.
- **State Morphing:**
  - `Default`: 36px targeting reticle with hairline crosshair.
  - `Film Hover`: 120px optical lens with centered micro-mono `VIEW FILM` tag and 24fps pulse.
  - `Link Hover`: 64px magnetic bracket focus ring.
  - `Touch Screen`: Gracefully deactivated on touch devices to ensure pure mobile ergonomics.

### 2. GPU Particle Universe & Dust Dynamics
- **12,000 GPU Sprites:** Hardware-tiered particle count (12k desktop, 5k tablet, 2k mobile) rendered via WebGL instancing.
- **3D Curl Noise Field:** Analytical divergence-free fluid velocity field ($\nabla \cdot \vec{V} = 0$) preventing artificial clumping and creating natural atmospheric dust suspension.
- **Physical Mouse Repulsion:** Inverse-square repulsion force when pointer moves through particle clouds.
- **Shockwave Impulse Fronts:** Real-time radial shockwave propagation ($R(t) = v \cdot \Delta t$) triggered anywhere via click or dedicated HUD control.
- **Cursor Dust Trail:** Thermal convection micro-particles trailing cursor path with gentle 600ms alpha decay.

### 3. GLSL Liquid Image Distortion
- **Velocity-Driven Ripple:** Image plates flex dynamically along pointer velocity vectors when hovered.
- **Elastic Relaxation:** Directional wave equation dissipating cleanly back to identity with frame-rate independent exponential decay within 350ms.

### 4. Kinetic Typography & Smooth Flow
- **Native Character/Word Splitting:** Editorial title choreography built cleanly without proprietary commercial plugins.
- **Lenis Smooth Scroll:** Synchronized with GSAP ScrollTrigger ticker under a unified master RAF loop.
- **Full-Screen Theatrical Film Modal:** 2.39:1 letterbox matte, 24fps SMPTE timecode (`00:01:24:18`), playhead scrubber, director/crew billing blocks, and camera sensor telemetry.

### 5. Synthesized Web Audio Engine
- **Zero Missing Assets:** 100% procedurally synthesized via Web Audio API.
- Sub-bass 55Hz ambient cinematic drone with gentle low-pass LFO breathing.
- Mechanical 15ms optical shutter/lens micro-foley on modal and button activations.
- Strict compliance with browser audio autoplay policies (muted by default, activated on explicit user gesture).

---

## 🛠 Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18 + TypeScript | Strict component architecture & type safety |
| **Build Tool** | Vite 5 | Instant HMR & optimized production bundling |
| **3D & Graphics** | Three.js + WebGL2 | GPU Particle Universe, GLSL Shaders |
| **Styling** | Tailwind CSS | Editorial tokens, 1px hairline rules, responsive layout |
| **Choreography**| GSAP 3 + ScrollTrigger | Cinematic kinetic reveals & timeline sync |
| **Smooth Scroll**| Lenis | Inertial scroll interpolation & mobile scroll feel |
| **State** | Zustand | Cursor states, modal triggers, telemetry HUD |
| **Icons** | Lucide React | Minimalist camera & media controls |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/fen3211/cinematic-portfolio-3270836.git

# Enter project directory
cd cinematic-portfolio-3270836

# Install dependencies
npm install
```

### Local Development

```bash
# Run local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Typecheck and build static distribution
npm run build

# Preview production build locally
npm run preview
```

---

## 📐 Design & Technical Documentation
- [Design Specification (`design.md`)](./design.md) — Comprehensive visual system, typography, colorimetry, and anti-slop rules.
- [Technical Architecture (`TECHNICAL.md`)](./TECHNICAL.md) — Mathematical shader formulas, single-RAF ticker, and memory budgets.

---

## ⚖️ Legal & Compliance (Gate 2b Audit)
- **100% Free Open Font License:** All typefaces (`Syne`, `Playfair Display`, `Inter`, `JetBrains Mono`) are under the SIL Open Font License 1.1.
- **Privacy Compliance (152-FZ / GDPR):** Zero-data architecture; contact mechanism uses native `mailto:` protocols and clipboard copy without unauthorized data harvesting.

---

**Directed by Rohan Vance, BSC // AFC**  
*Curated & Developed by Antigravity Autonomous Director Team.*

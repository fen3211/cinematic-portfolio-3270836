import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type AtmosphericPreset = 'silver-dust' | 'solar-turbulence' | 'deep-space';

export interface ParticleUniverseCanvasProps {
  className?: string;
  intensity?: number;
  preset?: AtmosphericPreset;
  shockwaveTrigger?: number;
}

const PRESET_CONFIGS: Record<
  AtmosphericPreset,
  {
    primary: [number, number, number];
    secondary: [number, number, number];
    highlight: [number, number, number];
    intensityMultiplier: number;
  }
> = {
  'silver-dust': {
    primary: [0.9, 0.9, 0.93],
    secondary: [0.65, 0.7, 0.78],
    highlight: [0.98, 0.98, 0.98],
    intensityMultiplier: 0.85,
  },
  'solar-turbulence': {
    primary: [0.98, 0.62, 0.22],
    secondary: [0.92, 0.32, 0.08],
    highlight: [1.0, 0.92, 0.65],
    intensityMultiplier: 1.85,
  },
  'deep-space': {
    primary: [0.25, 0.52, 0.82],
    secondary: [0.12, 0.25, 0.58],
    highlight: [0.75, 0.88, 1.0],
    intensityMultiplier: 0.65,
  },
};

export const ParticleUniverseCanvas: React.FC<ParticleUniverseCanvasProps> = ({
  className = '',
  intensity = 1.0,
  preset = 'silver-dust',
  shockwaveTrigger = 0,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [particleCountDisplay, setParticleCountDisplay] = useState(12000);
  const triggerRef = useRef<(() => void) | null>(null);
  const updatePresetRef = useRef<((newPreset: AtmosphericPreset, newIntensity: number) => void) | null>(null);

  // Trigger shockwave imperatively when prop updates
  useEffect(() => {
    if (shockwaveTrigger > 0 && triggerRef.current) {
      triggerRef.current();
    }
  }, [shockwaveTrigger]);

  // Update preset colors & intensity without recreating WebGL context
  useEffect(() => {
    if (updatePresetRef.current) {
      updatePresetRef.current(preset, intensity);
    }
  }, [preset, intensity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || typeof window === 'undefined') return;

    // 1. Determine particle count based on device tier
    const width = container.clientWidth || window.innerWidth;
    let particleCount = 12000;
    if (width < 640) {
      particleCount = 2000;
    } else if (width < 1024) {
      particleCount = 5000;
    }
    setParticleCountDisplay(particleCount);

    // 2. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent canvas background
    container.appendChild(renderer.domElement);

    // 3. GPU Buffer Geometry for Atmospheric Cinema Dust
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const seeds = new Float32Array(particleCount);

    // Spatial spread: cinema frustum bounding box
    const spreadX = 42;
    const spreadY = 24;
    const spreadZ = 20;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Initial micro-drift velocities
      velocities[i3] = (Math.random() - 0.5) * 0.04;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.04;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Varied optical bokeh diameters
      sizes[i] = Math.pow(Math.random(), 2.2) * 22.0 + 3.0;
      seeds[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));

    // 4. Custom GLSL Shader Material with Curl Noise & Optical Anamorphic Squeeze
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMousePos;
      uniform float uMouseRadius;
      uniform float uMouseForce;
      uniform vec3 uShockwave; // x, y, progress (0 to 1)
      uniform float uIntensity;
      uniform vec3 uColorPrimary;
      uniform vec3 uColorSecondary;
      uniform vec3 uColorHighlight;

      attribute vec3 originalPosition;
      attribute vec3 velocity;
      attribute float size;
      attribute float seed;

      varying vec3 vColor;
      varying float vAlpha;

      // Classic Simplex 3D Noise (Stefan Gustavson)
      vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
      vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

        i = mod(i, 289.0);
        vec4 p = permute( permute( permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 1.0/7.0;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * (ns.z * ns.z));

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );

        vec4 x = x_ * ns.x + vec4(ns.y);
        vec4 y = y_ * ns.x + vec4(ns.y);
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      vec3 snoise3(vec3 x) {
        return vec3(
          snoise(x),
          snoise(x + vec3(31.41, 15.92, 65.35)),
          snoise(x + vec3(89.79, 32.38, 46.26))
        );
      }

      vec3 curlNoise(vec3 p) {
        const float e = 0.08;
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
        vec3 pos = originalPosition;

        // 1. Curl Noise Atmospheric Fluid Drift
        vec3 noiseVec = curlNoise(pos * 0.035 + vec3(0.0, 0.0, uTime * 0.04));
        pos += noiseVec * (1.8 + sin(uTime * 0.8 + seed * 6.28) * 0.6) * uIntensity;

        // 2. Mouse Repulsion Force with Smooth Falloff
        float distToMouse = distance(pos.xy, uMousePos);
        if (distToMouse < uMouseRadius && distToMouse > 0.001) {
          vec2 repulseDir = normalize(pos.xy - uMousePos);
          float falloff = pow(1.0 - distToMouse / uMouseRadius, 1.8);
          pos.xy += repulseDir * falloff * uMouseForce;
        }

        // 3. Shockwave Impulse Ring Expansion & Dissipation
        if (uShockwave.z > 0.0 && uShockwave.z < 1.0) {
          float waveRadius = uShockwave.z * 32.0;
          float distToShock = distance(pos.xy, uShockwave.xy);
          float ringWidth = 3.2;
          float diff = abs(distToShock - waveRadius);
          if (diff < ringWidth) {
            float shockIntensity = (1.0 - diff / ringWidth) * (1.0 - uShockwave.z) * 5.5;
            pos.xy += normalize(pos.xy - uShockwave.xy + vec2(0.001)) * shockIntensity;
          }
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Anamorphic bokeh size scaling with depth
        gl_PointSize = size * (260.0 / -mvPosition.z);

        // Dynamic Color Palette from Uniforms
        float colorFactor = sin(seed * 6.2831 + uTime * 0.15) * 0.5 + 0.5;
        vec3 baseTone = mix(uColorPrimary, uColorSecondary, colorFactor);
        vColor = mix(baseTone, uColorHighlight, seed * 0.4);

        // Alpha dissipation based on depth and gentle breathing
        vAlpha = smoothstep(-35.0, -8.0, mvPosition.z) * (0.35 + 0.45 * sin(uTime * 1.5 + seed * 12.0));
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Compute distance from center of circular point sprite
        vec2 coord = gl_PointCoord - vec2(0.5);

        // Anamorphic vertical ellipse squeeze (cinema lens 2.0x horizontal stretch)
        coord.y *= 1.35;
        float dist = length(coord);

        if (dist > 0.5) discard;

        // Soft Gaussian optical roll-off
        float opticalFalloff = smoothstep(0.5, 0.04, dist);
        gl_FragColor = vec4(vColor, vAlpha * opticalFalloff);
      }
    `;

    const currentPresetConfig = PRESET_CONFIGS[preset] || PRESET_CONFIGS['silver-dust'];

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMousePos: { value: new THREE.Vector2(-999, -999) },
        uMouseRadius: { value: 6.5 },
        uMouseForce: { value: 3.8 },
        uShockwave: { value: new THREE.Vector3(0, 0, 0) },
        uIntensity: { value: intensity * currentPresetConfig.intensityMultiplier },
        uColorPrimary: { value: new THREE.Vector3(...currentPresetConfig.primary) },
        uColorSecondary: { value: new THREE.Vector3(...currentPresetConfig.secondary) },
        uColorHighlight: { value: new THREE.Vector3(...currentPresetConfig.highlight) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 5. Cursor Trail Micro-Particle Sub-System
    const trailCount = 180;
    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);
    const trailAlphas = new Float32Array(trailCount);
    const trailSizes = new Float32Array(trailCount);

    for (let t = 0; t < trailCount; t++) {
      trailPositions[t * 3] = -999;
      trailPositions[t * 3 + 1] = -999;
      trailPositions[t * 3 + 2] = 0;
      trailAlphas[t] = 0;
      trailSizes[t] = Math.random() * 8.0 + 3.0;
    }

    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeometry.setAttribute('alpha', new THREE.BufferAttribute(trailAlphas, 1));
    trailGeometry.setAttribute('size', new THREE.BufferAttribute(trailSizes, 1));

    const trailMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float alpha;
        attribute float size;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * (220.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          float falloff = smoothstep(0.5, 0.05, dist);
          vec3 trailColor = vec3(0.95, 0.92, 0.86);
          gl_FragColor = vec4(trailColor, vAlpha * falloff * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const trailSystem = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trailSystem);

    let trailHead = 0;

    // 6. Interaction Coordinates & Shockwave Engine
    const worldMouse = new THREE.Vector2(-999, -999);
    let shockwaveState = { x: 0, y: 0, progress: 0, active: false };

    // Register trigger for external button
    triggerRef.current = () => {
      shockwaveState = {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 4,
        progress: 0.001,
        active: true,
      };
    };

    // Register updater for preset
    updatePresetRef.current = (newPreset: AtmosphericPreset, newIntensity: number) => {
      const cfg = PRESET_CONFIGS[newPreset] || PRESET_CONFIGS['silver-dust'];
      material.uniforms.uIntensity.value = newIntensity * cfg.intensityMultiplier;
      material.uniforms.uColorPrimary.value.set(...cfg.primary);
      material.uniforms.uColorSecondary.value.set(...cfg.secondary);
      material.uniforms.uColorHighlight.value.set(...cfg.highlight);
    };

    const screenToWorld = (clientX: number, clientY: number, target: THREE.Vector2) => {
      const rect = container.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      const fovRad = (camera.fov * Math.PI) / 180;
      const planeHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const planeWidth = planeHeight * camera.aspect;

      target.x = (ndcX * planeWidth) / 2;
      target.y = (ndcY * planeHeight) / 2;
    };

    const handlePointerMove = (e: PointerEvent) => {
      screenToWorld(e.clientX, e.clientY, worldMouse);
      material.uniforms.uMousePos.value.copy(worldMouse);

      const pArr = trailPositions;
      const aArr = trailAlphas;
      const idx = trailHead * 3;

      pArr[idx] = worldMouse.x + (Math.random() - 0.5) * 0.4;
      pArr[idx + 1] = worldMouse.y + (Math.random() - 0.5) * 0.4;
      pArr[idx + 2] = (Math.random() - 0.5) * 1.5;
      aArr[trailHead] = 0.9;

      trailHead = (trailHead + 1) % trailCount;
    };

    const handlePointerLeave = () => {
      worldMouse.set(-999, -999);
      material.uniforms.uMousePos.value.copy(worldMouse);
    };

    const handleClick = (e: MouseEvent) => {
      const clickPos = new THREE.Vector2();
      screenToWorld(e.clientX, e.clientY, clickPos);
      shockwaveState = {
        x: clickPos.x,
        y: clickPos.y,
        progress: 0.001,
        active: true,
      };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('click', handleClick);

    // 7. Viewport Visibility & Lifecycle Management
    let isVisible = true;
    let isTabActive = true;
    let animationFrameId: number | null = null;
    let clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. 60 FPS Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !isTabActive) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsedTime;

      if (shockwaveState.active) {
        shockwaveState.progress += delta * 1.35;
        if (shockwaveState.progress >= 1.0) {
          shockwaveState.active = false;
          shockwaveState.progress = 0;
          material.uniforms.uShockwave.value.set(0, 0, 0);
        } else {
          material.uniforms.uShockwave.value.set(
            shockwaveState.x,
            shockwaveState.y,
            shockwaveState.progress
          );
        }
      }

      const aArr = trailAlphas;
      const pArr = trailPositions;
      for (let t = 0; t < trailCount; t++) {
        if (aArr[t] > 0.001) {
          aArr[t] -= delta * 1.6;
          pArr[t * 3 + 1] += delta * 0.3;
        } else {
          aArr[t] = 0;
        }
      }
      trailGeometry.attributes.alpha.needsUpdate = true;
      trailGeometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5;
      camera.position.y = Math.cos(elapsedTime * 0.08) * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();

      triggerRef.current = null;
      updatePresetRef.current = null;

      geometry.dispose();
      material.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full overflow-hidden pointer-events-auto ${className}`}
      aria-label={`Atmospheric 35mm grain particle universe with ${particleCountDisplay.toLocaleString()} simulated silver-halide particles`}
    />
  );
};

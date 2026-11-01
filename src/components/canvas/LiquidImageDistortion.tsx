import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LiquidImageDistortionProps {
  imageSrc: string;
  alt?: string;
  className?: string;
  aspectRatio?: string; // e.g. 'aspect-video' or CSS aspect-ratio
  waveIntensity?: number; // Base distortion amplitude (default 0.065)
  isHovered?: boolean;
  onClick?: () => void;
}

export const LiquidImageDistortion: React.FC<LiquidImageDistortionProps> = ({
  imageSrc,
  alt = 'Film Still',
  className = '',
  aspectRatio = 'aspect-video',
  waveIntensity = 0.065,
  isHovered: externalHover,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [internalHover, setInternalHover] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  const isCardHovered = externalHover !== undefined ? externalHover : internalHover;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let texture: THREE.Texture | null = null;
    let animId: number | null = null;

    try {
      // 1. Scene & Orthographic Camera Setup
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.pointerEvents = 'none';

      // 2. Texture Loading with Color Science & Filtering
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin('anonymous');
      texture = textureLoader.load(
        imageSrc,
        () => {
          setIsLoaded(true);
        },
        undefined,
        () => {
          setHasWebGLError(true);
        }
      );
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      // 3. GLSL Liquid Distortion Shader Material
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
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

          // Spatial attenuation wave envelope (sinusoidal ripple)
          float wave = sin(dist * 22.0 - uTime * 6.5);
          float attenuation = exp(-dist * 4.2);

          // Velocity-driven liquid displacement vector
          vec2 displacement = normalize(dir + vec2(0.0001)) * wave * attenuation * uWaveIntensity;
          displacement += uVelocity * 0.18 * attenuation;

          // Modulate displacement by hover progress transition
          vec2 finalUv = uv + displacement * uHoverProgress;

          // Cauchy-like Chromatic Dispersion: separate R, G, B rays
          // Shorter wavelengths (Blue) bend more sharply than Red
          float dispersionBase = length(displacement) * uHoverProgress * 0.5;
          vec2 redOffset   = displacement * (dispersionBase * 0.7);
          vec2 greenOffset = vec2(0.0);
          vec2 blueOffset  = -displacement * (dispersionBase * 1.3);

          float r = texture2D(uTexture, clamp(finalUv + redOffset, 0.0, 1.0)).r;
          float g = texture2D(uTexture, clamp(finalUv + greenOffset, 0.0, 1.0)).g;
          float b = texture2D(uTexture, clamp(finalUv + blueOffset, 0.0, 1.0)).b;

          // Cinematic 35mm optical tone grade: subtle vignette & contrast curve
          vec3 color = vec3(r, g, b);
          float vignette = smoothstep(1.3, 0.35, length(vUv - 0.5));
          color *= mix(0.88, 1.0, vignette);

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uPointer: { value: new THREE.Vector2(0.5, 0.5) },
          uVelocity: { value: new THREE.Vector2(0.0, 0.0) },
          uHoverProgress: { value: 0.0 },
          uTime: { value: 0.0 },
          uWaveIntensity: { value: waveIntensity },
        },
      });

      geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGLError(true);
      return;
    }

    // 4. Pointer Tracking & Velocity Easing Engine
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    const targetPointer = new THREE.Vector2(0.5, 0.5);
    const targetVelocity = new THREE.Vector2(0, 0);
    const currentVelocity = new THREE.Vector2(0, 0);
    let targetHover = isCardHovered ? 1.0 : 0.0;
    let currentHover = targetHover;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // UV flip

      targetPointer.set(x, y);

      const now = performance.now();
      if (lastTime > 0) {
        const dt = Math.max(1, now - lastTime);
        const dx = (x - lastX) / dt;
        const dy = (y - lastY) / dt;

        // Clamp peak velocity
        targetVelocity.x = Math.max(-1.5, Math.min(1.5, dx * 18.0));
        targetVelocity.y = Math.max(-1.5, Math.min(1.5, dy * 18.0));
      }

      lastX = x;
      lastY = y;
      lastTime = now;
    };

    const handlePointerEnter = () => {
      targetHover = 1.0;
    };

    const handlePointerLeave = () => {
      targetHover = 0.0;
      targetVelocity.set(0, 0);
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseenter', handlePointerEnter);
    container.addEventListener('mouseleave', handlePointerLeave);

    // 5. Visibility and Resize Observers
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!renderer || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        renderer.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize);

    // 6. 60 FPS Render Loop with Exponential 350ms Ease-Back
    let prevFrameTime = performance.now();
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || !renderer || !scene || !camera || !material) return;

      const now = performance.now();
      const dt = Math.min((now - prevFrameTime) / 1000, 0.1);
      prevFrameTime = now;

      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Update Hover Progress towards target (smooth 300ms ease)
      targetHover = isCardHovered ? 1.0 : 0.0;
      const hoverLerp = 1 - Math.pow(0.001, dt / 0.3);
      currentHover += (targetHover - currentHover) * hoverLerp;
      material.uniforms.uHoverProgress.value = currentHover;

      // Smooth pointer position lerp
      material.uniforms.uPointer.value.lerp(targetPointer, 0.2);

      // Exponential velocity decay back to 0 within ~350ms
      const decayFactor = Math.exp(-dt * 9.0); // Halves roughly every 77ms, zeroes in ~350ms
      currentVelocity.x = currentVelocity.x * decayFactor + targetVelocity.x * (1 - decayFactor);
      currentVelocity.y = currentVelocity.y * decayFactor + targetVelocity.y * (1 - decayFactor);

      // Bleed off target velocity quickly once pointer pauses
      targetVelocity.multiplyScalar(0.75);

      material.uniforms.uVelocity.value.copy(currentVelocity);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resource Cleanup & Disposal
    return () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseenter', handlePointerEnter);
      container.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (texture) texture.dispose();
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [imageSrc, waveIntensity, isCardHovered]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`relative overflow-hidden w-full h-full bg-[#161616] ${aspectRatio} ${className}`}
    >
      {/* Fallback & Loading Base Image */}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded && !hasWebGLError ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

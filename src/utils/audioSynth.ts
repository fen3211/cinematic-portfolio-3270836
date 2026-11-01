/**
 * Cinematic Web Audio API Synthesizer
 * Procedural sub-bass analog drone and mechanical optical foley sound effects.
 * 100% self-contained, zero external asset requests, zero 404 network errors.
 */

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  // Drone State
  private droneGain: GainNode | null = null;
  private oscSub: OscillatorNode | null = null;
  private oscHarmonic: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isDronePlaying = false;
  private fadeTimer: ReturnType<typeof setTimeout> | null = null;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) return null;

      try {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('Web Audio API could not be initialized:', e);
        return null;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Start 55Hz Sub-Bass Ambient Drone with 200Hz Resonant Low-Pass & Slow Breathing LFO
   */
  public startAmbientDrone(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }

    if (this.isDronePlaying && this.droneGain) {
      // Already running; just ensure volume is up
      const now = ctx.currentTime;
      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.linearRampToValueAtTime(0.22, now + 1.2);
      return;
    }

    const now = ctx.currentTime;

    // Main drone gain node
    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, now);
    this.droneGain.gain.linearRampToValueAtTime(0.22, now + 1.8);

    // Resonant Low-Pass Filter (200Hz cutoff, subtle resonance)
    this.filter = ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(200, now);
    this.filter.Q.setValueAtTime(2.2, now);

    // LFO for breathing filter modulation (0.12 Hz cycle ~ 8.3s)
    this.lfo = ctx.createOscillator();
    this.lfo.type = 'sine';
    this.lfo.frequency.setValueAtTime(0.12, now);

    this.lfoGain = ctx.createGain();
    this.lfoGain.gain.setValueAtTime(45, now); // Sweeps cutoff between 155Hz and 245Hz

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filter.frequency);

    // Sub-bass fundamental oscillator: 55Hz sine
    this.oscSub = ctx.createOscillator();
    this.oscSub.type = 'sine';
    this.oscSub.frequency.setValueAtTime(55, now);

    // Subtle detuned warm harmonic: 55.4Hz triangle
    this.oscHarmonic = ctx.createOscillator();
    this.oscHarmonic.type = 'triangle';
    this.oscHarmonic.frequency.setValueAtTime(55.4, now);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.35, now);
    this.oscHarmonic.connect(harmonicGain);

    // Route audio graph
    this.oscSub.connect(this.filter);
    harmonicGain.connect(this.filter);
    this.filter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);

    // Start oscillators
    this.oscSub.start(now);
    this.oscHarmonic.start(now);
    this.lfo.start(now);

    this.isDronePlaying = true;
  }

  /**
   * Stop Ambient Drone with smooth cinematic fade-out
   */
  public stopAmbientDrone(): void {
    if (!this.ctx || !this.droneGain || !this.isDronePlaying) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const currentGain = this.droneGain.gain.value;

    this.droneGain.gain.cancelScheduledValues(now);
    this.droneGain.gain.setValueAtTime(Math.max(currentGain, 0.0001), now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    this.isDronePlaying = false;

    // Disconnect and clean up nodes after fade completes
    this.fadeTimer = setTimeout(() => {
      try {
        this.oscSub?.stop();
        this.oscHarmonic?.stop();
        this.lfo?.stop();

        this.oscSub?.disconnect();
        this.oscHarmonic?.disconnect();
        this.lfo?.disconnect();
        this.lfoGain?.disconnect();
        this.filter?.disconnect();
        this.droneGain?.disconnect();
      } catch {
        // Ignore already stopped/disconnected nodes
      }

      this.oscSub = null;
      this.oscHarmonic = null;
      this.lfo = null;
      this.lfoGain = null;
      this.filter = null;
      this.droneGain = null;
      this.fadeTimer = null;
    }, 850);
  }

  /**
   * Micro-foley mechanical shutter/lens switch sound (~15ms short click)
   */
  public playLensClick(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;

    // Transient carrier oscillator: rapid frequency drop simulating mechanical aperture detent
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2600, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.015);

    // Bandpass filter to isolate high-tensile metallic snap
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(4.5, now);

    // Micro amplitude envelope: instantaneous attack (0.5ms) -> 15ms exponential decay
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.45, now + 0.001);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

    // High frequency micro noise burst for tactile friction
    const bufferSize = Math.floor(ctx.sampleRate * 0.012); // 12ms noise
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    // Connect transient layer
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Connect noise friction layer
    noiseSource.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    // Playback execution
    osc.start(now);
    osc.stop(now + 0.02);
    noiseSource.start(now);
    noiseSource.stop(now + 0.02);

    // Disconnect after playback
    setTimeout(() => {
      try {
        osc.disconnect();
        filter.disconnect();
        gainNode.disconnect();
        noiseSource.disconnect();
        noiseGain.disconnect();
      } catch {
        // Safe disposal
      }
    }, 40);
  }

  /**
   * 35mm Film Shutter Sound Effect (~45ms double-curtain mechanical stroke)
   */
  public playShutterSound(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    this.playLensClick();
    setTimeout(() => {
      this.playLensClick();
    }, 28);
  }

  public setMasterVolume(volume: number): void {
    if (!this.masterGain || !this.ctx) return;
    const clamped = Math.max(0, Math.min(1, volume));
    this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
  }

  public isAmbientPlaying(): boolean {
    return this.isDronePlaying;
  }
}

// Export singleton instance and standard API methods
export const audioSynth = new CinematicAudioEngine();

export const startAmbientDrone = (): void => {
  audioSynth.startAmbientDrone();
};

export const stopAmbientDrone = (): void => {
  audioSynth.stopAmbientDrone();
};

export const playLensClick = (): void => {
  audioSynth.playLensClick();
};

export const playShutterSound = (): void => {
  audioSynth.playShutterSound();
};

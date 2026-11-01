import { Project } from '../types';

export interface CinematographerProfile {
  name: string;
  acronyms: string;
  role: string;
  logline: string;
  statement: string;
  bioParagraphs: string[];
  representation: {
    agency: string;
    agent: string;
    email: string;
    territory: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    studioAddress: string;
  };
  technicalArsenal: {
    category: string;
    items: string[];
  }[];
  masterSensorSpecs: {
    sensorDimension: string;
    colorScience: string;
    dynamicRange: string;
    nativeIso: string;
    mount: string;
  };
}

export const CINEMATOGRAPHER_PROFILE: CinematographerProfile = {
  name: 'Rohan Vance',
  acronyms: 'BSC // AFC',
  role: 'Director of Photography',
  logline: 'Sculpting shadow before shaping light.',
  statement:
    'Light has no meaning without the architecture of darkness. We do not illuminate the scene; we carve visibility out of the void.',
  bioParagraphs: [
    'My work investigates the tactile boundary between deep optical shadow and intentional luminescence. Trained on photochemical 35mm emulsion before mastering large-format digital sensors, I treat every frame as an archival print where organic lens aberrations and physical grain reveal psychological truth.',
    'Specializing in vintage anamorphic character, deliberate low-key lighting, and architectural blocking, each collaboration is approached with uncompromising visual rigor. From intimate theatrical dramas to visceral commercial spectacles, the camera serves as an empathetic optical instrument.',
  ],
  representation: {
    agency: 'Independent Talent Group',
    agent: 'Sarah Jenkins',
    email: 's.jenkins@independenttalent.co.uk',
    territory: 'Worldwide Representation',
  },
  contact: {
    email: 'studio@rohanvance.film',
    phone: '+44 (0) 20 7946 0912',
    location: 'London & Los Angeles',
    studioAddress: 'Vance Optical Studio, 404 Film Row, Studio District, London UK',
  },
  masterSensorSpecs: {
    sensorDimension: '36.70 × 25.54 mm (ARRI LPL Large Format)',
    colorScience: 'ACES 1.3 / Kodak 5207 250D Emulation Print Curve',
    dynamicRange: '14.5+ Real Stops (EI 800 - 3200)',
    nativeIso: 'Dual Gain Architecture (ISO 800 / 3200)',
    mount: 'ARRI LPL with Cooke /i Technology Telemetry',
  },
  technicalArsenal: [
    {
      category: 'Camera Bodies & Systems',
      items: [
        'ARRI Alexa 35 (Super 35 Native 4K, 17 Stops DR)',
        'ARRI Alexa Mini LF (Large Format 4.5K Open Gate)',
        'RED V-Raptor XL 8K VV (High-Speed Phantom & VistaVision)',
        'Bolex H16 Reflex (16mm Photochemical Field Rig)',
      ],
    },
    {
      category: 'Anamorphic & Spherical Glass',
      items: [
        'Cooke Anamorphic /i Full Frame Plus SF (32, 40, 50, 75, 100mm)',
        'Panavision C-Series & E-Series Anamorphic Primes',
        'Zeiss Super Speeds T1.3 Mark III (Vintage 18–85mm)',
        'Angénieux Optimo Ultra 12x Multi-Format Zoom',
      ],
    },
    {
      category: 'Lighting & Photometric Instruments',
      items: [
        'ARRI SkyPanel X21 / X22 Modular Soft/Hard Hybrid Matrix',
        'Mole-Richardson 5K / 10K Tungsten Fresnel Fixtures (3200K)',
        'Astera Titan & Helios Wireless Pixel Tube Banks',
        'Custom 12x12 Grid Cloth & Unbleached Muslin Bounces',
      ],
    },
    {
      category: 'Color Workflow & Monitoring',
      items: [
        'DaVinci Resolve Studio 19 Advanced Grading Suite',
        'Custom 3D LUT Pipeline (Film Emulsion Grain Profiles)',
        'Sony BVM-HX310 4K HDR Master Reference Monitor',
        'Teradek Bolt 4K LT Zero-Delay Wireless Telemetry',
      ],
    },
  ],
};

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'the-black-monolith',
    title: 'The Black Monolith',
    category: 'Feature Film',
    year: 2025,
    aspectRatio: '2.39:1',
    logline: 'An architectural thriller set within an subterranean brutalist research institute in the Arctic archipelago.',
    synopsis:
      'Filmed across 48 winter days in Svalbard and Iceland under extreme sub-zero conditions. We embraced natural polar twilight supplemented by industrial tungsten sodium-vapor units, preserving negative fill to accentuate claustrophobic tension within monolithic concrete chambers.',
    posterUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-standing-in-a-dark-room-42861-large.mp4',
    fullVideoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-standing-in-a-dark-room-42861-large.mp4',
    duration: '118 MIN',
    releaseDistribution: 'A24 Theatrical Release / Venice Film Festival Premiere',
    featured: true,
    metadata: {
      camera: 'ARRI Alexa 65',
      lenses: 'Panavision Sphero 65 & Custom 2.0x Anamorphic',
      focalLengths: '35mm, 50mm, 90mm',
      aperture: 'T2.0 - T2.8',
      shutterAngle: '180.0°',
      fps: 24,
      nativeIso: 800,
      kelvin: 3200,
      codec: 'ARRIRAW 6.5K Open Gate',
      sensorDimensions: '54.12 × 25.58 mm',
      colorScience: 'ACEScg Master Print Matrix',
      filmStock: 'Digital Sensor with 65mm Photochemical Print Master',
    },
    credits: [
      { role: 'Director', name: 'Julian Thorne' },
      { role: 'Director of Photography', name: 'Rohan Vance, BSC' },
      { role: 'Gaffer', name: 'Marcus Lindqvist' },
      { role: 'Key Grip', name: 'Elena Varga' },
      { role: 'Colorist', name: 'Damien Leclair' },
    ],
    awards: ['Winner — Best Cinematography, Camerimage 2025', 'Official Selection — Venice 82nd International Film Festival'],
    lightingNotes: 'Utilized only custom 10K Tungsten halogen lanterns diffused through damp muslin frames to replicate arctic perimeter security floodlights.',
    colorGradeNotes: 'Low-contrast base curve with heavy shadow density and rolled-off highlights, avoiding digital clipping.',
  },
  {
    id: 'proj-02',
    slug: 'nostalgia-for-ashes',
    title: 'Nostalgia for Ashes',
    category: 'Feature Film',
    year: 2024,
    aspectRatio: '4:3',
    logline: 'An introspective drama charting the final days of an abandoned thermal observatory in the Carpathians.',
    synopsis:
      'Captured entirely on 35mm motion picture film stock to honor the tactile decay of memory. The Academy 4:3 frame isolates characters within oppressive vertical spaces, forcing intimate eye contact with the viewer.',
    posterUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-sun-rays-in-the-forest-42823-large.mp4',
    fullVideoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-sun-rays-in-the-forest-42823-large.mp4',
    duration: '94 MIN',
    releaseDistribution: 'Cannes Film Festival — Un Certain Regard',
    featured: false,
    metadata: {
      camera: 'ARRIFLEX 435 Xtreme 35mm',
      lenses: 'Cooke Speed Panchro Series II Vintage',
      focalLengths: '25mm, 32mm, 50mm, 75mm',
      aperture: 'T2.3',
      shutterAngle: '172.8°',
      fps: 24,
      nativeIso: 500,
      kelvin: 4300,
      codec: '35mm 4-Perf Photochemical Negative',
      sensorDimensions: '21.95 × 16.00 mm (Academy Format)',
      colorScience: 'Photochemical Scan via Lasergraphics Director 4K',
      filmStock: 'Kodak Vision3 5219 500T (Pushed +1 Stop)',
    },
    credits: [
      { role: 'Director', name: 'Sorin Radu' },
      { role: 'Director of Photography', name: 'Rohan Vance, BSC' },
      { role: 'Film Loader', name: 'Klara Novak' },
      { role: 'Colorist', name: 'Arthur Pendelton' },
    ],
    awards: ['Prix de la Photographie — Cannes 2024', 'Golden Frog Nominee — Camerimage'],
    lightingNotes: 'Pure practicals: kerosene lamps and single unmasked tungsten 2Ks bounced into aged wood ceilings.',
    colorGradeNotes: 'Deep rich blacks with organic halogen grain structure, retaining the physical texture of silver halide crystals.',
  },
  {
    id: 'proj-03',
    slug: 'chronomaster-luxury',
    title: 'Chronomaster: The Perpetual Horizon',
    category: 'Commercial',
    year: 2025,
    aspectRatio: '16:9',
    logline: 'A sculptural study of precision horology against volcanic black sand dunes at astronomical dusk.',
    synopsis:
      'High-concept commercial campaign commissioned for the unveiling of the Chronomaster Perpetual Calendar. Micro-macro lens probe systems were synchronized with robotic motion control rigs to weave seamlessly from extreme horological complications to monumental desolate desert landscapes.',
    posterUrl:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-clock-turning-rapidly-41525-large.mp4',
    fullVideoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-clock-turning-rapidly-41525-large.mp4',
    duration: '90 SEC',
    releaseDistribution: 'Global Broadcast & Digital Master Campaign',
    featured: true,
    metadata: {
      camera: 'RED V-Raptor XL 8K VV',
      lenses: 'ARRI / Zeiss Master Anamorphic & Laowa 24mm Probe',
      focalLengths: '24mm, 50mm Macro, 100mm',
      aperture: 'T4.0 - T8.0',
      shutterAngle: '90.0° / 180.0° (High-Speed)',
      fps: 120,
      nativeIso: 800,
      kelvin: 5600,
      codec: 'REDCODE RAW 8K 5:1 HQ',
      sensorDimensions: '40.96 × 21.60 mm (VistaVision)',
      colorScience: 'IPP2 Color Pipeline / Custom Titanium Look',
    },
    credits: [
      { role: 'Director', name: 'Astrid Lindholm' },
      { role: 'Director of Photography', name: 'Rohan Vance, BSC' },
      { role: 'Motion Control Tech', name: 'Kenji Sato' },
      { role: 'Colorist', name: 'Matteo Rossi' },
    ],
    awards: ['Cannes Lions Gold — Cinematography Craft 2025', 'D&AD Yellow Pencil for Visual Direction'],
    lightingNotes: 'Linear sodium ribbon sweeps paired with high-frequency strobe banks fired at 120fps.',
    colorGradeNotes: 'Reflective obsidian tones, crisp cold titanium highlights with zero chromatic smear.',
  },
  {
    id: 'proj-04',
    slug: 'solaris-unbound',
    title: 'Solaris: The Cold Divide',
    category: 'Feature Film',
    year: 2025,
    aspectRatio: '2.00:1',
    logline: 'An atmospheric psychological voyage exploring the cognitive deterioration of orbital orbital engineers.',
    synopsis:
      'Shot across 6 soundstages in Pinewood Studios utilizing custom curved LED volume walls synchronized with physical 3200K tungsten fixtures to achieve total optical realism.',
    posterUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-nebula-in-deep-space-40348-large.mp4',
    fullVideoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-nebula-in-deep-space-40348-large.mp4',
    duration: '50 MIN (PILOT)',
    releaseDistribution: 'HBO / Criterion Collection',
    featured: false,
    metadata: {
      camera: 'ARRI Alexa 35',
      lenses: 'Atlas Orion Anamorphic Series & Silver Edition',
      focalLengths: '40mm, 65mm, 80mm',
      aperture: 'T2.0',
      shutterAngle: '180.0°',
      fps: 24,
      nativeIso: 1600,
      kelvin: 5600,
      codec: 'ARRIRAW 4.6K LogC4',
      sensorDimensions: '27.99 × 19.22 mm (Super 35 4:3)',
      colorScience: 'REVEAL Color Science / Custom Anamorphic LUT',
    },
    credits: [
      { role: 'Showrunner', name: 'Elias Moreau' },
      { role: 'Director of Photography', name: 'Rohan Vance, BSC' },
      { role: 'Virtual Production Lead', name: 'Sophie Bernard' },
      { role: 'Colorist', name: 'Damien Leclair' },
    ],
    awards: ['BAFTA Television Craft Nominee — Photography & Lighting'],
    lightingNotes: 'Real-time DMX driven LED arrays reflecting live off curved aluminum spacesuits.',
    colorGradeNotes: 'Bleached cyan-indigo hue shifts with dense tungsten amber skin tones.',
  },
  {
    id: 'proj-05',
    slug: 'kinetic-sculpture-09',
    title: 'Kinetic Sculpture 09: Echoes of Mercury',
    category: 'Experimental',
    year: 2024,
    aspectRatio: '1:1',
    logline: 'Liquid bismuth and ferrofluid reacting to infrasound resonance within an anechoic chamber.',
    synopsis:
      'A non-narrative pure visual examination of magnetohydrodynamics and physical wave interference. Captured through macro optics onto hand-cranked 16mm black and white reversal stock.',
    posterUrl:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    fullVideoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    duration: '14 MIN INSTALLATION LOOP',
    releaseDistribution: 'Venice Biennale Arte 2024 / Tate Modern Installation',
    featured: false,
    metadata: {
      camera: 'Bolex H16 Reflex & Phantom Flex4K',
      lenses: 'Kern-Paillard Switar 10mm & 50mm Macro',
      focalLengths: '10mm, 50mm',
      aperture: 'T1.4',
      shutterAngle: '135.0°',
      fps: 1000,
      nativeIso: 800,
      kelvin: 3200,
      codec: 'CineRaw Uncompressed 4K',
      sensorDimensions: '27.6 × 15.5 mm',
      colorScience: 'Monochrome High-Silver Emulsion Curve',
      filmStock: 'Kodak Tri-X Reversal 7266 16mm',
    },
    credits: [
      { role: 'Artist & Director', name: 'Valerie Fontaine' },
      { role: 'Director of Photography', name: 'Rohan Vance, BSC' },
      { role: 'Acoustic Engineer', name: 'Dr. Henrik Holm' },
    ],
    awards: ['Special Jury Mention — Biennale Arte 2024'],
    lightingNotes: 'Single 5000W Xenon beam collimated through an optical condenser lens.',
    colorGradeNotes: 'Deep silver specular highlights with zero halation bloom.',
  },
  {
    id: 'proj-06',
    slug: 'the-sacred-grove',
    title: 'The Sacred Grove: Ancient Cedar',
    category: 'Documentary',
    year: 2026,
    aspectRatio: '2.39:1',
    logline: 'A silent, spiritual journey through the last remaining primary rainforests of the Pacific Rim.',
    synopsis:
      'Filmed over two seasons in British Columbia and Yakushima. We traveled entirely on foot with ultra-compact full-frame cameras, waiting days for the precise dawn moisture and canopy god rays to emerge.',
    posterUrl:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    fullVideoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    duration: '82 MIN',
    releaseDistribution: 'Sundance Film Festival / National Geographic Premiere',
    featured: false,
    metadata: {
      camera: 'Sony FX9 & FX6 Full-Frame',
      lenses: 'Angénieux Optimo Ultra 12x & Cooke Panchro Classic FF',
      focalLengths: '24mm to 290mm',
      aperture: 'T2.8 - T4.0',
      shutterAngle: '180.0°',
      fps: 24,
      nativeIso: 800,
      kelvin: 5200,
      codec: 'XAVC-I 4K 10-bit 4:2:2',
      sensorDimensions: '35.7 × 18.8 mm (Full Frame 6K Overload)',
      colorScience: 'S-Cinetone / Custom Foliage Density Grade',
    },
    credits: [
      { role: 'Director', name: 'Callum MacLeod' },
      { role: 'Director of Photography', name: 'Rohan Vance, BSC' },
      { role: 'Field Sound Recordist', name: 'Akihiro Tanaka' },
      { role: 'Colorist', name: 'Arthur Pendelton' },
    ],
    awards: ['Sundance Film Festival Winner — Documentary Grand Jury', 'Earth Vision Environmental Film Award'],
    lightingNotes: '100% natural atmospheric lighting using negative fill flags and natural fog.',
    colorGradeNotes: 'Earthy organic greens with softened high-frequency leaves and velvety cedar bark shadows.',
  },
];

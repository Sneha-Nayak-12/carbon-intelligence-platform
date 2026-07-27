import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Shield } from 'lucide-react';

import {
  ScrollEngineProvider,
  useScrollEngine,
  CameraRig,
  StarField,
  NebulaBackground,
  EarthSceneContent,
  UnifiedVisualProcessor,
  HeroScene,
  CaptureScene,
  TransformationScene,
  VerificationScene,
  RegistryScene,
  MarketplaceScene,
  RetirementScene,
  EcosystemScene,
  FinaleScene,
  logoVariants,
  navItemVariants
} from '../components/Landing';

// ==========================================
// SOUND LAYER (Future Ready Ambient Drone)
// ==========================================
const ambientSoundController = {
  ctx: null as AudioContext | null,
  oscillator: null as OscillatorNode | null,
  gainNode: null as GainNode | null,
  isInitialized: false,

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.oscillator = this.ctx.createOscillator();
      this.gainNode = this.ctx.createGain();

      this.oscillator.type = 'sine';
      this.oscillator.frequency.value = 55; // Deep 55Hz G-1 drone
      this.gainNode.gain.value = 0.0;

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn("AudioContext init failed", e);
    }
  },

  play() {
    this.init();
    if (this.ctx && this.oscillator && this.gainNode) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      try {
        this.oscillator.start();
      } catch (e) { }
      this.gainNode.gain.setTargetAtTime(0.08, this.ctx.currentTime, 2.5);
    }
  },

  setIntensity(value: number) {
    if (this.ctx && this.gainNode) {
      const targetVolume = 0.08 + value * 0.06;
      this.gainNode.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.4);
    }
  },

  stop() {
    if (this.ctx && this.gainNode) {
      this.gainNode.gain.setTargetAtTime(0.0, this.ctx.currentTime, 1.2);
    }
  }
};

const LandingContent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  // Scene 4 Interactive Exchange Terminal State
  const [activeExchangeTab, setActiveExchangeTab] = useState<'Biochar' | 'Basalt' | 'DAC'>('Biochar');
  const [selectedExchangeBatch, setSelectedExchangeBatch] = useState<string | null>('COR-BIO-49');

  const {
    containerRef,
    scrollYProgress,
    overlayOpacity,
    showMainHeader
  } = useScrollEngine();

  const cursorRef = useRef(new THREE.Vector3(100, 100, 100)); // start far away

  const handlePointerMove = (e: React.PointerEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    const aspect = window.innerWidth / window.innerHeight;

    // Camera is at Z=9. Height at Z=0 is approx 7.4.
    const visibleHeight = 7.4;
    const visibleWidth = visibleHeight * aspect;

    cursorRef.current.set(
      (x * visibleWidth) / 2,
      (y * visibleHeight) / 2,
      0
    );
  };

  // Sound triggering on first user interaction
  useEffect(() => {
    const triggerAudio = () => {
      ambientSoundController.play();
      window.removeEventListener('pointerdown', triggerAudio);
    };
    window.addEventListener('pointerdown', triggerAudio);
    return () => {
      window.removeEventListener('pointerdown', triggerAudio);
      ambientSoundController.stop();
    };
  }, []);

  // Monitor scroll progress to adjust drone intensity dynamically
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      ambientSoundController.setIntensity(v);
    });
  }, [scrollYProgress]);

  // Monitor scrollytelling steps position to trigger transitions
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when step is centered in viewport
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveStep(index);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Mock credit batches for Scene 4
  const mockExchangeBatches = {
    Biochar: [
      { id: 'COR-BIO-49', project: 'Rajasthan Biochar Facility', area: 'Rajasthan, IN', price: 28.50, available: 12400, permanence: '1,000+ Yrs', verifier: 'Verra', rating: 'AAA' },
      { id: 'COR-BIO-72', project: 'Wayanad Agrochar Initiative', area: 'Kerala, IN', price: 32.00, available: 4100, permanence: '1,000+ Yrs', verifier: 'Puro.earth', rating: 'AA+' },
      { id: 'COR-BIO-18', project: 'Punjab Farm Residue Kilns', area: 'Punjab, IN', price: 29.80, available: 8900, permanence: '1,000+ Yrs', verifier: 'Verra', rating: 'AA' },
    ],
    Basalt: [
      { id: 'COR-BAS-08', project: 'Basaltic Weathering Deccan', area: 'Deccan Plateau, IN', price: 340.00, available: 3200, permanence: '10,000+ Yrs', verifier: 'Puro.earth', rating: 'AAA' },
      { id: 'COR-BAS-14', project: 'Tamil Nadu Rock Soil Project', area: 'Tamil Nadu, IN', price: 310.00, available: 1800, permanence: '10,000+ Yrs', verifier: 'Puro.earth', rating: 'AAA' },
    ],
    DAC: [
      { id: 'COR-DAC-01', project: 'Mumbai Air Filtration Stack', area: 'Maharashtra, IN', price: 620.00, available: 800, permanence: '10,000+ Yrs', verifier: 'Puro.earth', rating: 'AAA' },
      { id: 'COR-DAC-03', project: 'Dehradun Carbon Capture', area: 'Uttarakhand, IN', price: 650.00, available: 500, permanence: '10,000+ Yrs', verifier: 'Puro.earth', rating: 'AAA' },
    ]
  };

  const activeBatchData = mockExchangeBatches[activeExchangeTab].find(b => b.id === selectedExchangeBatch) || mockExchangeBatches[activeExchangeTab][0];

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#151614] flex flex-col font-sans selection:bg-emerald-800/10 selection:text-emerald-950">

      {/* Floating editorial header (fades in as we scroll into the light content) */}
      <motion.nav
        style={{
          opacity: showMainHeader,
          pointerEvents: useTransform(scrollYProgress, (v: number) => v > 0.75 ? 'auto' : 'none') as any
        }}
        className="fixed top-0 z-50 w-full bg-[#FAF8F6]/80 backdrop-blur-md border-b border-[#1E3A2F]/5 h-16 flex items-center justify-between px-6 md:px-12"
      >
        <div className="flex items-center gap-3">
          <img src="/green_asha_logo.png" alt="GreenASHA Logo" className="h-14 w-auto object-contain" />
          <span className="text-[9px] font-mono tracking-wider border border-[#1E3A2F]/20 text-[#1E3A2F] px-1.5 py-0.5 rounded">DOCUMENTARY</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-[11px] font-mono uppercase tracking-widest text-[#60645F] hover:text-[#151614] transition-colors"
          >
            Terminal Sign In
          </Link>
          <Link
            to="/login"
            className="inline-flex h-9 items-center justify-center border border-[#1E3A2F]/10 rounded bg-[#1E3A2F] px-4 text-[11px] font-mono uppercase tracking-widest text-[#FAF8F6] transition-all hover:bg-stone-900 active:scale-95 shadow-soft"
          >
            Enter Platform
          </Link>
        </div>
      </motion.nav>

      {/* ==========================================
      SCENE 1: CarbonOS Opening Cinematic (Atmospheric CO₂)
      ========================================== */}
      <section
        ref={containerRef}
        onPointerMove={handlePointerMove}
        className="relative h-[250vh] bg-stone-950 text-white z-10"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* R3F Canvas Container */}
          <div className="absolute inset-0 z-0">
            <Canvas
              camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0.5, 9] }}
              gl={{ antialias: true, alpha: false }}
            >
              <color attach="background" args={['#030508']} />
              <fog attach="fog" args={['#030508', 5, 20]} />
              
              <StarField />
              <NebulaBackground />
              <EarthSceneContent cursorRef={cursorRef} />
              <CameraRig />
            </Canvas>
          </div>

          {/* Cinematic transparent nav header */}
          <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-12 z-30 pointer-events-auto">
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <img src="/green_asha_logo.png" alt="GreenASHA Logo" className="h-14 w-auto object-contain" />
              <span className="text-[9px] font-mono tracking-wider border border-white/20 text-white/60 px-1.5 py-0.5 rounded">
                CarbonOS
              </span>
            </motion.div>

            <div className="flex items-center gap-6 md:gap-8">
              {["About", "Projects", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  href="#"
                  className="text-[10px] font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Hero text overlay */}
          <HeroScene />

          {/* Transition fog overlay to cream-white */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-[#FAF8F6] pointer-events-none z-20"
          />

        </div>
      </section>

      {/* ==========================================
      SCENE 2: The Project Lifecycle (Scrollytelling)
      ========================================== */}
      <section className="relative bg-[#F3EFE9] border-y border-[#1E3A2F]/5 px-6 md:px-24 py-32 grid md:grid-cols-2 gap-16 items-start">

        {/* Left Side Scrolling Content */}
        <div className="space-y-24">
          <div className="space-y-4">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-800 bg-emerald-800/5 border border-emerald-800/15 px-2.5 py-1 rounded">
              Scene II / The Lifecycle
            </span>
            <h2 className="text-4xl md:text-6xl font-editorial font-bold tracking-tight text-[#1E3A2F] leading-tight">
              Anatomy of <br />Permanent Removal
            </h2>
            <p className="text-xs font-mono text-[#60645F] max-w-md leading-relaxed">
              Scroll through to follow the exact journey of carbon. See how decaying biomass is locked away, audited, issued, and ultimately retired permanently.
            </p>
          </div>

          <div className="space-y-16">
            <CaptureScene activeStep={activeStep} domRef={(el) => { if (el) stepRefs.current[0] = el; }} />
            <TransformationScene activeStep={activeStep} domRef={(el) => { if (el) stepRefs.current[1] = el; }} />
            <VerificationScene activeStep={activeStep} domRef={(el) => { if (el) stepRefs.current[2] = el; }} />
            <RegistryScene activeStep={activeStep} domRef={(el) => { if (el) stepRefs.current[3] = el; }} />
            <MarketplaceScene activeStep={activeStep} domRef={(el) => { if (el) stepRefs.current[4] = el; }} />
            <RetirementScene activeStep={activeStep} domRef={(el) => { if (el) stepRefs.current[5] = el; }} />
          </div>
        </div>

        {/* Right Side Sticky Visualizer Card */}
        <div className="sticky top-28 h-[460px] w-full flex items-center justify-center">
          <motion.div
            style={{
              rotateX: useTransform(scrollYProgress, [0.15, 0.70], [2, -2]),
              rotateY: useTransform(scrollYProgress, [0.15, 0.70], [-2, 2]),
              y: useTransform(scrollYProgress, [0.15, 0.70], [0, 8]),
            }}
            className="w-full h-full bg-gradient-to-br from-white/90 to-[#FAF8F6]/90 border border-[#1E3A2F]/10 rounded-2xl shadow-premium relative overflow-hidden backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.85)]"
          >
            <UnifiedVisualProcessor activeStep={activeStep} />
          </motion.div>
        </div>

      </section>

      {/* ==========================================
      SCENE 3: The Ecosystem Connection
      ========================================== */}
      <EcosystemScene />

      {/* ==========================================
      SCENE 4: The Carbon Credit Exchange
      ========================================== */}
      <section className="relative bg-[#151614] text-stone-100 px-6 md:px-24 py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-12">

          <div className="space-y-4 max-w-xl">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#B85C38] bg-[#B85C38]/5 border border-[#B85C38]/15 px-2.5 py-1 rounded">
              Scene IV / The Exchange
            </span>
            <h2 className="text-4xl md:text-6xl font-editorial font-bold tracking-tight text-[#FAF8F6]">
              Carbon Credit Exchange
            </h2>
            <p className="text-xs font-mono text-stone-400 leading-relaxed">
              A premium clearinghouse for verified carbon removal. Inspect real physical credit batches currently held in escrow catalog nodes. Fully audited, transparent, and trade-locked.
            </p>
          </div>

          {/* Live Order Book Terminal Interface */}
          <div className="grid md:grid-cols-3 gap-8 bg-stone-950 border border-stone-900 rounded-2xl p-6 shadow-premium relative">

            {/* Left Terminal: Tabs & Batch Selection Table */}
            <div className="md:col-span-2 space-y-4 border-r border-stone-900 pr-0 md:pr-6">
              <div className="flex items-center justify-between border-b border-stone-900 pb-3">
                <div className="flex gap-2">
                  {(['Biochar', 'Basalt', 'DAC'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveExchangeTab(tab);
                        setSelectedExchangeBatch(mockExchangeBatches[tab][0].id);
                      }}
                      className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider rounded border transition-all ${activeExchangeTab === tab
                          ? 'bg-[#1E3A2F] border-emerald-500/30 text-emerald-300'
                          : 'bg-stone-900 border-stone-850 text-stone-400 hover:text-stone-100'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Feeds Updated
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[10px]">
                  <thead>
                    <tr className="border-b border-stone-900 text-stone-500 uppercase tracking-widest text-[8px]">
                      <th className="py-2.5">Batch ID</th>
                      <th className="py-2.5">Project</th>
                      <th className="py-2.5">Permanence</th>
                      <th className="py-2.5 text-right">Price/T</th>
                      <th className="py-2.5 text-right">Available</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-900">
                    {mockExchangeBatches[activeExchangeTab].map((batch) => (
                      <tr
                        key={batch.id}
                        onClick={() => setSelectedExchangeBatch(batch.id)}
                        className={`cursor-pointer transition-all hover:bg-stone-900/60 ${selectedExchangeBatch === batch.id ? 'bg-[#1E3A2F]/20 text-emerald-300' : ''
                          }`}
                      >
                        <td className="py-3 font-bold text-emerald-400">{batch.id}</td>
                        <td className="py-3">{batch.project}</td>
                        <td className="py-3 text-stone-400">{batch.permanence}</td>
                        <td className="py-3 text-right font-bold">${batch.price.toFixed(2)}</td>
                        <td className="py-3 text-right text-stone-300">{batch.available.toLocaleString()} t</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Terminal: Batch Inspection Details Panel */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-center border-b border-stone-900 pb-3 mb-4">
                  <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">BATCH INSPECTOR</span>
                  <span className="text-[9px] border border-emerald-500/25 bg-emerald-500/5 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">
                    {activeBatchData.rating} Verified
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[12px] font-bold text-stone-100">{activeBatchData.project}</h4>
                    <span className="text-[9px] font-mono text-stone-400">{activeBatchData.area}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-stone-900 border border-stone-850 rounded p-3 text-[10px] font-mono">
                    <div>
                      <span className="text-[8px] text-stone-500 block">REGISTRY</span>
                      <span className="text-stone-300 font-bold">{activeBatchData.verifier}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-stone-500 block">PERMANENCE</span>
                      <span className="text-[#B85C38] font-bold">{activeBatchData.permanence}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-stone-500 block">AUDITED SPOT PRICE</span>
                      <span className="text-emerald-400 font-bold">${activeBatchData.price.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-stone-500 block">UNSOLD ESCROW</span>
                      <span className="text-stone-300 font-semibold">{activeBatchData.available.toLocaleString()} t</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-900 pt-3 space-y-1">
                    <span className="text-[8px] font-mono text-stone-500 uppercase block">Audit Verification Trail</span>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                      <Shield className="h-3.5 w-3.5" />
                      <span>Permanence locks cryptographically signed.</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/login"
                className="w-full inline-flex h-10 items-center justify-center rounded bg-emerald-850 hover:bg-emerald-700 text-[#FAF8F6] text-xs font-mono uppercase tracking-widest transition-all active:scale-95 shadow-md"
              >
                Procure Selected Batch
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
      SCENE 5: The Carbon Intelligence Dashboard
      ========================================== */}
      <FinaleScene />

      {/* ==========================================
      FINAL CONCLUDING CTA (Documentary Exit)
      ========================================== */}
      <section className="relative bg-[#151614] text-stone-100 py-32 px-6 md:px-24 text-center overflow-hidden border-t border-stone-800">
        <div className="max-w-2xl mx-auto space-y-8 relative z-10">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">The Journey Concludes</span>
            <h2 className="text-4xl md:text-7xl font-editorial font-bold tracking-tight text-[#FAF8F6]">
              Audit the Ledger.
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-400 leading-relaxed max-w-lg mx-auto">
            Step away from static calculations. Acquire verified, carbon removal assets directly through our digital terminal and access actionable carbon intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="inline-flex h-11 items-center justify-center rounded bg-emerald-850 px-8 text-xs font-mono uppercase tracking-widest text-[#FAF8F6] hover:bg-emerald-700 active:scale-95 shadow-premium transition-all w-full sm:w-auto"
            >
              Enter Terminal Catalog
            </Link>
            <Link
              to="/login"
              className="inline-flex h-11 items-center justify-center rounded border border-stone-850 hover:bg-stone-900 px-8 text-xs font-mono uppercase tracking-widest text-[#FAF8F6] active:scale-95 transition-all w-full sm:w-auto"
            >
              Request Registry Node
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
      EDITORIAL FOOTER
      ========================================== */}
      <footer className="bg-[#151614] text-stone-500 py-16 px-6 md:px-24 border-t border-stone-900 relative z-10 text-[10px] font-mono">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-stone-900">
          <div className="space-y-3">
            <img src="/green_asha_logo.png" alt="GreenASHA Logo" className="h-12 w-auto object-contain" />
            <p className="text-[#60645F] font-sans leading-relaxed">
              An investor-grade registry catalog connecting buyers and projects with absolute cryptographic auditing.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-stone-300 font-bold uppercase tracking-widest">Methodologies</div>
            <ul className="space-y-1.5">
              <li><Link to="/login" className="hover:text-stone-300 transition-colors">Crop Residue Biochar</Link></li>
              <li><Link to="/login" className="hover:text-stone-300 transition-colors">Basalt Rock weathering</Link></li>
              <li><Link to="/login" className="hover:text-stone-300 transition-colors">Direct Air Filtration</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="text-stone-300 font-bold uppercase tracking-widest">Connect Nodes</div>
            <ul className="space-y-1.5">
              <li><Link to="/login" className="hover:text-stone-300 transition-colors">Verra Registry Sync</Link></li>
              <li><Link to="/login" className="hover:text-stone-300 transition-colors">Puro.earth Index</Link></li>
              <li><Link to="/login" className="hover:text-stone-300 transition-colors">Digital Vault API</Link></li>
            </ul>
          </div>
          <div className="space-y-3 font-sans">
            <div className="text-stone-300 font-mono font-bold uppercase tracking-widest">Governance</div>
            <p className="text-[#60645F] leading-relaxed">
              All transactions verified through decentralised nodes. Average permanence rating: AAA. Certifications permanently logged and sealed.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-[#60645F]">
          <span>&copy; {new Date().getFullYear()} GreenASHA Platform. Audited Net-Zero Ledger.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300 transition-colors">Registry Status</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Methodology Documents</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Client Escrow Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export const Landing: React.FC = () => {
  return (
    <ScrollEngineProvider>
      <LandingContent />
    </ScrollEngineProvider>
  );
};

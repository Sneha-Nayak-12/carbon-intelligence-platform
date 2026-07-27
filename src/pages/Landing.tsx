import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Leaf,
  Lock,
  Sparkles,
  Coins,
  Activity,
  Database,
  Building
} from 'lucide-react';

// ==========================================
// SCENE 1: Canvas CO2 Particle System
// ==========================================
const CarbonParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initializing atmospheric particles (CO2 molecules)
    const particlesCount = 70;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      const baseAlpha = Math.random() * 0.15 + 0.05;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 3 + 1,
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid lines to give it an editorial blueprint feel
      ctx.strokeStyle = 'rgba(30, 58, 47, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 58, 47, ${p.alpha})`;
        ctx.fill();

        // Subtle heat lines between close particles
        particles.forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            const lineAlpha = (1 - dist / 100) * 0.02;
            ctx.strokeStyle = `rgba(30, 58, 47, ${lineAlpha})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ==========================================
// SCENE 2: Chronological Scrollytelling Data
// ==========================================
interface LifecycleStep {
  id: number;
  label: string;
  title: string;
  sub: string;
  description: string;
  illustration: React.ReactNode;
}

const stepsData: LifecycleStep[] = [
  {
    id: 1,
    label: "01 / Capture & Conversion",
    title: "Biomass to Biochar",
    sub: "Permanently sealing carbon inside structured solid carbon.",
    description: "Agricultural crop residues that would otherwise rot or be burned are subjected to oxygen-free heating (pyrolysis). Instead of releasing CO₂ back into the atmosphere, the carbon is converted into biochar—a stable, porous charcoal-like material that locks carbon away for over 1,000 years.",
    illustration: (
      <div className="relative w-full h-64 bg-[#FAF8F6] rounded-xl flex items-center justify-center overflow-hidden border border-[#1E3A2F]/5">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.02] pointer-events-none">
          {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-[#1E3A2F]" />)}
        </div>
        <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-sm px-6">
          {/* Schematic Capture Graphic */}
          <div className="flex items-center justify-between w-full">
            <div className="text-center flex-1">
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#60645F] mb-1.5">Biomass In</div>
              <div className="h-12 w-12 rounded-full border border-emerald-800/10 bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-mono block mt-1 text-[#60645F]">+ Atmospheric CO₂</span>
            </div>
            {/* Heat reactor vector */}
            <div className="flex-1 px-4 flex flex-col items-center justify-center relative">
              <div className="w-full h-0.5 border-t border-dashed border-[#B85C38]/40" />
              <div className="absolute -top-3.5 bg-[#FAF8F6] px-2 text-[9px] font-mono text-[#B85C38] border border-[#B85C38]/20 rounded py-0.5">
                Pyrolysis (600°C)
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#60645F] mb-1.5">Locked Biochar</div>
              <div className="h-12 w-12 rounded-full border border-[#151614]/10 bg-[#151614] text-[#FAF8F6] flex items-center justify-center mx-auto shadow-md">
                <div className="h-4 w-4 bg-stone-700 rounded-sm rotate-45" />
              </div>
              <span className="text-[9px] font-mono block mt-1 text-[#1E3A2F] font-semibold">Carbon Fixed</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    label: "02 / Verification",
    title: "The Digital MRV Audit",
    sub: "Third-party validation of ecological physical existence.",
    description: "Before any credit can be generated, remote sensing, soil sampling, and kiln sensor telemetry are audited. Verification bodies (like Puro.earth and Verra) review documentation to prove the physical biochar was buried or mixed into soil, guaranteeing carbon permanence.",
    illustration: (
      <div className="relative w-full h-64 bg-[#FAF8F6] rounded-xl flex items-center justify-center overflow-hidden border border-[#1E3A2F]/5">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.02] pointer-events-none">
          {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-[#1E3A2F]" />)}
        </div>
        <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center">
          <div className="border border-[#1E3A2F]/10 bg-white rounded-xl p-4 shadow-soft w-full">
            <div className="flex items-center justify-between border-b border-[#1E3A2F]/5 pb-2 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800">Telemetry Log #882</span>
              <span className="text-[9px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">Approved</span>
            </div>
            <div className="space-y-1.5 text-[10px] font-mono text-[#60645F]">
              <div className="flex justify-between"><span>Kiln Temp Target:</span> <span className="text-[#151614] font-bold">612°C</span></div>
              <div className="flex justify-between"><span>Carbon Fraction:</span> <span className="text-[#151614] font-bold">82.4%</span></div>
              <div className="flex justify-between"><span>Physical Deposit:</span> <span className="text-[#151614] font-semibold">Ghats Ag Zone B</span></div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1E3A2F]/5 flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                <Shield className="h-3 w-3" />
              </div>
              <span className="text-[9px] font-mono text-[#151614] font-bold">Cryptographically Verified</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    label: "03 / Credit Minting",
    title: "Cryptographic Issuance",
    sub: "Minting audited tons into digital registry ledgers.",
    description: "Once verification is complete, the registry mints carbon credits directly. Each credit represents exactly 1 metric ton of CO₂ permanently removed. Stamped with its specific project ID, batch number, verifier signature, and country coordinate details.",
    illustration: (
      <div className="relative w-full h-64 bg-[#FAF8F6] rounded-xl flex items-center justify-center overflow-hidden border border-[#1E3A2F]/5">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.02] pointer-events-none">
          {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-[#1E3A2F]" />)}
        </div>
        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="w-24 h-24 rounded-full border border-amber-600/35 bg-gradient-to-tr from-amber-50 to-[#FAF8F6] shadow-premium flex items-center justify-center mb-3"
          >
            <Coins className="h-10 w-10 text-amber-700" />
          </motion.div>
          <div className="text-[10px] font-mono text-[#151614] bg-white border border-[#1E3A2F]/10 rounded px-2.5 py-1 shadow-sm font-semibold">
            Registry ID: COR-2026-0921-VERRA
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    label: "04 / Marketplace Listing",
    title: "Ecosystem Indexing",
    sub: "Integrating removal batches into corporate catalogues.",
    description: "The newly minted batch is indexed on the Carbon Intelligence Platform. Corporate buyers can search and filter batches based on project methodology, geographic area, co-benefits rating, and exact pricing/permanence scores.",
    illustration: (
      <div className="relative w-full h-64 bg-[#FAF8F6] rounded-xl flex items-center justify-center overflow-hidden border border-[#1E3A2F]/5">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.02] pointer-events-none">
          {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-[#1E3A2F]" />)}
        </div>
        <div className="w-full max-w-sm px-6 relative z-10">
          <div className="bg-white border border-[#1E3A2F]/10 rounded-xl p-4 shadow-soft">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] bg-stone-100 text-[#151614] font-mono px-2 py-0.5 rounded uppercase font-bold">Biochar</span>
              <span className="text-[11px] font-mono text-[#1E3A2F] font-bold">$28.00 / t</span>
            </div>
            <h4 className="text-[11px] font-bold text-[#151614] font-sans">Rajasthan Biochar Batch #4</h4>
            <p className="text-[9px] text-[#60645F] font-sans mt-1">Rajasthan, India • 1,000 Yrs Permanence</p>
            <div className="mt-4 flex items-center justify-between border-t border-[#1E3A2F]/5 pt-3">
              <span className="text-[9px] font-mono text-[#60645F]">Available: 12,400 t</span>
              <span className="text-[9px] text-[#B85C38] font-bold flex items-center gap-0.5">Ready for Purchase <ArrowRight className="h-2.5 w-2.5" /></span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    label: "05 / Corporate Purchase",
    title: "The Procurement Settlement",
    sub: "Bridging capital to clean technology developers.",
    description: "Enterprises purchase the credits to cover audited Scope 1, 2, or 3 emissions liabilities. Funds are transferred securely, locking the batch and sending capital directly to carbon removal developers to finance further project capacity.",
    illustration: (
      <div className="relative w-full h-64 bg-[#FAF8F6] rounded-xl flex items-center justify-center overflow-hidden border border-[#1E3A2F]/5">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.02] pointer-events-none">
          {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-[#1E3A2F]" />)}
        </div>
        <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center gap-4">
          <div className="flex items-center justify-between w-full relative">
            {/* Buyer */}
            <div className="bg-white border border-[#1E3A2F]/10 rounded-lg p-2.5 text-center shadow-soft flex-1">
              <Building className="h-4 w-4 mx-auto text-[#60645F] mb-1" />
              <span className="text-[8px] font-mono font-bold block text-[#151614]">Corporate Buyer</span>
            </div>
            {/* Transfer Animation */}
            <div className="flex-1 flex flex-col items-center justify-center relative px-2">
              <div className="w-full h-0.5 bg-emerald-800" />
              <span className="absolute -top-3.5 text-[8px] font-mono text-emerald-800 font-bold bg-[#FAF8F6] px-1">Settlement Done</span>
            </div>
            {/* Project Developer */}
            <div className="bg-white border border-[#1E3A2F]/10 rounded-lg p-2.5 text-center shadow-soft flex-1">
              <Leaf className="h-4 w-4 mx-auto text-[#1E3A2F] mb-1" />
              <span className="text-[8px] font-mono font-bold block text-[#151614]">Project Dev Node</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    label: "06 / Permanent Retirement",
    title: "Locked & Retired",
    sub: "Permanently taking the credit out of circulation.",
    description: "To officially claim carbon removal against sustainability goals, the credits are retired. This cryptographically locks the credit in the public registry forever. Once retired, it cannot be resold, moved, or double-counted.",
    illustration: (
      <div className="relative w-full h-64 bg-[#FAF8F6] rounded-xl flex items-center justify-center overflow-hidden border border-[#1E3A2F]/5">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.02] pointer-events-none">
          {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-[#1E3A2F]" />)}
        </div>
        <div className="relative z-10 w-full max-w-sm px-6">
          <div className="bg-stone-900 text-stone-100 rounded-xl p-5 shadow-premium border border-stone-850 relative overflow-hidden">
            {/* Retired stamp watermark */}
            <div className="absolute -right-4 -bottom-4 border-4 border-[#B85C38]/40 text-[#B85C38]/45 rounded-full px-6 py-2 rotate-12 text-[14px] font-mono font-black uppercase tracking-widest select-none pointer-events-none">
              RETIRED LOCK
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-4 w-4 text-emerald-500" />
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#FAF8F6]/60">Cryptographic Seal</span>
            </div>
            <h4 className="text-[11px] font-bold font-sans">Certificate of Carbon Retirement</h4>
            <p className="text-[8px] text-[#FAF8F6]/50 mt-1 font-mono leading-relaxed">
              Batch #1029 retired for ESG audit accounting. Registered verifier: Puro.earth. Locked in registry vault node.
            </p>
          </div>
        </div>
      </div>
    )
  }
];

export const Landing: React.FC = () => {
  // Scene 2 interactive tracker
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  // Scene 4 Interactive Exchange
  const [activeExchangeTab, setActiveExchangeTab] = useState<'Biochar' | 'Basalt' | 'DAC'>('Biochar');
  const [selectedExchangeBatch, setSelectedExchangeBatch] = useState<string | null>('COR-BIO-49');

  // Scene 5 Interactive Dashboard Metrics
  const [offsetPercentage, setOffsetPercentage] = useState(70);

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

  // Dynamic calculations for Scene 5 dashboard
  const baseEmissions = 8500; // tCO2e
  const totalOffset = (baseEmissions * offsetPercentage) / 100;
  const netEmissions = baseEmissions - totalOffset;
  const netZeroYear = offsetPercentage === 100 ? 2026 : Math.max(2050 - (offsetPercentage * 0.3), 2028).toFixed(0);

  // AI recommendations updating dynamically
  const getAIRecommendation = () => {
    if (offsetPercentage < 40) {
      return "Critical sustainability exposure detected. Scope 1/2 liabilities remain largely unaddressed. We recommend establishing multi-year biochar off-take contracts immediately to lock current spot-pricing and satisfy compliance audits.";
    }
    if (offsetPercentage < 80) {
      return "Substantial ESG progress. Your carbon liability coverage is moving forward. To minimize compliance exposure and double-claim audits, shift an additional 20% allocation into Deccan basalt weathering to stabilize overall average permanence ratings.";
    }
    if (offsetPercentage < 100) {
      return "Excellent carbon management. You are close to full net-zero liability coverage. Securing a remaining 10% batch of Direct Air Capture credits will lock in a premium sustainability rating and secure your final ESG milestone certificates.";
    }
    return "Complete net-zero alignment achieved. Your digital portfolio is 100% verified with an average credit permanence rating of 4,200 years. System has locked asset ledgers in registry vaults, generating audited ESG regulatory certificates.";
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#151614] flex flex-col font-sans selection:bg-emerald-800/10 selection:text-emerald-950">

      {/* Floating editorial header */}
      <nav className="fixed top-0 z-50 w-full bg-[#FAF8F6]/80 backdrop-blur-md border-b border-[#1E3A2F]/5 h-16 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <span className="font-editorial text-lg font-bold tracking-tight text-[#1E3A2F]">GreenASHA</span>
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
      </nav>

      {/* ==========================================
      SCENE 1: The Invisible Challenge (Atmospheric CO₂)
      ========================================== */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 py-20 overflow-hidden">
        {/* Particle Canvas */}
        <CarbonParticlesCanvas />

        <div className="max-w-4xl space-y-10 relative z-10">
          <div className="space-y-4">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#B85C38] bg-[#B85C38]/5 border border-[#B85C38]/15 px-2.5 py-1 rounded">
              Scene I / The Invisible Crisis
            </span>
            <h1 className="text-5xl md:text-8xl font-editorial tracking-tight leading-[1.05] text-[#1E3A2F] font-bold">
              Making the <br className="hidden md:block"/>
              <span className="italic font-normal text-stone-600">invisible</span> visible.
            </h1>
          </div>

          <p className="text-sm md:text-lg font-mono text-[#60645F] max-w-xl leading-relaxed tracking-tight">
            Every second, the global economy dumps thousands of metric tons of invisible, odorless carbon dioxide into the atmospheric common. It drifts, traps heat, and destabilizes ecosystems.
          </p>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-4 text-xs font-mono text-[#1E3A2F]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B85C38] animate-ping" />
              Current Global CO₂: 426 ppm
            </span>
            <span className="hidden md:inline text-stone-300">|</span>
            <span>Annual Emission rate: 37.4 Billion Tons</span>
          </div>

          {/* Prompt to scroll */}
          <div className="absolute bottom-10 left-6 md:left-24 flex items-center gap-2.5 text-[10px] font-mono uppercase tracking-widest text-[#60645F] animate-bounce">
            <span>Scroll down to track the removal</span>
            <ArrowRight className="h-3 w-3 rotate-90" />
          </div>
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
            {stepsData.map((step, idx) => (
              <div
                key={step.id}
                ref={(el) => {
                  if (el) stepRefs.current[idx] = el;
                }}
                data-index={idx}
                className={`transition-all duration-500 border-l-2 pl-6 py-2 space-y-3 ${
                  activeStep === idx 
                    ? 'border-[#1E3A2F] opacity-100' 
                    : 'border-[#1E3A2F]/10 opacity-30'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#B85C38] font-bold">
                  {step.label}
                </div>
                <h3 className="text-2xl font-editorial font-bold text-[#1E3A2F]">
                  {step.title}
                </h3>
                <div className="text-xs font-mono text-[#151614] font-semibold leading-relaxed">
                  {step.sub}
                </div>
                <p className="text-xs text-[#60645F] font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Sticky Visual Illustration */}
        <div className="sticky top-28 h-[60vh] md:h-[75vh] flex flex-col justify-center items-center">
          <div className="w-full max-w-md space-y-4">
            <div className="text-[10px] font-mono text-[#60645F] flex justify-between items-center px-1">
              <span>VISUAL PROCESSOR</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
                Active Node
              </span>
            </div>

            <div className="relative w-full h-[320px] bg-white border border-[#1E3A2F]/10 rounded-2xl p-6 shadow-premium flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {stepsData[activeStep]?.illustration}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center px-1 text-[9px] font-mono text-[#60645F]">
              <span>STEP {activeStep + 1} OF 6</span>
              <span>{stepsData[activeStep]?.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
      SCENE 3: The Carbon OS (Connectivity Model)
      ========================================== */}
      <section className="relative bg-[#151614] text-stone-100 px-6 md:px-24 py-32 overflow-hidden border-b border-stone-800">
        
        {/* Background Network Graphic Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-400/5 border border-emerald-400/15 px-2.5 py-1 rounded">
                Scene III / Operating System
              </span>
              <h2 className="text-4xl md:text-6xl font-editorial font-bold tracking-tight leading-tight">
                The Ecosystem <br />
                <span className="italic font-normal text-stone-400">Connection</span>
              </h2>
            </div>
            
            <p className="text-xs md:text-sm font-mono text-stone-400 leading-relaxed max-w-md">
              We connect carbon removal suppliers directly with global registries, compliance buyers, and cryptographic vaults. Real-time data streams align reporting, double-claim checks, and funding settlements automatically.
            </p>

            <div className="space-y-4 pt-4">
              <div className="border-t border-stone-800 pt-4 flex justify-between text-xs font-mono">
                <span className="text-[#B85C38]">Live Stream Log:</span>
                <span className="text-emerald-400 animate-pulse flex items-center gap-1">
                  <Activity className="h-3 w-3" /> System Operational
                </span>
              </div>
              <div className="h-20 bg-stone-950/80 border border-stone-800 rounded p-3 font-mono text-[9px] text-stone-400 overflow-y-hidden space-y-1">
                <div className="flex items-center gap-2"><span className="text-emerald-500">[SYS]</span> <span>Verification node 09 verified +2,400 tCO₂ biochar</span></div>
                <div className="flex items-center gap-2"><span className="text-amber-500">[REG]</span> <span>Verra Registry minted batch IN-2026-BIO-229</span></div>
                <div className="flex items-center gap-2"><span className="text-blue-500">[BUY]</span> <span>Acme Enterprise locked and retired 5,000 tCO₂</span></div>
              </div>
            </div>
          </div>

          {/* Interactive Network Diagram */}
          <div className="w-full flex items-center justify-center">
            <div className="relative w-80 h-80 flex items-center justify-center">
              
              {/* Pulsing connections */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 100 100">
                {/* Registries to Center */}
                <line x1="20" y1="20" x2="50" y2="50" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Buyers to Center */}
                <line x1="80" y1="20" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Suppliers to Center */}
                <line x1="20" y1="80" x2="50" y2="50" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Vault to Center */}
                <line x1="80" y1="80" x2="50" y2="50" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Animated data packets */}
                <motion.circle
                  r="1.5"
                  fill="#10B981"
                  animate={{ cx: [20, 50], cy: [20, 50] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                <motion.circle
                  r="1.5"
                  fill="#3B82F6"
                  animate={{ cx: [50, 80], cy: [50, 20] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
                <motion.circle
                  r="1.5"
                  fill="#F59E0B"
                  animate={{ cx: [20, 50], cy: [80, 50] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                />
              </svg>

              {/* Central OS Core Node */}
              <div className="absolute z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-stone-900 to-stone-850 border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-emerald-400" />
              </div>

              {/* Surrounding Nodes */}
              {/* Registries */}
              <div className="absolute top-4 left-4 z-10 flex flex-col items-center gap-1 bg-stone-900 border border-stone-800 rounded p-2 text-center w-20">
                <Database className="h-4 w-4 text-emerald-400" />
                <span className="text-[8px] font-mono font-bold">REGISTRIES</span>
              </div>

              {/* Buyers */}
              <div className="absolute top-4 right-4 z-10 flex flex-col items-center gap-1 bg-stone-900 border border-stone-800 rounded p-2 text-center w-20">
                <Building className="h-4 w-4 text-blue-400" />
                <span className="text-[8px] font-mono font-bold">BUYERS</span>
              </div>

              {/* Suppliers */}
              <div className="absolute bottom-4 left-4 z-10 flex flex-col items-center gap-1 bg-stone-900 border border-stone-800 rounded p-2 text-center w-20">
                <Leaf className="h-4 w-4 text-amber-400" />
                <span className="text-[8px] font-mono font-bold">PROJECTS</span>
              </div>

              {/* Vault / Ledger */}
              <div className="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-1 bg-stone-900 border border-stone-800 rounded p-2 text-center w-20">
                <Lock className="h-4 w-4 text-red-400" />
                <span className="text-[8px] font-mono font-bold">VAULTS</span>
              </div>

            </div>
          </div>

        </div>
      </section>

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
                      className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider rounded border transition-all ${
                        activeExchangeTab === tab
                          ? 'bg-[#1E3A2F] border-emerald-500/30 text-emerald-300'
                          : 'bg-stone-900 border-stone-850 text-stone-400 hover:text-stone-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
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
                        className={`cursor-pointer transition-all hover:bg-stone-900/60 ${
                          selectedExchangeBatch === batch.id ? 'bg-[#1E3A2F]/20 text-emerald-300' : ''
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
      <section className="relative bg-[#FAF8F6] border-t border-[#1E3A2F]/5 px-6 md:px-24 py-32 overflow-hidden">
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Panel: Narrative & Real-time Interactive Toggles */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#B85C38] bg-[#B85C38]/5 border border-[#B85C38]/15 px-2.5 py-1 rounded">
                Scene V / The Dashboard
              </span>
              <h2 className="text-4xl md:text-6xl font-editorial font-bold tracking-tight text-[#1E3A2F] leading-tight">
                Carbon Intelligence
              </h2>
            </div>
            
            <p className="text-xs md:text-sm font-sans text-[#60645F] leading-relaxed max-w-md">
              The culmination of your sustainability strategy. Aggregating scope emissions liabilities, calculating net-zero timelines, and generating real-time audit receipts.
            </p>

            {/* Slider control representing offset target */}
            <div className="space-y-4 bg-[#F3EFE9] border border-[#1E3A2F]/10 rounded-xl p-6 max-w-md">
              <div className="flex justify-between items-center border-b border-[#1E3A2F]/5 pb-3">
                <span className="text-[10px] font-mono text-[#60645F] uppercase tracking-wider font-bold">Interactive Slider</span>
                <span className="text-[10px] font-mono text-[#151614] font-bold">Target Offset Volume</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between text-[11px] font-mono text-[#1E3A2F]">
                  <span>Procured Offsets Percentage:</span>
                  <span className="font-bold">{offsetPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={offsetPercentage}
                  onChange={(e) => setOffsetPercentage(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#1E3A2F]"
                />
                <div className="flex justify-between text-[8px] font-mono text-[#60645F] uppercase">
                  <span>10% Minimum</span>
                  <span>100% Net Zero</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Custom Dynamic Graphic Representation */}
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-md bg-white border border-[#1E3A2F]/10 rounded-2xl p-6 shadow-premium space-y-6">
              
              <div className="flex justify-between items-center border-b border-[#1E3A2F]/5 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1E3A2F]" />
                  <span className="text-[10px] font-mono font-bold text-[#151614]">PORTFOLIO SIMULATOR</span>
                </div>
                <span className="text-[9px] font-mono text-[#60645F] uppercase">Scope 1 & 2 Liability</span>
              </div>

              {/* Dynamic Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FAF8F6] border border-[#1E3A2F]/5 p-3 rounded-lg">
                  <span className="text-[8px] text-[#60645F] uppercase font-mono block">Offset Carbon</span>
                  <span className="text-base font-bold text-emerald-800 mt-1 block">
                    {totalOffset.toLocaleString(undefined, { maximumFractionDigits: 0 })} tCO₂e
                  </span>
                </div>
                <div className="bg-[#FAF8F6] border border-[#1E3A2F]/5 p-3 rounded-lg">
                  <span className="text-[8px] text-[#60645F] uppercase font-mono block">Residual Liability</span>
                  <span className="text-base font-bold text-[#B85C38] mt-1 block">
                    {netEmissions.toLocaleString(undefined, { maximumFractionDigits: 0 })} tCO₂e
                  </span>
                </div>
              </div>

              {/* Custom SVG Simulated Trend Line Chart */}
              <div className="h-28 bg-[#FAF8F6] rounded-lg border border-[#1E3A2F]/5 p-3 relative flex flex-col justify-between overflow-hidden">
                <span className="text-[8px] font-mono text-[#60645F] uppercase">Net Zero Projection</span>
                
                {/* SVG drawing lines */}
                <svg className="w-full h-16 absolute bottom-1 left-0 right-0 px-2" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                  {/* Baseline Emissions path (flat) */}
                  <path d="M 0 10 L 100 10" stroke="rgba(96, 100, 95, 0.15)" strokeWidth="1.5" />
                  
                  {/* Net Emissions path (drops according to offset percentage) */}
                  <path
                    d={`M 0 10 C 30 10, 60 ${10 + (20 - 10) * (offsetPercentage/100)}, 100 ${10 + (20 - 10) * (offsetPercentage/100)}`}
                    stroke="#1E3A2F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="flex justify-between items-center text-[9px] font-mono text-[#151614] font-bold z-10 pt-8">
                  <span>Year of Target: {netZeroYear}</span>
                  <span className="text-emerald-800">
                    {offsetPercentage === 100 ? 'Carbon Neutral Achieved' : `Remaining: ${(100 - offsetPercentage)}%`}
                  </span>
                </div>
              </div>

              {/* Dynamically changing AI Executive Insights */}
              <div className="bg-emerald-800/[0.03] border border-emerald-800/10 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1 text-emerald-800">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider">AI Executive Advisor</span>
                </div>
                <p className="text-[10px] text-stone-600 leading-relaxed font-sans italic">
                  "{getAIRecommendation()}"
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

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
            <div className="text-stone-300 font-editorial font-bold text-sm tracking-tight">GreenASHA</div>
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

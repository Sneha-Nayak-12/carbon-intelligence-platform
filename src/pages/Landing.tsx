import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useTransform } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';

import {
  ScrollEngineProvider,
  useScrollEngine,
  UnifiedVisualProcessor,
  HeroSection,
  OceanCurrentCanvas,
} from '../components/Landing';

import { stepsData } from '../components/Landing/NarrativeState';



// ==========================================
// MOCK DATA FOR COMPLIANCE EXCHANGE
// ==========================================
const mockExchangeBatches = [
  { id: 'OCN-24-001', project: 'Rajasthan Biochar Facility', area: 'Rajasthan, IN', price: 2.10, available: 10000, permanence: '1,000+ Yrs', verifier: 'Verra', rating: 'AAA' },
  { id: 'OCN-24-002', project: 'Wayanad Agrochar Initiative', area: 'Kerala, IN', price: 2.35, available: 8500, permanence: '1,000+ Yrs', verifier: 'Puro.earth', rating: 'AA+' },
  { id: 'OCN-24-003', project: 'Afforestation MP', area: 'Madhya Pradesh, IN', price: 1.95, available: 15000, permanence: '40+ Yrs', verifier: 'Verra', rating: 'AA' },
  { id: 'OCN-24-004', project: 'Cookstove Bihar Clean Tech', area: 'Bihar, IN', price: 2.05, available: 5200, permanence: '10+ Yrs', verifier: 'Puro.earth', rating: 'A' },
  { id: 'OCN-24-005', project: 'Deccan Weathering Deposit', area: 'Deccan, IN', price: 3.40, available: 3200, permanence: '10,000+ Yrs', verifier: 'Puro.earth', rating: 'AAA' },
];

// ==========================================
// MASTER PERSISTENT DASHBOARD PANEL
// ==========================================
interface MasterDashboardProps {
  phase: 'boot' | 'workflow' | 'marketplace' | 'ai_sim' | 'network';
  activeStep: number;
  bootState: 'idle' | 'logging' | 'nodes' | 'active';
  offsetPercentage: number;
  batches: typeof mockExchangeBatches;
  selectedBatch: string;
  setSelectedBatch: (id: string) => void;
  updatedRowId: string | null;
}

const MasterDashboard: React.FC<MasterDashboardProps> = ({
  phase,
  activeStep,
  bootState,
  offsetPercentage,
  batches,
  selectedBatch,
  setSelectedBatch,
  updatedRowId
}) => {
  const baseEmissions = 8500;
  const totalOffset = (baseEmissions * offsetPercentage) / 100;
  const netEmissions = baseEmissions - totalOffset;
  const netZeroYear = offsetPercentage === 100 ? 2026 : Math.max(2050 - (offsetPercentage * 0.3), 2028).toFixed(0);

  const getAIRecommendation = () => {
    if (offsetPercentage < 40) return "Scope 1/2 liabilities remain largely unaddressed. We recommend establishing multi-year biochar off-take contracts immediately to satisfy compliance audits.";
    if (offsetPercentage < 80) return "Substantial progress. To minimize compliance exposure, shift an additional 20% allocation into Deccan basalt weathering to stabilize average permanence.";
    return "Complete net-zero alignment achieved. Digital portfolio is 100% verified with an average credit permanence rating of 4,200 years.";
  };

  const activeBatch = batches.find(b => b.id === selectedBatch) || batches[0];

  return (
    <div 
      className="w-full h-full relative p-[1px] rounded-lg overflow-hidden shadow-ocean-md font-mono text-[11px] text-text-secondary select-none bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(12, 37, 51, 0.94), rgba(12, 37, 51, 0.97)), url('/bathymetry.png')" }}
    >
      
      {/* 1. BOOT PHASE */}
      {phase === 'boot' && (
        <div className="h-full flex flex-col justify-between p-5 motif-coords relative">
          {/* Sonar sweep overlay */}
          <div className="absolute right-6 top-16 w-24 h-24 opacity-25 pointer-events-none select-none">
            <svg className="w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#8DE5E9" strokeWidth="0.8" strokeDasharray="3 6" fill="none" />
              <circle cx="50" cy="50" r="30" stroke="#1F6E83" strokeWidth="0.8" fill="none" />
              <circle cx="50" cy="50" r="15" stroke="#2CB587" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="#1F6E83" strokeWidth="0.5" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#1F6E83" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-ocean-divider pb-2.5">
              <span className="text-text-primary font-bold tracking-wider text-[10px]">OCEAN_DASHBOARD_LIVE</span>
              <span className="text-[9px] text-ocean-premium font-bold">STATE: {bootState.toUpperCase()}</span>
            </div>
            
            {bootState === 'idle' && (
              <div className="py-20 text-center text-text-muted">
                <span>[AWAITING_BOOT_SEQUENCE]</span>
              </div>
            )}

            {(bootState === 'logging' || bootState === 'nodes' || bootState === 'active') && (
              <div className="space-y-1.5 text-[10px] text-text-muted">
                <div>[SYS] Initializing registry sync protocol...</div>
                <div>[SYS] Connection established with Puro.earth catalog node #18</div>
                {bootState >= 'nodes' && <div className="text-ocean-premium">[SYS] Connected to Verra ledger endpoint (RJ-KILN-04)</div>}
                {bootState >= 'nodes' && <div className="text-ocean-premium">[SYS] Compliance escrow vault signature: SECURE</div>}
              </div>
            )}

            {bootState === 'active' && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="grid grid-cols-2 gap-3 pt-3"
              >
                <div className="bg-ocean-bg-primary border border-ocean-border p-3 rounded-md">
                  <span className="text-[9px] text-text-muted block uppercase">TOTAL PROJECTS</span>
                  <span className="text-base text-text-primary font-bold">48 Active</span>
                </div>
                <div className="bg-ocean-bg-primary border border-ocean-border p-3 rounded-md">
                  <span className="text-[9px] text-text-muted block uppercase">VALUE TRADED</span>
                  <span className="text-base text-ocean-premium font-bold">$18.7M</span>
                </div>
              </motion.div>
            )}
          </div>

          {bootState === 'active' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-28 bg-ocean-bg-primary border border-ocean-border rounded-md p-3 relative overflow-hidden"
            >
              <div className="flex justify-between text-[9px] text-text-muted">
                <span>CREDIT GENERATION TREND</span>
                <span className="text-text-primary font-bold">1.24M tCO₂e</span>
              </div>
              <svg className="w-full h-16 absolute bottom-1 left-0 right-0 px-2" viewBox="0 0 100 30" fill="none">
                <path d="M0 25 Q15 5, 30 18 T60 8 T90 14 T100 2" stroke="#2D6F82" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>
          )}
        </div>
      )}

      {/* 2. WORKFLOW PHASE */}
      {phase === 'workflow' && (
        <UnifiedVisualProcessor activeStep={activeStep} />
      )}

      {/* 3. MARKETPLACE PREVIEW */}
      {phase === 'marketplace' && (
        <div className="h-full flex flex-col justify-between p-5">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-ocean-border pb-2.5">
              <span className="text-text-primary font-bold uppercase tracking-wider text-[10px]">Marketplace Preview</span>
              <span className="text-[8px] bg-ocean-brand/20 text-ocean-premium px-2 py-0.5 rounded font-bold font-mono animate-pulse">LIVE REGISTRY FEED</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="border-b border-ocean-border text-text-muted uppercase tracking-widest text-[8px]">
                    <th className="py-2">Batch ID</th>
                    <th className="py-2">Verifier</th>
                    <th className="py-2 text-right">Price/T</th>
                    <th className="py-2 text-right">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ocean-divider">
                  {batches.map((batch) => {
                    const isUpdated = updatedRowId === batch.id;
                    return (
                      <tr
                        key={batch.id}
                        onClick={() => setSelectedBatch(batch.id)}
                        className={`cursor-pointer transition-all duration-500 ${
                          isUpdated ? 'bg-ocean-brand/20 font-bold border-ocean-brand' : ''
                        } ${selectedBatch === batch.id ? 'bg-ocean-bg-secondary text-text-primary' : 'text-text-secondary/80 hover:bg-ocean-bg-secondary/40'}`}
                      >
                        <td className="py-2.5 font-bold text-ocean-premium">{batch.id}</td>
                        <td className="py-2.5">{batch.verifier}</td>
                        <td className="py-2.5 text-right font-bold text-text-primary">${batch.price.toFixed(2)}</td>
                        <td className="py-2.5 text-right font-mono">{batch.available.toLocaleString()} t</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-ocean-bg-secondary border border-ocean-border p-3.5 rounded-md space-y-2">
            <div className="flex justify-between items-center text-[9px] border-b border-ocean-divider pb-1.5">
              <span className="text-text-muted uppercase">ESCROW REGISTRY INSPECTOR</span>
              <span className="text-ocean-success font-bold">{activeBatch.rating}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[9px]">
              <div>
                <span className="text-text-muted block">Project</span>
                <span className="text-text-primary font-bold truncate block">{activeBatch.project}</span>
              </div>
              <div>
                <span className="text-text-muted block">Registry Partner</span>
                <span className="text-text-primary">{activeBatch.verifier}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. AI SIMULATION PHASE */}
      {phase === 'ai_sim' && (
        <div className="h-full flex flex-col justify-between p-5">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-ocean-border pb-2.5">
              <span className="text-text-primary font-bold uppercase tracking-wider text-[10px]">AI Carbon Advisor</span>
              <span className="text-[9px] text-ocean-premium font-bold">EMISSION TARGET: {offsetPercentage}%</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-ocean-bg-primary border border-ocean-border p-2.5 rounded-md">
                <span className="text-[9px] text-text-muted block uppercase">OFFSETS PROCURED</span>
                <span className="text-sm font-bold text-text-primary">{totalOffset.toLocaleString(undefined, { maximumFractionDigits: 0 })} t</span>
              </div>
              <div className="bg-ocean-bg-primary border border-ocean-border p-2.5 rounded-md">
                <span className="text-[9px] text-text-muted block uppercase">NET LIABILITIES</span>
                <span className="text-sm font-bold text-ocean-warning">{netEmissions.toLocaleString(undefined, { maximumFractionDigits: 0 })} t</span>
              </div>
            </div>

            <div className="h-28 bg-ocean-bg-primary border border-ocean-border rounded-md p-3 relative flex flex-col justify-between overflow-hidden">
              <span className="text-[9px] text-text-muted uppercase block">NET-ZERO PROJECTION MODEL</span>
              <svg className="w-full h-16 absolute bottom-1 left-0 right-0 px-2" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                <path d="M0 10 L100 10" stroke="rgba(45, 111, 130, 0.1)" strokeWidth="1" />
                <path
                  d={`M 0 10 C 30 10, 60 ${10 + (20 - 10) * (offsetPercentage / 100)}, 100 ${10 + (20 - 10) * (offsetPercentage / 100)}`}
                  stroke="#2D6F82"
                  strokeWidth="2.0"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex justify-between items-center text-[10px] text-text-primary z-10 pt-8 font-bold">
                <span>NET ZERO YEAR: {netZeroYear}</span>
                <span className="text-ocean-premium">{offsetPercentage}% COVERAGE</span>
              </div>
            </div>
          </div>

          <div className="bg-ocean-bg-secondary border border-ocean-border p-3.5 rounded-md space-y-1.5">
            <span className="text-[9px] text-ocean-premium font-bold uppercase block tracking-wider">EXECUTIVE DIRECTIVE</span>
            <p className="text-[10px] text-text-secondary leading-relaxed font-sans italic">
              "{getAIRecommendation()}"
            </p>
          </div>
        </div>
      )}

      {/* 5. GLOBAL NETWORK PHASE */}
      {phase === 'network' && (
        <div className="h-full flex flex-col justify-between p-5 motif-coords">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-ocean-border pb-2.5">
              <span className="text-text-primary font-bold uppercase tracking-wider text-[10px]">Sovereign Node Network</span>
              <span className="text-[9px] text-ocean-premium font-bold">SYNC: OK</span>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                <span className="font-bold">Verra Registry Sync</span>
                <span className="text-ocean-success font-bold uppercase">Connected (38ms)</span>
              </div>
              <div className="flex items-center justify-between bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                <span className="font-bold">Puro.earth Index Sync</span>
                <span className="text-ocean-success font-bold uppercase">Connected (24ms)</span>
              </div>
              <div className="flex items-center justify-between bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                <span className="font-bold">Compliance Escrow Ledger</span>
                <span className="text-ocean-success font-bold uppercase">Connected (12ms)</span>
              </div>
              <div className="flex items-center justify-between bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                <span className="font-bold">MRV RJ-KILN-04 Array</span>
                <span className="text-ocean-success font-bold uppercase">Active (45ms)</span>
              </div>
            </div>
          </div>

          <div className="bg-ocean-bg-secondary border border-ocean-border p-3 rounded-md text-[9px] text-text-muted">
            All nodes synchronized. Cryptographic block transfers secured.
          </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// WORKFLOW CARD COMPONENT
// ==========================================
const WorkflowStepCard: React.FC<{
  step: typeof stepsData[0];
  isActive: boolean;
}> = ({ step, isActive }) => {
  return (
    <div
      className={`transition-all duration-300 p-6 rounded-lg border shadow-ocean-sm space-y-3 bg-cover bg-center ${
        isActive 
          ? 'border-ocean-brand text-text-primary' 
          : 'bg-ocean-bg-secondary border-ocean-border/60 text-text-secondary/70 opacity-60'
      }`}
      style={{
        backgroundImage: isActive 
          ? "linear-gradient(rgba(12, 37, 51, 0.96), rgba(12, 37, 51, 0.96)), url('/bathymetry.png')" 
          : "none"
      }}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-ocean-premium font-bold">
        {step.label}
      </div>
      <h3 className="text-xl font-display font-semibold text-text-primary">
        {step.title}
      </h3>
      <div className="text-xs font-mono text-text-secondary leading-relaxed">
        {step.sub}
      </div>
      <p className="text-[13px] text-text-secondary/90 font-sans leading-relaxed">
        {step.description}
      </p>
    </div>
  );
};

// ==========================================
// MAIN LANDING CONTENT
// ==========================================
const LandingContent: React.FC = () => {
  const [rightPanelPhase, setRightPanelPhase] = useState<'boot' | 'workflow' | 'marketplace' | 'ai_sim' | 'network'>('boot');
  const [activeStep, setActiveStep] = useState(0);
  const [bootState, setBootState] = useState<'idle' | 'logging' | 'nodes' | 'active'>('idle');

  const [offsetPercentage, setOffsetPercentage] = useState(70);
  const [selectedBatch, setSelectedBatch] = useState('OCN-24-001');
  const [batches, setBatches] = useState(mockExchangeBatches);
  const [updatedRowId, setUpdatedRowId] = useState<string | null>(null);

  const stepRefs = useRef<HTMLDivElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const aiSimRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  const {
    containerRef,
    scrollYProgress,
  } = useScrollEngine();

  // Opacity maps from 1.0 (at top of Scene 1) to 0.45 (at Scene 2 and onwards)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15], [1.0, 0.45]);

  useEffect(() => {
    const t1 = setTimeout(() => setBootState('logging'), 500);
    const t2 = setTimeout(() => setBootState('nodes'), 1200);
    const t3 = setTimeout(() => setBootState('active'), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * mockExchangeBatches.length);
      setBatches(prev => {
        const next = [...prev];
        const batch = next[index];
        if (batch.available > 100) {
          const delta = Math.floor(Math.random() * 5) + 1;
          next[index] = { ...batch, available: batch.available - delta };
          setUpdatedRowId(batch.id);
          setTimeout(() => setUpdatedRowId(null), 1000);
        }
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const phase = entry.target.getAttribute('data-phase');
          if (phase) {
            setRightPanelPhase(phase as any);
          }
          const indexStr = entry.target.getAttribute('data-index');
          if (indexStr !== null) {
            setActiveStep(parseInt(indexStr, 10));
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    if (marketplaceRef.current) observer.observe(marketplaceRef.current);
    if (aiSimRef.current) observer.observe(aiSimRef.current);
    if (networkRef.current) observer.observe(networkRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-ocean-bg-primary text-text-primary flex flex-col font-sans selection:bg-ocean-brand/20 selection:text-ocean-premium relative">

      {/* Photographic Sunset/Sea Background Image with dynamic scroll-driven opacity */}
      <motion.div 
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none bg-[#07151C]" 
        style={{ 
          backgroundImage: "url('/ocean_bg.png')",
          opacity: bgOpacity
        }} 
      />

      {/* 1. Global Background Canvas showing the continuous, scroll-driven OCEAN Current */}
      <OceanCurrentCanvas 
        revealStage={4} 
        scrollYProgress={scrollYProgress} 
      />

      {/* Top Header Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-ocean-bg-primary/95 backdrop-blur-md border-b border-ocean-divider h-14 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          <img src="/green_asha_logo.png" alt="GreenASHA Logo" className="h-9 w-auto object-contain" />
          <div className="h-6 w-px bg-ocean-border/60 hidden sm:block" />
          <div className="hidden sm:flex flex-col text-[8px] text-text-muted uppercase leading-tight">
            <span>Empowering carbon free mother earth</span>
            <span>Escrow Ledger v1.0</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-[11px] font-mono uppercase tracking-wider text-text-secondary font-bold hover:text-text-primary transition-colors"
          >
            Ledger Catalog
          </Link>
          <Link
            to="/login"
            className="ocean-btn-primary text-xs font-mono uppercase tracking-wider"
          >
            Enter Platform
          </Link>
        </div>
      </nav>

      {/* 1. Redesigned Hero Section (Scene 1) */}
      <div ref={heroRef} data-phase="boot">
        <HeroSection />
      </div>

      {/* Main Page Layout Container (Left: Scrolling content, Right: Sticky Master Dashboard) */}
      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-start z-10 px-6 md:px-12 pt-16 pb-32"
      >
        
        {/* Left Side: Continuous Scrolling Copy */}
        <div className="space-y-48">
          
          {/* Section 1 is now handled by HeroSection outside the grid container */}


          {/* Section 2: Lifecycle Scrollytelling Cards */}
          <div className="space-y-16">
            <div className="space-y-4">
              <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-ocean-premium bg-ocean-brand/12 border border-ocean-brand/20 px-2 py-0.5 rounded font-bold">
                SEC. 02 // Carbon Workflow Engine
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary">
                From Impact to Integrity.
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed max-w-md">
                OCEAN unifies the entire carbon credit lifecycle with transparency, automation and intelligence. Observe how each stage updates the active software console.
              </p>
            </div>

            <div className="space-y-12">
              {stepsData.map((step, idx) => (
                <div 
                  key={step.id} 
                  ref={el => { if (el) stepRefs.current[idx] = el; }} 
                  data-phase="workflow" 
                  data-index={idx}
                >
                  <WorkflowStepCard 
                    step={step} 
                    isActive={activeStep === idx} 
                  />
                </div>
              ))}
            </div>
          </div>


          {/* Section 3: Marketplace Clearinghouse description */}
          <div 
            ref={marketplaceRef}
            data-phase="marketplace"
            className="space-y-6 p-8 rounded-lg bg-ocean-bg-secondary/40 border border-ocean-border/40 bg-cover bg-center"
            style={{ backgroundImage: "linear-gradient(rgba(7, 21, 28, 0.85), rgba(7, 21, 28, 0.85)), url('/bathymetry.png')" }}
          >
            <div className="space-y-4">
              <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-ocean-premium bg-ocean-brand/12 border border-ocean-brand/20 px-2 py-0.5 rounded font-bold">
                SEC. 03 // Marketplace clearinghouse
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary">
                B2B Escrow Clearing Grid
              </h2>
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed max-w-md">
              The clearinghouse coordinates verified batches currently held in registry escrow. Inspect real physical credit batches, verifiers, permanence levels, prices and AAA ratings.
            </p>

            <div className="pt-2">
              <Link to="/login" className="ocean-btn-primary font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2">
                Open Escrow Ledger <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>


          {/* Section 4: AI Simulation Dashboard description */}
          <div 
            ref={aiSimRef}
            data-phase="ai_sim"
            className="space-y-6"
          >
            <div className="space-y-4">
              <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-ocean-premium bg-ocean-brand/12 border border-ocean-brand/20 px-2 py-0.5 rounded font-bold">
                SEC. 04 // AI Portfolio Simulator
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary">
                Calculated Scope Liability Coverage
              </h2>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed max-w-md">
              Use the analytics module to model Scope 1 & 2 liabilities. Adjust the target offset range to balance carbon removal permanence, cost, and compliance targets.
            </p>

            {/* Simulated Offset Slider control */}
            <div 
              className="border border-ocean-border rounded-lg p-5 max-w-md space-y-4 shadow-ocean-sm bg-cover bg-center"
              style={{ backgroundImage: "linear-gradient(rgba(7, 21, 28, 0.9), rgba(7, 21, 28, 0.9)), url('/bathymetry.png')" }}
            >
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-text-muted uppercase">Target Simulator</span>
                <span className="text-text-primary font-bold">{offsetPercentage}% Offset</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={offsetPercentage}
                onChange={(e) => setOffsetPercentage(parseInt(e.target.value))}
                className="w-full h-1 bg-ocean-bg-primary border border-ocean-border rounded-lg appearance-none cursor-pointer accent-ocean-brand focus:outline-none"
              />
              <div className="flex justify-between text-[8px] font-mono text-text-muted uppercase">
                <span>10% Min</span>
                <span>100% Net Zero</span>
              </div>
            </div>
          </div>


          {/* Section 5: Global Network Map Info */}
          <div 
            ref={networkRef}
            data-phase="network"
            className="space-y-6"
          >
            <div className="space-y-4">
              <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-ocean-premium bg-ocean-brand/12 border border-ocean-brand/20 px-2 py-0.5 rounded font-bold">
                SEC. 05 // Global Registry Grid
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary">
                Sovereign Registry Node Sync
              </h2>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed max-w-md">
              OCEAN is directly synchronized with global carbon registers (Puro.earth, Verra). Cryptographic vaults prevent double-claims and secure assets until final retirement settlement.
            </p>
          </div>

        </div>

        {/* Right Side: Sticky Master Dashboard Panel Container */}
        <div className="sticky top-24 self-start w-full h-[520px] rounded-lg border border-ocean-brand/35 bg-ocean-bg-elevated shadow-[0_0_30px_rgba(141,229,233,0.07)] overflow-hidden hidden lg:block">
          <MasterDashboard
            phase={rightPanelPhase}
            activeStep={activeStep}
            bootState={bootState}
            offsetPercentage={offsetPercentage}
            batches={batches}
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
            updatedRowId={updatedRowId}
          />
        </div>

      </div>

      {/* Impact metrics counter grid */}
      <section className="relative py-20 bg-ocean-bg-secondary border-t border-ocean-border z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-6 gap-6 text-center font-mono">
          <div>
            <span className="text-2xl font-bold text-text-primary block">1.24M+</span>
            <span className="text-[8px] text-text-muted uppercase tracking-widest block mt-1">tCO₂e Removed</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-text-primary block">48+</span>
            <span className="text-[8px] text-text-muted uppercase tracking-widest block mt-1">Active Projects</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-text-primary block">12</span>
            <span className="text-[8px] text-text-muted uppercase tracking-widest block mt-1">Countries Active</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-text-primary block">$18.7M+</span>
            <span className="text-[8px] text-text-muted uppercase tracking-widest block mt-1">Settled Value</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-text-primary block">850+</span>
            <span className="text-[8px] text-text-muted uppercase tracking-widest block mt-1">Buyers Network</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-ocean-premium block">100%</span>
            <span className="text-[8px] text-text-muted uppercase tracking-widest block mt-1">On-Chain Audited</span>
          </div>
        </div>
      </section>

      {/* Concluding Section */}
      <section 
        className="relative py-24 border-t border-ocean-border/50 text-center overflow-hidden z-10 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(7, 21, 28, 0.85), rgba(7, 21, 28, 0.95)), url('/bathymetry.png')" }}
      >
        <div className="max-w-2xl mx-auto space-y-6 px-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ocean-premium font-bold">[ SECURE_ESCROW_ONLINE ]</span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary">
            Build the future of carbon intelligence.
          </h2>
          <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
            Obtain institutional-grade verified carbon removal assets. Link directly to registry nodes and automate scope liability reporting.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link to="/login" className="ocean-btn-primary font-mono text-xs uppercase tracking-wider">
              Join OCEAN Today
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="bg-ocean-bg-primary text-text-muted py-12 px-6 md:px-12 border-t border-ocean-divider relative z-10 text-[10px] font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-ocean-divider">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/green_asha_logo.png" alt="GreenASHA Logo" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-text-muted/80 leading-relaxed font-sans text-[11px]">
              Empowering carbon free mother earth. End-to-end carbon credit ecosystem by GreenASHA.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-text-primary font-bold uppercase">Registry Nodes</div>
            <ul className="space-y-1 text-text-secondary/80">
              <li>Puro.earth API Integration</li>
              <li>Verra Registry Pipeline</li>
              <li>Compliance Escrow Vaults</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-text-primary font-bold uppercase">Methodologies</div>
            <ul className="space-y-1 text-text-secondary/80">
              <li>Biomass Pyrolysis (Biochar)</li>
              <li>Basalt Rock Weathering</li>
              <li>Direct Air Capture (DAC)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-text-primary font-bold uppercase">Network Status</div>
            <div className="flex items-center gap-1.5 text-ocean-success font-bold">
              <Activity className="h-3.5 w-3.5" /> Nodes Synchronized
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-text-muted/60">
          <span>&copy; {new Date().getFullYear()} GreenASHA Technologies. All rights reserved. OCEAN and Carbon Intelligence Platform are trademarks of GreenASHA.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-text-primary">Registry Status</a>
            <a href="#" className="hover:text-text-primary">Methodology Docs</a>
            <a href="#" className="hover:text-text-primary">API Terms</a>
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

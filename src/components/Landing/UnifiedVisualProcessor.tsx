import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Cpu, CheckCircle, Database } from 'lucide-react';

export const UnifiedVisualProcessor: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  // Coordinates for the protagonist Carbon Pulse
  const pulsePos = useMemo(() => {
    switch (activeStep) {
      case 0: return { x: -80, y: 0, scale: 1.15, glow: 'rgba(16, 185, 129, 0.6)' };  // feedstock flow
      case 1: return { x: 0, y: 0, scale: 1.4, glow: 'rgba(239, 68, 68, 0.7)' };     // pyrolysis heat
      case 2: return { x: 30, y: 25, scale: 1.1, glow: 'rgba(16, 185, 129, 0.7)' };   // biochar grid
      case 3: return { x: -110, y: -65, scale: 0.9, glow: 'rgba(59, 130, 246, 0.5)' }; // telemetry scan
      case 4: return { x: 105, y: -68, scale: 0.95, glow: 'rgba(16, 185, 129, 0.6)' }; // listing escrow
      case 5: return { x: 0, y: 0, scale: 0.8, glow: 'rgba(16, 185, 129, 0.5)' };     // lock core
      default: return { x: 0, y: 0, scale: 1.0, glow: 'rgba(16, 185, 129, 0.5)' };
    }
  }, [activeStep]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden font-mono">
      
      {/* Background blueprint grid remains consistent */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.015] pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-emerald-500" />)}
      </div>

      {/* ==================== STEP 0: FEEDSTOCK COLLECTION ==================== */}
      <motion.div
        animate={{
          opacity: activeStep === 0 ? 1 : 0,
          scale: activeStep === 0 ? 1 : 0.85,
          y: activeStep === 0 ? 0 : -30
        }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <span className="absolute top-8 text-[10px] tracking-widest text-emerald-400 uppercase font-bold">01 / Feedstock Ingestion</span>
        
        {/* Conveyor Belt track */}
        <div className="absolute w-[80%] h-1 bg-emerald-500/20" />
        <div className="absolute w-[70%] h-12 border border-emerald-500/10 rounded-lg flex items-center justify-between px-3">
          {/* Animated rollers spinning */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`roller-${i}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-3.5 h-3.5 rounded-full border border-dashed border-emerald-500/30"
            />
          ))}
        </div>

        {/* Conveyor Intake Funnel/Hopper */}
        <div className="absolute right-[12%] w-10 h-16 border-l border-r border-b border-emerald-500/20 rounded-b flex items-center justify-center bg-stone-950/40">
          <span className="text-[6px] text-emerald-500/50">INTAKE</span>
        </div>

        {/* Drifting leaves and biomass lumps */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`biomass-${i}`}
            animate={activeStep === 0 ? {
              x: [-150, 80],
              y: [Math.sin(i * 1.5) * 6, Math.cos(i) * 6],
              rotate: [0, 360],
              opacity: [0, 0.8, 0]
            } : { opacity: 0 }}
            transition={{ duration: 4.0, repeat: Infinity, delay: i * 0.65, ease: "linear" }}
            className={`absolute rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] ${
              i % 2 === 0 ? 'w-5 h-3 bg-emerald-700/40' : 'w-4 h-4 bg-amber-800/30'
            }`}
          />
        ))}

        <span className="absolute bottom-8 text-[8px] text-stone-500 uppercase tracking-widest animate-pulse">BIOMASS CONVEYOR ACTIVE</span>
      </motion.div>

      {/* ==================== STEP 1: PYROLYSIS REACTOR ==================== */}
      <motion.div
        animate={{
          scale: activeStep === 1 ? 1 : activeStep === 0 ? 0.65 : 0.85,
          opacity: activeStep === 1 ? 1 : 0,
          y: activeStep === 1 ? 0 : activeStep === 0 ? 30 : -30
        }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <span className="absolute top-8 text-[10px] tracking-widest text-amber-500 uppercase font-bold">02 / Oxygen-Free Pyrolysis</span>
        
        {/* Reactor Core Cylinder */}
        <div className="absolute w-56 h-36 border border-[#B85C38]/30 rounded-2xl flex items-center justify-center bg-stone-950/60">
          <motion.div
            animate={{
              scale: activeStep === 1 ? [0.96, 1.04, 0.96] : 0.9,
              opacity: activeStep === 1 ? 0.45 : 0,
            }}
            transition={{ duration: 1.5, repeat: activeStep === 1 ? Infinity : 0, ease: "easeInOut" }}
            className="absolute w-44 h-28 bg-gradient-to-tr from-orange-500/15 via-red-500/15 to-amber-500/10 rounded-xl blur-lg"
          />
          
          <div className="flex flex-col items-center gap-1 z-10">
            <span className="text-xl tracking-widest text-[#B85C38] uppercase font-bold animate-pulse">600°C</span>
            <span className="text-[7px] text-stone-400">O₂ REMOVED: 100%</span>
          </div>
        </div>

        {/* Biomass entering intake pipe, converting to black carbon */}
        <div className="absolute left-[15%] w-16 h-4 border border-dashed border-[#B85C38]/20 flex items-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`reactor-in-${i}`}
              animate={activeStep === 1 ? { x: [-10, 60], opacity: [0, 0.8, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
              className="w-3.5 h-2 bg-emerald-700/30 rounded-full"
            />
          ))}
        </div>

        {/* captured carbon particles escaping out right */}
        <div className="absolute right-[15%] w-16 h-4 border border-dashed border-emerald-500/20 flex items-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`reactor-out-${i}`}
              animate={activeStep === 1 ? { x: [-10, 60], opacity: [0, 0.8, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
              className="w-2.5 h-2.5 bg-stone-900 border border-stone-850 rounded"
            />
          ))}
        </div>

        {/* Smoke condensor (exhaust with zero smoke escaping) */}
        <div className="absolute -top-6 right-20 w-8 h-12 border-t border-l border-r border-[#B85C38]/20 rounded-t flex flex-col items-center p-1 bg-stone-950/40">
          <span className="text-[5px] text-stone-500 uppercase">Filter</span>
          {/* Zero emissions animation */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500/20 mt-1"
          />
        </div>
      </motion.div>

      {/* ==================== STEP 2: BIOCHAR LATTICE ==================== */}
      <motion.div
        animate={{
          opacity: activeStep === 2 ? 1 : 0,
          scale: activeStep === 2 ? 1 : activeStep === 1 ? 1.2 : 0.7,
          rotate: activeStep === 2 ? 0 : 35
        }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <span className="absolute top-8 text-[10px] tracking-widest text-emerald-400 uppercase font-bold">03 / Biochar Formation</span>
        
        {/* Hexagonal Lattice Lines */}
        <div className="relative w-52 h-52 flex items-center justify-center">
          <svg className="absolute w-full h-full stroke-emerald-500/25" viewBox="0 0 100 100">
            <line x1="50" y1="50" x2="22" y2="34" strokeWidth="1.2" />
            <line x1="50" y1="50" x2="78" y2="34" strokeWidth="1.2" />
            <line x1="50" y1="50" x2="50" y2="82" strokeWidth="1.2" />
            <line x1="22" y1="34" x2="22" y2="10" strokeWidth="1.2" />
            <line x1="78" y1="34" x2="78" y2="10" strokeWidth="1.2" />
          </svg>

          {/* Stable Carbon Lattice Points */}
          {[[50, 50], [22, 34], [78, 34], [50, 82], [22, 10], [78, 10]].map(([cx, cy], i) => (
            <motion.div
              key={`atom-${i}`}
              style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%, -50%)' }}
              animate={{
                scale: activeStep === 2 ? [0.85, 1.15, 0.85] : 1,
                backgroundColor: activeStep === 2 ? '#10b981' : '#059669',
              }}
              transition={{ duration: 1.8, repeat: activeStep === 2 ? Infinity : 0, delay: i * 0.15 }}
              className="absolute w-4.5 h-4.5 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]"
            />
          ))}
        </div>

        <span className="absolute bottom-8 text-[8px] text-emerald-400 font-bold tracking-widest uppercase animate-pulse">CARBON FIXED: 1,000+ YR LOCK</span>
      </motion.div>

      {/* ==================== STEP 3: VERIFICATION SCAN ==================== */}
      <motion.div
        animate={{
          opacity: activeStep === 3 ? 1 : 0,
          scale: activeStep === 3 ? 1 : 0.8,
          y: activeStep === 3 ? 0 : 30
        }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="absolute z-10 w-full max-w-[340px] bg-stone-900/90 border border-emerald-500/25 rounded-2xl p-6 shadow-premium backdrop-blur-md"
      >
        <div className="flex items-center justify-between border-b border-emerald-950/20 pb-3 mb-4">
          <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 animate-spin" />
            04 / MRV Sensor Audit
          </span>
          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold animate-pulse font-mono">SCANNING BATCH</span>
        </div>
        
        {/* Scanning laser line animation */}
        <div className="relative h-12 w-full border border-emerald-500/10 rounded mb-4 overflow-hidden bg-stone-950/40">
          <motion.div
            animate={{ y: [-4, 48, -4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_8px_#10b981]"
          />
          <div className="absolute inset-0 flex items-center justify-center text-[8px] text-stone-400 font-mono">
            CO2 SECURE LEVEL: 82.4% VERIFIED
          </div>
        </div>

        <div className="space-y-2 text-[11px] font-mono text-stone-300">
          <div className="flex justify-between"><span>Kiln Heat Sensors:</span><span className="text-white font-bold">612°C Sync</span></div>
          <div className="flex justify-between"><span>Satellite Canopy Bio:</span><span className="text-emerald-400 font-bold">Verified</span></div>
          <div className="flex justify-between"><span>Soil Core Analysis:</span><span className="text-emerald-400 font-bold">100% Sealed</span></div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-950/20 flex items-center justify-between">
          <span className="text-[9px] text-stone-500 font-bold flex items-center gap-1">
            <Shield className="h-3 w-3 text-emerald-400" />
            Cryptographic Verification Seal
          </span>
          <span className="text-[9px] text-emerald-400 font-bold uppercase">APPROVED</span>
        </div>
      </motion.div>

      {/* ==================== STEP 4: REGISTRY MINTING ==================== */}
      <motion.div
        animate={{
          opacity: activeStep === 4 ? 1 : 0,
          scale: activeStep === 4 ? 1 : activeStep === 5 ? 0.9 : 0.8,
          y: activeStep === 4 ? 0 : activeStep === 5 ? -12 : 30
        }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="absolute z-10 w-full max-w-[330px] bg-stone-900/95 border border-emerald-500/25 rounded-2xl p-6 shadow-premium backdrop-blur-md"
      >
        <div className="flex justify-between items-center mb-4 border-b border-emerald-950/20 pb-3">
          <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5" />
            05 / Registry Minting
          </span>
          <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold font-mono">LEDGER ACTIVE</span>
        </div>
        
        <h4 className="text-sm font-bold text-white font-sans">Rajasthan Biochar Batch #4</h4>
        <p className="text-[10px] text-stone-400 font-sans mt-1">Registry: Puro.earth • 1,000 Yrs Permanence</p>

        {/* Ledger Transaction pipeline */}
        <div className="mt-3.5 p-2 bg-stone-950/50 border border-emerald-500/10 rounded text-[9px] text-stone-400 space-y-1">
          <div className="flex justify-between"><span>Mint Block:</span><span className="text-white font-bold">#229-MINTED</span></div>
          <div className="flex justify-between"><span>Block Hash:</span><span className="text-emerald-400 select-all">0x4ae89...c12f</span></div>
        </div>

        <div className="mt-4 border-t border-emerald-950/20 pt-3 flex items-center justify-between text-[10px] font-mono">
          <span className="text-stone-400">Escrow: 12,400 t</span>
          <span className="text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded">MINTED & READY</span>
        </div>
      </motion.div>

      {/* ==================== STEP 5: PERMANENT SECRESTRATION LOCK ==================== */}
      <motion.div
        animate={{
          opacity: activeStep === 5 ? 1 : 0,
          scale: activeStep === 5 ? 1 : 0.75,
          y: activeStep === 5 ? 0 : 30
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="absolute z-20 flex flex-col items-center justify-center bg-stone-950/95 border border-emerald-500/25 rounded-2xl p-8 shadow-premium w-full max-w-[320px]"
      >
        <motion.div
          animate={{ y: activeStep === 5 ? [0, -4, 0] : 0 }}
          className="h-16 w-16 rounded-full bg-stone-900 border border-stone-850 flex items-center justify-center shadow-lg mb-3"
        >
          <Lock className="h-7 w-7 text-emerald-400" />
        </motion.div>
        
        <span className="text-[11px] uppercase tracking-widest text-amber-500 font-bold font-mono flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5 text-amber-500" />
          06 / Permanent Retirement
        </span>
        
        <span className="text-xs text-white font-bold mt-2 text-center">Tons Removed from Circulation.</span>
        
        <div className="mt-4 border-2 border-dashed border-[#B85C38]/40 text-[#B85C38] px-4 py-1 text-[10px] tracking-widest font-black uppercase rounded bg-[#FAF8F6]/5 shadow-md font-mono">
          RETIRED LOCK
        </div>
      </motion.div>

      {/* -------------------- THE PROTAGONIST CARBON PULSE -------------------- */}
      <motion.div
        animate={{
          x: pulsePos.x,
          y: pulsePos.y,
          scale: pulsePos.scale,
          backgroundColor: activeStep === 1 ? '#b85c38' : '#10b981',
        }}
        transition={{
          type: "spring",
          stiffness: 85,
          damping: 14,
        }}
        style={{
          boxShadow: `0 0 16px ${pulsePos.glow}, 0 0 32px ${pulsePos.glow}`,
        }}
        className="absolute w-5 h-5 rounded-full z-30 pointer-events-none"
      />

    </div>
  );
};

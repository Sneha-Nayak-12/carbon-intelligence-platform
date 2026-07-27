import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

const CountingNumber: React.FC<{ value: number; decimals?: number; duration?: number }> = ({ value, decimals = 0, duration = 1.2 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = 30;
    const steps = totalMiliseconds / incrementTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
        clearInterval(timer);
        setCurrent(end);
      } else {
        setCurrent(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{current.toFixed(decimals)}</span>;
};

export const UnifiedVisualProcessor: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  const [isDissolved, setIsDissolved] = useState(false);

  useEffect(() => {
    setIsDissolved(false);
    if (activeStep === 2) {
      const timer = setTimeout(() => setIsDissolved(true), 2400);
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  // Carbon Pulse coordinates (protagonist tracking)
  const pulsePos = useMemo(() => {
    switch (activeStep) {
      case 0: return { x: 45, y: 0, scale: 1.25, glow: 'rgba(239, 68, 68, 0.7)' }; // pyrolising
      case 1: return { x: 0, y: 0, scale: 1.0, glow: 'rgba(16, 185, 129, 0.5)' };  // target scan
      case 2:
        return isDissolved 
          ? { x: -30, y: -20, scale: 0.95, glow: 'rgba(16, 185, 129, 0.8)' } 
          : { x: 60, y: 35, scale: 0.9, glow: 'rgba(16, 185, 129, 0.6)' }; // document signature
      case 3: return { x: -80, y: -65, scale: 0.85, glow: 'rgba(16, 185, 129, 0.7)' }; // ledger registry
      case 4: return { x: 80, y: -78, scale: 1.0, glow: 'rgba(16, 185, 129, 0.8)' };  // marketplace badge
      case 5: return { x: 0, y: -10, scale: 0.75, glow: 'rgba(16, 185, 129, 0.5)' };  // lock core
      default: return { x: 0, y: 0, scale: 1.0, glow: 'rgba(16, 185, 129, 0.5)' };
    }
  }, [activeStep, isDissolved]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden font-mono">
      {/* Background blueprint grid remains consistent */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.015] pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-[#1E3A2F]" />)}
      </div>

      {/* -------------------- STEP 0: Pyrolysis Reactor -------------------- */}
      {activeStep === 0 && (
        <div className="absolute left-8 w-24 h-24 flex flex-col justify-around">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ x: [0, 80], y: [0, (i - 1.5) * 15], opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
              className="w-1.5 h-1.5 bg-emerald-700/60 rounded-full"
            />
          ))}
        </div>
      )}

      {activeStep === 0 && (
        <div className="absolute flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-28 h-28 border border-dashed border-[#B85C38]/40 rounded-full"
          />
          <motion.div
            animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-20 h-20 bg-gradient-to-tr from-orange-500/15 via-red-500/10 to-amber-500/10 rounded-full blur-md"
          />
          <svg className="absolute w-24 h-24 overflow-visible pointer-events-none -top-8" viewBox="0 0 100 100">
            {Array.from({ length: 3 }).map((_, idx) => (
              <motion.path
                key={idx}
                d={`M ${35 + idx * 15} 90 Q ${30 + idx * 15 + Math.sin(idx) * 10} 60 ${35 + idx * 15} 30`}
                fill="none"
                stroke="rgba(184, 92, 56, 0.15)"
                strokeWidth="1.2"
                strokeLinecap="round"
                animate={{
                  strokeDasharray: ["0, 100", "100, 0"],
                  strokeDashoffset: [100, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.6, ease: "easeInOut" }}
              />
            ))}
          </svg>
          <span className="absolute text-[8px] tracking-widest text-[#B85C38] uppercase font-bold">600°C</span>
        </div>
      )}

      {/* -------------------- STEP 1: MRV Telemetry Target Scanner -------------------- */}
      {activeStep === 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [0.75, 2.0], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-20 h-20 border border-emerald-500/35 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-24 h-24 border border-dashed border-emerald-500/20 rounded-full"
          />
          <div className="absolute w-28 h-0.5 bg-emerald-500/10" />
          <div className="absolute h-28 w-0.5 bg-emerald-500/10" />
        </div>
      )}

      {/* -------------------- THE CENTRAL CORE ASSET (PHYSICAL OBJECT TRANSFORMATION) -------------------- */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        style={{
          // Physical object position changes based on stage
          x: activeStep === 0 ? 95 : activeStep === 1 ? 0 : activeStep === 2 && !isDissolved ? -80 : 0,
          y: activeStep === 0 ? 0 : activeStep === 1 ? -45 : activeStep === 2 && !isDissolved ? -40 : 0,
          scale: activeStep === 0 ? 1 : activeStep === 1 ? 1.05 : 0.85,
          opacity: (activeStep === 2 && isDissolved) || activeStep > 2 ? 0 : 1,
        }}
        className="absolute z-20"
      >
        {/* Raw Carbon Chunk / Solidified Biochar */}
        <div className="w-16 h-16 bg-stone-900 border border-stone-850 rounded-xl flex items-center justify-center shadow-lg relative">
          <div className="w-6 h-6 bg-stone-700 rounded rotate-45 opacity-60" />
          <motion.div
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_4px_#10b981]"
          />
        </div>
      </motion.div>

      {/* Telemetry data readout (Step 1) */}
      {activeStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 w-full max-w-[280px] space-y-1.5 text-[9px] bg-white/60 backdrop-blur-sm border border-[#1E3A2F]/10 rounded-xl p-3 shadow-sm z-10"
        >
          <div className="flex justify-between border-b border-stone-100 pb-1 font-bold text-emerald-800 uppercase tracking-wider">
            <span>Telemetry Audit Sensor</span>
            <span>Active</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Reactor Heat Target:</span>
            <span className="font-bold text-stone-900"><CountingNumber value={612} />°C</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Carbon Fixed Ratio:</span>
            <span className="font-bold text-stone-900"><CountingNumber value={82.4} decimals={1} />%</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Telemetry Sync Coordinates:</span>
            <span className="font-bold text-stone-900">Zone B (Ghats)</span>
          </div>
        </motion.div>
      )}

      {/* -------------------- STEP 2: Verification (Assembles White Document Card) -------------------- */}
      {activeStep === 2 && !isDissolved && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[260px] bg-white border border-[#1E3A2F]/10 rounded-xl p-4 shadow-soft relative z-10"
        >
          <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-3">
            <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold">MRV Verification</span>
            <span className="text-[8px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Pending Approval</span>
          </div>
          
          {/* Document Content lines */}
          <div className="space-y-1 text-[8px] text-stone-500 pl-16">
            <div className="h-2 w-24 bg-stone-100 rounded" />
            <div className="h-2 w-32 bg-stone-100 rounded" />
            <div className="h-2 w-16 bg-stone-100 rounded" />
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <motion.div
                initial={{ scale: 2.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", damping: 10 }}
                className="h-5 w-5 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-md"
              >
                <Shield className="h-3 w-3" />
              </motion.div>
              <span className="text-[8px] text-stone-800 font-bold">Auditor Cryptographic Seal</span>
            </div>
            
            <svg className="w-16 h-6" viewBox="0 0 100 30">
              <motion.path
                d="M 10 20 Q 30 5 50 20 T 90 20"
                fill="none"
                stroke="#065f46"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>
      )}

      {/* -------------------- STEP 2 WOW SEQUENCE: Dissolution to Global Network -------------------- */}
      {activeStep === 2 && isDissolved && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          {/* Swarm of 20 orbit particles */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const radius = 60 + Math.sin(i * 3.5) * 15;
            const tx = Math.cos(angle) * radius;
            const ty = Math.sin(angle) * radius;
            
            return (
              <div key={i} className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ x: tx * 0.4, y: ty * 0.4, opacity: 0 }}
                  animate={{ 
                    x: [tx * 0.4, tx, tx * 0.9, tx], 
                    y: [ty * 0.4, ty, ty * 0.9, ty],
                    opacity: [0, 0.9, 0.75, 0.9] 
                  }}
                  transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_4px_#10b981]"
                />
                
                {i % 2 === 0 && (
                  <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 300 300">
                    <motion.line
                      x1={150 + tx}
                      y1={150 + ty}
                      x2={150 + Math.cos(((i + 1.2) / 20) * Math.PI * 2) * (60 + Math.sin((i+1.2) * 3.5) * 15)}
                      y2={150 + Math.sin(((i + 1.2) / 20) * Math.PI * 2) * (60 + Math.sin((i+1.2) * 3.5) * 15)}
                      stroke="rgba(16, 185, 129, 0.22)"
                      strokeWidth="0.8"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                )}
              </div>
            );
          })}

          {/* Connected Registry Node labels */}
          <div className="absolute inset-0 flex items-center justify-center text-[6px] tracking-widest text-[#B85C38] font-bold">
            <motion.div animate={{ opacity: [0.15, 0.75, 0.15] }} transition={{ repeat: Infinity, duration: 2.0 }} className="absolute -top-16">PURO.EARTH NODE</motion.div>
            <motion.div animate={{ opacity: [0.15, 0.75, 0.15] }} transition={{ repeat: Infinity, duration: 2.0, delay: 0.5 }} className="absolute -bottom-16">VERRA REGISTRY</motion.div>
            <motion.div animate={{ opacity: [0.15, 0.75, 0.15] }} transition={{ repeat: Infinity, duration: 2.0, delay: 1.0 }} className="absolute -left-20 rotate-90">LEDGER SYNC</motion.div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[7px] uppercase tracking-widest text-[#B85C38] font-bold">Network Synced</span>
            <span className="text-[9px] text-[#1E3A2F] font-bold mt-1">Collapsing to Ledger...</span>
          </div>
        </motion.div>
      )}

      {/* -------------------- STEP 3: Registry Ledger Rows -------------------- */}
      {activeStep === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
        >
          <div className="w-full max-w-[280px] bg-stone-950 text-stone-200 border border-stone-850 rounded-xl p-3 shadow-premium space-y-2 text-[8px] font-mono">
            <div className="flex justify-between items-center border-b border-stone-800 pb-2 mb-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider">Public Registry Ledger</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <div className="space-y-1.5">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between bg-stone-900/60 p-1.5 rounded border border-stone-850"
              >
                <span className="text-stone-400">Ledger Block:</span>
                <span className="text-white font-bold">#229-MINTED</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-between bg-stone-900/60 p-1.5 rounded border border-stone-850"
              >
                <span className="text-stone-400">Verifier Node:</span>
                <span className="text-emerald-300 font-bold">Puro.earth Node</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-between bg-stone-900/60 p-1.5 rounded border border-stone-850"
              >
                <span className="text-stone-400">Cryptographic Hash:</span>
                <span className="text-stone-300 font-semibold select-all font-mono">0x4ae89...c12f</span>
              </motion.div>
            </div>

            <div className="pt-2 border-t border-stone-850 flex items-center justify-between text-[7px] text-stone-500">
              <span>Verra Sync: Complete</span>
              <span className="text-emerald-400 font-bold">Batch Sealed</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* -------------------- STEP 4: Marketplace Listing Card -------------------- */}
      {activeStep === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center px-4"
        >
          <div className="w-full max-w-[250px] bg-white border border-[#1E3A2F]/10 rounded-xl p-4 shadow-soft">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[8px] bg-stone-100 text-[#151614] font-bold px-2 py-0.5 rounded uppercase">Crop Biochar</span>
              <span className="text-[10px] text-[#1E3A2F] font-bold font-mono">$28.00 / t</span>
            </div>
            
            <h4 className="text-[10px] font-bold text-stone-900 font-sans">Rajasthan Biochar Batch #4</h4>
            <p className="text-[8px] text-[#60645F] font-sans mt-0.5">Rajasthan, India • 1,000 Yrs Permanence</p>
            
            <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[8px] text-stone-500">Escrow: 12,400 t</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="text-[8px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded font-mono"
              >
                Verified • Ready for Trading
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}

      {/* -------------------- STEP 5: Permanent Retirement (Padlock snaps shut) -------------------- */}
      {activeStep === 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center px-4"
        >
          {/* Blurred catalog listing beneath vault */}
          <div className="relative w-full max-w-[250px] bg-white border border-stone-200 rounded-xl p-4 shadow-soft opacity-40 filter blur-[0.6px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] bg-stone-100 text-stone-400 px-2 py-0.5 rounded font-bold">Biochar</span>
              <span className="text-[9px] text-stone-400 font-mono">$28.00</span>
            </div>
            <h4 className="text-[10px] font-bold text-stone-400 font-sans">Rajasthan Biochar Batch #4</h4>
            <div className="h-1.5 w-24 bg-stone-100 rounded mt-2" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
              className="h-12 w-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shadow-lg mb-3"
            >
              <Lock className="h-5 w-5 text-emerald-400" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 3.0, opacity: 0, rotate: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: -12 }}
              transition={{ delay: 0.35, type: "spring", damping: 12 }}
              className="border-2 border-dashed border-[#B85C38] text-[#B85C38] px-3.5 py-1 text-[10px] tracking-widest font-black uppercase rounded bg-[#FAF8F6]/90 shadow-md font-mono"
            >
              RETIRED LOCK
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* -------------------- THE CARBON PULSE (PROTAGONIST) -------------------- */}
      <motion.div
        animate={{
          x: pulsePos.x,
          y: pulsePos.y,
          scale: pulsePos.scale,
          backgroundColor: activeStep === 0 ? '#b85c38' : '#10b981',
        }}
        transition={{
          type: "spring",
          stiffness: 85,
          damping: 14,
        }}
        style={{
          boxShadow: `0 0 12px ${pulsePos.glow}, 0 0 24px ${pulsePos.glow}`,
        }}
        className="absolute w-3.5 h-3.5 rounded-full z-30 pointer-events-none"
      />
    </div>
  );
};

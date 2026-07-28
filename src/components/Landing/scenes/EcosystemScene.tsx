import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Building, Leaf, Lock, Sparkles } from 'lucide-react';

export const EcosystemScene: React.FC = () => {
  return (
    <section className="relative bg-transparent text-stone-100 px-6 md:px-24 py-32 overflow-hidden border-t border-emerald-950/20 backdrop-blur-[1px] z-10">
      
      {/* Background blueprint vector grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-dark" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dark)" />
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
              <line x1="20" y1="20" x2="50" y2="50" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="80" y1="20" x2="50" y2="50" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="20" y1="80" x2="50" y2="50" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="80" y1="80" x2="50" y2="50" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />

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
            <div className="absolute top-4 left-4 z-10 flex flex-col items-center gap-1 bg-stone-900 border border-stone-800 rounded p-2 text-center w-20">
              <Database className="h-4 w-4 text-emerald-400" />
              <span className="text-[8px] font-mono font-bold">REGISTRIES</span>
            </div>

            <div className="absolute top-4 right-4 z-10 flex flex-col items-center gap-1 bg-stone-900 border border-stone-800 rounded p-2 text-center w-20">
              <Building className="h-4 w-4 text-blue-400" />
              <span className="text-[8px] font-mono font-bold">BUYERS</span>
            </div>

            <div className="absolute bottom-4 left-4 z-10 flex flex-col items-center gap-1 bg-stone-900 border border-stone-800 rounded p-2 text-center w-20">
              <Leaf className="h-4 w-4 text-amber-400" />
              <span className="text-[8px] font-mono font-bold">PROJECTS</span>
            </div>

            <div className="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-1 bg-stone-900 border border-stone-800 rounded p-2 text-center w-20">
              <Lock className="h-4 w-4 text-red-400" />
              <span className="text-[8px] font-mono font-bold">VAULTS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

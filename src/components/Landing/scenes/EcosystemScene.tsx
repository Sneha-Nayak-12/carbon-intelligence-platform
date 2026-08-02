import React from 'react';
import { Activity, Database, Building, Leaf, ShieldAlert } from 'lucide-react';

export const EcosystemScene: React.FC = () => {
  return (
    <section className="relative bg-transparent text-brand-warmWhite px-6 md:px-24 py-32 overflow-hidden z-10">
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-dark-ecosystem" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(250,248,246,0.01)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dark-ecosystem)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-brand-sand bg-brand-alpine/25 border border-brand-alpine/20 px-2.5 py-1 rounded font-bold">
              Scene III / Operating System
            </span>
            <h2 className="text-4xl md:text-6xl font-editorial font-bold tracking-tight leading-tight text-brand-warmWhite">
              The Ecosystem <br />
              <span className="italic font-normal text-brand-warmWhite-muted">Connection</span>
            </h2>
          </div>

          <p className="text-xs md:text-sm font-mono text-brand-warmWhite-muted leading-relaxed max-w-md">
            We connect carbon removal suppliers directly with global compliance registries, buyers, and cryptographic vaults. Real-time data streams align reporting, double-claim checks, and funding settlements automatically.
          </p>

          <div className="space-y-4 pt-4">
            <div className="border-t border-brand-alpine/25 pt-4 flex justify-between text-xs font-mono">
              <span className="text-brand-sand font-bold">Live Stream Log:</span>
              <span className="text-brand-sand animate-pulse flex items-center gap-1">
                <Activity className="h-3 w-3" /> System Operational
              </span>
            </div>
            <div className="h-20 bg-brand-forest-card border border-brand-alpine/25 rounded p-3 font-mono text-[9px] text-brand-warmWhite overflow-y-hidden space-y-1">
              <div className="flex items-center gap-2"><span className="text-brand-warmWhite font-bold">[SYS]</span> <span>Verification node 09 verified +2,400 tCO₂ biochar</span></div>
              <div className="flex items-center gap-2"><span className="text-brand-sand font-bold">[REG]</span> <span>Verra Registry minted batch IN-2026-BIO-229</span></div>
              <div className="flex items-center gap-2"><span className="text-brand-warmWhite-muted font-bold">[BUY]</span> <span>Acme Enterprise locked and retired 5,000 tCO₂</span></div>
            </div>
          </div>
        </div>

        {/* Integration Status Board - Clean 2x2 grid representing real middleware */}
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Registries Pillar */}
            <div className="bg-brand-forest-card border-t border-l border-r border-brand-alpine/25 p-5 rounded-xl space-y-3 shadow-premium hover:border-brand-alpine/45 transition-all">
              <div className="flex items-center justify-between">
                <Database className="h-4 w-4 text-brand-sand" />
                <span className="text-[8px] bg-brand-alpine/30 border border-brand-alpine/55 text-brand-sand px-2 py-0.5 rounded font-mono font-bold">CONNECTED</span>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-brand-warmWhite uppercase font-mono">Registries</h4>
                <p className="text-[8px] text-brand-warmWhite-muted font-mono mt-0.5">Verra / Puro.earth Sync</p>
              </div>
              <div className="text-[8px] font-mono text-brand-warmWhite-muted border-t border-brand-alpine/20 pt-2 flex justify-between">
                <span>Latency:</span>
                <span className="text-brand-warmWhite font-bold">24ms</span>
              </div>
            </div>

            {/* Buyers Pillar */}
            <div className="bg-brand-forest-card border-t border-l border-r border-brand-alpine/25 p-5 rounded-xl space-y-3 shadow-premium hover:border-brand-alpine/45 transition-all">
              <div className="flex items-center justify-between">
                <Building className="h-4 w-4 text-brand-sand" />
                <span className="text-[8px] bg-brand-alpine/30 border border-brand-alpine/55 text-brand-sand px-2 py-0.5 rounded font-mono font-bold">SECURED</span>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-brand-warmWhite uppercase font-mono">Buyers</h4>
                <p className="text-[8px] text-brand-warmWhite-muted font-mono mt-0.5">Compliance Escrow</p>
              </div>
              <div className="text-[8px] font-mono text-brand-warmWhite-muted border-t border-brand-alpine/20 pt-2 flex justify-between">
                <span>Active Nodes:</span>
                <span className="text-brand-warmWhite font-bold">12 Active</span>
              </div>
            </div>

            {/* Suppliers Pillar */}
            <div className="bg-brand-forest-card border-t border-l border-r border-brand-alpine/25 p-5 rounded-xl space-y-3 shadow-premium hover:border-brand-alpine/45 transition-all">
              <div className="flex items-center justify-between">
                <Leaf className="h-4 w-4 text-brand-sand" />
                <span className="text-[8px] bg-[#2f5c45] border border-brand-alpine/35 text-brand-warmWhite px-2 py-0.5 rounded font-mono font-bold">STREAMING</span>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-brand-warmWhite uppercase font-mono">Suppliers</h4>
                <p className="text-[8px] text-brand-warmWhite-muted font-mono mt-0.5">Biomass Telemetry</p>
              </div>
              <div className="text-[8px] font-mono text-brand-warmWhite-muted border-t border-brand-alpine/20 pt-2 flex justify-between">
                <span>MRV Sensors:</span>
                <span className="text-brand-warmWhite font-bold">412 Units</span>
              </div>
            </div>

            {/* Vaults Pillar */}
            <div className="bg-brand-forest-card border-t border-l border-r border-brand-alpine/25 p-5 rounded-xl space-y-3 shadow-premium hover:border-brand-alpine/45 transition-all">
              <div className="flex items-center justify-between">
                <ShieldAlert className="h-4 w-4 text-brand-sand" />
                <span className="text-[8px] bg-[#0f1915] border border-brand-alpine/25 text-brand-sand px-2 py-0.5 rounded font-mono font-bold">LOCKED</span>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-brand-warmWhite uppercase font-mono">Vaults</h4>
                <p className="text-[8px] text-brand-warmWhite-muted font-mono mt-0.5">Double-Claim Lock</p>
              </div>
              <div className="text-[8px] font-mono text-brand-warmWhite-muted border-t border-brand-alpine/20 pt-2 flex justify-between">
                <span>Keys Signed:</span>
                <span className="text-brand-warmWhite font-bold">2.4k Keys</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

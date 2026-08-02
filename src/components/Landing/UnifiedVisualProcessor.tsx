import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Cpu, CheckCircle, Database, Thermometer, Radio, Eye } from 'lucide-react';

interface ProcessorProps {
  activeStep: number;
}

export const UnifiedVisualProcessor: React.FC<ProcessorProps> = ({ activeStep }) => {
  return (
    <div className="relative w-full h-full flex flex-col font-mono text-[11px] bg-ocean-bg-elevated text-text-secondary select-none overflow-hidden motif-coords">
      
      {/* Top Console Status Bar */}
      <div className="flex items-center justify-between border-b border-ocean-border px-4 py-3 bg-ocean-bg-secondary">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ocean-brand animate-pulse" />
          <span className="text-text-primary font-bold uppercase tracking-wider text-[10px]">TELEMETRY_NODE_V1.0</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-text-muted">
          <span>LAT: 26.9124° N</span>
          <span>LON: 75.7873° E</span>
        </div>
      </div>

      {/* Main Inner Workspace Split */}
      <div className="flex-1 grid grid-cols-3 divide-x divide-ocean-border">
        
        {/* Left Telemetry Log Pane (2 cols) */}
        <div className="col-span-2 p-4 flex flex-col justify-between space-y-4">
          
          {/* Active Step Visual Panel */}
          <div className="flex-1 flex flex-col justify-center">
            {activeStep === 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-ocean-premium">
                  <Eye className="h-4 w-4" />
                  <span className="font-display font-bold text-sm tracking-wide text-text-primary">01 / Project Discovery</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                    <span className="text-[8px] text-text-muted block uppercase">SOIL CAPABILITY</span>
                    <span className="text-text-primary font-bold">89.4% suitability</span>
                  </div>
                  <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                    <span className="text-[8px] text-text-muted block uppercase">BIOMASS YIELD</span>
                    <span className="text-text-primary font-bold">14,200 t/annum</span>
                  </div>
                </div>
                <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md text-[9px] space-y-1">
                  <div className="flex justify-between"><span>Site Coordinate:</span><span className="text-text-primary">RJ-KILN-04</span></div>
                  <div className="flex justify-between"><span>Registry Match:</span><span className="text-text-primary">Puro.earth v3.2</span></div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-ocean-premium">
                  <Database className="h-4 w-4" />
                  <span className="font-display font-bold text-sm tracking-wide text-text-primary">02 / Methodology Baseline</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                    <span className="text-[8px] text-text-muted block uppercase">PROTOCOL TYPE</span>
                    <span className="text-text-primary font-bold">Biochar Pyrolysis</span>
                  </div>
                  <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                    <span className="text-[8px] text-text-muted block uppercase">BASELINE EMISSIONS</span>
                    <span className="text-text-primary font-bold">Verified Zero</span>
                  </div>
                </div>
                <div className="bg-ocean-bg-primary border border-ocean-border p-2.5 rounded-md text-[9px] space-y-1">
                  <div className="flex justify-between"><span>Standard Body:</span><span className="text-text-primary">Verra VM0044</span></div>
                  <div className="flex justify-between"><span>Additionality Score:</span><span className="text-text-primary">98.2% (Passed)</span></div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-ocean-warning">
                  <Thermometer className="h-4 w-4" />
                  <span className="font-display font-bold text-sm tracking-wide text-text-primary">03 / Real-Time Telemetry</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                    <span className="text-[8px] text-text-muted block uppercase">KILN TEMPERATURE</span>
                    <span className="text-text-primary font-bold">612°C</span>
                  </div>
                  <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                    <span className="text-[8px] text-text-muted block uppercase">O₂ CONCENTRATION</span>
                    <span className="text-text-primary font-bold">0.00% (Oxygen-Free)</span>
                  </div>
                </div>
                <div className="bg-ocean-bg-primary border border-ocean-border p-2.5 rounded-md text-[9px] space-y-1">
                  <div className="flex justify-between"><span>IoT Sensor Uptime:</span><span className="text-text-primary">99.98%</span></div>
                  <div className="flex justify-between"><span>Data Rate:</span><span className="text-text-primary">1.2kb/s (Continuous)</span></div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-ocean-premium">
                  <Cpu className="h-4 w-4" />
                  <span className="font-display font-bold text-sm tracking-wide text-text-primary">04 / MRV Auditor Review</span>
                </div>
                <div className="bg-ocean-bg-primary border border-ocean-border p-3 rounded-md space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-ocean-success" /> Satellite Imagery</span>
                    <span className="text-ocean-premium font-bold">VERIFIED</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-ocean-success" /> Soil Core Delta</span>
                    <span className="text-ocean-premium font-bold">VERIFIED</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-ocean-success" /> Telemetry Logging</span>
                    <span className="text-ocean-premium font-bold">VERIFIED</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-ocean-premium">
                  <Database className="h-4 w-4" />
                  <span className="font-display font-bold text-sm tracking-wide text-text-primary">05 / Cryptographic Issuance</span>
                </div>
                <div className="bg-ocean-bg-primary border border-ocean-border p-2.5 rounded-md space-y-1.5">
                  <div className="flex justify-between text-[10px]">
                    <span>Registry Target:</span>
                    <span className="text-text-primary font-bold">Puro.earth Ledger</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span>Mint Queue ID:</span>
                    <span className="text-text-primary">#IN-2026-BIO-229</span>
                  </div>
                  <div className="border-t border-ocean-divider pt-1.5 text-[8px] text-text-muted select-all">
                    BLOCK_HASH: 0x4ae89fd2b18ea0283c74912b18ea0283c
                  </div>
                </div>
              </div>
            )}

            {activeStep === 5 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-ocean-brand">
                  <Radio className="h-4 w-4" />
                  <span className="font-display font-bold text-sm tracking-wide text-text-primary">06 / Escrow Clearinghouse</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                    <span className="text-[8px] text-text-muted block uppercase">ESCROW STATUS</span>
                    <span className="text-ocean-premium font-bold font-mono">LOCKED</span>
                  </div>
                  <div className="bg-ocean-bg-primary border border-ocean-border p-2 rounded-md">
                    <span className="text-[8px] text-text-muted block uppercase">CATALOG NODE</span>
                    <span className="text-text-primary font-bold">Node #18</span>
                  </div>
                </div>
                <div className="bg-ocean-bg-primary border border-ocean-border p-2.5 rounded-md text-[9px] space-y-1">
                  <div className="flex justify-between"><span>Batch Volume:</span><span className="text-text-primary">12,400 tCO₂e</span></div>
                  <div className="flex justify-between"><span>Verified Spot Price:</span><span className="text-text-primary">$28.50 / Ton</span></div>
                </div>
              </div>
            )}

            {activeStep === 6 && (
              <div className="space-y-3 text-center flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-ocean-bg-primary border border-ocean-border flex items-center justify-center mb-1 text-ocean-premium shadow-ocean-sm">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="text-text-primary font-display font-bold text-sm">Permanent Retirement Seal</div>
                <p className="text-[10px] text-text-muted max-w-[220px]">
                  Credits permanently retired and locked. Unique environmental claim certificate issued.
                </p>
                <div className="mt-1 bg-ocean-bg-primary border border-ocean-brand text-ocean-premium text-[8px] px-2.5 py-1 rounded font-bold uppercase tracking-widest">
                  RETIRED_BLOCK_LOCKED
                </div>
              </div>
            )}
          </div>

          {/* Lower Terminal Output logs */}
          <div className="h-20 bg-ocean-bg-primary border border-ocean-border rounded p-2 overflow-y-hidden text-[9px] text-text-muted space-y-1">
            <div className="flex gap-2">
              <span className="text-text-secondary font-bold">[SYS]</span>
              <span>Node connection verified... ping 24ms</span>
            </div>
            {activeStep >= 2 && (
              <div className="flex gap-2">
                <span className="text-ocean-warning font-bold">[MRV]</span>
                <span>Pyrolysis thermal logs verified: 612°C O2=0.0%</span>
              </div>
            )}
            {activeStep >= 4 && (
              <div className="flex gap-2">
                <span className="text-text-primary font-bold">[REG]</span>
                <span>Ledger transaction signed with 0x4ae89...c12f</span>
              </div>
            )}
            {activeStep === 6 && (
              <div className="flex gap-2">
                <span className="text-ocean-premium font-bold">[SEC]</span>
                <span>Audit certificate finalized. Escrow node locked.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Node Parameters (1 col) */}
        <div className="p-4 flex flex-col justify-between space-y-4 bg-ocean-bg-secondary">
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-wider text-text-primary font-bold block border-b border-ocean-border pb-1.5">NODE_PARAMETERS</span>
            <div className="space-y-3 text-[10px]">
              <div>
                <span className="text-text-muted block">SYNC STATE</span>
                <span className="text-text-primary font-bold">OK / ONLINE</span>
              </div>
              <div>
                <span className="text-text-muted block">REGISTRY PARTNER</span>
                <span className="text-text-primary">Puro.earth v3.2</span>
              </div>
              <div>
                <span className="text-text-muted block">COMPLIANCE CODE</span>
                <span className="text-text-primary font-mono">Article 6.4 Compliant</span>
              </div>
              <div>
                <span className="text-text-muted block">GEO GRID LINK</span>
                <span className="text-text-primary">RJ-KILN-04</span>
              </div>
            </div>
          </div>

          <div className="border-t border-ocean-border pt-3 space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-text-muted flex items-center gap-1"><Shield className="h-3 w-3" /> Ledger Sec.</span>
              <span className="text-ocean-premium font-bold">100% Crypt</span>
            </div>
            <div className="w-full bg-ocean-bg-primary h-1 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${((activeStep + 1) / 7) * 100}%` }}
                className="bg-ocean-brand h-full"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

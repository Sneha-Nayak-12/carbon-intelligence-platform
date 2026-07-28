import React, { useState } from 'react';

export const FinaleScene: React.FC = () => {
  const [offsetPercentage, setOffsetPercentage] = useState(70);

  const baseEmissions = 8500; // tCO2e
  const totalOffset = (baseEmissions * offsetPercentage) / 100;
  const netEmissions = baseEmissions - totalOffset;
  const netZeroYear = offsetPercentage === 100 ? 2026 : Math.max(2050 - (offsetPercentage * 0.3), 2028).toFixed(0);

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
    <section className="relative bg-transparent border-t border-emerald-950/20 px-6 md:px-24 py-32 overflow-hidden z-10 backdrop-blur-[1px]">
      
      {/* Volumetric backlight glow */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-emerald-500/[0.03] blur-[125px] pointer-events-none animate-glow-slow" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Panel: Narrative & Toggles */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-amber-500 bg-amber-500/5 border border-amber-500/15 px-2.5 py-1 rounded">
              Scene V / The Dashboard
            </span>
            <h2 className="text-4xl md:text-6xl font-editorial font-bold tracking-tight text-white leading-tight">
              Carbon Intelligence
            </h2>
          </div>

          <p className="text-xs md:text-sm font-sans text-stone-300 leading-relaxed max-w-md">
            The culmination of your sustainability strategy. Aggregating scope emissions liabilities, calculating net-zero timelines, and generating real-time audit receipts.
          </p>

          {/* Slider control representing offset target */}
          <div className="space-y-4 bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-6 max-w-md shadow-premium">
            <div className="flex justify-between items-center border-b border-emerald-950/20 pb-3">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-bold">Interactive Slider</span>
              <span className="text-[10px] font-mono text-stone-300 font-bold">Target Offset Volume</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-[11px] font-mono text-emerald-300">
                <span>Procured Offsets Percentage:</span>
                <span className="font-bold text-white">{offsetPercentage}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={offsetPercentage}
                onChange={(e) => setOffsetPercentage(parseInt(e.target.value))}
                className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[8px] font-mono text-stone-500 uppercase">
                <span>10% Minimum</span>
                <span>100% Net Zero</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Simulated Trend Line and Insight */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md premium-glass rounded-2xl p-6 space-y-6 animate-float-slow">

            <div className="flex justify-between items-center border-b border-emerald-950/20 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-white">PORTFOLIO SIMULATOR</span>
              </div>
              <span className="text-[9px] font-mono text-stone-400 uppercase">Scope 1 & 2 Liability</span>
            </div>

            {/* Dynamic Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-950/40 border border-emerald-500/10 p-3 rounded-lg">
                <span className="text-[8px] text-stone-400 uppercase font-mono block">Offset Carbon</span>
                <span className="text-base font-bold text-emerald-400 mt-1 block font-mono">
                  {totalOffset.toLocaleString(undefined, { maximumFractionDigits: 0 })} tCO₂e
                </span>
              </div>
              <div className="bg-stone-950/40 border border-emerald-500/10 p-3 rounded-lg">
                <span className="text-[8px] text-stone-400 uppercase font-mono block">Residual Liability</span>
                <span className="text-base font-bold text-[#B85C38] mt-1 block font-mono">
                  {netEmissions.toLocaleString(undefined, { maximumFractionDigits: 0 })} tCO₂e
                </span>
              </div>
            </div>

            {/* Custom SVG Simulated Trend Line Chart */}
            <div className="h-28 bg-stone-950/40 rounded-lg border border-emerald-500/10 p-3 relative flex flex-col justify-between overflow-hidden">
              <span className="text-[8px] font-mono text-stone-400 uppercase">Net Zero Projection</span>

              <svg className="w-full h-16 absolute bottom-1 left-0 right-0 px-2" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                <path d="M 0 10 L 100 10" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="1.5" />
                <path
                  d={`M 0 10 C 30 10, 60 ${10 + (20 - 10) * (offsetPercentage / 100)}, 100 ${10 + (20 - 10) * (offsetPercentage / 100)}`}
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="flex justify-between items-center text-[9px] font-mono text-white font-bold z-10 pt-8">
                <span>Year of Target: {netZeroYear}</span>
                <span className="text-emerald-400">
                  {offsetPercentage === 100 ? 'Carbon Neutral Achieved' : `Remaining: ${(100 - offsetPercentage)}%`}
                </span>
              </div>
            </div>

            {/* Executive Advisor Recommendation */}
            <div className="bg-emerald-950/30 border border-emerald-500/15 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-1 text-emerald-400">
                <WorkspaceIconHelper />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400">AI Executive Advisor</span>
              </div>
              <p className="text-[10px] text-stone-300 leading-relaxed font-sans italic">
                "{getAIRecommendation()}"
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// Internal icon helper to cleanly decouple Lucide import references
const WorkspaceIconHelper: React.FC = () => {
  return (
    <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
};

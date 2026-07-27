import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

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
    <section className="relative bg-[#FAF8F6] border-t border-[#1E3A2F]/5 px-6 md:px-24 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Panel: Narrative & Toggles */}
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

        {/* Right Panel: Simulated Trend Line and Insight */}
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
                <span className="text-base font-bold text-emerald-800 mt-1 block font-mono">
                  {totalOffset.toLocaleString(undefined, { maximumFractionDigits: 0 })} tCO₂e
                </span>
              </div>
              <div className="bg-[#FAF8F6] border border-[#1E3A2F]/5 p-3 rounded-lg">
                <span className="text-[8px] text-[#60645F] uppercase font-mono block">Residual Liability</span>
                <span className="text-base font-bold text-[#B85C38] mt-1 block font-mono">
                  {netEmissions.toLocaleString(undefined, { maximumFractionDigits: 0 })} tCO₂e
                </span>
              </div>
            </div>

            {/* Custom SVG Simulated Trend Line Chart */}
            <div className="h-28 bg-[#FAF8F6] rounded-lg border border-[#1E3A2F]/5 p-3 relative flex flex-col justify-between overflow-hidden">
              <span className="text-[8px] font-mono text-[#60645F] uppercase">Net Zero Projection</span>

              <svg className="w-full h-16 absolute bottom-1 left-0 right-0 px-2" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                <path d="M 0 10 L 100 10" stroke="rgba(96, 100, 95, 0.15)" strokeWidth="1.5" />
                <path
                  d={`M 0 10 C 30 10, 60 ${10 + (20 - 10) * (offsetPercentage / 100)}, 100 ${10 + (20 - 10) * (offsetPercentage / 100)}`}
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

            {/* Executive Advisor Recommendation */}
            <div className="bg-emerald-800/[0.03] border border-emerald-800/10 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-1 text-emerald-800">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800">AI Executive Advisor</span>
              </div>
              <p className="text-[10px] text-[#60645F] leading-relaxed font-sans italic">
                "{getAIRecommendation()}"
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

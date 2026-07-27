import React from 'react';
import { stepsData } from '../NarrativeState';

interface SceneProps {
  activeStep: number;
  domRef: (el: HTMLDivElement | null) => void;
}

export const MarketplaceScene: React.FC<SceneProps> = ({ activeStep, domRef }) => {
  const step = stepsData[4];
  const isActive = activeStep === 4;

  return (
    <div
      ref={domRef}
      data-index={4}
      className={`transition-all duration-500 border-l-2 pl-6 py-2 space-y-3 ${
        isActive ? 'border-[#1E3A2F] opacity-100' : 'border-[#1E3A2F]/10 opacity-30'
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
  );
};

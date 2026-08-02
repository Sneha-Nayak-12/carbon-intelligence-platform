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
      className={`transition-all duration-300 p-6 rounded-lg border shadow-ocean-sm space-y-3 ${
        isActive 
          ? 'bg-ocean-bg-elevated border-ocean-brand text-text-primary' 
          : 'bg-ocean-bg-secondary border-ocean-border/60 text-text-secondary/70 opacity-60'
      }`}
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

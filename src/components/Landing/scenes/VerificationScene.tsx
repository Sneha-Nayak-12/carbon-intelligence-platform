import React from 'react';
import { stepsData } from '../NarrativeState';

interface SceneProps {
  activeStep: number;
  domRef: (el: HTMLDivElement | null) => void;
}

export const VerificationScene: React.FC<SceneProps> = ({ activeStep, domRef }) => {
  const step = stepsData[2];
  const isActive = activeStep === 2;

  return (
    <div
      ref={domRef}
      data-index={2}
      className={`transition-all duration-500 border-l-2 pl-6 py-2 space-y-3 ${
        isActive ? 'border-emerald-400 opacity-100' : 'border-emerald-500/10 opacity-30'
      }`}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
        {step.label}
      </div>
      <h3 className="text-2xl font-editorial font-bold text-white">
        {step.title}
      </h3>
      <div className="text-xs font-mono text-emerald-300 font-semibold leading-relaxed">
        {step.sub}
      </div>
      <p className="text-xs text-stone-300 font-sans leading-relaxed">
        {step.description}
      </p>
    </div>
  );
};

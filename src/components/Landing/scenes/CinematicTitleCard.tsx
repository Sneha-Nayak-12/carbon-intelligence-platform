import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { OfficialOceanLogo } from './OceanLogo';
import { CinematicAtmosphere } from './CinematicAtmosphere';

interface CinematicTitleCardProps {
  scrollYProgress?: MotionValue<number>;
}

export const CinematicTitleCard: React.FC<CinematicTitleCardProps> = () => {
  return (
    <div className="relative w-full h-screen min-h-screen flex flex-col justify-between items-center px-6 py-10 md:py-16 select-none overflow-hidden z-10">
      {/* 1. Cinematic Oceanic Atmosphere Layer */}
      <CinematicAtmosphere />

      {/* 2. Upper-Middle: "GREENASHA PRESENTS" (Fades in 4s–5s) */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 pt-8 md:pt-12 text-center"
      >
        <span className="text-[11px] md:text-[13px] tracking-[0.45em] md:tracking-[0.55em] text-[#8DE5E9]/80 font-sans font-medium uppercase text-center block">
          GREENASHA PRESENTS
        </span>
      </motion.div>

      {/* 3. Center: OCEAN Branding (38–48vw on desktop, centered, generous negative space) */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center my-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-[84vw] sm:w-[68vw] md:w-[52vw] lg:w-[46vw] max-w-[580px] min-w-[280px] mx-auto flex items-center justify-center"
        >
          {/* Official OCEAN Logo with aqua water texture and platform tagline */}
          <OfficialOceanLogo 
            className="w-full h-auto" 
            glow={true} 
          />
        </motion.div>
      </div>

      {/* 5. Near Bottom: "SCROLL TO DIVE" with vertical line & chevron (Fades in 4.5s) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1.0 }}
        className="relative z-20 pb-4 md:pb-6 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-[#8DE5E9]/60 uppercase">
          SCROLL TO DIVE
        </span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-[1px] h-6 md:h-8 bg-gradient-to-b from-[#8DE5E9]/50 via-[#8DE5E9]/25 to-transparent overflow-hidden relative">
            <motion.div
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-1/2 bg-[#8DE5E9]"
            />
          </div>
          {/* Subtle downward chevron matching the reference diagram */}
          <svg 
            className="w-3.5 h-3.5 text-[#8DE5E9]/60 animate-bounce -mt-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

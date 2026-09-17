import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CinematicTitleCard } from './CinematicTitleCard';
import { OceanSurfaceTransition } from './OceanSurfaceTransition';
import { OfficialOceanLogo } from './OceanLogo';

export { OfficialOceanLogo };

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the 220vh transition container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // PHASE 1: Title Card translations and fade out as scroll starts
  const titleY = useTransform(scrollYProgress, [0.0, 0.35], [0, -140]);
  const titleOpacity = useTransform(scrollYProgress, [0.0, 0.28, 0.42], [1, 0.85, 0]);
  const titleScale = useTransform(scrollYProgress, [0.0, 0.35], [1, 0.96]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[220vh] bg-[#020B11]"
      id="cinematic-hero-section"
    >
      {/* STICKY FULL-VIEWPORT STAGE */}
      <div className="sticky top-0 w-full h-screen min-h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* SCENE 1: CINEMATIC BRAND REVEAL */}
        <motion.div
          style={{
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
          }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-20 pointer-events-none"
        >
          <div className="w-full h-full pointer-events-auto">
            <CinematicTitleCard />
          </div>
        </motion.div>

        {/* SCROLL TRANSITION: SURFACE DIVE (PHASES 2–6) */}
        <OceanSurfaceTransition progress={scrollYProgress} />

      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { headlineVariants } from '../MotionSystem';
import { useScrollEngine } from '../ScrollEngine';

export const HeroScene: React.FC = () => {
  const { textOpacity, textY } = useScrollEngine();

  return (
    <>
      {/* Dark radial overlay behind typography to guarantee 100% legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,9,10,0.85)_0%,rgba(8,9,10,0.40)_55%,transparent_90%)] pointer-events-none z-10" />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 z-30 pointer-events-none"
      >
        <div className="-translate-y-16 flex flex-col items-center">
          <motion.h1
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="font-editorial text-5xl md:text-8xl text-white text-center leading-[1.05] font-bold"
          >
            Carbon is Invisible.
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15, filter: 'blur(6px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: {
                  delay: 1.0,
                  duration: 1.6,
                  ease: "easeOut"
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="font-mono text-[10px] md:text-xs text-white font-semibold text-center tracking-widest uppercase mt-6 max-w-md"
          >
            But its impact shapes every future.
          </motion.p>
        </div>

        {/* Restore original Hero action buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1.4, duration: 1.2, ease: "easeOut" }
            }
          }}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 mt-8 pointer-events-auto"
        >
          <Link
            to="/login"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-alpine hover:bg-brand-alpine/90 px-6 text-xs font-mono uppercase tracking-widest text-brand-warmWhite font-bold transition-all active:scale-95 shadow-[0_4px_12px_rgba(5,8,6,0.3)]"
          >
            Explore Marketplace
          </Link>
          <Link
            to="/login"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-brand-warmWhite/30 bg-transparent px-6 text-xs font-mono uppercase tracking-widest text-brand-warmWhite font-bold transition-all hover:bg-brand-warmWhite/5 active:scale-95"
          >
            Request Demo
          </Link>
        </motion.div>
      </motion.div>
 
      {/* Scroll Down Indicator */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
      >
        <span className="text-[9px] font-mono uppercase tracking-widest text-brand-warmWhite/60 font-bold">
          Explore the Journey
        </span>
        <div className="w-[1px] h-12 bg-brand-warmWhite/10 overflow-hidden relative">
          <motion.div
            variants={{
              animate: {
                top: ['-100%', '100%'],
                height: ['0%', '100%', '0%'],
                opacity: [0, 1, 0],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
            animate="animate"
            className="absolute left-0 w-full bg-brand-sand"
          />
        </div>
      </motion.div>
    </>
  );
};

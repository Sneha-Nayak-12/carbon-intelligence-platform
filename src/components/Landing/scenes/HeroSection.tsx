import React, { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { OceanCurrentCanvas } from './OceanCurrentCanvas';

// ==========================================
// OFFICIAL OCEAN LOGO (EXACT GRAPHIC COPIED)
// ==========================================
const OfficialOceanLogo: React.FC = () => {
  return (
    <svg className="w-full h-auto" viewBox="0 0 206 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ocean-hero-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B7A75" />
          <stop offset="40%" stopColor="#1C8A83" />
          <stop offset="100%" stopColor="#3B8E67" />
        </linearGradient>
      </defs>
      {/* O with wave inside */}
      <g>
        <circle cx="35" cy="35" r="24" stroke="url(#ocean-hero-grad)" strokeWidth="7" fill="none" />
        {/* Exact Crest Wave Design */}
        <path d="M 15 42 Q 22 55 35 55 Q 48 55 53 45 Q 40 48 32 40 Q 25 32 15 42" fill="url(#ocean-hero-grad)" />
        <path d="M 15 46 Q 23 57 35 57 Q 47 57 51 47" stroke="#F5F7F8" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M 17 40 Q 24 49 32 49 Q 40 49 44 43" stroke="#8DE5E9" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.8" />
      </g>
      {/* C */}
      <path d="M78 18 C70 18, 62 25, 62 35 C62 45, 70 52, 78 52" stroke="url(#ocean-hero-grad)" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* E */}
      <path d="M110 18 H95 V52 H110 M95 35 H106" stroke="url(#ocean-hero-grad)" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* A with Leaf replacing crossbar */}
      <g>
        <path d="M122 52 L134 18 L146 52" stroke="url(#ocean-hero-grad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Tilted Green Leaf with Veins and details */}
        <g transform="translate(122, 34) rotate(15)">
          <path d="M0 5 C5 -3, 20 -3, 28 5 C20 13, 5 13, 0 5 Z" fill="#2CB587" />
          <path d="M0 5 Q14 5 28 5" stroke="#07151C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M4 3 C9 -1, 19 -1, 24 4" stroke="#F5F7F8" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />
        </g>
      </g>
      {/* N */}
      <path d="M158 52 V18 L178 52 V18" stroke="url(#ocean-hero-grad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Subtext */}
      <text x="2" y="72" fill="#EAEFF3" fontSize="9" fontFamily="monospace" letterSpacing="1.8" fontWeight="bold">CARBON INTELLIGENCE PLATFORM</text>
    </svg>
  );
};

const CustomCheckIcon = () => (
  <div className="w-4 h-4 rounded-full border border-[#8DE5E9]/60 flex items-center justify-center flex-shrink-0 bg-transparent">
    <svg className="w-2 h-2 text-[#8DE5E9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

export const HeroSection: React.FC = () => {
  const [stage, setStage] = useState(0); // 0 to 4 sequence
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax spring animations
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const textParallaxX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const textParallaxY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const dashboardParallaxX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const dashboardParallaxY = useTransform(springY, [-0.5, 0.5], [-24, 24]);

  const backgroundParallaxX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const backgroundParallaxY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  const coralParallaxX = useTransform(springX, [-0.5, 0.5], [-30, 30]);

  // Handle stage reveal timeline
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 1500);
    const t3 = setTimeout(() => setStage(3), 2500);
    const t4 = setTimeout(() => setStage(4), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Listen to mouse movement for parallax triggers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex items-center justify-center pt-24 pb-16 bg-cover select-none">
      
      {/* 1. LAYER: CANVAS BACKGROUND (Rays, Horizon, Carbon Current) */}
      <OceanCurrentCanvas revealStage={stage} scrollYProgress={useMotionValue(0)} />

      {/* 2. LAYER: DEPTH ATMOSPHERE (Deep fog and light vignettes) */}
      <motion.div 
        style={{ x: backgroundParallaxX, y: backgroundParallaxY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,17,25,0.15)_0%,rgba(3,10,14,0.5)_75%)] pointer-events-none z-0" 
      />

      {/* 3. LAYER: STACKED CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-16 px-6 md:px-12 z-20 relative pt-12">
        
        {/* Top Centered Logo (Main Attraction of Scene 1) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={stage >= 3 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[480px] group mx-auto flex justify-center"
        >
          {/* Soft lighting rays overlaying logo wrapper */}
          <div className="absolute -inset-6 bg-[#8DE5E9]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#8DE5E9]/8 transition-colors duration-1000" />
          
          {/* The actual brand logo without any surrounding translucent box */}
          <div className="relative w-full">
            <OfficialOceanLogo />
          </div>
        </motion.div>

        {/* Copy Section and Dashboard Section Side by Side */}
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Side: Brand Storytelling */}
          <motion.div 
            style={{ x: textParallaxX, y: textParallaxY }}
            className="flex flex-col items-start space-y-8 w-full text-left"
          >
            {/* Typography Copy */}
            <div className="space-y-4 max-w-xl text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-[38px] font-display font-semibold text-text-primary leading-[1.2] tracking-tight text-left"
              >
                The Operating System for Trusted Carbon Markets.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-text-muted leading-relaxed font-sans font-light text-left"
              >
                OCEAN is the end-to-end carbon intelligence platform to develop, verify, trade and retire high-integrity carbon credits at global scale. Developed by **GreenASHA** to bridge capital to verified ecological developer assets.
              </motion.p>
            </div>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={stage >= 4 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.0, delay: 0.45 }}
              className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5 w-full text-[9px] font-mono tracking-wider text-[#9CB3C2]/75 uppercase"
            >
              <div className="flex items-center gap-2">
                <CustomCheckIcon />
                <span>AI-Powered Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <CustomCheckIcon />
                <span>Blockchain Secured Ledger</span>
              </div>
              <div className="flex items-center gap-2">
                <CustomCheckIcon />
                <span>Global Compliance Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CustomCheckIcon />
                <span>High Integrity Assured</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Product Preview */}
          <motion.div
            style={{ x: dashboardParallaxX, y: dashboardParallaxY }}
            className="w-full flex justify-center lg:justify-end"
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={stage >= 4 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[340px] dashboard-integrated rounded-xl overflow-hidden aspect-[4/5] p-5 flex flex-col justify-between"
          >
            {/* Embedded glow overlay */}
            <div className="dashboard-cyan-reflection" />

            {/* Mission control telemetry header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[9px] text-[#F5F7F8] tracking-widest uppercase font-bold">OCEAN_DASHBOARD_LIVE</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2CB587] animate-pulse" />
                <span className="font-mono text-[8px] text-[#2CB587] tracking-wider font-bold">STATE: ACTIVE</span>
              </div>
            </div>

            {/* Console logs output */}
            <div className="relative z-10 bg-[#02090e]/60 rounded border border-white/5 p-2.5 font-mono text-[8px] leading-relaxed text-[#9CB3C2]/85 space-y-1 my-3">
              <div className="flex items-start gap-1">
                <span className="text-[#8DE5E9]">[SYS]</span>
                <span>Initializing registry sync protocol...</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-[#8DE5E9]">[SYS]</span>
                <span>Connection established with Puro.earth catalog node #18</span>
              </div>
            </div>

            {/* Metrics block */}
            <div className="relative z-10 grid grid-cols-2 gap-4 border-b border-white/10 pb-4 mb-3 font-mono">
              <div className="space-y-1">
                <span className="text-[8px] text-[#9CB3C2]/45 uppercase tracking-widest block font-bold">TOTAL PROJECTS</span>
                <span className="text-[#F5F7F8] font-bold text-xs">48 Active</span>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-[#9CB3C2]/45 uppercase tracking-widest block font-bold">VALUE TRADED</span>
                <span className="text-[#F5F7F8] font-bold text-xs">$18.7M</span>
              </div>
            </div>

            {/* Wave Line Chart Trend */}
            <div className="relative z-10 flex flex-col justify-between flex-grow space-y-2 mb-4 font-mono">
              <div className="flex justify-between items-baseline text-[8px]">
                <span className="text-[#9CB3C2]/50 tracking-wider font-bold uppercase">CREDIT GENERATION TREND</span>
                <span className="text-[#8DE5E9] font-bold text-[10px]">1.24M tCO₂e</span>
              </div>
              <div className="h-16 w-full bg-[#02090e]/40 rounded border border-white/5 p-2 overflow-hidden flex flex-col justify-end relative">
                {/* Beautiful precise wave SVG line chart to match screenshot */}
                <svg className="absolute inset-0 w-full h-full p-2 stroke-[#8DE5E9] fill-none" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0 25 Q12 12, 24 24 T48 16 T72 28 T90 4 T100 8" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M0 25 Q12 12, 24 24 T48 16 T72 28 T90 4 T100 8 L100 30 L0 30 Z" fill="rgba(141, 229, 233, 0.04)" stroke="none" />
                </svg>
                
                <div className="relative z-10 flex justify-between text-[6px] text-[#9CB3C2]/35">
                  <span>01 DEC</span>
                  <span>31 DEC</span>
                </div>
              </div>
            </div>

            {/* Footer secure Ledger tag */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[8px] text-[#9CB3C2]/50 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8DE5E9]/60" />
                <span className="font-bold uppercase tracking-wider">LEDGER SYNC</span>
              </div>
              <span>LAST SYNC: 11:38:22 UTC</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>

      {/* 4. LAYER: SUBTLE CORAL SILHOUETTES FRAMING BOTTOM CORNERS (10% Atmosphere) */}
      <motion.div 
        style={{ x: coralParallaxX }}
        initial={{ opacity: 0 }}
        animate={stage >= 2 ? { opacity: 0.12 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 left-0 w-36 md:w-56 h-auto pointer-events-none z-10 select-none"
      >
        <svg className="w-full h-auto fill-[#030c11]" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
          {/* Rocks and sea grass silhouettes */}
          <path d="M 0 150 L 0 60 Q 25 50 40 80 T 90 90 T 130 110 T 200 150 Z" />
          <path d="M 12 110 Q 30 30 45 40 Q 30 70 20 120" stroke="#030c11" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 35 125 Q 50 20 70 50 Q 55 80 40 135" stroke="#030c11" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 68 135 Q 85 45 105 60 Q 90 90 75 140" stroke="#030c11" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      <motion.div 
        style={{ x: useTransform(coralParallaxX, (v) => -v) }}
        initial={{ opacity: 0 }}
        animate={stage >= 2 ? { opacity: 0.12 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 right-0 w-36 md:w-56 h-auto pointer-events-none z-10 select-none"
      >
        <svg className="w-full h-auto fill-[#030c11]" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
          {/* Coral fan structure silhouettes */}
          <path d="M 200 150 L 200 70 Q 185 80 170 65 T 120 100 T 80 110 T 0 150 Z" />
          {/* Branching coral */}
          <path d="M 175 130 C 150 90, 130 70, 132 50 C 134 30, 115 45, 125 75 C 135 105, 155 120, 160 140" stroke="#030c11" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 150 140 C 120 100, 100 80, 95 62 C 90 44, 75 58, 88 88 C 101 118, 125 130, 130 145" stroke="#030c11" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 125 145 C 95 110, 75 90, 68 78 C 61 66, 52 75, 60 95 C 68 115, 85 130, 90 150" stroke="#030c11" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

    </div>
  );
};

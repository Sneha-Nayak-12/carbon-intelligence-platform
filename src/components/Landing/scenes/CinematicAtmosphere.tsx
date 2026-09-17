import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CinematicAtmosphereProps {
  className?: string;
}

export const CinematicAtmosphere: React.FC<CinematicAtmosphereProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Particles: mix of small sharp bioluminescent motes + soft out-of-focus glowing bokeh orbs
  const particles = useRef<
    Array<{
      x: number; // 0 to 1
      y: number; // 0 to 1
      size: number;
      speedY: number;
      speedX: number;
      pulseSpeed: number;
      phase: number;
      baseAlpha: number;
      isBokeh: boolean;
      color: string;
    }>
  >([]);

  useEffect(() => {
    // 32 small sharp suspended motes + 6 soft glowing out-of-focus bokeh orbs (matching reference image)
    if (particles.current.length === 0) {
      // 1. Small sharp motes
      for (let i = 0; i < 34; i++) {
        const isCyan = Math.random() > 0.35;
        particles.current.push({
          x: Math.random(),
          y: Math.random(),
          size: 0.8 + Math.random() * 1.8,
          speedY: 0.00015 + Math.random() * 0.0003,
          speedX: (Math.random() - 0.5) * 0.00015,
          pulseSpeed: 0.7 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          baseAlpha: 0.2 + Math.random() * 0.45,
          isBokeh: false,
          color: isCyan ? '72, 225, 235' : '44, 205, 145',
        });
      }

      // 2. Soft glowing bokeh motes (subtle, large, slow, matching reference image)
      const bokehPositions = [
        { x: 0.78, y: 0.32, size: 10, alpha: 0.28 },
        { x: 0.85, y: 0.42, size: 7, alpha: 0.20 },
        { x: 0.12, y: 0.82, size: 8, alpha: 0.30 },
        { x: 0.25, y: 0.60, size: 6, alpha: 0.18 },
        { x: 0.88, y: 0.88, size: 9, alpha: 0.22 },
        { x: 0.68, y: 0.75, size: 6, alpha: 0.25 },
        { x: 0.38, y: 0.28, size: 7, alpha: 0.16 },
      ];

      bokehPositions.forEach((bp) => {
        particles.current.push({
          x: bp.x,
          y: bp.y,
          size: bp.size,
          speedY: 0.00008 + Math.random() * 0.0001,
          speedX: (Math.random() - 0.5) * 0.00008,
          pulseSpeed: 0.5 + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
          baseAlpha: bp.alpha,
          isBokeh: true,
          color: '69, 223, 236',
        });
      });
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let startTime = Date.now();

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const elapsed = (Date.now() - startTime) * 0.001;

      ctx.clearRect(0, 0, w, h);

      particles.current.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(elapsed * 0.4 + p.phase) * p.speedX;

        // Wrap around smoothly
        if (p.y < -0.05) p.y = 1.05;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        const px = p.x * w;
        const py = p.y * h;
        const pulse = 0.75 + 0.25 * Math.sin(elapsed * p.pulseSpeed + p.phase);
        const alpha = p.baseAlpha * pulse;

        if (p.isBokeh) {
          // Soft out-of-focus bokeh circle
          const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 2);
          grad.addColorStop(0, `rgba(${p.color}, ${alpha * 0.9})`);
          grad.addColorStop(0.4, `rgba(${p.color}, ${alpha * 0.4})`);
          grad.addColorStop(1, `rgba(${p.color}, 0)`);

          ctx.beginPath();
          ctx.arc(px, py, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          // Small crisp particulate speck
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
          ctx.fill();
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 1. Base Deep Ocean Background: Dark Navy/Teal (Fades in 0s–1s) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#031520] via-[#021019] to-[#01080E]"
      />

      {/* 2. Upper Region Ocean Surface Radiance (Fades in 1s–2s) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.0, ease: "easeOut" }}
        className="absolute inset-0"
      >
        {/* Top water surface light pool */}
        <div 
          className="absolute top-0 left-0 right-0 h-[40vh] opacity-75"
          style={{
            background: 'radial-gradient(ellipse at 50% -10%, rgba(56, 189, 212, 0.45) 0%, rgba(31, 110, 131, 0.22) 40%, transparent 75%)',
          }}
        />

        {/* Central ambient cyan glow behind title card */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(45, 140, 160, 0.25) 0%, rgba(7, 30, 42, 0.45) 50%, transparent 80%)',
          }}
        />

        {/* Realistic Volumetric Sunbeams Streaming from Top (God Rays) */}
        <svg
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1900px] h-[100vh] opacity-45 mix-blend-screen pointer-events-none"
          viewBox="0 0 1600 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="god-ray-center" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#7EE6EE" stopOpacity="0.55" />
              <stop offset="25%" stopColor="#3DBFCB" stopOpacity="0.30" />
              <stop offset="65%" stopColor="#1C6E80" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#021019" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="god-ray-left" x1="0%" y1="0%" x2="45%" y2="100%">
              <stop offset="0%" stopColor="#67DFE8" stopOpacity="0.48" />
              <stop offset="35%" stopColor="#25A0AF" stopOpacity="0.20" />
              <stop offset="75%" stopColor="#0D4B59" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#021019" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="god-ray-right" x1="100%" y1="0%" x2="55%" y2="100%">
              <stop offset="0%" stopColor="#5BE1D5" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#22A49B" stopOpacity="0.18" />
              <stop offset="75%" stopColor="#0D4B59" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#021019" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Diverging volumetric light shafts */}
          <g className="animate-[pulse_12s_ease-in-out_infinite]">
            {/* Primary center shafts */}
            <polygon points="740,0 860,0 980,950 680,950" fill="url(#god-ray-center)" />
            <polygon points="790,0 890,0 1120,900 820,900" fill="url(#god-ray-center)" opacity="0.8" />
            <polygon points="690,0 770,0 790,920 540,920" fill="url(#god-ray-center)" opacity="0.75" />

            {/* Angled shafts from left */}
            <polygon points="500,0 620,0 750,850 420,850" fill="url(#god-ray-left)" />
            <polygon points="360,0 450,0 520,750 280,750" fill="url(#god-ray-left)" opacity="0.65" />

            {/* Angled shafts from right */}
            <polygon points="980,0 1100,0 1280,850 960,850" fill="url(#god-ray-right)" />
            <polygon points="1120,0 1210,0 1420,780 1180,780" fill="url(#god-ray-right)" opacity="0.6" />
          </g>
        </svg>

        {/* Top water surface undulating caustic ripples */}
        <div 
          className="absolute top-0 left-0 right-0 h-28 opacity-30 mix-blend-screen"
          style={{
            background: 'repeating-linear-gradient(90deg, rgba(141, 229, 233, 0.08) 0px, transparent 40px, rgba(141, 229, 233, 0.12) 80px, transparent 120px)',
          }}
        />
      </motion.div>

      {/* 3. Deep Bottom Reef / Seabed Out-of-Focus Silhouette (Adds cinematic depth of field) */}
      <div className="absolute bottom-0 left-0 right-0 h-[32vh] pointer-events-none opacity-60">
        {/* Soft out-of-focus ocean floor silhouettes with deep teal backlighting */}
        <svg
          className="w-full h-full fill-[#01070B] blur-[2px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep seabed contours */}
          <path
            d="M 0 320 L 0 160 Q 180 210, 360 140 T 720 180 T 1080 120 T 1440 170 L 1440 320 Z"
            fill="#010609"
          />
          {/* Foreground out-of-focus reef mounds */}
          <path
            d="M 0 320 L 0 220 Q 220 170, 480 240 T 960 210 T 1440 230 L 1440 320 Z"
            fill="#000407"
            opacity="0.85"
          />
        </svg>

        {/* Subtle deep blue abyss gradient fading upward from the floor */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#01060A] via-[#01080E]/60 to-transparent" />
      </div>

      {/* 4. Sparse Bioluminescent Particles & Soft Bokeh Canvas (Fades in 2s–3s) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </motion.div>

      {/* 5. Subtle Vignette for Cinematic Focus */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(1,6,10,0.65)_95%)] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};

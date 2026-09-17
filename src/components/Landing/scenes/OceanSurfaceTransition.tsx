import React, { useEffect, useRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface OceanSurfaceTransitionProps {
  progress: MotionValue<number>; // 0 to 1 throughout the transition section
}

export const OceanSurfaceTransition: React.FC<OceanSurfaceTransitionProps> = ({ progress }) => {
  const bubbleCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Waterline crossing transform:
  // Starts below viewport (110%) at progress ~0.15, rises up to cross viewport at ~0.55, disappears past top (-20%) by ~0.75
  const waterlineY = useTransform(progress, [0.15, 0.40, 0.65, 0.80], ['120%', '60%', '5%', '-25%']);
  
  // Refraction / distortion shimmer opacity: peaks when waterline crosses camera (~0.45 to 0.70)
  const refractionOpacity = useTransform(progress, [0.35, 0.52, 0.68, 0.82], [0, 0.85, 0.60, 0]);

  // Submerged depth background opacity (deep oceanic blue): emerges as camera dives beneath surface
  const underwaterHazeOpacity = useTransform(progress, [0.38, 0.62, 0.85], [0, 0.75, 1.0]);

  // Light shaft flare intensity during dive
  const lightShaftIntensity = useTransform(progress, [0.35, 0.58, 0.80], [0.2, 0.9, 0.4]);

  // Bubble layer opacity (bursts right at the surface crossing)
  const bubbleLayerOpacity = useTransform(progress, [0.42, 0.55, 0.78, 0.90], [0, 1.0, 0.7, 0]);

  // Camera depth zoom / forward translation feel
  const cameraScale = useTransform(progress, [0.15, 0.60, 0.90], [1.0, 1.08, 1.02]);

  // Water surface approach tilt / perspective
  const surfacePerspectiveY = useTransform(progress, [0.15, 0.45, 0.70], [80, 0, -40]);

  // Bubble particle physics
  const bubbles = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      wobbleSpeed: number;
      wobblePhase: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    // 70 realistic diving air bubbles
    if (bubbles.current.length === 0) {
      for (let i = 0; i < 70; i++) {
        bubbles.current.push({
          x: Math.random(),
          y: 0.3 + Math.random() * 0.9,
          size: 1.2 + Math.random() * 4.5,
          speedY: 0.003 + Math.random() * 0.007,
          speedX: (Math.random() - 0.5) * 0.002,
          wobbleSpeed: 2.0 + Math.random() * 3.0,
          wobblePhase: Math.random() * Math.PI * 2,
          opacity: 0.25 + Math.random() * 0.65,
        });
      }
    }

    const canvas = bubbleCanvasRef.current;
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

    let start = Date.now();

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const now = (Date.now() - start) * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Only draw if within bubble activation window
      const p = progress.get();
      if (p > 0.38 && p < 0.92) {
        bubbles.current.forEach((b) => {
          b.y -= b.speedY;
          b.x += Math.sin(now * b.wobbleSpeed + b.wobblePhase) * b.speedX;

          if (b.y < -0.1) {
            b.y = 1.05 + Math.random() * 0.2;
            b.x = Math.random();
          }

          const bx = b.x * w;
          const by = b.y * h;

          ctx.save();
          ctx.beginPath();
          ctx.arc(bx, by, b.size, 0, Math.PI * 2);

          // Bubble rim highlight
          const grad = ctx.createRadialGradient(
            bx - b.size * 0.3,
            by - b.size * 0.3,
            b.size * 0.1,
            bx,
            by,
            b.size
          );
          grad.addColorStop(0, `rgba(240, 253, 255, ${b.opacity * 0.9})`);
          grad.addColorStop(0.6, `rgba(141, 229, 233, ${b.opacity * 0.4})`);
          grad.addColorStop(1, `rgba(31, 110, 131, ${b.opacity * 0.15})`);

          ctx.fillStyle = grad;
          ctx.strokeStyle = `rgba(141, 229, 233, ${b.opacity * 0.6})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
          ctx.fill();
          ctx.restore();
        });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [progress]);

  return (
    <motion.div
      style={{ scale: cameraScale }}
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-25"
    >
      {/* 1. APPROACHING OCEAN SURFACE: Realistic water surface plane coming up from below */}
      <motion.div
        style={{ y: surfacePerspectiveY }}
        className="absolute inset-0 flex flex-col justify-end"
      >
        <motion.div
          style={{ y: waterlineY }}
          className="relative w-full h-[150vh] -mb-[50vh]"
        >
          {/* Waterline Crest Wave Line (Undulating organic boundary with foam highlights) */}
          <div className="absolute top-0 left-0 right-0 h-24 -mt-12 overflow-visible">
            <svg
              className="w-[200%] max-w-none h-full animate-[currents-drift_8s_ease-in-out_infinite] opacity-90"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="water-surface-cut" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8DE5E9" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#2CB587" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#041622" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Primary undulating crest curve */}
              <path
                d="M 0 50 Q 150 15, 300 50 T 600 50 T 900 50 T 1200 50 L 1200 120 L 0 120 Z"
                fill="url(#water-surface-cut)"
              />
              {/* Secondary offset translucent crest */}
              <path
                d="M 0 65 Q 180 30, 360 65 T 720 65 T 1080 65 T 1200 65 L 1200 120 L 0 120 Z"
                fill="#1F6E83"
                fillOpacity="0.45"
              />
              {/* Crisp illuminated foam / surface highlight edge */}
              <path
                d="M 0 50 Q 150 15, 300 50 T 600 50 T 900 50 T 1200 50"
                stroke="#F5F7F8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Submerged body of water beneath the rising waterline */}
          <div className="w-full h-full bg-gradient-to-b from-[#06202C]/90 via-[#03131D]/95 to-[#020B11]" />
        </motion.div>
      </motion.div>

      {/* 2. REFRACTION / WATER DISTORTION SHIMMER (Peaks as waterline crosses camera) */}
      <motion.div
        style={{ opacity: refractionOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-[#8DE5E9]/15 via-[#2CB587]/10 to-transparent backdrop-blur-[2px] mix-blend-screen"
      >
        {/* Shimmering caustic wave overlay */}
        <div 
          className="w-full h-full opacity-35"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(141, 229, 233, 0.4) 0%, transparent 60%)`,
          }}
        />
      </motion.div>

      {/* 3. LIGHT SCATTERING & INTENSIFIED SUN BEAMS */}
      <motion.div
        style={{ opacity: lightShaftIntensity }}
        className="absolute inset-0 mix-blend-screen"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(141,229,233,0.35)_0%,rgba(44,181,135,0.15)_45%,transparent_75%)]" />
      </motion.div>

      {/* 4. AIR BUBBLE EMERGENCE LAYER */}
      <motion.div
        style={{ opacity: bubbleLayerOpacity }}
        className="absolute inset-0"
      >
        <canvas ref={bubbleCanvasRef} className="w-full h-full block" />
      </motion.div>

      {/* 5. DEEP SUBMERGED UNDERWATER HAZE (Transitions into Scene 2 atmosphere) */}
      <motion.div
        style={{ opacity: underwaterHazeOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#041622]/40 to-[#020B11]/80 pointer-events-none"
      />
    </motion.div>
  );
};

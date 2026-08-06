import React, { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

interface OceanCurrentCanvasProps {
  revealStage: number; // Reveal sequence state
  scrollYProgress: MotionValue<number>; // Global scroll progress
}

export const OceanCurrentCanvas: React.FC<OceanCurrentCanvasProps> = ({
  revealStage,
  scrollYProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const startTime = useRef<number>(Date.now());

  // Mouse parallax tracking (handled locally to prevent React re-renders)
  const targetMouseX = useRef(0);
  const targetMouseY = useRef(0);
  const currentMouseX = useRef(0);
  const currentMouseY = useRef(0);

  // Carbon current particles definition
  const PARTICLE_COUNT = 180;
  const particles = useRef<Array<{
    t: number;             // progress along Bezier spline (0 to 1)
    offsetAngle: number;   // angle around spline for 3D ribbon effect
    offsetRadius: number;  // radius from center of spline path
    speed: number;         // progress increment speed
    size: number;          // particle size
    pulseSpeed: number;    // brightness pulsing frequency
    pulsePhase: number;    // brightness pulsing offset
    color: string;         // rgb values
  }>>([]);

  // Water break transition bubbles definition
  const BUBBLE_COUNT = 65;
  const bubbles = useRef<Array<{
    x: number;      // percentage of canvas width (0 to 1)
    y: number;      // percentage of canvas height (0 to 1.5)
    size: number;   // radius
    speedY: number; // rise speed
    speedX: number; // wobble speed
    opacity: number;
  }>>([]);

  // Initialize Carbon Current particles once
  if (particles.current.length === 0) {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isCyan = Math.random() > 0.35;
      particles.current.push({
        t: Math.random(),
        offsetAngle: Math.random() * Math.PI * 2,
        offsetRadius: 6 + Math.random() * 24,
        speed: 0.0004 + Math.random() * 0.0007,
        size: 0.7 + Math.random() * 1.7,
        pulseSpeed: 1.2 + Math.random() * 1.8,
        pulsePhase: Math.random() * Math.PI * 2,
        color: isCyan ? '141, 229, 233' : '44, 181, 135',
      });
    }
  }

  // Initialize transition bubbles once
  if (bubbles.current.length === 0) {
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.current.push({
        x: Math.random(),
        y: 1.0 + Math.random() * 0.5,
        size: 1.0 + Math.random() * 3.0,
        speedY: 0.01 + Math.random() * 0.015,
        speedX: -0.0015 + Math.random() * 0.003,
        opacity: 0.1 + Math.random() * 0.35,
      });
    }
  }

  // Dynamic spline coordinates based on scroll progress (V2 carbon journey)
  const getSplinePoint = (t: number, width: number, height: number, scrollVal: number) => {
    // Flow starts near waterline center-left, snakes down around dashboard on right
    let p0 = { x: width * 0.36, y: height * 0.26 };
    let p1 = { x: width * 0.58, y: height * 0.40 };
    let p2 = { x: width * 0.68, y: height * 0.65 };
    let p3 = { x: width * 0.82, y: height + 30 };

    // Morph ribbon path slightly downstream
    if (scrollVal > 0.25) {
      const morphFactor = Math.min(1.0, (scrollVal - 0.25) * 2.5);
      p1.x = p1.x * (1 - morphFactor) + (width * 0.65) * morphFactor;
      p2.x = p2.x * (1 - morphFactor) + (width * 0.75) * morphFactor;
      p3.x = p3.x * (1 - morphFactor) + (width * 0.35) * morphFactor;
    }

    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;

    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;

    const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
    const y = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;

    return { x, y };
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX.current = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY.current = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    startTime.current = Date.now();

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      const now = Date.now();

      // 1. Fetch scroll progression
      const scrollVal = scrollYProgress.get();

      // 2. Interpolate mouse coordinates
      currentMouseX.current += (targetMouseX.current - currentMouseX.current) * 0.05;
      currentMouseY.current += (targetMouseY.current - currentMouseY.current) * 0.05;
      const pxX = currentMouseX.current;
      const pxY = currentMouseY.current;

      // 3. Clear canvas (keep it transparent to let photographic bg show through)
      ctx.clearRect(0, 0, width, height);

      // --- STAGE 1: Transition Bubbles ---
      const inTransition = scrollVal > 0.04 && scrollVal < 0.23;
      if (inTransition) {
        ctx.save();
        ctx.translate(pxX * -10, pxY * -10);

        bubbles.current.forEach((b) => {
          b.y -= b.speedY;
          b.x += b.speedX;

          if (b.y < -0.1) {
            b.y = 1.1 + Math.random() * 0.2;
            b.x = Math.random();
          }

          const bubbleX = b.x * width;
          const bubbleY = b.y * height;
          const fadeOpacity = Math.min(b.opacity, (scrollVal - 0.04) * 8) * Math.min(1.0, (0.23 - scrollVal) * 8);

          ctx.beginPath();
          ctx.arc(bubbleX, bubbleY, b.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(141, 229, 233, ${fadeOpacity * 0.65})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(141, 229, 233, 0.2)';
          ctx.fill();
        });
        ctx.restore();
      }

      // --- STAGE 2: Spline Flowing Carbon Current ---
      let currentOpacity = 0;
      if (scrollVal > 0.15) {
        currentOpacity = Math.min(1.0, (scrollVal - 0.15) * 8.0);
      } else if (revealStage >= 2) {
        // High opacity right from reveal load, matching user's screenshot
        currentOpacity = 0.9;
      }

      if (currentOpacity > 0) {
        ctx.save();
        ctx.translate(pxX * -14, pxY * -14); // Parallax offset

        particles.current.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1.0) {
            p.t = 0;
            p.offsetRadius = 6 + Math.random() * 24;
          }

          // Compute spline point coordinates
          const pt = getSplinePoint(p.t, width, height, scrollVal);

          // Spiral rotation around spline center
          const spiralAngle = p.offsetAngle + (now * 0.001 * p.speed * 12);
          const px = pt.x + Math.cos(spiralAngle) * p.offsetRadius;
          const py = pt.y + Math.sin(spiralAngle) * p.offsetRadius;

          // Opacity calculations
          let pOpacity = currentOpacity;
          if (p.t < 0.12) {
            pOpacity *= (p.t / 0.12);
          }
          if (p.t > 0.85) {
            pOpacity *= Math.max(0, 1.0 - (p.t - 0.85) / 0.15); // Dissolve at bottom
          }

          const pulse = 0.72 + Math.sin(now * 0.0018 * p.pulseSpeed + p.pulsePhase) * 0.28;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${pOpacity * pulse})`;

          if (p.size > 1.2) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${p.color}, ${pOpacity * 0.45})`;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fill();
        });
        ctx.restore();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [revealStage, scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none block z-0"
    />
  );
};

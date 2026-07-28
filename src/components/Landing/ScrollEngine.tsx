import React, { createContext, useContext, useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollEngineContextType {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollYProgress: MotionValue<number>;
  textOpacity: MotionValue<number>;
  textY: MotionValue<number>;
  overlayOpacity: MotionValue<number>;
  showMainHeader: MotionValue<number>;
}

const ScrollEngineContext = createContext<ScrollEngineContextType | null>(null);

export const ScrollEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textOpacity = useTransform(scrollYProgress, [0.0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.0, 0.25], [0, -45]);
  const overlayOpacity = useTransform(scrollYProgress, [0.45, 0.78], [0, 1]);
  const showMainHeader = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);

  return (
    <ScrollEngineContext.Provider value={{
      containerRef,
      scrollYProgress,
      textOpacity,
      textY,
      overlayOpacity,
      showMainHeader
    }}>
      {children}
    </ScrollEngineContext.Provider>
  );
};

export const useScrollEngine = () => {
  const context = useContext(ScrollEngineContext);
  if (!context) {
    throw new Error("useScrollEngine must be used within ScrollEngineProvider");
  }
  return context;
};

import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollEngine } from './ScrollEngine';

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const { scrollYProgress } = useScrollEngine();
  const initialZ = 9.0;
  const initialY = 0.5;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Handheld organic camera breathing/drift
    const driftZ = Math.sin(time * 0.25) * 0.08;
    const driftY = Math.cos(time * 0.3) * 0.04;
    const driftX = Math.sin(time * 0.15) * 0.05;

    let camZ = initialZ - driftZ;
    let camY = initialY + driftY;
    let camX = driftX;
    
    if (time > 5) {
      const pushFactor = Math.min((time - 5) / 7, 1.0);
      camZ -= pushFactor * 0.8;
    }
    
    const scrollVal = scrollYProgress ? scrollYProgress.get() : 0;
    if (scrollVal > 0) {
      const scrollEase = Math.min(scrollVal * 2.0, 1.0);
      
      camZ = THREE.MathUtils.lerp(camZ, 3.8, scrollEase);
      camY = THREE.MathUtils.lerp(camY, -2.6, scrollEase);
      
      camera.position.set(camX, camY, camZ);
      camera.lookAt(0, -3.2, 0);
    } else {
      camera.position.set(camX, camY, camZ);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

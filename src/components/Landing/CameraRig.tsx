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
      let targetZ = camZ;
      let targetY = camY;
      let targetX = camX;
      let lookAtY = -3.2;
      
      if (scrollVal < 0.35) {
        const t = scrollVal / 0.35;
        const ease = Math.sin(t * Math.PI / 2);
        targetZ = THREE.MathUtils.lerp(camZ, 5.5, ease);
        targetY = THREE.MathUtils.lerp(camY, -4.5, ease);
        targetX = THREE.MathUtils.lerp(camX, -2.8, ease); // Shift Earth left to balance layout
        lookAtY = THREE.MathUtils.lerp(0, -4.2, ease);
      } else if (scrollVal < 0.70) {
        targetZ = 5.5;
        targetY = -4.5;
        targetX = -2.8;
        lookAtY = -4.2;
      } else {
        const t = Math.min((scrollVal - 0.70) / 0.30, 1.0);
        const ease = Math.sin(t * Math.PI / 2);
        targetZ = THREE.MathUtils.lerp(5.5, 7.5, ease);
        targetY = THREE.MathUtils.lerp(-4.5, -2.0, ease);
        targetX = THREE.MathUtils.lerp(-2.8, 0, ease);
        lookAtY = THREE.MathUtils.lerp(-4.2, -2.0, ease);
      }
      
      camera.position.set(targetX, targetY, targetZ);
      camera.lookAt(0, lookAtY, 0);
    } else {
      camera.position.set(camX, camY, camZ);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface CO2MoleculeProps {
  position: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
  isPulse?: boolean;
  type?: 'CO2' | 'CH4' | 'CO' | 'Cluster';
  cursorRef: React.RefObject<THREE.Vector3>;
}

export const CO2Molecule: React.FC<CO2MoleculeProps> = ({ 
  position, 
  scale, 
  rotationSpeed, 
  isPulse = false, 
  type = 'CO2',
  cursorRef 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const velocity = useRef(
    new THREE.Vector3(
      (Math.random() - 0.5) * 0.002,
      (Math.random() - 0.5) * 0.002,
      (Math.random() - 0.5) * 0.002
    )
  );
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);

  const trailRefs = useRef<THREE.Mesh[]>([]);
  const trailHistory = useRef<THREE.Vector3[]>([]);
  const trailLimit = 12;

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    if (isPulse) {
      velocity.current.x += (Math.random() - 0.5) * 0.0006;
      velocity.current.y += (Math.random() - 0.5) * 0.0006;
      velocity.current.z += (Math.random() - 0.5) * 0.0006;
      velocity.current.clampLength(0.001, 0.012);

      groupRef.current.position.add(velocity.current);

      const heartbeat = 1.0 + 0.15 * Math.pow(Math.sin(time * (Math.PI * 2 / 3.6)), 4);
      groupRef.current.scale.set(scale * heartbeat, scale * heartbeat, scale * heartbeat);

      const toEarth = new THREE.Vector3(0, -5.2, -2.5).sub(groupRef.current.position).normalize();
      groupRef.current.position.addScaledVector(toEarth, 0.0015);

      const currentPos = groupRef.current.position.clone();
      trailHistory.current.unshift(currentPos);
      if (trailHistory.current.length > trailLimit) {
        trailHistory.current.pop();
      }

      trailRefs.current.forEach((mesh, index) => {
        if (!mesh) return;
        const pos = trailHistory.current[index];
        if (pos) {
          mesh.position.copy(pos);
          const trailScale = (1 - index / trailLimit) * 0.045 * scale;
          mesh.scale.set(trailScale, trailScale, trailScale);
          if (mesh.material) {
            (mesh.material as THREE.MeshBasicMaterial).opacity = (1 - index / trailLimit) * 0.45;
          }
          mesh.visible = true;
        } else {
          mesh.visible = false;
        }
      });
    } else {
      // Free floating drift physics
      velocity.current.x += (Math.random() - 0.5) * 0.0004;
      velocity.current.y += (Math.random() - 0.5) * 0.0004;
      velocity.current.z += (Math.random() - 0.5) * 0.0004;
      velocity.current.clampLength(0.0006, 0.005);

      groupRef.current.position.add(velocity.current);

      // Loosely anchor to neighborhood
      const distFromStart = groupRef.current.position.distanceTo(basePos);
      if (distFromStart > 4.0) {
        const toStart = new THREE.Vector3().subVectors(basePos, groupRef.current.position).normalize();
        velocity.current.addScaledVector(toStart, 0.0008);
      }

      // Repel from cursor on hover
      if (cursorRef && cursorRef.current) {
        const p = groupRef.current.position;
        const c = cursorRef.current;
        const d = p.distanceTo(c);
        if (d < 2.5) {
          const toCursor = new THREE.Vector3().subVectors(c, p).normalize();
          const perp = new THREE.Vector3(-toCursor.y, toCursor.x, 0).normalize();
          groupRef.current.position.addScaledVector(toCursor, -0.001);
          groupRef.current.position.addScaledVector(perp, 0.003 * (1.0 - d / 2.5));
        }
      }
    }

    // Gentle atmospheric rotation
    groupRef.current.rotation.x += rotationSpeed[0] * 0.5;
    groupRef.current.rotation.y += rotationSpeed[1] * 0.5;
    groupRef.current.rotation.z += rotationSpeed[2] * 0.5;
  });

  // Premium physically based materials matching reference renderings
  const carbonMat = useMemo(() => isPulse 
    ? new THREE.MeshBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.95 })
    : new THREE.MeshPhysicalMaterial({
        color: '#0fa36d', // Rich emerald-green core glass
        roughness: 0.02,
        metalness: 0.1,
        transparent: true,
        opacity: 0.82,
        transmission: 0.65, // Volumetric glass
        ior: 1.55,
        thickness: 1.6,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02
      })
  , [isPulse]);

  const oxygenMat = useMemo(() => isPulse
    ? new THREE.MeshBasicMaterial({ color: '#34d399', transparent: true, opacity: 0.85 })
    : new THREE.MeshPhysicalMaterial({
        color: '#ffffff', // High-fidelity clear transparent glass
        roughness: 0.01,
        metalness: 0.05,
        transparent: true,
        opacity: 0.26,
        transmission: 0.98, // Crystal clear glass refractions
        ior: 1.52,
        thickness: 1.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01
      })
  , [isPulse]);

  const bondMat = useMemo(() => isPulse
    ? new THREE.MeshBasicMaterial({ color: '#059669', transparent: true, opacity: 0.55 })
    : new THREE.MeshStandardMaterial({
        color: '#cccccc', // Silver metallic connector rods
        roughness: 0.1,
        metalness: 0.96
      })
  , [isPulse]);

  return (
    <group>
      {isPulse && Array.from({ length: trailLimit }).map((_, index) => (
        <mesh
          key={index}
          ref={(el) => { if (el) trailRefs.current[index] = el; }}
          visible={false}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0} />
        </mesh>
      ))}

      <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
        
        {/* Projected 'C' letter badge on the central carbon core */}
        {!isPulse && scale > 0.08 && (
          <Html distanceFactor={4.5} position={[0, 0, 0]} transform pointerEvents="none">
            <div 
              className="text-[11px] font-sans font-black text-white select-none opacity-85"
              style={{ textShadow: '0 0 3px rgba(255, 255, 255, 0.8)' }}
            >
              c
            </div>
          </Html>
        )}

        {/* Render geometries according to type */}
        {type === 'CO' && (
          <>
            {/* Central Carbon */}
            <mesh>
              <sphereGeometry args={[0.3, 32, 32]} />
              <primitive object={carbonMat} />
            </mesh>
            {/* Bond */}
            <mesh position={[0, 0.225, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.45, 12]} />
              <primitive object={bondMat} />
            </mesh>
            {/* Outer Oxygen */}
            <mesh position={[0, 0.45, 0]}>
              <sphereGeometry args={[0.22, 24, 24]} />
              <primitive object={oxygenMat} />
            </mesh>
          </>
        )}

        {type === 'CO2' && (
          <>
            {/* Central Carbon */}
            <mesh>
              <sphereGeometry args={[0.28, 32, 32]} />
              <primitive object={carbonMat} />
            </mesh>
            {/* Bond 1 */}
            <mesh position={[0, 0.225, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.45, 12]} />
              <primitive object={bondMat} />
            </mesh>
            {/* Bond 2 */}
            <mesh position={[0, -0.225, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.45, 12]} />
              <primitive object={bondMat} />
            </mesh>
            {/* Outer Oxygen 1 */}
            <mesh position={[0, 0.45, 0]}>
              <sphereGeometry args={[0.2, 24, 24]} />
              <primitive object={oxygenMat} />
            </mesh>
            {/* Outer Oxygen 2 */}
            <mesh position={[0, -0.45, 0]}>
              <sphereGeometry args={[0.2, 24, 24]} />
              <primitive object={oxygenMat} />
            </mesh>
          </>
        )}

        {type === 'CH4' && (
          <>
            {/* Central Carbon */}
            <mesh>
              <sphereGeometry args={[0.32, 32, 32]} />
              <primitive object={carbonMat} />
            </mesh>
            {/* Tetrahedral Bonds */}
            <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.6, 12]} />
              <primitive object={bondMat} />
            </mesh>
            <mesh position={[0.28, -0.1, 0]} rotation={[0, 0, -Math.PI / 3]}>
              <cylinderGeometry args={[0.018, 0.018, 0.6, 12]} />
              <primitive object={bondMat} />
            </mesh>
            <mesh position={[-0.14, -0.1, 0.24]} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.6, 12]} />
              <primitive object={bondMat} />
            </mesh>
            <mesh position={[-0.14, -0.1, -0.24]} rotation={[-Math.PI / 5, -Math.PI / 4, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.6, 12]} />
              <primitive object={bondMat} />
            </mesh>

            {/* Outer Glass Spheres */}
            <mesh position={[0, 0.6, 0]}>
              <sphereGeometry args={[0.18, 24, 24]} />
              <primitive object={oxygenMat} />
            </mesh>
            <mesh position={[0.56, -0.2, 0]}>
              <sphereGeometry args={[0.18, 24, 24]} />
              <primitive object={oxygenMat} />
            </mesh>
            <mesh position={[-0.28, -0.2, 0.49]}>
              <sphereGeometry args={[0.18, 24, 24]} />
              <primitive object={oxygenMat} />
            </mesh>
            <mesh position={[-0.28, -0.2, -0.49]}>
              <sphereGeometry args={[0.18, 24, 24]} />
              <primitive object={oxygenMat} />
            </mesh>
          </>
        )}

        {type === 'Cluster' && (
          <>
            {/* A small carbon soot cluster */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.26, 24, 24]} />
              <primitive object={carbonMat} />
            </mesh>
            <mesh position={[0.2, 0.1, -0.1]}>
              <sphereGeometry args={[0.22, 24, 24]} />
              <primitive object={carbonMat} />
            </mesh>
            <mesh position={[-0.15, -0.15, 0.1]}>
              <sphereGeometry args={[0.24, 24, 24]} />
              <primitive object={carbonMat} />
            </mesh>
            <mesh position={[-0.1, 0.2, 0.15]}>
              <sphereGeometry args={[0.2, 24, 24]} />
              <primitive object={carbonMat} />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
};

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CO2MoleculeProps {
  position: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
  isPulse?: boolean;
  cursorRef: React.RefObject<THREE.Vector3>;
}

export const CO2Molecule: React.FC<CO2MoleculeProps> = ({ 
  position, 
  scale, 
  rotationSpeed, 
  isPulse = false, 
  cursorRef 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const velocity = useRef(
    new THREE.Vector3(
      (Math.random() - 0.5) * 0.003,
      (Math.random() - 0.5) * 0.003,
      (Math.random() - 0.5) * 0.003
    )
  );
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);

  const trailRefs = useRef<THREE.Mesh[]>([]);
  const trailHistory = useRef<THREE.Vector3[]>([]);
  const trailLimit = 12;

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    velocity.current.x += (Math.random() - 0.5) * 0.0006;
    velocity.current.y += (Math.random() - 0.5) * 0.0006;
    velocity.current.z += (Math.random() - 0.5) * 0.0006;
    velocity.current.clampLength(0.001, 0.012);

    groupRef.current.position.add(velocity.current);

    groupRef.current.rotation.x += rotationSpeed[0];
    groupRef.current.rotation.y += rotationSpeed[1];

    if (cursorRef && cursorRef.current) {
      const p = groupRef.current.position;
      const c = cursorRef.current;
      const d = p.distanceTo(c);
      if (d < 2.5) {
        const toCursor = new THREE.Vector3().subVectors(c, p).normalize();
        const perp = new THREE.Vector3(-toCursor.y, toCursor.x, 0).normalize();
        
        groupRef.current.position.addScaledVector(toCursor, 0.001);
        groupRef.current.position.addScaledVector(perp, 0.004 * (1.0 - d / 2.5));
      }
    }

    if (isPulse) {
      const heartbeat = 1.0 + 0.15 * Math.pow(Math.sin(time * (Math.PI * 2 / 3.6)), 4);
      groupRef.current.scale.set(scale * heartbeat, scale * heartbeat, scale * heartbeat);

      const toEarth = new THREE.Vector3(0, -4.5, -1).sub(groupRef.current.position).normalize();
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
      const distFromStart = groupRef.current.position.distanceTo(basePos);
      if (distFromStart > 4) {
        const dir = new THREE.Vector3().subVectors(basePos, groupRef.current.position).normalize();
        velocity.current.addScaledVector(dir, 0.001);
      }
    }
  });

  const carbonMat = useMemo(() => isPulse 
    ? new THREE.MeshBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.95 })
    : new THREE.MeshPhysicalMaterial({ color: '#10221a', roughness: 0.35, metalness: 0.15, transparent: true, opacity: 0.75 })
  , [isPulse]);

  const oxygenMat = useMemo(() => isPulse
    ? new THREE.MeshBasicMaterial({ color: '#34d399', transparent: true, opacity: 0.85 })
    : new THREE.MeshPhysicalMaterial({ color: '#25352c', roughness: 0.45, metalness: 0.05, transparent: true, opacity: 0.65 })
  , [isPulse]);

  const bondMat = useMemo(() => isPulse
    ? new THREE.MeshBasicMaterial({ color: '#059669', transparent: true, opacity: 0.55 })
    : new THREE.MeshBasicMaterial({ color: '#152b20', transparent: true, opacity: 0.35 })
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
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <primitive object={carbonMat} />
        </mesh>

        <mesh position={[-0.7, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <primitive object={oxygenMat} />
        </mesh>

        <mesh position={[0.7, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <primitive object={oxygenMat} />
        </mesh>

        <mesh position={[-0.35, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <primitive object={bondMat} />
        </mesh>
        <mesh position={[-0.35, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <primitive object={bondMat} />
        </mesh>

        <mesh position={[0.35, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <primitive object={bondMat} />
        </mesh>
        <mesh position={[0.35, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <primitive object={bondMat} />
        </mesh>
      </group>
    </group>
  );
};

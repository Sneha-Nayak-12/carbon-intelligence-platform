import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
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
  isPulse = false, 
  cursorRef 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const velocity = useRef(
    new THREE.Vector3(
      (Math.random() - 0.5) * 0.001,
      (Math.random() - 0.5) * 0.001,
      (Math.random() - 0.5) * 0.001
    )
  );
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);

  const trailRefs = useRef<THREE.Mesh[]>([]);
  const trailHistory = useRef<THREE.Vector3[]>([]);
  const trailLimit = 12;

  const co2Shader = useMemo(() => {
    return {
      uniforms: {
        uColor: { value: new THREE.Color(isPulse ? '#FAF8F6' : '#8A9092') }, // Warm white for pulse, neutral desaturated slate for ambient
        uOpacity: { value: isPulse ? 0.80 : 0.04 }, // Faint for background layers
        uTime: { value: 0 },
        uIsPulse: { value: isPulse ? 1.0 : 0.0 },
        uSeed: { value: Math.random() * 50.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uTime;
        uniform float uIsPulse;
        uniform float uSeed;

        void main() {
          vec2 center = vUv - 0.5;
          float dist = length(center);
          
          if (uIsPulse > 0.5) {
            // Pulse: soft glowing point light
            float glow = smoothstep(0.5, 0.0, dist);
            float core = smoothstep(0.15, 0.0, dist) * 1.5;
            float finalIntensity = glow * 0.4 + core * 0.6;
            if (finalIntensity <= 0.0) discard;
            gl_FragColor = vec4(uColor, finalIntensity * uOpacity);
          } else {
            // Background Environmental Graphic: Soft blurred core + very thin concentric editorial ring
            float core = smoothstep(0.35, 0.0, dist) * 0.65;
            
            // Faint measurement ring (representing atmosphere data indexing)
            float ringWidth = 0.008;
            float ringRadius = 0.38;
            float ring = smoothstep(ringWidth, 0.0, abs(dist - ringRadius)) * 0.35;
            
            float finalIntensity = core + ring;
            
            // Subtle slow wave inside
            float wave = sin(dist * 15.0 - uTime * 0.3 + uSeed) * 0.5 + 0.5;
            finalIntensity *= mix(0.8, 1.0, wave);
            
            if (finalIntensity <= 0.05) discard;
            gl_FragColor = vec4(uColor, finalIntensity * uOpacity);
          }
        }
      `
    };
  }, [isPulse]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Billboarding: make the flat plane face the camera
    groupRef.current.quaternion.copy(state.camera.quaternion);

    // Update time uniform in shader
    const mainMesh = groupRef.current.children[0] as THREE.Mesh;
    if (mainMesh && mainMesh.material) {
      const mat = mainMesh.material as THREE.ShaderMaterial;
      if (mat.uniforms && mat.uniforms.uTime) {
        mat.uniforms.uTime.value = time;
      }
    }

    if (isPulse) {
      velocity.current.x += (Math.random() - 0.5) * 0.0004;
      velocity.current.y += (Math.random() - 0.5) * 0.0004;
      velocity.current.z += (Math.random() - 0.5) * 0.0004;
      velocity.current.clampLength(0.001, 0.010);

      groupRef.current.position.add(velocity.current);

      const heartbeat = 1.0 + 0.12 * Math.pow(Math.sin(time * (Math.PI * 2 / 3.6)), 4);
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
          mesh.quaternion.copy(state.camera.quaternion);
          const trailScale = (1 - index / trailLimit) * 0.6 * scale;
          mesh.scale.set(trailScale, trailScale, trailScale);
          if (mesh.material) {
            (mesh.material as THREE.ShaderMaterial).uniforms.uOpacity.value = (1 - index / trailLimit) * 0.35;
          }
          mesh.visible = true;
        } else {
          mesh.visible = false;
        }
      });
    } else {
      // Free floating drift physics - slowed down by 40%
      velocity.current.x += (Math.random() - 0.5) * 0.0002;
      velocity.current.y += (Math.random() - 0.5) * 0.0002;
      velocity.current.z += (Math.random() - 0.5) * 0.0002;
      velocity.current.clampLength(0.0003, 0.003);

      groupRef.current.position.add(velocity.current);

      // Loosely anchor to neighborhood
      const distFromStart = groupRef.current.position.distanceTo(basePos);
      if (distFromStart > 4.0) {
        const toStart = new THREE.Vector3().subVectors(basePos, groupRef.current.position).normalize();
        velocity.current.addScaledVector(toStart, 0.0005);
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
          groupRef.current.position.addScaledVector(perp, 0.002 * (1.0 - d / 2.5));
        }
      }
    }
  });

  return (
    <group>
      {/* Pulse Trail */}
      {isPulse && Array.from({ length: trailLimit }).map((_, index) => (
        <mesh
          key={index}
          ref={(el) => { if (el) trailRefs.current[index] = el; }}
          visible={false}
        >
          <planeGeometry args={[1.5, 1.5]} />
          <shaderMaterial
            uniforms={{
              uColor: { value: new THREE.Color('#FAF8F6') },
              uOpacity: { value: 0.15 },
              uTime: { value: 0 },
              uIsPulse: { value: 1.0 },
              uSeed: { value: 0 }
            }}
            vertexShader={co2Shader.vertexShader}
            fragmentShader={co2Shader.fragmentShader}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Main billboard mesh representation */}
      <group ref={groupRef} position={position} scale={[scale * 1.5, scale * 1.5, scale * 1.5]}>
        <mesh>
          <planeGeometry args={[1.5, 1.5]} />
          <shaderMaterial
            uniforms={co2Shader.uniforms}
            vertexShader={co2Shader.vertexShader}
            fragmentShader={co2Shader.fragmentShader}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
};

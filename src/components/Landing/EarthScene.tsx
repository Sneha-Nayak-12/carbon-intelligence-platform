import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollEngine } from './ScrollEngine';
import { CO2Molecule } from './CarbonPulse';

// Continent coordinates for procedural vector mapping on canvas
const continents: [number, number][][] = [
  [[-168, 65], [-120, 70], [-80, 75], [-60, 60], [-55, 48], [-80, 25], [-99, 15], [-105, 20], [-110, 8], [-100, 5], [-85, 8], [-80, 9], [-82, 14], [-90, 16], [-100, 25], [-125, 48], [-125, 60], [-165, 60]],
  [[-80, 12], [-72, 10], [-60, 5], [-35, -5], [-40, -20], [-60, -40], [-72, -55], [-75, -50], [-70, -40], [-80, -20], [-82, -5]],
  [[-17, 15], [-5, 35], [10, 37], [32, 31], [34, 27], [43, 12], [51, 11], [46, -20], [34, -34], [18, -34], [10, -10], [8, 5]],
  [[-10, 36], [0, 40], [12, 40], [25, 35], [35, 31], [40, 15], [50, 15], [60, 25], [75, 10], [95, 10], [100, 1], [105, 5], [120, 15], [130, -5], [140, 10], [140, 35], [120, 40], [105, 20], [110, 35], [120, 37], [130, 35], [140, 50], [170, 60], [170, 70], [140, 75], [100, 75], [60, 70], [30, 70], [10, 60], [0, 65], [-5, 60], [-10, 40]],
  [[68, 23], [73, 8], [79, 10], [88, 22]],
  [[98, 20], [103, 1], [108, 10], [105, 20]],
  [[113, -22], [113, -15], [130, -10], [143, -10], [153, -25], [150, -38], [140, -38], [115, -34]],
  [[-60, 60], [-40, 60], [-30, 70], [-35, 83], [-70, 75]],
  [[130, 30], [140, 35], [145, 45], [140, 40]],
  [[43, -25], [50, -15], [47, -12], [43, -20]]
];

const createEarthTextures = () => {
  const mapCanvas = document.createElement('canvas');
  mapCanvas.width = 2048;
  mapCanvas.height = 1024;
  const mapCtx = mapCanvas.getContext('2d')!;

  const lightsCanvas = document.createElement('canvas');
  lightsCanvas.width = 2048;
  lightsCanvas.height = 1024;
  const lightsCtx = lightsCanvas.getContext('2d')!;

  mapCtx.fillStyle = '#05090e';
  mapCtx.fillRect(0, 0, 2048, 1024);

  lightsCtx.fillStyle = '#000000';
  lightsCtx.fillRect(0, 0, 2048, 1024);

  const mapX = (lon: number) => ((lon + 180) / 360) * 2048;
  const mapY = (lat: number) => ((90 - lat) / 180) * 1024;

  continents.forEach(poly => {
    mapCtx.beginPath();
    mapCtx.moveTo(mapX(poly[0][0]), mapY(poly[0][1]));
    for (let i = 1; i < poly.length; i++) {
      mapCtx.lineTo(mapX(poly[i][0]), mapY(poly[i][1]));
    }
    mapCtx.closePath();

    mapCtx.fillStyle = '#0c1612';
    mapCtx.fill();

    mapCtx.lineWidth = 1;
    mapCtx.strokeStyle = '#12241d';
    mapCtx.stroke();
  });

  const isPointInPolygon = (x: number, y: number, vs: [number, number][]) => {
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  for (let i = 0; i < 2000; i++) {
    const lon = Math.random() * 360 - 180;
    const lat = Math.random() * 180 - 90;

    let inContinent = false;
    for (const poly of continents) {
      if (isPointInPolygon(lon, lat, poly)) {
        inContinent = true;
        break;
      }
    }

    if (inContinent) {
      const px = mapX(lon);
      const py = mapY(lat);
      const brightness = Math.random();
      const radius = Math.random() * 1.3 + 0.3;

      lightsCtx.beginPath();
      lightsCtx.arc(px, py, radius, 0, Math.PI * 2);
      lightsCtx.fillStyle = `rgba(248, 180, 50, ${brightness})`;
      lightsCtx.fill();
    }
  }

  const mapTex = new THREE.CanvasTexture(mapCanvas);
  const lightsTex = new THREE.CanvasTexture(lightsCanvas);
  return { mapTex, lightsTex };
};

export const NebulaBackground: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 3; ++i) {
          v += a * noise(p);
          p = p * 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv - 0.5;
        vec3 bg = vec3(0.01, 0.02, 0.03);
        
        vec2 nUv = uv * 3.2;
        nUv.x += uTime * 0.015;
        nUv.y += sin(uTime * 0.007) * 0.12;
        
        float nVal = fbm(nUv + fbm(nUv));
        
        vec3 greenNebula = vec3(0.01, 0.07, 0.045) * smoothstep(0.3, 0.75, nVal);
        vec3 blueNebula = vec3(0.005, 0.025, 0.07) * smoothstep(0.15, 0.85, nVal);
        
        vec3 finalColor = bg + greenNebula + blueNebula;
        float dist = length(uv);
        finalColor *= smoothstep(1.3, 0.45, dist);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  }), []);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms && mat.uniforms.uTime) {
        mat.uniforms.uTime.value = state.clock.getElapsedTime();
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[30, 20]} />
      <shaderMaterial
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export const StarField: React.FC = () => {
  const count = 350;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 35;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 25;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15 - 4;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
};

export const EarthGlobe: React.FC<{ 
  earthTextures: { mapTex: THREE.CanvasTexture; lightsTex: THREE.CanvasTexture };
}> = ({ earthTextures }) => {
  const { scrollYProgress } = useScrollEngine();
  const globeRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const lightDirection = useMemo(() => new THREE.Vector3(3.5, 1.8, 3.5).normalize(), []);
  const glowColor = useMemo(() => new THREE.Color('#0a271c'), []);

  const earthShader = useMemo(() => ({
    uniforms: {
      uMap: { value: earthTextures.mapTex },
      uLights: { value: earthTextures.lightsTex },
      uLightDirection: { value: lightDirection },
      uTime: { value: 0 },
      uScroll: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform sampler2D uMap;
      uniform sampler2D uLights;
      uniform vec3 uLightDirection;
      uniform float uTime;
      uniform float uScroll;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(uLightDirection);
        
        float diff = dot(normal, lightDir);
        float dayFactor = smoothstep(-0.15, 0.15, diff);
        
        vec3 dayColor = texture2D(uMap, vUv).rgb;
        
        // Hope emerges: land vegetation blooms emerald as we scroll to the end
        vec3 vegetationBloom = vec3(0.04, 0.18, 0.09) * dayColor.g; // enrich based on existing green channel density
        dayColor = mix(dayColor, dayColor + vegetationBloom, uScroll);
        
        vec3 nightColor = texture2D(uLights, vUv).rgb;
        
        float flicker = 1.0 + 0.18 * sin(uTime * 4.0 + vUv.x * 250.0) * cos(uTime * 3.2 + vUv.y * 180.0);
        nightColor *= flicker * 1.6;
        
        vec3 finalColor = mix(nightColor, dayColor, dayFactor);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  }), [earthTextures, lightDirection]);

  const cloudsShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uLightDirection: { value: lightDirection }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float uTime;
      uniform vec3 uLightDirection;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.2 + vec2(50.0);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(uLightDirection);
        
        float diff = dot(normal, lightDir);
        float dayFactor = smoothstep(-0.25, 0.25, diff);
        
        vec2 uv = vUv * 4.5;
        uv.x -= uTime * 0.007;
        uv.y += sin(uTime * 0.002) * 0.04;
        
        float d = fbm(uv + fbm(uv + uTime * 0.012));
        float density = smoothstep(0.40, 0.76, d);
        
        vec3 litCloudColor = vec3(0.95, 0.96, 0.98) * mix(0.04, 1.0, dayFactor);
        gl_FragColor = vec4(litCloudColor, density * 0.50);
      }
    `
  }), [lightDirection]);

  const atmosphereShader = useMemo(() => ({
    uniforms: {
      uGlowColor: { value: glowColor },
      uScroll: { value: 0 }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      uniform vec3 uGlowColor;
      uniform float uScroll;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        
        // Atmosphere glows slightly brighter and cleaner as scroll progress increases
        float baseIntensity = 3.8 - (uScroll * 0.4);
        float intensity = pow(1.0 - max(0.0, dot(normal, viewDir)), baseIntensity);
        
        // Slight color shift towards a clean emerald/teal atmosphere glow
        vec3 atmosphereTint = mix(uGlowColor, vec3(0.06, 0.32, 0.20), uScroll);
        gl_FragColor = vec4(atmosphereTint, intensity * (0.80 + uScroll * 0.12));
      }
    `
  }), [glowColor]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const scrollVal = scrollYProgress ? scrollYProgress.get() : 0;

    if (globeRef.current && globeRef.current.material) {
      globeRef.current.rotation.y = elapsed * 0.004;
      const mat = globeRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms) {
        if (mat.uniforms.uTime) mat.uniforms.uTime.value = elapsed;
        if (mat.uniforms.uScroll) mat.uniforms.uScroll.value = scrollVal;
      }
    }
    if (cloudsRef.current && cloudsRef.current.material) {
      cloudsRef.current.rotation.y = elapsed * 0.006;
      const mat = cloudsRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms && mat.uniforms.uTime) {
        mat.uniforms.uTime.value = elapsed;
      }
    }
    if (atmosphereRef.current && atmosphereRef.current.material) {
      const mat = atmosphereRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms && mat.uniforms.uScroll) {
        mat.uniforms.uScroll.value = scrollVal;
      }
    }
  });

  return (
    <group position={[0, -5.2, -2.5]} scale={[5, 5, 5]}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          uniforms={earthShader.uniforms}
          vertexShader={earthShader.vertexShader}
          fragmentShader={earthShader.fragmentShader}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={[1.012, 1.012, 1.012]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          uniforms={cloudsShader.uniforms}
          vertexShader={cloudsShader.vertexShader}
          fragmentShader={cloudsShader.fragmentShader}
          transparent
          depthWrite={false}
        />
      </mesh>

      <mesh ref={atmosphereRef} scale={[1.026, 1.026, 1.026]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          uniforms={atmosphereShader.uniforms}
          vertexShader={atmosphereShader.vertexShader}
          fragmentShader={atmosphereShader.fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export const EarthSceneContent: React.FC<{
  cursorRef: React.RefObject<THREE.Vector3>;
}> = ({ cursorRef }) => {
  const earthTextures = useMemo(() => createEarthTextures(), []);

  const moleculesData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 22; i++) {
      data.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 8.5,
          Math.random() * 4.0 - 0.5,
          (Math.random() - 0.5) * 3.5
        ] as [number, number, number],
        scale: Math.random() * 0.11 + 0.07,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008
        ] as [number, number, number]
      });
    }
    return data;
  }, []);

  return (
    <>
      <EarthGlobe earthTextures={earthTextures} />

      {moleculesData.map((m) => (
        <CO2Molecule
          key={m.id}
          position={m.position}
          scale={m.scale}
          rotationSpeed={m.rotationSpeed}
          cursorRef={cursorRef}
        />
      ))}

      <CO2Molecule
        isPulse
        position={[0.2, 2.1, 0.5]}
        scale={0.20}
        rotationSpeed={[0.003, 0.005, 0.001]}
        cursorRef={cursorRef}
      />
    </>
  );
};

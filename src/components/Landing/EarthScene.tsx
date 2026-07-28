import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollEngine } from './ScrollEngine';
import { CO2Molecule } from './CarbonPulse';

// High-fidelity continent coordinates for a highly realistic world map
const continents: [number, number][][] = [
  // North America
  [[-168, 65], [-160, 68], [-150, 70], [-130, 72], [-110, 72], [-90, 74], [-70, 75], [-60, 70], [-50, 60], [-55, 48], [-60, 42], [-70, 42], [-80, 25], [-98, 16], [-105, 20], [-118, 30], [-125, 40], [-125, 55], [-140, 60], [-165, 60]],
  // South America
  [[-80, 12], [-74, 10], [-65, 8], [-55, -2], [-40, -6], [-35, -7], [-40, -22], [-62, -42], [-72, -56], [-76, -53], [-72, -40], [-80, -20], [-82, -5]],
  // Eurasia (Europe + Asia with high-detail Red Sea, Arabia, India, and Indochina)
  [
    [-10, 36], [-8, 43], [0, 46], [5, 49], [10, 58], [20, 65], [30, 70], // Europe / Siberia
    [40, 73], [60, 73], [80, 75], [100, 77], [120, 75], [140, 72], [160, 70], [180, 65], // North Coast
    [175, 60], [160, 52], [142, 43], [142, 40], [128, 37], [124, 30], [120, 22], // East Asia / China
    [109, 15], [105, 8], [101, 2], [105, 8], [109, 15], // Indochina / SE Asia
    [96, 16], [90, 22], [88, 22], [80, 13], [79, 9], [72, 8], [72, 20], [68, 24], // India / Sri Lanka / West Coast
    [62, 25], [58, 25], [52, 28], [48, 30], // Persian Gulf
    [60, 23], [58, 15], [50, 12], [45, 12], [35, 15], [35, 28], // Arabian Peninsula
    [33, 26], [32, 20], [35, 15], // Red Sea Coast
    [30, 31], [35, 31], [40, 40], [30, 45], [20, 40], [10, 42], [0, 40] // Mediterranean
  ],
  // Africa (High detail coastlines, Horn of Africa)
  [
    [-17, 32], [-15, 34], [-5, 36], [5, 36], [10, 37], [20, 32], [30, 31], [32, 30],
    [32, 25], [36, 20], [43, 12], // Red Sea Coast
    [51, 11], [50, 5], [45, 0], // Horn of Africa
    [40, -10], [38, -20], [34, -30], [30, -34], // East Coast
    [20, -35], [18, -34], // South Tip
    [12, -25], [8, -15], [4, -5], [4, 5], [9, 5], [8, 10], [-10, 10], [-15, 15], [-17, 20], [-17, 32] // West Coast
  ],
  // Australia (Realistic mainland)
  [[113, -22], [113, -15], [122, -12], [131, -11], [137, -13], [144, -13], [152, -24], [150, -37], [138, -38], [115, -34]],
  // Greenland
  [[-60, 60], [-45, 60], [-30, 68], [-35, 83], [-70, 76]],
  // Madagascar
  [[43, -25], [49, -15], [51, -12], [47, -12], [43, -20]],
  // Great Britain / Ireland
  [[-10, 50], [-8, 55], [-5, 58], [-2, 55], [-2, 50]]
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

  mapCtx.fillStyle = '#030816'; // Dark blue ocean base
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

    mapCtx.fillStyle = '#10b981'; // Green land mask
    mapCtx.fill();
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

  // Generate realistic cities cluster points on land
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
  const clouds1Ref = useRef<THREE.Mesh>(null);
  const clouds2Ref = useRef<THREE.Mesh>(null);
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
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform sampler2D uMap;
      uniform sampler2D uLights;
      uniform vec3 uLightDirection;
      uniform float uTime;
      uniform float uScroll;

      // Fractional Brownian Motion for procedural landmass detailing
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.1, 0.1, 0.1));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      
      float noise(vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f*f*(3.0-2.0*f);
        
        return mix(mix(mix(hash(p+vec3(0,0,0)), hash(p+vec3(1,0,0)),f.x),
                       mix(hash(p+vec3(0,1,0)), hash(p+vec3(1,1,0)),f.x),f.y),
                   mix(mix(hash(p+vec3(0,0,1)), hash(p+vec3(1,0,1)),f.x),
                       mix(hash(p+vec3(0,1,1)), hash(p+vec3(1,1,1)),f.x),f.y),f.z);
      }

      float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = p * 2.5;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(uLightDirection);
        
        float diff = dot(normal, lightDir);
        float dayFactor = smoothstep(-0.15, 0.15, diff);
        
        // High-fidelity displacement mapping for organic shorelines
        vec3 displacementDir = vec3(vPosition.x * 2.0, vPosition.y * 2.0, vPosition.z * 2.0);
        float shorelineDetail = fbm(displacementDir * 5.0) * 0.012;
        vec2 warpedUv = vUv + vec2(shorelineDetail, shorelineDetail * 0.5);
        
        // Lookup mask
        vec4 texColor = texture2D(uMap, warpedUv);
        float landValue = texColor.g;
        bool isLand = landValue > 0.4;
        
        vec3 dayColor;
        
        // Perturb normals to simulate mountain height relief and casting shadows
        vec3 perturbedNormal = normal;
        if (isLand) {
          float bump = fbm(vPosition * 22.0) * 0.15;
          perturbedNormal = normalize(normal + vec3(bump, bump * 0.5, bump * 0.5));
        }
        float shadowDiff = max(dot(perturbedNormal, lightDir), 0.0);
        
        if (isLand) {
          // NASA style terrain transitions (forest green, grassland yellow, rocky brown, Sahara sand)
          float n = fbm(vPosition * 7.5);
          
          vec3 forest = vec3(0.03, 0.15, 0.07); // Muted satellite vegetation
          vec3 desert = vec3(0.50, 0.42, 0.30); // Sandy dust desert
          vec3 earth = vec3(0.22, 0.15, 0.09);  // Mountain soil
          
          dayColor = mix(forest, earth, n);
          dayColor = mix(dayColor, desert, smoothstep(0.52, 0.78, n));
          
          // Apply sand beach border along shorelines
          if (landValue < 0.48) {
            vec3 beachColor = vec3(0.48, 0.43, 0.34);
            dayColor = mix(beachColor, dayColor, smoothstep(0.40, 0.48, landValue));
          }
          
          // Relieve shadow highlights
          dayColor *= 0.75 + 0.3 * shadowDiff;
          
          // Green vegetation bloom timeline
          float bloomFactor = smoothstep(0.5, 1.0, uScroll);
          vec3 vegetationBloom = vec3(0.01, 0.32, 0.10) * n;
          dayColor = mix(dayColor, dayColor + vegetationBloom, bloomFactor);
        } else {
          // Ocean depth mapping (shallow coastline turquoise shelves vs deep ocean trenches)
          float depthFactor = fbm(vPosition * 5.0);
          vec3 deepOcean = vec3(0.010, 0.035, 0.12);
          vec3 shallowShelf = vec3(0.035, 0.14, 0.20);
          
          vec3 oceanBase = mix(shallowShelf, deepOcean, smoothstep(0.18, 0.55, depthFactor));
          
          // Specular sunlight reflection on water surface
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          vec3 halfDir = normalize(lightDir + viewDir);
          float spec = pow(max(dot(normal, halfDir), 0.0), 45.0);
          vec3 specularColor = vec3(0.68, 0.85, 1.0) * spec * 0.52;
          
          dayColor = oceanBase + specularColor;
        }
        
        vec3 nightColor = texture2D(uLights, warpedUv).rgb;
        
        // Scene 4 (Exchange): Small city light highlights appear and flicker
        float highlightsFactor = smoothstep(0.35, 0.70, uScroll);
        float flicker = 1.0 + 0.25 * sin(uTime * 5.0 + vUv.x * 300.0) * cos(uTime * 3.8 + vUv.y * 220.0);
        nightColor *= flicker * mix(0.8, 2.5, highlightsFactor);
        
        // Soft red-orange Rayleigh scattering sunrise glow on terminator
        float termGlowWidth = 0.09;
        float termBorder = 1.0 - abs(diff);
        vec3 sunriseGlow = vec3(0.90, 0.38, 0.06) * pow(termBorder, 9.0) * smoothstep(-termGlowWidth, termGlowWidth, diff);
        
        vec3 finalColor = mix(nightColor, dayColor, dayFactor) + sunriseGlow;
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
        uv.x -= uTime * 0.006;
        uv.y += sin(uTime * 0.002) * 0.03;
        
        float d = fbm(uv + fbm(uv + uTime * 0.01));
        float density = smoothstep(0.35, 0.72, d);
        
        vec3 litCloudColor = vec3(0.96, 0.97, 0.99) * mix(0.03, 1.0, dayFactor);
        gl_FragColor = vec4(litCloudColor, density * 0.58);
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
        
        // Premium scatter depth intensity
        float intensity = pow(1.0 - max(0.0, dot(normal, viewDir)), 4.5);
        
        // Restored gorgeous glowing emerald/green/teal atmosphere shell requested by user
        vec3 baseRimColor = vec3(0.04, 0.40, 0.20);   // Emerald green base
        vec3 healthyRimColor = vec3(0.08, 0.65, 0.35); // Bright rich emerald green-teal
        
        vec3 atmosphereTint = mix(baseRimColor, healthyRimColor, uScroll);
        
        gl_FragColor = vec4(atmosphereTint, intensity * 0.95);
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
    if (clouds1Ref.current && clouds1Ref.current.material) {
      clouds1Ref.current.rotation.y = elapsed * 0.005;
      const mat = clouds1Ref.current.material as THREE.ShaderMaterial;
      if (mat.uniforms && mat.uniforms.uTime) {
        mat.uniforms.uTime.value = elapsed;
      }
    }
    if (clouds2Ref.current && clouds2Ref.current.material) {
      clouds2Ref.current.rotation.y = -elapsed * 0.003; // Counter rotate for dual cloud parallax
      const mat = clouds2Ref.current.material as THREE.ShaderMaterial;
      if (mat.uniforms && mat.uniforms.uTime) {
        mat.uniforms.uTime.value = elapsed + 50.0;
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

      {/* Cloud Layer 1 */}
      <mesh ref={clouds1Ref} scale={[1.008, 1.008, 1.008]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          uniforms={cloudsShader.uniforms}
          vertexShader={cloudsShader.vertexShader}
          fragmentShader={cloudsShader.fragmentShader}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Cloud Layer 2 (Dual layer parallax) */}
      <mesh ref={clouds2Ref} scale={[1.016, 1.016, 1.016]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          uniforms={cloudsShader.uniforms}
          vertexShader={cloudsShader.vertexShader}
          fragmentShader={cloudsShader.fragmentShader}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere shell - Restored emerald green scatter */}
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

  // Increased molecule count to 160 for a rich, dense, high-fidelity atmosphere
  const moleculesData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 160; i++) {
      const rand = Math.random();
      const type = rand < 0.45 ? 'CO2' : rand < 0.75 ? 'CH4' : rand < 0.90 ? 'CO' : 'Cluster';
      
      data.push({
        id: i,
        type: type as 'CO2' | 'CH4' | 'CO' | 'Cluster',
        position: [
          (Math.random() - 0.5) * 18.0, // Expanded horizontal span
          (Math.random() * 22.0) - 13.0, // Expanded vertical span
          (Math.random() - 0.5) * 8.5
        ] as [number, number, number],
        scale: Math.random() * 0.45 + 0.15, // Broad scale variation for balanced 3D parallax
        rotationSpeed: [
          (Math.random() - 0.5) * 0.0015,
          (Math.random() - 0.5) * 0.0015,
          (Math.random() - 0.5) * 0.0015
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
          type={m.type}
          cursorRef={cursorRef}
        />
      ))}

      <CO2Molecule
        isPulse
        type="CO2"
        position={[0.2, 2.1, 0.5]}
        scale={0.18}
        rotationSpeed={[0.0008, 0.0012, 0.0004]}
        cursorRef={cursorRef}
      />
    </>
  );
};

# Technical Architecture: CarbonOS Interactive Documentary

This document outlines the decoupled, modular system architecture engineered to power the CarbonOS scroll-driven visual experience.

---

## 1. Directory Structure & Layout

The codebase separates text layouts, 3D WebGL scenes, shared motion states, and scroll math under a modular folder structure:

```
src/components/Landing/
├── NarrativeState.ts           # Configs, scene definitions, and active step bounds
├── MotionSystem.ts             # Framer-motion transitions, spring presets, and easings
├── ScrollEngine.tsx            # Controls viewport scroll bindings & progress math
├── CameraRig.tsx               # R3F Camera controller with breathing & drift logic
├── CarbonPulse.tsx             # Reusable Carbon Pulse (protagonist particle)
├── EarthScene.tsx              # R3F Canvas wrapper with background, earth, and molecules
├── UnifiedVisualProcessor.tsx  # Morphing physical card asset visualizer
│
└── scenes/                     # Left panel textual content chapters
    ├── HeroScene.tsx
    ├── CaptureScene.tsx
    ├── TransformationScene.tsx
    ├── VerificationScene.tsx
    ├── RegistryScene.tsx
    ├── MarketplaceScene.tsx
    ├── RetirementScene.tsx
    ├── EcosystemScene.tsx
    └── FinaleScene.tsx
```

---

## 2. Core Modules

### A. ScrollEngine (`ScrollEngine.tsx`)
- Houses the main `<ScrollEngineProvider>` context that tracks and publishes the window scroll progress.
- Computes `textOpacity`, `textY`, `overlayOpacity`, and sticky navigation header triggers.
- Prevents component hierarchy coupling by allowing any deeply nested component to consume the scroll state using the `useScrollEngine()` hook.

### B. NarrativeState & MotionSystem (`NarrativeState.ts`, `MotionSystem.ts`)
- Isolates pure data structure definitions from React rendering layouts.
- Prescribes spring values (`stiffness: 85, damping: 14`) and cubic bezier easings to maintain a heavy, deliberate cinematic rate throughout all card translations.

### C. CameraRig (`CameraRig.tsx`)
- Orchestrates multi-stage camera moves inside the React Three Fiber context.
- Simulates handheld-drone camera drift continuously using a combination of sine/cosine frequencies to give a living feel.
- Responds directly to `scrollYProgress` values, panning and pitching the camera lens seamlessly as the viewer scrolls.

### D. CarbonPulse (`CarbonPulse.tsx`)
- Exports standard molecules and the `isPulse` protagonist particle.
- Automatically handles heartbeat scale changes and coordinates with the visual processor coordinates.

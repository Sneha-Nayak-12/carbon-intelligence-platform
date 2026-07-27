# Component Hierarchy Map

This document illustrates the tree layout of the modular CarbonOS components.

---

## 1. Context & Layout Trees

```
Landing (src/pages/Landing.tsx)
└── ScrollEngineProvider (src/components/Landing/ScrollEngine.tsx)
    └── LandingContent (src/pages/Landing.tsx)
        ├── Floating Header (<motion.nav>)
        │
        ├── Scene 1 Section (<section>)
        │   ├── WebGL Canvas
        │   │   ├── StarField (src/components/Landing/EarthScene.tsx)
        │   │   ├── NebulaBackground (src/components/Landing/EarthScene.tsx)
        │   │   ├── EarthSceneContent (src/components/Landing/EarthScene.tsx)
        │   │   │   ├── EarthGlobe
        │   │   │   └── CO2Molecules & CarbonPulse (src/components/Landing/CarbonPulse.tsx)
        │   │   └── CameraRig (src/components/Landing/CameraRig.tsx)
        │   ├── Opening Header Overlay
        │   └── HeroScene (src/components/Landing/scenes/HeroScene.tsx)
        │
        ├── Scene 2 Section (<section>)
        │   ├── Left Column (Textual Chapters)
        │   │   ├── CaptureScene (src/components/Landing/scenes/CaptureScene.tsx)
        │   │   ├── TransformationScene (src/components/Landing/scenes/TransformationScene.tsx)
        │   │   ├── VerificationScene (src/components/Landing/scenes/VerificationScene.tsx)
        │   │   ├── RegistryScene (src/components/Landing/scenes/RegistryScene.tsx)
        │   │   ├── MarketplaceScene (src/components/Landing/scenes/MarketplaceScene.tsx)
        │   │   └── RetirementScene (src/components/Landing/scenes/RetirementScene.tsx)
        │   └── Right Sticky Column (UnifiedVisualProcessor)
        │
        ├── EcosystemScene (src/components/Landing/scenes/EcosystemScene.tsx)
        ├── Order Book Terminal Exchange (<section>)
        ├── FinaleScene (src/components/Landing/scenes/FinaleScene.tsx)
        ├── Concluding CTA Section (<section>)
        └── Editorial Footer (<footer>)
```

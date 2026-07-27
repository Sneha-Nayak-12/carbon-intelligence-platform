# Performance Optimization Guide

This document captures WebGL and React rendering optimizations built to maintain 60 FPS performance.

---

## 1. WebGL/Three.js Optimizations

### A. Material & Uniform Reuse
- Materials for `earthShader`, `cloudsShader`, and `atmosphereShader` are defined inside `useMemo` hooks.
- Inside R3F's `useFrame` frame loops, uniforms are mutated directly (e.g. `mat.uniforms.uScroll.value = scrollVal;`) rather than re-creating material instances or modifying React states, keeping heap allocation close to zero.

### B. Unused Vector Allocations
- Global constants like light directions (`new THREE.Vector3(3.5, 1.8, 3.5).normalize()`) are declared inside `useMemo` arrays at initialization to prevent garbage collection spikes during rendering.

### C. Molecule Mesh Ref Instancing
- Molecule coordinate displacements are mutated directly on the GPU thread by modifying mesh ref positions rather than triggering React component tree re-renders.

---

## 2. React Rendering Optimizations

### A. Context Segmentation
- Heavy values like cursor coordinates are stored in a mutable ref (`cursorRef.current`) rather than state variables, avoiding frame-by-frame layout re-calculations on scroll.
- Viewport changes are computed locally by `framer-motion` MotionValues (`textOpacity`, etc.), bypass React's standard reconciliation cycle entirely.

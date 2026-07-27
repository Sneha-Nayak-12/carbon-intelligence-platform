# Motion Language Specification

This document defines the physics, curves, and timings governing all movement in the CarbonOS visual experience.

---

## 1. Animation Categories

Every motion on the canvas belongs to one of these five narrative states:

### A. Discovery (Camera Drift, Starfields)
- *Objective*: Simulate environmental scale and breathing room.
- *Physics*: Low frequency sine waves, small scales. Loop periods > 12 seconds to avoid repetition.

### B. Transformation (Pyrolysis reactor, Dissolution)
- *Objective*: Highlight changes in physical state.
- *Physics*: Heat shimmers, coordinate displacements, particle disintegration. Easing is exponential.

### C. Trust (Verification stamp, Signature path)
- *Objective*: Imbue legal/scientific authority.
- *Physics*: Heavy bounce spring (`stiffness: 85, damping: 14`). Stroke dash animation drawing paths smoothly.

### D. Connection (Network links, Registry synchronization)
- *Objective*: Build global network credibility.
- *Physics*: Radial arcs, pulsing indicators, dashed line arrays moving outward.

### E. Completion (Lock snap, Ledger settlement)
- *Objective*: Conclude the action with finality.
- *Physics*: Sudden deceleration, snapping padlock brackets, static coordinate locking.

---

## 2. Easing & Timing Guide

- **Cinematic Ease-Out**: `[0.16, 1, 0.3, 1]` (recreates drone-like camera braking).
- **Core Spring**: `stiffness: 85`, `damping: 14` (recreates physical weight).
- **Micro Spring**: `stiffness: 220`, `damping: 20` (recreates stamp snap).

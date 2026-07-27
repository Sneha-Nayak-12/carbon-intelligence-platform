# Scene & Camera Coordinates Specification

This document details the positioning, camera focus, and step coordinates mapping across the scroll timelines.

---

## 1. Scroll Range Map

| Scroll progress | Scene / Chapter | Active Step | Camera Z | Camera Y | Camera Focus Y |
|:---|:---|:---|:---|:---|:---|
| 0% – 10% | Scene 1: Silence | - | 9.0 | 0.5 | 0.0 |
| 10% – 25% | Scene 1: Descent | - | 9.0 -> 8.2 | 0.5 -> -1.0 | 0.0 -> -2.0 |
| 25% – 35% | Scene 2: Capture | Step 0 | 3.8 | -2.6 | -3.2 |
| 35% – 45% | Scene 2: Telemetry | Step 1 | 3.8 | -2.6 | -3.2 |
| 45% – 55% | Scene 2: Verify | Step 2 | 3.8 | -2.6 | -3.2 |
| 55% – 65% | Scene 2: Registry | Step 3 | 3.8 | -2.6 | -3.2 |
| 65% – 75% | Scene 2: Market | Step 4 | 3.8 | -2.6 | -3.2 |
| 75% – 85% | Scene 2: Retire | Step 5 | 3.8 | -2.6 | -3.2 |
| 85% – 100% | Scene 3: OS Reveal | - | 3.8 | -2.6 | -3.2 |

---

## 2. Carbon Pulse Coordinate Registry

Hotspot coordinates inside the right-hand visual processor container card:

- **Step 0 (Pyrolysis)**: `x: 45, y: 0, scale: 1.25`
  - *Color*: Red/Orange glow (`rgba(239, 68, 68, 0.7)`) to represent high-heat conversion.
- **Step 1 (Telemetry)**: `x: 0, y: 0, scale: 1.0`
  - *Color*: Emerald green (`rgba(16, 185, 129, 0.5)`).
- **Step 2 (Verification)**:
  - *Pre-dissolve*: `x: 60, y: 35, scale: 0.9` (sitting on the signature line).
  - *Post-dissolve*: `x: -30, y: -20, scale: 0.95` (guiding the dissolution cloud).
- **Step 3 (Registry)**: `x: -80, y: -65, scale: 0.85` (at the ledger header).
- **Step 4 (Marketplace)**: `x: 80, y: -78, scale: 1.0` (in the verified asset badge).
- **Step 5 (Retirement)**: `x: 0, y: -10, scale: 0.75` (inside the padlock cylinder).

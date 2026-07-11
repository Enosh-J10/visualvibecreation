# Enosh Jaques Design System: Motion & Animation System

This document outlines the motion philosophy, spring parameters, durations, and accessibility overrides for the animation layer.

---

## 1. Motion Philosophy

Animations should make the website feel alive, but they must never slow it down or get in the way of reading content.

### Core Principles
- **Intentionality**: No element should animate simply because it can. Movement is used to direct the eye to important elements, show active states, and create a premium feel.
- **Predictability**: Page transitions and dropdown actions must be fast and immediate.
- **Readability**: Content text must not shift or slide while a user is trying to read it.
- **Performance**: Animations should use transform and opacity properties to avoid layout shifts or heavy paints.

---

## 2. Timing Tokens

We map durations to five standardized variables:
- **Instant (`0s`)**: Used for menus when prefers-reduced-motion is enabled.
- **Fast (`0.15s`)**: Buttons, hover borders, focus rings.
- **Standard (`0.3s`)**: Mobile navigation drawer transitions, card transformations.
- **Slow (`0.5s`)**: Text reveal animations, image load transitions.
- **Cinematic (`0.8s`)**: Root page transitions and layout transitions.

---

## 3. Transition Easings (Springs & Bezier Curves)

For Framer Motion and CSS, we utilize cubic-bezier curves matching high-end design languages:
- **Standard Ease**: `cubic-bezier(0.25, 0.1, 0.25, 1)`
  *Default smooth transition curve.*
- **Enter Ease (easeOutExpo)**: `cubic-bezier(0.16, 1, 0.3, 1)`
  *High initial speed tapering to a slow slide. Used for card load states and text reveals.*
- **Exit Ease (easeInExpo)**: `cubic-bezier(0.7, 0, 0.84, 0)`
  *Slow exit acceleration. Used for collapsing drawers and closed elements.*
- **Emphasised Ease**: `cubic-bezier(0.85, 0, 0.15, 1)`
  *Pronounced deceleration curve for major transitions.*

### Spring Constants (Framer Motion)
- **Fast/Bouncy Spring**: `stiffness: 300, damping: 20`
  *Used for magnetic buttons and cursor glow movements.*
- **Slow/Smooth Spring**: `stiffness: 200, damping: 30`
  *Used for parallax offsets and page scroll fade-ins.*

---

## 4. Reduced-Motion Specifications

Under system `prefers-reduced-motion: reduce`, we must ensure the interface scales down smoothly without losing clarity:

- **Ambient Loops**: The 6-second and 8-second background glows (`glow` and `float` translations) are stopped.
- **Mouse Tracking**: Cursor glow listeners are disabled. The cursor glow bubble remains static or is hidden.
- **Translations/Offsets**: Sliding text transitions (e.g. translation of $y: 110\%$) are changed to simple opacity fades ($y: 0$).
- **Scroll Hijacking**: No scroll interpolation modifiers are applied. Smooth scroll relies on the browser's default behavior.

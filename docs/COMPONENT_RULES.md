# Enosh Jaques Design System: Component Design Rules

This document outlines the design patterns, markup rules, interaction parameters, and accessibility standards for each component type in the Visual Vibe Creation design system.

---

## 1. Buttons & Touch Targets
* **Purpose**: Buttons are the primary method of action. They trigger form submissions, modal gates, navigation transitions, and external redirects.
* **Styling & Spacing**:
  * **Primary**: Solid Cyan background (`bg-accent-teal` / hover: `bg-accent-hover`). Text uses near-black (`text-bg-primary`) to maintain high contrast.
  * **Secondary**: Semi-transparent surface with subtle borders (`border-border-standard` / hover: `bg-white/[0.03]`).
  * **Touch Target**: Minimum interaction bounds of **44px height/width** (`touch-target` / `min-h-11`) must be enforced on all mobile layouts, including icon-only triggers.
* **Interaction**:
  * **Hover**: Subtle shift in background brightness.
  * **Active/Pressed**: Scale reduces slightly (`active:scale-[0.98]` / `duration-150`).
  * **Focus**: Displays an outline ring offset (`focus-visible:ring-2 focus-visible:ring-accent-teal`).

---

## 2. Card Structures
* **Purpose**: Cards group related items together, such as single projects, individual services, or specific journey milestones.
* **Styling**:
  * **Standard Card**: Flat dark charcoal container (`bg-bg-secondary`) with standard faint borders (`border-border-standard`).
  * **Interactive Card**: Standard card that shifts borders to Electric Teal (`hover:border-accent-teal/30`) and adds a soft background glow (`shadow-lg`).
  * **Glass Card**: Background uses transparency and blur (`backdrop-blur-md bg-bg-secondary/75`). Overridden on mobile viewports to prevent rendering lag.
* **Layout Constraint**: Card padding adjusts responsively (`p-5 sm:p-6 md:p-8`) to prevent text squishing on mobile viewports down to 320px width.

---

## 3. Navigation (Header)
* **Purpose**: Provides access to main pages and core sections.
* **Navigation Rules**:
  * **Breakpoint Threshold**: Strict navigation breakpoint at **1024px** (`lg:`).
    * Above 1024px: Persistent desktop header with drop-down menus.
    * Below 1024px: Compact mobile bar with a hamburger trigger.
  * **Branding**: Primary label is `Enosh Jaques`, secondary is `Visual Vibe Creation` (omits any "Ltd" suffix). Logo monogram area links to Home with an accessible label.
  * **Dropdowns**: Open on click, not hover. Opening one closes the other. Closed automatically on outside clicks, Escape keys, and route transitions.
  * **Mobile Drawer**:
    * Uses proper dialog semantics: `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="mobile-nav-title"`.
    * Keyboard Focus Trap: Enters the drawer when opened, traps focus within drawer elements while open, and returns focus to the toggle button trigger when closed.
    * Background Scroll Lock: Coordinates with the ScrollController to lock background scrolling while open, allowing independent vertical scrolling inside the drawer.

---

## 4. Visual Timelines
* **Purpose**: Chronological lists of education milestones and professional experience.
* **Timeline Rules**:
  * **Track**: Left-aligned vertical line using standard border divider (`border-border-standard`).
  * **Timeline Marker**: Electric Teal circles (`bg-accent-teal`).
  * **Text Alignment**: Clear grid alignment between date tags and details. Dates should appear in monospace typography for layout rhythm.

---

## 5. Media & Images
* **Purpose**: Displays work samples, project interfaces, and photography.
* **Image Rules**:
  * **No Layout Shift**: Containers must have explicit aspect ratios (e.g. `aspect-[16/9]` or `aspect-[4/5]`) to reserve spacing while loading.
  * **Registry Fallback**: Query the typed registry (`src/data/assets.ts`). Available assets render `next/image` components. Missing assets display `DevAssetPlaceholder` loaders, preventing 404 console errors.

---

## 6. Stacking Context & Spacing
* **Z-Index Scale**:
  * `z-base` (0) / `z-raised` (10)
  * `z-sticky` (20) - background decoration panels
  * `z-header` (50) - sticky header navigation bar
  * `z-[99]` - scroll progress bar
  * `z-backdrop` (100) - mobile menu backdrop overlay
  * `z-modal` (200) - desktop dropdown menus, mobile navigation drawer
* **Spacing Rhythm**:
  * Page offset: Sticky header space is reserved via a standard `pt-20` padding.
  * Section scroll offset: Anchor targets use `scroll-margin-top: 80px` to prevent section headers from being covered by the sticky header.
  * Gutters: Standard margins use fluid spacing `px-gutter` (`clamp(1rem, 3vw, 2rem)`).

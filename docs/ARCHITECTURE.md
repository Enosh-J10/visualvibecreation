# Enosh Jaques Digital Identity: Technical Architecture

This document defines the technical architecture, routing, scroll mechanics, data registries, canonical component rules, sitemap configurations, and progressive enhancement plans.

---

## 1. Project Framework & Core Layers

- **Next.js App Router**: Root layout controls initial static compilation. Subpages compile as static HTML by default to minimize initial load times.
- **Font Compiler Pipeline**: Outfit and Inter are compiled directly by Next.js using `next/font/google`. This prevents layout shifts and reduces blocking external requests.
- **Styling Architecture**: Built using Tailwind CSS v4 CSS-first compiler. Custom design system tokens are mapped to standard Tailwind class properties within `src/app/globals.css`.

---

## 2. Scroll & Interaction Framework (Phase 1 Refinement)

### 2.1. ScrollController Context
* **API**: The scroll engine is isolated inside `src/context/ScrollContext.tsx` via a typed React Context provider (`ScrollProvider`).
* **Interface**:
  ```typescript
  export interface ScrollController {
    stop: () => void;
    start: () => void;
    scrollToTop: (immediate?: boolean) => void;
    scrollToHash: (hash: string) => void;
    isReady: boolean;
    isReducedMotion: boolean;
  }
  ```
* **No Arbitrary Mutations**: No component directly reads or modifies `window` variables. The `Header` and other controls consume only these clean, typed methods via `useScrollController()`.
* **Lock State Coordination**: 
  * Mobile drawer toggle states invoke `controller.stop()` and set `document.body.style.overflow = "hidden"` during open states.
  * Dismissals invoke `controller.start()` and reset `document.body.style.overflow = ""`.
  * Idempotency is preserved by running cleanup actions on Esc keys, pathname updates, backdrop clicks, and drawer unmounts.

### 2.2. Route Scroll Restoration
* **Pathname Watcher**: Changes to path names trigger a scroll check.
* **History popstate check**: If navigation is triggered by browser Back/Forward (popstate), scroll reset is bypassed. This respects the browser's native `history.scrollRestoration` state.
* **Hash links check**: If target coordinates have a hash, scroll-to-top is ignored.
* **Flicker-Free Top resetting**: Standard new link navigation snaps the page viewport to `(0, 0)` immediately via the controller without delay.

---

## 3. Progressive Animation & Reduced Motion Strategy

To ensure high-end responsiveness and search crawler accessibility:
* **Progressive Animation**: By default, all elements are rendered visible (`opacity: 1`, `transform: none`) on the server and during initial client hydration (pre-mount). This ensures content is never hidden if JavaScript is disabled or fails to execute.
* **Active Motion Mounting**: Motion wrappers (`FadeUp`, `FadeIn`, `BlurReveal`, `ScaleReveal`, `TextReveal`) evaluate mounting client-side. Animations are enabled *only* after `mounted === true`.
* **Reduced Motion Bypassing**: If a user has `prefers-reduced-motion: reduce` configured in system settings, components bypass animation hooks and continue rendering static visible layout containers, preventing layout shifts, visual flashes, and browser lag.

---

## 4. Temporary Route SEO Behaviour

* **Noindex robots header**: Unfinished route shells (`/projects`, `/experience`, `/education`, `/leadership`, `/awards`, and `/certifications`) are excluded from search engine crawls by adding strict robots indexing instructions:
  ```typescript
  export const metadata = {
    robots: {
      index: false,
      follow: true,
    }
  };
  ```
* **Sitemap Exclusions**: Unfinished route shells are omitted from the active sitemap indexer (`src/app/sitemap.ts`).

---

## 5. Media & Asset Registry Strategy

* **Typed Asset Model**: Assets are mapped inside `src/data/assets.ts`. Status fields track `"available"` or `"missing"` files.
* **Environment-dependent Placeholders**:
  * *Development*: Incomplete files display a dashed outline container with target dimensions and file names for planning.
  * *Production*: Displays a polished, neutral, high-end block reading *"Creative media is being prepared"* to omit internal developer properties and file labels, while preserving exact element aspect ratios.
* **Console Warnings**: Requests for unregistered assets generate development warnings.

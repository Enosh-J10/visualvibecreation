# Phase 2: Navigation & Layout Checklist (Completed)

This checklist tracks the implementation of the global layout, navigation, containers, spacing, and accessibility structure for Phase 2.

---

## 1. Header Structure & Brand Identity

- [x] **Primary / Secondary Brand Display**: Shows `Enosh Jaques` as primary and `Visual Vibe Creation` as secondary. Secondary brand text is hidden on extremely narrow screens (`hidden xs:inline-block`) to prevent crowding.
- [x] **Monogram Logo Link**: Enosh Jaques logo area links to Home with an accessible screen reader label (`aria-label="Enosh Jaques Home Page"`). Monogram EJ path is utilized purely as a supporting visual mark.
- [x] **Compact Profile**: Height is predictable and standardized (height fits between 64px to 76px). No "Ltd" or full legal names are present.

## 2. Desktop Navigation

- [x] **Layout Links**: Contains Home, About, Work dropdown (Projects, Portfolio, Services), Journey dropdown (Experience, Education, Leadership, Awards, Certifications), and Contact.
- [x] **Click-To-Open triggers**: Dropdowns open on user clicks. Opening one automatically closes the other.
- [x] **Popovers positioning**: Positioned absolute to stay fully within viewport bounds. Journey dropdown uses `right-0` to avoid screen overlap with Contact.
- [x] **Dismiss Hooks**: Menus are dismissed on clicking outside the bounds, route changes, browser history Back/Forward, and when pressing the `Escape` key.
- [x] **Accessibilities (ARIA)**: Implements correct `aria-haspopup="true"`, `aria-expanded={is...Open}`, and dynamic `aria-controls` matching menu IDs.

## 3. Active Route States

- [x] **Parent Mapping**: Nested routes correctly activate parent navigation highlights (e.g. `/portfolio` sets Work section to active).
- [x] **Visual Highlight Combination**: Active routes are styled using white typography + Electric Teal underline indicators (`layoutId="activeNavIndicator"`) + `aria-current="page"` attributes, avoiding color-only highlights.

## 4. Mobile Navigation Drawer

- [x] **Minimum Target Bounds**: Menu trigger size is set to touch-friendly dimensions (`touch-target flex h-9 w-9 items-center justify-center p-2` -> effectively 44x44px target).
- [x] **A11y Dialog Semantics**: Matches `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="mobile-nav-title"`.
- [x] **Keyboard Focus Trap**: Integrates hooks that focus the first link inside the drawer when opened, trap tab inputs within the drawer bounds, and restore focus to the menu trigger upon closure.
- [x] **Scroll Lock Integration**: Pauses Lenis and locks HTML body overflow when open. Cleanups are fully idempotent.

## 5. Responsive Breakpoints

- [x] **Single Breakpoint**: Configured strict navigation breakpoint at **1024px** (`lg:`).
  - Above 1024px: Full inline navigation + social shortcuts are displayed.
  - Below 1024px: Desktop links and icons are hidden; hamburger trigger and mobile drawer are enabled.
- [x] **Grid gutters & Paddings**: Responsive gutters (`px-gutter`) scale smoothly from 16px to 32px. No logo clipping or layout collision is present at any viewport size.

## 6. Sticky Header

- [x] **Visual State Shift**: Transparent at scroll height 0. Shifts to subtle border, glass backdrop-blur, and charcoal background surface on scroll.
- [x] **Section Offset margins**: `section[id]` elements are set with `scroll-margin-top: 80px` in `globals.css` to prevent sticky headers from covering titles.

## 7. Global Containers & Spacing

- [x] **Canonical Containers**: Renders pages within the standard layout container classes:
  - `.container-standard` (max-width `80rem` / 1280px)
  - `.container-reading` (max-width `44rem` / 704px)
- [x] **Spacing Rhythm**: Unified page offsets (`py-12` and standard gutters) are used on subpages and error layouts to prevent width shifting.

## 8. Stacking Context (Z-Index)

- [x] **Hierarchical scale**:
  - Header: `z-header` (50)
  - Scroll Progress: `z-[99]`
  - Backdrop: `z-backdrop` (100)
  - Drawer & Dropdowns: `z-modal` (200)

## 9. Footer

- [x] **Branding & Copy**: Displays Enosh Jaques with Creative Developer, Designer and Founder subtitle. Studio line is set to the approved text. No "Ltd" or full legal names are present.
- [x] **Complete links**: Includes Home, About, Projects, Portfolio, Services, Experience, Education, Contact, and social profiles.
- [x] **Hydration Safe Year**: Hardcoded to copyright year `2026` to prevent timezone-related hydration warning badges.

## 10. Reduced Motion

- [x] **Drawer & Dropdowns**: Slide animations are disabled. Menu fades in/out with simple opacity changes.
- [x] **Sticky transitions**: Scroll elevation styling transforms without animations.
- [x] **Interactions**: Magnetic and tilt wrappers are bypassed, returning standard un-animated element structures.

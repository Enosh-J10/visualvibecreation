# Phase 3 Checklist: Global Layout & Navigation

Detailed implementation checklist for Phase 3: Global Header Navigation, Footer layouts, and responsive shells.

---

## 1. Global Header Requirements
- [x] Create `src/components/sections/Header.tsx` as a sticky client component.
- [x] Render brand name **Enosh Jaques** on the left with high typography contrast.
- [x] Navigation items aligned to the right.

### Navigation Behavior
- [x] **Desktop Navigation**:
  - Links to: `/`, `/about`, `Work` dropdown (Projects, Portfolio, Services), `Journey` dropdown (Experience, Education, Leadership, Awards, Certifications), `/contact`.
  - Active page states marked with a Soft Cyan underline indicator and active text color.
  - Hover states animate opacity smoothly (`hover:text-text-primary duration-fast`).
- [x] **Mobile Navigation**:
  - Hamburger toggle icon (minimum size `44x44px`).
  - Opens a full-screen drawer overlay (`z-index: 50`) sliding down from the top or right.
  - Close button in the top-right corner.
  - Scroll behavior disabled on the body when the mobile menu is open.

### Sticky & Scroll Behavior
- [x] Header remains fixed at the top of the viewport (`sticky top-0`).
- [x] Backing surface uses a glass effect (`glass-surface`) to blur content scrolling underneath.
- [x] Header border scales in opacity or shifts slightly when the page is scrolled down to denote elevation change.

---

## 2. Global Footer Requirements
- [x] Create `src/components/sections/Footer.tsx` as a standard layout block.
- [x] **Legal Profile Section**: Display full legal name *Enosh Olencio Jaques* alongside copyright tags.
- [x] **Quick Links Groups**: Organize links into two columns: *Narrative* (About, Journey, Awards) and *Technical* (Projects, Services, Experience).
- [x] **Social badges array**: Show high contrast SVG brand links for GitHub, LinkedIn, Instagram, and Google Play.

---

## 3. Placeholders & Dynamic Infrastructure
- [x] Remove misleading placeholders (Search, Theme, Language buttons) to keep codebase lightweight.
- [x] Document them as future features in the architecture layout.

---

## 4. Accessibility & Responsive Targets
- [x] Enforce a `44x44px` touch target grid on all navigation trigger actions.
- [x] Ensure full keyboard navigation support:
  - Header triggers support tab indexing.
  - Menu panels support close via the `Escape` key.
- [x] Ensure responsive adjustments (hamburger icon displays below `1024px`, full desktop inline navbar shows above `1024px`).
- [x] Set `aria-expanded` status labels on the mobile toggle drawer dynamically.
- [x] Provide a skip-to-content target link at the very top of layout rendering.

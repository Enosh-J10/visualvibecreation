# Phase 3 Checklist: Global Layout & Navigation

Detailed implementation checklist for Phase 3: Global Header Navigation, Footer layouts, and responsive shells.

---

## 1. Global Header Requirements
- [ ] Create `src/components/sections/Header.tsx` as a sticky client component.
- [ ] Render brand name **Enosh Jaques** on the left with high typography contrast.
- [ ] Navigation items aligned to the right.

### Navigation Behavior
- [ ] **Desktop Navigation**:
  - Links to: `/about`, `/projects`, `/portfolio`, `/services`, `/experience`, `/education`, `/leadership`, `/awards`, `/certifications`, `/contact`.
  - Active page states marked with a Soft Cyan underline or font glow.
  - Hover states animate opacity smoothly (`hover:text-text-primary duration-fast`).
- [ ] **Mobile Navigation**:
  - Hamburger toggle icon (minimum size `44x44px`).
  - Opens a full-screen drawer overlay (`z-index: 50`) sliding down from the top or right.
  - Close button in the top-right corner.
  - Scroll behavior disabled on the body when the mobile menu is open.

### Sticky & Scroll Behavior
- [ ] Header remains fixed at the top of the viewport (`sticky top-0`).
- [ ] Backing surface uses a glass effect (`glass-surface`) to blur content scrolling underneath.
- [ ] Header border scales in opacity or shifts slightly when the page is scrolled down to denote elevation change.

---

## 2. Global Footer Requirements
- [ ] Create `src/components/sections/Footer.tsx` as a standard layout block.
- [ ] **Legal Profile Section**: Display full legal name *Enosh Olencio Jaques* alongside copyright tags.
- [ ] **Quick Links Groups**: Organize links into two columns: *Narrative* (About, Journey, Awards) and *Technical* (Projects, Services, Experience).
- [ ] **Social badges array**: Show high contrast SVG brand links for GitHub, LinkedIn, Instagram, and Google Play.

---

## 3. Placeholders & Dynamic Infrastructure
- [ ] **Search Placeholder**: Add a search input or shortcut icon (e.g. `⌘K`) showing a *"Search coming soon"* visual prompt.
- [ ] **Language Selector Placeholder**: Add a localized dropdown option showing *"English (UK)"* with future translation paths.
- [ ] **Dark/Light Theme Toggle Option**: Add a non-functional toggle icon mapping the theme variables, indicating *"System Theme: Dark Only"*.

---

## 4. Accessibility & Responsive Targets
- [ ] Enforce a `44x44px` touch target grid on all navigation trigger actions.
- [ ] Ensure full keyboard navigation support:
  - Header triggers support tab indexing.
  - Menu panels support close via the `Escape` key.
- [ ] Ensure responsive adjustments (hamburger icon displays below `1024px`, full desktop inline navbar shows above `1024px`).
- [ ] Set `aria-expanded` status labels on the mobile toggle drawer dynamically.
- [ ] Provide a skip-to-content target link at the very top of layout rendering.

# Enosh Jaques Portfolio Rebuild: Visual QA Checklist

This checklist is prepared for the manual visual and functional review of the website before committing and pushing Phase 2 changes.

---

## 1. Global Navigation & Header (Desktop & Mobile)

### Desktop Viewports (>= 1024px)
- [ ] **Branding Display**: "Enosh Jaques" (Primary) and "Visual Vibe Creation" (Secondary) are aligned without overlapping elements.
- [ ] **EJ Monogram Logo**: Logo links to the home page with an accessible screen reader label.
- [ ] **Work & Journey Dropdowns**:
  - Open on click (never hover-only).
  - Opening one automatically closes the other.
  - Clicking outside, pressing Escape, or navigating routes closes the open menu.
  - Active nested routes highlight the parent menu.
- [ ] **Header Scroll Transition**:
  - Transparent layout at the top.
  - Restrained dark surface + subtle border + light backdrop-blur when scrolled.
- [ ] **Scroll Progress**: High contrast horizontal indicator bar at the top of the header.

### Mobile Viewports (< 1024px)
- [ ] **Compact Branding**: Brand subtitle "Visual Vibe Creation" hides on narrow widths to prevent overlapping the hamburger menu trigger.
- [ ] **Menu Hamburger Trigger**: Complies with the minimum 44×44px touch target guidelines.
- [ ] **Mobile Drawer Navigation**:
  - Backdrop covers page content; clicking the backdrop closes the drawer.
  - Keyboard focus transitions cleanly into the first link of the drawer when opened.
  - Hitting `Escape` or clicking navigation links dismisses the menu.
  - Background scrolling is stopped via the ScrollController.
- [ ] **Social Profiles**: Links to GitHub, LinkedIn are presented at the bottom of the drawer.

---

## 2. Page Structure & Typography Hierarchy

- [ ] **Sticky Header Offset**:
  - Top sections begin below the header container.
  - Headings are not cut off or covered.
- [ ] **Anchor Targets**: Section IDs use `scroll-margin-top: 80px` to offset the sticky header.
- [ ] **Canonical Containers**: Content stays inside the `.container-standard` (1280px) and `.container-reading` (704px) bounds without horizontal page overflow.
- [ ] **Consistent Typography**:
  - Page titles: Outfit font.
  - monospaced tags: small, letter-spaced, uppercase.
- [ ] **Empty States & Placeholders**:
  - Development placeholders show asset keys and dimensions.
  - Production mode renders clean "Creative media is being prepared" visual containers.

---

## 3. Footer

- [ ] **Identity Block**: Shows "Enosh Jaques" and "Creative Developer, Designer and Founder". Tagline displays the approved studio line.
- [ ] **Pushed URLs**: Mapped Home, About, Projects, Portfolio, Services, Experience, Education, Contact, and social badges.
- [ ] **Email Address**: `hello@visualvibecreation.com` wraps safely on narrow devices.
- [ ] **Copyright Line**: Hardcoded to `2026` with no legal suffixes or middle names.

---

## 4. Stacking Order (Z-Index Grid)

- [ ] **Header (z-index: 50)**: Standard sticky level.
- [ ] **Scroll Progress (z-index: 99)**: Above header.
- [ ] **Backdrop Layer (z-index: 100)**: Mobile menu overlay.
- [ ] **Mobile Drawer & Desktop Dropdowns (z-index: 200)**: Top layer.

---

## 5. Page Review Matrix

Ensure these URLs can be checked consistently at standard breakpoints (320px, 375px, 768px, 1024px, 1280px, 1440px):

1. **Home**: `/`
2. **About**: `/about`
3. **Projects**: `/projects`
4. **Portfolio**: `/portfolio`
5. **Services**: `/services`
6. **Experience**: `/experience`
7. **Education**: `/education`
8. **Leadership**: `/leadership`
9. **Awards**: `/awards`
10. **Certifications**: `/certifications`
11. **Contact**: `/contact`
12. **404 Page**: `/non-existent-route`

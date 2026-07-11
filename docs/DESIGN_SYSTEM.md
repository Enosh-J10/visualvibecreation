# Enosh Jaques Design System: Design Tokens & Specifications

This document defines the unified token layers and visual constants for the official digital identity of **Enosh Jaques**. It bridges design philosophy with Tailwind CSS v4 variables.

---

## 1. Color System

We restrict our interface to a high-contrast tech color system to direct focus on content and typography.

### Rationale
Our near-black background and charcoal cards establish a neutral, premium dark workspace. By limiting color variables, we avoid visual distraction and preserve maximum accessibility contrast. Soft Cyan and Electric Teal are used as selective accent signals (focus indicators, link highlights, and state changes) and never as decorative background noise.

### Palette Tokens
- **Near-Black Background**: `#070708` (`--color-bg-primary` / `--background`)
  *The core canvas of the website. Soft enough to prevent eye strain while preserving absolute dark mode aesthetics.*
- **Charcoal Surfaces**: `#121214` (`--color-bg-secondary` / `--background-subtle` / `--surface`)
  *Used for structural panels, grids, and cards. Separates layouts from the primary canvas.*
- **Elevated Charcoal**: `#1a1a1d` (`--surface-elevated`)
  *For dialog boxes, drop-downs, hover-over layers, and modals.*
- **White Primary Typography**: `#ffffff` (`--color-text-primary` / `--text-primary`)
  *Used for high-priority readouts, headings, and active buttons.*
- **Muted Grey Secondary Typography**: `#8e8e93` (`--color-text-secondary` / `--text-secondary`)
  *Used for descriptive lines, timelines, dates, and non-active menus.*
- **Soft Cyan Accent**: `#a5f3fc` (`--color-accent-cyan` / `--accent-cyan`)
  *A high-luminance light indicator. Primary text color on buttons and link icons.*
- **Electric Teal Accent**: `#0d9488` (`--color-accent-teal` / `--accent`)
  *A rich tech green. Used for hover borders, progress indicators, active timeline steps, and focus frames.*

---

## 2. Typography

The type scale balances layout geometry (Outfit) with legibility (Inter).

### Rationale
Display fonts can become overwhelming when applied to body content. Therefore, **Outfit** is strictly bounded to headings and large visual readouts. All paragraph reading layouts utilize **Inter** with line-heights exceeding $1.6\times$ to avoid character crowding.

### Typographic Tokens
- **Display XL**: Outfit, `clamp(2.5rem, 7vw, 4.5rem)`, Extra-Bold (800).
- **Display**: Outfit, `clamp(2.0rem, 5vw, 3.5rem)`, Extra-Bold (800).
- **H1**: Outfit, `clamp(1.75rem, 4vw, 2.75rem)`, Bold (700).
- **H2**: Outfit, `clamp(1.5rem, 3vw, 2.25rem)`, Bold (700).
- **H3**: Outfit, `clamp(1.25rem, 2vw, 1.75rem)`, Semi-Bold (600).
- **H4**: Outfit, `clamp(1.1rem, 1.5vw, 1.35rem)`, Semi-Bold (600).
- **Lead Text**: Inter, `clamp(1.1rem, 1.5vw, 1.25rem)`, Regular (400).
- **Body Large**: Inter, `1.125rem`, Regular (400), Line height 1.6.
- **Body**: Inter, `1.0rem`, Regular (400), Line height 1.625.
- **Body Small**: Inter, `0.875rem`, Regular (400), Line height 1.5.
- **Label**: Inter, `0.75rem`, Semi-Bold (600), Uppercase.
- **Caption**: Inter, `0.75rem`, Regular (400), Muted grey.
- **Overline**: Inter, `0.7rem`, Bold (700), Cyan, Uppercase.

---

## 3. Spacing Scale

We use an 8px grid baseline supplemented by clamp-based fluid gaps for structural layouts.

### Spacing Tokens
- **`--spacing-2xs`**: `0.25rem` (4px) - For badge details.
- **`--spacing-xs`**: `0.5rem` (8px) - Card labels, button paddings.
- **`--spacing-sm`**: `0.75rem` (12px) - Tight gaps inside lists.
- **`--spacing-md`**: `1.0rem` (16px) - Small card paddings.
- **`--spacing-lg`**: `1.5rem` (24px) - Default grid card gaps.
- **`--spacing-xl`**: `2.0rem` (32px) - Header spacing, column gaps.
- **`--spacing-2xl`**: `3.0rem` (48px) - Structural component padding.
- **`--spacing-3xl`**: `4.0rem` (64px) - Outer section bounds.
- **`--spacing-section`**: `clamp(4rem, 8vw, 8rem)` - Top-bottom spacing of layout sections.
- **`--spacing-page-top`**: `clamp(6rem, 12vw, 9rem)` - Offset spacing for content below sticky header.
- **`--spacing-gutter`**: `clamp(1rem, 3vw, 2rem)` - Side margin gutters for fluid screens.

---

## 4. Container System

Defines the horizontal boundaries to keep paragraphs readable and grid layouts mathematically centered.

- **Standard Container (`.container-standard`)**: Max width `80rem` (1280px). Used for dashboard grids, service layouts, and sitemap pages.
- **Reading Container (`.container-reading`)**: Max width `44rem` (704px). Limits line widths to **60-75 characters** for optimized readability.
- **Wide Container (`.container-wide`)**: Max width `90rem` (1440px). Reserved for media showcases, portfolio gallery layouts, and timelines on extra-wide monitors.

---

## 5. Border Radius & Styles

- **Radius XS (`--radius-xs`)**: `4px` - Badge corners, small selection indicators.
- **Radius SM (`--radius-sm`)**: `8px` - Interactive buttons, input fields.
- **Radius MD (`--radius-md`)**: `12px` - Main card variants, images.
- **Radius LG (`--radius-lg`)**: `16px` - Popups, major timeline timeline cards.
- **Radius XL (`--radius-xl`)**: `24px` - Outer visual boxes.

### Borders
- **Subtle**: `1px solid rgba(255, 255, 255, 0.04)` - Structural separations.
- **Standard**: `1px solid rgba(255, 255, 255, 0.08)` - Default card outlines.
- **Strong**: `1px solid rgba(255, 255, 255, 0.16)` - Hover card states.

---

## 6. Shadows & Glows

- **`--shadow-sm`**: `0 1px 2px rgba(0, 0, 0, 0.5)`
- **`--shadow-md`**: `0 4px 12px rgba(0, 0, 0, 0.4)`
- **`--shadow-lg`**: `0 12px 24px rgba(0, 0, 0, 0.5)`
- **`--glow-cyan-subtle`**: `0 0 20px rgba(165, 243, 252, 0.08)` - Glowing overlays on cyan components.
- **`--glow-teal-subtle`**: `0 0 20px rgba(13, 148, 136, 0.08)` - Soft glows on hover states.

---

## 7. Image Rules

- **Aspect Ratios**:
  - Portrait: `aspect-[3/4]` (Academic headshots).
  - Landscape: `aspect-[3/2]` (Placements, travel imagery).
  - Square: `aspect-[1/1]` (Trophy blocks, details).
  - Wide Project Cover: `aspect-[16/9]` (FinCalc cover showcase).
  - Phone Screenshot: `aspect-[9/19.5]` (FinCalc Android app layouts).
- **Core CSS Handling**: Always wrapped in `.image-wrapper` (overflow hidden) to prevent rendering layout shifts. Internal assets utilize `.image-element` (object-fit: cover, object-position: center) to prevent structural distortion.

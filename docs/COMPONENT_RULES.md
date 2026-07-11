# Enosh Jaques Design System: Component Design Rules

This document outlines the philosophy, markup rules, interaction parameters, and accessibility standards for each component type in the design system.

---

## 1. Buttons

### Purpose
Buttons are the primary method of action. They trigger form steps, navigation transitions, and document downloads.

### Styling & Spacing
- **Primary**: Solid background using Cyan (`bg-accent-cyan`). Text must use near-black (`text-bg-primary`) to maintain a **16.1:1 contrast ratio**.
- **Secondary**: Charcoal fill with standard borders.
- **Ghost**: Transparent layout with text-secondary color.
- **Touch Target**: Minimum interaction bounds of **44px height/width** (`min-h-11`) must be enforced, even for icon-only button states.

### Interaction & Animation
- **Hover**: Subtle shift in background brightness (e.g. Cyan brightens slightly, secondary gains border opacity).
- **Active/Pressed**: Scale reduces slightly (`active:scale-98` / `duration-fast`).
- **Focus**: Displays an outline ring offset (`focus-visible:ring-2 focus-visible:ring-accent-teal`).

### Accessibility
- Inactive/Disabled states are styled with a locked dark background and muted text (`btn-disabled`), rather than simply lowering container opacity.
- Screen readers must receive an explicit description of the action via `aria-label` when the button content is an icon.

---

## 2. Card Structures

### Purpose
Cards group related items together, such as single projects, individual services, or specific credentials.

### Styling & Spacing
- **Standard Card**: Flat charcoal container (`bg-bg-secondary`) with standard faint borders (`border-border-muted`).
- **Interactive Card**: Standard card that shifts borders to Electric Teal (`hover:border-accent-teal/30`) and adds a soft background glow (`box-shadow: var(--glow-teal-subtle)`).
- **Glass Card**: Background uses transparency and blur (`backdrop-blur-md bg-bg-secondary/75`). Overridden on mobile to prevent performance issues.

### Layout Constraint
Ensure internal card padding adjusts responsively (`p-5 sm:p-6 md:p-8`) to prevent text squishing on small mobile viewports (down to 320px).

---

## 3. Navigation (Header)

### Purpose
Provides access to main pages.

### Navigation Rules
- **Desktop**: A persistent glassmorphic menu at the top. Active pages must have a Soft Cyan underline or text highlight.
- **Mobile**: Hamburger toggle that triggers a full-width drawer. Close buttons and menu items must be easily clickable (minimum 44px height).

---

## 4. Visual Timelines

### Purpose
Chronological lists of education milestones and professional experience.

### Timeline Rules
- **Track**: Centered vertical line using muted grey (`bg-border-standard`).
- **Timeline Marker**: Electric Teal circles (`bg-accent-teal`).
- **Text Alignment**: Clear grid alignment between date tags and details. Dates should appear in monospace typography for layout rhythm.

---

## 5. Media & Images

### Purpose
To display work samples, portfolio items, and portraits of Enosh Jaques.

### Image Rules
- **No poor cropping**: Portrait containers must crop from the top/center to prevent cutting off chin/eyes.
- **No Layout Shift**: Containers must have explicit aspect ratios (`aspect-[16/9]` / `aspect-[3/4]`) to reserve spacing while loading.
- **Alt Text**: Every image must provide descriptive alternative text. Decorative structures use empty alt attributes (`alt=""`).

---

## 6. Badges & Labels

### Purpose
To show status indicators, specific skills, and categories.

### Badge Rules
- **Formatting**: Small, uppercase, monospace or bold sans-serif text with tight letter-spacing.
- **Colors**: Soft Cyan text on a muted Teal background (`bg-accent-teal/15 text-accent-cyan`).
- **Accessibility**: Badges must not rely on color alone to convey meaning (e.g. state text must be written explicitly).

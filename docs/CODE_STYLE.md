# Enosh Jaques Digital Identity: Coding Standards & Styles

This document defines the coding standards, folder structures, typescript behaviors, and styling practices for the project.

---

## 1. Folder Structure

We organize folders based on the standard Next.js App Router layout:

```
src/
├── app/               # Page routes and layout files
│   ├── globals.css    # Global stylesheet and semantic design tokens
│   ├── layout.tsx     # Root shell wrapper (loads next/font/google)
│   ├── page.tsx       # Stories-based homepage
│   └── [routes]/      # Subpage routes (about, portfolio, projects, services)
├── components/        # Decoupled React component files
│   ├── sections/      # Large layout blocks (Hero, Footer, Timeline)
│   ├── animations/    # Framer Motion scroll and hover wrappers
│   └── ui/            # Reusable low-level widgets (MagneticButton, BrandIcons)
```

---

## 2. Component Design Principles

- **React Server Components (RSC) by Default**: All components should render as Server Components unless they require client interactivity (hooks like `useState`, `useEffect`, or Framer Motion properties).
- **Client Component Isolation**: Keep client-specific actions leaf-level where possible. If a header uses hover scroll tracking, isolate the client triggers to a component, leaving layouts as RSC.
- **Client Marker**: Always add `"use client";` at the top of client-side files.

---

## 3. TypeScript Rules

- **Strict Type Checking**: Explicitly define parameters, return values, interface nodes, and props.
- **No Explicit Any (`@typescript-eslint/no-explicit-any`)**: Avoid casting as `any`. Use generics or type casting (e.g. `[number, number, number, number]` for Bezier curves).
- **Props Interfaces**: Explicitly write prop structures for all custom components (e.g. `interface ButtonProps`).

---

## 4. Tailwind CSS v4 Practices

- **Semantic Variables**: Prefer semantic theme values (e.g. `text-text-secondary`, `bg-bg-primary`, `border-border-subtle`) instead of raw tailwind colors (`text-zinc-500`, `bg-neutral-950`).
- **No Ad-Hoc Gradients**: Custom gradients must be defined as reusable classes in `globals.css` (e.g., `.text-gradient-teal`).
- **Touch Targets**: Enforce `.touch-target` on mobile interactive links.

---

## 5. Animation Organization

- **Framer Motion Variants**: Define custom motion coordinates inside readable configurations at the top of the file rather than cluttering return blocks with inline transitions.
- **Reduced Motion**: Always incorporate the `useReducedMotion()` listener to verify user preference before applying translating variables.
- **Clean listeners**: Ensure any scroll or window resize listener has a corresponding cleanup trigger inside `useEffect` returns to avoid memory leaks.

# Enosh Jaques Digital Identity: Technical Architecture

This document defines the technical architecture, routing, metadata compiler pipelines, sitemap configurations, and future scaling plans.

---

## 1. Project Framework & Core Layers

- **Next.js 15+ App Router**: Root layout controls initial static compilation. Subpages compile as static HTML by default to minimize initial load times.
- **Font Compiler Pipeline**: Outfit and Inter are compiled directly by Next.js using `next/font/google`. This prevents layout shifts and reduces blocking external requests.
- **Styling Architecture**: Built using Tailwind CSS v4 CSS-first compiler. Custom design system tokens are mapped to standard Tailwind class properties within `src/app/globals.css`.

---

## 2. Metadata, Crawling, & SEO Setup

- **Canonical URL Root**: Configured strictly as `https://visualvibecreation.com`.
- **JSON-LD Schema**:
  - `Person`: Configured inside `layout.tsx` for Enosh Olencio Jaques (mapping details from high school to current college and studio credentials).
  - `SoftwareApplication`: Case study maps FinCalc Google Play store details programmatically for search engine indexing.
  - `WebSite`: Global search box schema config.
  - `Brand`: Maps Visual Vibe Creation services without false incorporated references.
- **Robots Policies**: Exposes dynamic rules (allowing search crawlers access to all routes, referencing sitemaps) via [robots.ts](file:///c:/Users/Enosh/Visual-Vibe-Website/src/app/robots.ts).
- **Sitemap Indexer**: Exposes dynamic sitemap indices via [sitemap.ts](file:///c:/Users/Enosh/Visual-Vibe-Website/src/app/sitemap.ts).

---

## 3. Future Scaling Parameters

- **Dynamic Theme Architecture**: While the interface is currently locked to Dark Mode, CSS tokens have been declared as semantic variables (e.g. `--background`, `--text-primary`). This allows us to implement a Light Mode toggle in the future by adding a theme wrapper script to the root layout body.
- **Language Localization**: Route structures can be wrapped inside an `[lang]` folder structure in the future without breaking route paths.
- **Dynamic Database Forms**: Submissions on the `/contact` form can be connected to server actions or serverless email APIs when needed in the future.

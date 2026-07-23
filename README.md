# Visual Vibe Creation

[![CI](https://github.com/Enosh-J10/visualvibecreation/actions/workflows/ci.yml/badge.svg)](https://github.com/Enosh-J10/visualvibecreation/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/badge/node-%3E%3D24-brightgreen.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Official portfolio and website of **Enosh Jaques** — Founder & Creative Developer at **Visual Vibe Creation**.

This repository is an award-level creative digital studio portfolio showcasing cross-disciplinary software engineering, UI/UX design, mobile applications, and motion graphics.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Lenis](https://lenis.darkroom.engineering/) Smooth Scroll
- **Icons**: [Lucide React](https://lucide.dev/)
- **Security & Bot Protection**: [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)
- **Email Delivery**: [Resend](https://resend.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Unit Testing**: [Vitest](https://vitest.dev/)
- **E2E Testing**: [Playwright](https://playwright.dev/)
- **Auditing**: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## Local Installation

### Prerequisites

- **Node.js**: `v24.x` (standardized across local development, CI, and production).
- **npm**: `v10+`

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Enosh-J10/visualvibecreation.git
   cd visualvibecreation
   ```

2. **Use Node 24:**

   ```bash
   nvm use
   ```

3. **Install dependencies:**
   ```bash
   npm ci
   ```

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

### Public Build-Time Variables (Browser Visible)

| Variable                         | Description                   | Default / Example                    |
| :------------------------------- | :---------------------------- | :----------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Base canonical domain         | `https://www.visualvibecreation.com` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile Site Key | `1x00000000000000000000AA` (testing) |

### Server-Only Secret Variables (Never Exposed to Browser)

| Variable                    | Description                                                      |
| :-------------------------- | :--------------------------------------------------------------- |
| `RESEND_API_KEY`            | Resend Email API Key (`re_...`)                                  |
| `CONTACT_FROM_EMAIL`        | Sender address (e.g. `Website <website@visualvibecreation.com>`) |
| `CONTACT_TO_EMAIL`          | Recipient address (e.g. `hello@visualvibecreation.com`)          |
| `TURNSTILE_SECRET_KEY`      | Cloudflare Turnstile Secret Key                                  |
| `CONTACT_ALLOWED_HOSTNAMES` | Optional comma-separated origin allowlist                        |

---

## Available Scripts

| Script                  | Command                             | Description                                             |
| :---------------------- | :---------------------------------- | :------------------------------------------------------ |
| `npm run dev`           | `next dev`                          | Start local development server                          |
| `npm run build`         | `next build`                        | Compile optimized production build                      |
| `npm run start`         | `next start`                        | Start local production server                           |
| `npm run lint`          | `eslint .`                          | Check linting rules across codebase                     |
| `npm run lint:fix`      | `eslint . --fix`                    | Automatically fix linting issues                        |
| `npm run type-check`    | `tsc --noEmit`                      | Run strict TypeScript validation                        |
| `npm run format`        | `prettier --write .`                | Format codebase using Prettier                          |
| `npm run format:check`  | `prettier --check .`                | Verify Prettier formatting compliance                   |
| `npm run test`          | `vitest run`                        | Run unit tests                                          |
| `npm run test:watch`    | `vitest`                            | Run unit tests in watch mode                            |
| `npm run test:coverage` | `vitest run --coverage`             | Generate Vitest code coverage report                    |
| `npm run test:e2e`      | `playwright test`                   | Run Playwright E2E tests                                |
| `npm run test:e2e:ui`   | `playwright test --ui`              | Open Playwright UI test runner                          |
| `npm run lighthouse`    | `lhci autorun`                      | Perform Lighthouse CI performance & accessibility audit |
| `npm run analyze`       | `cross-env ANALYZE=true next build` | Generate bundle breakdown report                        |

---

## Testing & Automation Architecture

### 1. Unit Tests (Vitest)

Unit tests validate Zod schema constraints, logger secret redaction, Turnstile verification handlers (mocked fetch), and canonical site configuration.

### 2. End-to-End Tests (Playwright)

E2E tests launch `npm run start` against a local production build. The test matrix covers:

- **Chromium Desktop**: Full application test suite.
- **Firefox Desktop**: Smoke tests (`@smoke`).
- **Mobile Chrome (Pixel 7)**: Critical responsive and layout tests (`@critical`, `@responsive`).
- **Mobile Safari (iPhone 15)**: Critical responsive navigation & form tests (`@critical`, `@responsive`).

### 3. Lighthouse CI

Lighthouse audits test production pages for Performance, Accessibility, Best Practices, and SEO.

---

## CI/CD Pipeline Structure

GitHub Actions workflow ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) executes four distinct jobs:

1. **`quality`**: `npm ci` $\rightarrow$ `format:check` $\rightarrow$ `lint` $\rightarrow$ `type-check` $\rightarrow$ `test:coverage` $\rightarrow$ `npm audit`.
2. **`build`**: Compiles production Next.js build.
3. **`e2e`**: Installs Playwright browsers and executes E2E test matrix against production build.
4. **`lighthouse`**: Performs Lighthouse CI audits and uploads reports as workflow artifacts.

---

## Architecture & Security Roles

- **Vercel**: Production hosting environment connected via GitHub continuous deployment.
- **Cloudflare**: DNS management, CNAME proxy, Full SSL/TLS encryption, and Turnstile bot protection.
- **Resend**: Transactional email delivery service for contact form inquiries.
- **Server Boundaries**: Server-only environment variables are strictly validated via Zod inside API route handlers with `"server-only"` import protections.

---

## Project Structure

```
├── .github/              # CI/CD workflows and Dependabot configuration
├── public/               # Static assets (images, logos, favicon)
├── src/
│   ├── app/              # Next.js App Router (pages, layout, error boundaries, API routes)
│   ├── components/       # UI components, animations, and email templates
│   ├── context/          # React context providers
│   ├── data/             # Static content & portfolio metadata
│   └── lib/              # Utility libraries, env validation, logger, and site config
├── tests/
│   ├── unit/             # Vitest unit test suites
│   └── e2e/              # Playwright E2E test suites
├── .lighthouserc.js      # Lighthouse CI configuration
├── .prettierrc           # Prettier code formatting rules
├── .nvmrc                # Standardized Node.js version target
├── playwright.config.ts  # Playwright configuration
├── vitest.config.ts      # Vitest unit test configuration
└── next.config.ts        # Next.js configuration with Bundle Analyzer wrapper
```

---

## License

This project is licensed under the [MIT License](LICENSE).

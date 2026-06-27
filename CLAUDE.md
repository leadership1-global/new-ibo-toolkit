# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**IBO Roadmap** is a static Next.js app for Independent Business Owners to track books, habits, business phases, products, budgeting, income, and contacts. It deploys to GitHub Pages via GitHub Actions.

## Tech Stack

- **Next.js 16** (see breaking changes note below) with React 19
- **TypeScript**
- **Tailwind CSS 4** with `@tailwindcss/postcss`
- **Lucide React** for icons
- **ESLint 9** with `eslint-config-next`

## Commands

All commands run from the `site/` directory:

```bash
npm run dev    # dev server at http://localhost:3000
npm run build  # static export to site/out/
npm run lint   # ESLint
```

There are no tests in this project.

## Architecture

### Routing

Next.js App Router with file-based routing. Every folder under `site/app/` is a route segment. `layout.tsx` wraps the entire app with the `Navigation` component; `template.tsx` wraps each page with a fade-in animation.

### Navigation

`app/nav.tsx` exports a `Navigation` client component. It renders a sticky header with a hamburger button that opens a slide-in drawer. The drawer dismisses on link click or Escape key. Navigation links are defined as a static `links` array at the top of that file — add new routes there.

### Data

All data is static and co-located with components — no API calls, no backend, no global state:

- **`app/products/data.ts`** — ~400+ `Product` objects (SKU, name, PV, price)
- **`app/products/bundles.ts`** — household types and PV tiers with SKU arrays for each bundle combination
- **`app/habits/page.tsx`** — `pillarsData` array defining the three habit pillars (Personal Growth, Product Integrity, Business Activity) with their nine habits
- **`app/budgeting/page.tsx`** — budget categories and line items defined inline
- **`app/conversations/page.tsx`** — index page with two cards (Warm Market A/B List, Out & About C List)
- **`app/conversations/warm-market/page.tsx`** — 5-phase accordion script for warm market; Phase 3 has an A/B tab switcher (Referral vs Opinion angle)
- **`app/conversations/out-and-about/page.tsx`** — 5-phase accordion script for cold/stranger prospecting

Interactive pages use `useState`/`useMemo` only; no Context API or external state library.

### Build & Deployment

`next.config.ts` sets `output: "export"` for fully static output into `site/out/`. Images are unoptimized. `basePath` reads from `NEXT_PUBLIC_BASE_PATH` (defaults to `""` locally, set to `/new-ibo-toolkit` for GitHub Pages). The `.github/workflows/deploy.yml` workflow builds and deploys to GitHub Pages on push to `main`.

## Important: Next.js 16 Breaking Changes

Per `site/AGENTS.md`: "This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code."

Use `next/navigation` (not `next/router`) for all routing hooks (`usePathname`, `useRouter`, etc.) as required by the App Router.

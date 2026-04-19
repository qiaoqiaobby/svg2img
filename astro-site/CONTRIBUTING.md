# Contributing to SVG2IMG

## Architecture Overview

```
Astro Pages (SSG)  →  Vue Islands (client:visible)  →  Business Logic (lib/)
  src/pages/            src/components/converter/         src/lib/
```

The website follows the **Astro Island Architecture**: pages are statically generated at build time, with the interactive converter loaded as a Vue 3 island only when visible in the viewport.

## Directory Structure

| Directory | Responsibility | Key Rule |
|-----------|---------------|----------|
| `src/pages/` | SSG routes (`/zh/`, `/en/`) | No business logic; only imports + layout composition |
| `src/layouts/` | HTML shell, SEO meta, JSON-LD | Shared across all pages |
| `src/components/converter/` | Interactive converter UI (Vue 3) | Uses `<script setup>` + Composition API |
| `src/lib/` | Pure business logic (SVG parse, Canvas render, file utils) | No Vue/DOM dependencies where possible; fully unit-tested |
| `src/i18n/` | Translations (`zh.ts`, `en.ts`, `types.ts`) | All UI text must go through `t(lang)` |
| `src/styles/` | Global CSS + animations | CSS variables only; no hardcoded colors/spacing |
| `public/` | Static assets, Cloudflare config | `_headers` for security, `_redirects` for routing |

## Code Style

### TypeScript

- **Strict mode** is enabled in `tsconfig.json` — do not use `any`
- Export interfaces/types for all public API boundaries (function params, return values)
- Use early returns to reduce nesting
- Error handling: catch at the action level (composable), not deep in library code

### Vue Components

- Always use `<script setup lang="ts">`
- Props: use `defineProps<{ ... }>()` with TypeScript interface
- State management: Composition API via `useConverter.ts` composable
- No direct DOM manipulation — use Vue reactive bindings

### CSS

- Use CSS custom properties (variables) defined in `globals.css` for all colors, spacing, shadows
- Never hardcode color values like `#f97316` in components — use `var(--color-primary)`
- Responsive: mobile-first approach, breakpoints at 480px / 768px / 992px / 1200px
- Dark mode: use `prefers-color-scheme: dark` with CSS variable overrides
- Accessibility: always support `prefers-reduced-motion: reduce`

### i18n

- All user-facing text must be in `src/i18n/zh.ts` and `en.ts`
- Add the key to `types.ts` interface first, then implement in both language files
- Access via `t(lang).keyName` — never hardcode strings in templates

## Security Checklist

SVG files are user-provided input. Every SVG must pass through:

1. **`containsJavascriptCode()`** — reject SVGs containing `<script>`, `javascript:`, `onerror=`, etc.
2. **`sanitizeSvgContent()`** — strip 39+ dangerous event handler attributes and `<script>` tags before Canvas rendering

Never bypass these checks. If adding a new SVG input method, ensure it calls both functions.

## Adding a New Feature

Follow this order:

1. **`src/lib/`** — Add/modify pure logic (parser, renderer, utils)
2. **`src/lib/__tests__/`** — Write tests for the new logic
3. **`src/components/converter/useConverter.ts`** — Wire logic into the composable
4. **`src/components/converter/*.vue`** — Update UI components
5. **`src/i18n/types.ts`** → `zh.ts` → `en.ts` — Add translations
6. Run `npm test` and `npm run build` to verify

## Testing

```bash
npm test          # Run all tests (Vitest)
npm run test:watch  # Watch mode during development
```

Tests live alongside the code in `__tests__/` directories. Focus testing on:
- `src/lib/` functions (SVG parsing, sanitization, rendering, file utils)
- Security-sensitive code paths (XSS detection, attribute stripping)
- Edge cases (missing dimensions, invalid input, boundary values)

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add WebP quality preset selector
fix: handle SVG with percentage-based dimensions
docs: update CONTRIBUTING with test instructions
refactor: extract dimension parsing to standalone function
test: add XSS vector coverage for sanitizeSvg
```

## Build & Deploy

```bash
npm run build     # Production build → dist/
npm run preview   # Preview locally
```

Deployed automatically via Cloudflare Pages on push to `main`.

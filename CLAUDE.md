# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SVG to Image Converter — an Astro 6 + Vue 3 静态网站，部署到 https://svg2img.bult.dev。将 SVG 文件转换为 PNG、JPG、WebP 格式，支持 1x–3x 缩放和质量调节。双语 UI（中文/英文）。

## Development

```bash
cd astro-site
npm install        # first time only
npm run dev        # dev server at http://localhost:4321
npm run build      # production build → astro-site/dist/
npm run preview    # preview production build locally
npm test           # run unit tests (Vitest)
npm run test:watch # run tests in watch mode
```

## Architecture

| Layer | Path | Description |
|-------|------|-------------|
| Pages | `src/pages/zh/`, `src/pages/en/` | SSG routes; root `/` auto-redirects by language |
| Vue island | `src/components/converter/` | Interactive converter, loaded with `client:visible` |
| Business logic | `src/lib/` | `svgParser.ts`, `canvasRenderer.ts`, `fileUtils.ts` |
| Tests | `src/lib/__tests__/` | Vitest unit tests for all lib functions |
| i18n | `src/i18n/` | `zh.ts` + `en.ts`, accessed via `t(lang)` helper |
| Layout | `src/layouts/BaseLayout.astro` | SEO meta, OG, JSON-LD, hreflang |
| Styles | `src/styles/` | `globals.css` + `animations.css` (no Tailwind) |
| Deploy config | `public/_headers`, `public/_redirects` | Cloudflare Pages security headers (incl. CSP) + redirects |

## Key Implementation Details

- SVG parsing uses `DOMParser` with XSS sanitization (removes script tags, 39+ event handler attributes, `javascript:` URIs)
- Image generation uses Canvas 2D API with data URL encoding (not Blob URLs, for CORS safety)
- Default SVG dimensions: 300×150 when width/height and viewBox are missing
- Export filename pattern: `{original-name}-{scale}x.{format}`
- Loading has timeout protection (10s loading spinner, 5s image load)
- Vue error boundary (`onErrorCaptured`) prevents white-screen crashes

## Quality Assurance

- **TypeScript strict mode** — no `any`, full type coverage
- **Unit tests** — `npm test` runs Vitest against `src/lib/` (SVG parsing, sanitization, rendering)
- **Code standards** — see `CONTRIBUTING.md` for architecture, style, and security guidelines
- **EditorConfig** — `.editorconfig` ensures consistent formatting
- **CSP** — Content-Security-Policy header via Cloudflare `_headers`

## Cloudflare Pages Deployment

- **Build command:** `cd astro-site && npm run build`
- **Build output directory:** `astro-site/dist`
- **Root directory:** `/` (repo root)
- **Node.js version:** 20+

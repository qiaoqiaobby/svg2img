<div align="center">

<img src="astro-site/public/favicon.svg" alt="SVG2IMG" width="80" height="80" />

# SVG2IMG

**Convert SVG to PNG / JPG / WebP — instantly, privately, in your browser.**

[![Deploy](https://github.com/qiaoqiaobby/svg2img/actions/workflows/deploy.yml/badge.svg)](https://github.com/qiaoqiaobby/svg2img/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-f97316.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-6-bc52ee.svg)](https://astro.build/)
[![Vue](https://img.shields.io/badge/Vue-3-42b883.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-50%20passed-22c55e.svg)](#testing)

<br />

[**Live Demo**](https://svg2img.bult.dev) · [Report Bug](https://github.com/qiaoqiaobby/svg2img/issues) · [Request Feature](https://github.com/qiaoqiaobby/svg2img/issues)

<br />

<img src="https://img.shields.io/badge/Zero%20Server%20Upload-All%20Client--Side-f97316?style=for-the-badge" alt="Zero Server Upload" />

</div>

---

## Why SVG2IMG?

Most SVG converters upload your files to a server. **SVG2IMG doesn't.** Every conversion happens entirely in your browser via Canvas 2D API — your SVGs never leave your device.

---

## Features

<table>
<tr>
<td width="50%">

### Core Conversion
- **3 output formats** — PNG (lossless), JPG, WebP
- **5 scale presets** — 1x, 1.5x, 2x, 2.5x, 3x
- **Quality control** — 1–100% slider for JPG/WebP
- **Batch-ready filename** — `{name}-{scale}x.{format}`

</td>
<td width="50%">

### Input Methods
- **File upload** — click to browse
- **Drag & drop** — visual drop zone with feedback
- **Paste SVG code** — auto-detects clipboard content
- **Clipboard copy** — one-click output to clipboard

</td>
</tr>
<tr>
<td>

### User Experience
- **Dark / Light mode** — toggle or follow system
- **Bilingual** — Chinese & English, auto-detected
- **4-step progress** — Upload → Settings → Preview → Export
- **Responsive** — mobile, tablet, desktop

</td>
<td>

### Security & Privacy
- **Zero upload** — all processing client-side
- **XSS sanitization** — 39+ dangerous attributes stripped
- **CSP headers** — strict Content-Security-Policy
- **No tracking** — no analytics, no cookies

</td>
</tr>
</table>

---

## Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare Pages                       │
│              Global CDN + Auto SSL + Headers              │
├─────────────────────────────────────────────────────────┤
│  Astro 6 (SSG)                                           │
│  ├── Pages        → Static HTML (zh / en / 404)          │
│  ├── Layout       → SEO meta, JSON-LD, OG, hreflang     │
│  └── Vue 3 Island → Interactive converter (client:visible)│
├─────────────────────────────────────────────────────────┤
│  TypeScript (strict)                                     │
│  ├── svgParser    → DOMParser + XSS detection            │
│  ├── canvasRenderer → Canvas 2D + sanitization           │
│  └── fileUtils    → Download + Clipboard API             │
├─────────────────────────────────────────────────────────┤
│  Vitest (50 tests) │ CSS Variables │ EditorConfig        │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 22.12.0
- **npm** (comes with Node.js)

### Development

```bash
git clone https://github.com/qiaoqiaobby/svg2img.git
cd svg2img/astro-site
npm install
npm run dev        # → http://localhost:4321
```

### Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production locally |
| `npm test` | Run 50 unit tests |
| `npm run test:watch` | Tests in watch mode |

---

## CI/CD: Auto Deploy Pipeline

Every push to `main` triggers the full pipeline via **GitHub Actions**:

```
git push origin main
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────────────┐
│   Checkout    │────▶│  npm test    │────▶│  npm run build       │
│   + Node 22  │     │  (50 tests)  │     │  (Astro SSG → dist/) │
└──────────────┘     └──────────────┘     └──────────┬───────────┘
                                                      │
                                                      ▼
                                          ┌──────────────────────┐
                                          │  wrangler pages      │
                                          │  deploy → Cloudflare │
                                          │  Pages CDN           │
                                          └──────────────────────┘
                                                      │
                                                      ▼
                                               svg2img.bult.dev
```

- **Push to `main`** → production deploy
- **Pull Request** → tests only (no deploy)

### First-Time Setup

<details>
<summary><b>1. Create Cloudflare Pages project</b></summary>

```bash
npx wrangler login
npx wrangler pages project create svg2img --production-branch=main
```

</details>

<details>
<summary><b>2. Add GitHub Secrets</b></summary>

Go to **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Where to find it |
|--------|-----------------|
| `CLOUDFLARE_API_TOKEN` | [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) → Create Token → **Edit Cloudflare Workers** template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard URL: `dash.cloudflare.com/<THIS_IS_YOUR_ID>` |

</details>

<details>
<summary><b>3. Custom domain (optional)</b></summary>

In Cloudflare Dashboard → **Workers & Pages** → **svg2img** → **Custom domains**:

```
Type:   CNAME
Name:   svg2img
Target: svg2img.pages.dev
Proxy:  Yes (orange cloud)
```

SSL is automatically provisioned.

</details>

---

## Project Structure

```
svg2img/
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline
├── astro-site/
│   ├── public/
│   │   ├── _headers            # Cloudflare security headers (CSP)
│   │   ├── _redirects          # /zh → /zh/, /en → /en/
│   │   └── robots.txt          # SEO + sitemap
│   ├── src/
│   │   ├── pages/              # SSG routes (zh, en, 404)
│   │   ├── layouts/            # BaseLayout (SEO, JSON-LD, OG)
│   │   ├── components/
│   │   │   ├── Hero.astro      # Header + theme toggle + GitHub link
│   │   │   ├── Faq.astro       # FAQ with JSON-LD FAQPage
│   │   │   └── converter/      # Vue 3 interactive island
│   │   │       ├── Converter.vue       # Orchestrator + error boundary
│   │   │       ├── UploadPanel.vue     # Upload / drag-drop / paste
│   │   │       ├── SettingsPanel.vue   # Scale, format, quality
│   │   │       ├── PreviewPanel.vue    # Preview + download + copy
│   │   │       └── useConverter.ts     # Composition API composable
│   │   ├── lib/                # Pure business logic
│   │   │   ├── svgParser.ts            # Parse + XSS detect + validate
│   │   │   ├── canvasRenderer.ts       # Canvas render + sanitize
│   │   │   ├── fileUtils.ts            # Download + clipboard
│   │   │   └── __tests__/              # 50 unit tests
│   │   ├── i18n/               # zh.ts + en.ts + types.ts
│   │   └── styles/             # globals.css + animations.css
│   ├── astro.config.mjs
│   ├── vitest.config.ts
│   ├── CONTRIBUTING.md
│   └── .editorconfig
├── CLAUDE.md                   # AI assistant context
└── README.md
```

---

## Security

### SVG Sanitization Pipeline

```
User Input (SVG file / pasted code)
       │
       ▼
┌─────────────────────────┐
│ containsJavascriptCode()│  Reject: javascript:, <script>,
│                         │  onerror=, onload=, eval(), ...
└────────────┬────────────┘
             │ pass
             ▼
┌─────────────────────────┐
│ sanitizeSvgContent()    │  Strip: 39+ event handlers,
│                         │  all <script> tags
└────────────┬────────────┘
             │ clean
             ▼
┌─────────────────────────┐
│ Canvas 2D Rendering     │  Safe data URL output
└─────────────────────────┘
```

### HTTP Security Headers

```
Content-Security-Policy:  default-src 'self'; img-src 'self' data: blob:; object-src 'none'
X-Content-Type-Options:   nosniff
X-Frame-Options:          DENY
Referrer-Policy:          strict-origin-when-cross-origin
Permissions-Policy:       camera=(), microphone=(), geolocation=()
```

---

## SEO

| Feature | Implementation |
|---------|---------------|
| Structured data | JSON-LD `WebApplication` + `FAQPage` |
| Social sharing | Open Graph + Twitter Card |
| i18n SEO | `hreflang` alternates (zh, en, x-default) |
| Canonical URLs | All pages |
| Sitemap | Auto-generated at `/sitemap-index.xml` |
| Robots | `robots.txt` with sitemap reference |

---

## Testing

```bash
cd astro-site && npm test
```

```
 ✓ src/lib/__tests__/svgParser.test.ts        (33 tests)
 ✓ src/lib/__tests__/canvasRenderer.test.ts    (12 tests)
 ✓ src/lib/__tests__/fileUtils.test.ts          (5 tests)

 Test Files  3 passed (3)
      Tests  50 passed (50)
```

Coverage focuses on security-critical paths: XSS detection, attribute sanitization, dimension parsing, format conversion.

---

## Contributing

See [CONTRIBUTING.md](astro-site/CONTRIBUTING.md) for architecture overview, code style guide, security checklist, and commit conventions.

---

## License

[MIT](LICENSE)

---

<div align="center">

Made with [Astro](https://astro.build/) + [Vue](https://vuejs.org/) + [Cloudflare Pages](https://pages.cloudflare.com/)

[Live Demo](https://svg2img.bult.dev) · [GitHub](https://github.com/qiaoqiaobby/svg2img)

</div>

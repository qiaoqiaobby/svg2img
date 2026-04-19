# SVG2IMG — SVG to Image Converter

> Convert SVG files to PNG, JPG, or WebP with configurable scale and quality. Bilingual (Chinese/English). Zero server upload — all processing happens in your browser.

**Live:** https://svg2img.bult.dev

---

## Features

- **Format conversion** — SVG to PNG / JPG / WebP
- **Scale control** — 1x, 1.5x, 2x, 2.5x, 3x output
- **Quality slider** — 1–100% for JPG/WebP
- **Multiple input methods** — file upload, drag-and-drop, paste SVG code
- **Clipboard copy** — one-click copy to clipboard
- **Bilingual UI** — Chinese (default) / English, auto-detected by browser language
- **Dark mode** — follows system preference
- **XSS protection** — SVG sanitization removes script tags and 39+ dangerous event handlers
- **Privacy** — no server upload, all conversion runs client-side via Canvas API

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 6](https://astro.build/) (Static Site Generation) |
| Interactive UI | [Vue 3](https://vuejs.org/) (Island Architecture, `client:visible`) |
| Language | TypeScript (strict mode) |
| Testing | [Vitest](https://vitest.dev/) + jsdom |
| Styling | Vanilla CSS with CSS Custom Properties (no Tailwind) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |

## Project Structure

```
astro-site/
├── public/
│   ├── _headers          # Cloudflare security headers (CSP, cache)
│   ├── _redirects        # URL redirects (/zh → /zh/)
│   ├── robots.txt        # SEO robots + sitemap
│   ├── favicon.svg
│   └── icons/
├── src/
│   ├── pages/
│   │   ├── index.astro       # Root — auto-redirect by browser language
│   │   ├── zh/index.astro    # Chinese page
│   │   ├── en/index.astro    # English page
│   │   └── 404.astro         # Not found
│   ├── layouts/
│   │   └── BaseLayout.astro  # SEO meta, OG, JSON-LD, hreflang
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Faq.astro         # FAQ with JSON-LD FAQPage
│   │   ├── Footer.astro
│   │   ├── LangSwitcher.astro
│   │   └── converter/
│   │       ├── Converter.vue     # Main orchestrator + error boundary
│   │       ├── UploadPanel.vue   # File upload / drag-drop / paste
│   │       ├── SettingsPanel.vue # Scale, format, quality controls
│   │       ├── PreviewPanel.vue  # Output preview + download/copy
│   │       ├── PasteDialog.vue   # SVG code paste dialog
│   │       └── useConverter.ts   # Composition API state management
│   ├── lib/
│   │   ├── svgParser.ts          # SVG parsing, XSS detection, validation
│   │   ├── canvasRenderer.ts     # Canvas rendering, sanitization, export
│   │   ├── fileUtils.ts          # Download + clipboard utilities
│   │   ├── animations.ts         # Ripple effect
│   │   └── __tests__/            # 50 unit tests
│   ├── i18n/
│   │   ├── types.ts     # Translation interface (60+ keys)
│   │   ├── zh.ts        # Chinese translations
│   │   ├── en.ts        # English translations
│   │   └── index.ts     # t(lang) helper
│   └── styles/
│       ├── globals.css      # Design system (CSS variables, components)
│       └── animations.css   # Animations (glow, ripple, stagger, reveal)
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── vitest.config.ts
├── .editorconfig
└── CONTRIBUTING.md
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 22.12.0 or higher
- npm (comes with Node.js)

### Local Development

```bash
# Clone the repo
git clone https://github.com/qiaoqiaobby/svg2img.git
cd svg2img/astro-site

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321

# Run tests
npm test

# Production build
npm run build

# Preview production build
npm run preview
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm test` | Run 50 unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

---

## Deployment to Cloudflare Pages

There are two deployment methods: **Wrangler CLI** (recommended for quick setup) and **GitHub integration** (recommended for continuous deployment).

### Method 1: Wrangler CLI (Manual Deploy)

Suitable for quick one-off deployments or initial setup.

#### Step 1: Install Wrangler

```bash
npm install -g wrangler
# or use npx (no install needed)
```

#### Step 2: Login to Cloudflare

```bash
wrangler login
# This opens a browser window for authentication
```

#### Step 3: Create the Pages project (first time only)

```bash
wrangler pages project create svg2img --production-branch=main
```

#### Step 4: Build and deploy

```bash
cd astro-site
npm run build
wrangler pages deploy dist/ --project-name=svg2img
```

You'll see output like:

```
Uploading... (15/15)
✨ Success! Uploaded 15 files
✨ Deployment complete! Take a peek over at https://xxxxxxxx.svg2img.pages.dev
```

The site is now live at `https://svg2img.pages.dev`.

---

### Method 2: GitHub Integration (Auto Deploy on Push)

Suitable for continuous deployment — every push to `main` triggers a new build.

#### Step 1: Push code to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/svg2img.git
git push -u origin main
```

#### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select your GitHub repository `svg2img`
3. Configure build settings:

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Build command | `cd astro-site && npm install && npm run build` |
| Build output directory | `astro-site/dist` |

4. Add environment variable:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `22` |

5. Click **Save and Deploy**

#### Step 3: Verify

After the first build completes (usually 1–2 minutes), your site is live at:

```
https://svg2img.pages.dev
```

#### Auto Deploy Workflow

After GitHub integration is set up, the workflow is simply:

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push

# Cloudflare Pages automatically:
# 1. Detects the push
# 2. Runs: cd astro-site && npm install && npm run build
# 3. Deploys astro-site/dist/ to the CDN
# 4. Updates https://svg2img.pages.dev (and custom domain)
```

Every push to `main` → production deployment.
Every push to other branches → preview deployment at `https://<branch>.svg2img.pages.dev`.

---

### Custom Domain Setup

To use a custom domain like `svg2img.bult.dev`:

1. In Cloudflare Dashboard → **Workers & Pages** → **svg2img** → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `svg2img.bult.dev`
4. If the domain's DNS is already on Cloudflare, the CNAME record is auto-configured
5. If not, add a CNAME record manually:

```
Type: CNAME
Name: svg2img
Target: svg2img.pages.dev
Proxy: Yes (orange cloud)
```

SSL certificate is automatically provisioned by Cloudflare.

---

## Security

### SVG Sanitization

All SVG input is processed through two layers of protection:

1. **`containsJavascriptCode()`** — rejects SVGs containing:
   - `javascript:` URIs
   - `<script>` tags
   - Event handlers (`onerror=`, `onload=`, `onclick=`, etc.)
   - `eval()` calls

2. **`sanitizeSvgContent()`** — strips from SVG before Canvas rendering:
   - All `<script>` tags
   - 39+ dangerous event handler attributes (onload, onerror, onclick, ondrag, onmouse*, etc.)

### HTTP Security Headers

Configured via `public/_headers` for Cloudflare Pages:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;
  connect-src 'self'; font-src 'self'; object-src 'none'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Privacy

- **Zero server uploads** — all SVG processing happens in the browser via Canvas 2D API
- **No tracking** — no analytics SDKs, no cookies (unless Cloudflare Analytics is enabled at the infrastructure level)
- **Data URL encoding** — images are generated as data URLs, not uploaded anywhere

## SEO

- **JSON-LD** structured data: `WebApplication` + `FAQPage` schemas
- **Open Graph** + **Twitter Card** meta tags
- **hreflang** alternate links for zh/en
- **Canonical URLs** on all pages
- **Auto-generated sitemap** at `/sitemap-index.xml`
- **robots.txt** with sitemap reference

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Architecture overview
- Code style guide
- Security checklist
- Testing instructions
- Commit conventions

## License

MIT

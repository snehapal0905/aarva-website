# Aarva Aerospace – Website

Static multi-page site built with [Astro](https://astro.build). It outputs plain HTML/CSS, so it's fast, good for SEO, and free to host.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build in /dist
npm run preview    # serve the build
```

Needs Node.js 22.23.4 or newer (Node 24 LTS recommended). Check with `node -v`.

## Where to edit things

| What | File |
|---|---|
| **All text & data** (machines, materials, industries, process, contact details) | `src/data/site.ts` |
| Colours, fonts, spacing | `src/styles/global.css` (tokens at the top under `:root`) |
| Header, footer, SEO tags, WhatsApp button | `src/layouts/Base.astro` |
| Pages | `src/pages/*.astro` |
| Part drawings (SVG illustrations) | `src/components/Blueprint.astro` |
| Machine table in the hero | `src/components/MachineWindow.astro` |

## Pages
`/` · `/capabilities/` · `/industries/` · `/how-we-work/` · `/quality/` · `/catalogue/` · `/contact/` · 404

## Deploy (preview link)

**Vercel:** push to GitHub → vercel.com → *Add New Project* → import the repo → Deploy. Astro is detected automatically.
**Netlify:** *Add new site → Import from Git* → build command `npm run build`, publish directory `dist`.

You get a link like `aarva-aerospace.vercel.app` to send the client.

## Preview mode (current)
- `isPreview: true` in `src/data/site.ts` adds `noindex` and a small "Design preview" label.
- `public/robots.txt` blocks search engines.

## Launch checklist
- [ ] `src/data/site.ts` → `isPreview: false`
- [ ] Replace `public/robots.txt` with the launch version (in the file's comments)
- [ ] Add the client's email in `site.email`
- [ ] Connect the quote form: create a Formspree / Web3Forms endpoint and paste it in `site.formEndpoint`
      (until then the form opens WhatsApp with the enquiry filled in)
- [ ] Replace the gradient logo square with the real logo (`.brand-mark` in Base.astro + `public/favicon.svg`)
- [ ] Add real shop-floor and part photos (keep the drawings as a fallback)
- [ ] Confirm with the client: client list on the home page, "MSME / GST registered", 24-hour reply promise
- [ ] Point aarvaaerospace.com DNS to Vercel/Netlify and add it in the hosting dashboard
- [ ] Submit `https://aarvaaerospace.com/sitemap-index.xml` in Google Search Console

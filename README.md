# Actx0 Website

Vue 3 + Vite marketing site for Vercel (`actx0.com`).
Product app CTAs point at `VITE_APP_URL` (default `https://app.actx0.com`).

## Local

```bash
cp .env.example .env
npm install
npm run dev
```

## Vercel

- Build command: `npm run build`
- Output directory: `dist`
- Set env `VITE_APP_URL` to the app origin (e.g. `https://app.actx0.com`)
- Optional: set `VITE_DOCS_URL` (default `https://docs.actx0.com`)
- Optional: set `VITE_STATUS_URL` (default `https://status.actx0.com`)
- Enable **Web Analytics** and **Speed Insights** in the Vercel project dashboard; both load after visitors accept analytics cookies
- Google Analytics (`G-2YXJJ248DY`) also loads only after analytics cookie consent
- Submit `https://actx0.com/sitemap.xml` in Google Search Console (`robots.txt` already references it)

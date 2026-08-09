# Actx0 public website

Vue 3 + Vite marketing site for Vercel (`actx0.com`).
Product app CTAs point at `VITE_APP_URL` (default `https://app.actx0.com`).

## Local

```bash
cd web/website
cp .env.example .env
npm install
npm run dev
```

## Vercel

- Root directory: `web/website`
- Build command: `npm run build`
- Output directory: `dist`
- Set env `VITE_APP_URL` to the app origin (e.g. `https://app.actx0.com`)
- Optional: set `VITE_DOCS_URL` (default `https://docs.actx0.com`)
- Enable **Web Analytics** in the Vercel project dashboard; pageviews load after visitors accept analytics cookies

# remembered8.com

Remembered is a living digital memory archive: a dignified place to preserve a
person's story, timeline, voice, photographs, family tree and the memories other
people carry of them.

React 19 + Vite 6 + Tailwind 4 on the client, an Express server that also hosts
a handful of Gemini-backed writing helpers (biography, timeline extraction,
memory polishing, photo captioning).

## Running it

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:3000, Vite in middleware mode
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run build` | Builds the client with Vite into `dist/client` |
| `npm run preview` | `wrangler dev` — runs the real Worker locally against the built assets |
| `npm run deploy` | Builds, then `wrangler deploy` |
| `npm run lint` | Regenerates Worker types, then type checks the client and the Worker |
| `npm run build:node` | Also bundles `server.ts` to `dist/server.cjs`, for running the Express server standalone |
| `npm start` | Runs that Node bundle |

## Configuration

Everything lives in `.env`; see `.env.example` for the annotated list.

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | for AI features | Server-side Gemini calls, local only. Production reads it from a Worker secret, see Deployment. |
| `GEMINI_MODEL` | no | Overrides the default model id. |
| `APP_URL` | no | Public origin, for self-referential links. |
| `VITE_SITE_URL` | no | Public origin for canonical URLs and the sitemap. |
| `VITE_GA4_ID` | no | Google Analytics 4 measurement id (`G-…`). |
| `VITE_CLARITY_ID` | no | Microsoft Clarity project id. |
| `VITE_META_PIXEL_ID` | no | Meta (Facebook) Pixel id. |

The three measurement ids are optional by design: an empty value means that tag
is never loaded, so a fresh clone runs with no third-party requests at all.

## Consent and measurement

Analytics is consent-gated end to end. The pieces:

- `src/lib/consent.ts` — the consent store. Persists the visitor's decision in
  `localStorage` under `remembered_consent`, versioned so that adding a tag
  forces a re-ask. Everything else subscribes to it.
- `src/lib/analytics.ts` — the tag layer. Loads GA4 + Clarity on `analytics`
  consent and the Meta Pixel on `marketing` consent, and pushes Google Consent
  Mode v2 updates on every change.
- `src/components/CookieConsent.tsx` — the banner and the per-category
  preferences panel, bilingual TR/EN.
- `src/components/LegalNoticeModal.tsx` — the privacy notice and cookie policy,
  reachable from the footer and from the banner.
- `index.html` — publishes deny-all Consent Mode defaults before anything else
  can run.

Two deliberate choices worth knowing about:

1. **No third-party script loads before consent.** Consent Mode v2 would permit
   loading `gtag.js` with denied defaults for behavioural modelling. We do not:
   on a first visit, and after a rejection, nothing is fetched from Google,
   Microsoft or Meta.
2. **Withdrawal takes effect immediately for collection, and fully on reload.**
   Consent Mode flips back to denied and the Meta Pixel is sent a `revoke`, but
   a script already parsed by the browser cannot be unloaded, so the clean state
   arrives with the next page load.

To add a tag: load it from `applyConsent` in `src/lib/analytics.ts` under the
right category, add its row to the cookie table in `LegalNoticeModal.tsx`, and
bump `CONSENT_VERSION` in `src/lib/consent.ts` so existing visitors are asked
again.

### Before going live

- Fill in the `CONTROLLER` block at the top of
  `src/components/LegalNoticeModal.tsx` with the real legal entity, address and
  contact address. A privacy notice with no identifiable controller does not
  satisfy GDPR Art. 13 or KVKK Art. 10.
- Have the notice reviewed by someone qualified. The text ships as a solid
  starting draft, not as legal advice.
- Replace `public/favicon.svg` and add `public/icon-192.png`,
  `public/icon-512.png` (referenced by `manifest.json`) and
  `public/og-image.png` (1200x630, referenced by the Open Graph tags).

## Deployment

Production is a Cloudflare Worker with static assets, serving `remembered8.com`
and `www.remembered8.com` as custom domains. `wrangler.jsonc` is the source of
truth; the DNS records for both hostnames were created by the first deploy.

There is no CI: deploys are manual, from a machine authenticated to the
Cloudflare account.

```bash
npx wrangler login   # once per machine
npm run deploy
```

`npm run preview` runs the same Worker locally (`wrangler dev`) so the API
routing and the SPA fallback can be exercised before shipping.

### What runs where

Static assets are served by the edge without invoking Worker code. Only the
paths in `assets.run_worker_first` (`/api/*`) reach `worker/index.ts`; anything
else that matches no asset falls back to `index.html`, which is what a
client-routed SPA needs.

### Two things that bite

**Tracking ids are compiled in, not read at runtime.** `VITE_GA4_ID`,
`VITE_CLARITY_ID` and `VITE_META_PIXEL_ID` are inlined by Vite at build time.
Setting them in `.env` does nothing to an already-deployed build: put them in
`.env`, then `npm run deploy` again. As of the first deploy all three are empty,
so no tag loads on the live site regardless of what a visitor consents to.

**`GEMINI_API_KEY` is a Worker secret, not an `.env` value.** `.env` only
reaches the local Express server. The Worker needs it set separately, once:

```bash
npx wrangler secret put GEMINI_API_KEY
```

Until then `/api/gemini/*` answers `503` with an explanatory `details` field and
the rest of the site is unaffected. `/api/health` reports `geminiConfigured` so
you can check without triggering a model call.

The model id (`gemini-3.7-flash`, carried over from the original prototype) is
overridable with `GEMINI_MODEL` if it is ever retired, in `.env` for local and
as a Worker secret or var for production.

## Layout

```
index.html            SEO/OG head, Consent Mode defaults, app mount
wrangler.jsonc        Worker config: assets, routing, custom domains
worker/index.ts       production entry: /api/* then static assets
server.ts             local dev: Vite middleware + the same /api/* handlers
public/               manifest, robots.txt, sitemap.xml, icons
src/
  App.tsx             top-level state, view switching, modal wiring
  components/         sections and modals
  data/               seeded memorial fixtures
  server/
    gemini.ts         prompts, schemas and handlers shared by both runtimes
  lib/
    i18n.ts           EN/TR dictionaries
    consent.ts        consent store
    analytics.ts      consent-gated GA4 / Clarity / Meta Pixel
docs/                 internal go-to-market material (git-ignored)
```

`tsconfig.json` covers the client and `server.ts`; `tsconfig.worker.json` covers
the Worker. They are separate because the Workers runtime types redefine
`Response`, `fetch` and friends, and letting those into the client's global type
space breaks inference on ordinary browser code.

## Provenance

Started from the AI Studio prototype handed over by Ugur (kept alongside this
repo as `../ugur/`). The AI Studio scaffolding (`metadata.json`, `assets/`) has
been dropped; the application code is otherwise the same lineage.

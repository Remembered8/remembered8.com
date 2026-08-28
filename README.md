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
| `npm run build` | Builds the client with Vite and bundles `server.ts` to `dist/server.cjs` |
| `npm start` | Runs the production bundle |
| `npm run lint` | `tsc --noEmit` type check |

## Configuration

Everything lives in `.env`; see `.env.example` for the annotated list.

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | for AI features | Server-side Gemini calls. Missing key means the `/api/gemini/*` endpoints fail; the rest of the app is unaffected. |
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

## Layout

```
index.html            SEO/OG head, Consent Mode defaults, app mount
server.ts             Express: static hosting + /api/gemini/* endpoints
public/               manifest, robots.txt, sitemap.xml, icons
src/
  App.tsx             top-level state, view switching, modal wiring
  components/         sections and modals
  data/               seeded memorial fixtures
  lib/
    i18n.ts           EN/TR dictionaries
    consent.ts        consent store
    analytics.ts      consent-gated GA4 / Clarity / Meta Pixel
docs/                 internal go-to-market material
```

## Provenance

Started from the AI Studio prototype handed over by Ugur (kept alongside this
repo as `../ugur/`). The AI Studio scaffolding (`metadata.json`, `assets/`) has
been dropped; the application code is otherwise the same lineage.

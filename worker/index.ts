/**
 * Cloudflare Worker entry point for remembered8.com.
 *
 * Static assets are served by the runtime before this code runs, except for the
 * paths listed in `assets.run_worker_first` (see wrangler.jsonc) which land
 * here. Anything unmatched falls back to the SPA's index.html.
 */

import { handleGeminiRoute, isGeminiRoute } from '../src/server/gemini';

export interface Env {
  ASSETS: Fetcher;
  /** Set with `wrangler secret put GEMINI_API_KEY`. */
  GEMINI_API_KEY?: string;
  /** Optional model override, e.g. when the default model is retired. */
  GEMINI_MODEL?: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return json({
        status: 'ok',
        service: 'Remembered Memory Archive',
        runtime: 'cloudflare-worker',
        geminiConfigured: Boolean(env.GEMINI_API_KEY),
        time: new Date().toISOString(),
      });
    }

    if (isGeminiRoute(url.pathname)) {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed.' }, 405);
      }

      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return json({ error: 'Request body must be valid JSON.' }, 400);
      }

      const result = await handleGeminiRoute(url.pathname, body, {
        apiKey: env.GEMINI_API_KEY || '',
        model: env.GEMINI_MODEL,
      });
      return json(result.body, result.status);
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ error: 'Unknown endpoint.' }, 404);
    }

    // Not an API route: hand back to static assets / SPA fallback.
    return env.ASSETS.fetch(request);
  },
};

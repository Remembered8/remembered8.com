/**
 * Local development server.
 *
 * Runs Vite in middleware mode and mounts the Gemini helper endpoints on top.
 * Production is served by the Cloudflare Worker in worker/index.ts, which uses
 * the same handlers from src/server/gemini.ts; keep the two in step.
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { handleGeminiRoute, isGeminiRoute } from './src/server/gemini';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '25mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Remembered Memory Archive',
    runtime: 'node',
    time: new Date().toISOString(),
  });
});

app.post('/api/gemini/:helper', async (req, res) => {
  const route = `/api/gemini/${req.params.helper}`;
  if (!isGeminiRoute(route)) {
    res.status(404).json({ error: 'Unknown endpoint.' });
    return;
  }

  const result = await handleGeminiRoute(route, req.body, {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL,
  });
  res.status(result.status).json(result.body);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist', 'client');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Remembered platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

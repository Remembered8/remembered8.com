/**
 * The Gemini-backed writing helpers, shared by both runtimes.
 *
 * `server.ts` (Node/Express, local development) and `worker/index.ts`
 * (Cloudflare Workers, production) are thin transport wrappers around this
 * module, so the prompts and response schemas exist in exactly one place.
 *
 * Prompts and schemas are carried over verbatim from the original AI Studio
 * server; behaviour here is deliberately unchanged.
 */

import { GoogleGenAI, Type } from '@google/genai';

/** Model used for every helper. Override with GEMINI_MODEL if it is retired. */
export const DEFAULT_MODEL = 'gemini-3.7-flash';

export interface GeminiConfig {
  apiKey: string;
  model?: string;
}

export interface GeminiResult {
  status: number;
  body: unknown;
}

function createClient(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'remembered8-server',
      },
    },
  });
}

async function generateJson(
  config: GeminiConfig,
  prompt: string,
  responseSchema: Record<string, unknown>,
  fallback: string,
): Promise<unknown> {
  const ai = createClient(config.apiKey);
  const response = await ai.models.generateContent({
    model: config.model || DEFAULT_MODEL,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: responseSchema as never,
    },
  });
  return JSON.parse(response.text || fallback);
}

// --- Biography ---------------------------------------------------------------

export interface BiographyInput {
  name?: string;
  birthYear?: string;
  deathYear?: string;
  profession?: string;
  hometown?: string;
  memories?: string;
  tone?: string;
}

function biographyPrompt(input: BiographyInput): string {
  return `Sen 'Remembered' (İnsanların Yaşayan Dijital Anı ve Yaşam Arşivi) platformunun baş biyografi ve anı yazarı uzmanısın.
Asla yapay, aşırı dramatik veya klişe cenaze/ölüm sözleri (ölü, mezar, acı, kayıp) kullanma. Bunun yerine sevgiyle, saygıyla, zarafetle ve kişinin hayata kattığı güzellikleri yücelten 'Apple sadeliği ve Wikipedia doğruluğu' ile edebi ve akıcı bir yaşam hikayesi yaz.

Kişi Bilgileri:
- İsim: ${input.name || 'Bilinmeyen'}
- Doğum/Vefat: ${input.birthYear || ''} — ${input.deathYear || ''}
- Meslek/Uğraş: ${input.profession || ''}
- Memleket/Şehir: ${input.hometown || ''}
- Yakınlarının aktardığı anılar ve notlar: ${input.memories || 'Ömrünü ailesine, mesleğine ve insanlara sevgiyle adamış değerli bir insan.'}

Görev:
1. 'lifeQuote': Kişinin hayat felsefesini özetleyen tek cümlelik çok zarif bir motto/cümle (Örn: 'Hayatı boyunca insanlara umut olmayı seçti.')
2. 'biography': 3-4 paragraflık, derinlikli, saygılı ve ilham veren yaşam hikayesi.
3. 'suggestedMilestones': Kişinin hayatından çıkarılabilecek 3-5 adet dönüm noktası (year, title, description).

Lütfen geçerli bir JSON yanıtı döndür.`;
}

const BIOGRAPHY_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    lifeQuote: { type: Type.STRING },
    biography: { type: Type.STRING },
    suggestedMilestones: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          year: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['year', 'title', 'description'],
      },
    },
  },
  required: ['lifeQuote', 'biography'],
};

// --- Timeline ----------------------------------------------------------------

export interface TimelineInput {
  personName?: string;
  rawStory?: string;
}

function timelinePrompt(input: TimelineInput): string {
  return `Aşağıdaki yaşam metnini ve anlatılanları incele. '${input.personName || 'Kişi'}' için kronolojik bir hayat zaman çizelgesi (timeline) oluştur.
Her olay için kesin veya tahmini yıl, kategori ('life' | 'career' | 'family' | 'travel' | 'creation' | 'milestone'), başlık ve 1-2 cümlelik açıklama çıkar.

Metin:
${input.rawStory}`;
}

const TIMELINE_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      year: { type: Type.STRING },
      title: { type: Type.STRING },
      category: { type: Type.STRING },
      description: { type: Type.STRING },
      location: { type: Type.STRING },
    },
    required: ['year', 'title', 'category', 'description'],
  },
};

// --- Memory polishing --------------------------------------------------------

export interface EnhanceMemoryInput {
  personName?: string;
  relation?: string;
  rawMemory?: string;
}

function enhanceMemoryPrompt(input: EnhanceMemoryInput): string {
  return `Sen Remembered anı defterinde bir yakının yazdığı samimi anıyı nazikçe güzelleştiren, imla ve duygusal akışını pürüzsüzleştiren bir asistansın.
Yazarın özgün duygusunu, detaylarını ve samimiyetini ASLA bozma, sadece daha akıcı, mektup zarafetinde ve dokunaklı hale getir.

Kişi: ${input.personName}
Yazarın Yakınlığı: ${input.relation}
Yazılan Ham Anı:
"${input.rawMemory}"

Lütfen geliştirilmiş metni ve yazar için 1 öneri başlığı JSON olarak döndür:
{
  "enhancedText": "...",
  "suggestedTitle": "..."
}`;
}

const ENHANCE_MEMORY_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    enhancedText: { type: Type.STRING },
    suggestedTitle: { type: Type.STRING },
  },
  required: ['enhancedText'],
};

// --- Photo captioning --------------------------------------------------------

export interface AnalyzePhotoInput {
  personName?: string;
  approximateYear?: string;
  promptContext?: string;
}

function analyzePhotoPrompt(input: AnalyzePhotoInput): string {
  return `Aşağıdaki fotoğraf bilgisi için Remembered yaşam arşivine uygun, sıcak ve müzebilim/arşiv standardında bir altyazı ve hikaye oluştur.
Kişi: ${input.personName}
Dönem / Yıl: ${input.approximateYear || 'Bilinmiyor'}
Bağlam Notu: ${input.promptContext || 'Eski bir aile albümü karesi'}

JSON formatında döndür:
{
  "caption": "Kısa arşiv başlığı",
  "historicalContext": "Fotoğrafın yansıttığı dönem atmosferi ve anı değeri hakkında 1-2 cümle",
  "suggestedTags": ["aile", "1970ler", ...]
}`;
}

const ANALYZE_PHOTO_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    caption: { type: Type.STRING },
    historicalContext: { type: Type.STRING },
    suggestedTags: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ['caption', 'historicalContext'],
};

// --- Routing -----------------------------------------------------------------

interface RouteDefinition {
  buildPrompt: (body: never) => string;
  schema: Record<string, unknown>;
  /** Parsed when the model returns nothing, so the shape stays predictable. */
  emptyResult: string;
  /** Wraps the parsed value; the timeline endpoint nests its array. */
  shape?: (parsed: unknown) => unknown;
  /** Message returned to the client when the call fails. */
  errorMessage: string;
}

const ROUTES: Record<string, RouteDefinition> = {
  '/api/gemini/biography': {
    buildPrompt: biographyPrompt as (body: never) => string,
    schema: BIOGRAPHY_SCHEMA,
    emptyResult: '{}',
    errorMessage: 'Biyografi oluşturulurken bir hata meydana geldi.',
  },
  '/api/gemini/timeline': {
    buildPrompt: timelinePrompt as (body: never) => string,
    schema: TIMELINE_SCHEMA,
    emptyResult: '[]',
    shape: (parsed) => ({ milestones: parsed }),
    errorMessage: 'Zaman çizelgesi oluşturulamadı.',
  },
  '/api/gemini/enhance-memory': {
    buildPrompt: enhanceMemoryPrompt as (body: never) => string,
    schema: ENHANCE_MEMORY_SCHEMA,
    emptyResult: '{}',
    errorMessage: 'Anı düzenlenirken bir hata oluştu.',
  },
  '/api/gemini/analyze-photo': {
    buildPrompt: analyzePhotoPrompt as (body: never) => string,
    schema: ANALYZE_PHOTO_SCHEMA,
    emptyResult: '{}',
    errorMessage: 'Fotoğraf analizi yapılamadı.',
  },
};

/** True when `path` is one of the Gemini helper endpoints. */
export function isGeminiRoute(path: string): boolean {
  return path in ROUTES;
}

/**
 * Runs one Gemini helper. Never throws: transport errors come back as a
 * `{ status: 500, body: { error, details } }` result the caller can serialise.
 */
export async function handleGeminiRoute(
  path: string,
  body: unknown,
  config: GeminiConfig,
): Promise<GeminiResult> {
  const route = ROUTES[path];
  if (!route) {
    return { status: 404, body: { error: 'Unknown endpoint.' } };
  }

  if (!config.apiKey) {
    return {
      status: 503,
      body: {
        error: route.errorMessage,
        details: 'GEMINI_API_KEY is not configured on the server.',
      },
    };
  }

  try {
    const prompt = route.buildPrompt(body as never);
    const parsed = await generateJson(config, prompt, route.schema, route.emptyResult);
    return { status: 200, body: route.shape ? route.shape(parsed) : parsed };
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    console.error(`Gemini request failed for ${path}:`, details);
    return { status: 500, body: { error: route.errorMessage, details } };
  }
}

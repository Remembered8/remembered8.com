import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Gemini features will return fallback content.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Remembered Memory Archive", time: new Date().toISOString() });
});

// AI Biography generator
app.post("/api/gemini/biography", async (req, res) => {
  try {
    const { name, birthYear, deathYear, profession, hometown, memories, tone } = req.body;
    const ai = getAIClient();

    const prompt = `Sen 'Remembered' (İnsanların Yaşayan Dijital Anı ve Yaşam Arşivi) platformunun baş biyografi ve anı yazarı uzmanısın.
Asla yapay, aşırı dramatik veya klişe cenaze/ölüm sözleri (ölü, mezar, acı, kayıp) kullanma. Bunun yerine sevgiyle, saygıyla, zarafetle ve kişinin hayata kattığı güzellikleri yücelten 'Apple sadeliği ve Wikipedia doğruluğu' ile edebi ve akıcı bir yaşam hikayesi yaz.

Kişi Bilgileri:
- İsim: ${name || 'Bilinmeyen'}
- Doğum/Vefat: ${birthYear || ''} — ${deathYear || ''}
- Meslek/Uğraş: ${profession || ''}
- Memleket/Şehir: ${hometown || ''}
- Yakınlarının aktardığı anılar ve notlar: ${memories || 'Ömrünü ailesine, mesleğine ve insanlara sevgiyle adamış değerli bir insan.'}

Görev:
1. 'lifeQuote': Kişinin hayat felsefesini özetleyen tek cümlelik çok zarif bir motto/cümle (Örn: 'Hayatı boyunca insanlara umut olmayı seçti.')
2. 'biography': 3-4 paragraflık, derinlikli, saygılı ve ilham veren yaşam hikayesi.
3. 'suggestedMilestones': Kişinin hayatından çıkarılabilecek 3-5 adet dönüm noktası (year, title, description).

Lütfen geçerli bir JSON yanıtı döndür.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
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
                required: ["year", "title", "description"],
              },
            },
          },
          required: ["lifeQuote", "biography"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini biography generation error:", error);
    res.status(500).json({
      error: "Biyografi oluşturulurken bir hata meydana geldi.",
      details: error.message,
    });
  }
});

// AI Timeline Extractor
app.post("/api/gemini/timeline", async (req, res) => {
  try {
    const { personName, rawStory } = req.body;
    const ai = getAIClient();

    const prompt = `Aşağıdaki yaşam metnini ve anlatılanları incele. '${personName || 'Kişi'}' için kronolojik bir hayat zaman çizelgesi (timeline) oluştur.
Her olay için kesin veya tahmini yıl, kategori ('life' | 'career' | 'family' | 'travel' | 'creation' | 'milestone'), başlık ve 1-2 cümlelik açıklama çıkar.

Metin:
${rawStory}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
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
            required: ["year", "title", "category", "description"],
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || "[]");
    res.json({ milestones: parsed });
  } catch (error: any) {
    console.error("Gemini timeline generation error:", error);
    res.status(500).json({ error: "Zaman çizelgesi oluşturulamadı.", details: error.message });
  }
});

// AI Memory Polisher / Companion
app.post("/api/gemini/enhance-memory", async (req, res) => {
  try {
    const { personName, relation, rawMemory } = req.body;
    const ai = getAIClient();

    const prompt = `Sen Remembered anı defterinde bir yakının yazdığı samimi anıyı nazikçe güzelleştiren, imla ve duygusal akışını pürüzsüzleştiren bir asistansın.
Yazarın özgün duygusunu, detaylarını ve samimiyetini ASLA bozma, sadece daha akıcı, mektup zarafetinde ve dokunaklı hale getir.

Kişi: ${personName}
Yazarın Yakınlığı: ${relation}
Yazılan Ham Anı:
"${rawMemory}"

Lütfen geliştirilmiş metni ve yazar için 1 öneri başlığı JSON olarak döndür:
{
  "enhancedText": "...",
  "suggestedTitle": "..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            enhancedText: { type: Type.STRING },
            suggestedTitle: { type: Type.STRING },
          },
          required: ["enhancedText"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini memory enhancement error:", error);
    res.status(500).json({ error: "Anı düzenlenirken bir hata oluştu.", details: error.message });
  }
});

// AI Photo Archival Caption & Context
app.post("/api/gemini/analyze-photo", async (req, res) => {
  try {
    const { personName, approximateYear, promptContext } = req.body;
    const ai = getAIClient();

    const prompt = `Aşağıdaki fotoğraf bilgisi için Remembered yaşam arşivine uygun, sıcak ve müzebilim/arşiv standardında bir altyazı ve hikaye oluştur.
Kişi: ${personName}
Dönem / Yıl: ${approximateYear || 'Bilinmiyor'}
Bağlam Notu: ${promptContext || 'Eski bir aile albümü karesi'}

JSON formatında döndür:
{
  "caption": "Kısa arşiv başlığı",
  "historicalContext": "Fotoğrafın yansıttığı dönem atmosferi ve anı değeri hakkında 1-2 cümle",
  "suggestedTags": ["aile", "1970ler", ...]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            historicalContext: { type: Type.STRING },
            suggestedTags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["caption", "historicalContext"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini photo analysis error:", error);
    res.status(500).json({ error: "Fotoğraf analizi yapılamadı.", details: error.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Remembered platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

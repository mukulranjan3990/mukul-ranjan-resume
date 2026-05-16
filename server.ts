import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';
import { resumeData } from './src/data';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post('/api/resume/analyze', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    const prompt = `
      You are an expert recruiter for top tech companies. 
      Analyze the provided job description and Mukul Ranjan's resume data.
      Provide a match report including:
      1. Overall match score (percentage).
      2. Key matching skills.
      3. Missing keywords or areas for improvement.
      4. A short "Elevator Pitch" for Mukul specifically for this role.

      Mukul's Resume Data:
      ${JSON.stringify(resumeData)}

      Job Description:
      ${jobDescription}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            matches: { type: Type.ARRAY, items: { type: Type.STRING } },
            gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
            pitch: { type: Type.STRING }
          },
          required: ["score", "matches", "gaps", "pitch"]
        }
      }
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Vite Middleware for Dev
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

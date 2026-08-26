import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let genAIClient: GoogleGenAI | null = null;

function getGenAI() {
  if (!genAIClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    genAIClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "portfolio-production-engine",
        },
      },
    });
  }
  return genAIClient;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 5173;

  // JSON middleware
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Store contact submissions in memory
  const contactSubmissions: any[] = [];

  // AI Companion Chatbot Endpoint with specialized Ruthvik background
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, currentSection, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required." });
      }

      const ai = getGenAI();

      // Formulate some contextualized model prompt history or standard messages list
      const formattedContents = [];
      
      // Let's pass the historical context in the contents
      if (history && Array.isArray(history)) {
        for (const h of history) {
          formattedContents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        }
      }
      
      // If history is empty, push standard greeting
      if (formattedContents.length === 0) {
        formattedContents.push({
          role: 'model',
          parts: [{ text: "System Online. Greetings! I am Ruthvik's AI Companion. How can I assist your transmission?" }]
        });
      }

      // Append user's current message
      formattedContents.push({
        role: 'user',
        parts: [{ text: `[Viewport Section Focus: ${currentSection || 'none'}]\n\nUser Question: ${message}` }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: `You are the Cybernetic Assistant & AI Companion of Ruthvik Goud, built with custom microsecond-scale avionics and neural-agent capabilities.
Your personality is highly helpful, professional, slightly futuristic, and ECE-oriented (uses occasional terms such as "telemetry checks", "core logs", "transmitting", "signal lines").
Never break character. Answer questions about Ruthvik Goud using his personal dossiers detail.

Ruthvik Goud Dossier details:
- NAME: Ruthvik Goud
- EMAIL: bathiniruthvik380@gmail.com
- LINKEDIN: https://linkedin.com/in/ruthvikgoud16
- GITHUB: https://github.com/ruthvikgoud16
- EDUCATION: First Year ECE student at Anurag University, Hyderabad. B.Tech 2026-2030.
- PRIMARY WORK: AI Engineering Intern at Nimblize (May 2026 – Present). Builds multi-agent product intelligence: FastAPI, LangGraph, PostgreSQL, Redis, Gemini, RAG, vector embeddings. This is his most important professional role.
- SECONDARY WORK: Data Analyst Intern at Bluestock Fintech (Present). SQL reports, dashboards, data cleaning and validation.
- LEADERSHIP: OnePlus Student Ambassador (selected among ~100 nationwide); Unstop Campus Champion.
- PHONE: +91 9392796458
- FLAGSHIP PROJECTS:
  1) Pramāṇa — evidence-gated enterprise multi-agent system. Authorization before retrieval. Privacy Gate → Auth → Hybrid GraphRAG → Draft → Verify → FactCheck → Govern. Refuses when evidence is insufficient.
  2) Nimblize platform — internship product (same stack as the intern role).
  3) ResilienceGraph — infrastructure ontology for cascading failures.
  4) AutoOps — multi-agent enterprise automation (LangGraph, NVIDIA NIM).
  5) TalentLens X — weighted candidate ranking (Career 35%, Recruitability 25%, Skills 25%, Semantic 15%).
  6) Aero Dot — ESP32 drone with ToF sensing and PID control.
  7) Nafithah, PortPulse, Carbon Intelligence suite, Arduino distance sensor, safety bracelet concept.
- SKILLS: LangGraph, GraphRAG, Python, React/TypeScript, FastAPI, Redis, Docker, Power BI, AWS fundamentals, C/embedded basics.
- NEVER mention Concentrix, Google Process, SNIST/Sreenidhi, CrisisOS, or hackathon wins. Do not invent awards.

Answer concisely (within 2-3 sentences if possible). If asked questions that are completely unrelated to Ruthvik or ECE/AI, politely steer back to his qualifications, skills, or portfolio insights.`
        }
      });

      res.json({
        reply: response.text || "I am experiencing localized connection decay. Please try again.",
        status: "complete"
      });
    } catch (e: any) {
      console.error("Gemini Chat API Error:", e);
      // Fallback with friendly message if API is offline or key is missing
      res.json({
        reply: `Telemetry interrupted. Local cache: Ruthvik is an ECE student at Anurag University and AI & Automation Intern at Nimblize. LinkedIn: linkedin.com/in/ruthvikgoud16. Ask about Pramāṇa or his Nimblize internship.`,
        status: "complete"
      });
    }
  });

  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email and message are required." });
      }

      const entry = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject: subject || "No Subject",
        message,
        timestamp: new Date().toISOString()
      };

      contactSubmissions.push(entry);
      console.log("Telemetry Received: New contact submission signal:", entry);

      res.status(200).json({
        status: "ok",
        message: "Signal recorded successfully",
        id: entry.id
      });
    } catch (e: any) {
      console.error("Contact API Server Error:", e);
      res.status(500).json({ error: "Failed to record signal payload." });
    }
  });

  // Real agent endpoint
  app.post("/api/agent/task", async (req, res) => {
    try {
        const { task } = req.body;
        if (!task || typeof task !== "string" || !task.trim()) {
            return res.status(400).json({ error: "Task content is required." });
        }
        const ai = getGenAI();
        const result = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: task,
            config: {
                systemInstruction: "You are the AutoOps Supervisor Agent, an enterprise-grade automation platform. Break down the user's request into tasks for Planner, Retriever, Execution, Validation, and Supervisor agents. Briefly describe the steps taken and provide the final output."
            }
        });

        res.json({
            result: result.text || "No output generated by agent.",
            status: "complete"
        });
    } catch (e: any) {
        console.error("Gemini API Error:", e);
        res.status(500).json({ error: e.message || "Failed to process task." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
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

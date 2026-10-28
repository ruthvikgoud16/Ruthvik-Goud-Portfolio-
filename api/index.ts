import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();

// JSON parsing middleware
app.use(express.json());

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

// Memory cache for submissions inside short-lived container sessions
const contactSubmissions: any[] = [];

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", serverless: true });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, currentSection, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGenAI();
    const formattedContents = [];
    
    if (history && Array.isArray(history)) {
      for (const h of history) {
        formattedContents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }
    
    if (formattedContents.length === 0) {
      formattedContents.push({
        role: 'model',
        parts: [{ text: "System Online. Greetings! I am Ruthvik's AI Companion. How can I assist your transmission?" }]
      });
    }

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
- INCOMING WORK: AI Engineer Intern at Sydon AI, starting 28 Oct 2026 for six months. Onboarding is not confirmed complete, so do not describe it as a current or completed job. Planned focus: retrieval connected to business data, document processing, source attribution, and answer reliability. Do not claim shipped features.
- COMPLETED: AI & Automation Intern at Nimblize, started May 2026. End month is unknown. Explored competitor intelligence and recommendation workflows with FastAPI, LangGraph, PostgreSQL, Redis, RAG. Do not claim production metrics.
- COMPLETED: Data Analyst Intern at Bluestock Fintech, year 2026 only. Mutual fund analytics: data processing, SQL, cleaning, dashboards. Exact months are unknown. Do not invent dates.
- LEADERSHIP: OnePlus Student Ambassador (selected among ~100 nationwide); Unstop Campus Champion; Assistant Coordinator at React Hyderabad.
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

Answer concisely (within 2-3 sentences if possible).
SCOPE RULES:
- Answer only questions about Ruthvik Goud, his education, internships, projects, skills, contact info, communities, or ECE/AI work shown on this portfolio.
- If the question is outside that scope (general trivia, unrelated coding help, politics, other people, homework, etc.), do NOT invent an answer.
- For out-of-scope questions, reply exactly in this style: "That sits outside what I can answer about Ruthvik's portfolio. Email him directly at bathiniruthvik380@gmail.com and he'll reply himself." Always include the email address.`
      }
    });

    res.json({
      reply: response.text || "I am experiencing localized connection decay. Please try again.",
      status: "complete"
    });
  } catch (e: any) {
    console.error("Vercel Chat API Offline/Error:", e);
    res.json({
      reply: `Ruthvik is an ECE student at Anurag University and an incoming AI Engineer Intern at Sydon AI (starts 28 Oct 2026). Completed internships: Nimblize and Bluestock Fintech. LinkedIn: linkedin.com/in/ruthvikgoud16.`,
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
    console.error("Vercel Contact API Error:", e);
    res.status(500).json({ error: "Failed to record signal payload." });
  }
});

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
    console.error("Vercel Agent API Error:", e);
    res.status(500).json({ error: e.message || "Failed to process task." });
  }
});

export default app;

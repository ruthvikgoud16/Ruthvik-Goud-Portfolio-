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
  const PORT = 3000;

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
- EDUCATION: First Year - First Semester ECE student at Sreenidhi Institute of Science and Technology (SNIST), Hyderabad. Graduation expected 2029. Study areas: Basic Electronics, Problem Solving Techniques, Engineering Mathematics, Communication Skills, Programming Fundamentals, Digital Fundamentals (Basics).
- WORK: Customer Support Associate - Google Process at Concentrix (Present). Assisting clients with search / product queries, maintaining top CRM customer-satisfaction ratings.
- AWARDS & MAJORS:
  1) 1st Place Overall out of 100+ entries at HackPrix Season 2 (2025) with "CrisisOS Command", a disaster response multi-agent command system.
  2) Active Developer at India.Runs (2026) with "Redrob Truth Engine" (AI Verification Platform with team Future AI Builders).
  3) Co-developing AutoOps Enterprise Agent (NVIDIA Open Hackathons 2026 with team AgentForge), designing planner/supervisor orchestration using NVIDIA NIM.
  4) Built ESP32 Drone Hover board with gyro PID self-leveling loops in C++ at Coimbatore (Makers Arena 2.0, 2026) alongside Coimbatore engineering specialists.
  5) Selected delegate for Microsoft Build and Google I/O Extended 2026 across major cities.
  6) Built Arduino-based Smart Distance Sensor (Ultrasonic distance warnings HF buzzer) and GPS Wearable Safety Bracelet.
- SKILLS: Python (Beginner/Intermediate), C Programming (Beginner), HTML & CSS developer, front-end development, CRM, customer support tools, Google Workspace, git, VS Code. Currently studying AI fundamentals, Data Analytics, embedded sensor basics, etc.
- FUTURE ROADMAP (FUTURE_INSIGHTS):
  - Advanced Agent Memory: Stateful long-term RAG recall using graph network indices is expected in Q4 2026.
  - Self-Healing Workflows: Automatic diagnostics and hot-fixing of pipeline bugs expected in Q1 2027.
  - Adaptive Learning: Reinforcement visual tuning on local interfaces expected in Q2 2027.
  - Enterprise Marketplace: Abstraction gates to connect AutoOps into HubSpot, Salesforce, etc., expected in Q3 2027.
  - Secure Compliance Guardrails: Semantic PII protection in real-time, expected in Q4 2026.

Answer concisely (within 2-3 sentences if possible). If asked questions that are completely unrelated to Ruthvik or ECE/AI, politely steer back to Ruthvik's qualifications, skills, or portfolio insights.`
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
        reply: `Telemetry connection signal interrupted. But let me retrieve from Ruthvik's local cache: he is an ECE scholar at SNIST and Google Process agent at Concentrix. Ask me about his SNIST courses or Concentrix values!`,
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

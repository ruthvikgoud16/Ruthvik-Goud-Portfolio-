import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  X,
  Activity,
  Cpu,
  CornerDownLeft,
  ChevronDown,
  ArrowRight,
  RefreshCw,
  Terminal
} from 'lucide-react';
import { cyberAudio } from '../utils/audioEffects';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AICompanionChatbotProps {
  activeSection: string;
}

export default function AICompanionChatbot({ activeSection }: AICompanionChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "System Online. Greetings! I am Ruthvik's AI Companion. I track your viewport nodes and can explain his research in ECE, Generative AI projects, Concentrix role, or future roadmap goals. How can I assist your transmission?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sectionPromptDismissed, setSectionPromptDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Mouse tilt effect coordinate states for the hover 3D core
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const getSectionNarrative = (section: string): string => {
    switch (section) {
      case 'hero':
        return "You are reading Ruthvik's Terminal Front. He is an ECE scholar at SNIST, Hyderabad, pursuing deep studies in electronics and working as a Customer Support Associate for the Google Process at Concentrix! Ask me about his resume statistics.";
      case 'about':
        return "In this Brief, you can review Ruthvik's full biographical data. He bridges digital circuits and software systems, mastering C, Python, and frontend formats. Ask me about his languages or SNIST first-semester study areas.";
      case 'engineering-lab':
        return "The interactive PCB Engineering Lab lets you inspect system architectures! Click on the chips on-board, like the TalentLens AI processor chip, the ESP32 Drone Hover board, or the SNIST Arduino sensor workbench.";
      case 'skills':
        return "Reviewing Core Competency Matrices. Ruthvik's development stack spans Python, C, HTML/CSS, Git, and premium Google tools. Ask me what areas he is currently learning, like Embedded Systems basics and Data Analytics!";
      case 'projects':
        return "Exploring Systems Run. We have parsed multiple active projects. Check the auto-agent dashboard, NVIDIA-featured AutoOps, India.Runs Winner Redrob Truth Engine, or CrisisOS (1st Place HackPrix Season 2). Ask for project specs!";
      case 'experience':
        return "Checking Chronicle Logs. This captures Ruthvik's professional support role at Concentrix, major Hackathon wins, ETH India, and selection as an invited delegate for Microsoft Build and Google I/O Extended events across India.";
      case 'future-insights':
        return "Investigating Future Roadmaps. Ruthvik's research vectors trace Advanced Agent Memory, Self-Healing recovery, PII protect guardrails, and cybernetic PCB designs. Ask for deep architectural descriptions of these!";
      case 'contact':
        return "Establish Secure Link. Here you can write directly to Ruthvik's secure inbox or fetch his LinkedIn and GitHub links. I can provide copyable credentials if requested!";
      default:
        return "I am companion routing online. Scroll down further to review his work, and I will stream situational telemetries automatically.";
    }
  };

  // Auto-scroll chat log
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle core 3D perspective mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 30, y: -y * 30 }); // Tilt up to 30 degrees
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Submit custom questions to the Express backend /api/chat
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    cyberAudio.playChatSent();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          currentSection: activeSection,
          history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text }))
        })
      });

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "Transmission deviation recorded. Check socket pipeline.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
      cyberAudio.playChatReceived();
    } catch (e: any) {
      console.error("AI Companion Chat Error:", e);
      
      // Fallback response with static prompt routing in case of missing keys during early development
      let fallbackText = "Telemetry signal received, but direct server connection is pending. Here is corresponding dossier info: ";
      const cleanPrompt = textToSend.toLowerCase();
      
      if (cleanPrompt.includes('snist') || cleanPrompt.includes('education') || cleanPrompt.includes('college')) {
        fallbackText += "Ruthvik is pursuing B.Tech in Electronics and Communication Engineering (ECE) at Sreenidhi Institute of Science and Technology (SNIST), Hyderabad. His relevant study areas include Basic Electronics, Engineering Math, Programming, and Digital Fundamentals.";
      } else if (cleanPrompt.includes('concentrix') || cleanPrompt.includes('work') || cleanPrompt.includes('job') || cleanPrompt.includes('google')) {
        fallbackText += "Ruthvik currently works as a Customer Support Associate inside the Google Process at Concentrix. He maintains high-quality service metrics, assists customers with inquiries, and coordinates solutions in a performance-driven framework.";
      } else if (cleanPrompt.includes('project') || cleanPrompt.includes('hackathon')) {
        fallbackText += "His major systems are: 1) CrisisOS Command (1st Place HackPrix S2 winner - disaster response dispatcher), 2) AutoOps (NVIDIA open hackathons - LangGraph multi-agent), and 3) Redrob Truth Engine (India.Runs Track Champion - candidate verification system).";
      } else if (cleanPrompt.includes('skills') || cleanPrompt.includes('c_prog') || cleanPrompt.includes('python')) {
        fallbackText += "Ruthvik's skills are divided as: Developer Programming (Python, C, HTML/CSS, JS), Tools (Git/GitHub, MS Office, Google Workspace), and current learnings (AI fundamentals, Data Analytics, Circuit designs, and Embedded sensors).";
      } else if (cleanPrompt.includes('future') || cleanPrompt.includes('ideas') || cleanPrompt.includes('roadmap')) {
        fallbackText += "His future research blueprints cover: Advanced Agent Memory, Self-Healing automatic code diagnostics, Reinforcement Policy systems, and compliance privacy guardrails to protect customer schemas.";
      } else {
        fallbackText += `Regarding "${textToSend}": Let me check my sensors. Ruthvik is an ECE engineer at SNIST and a Google process support associate at Concentrix. He works on autonomous AI, IoT, and dashboard layouts. Send a direct request inside our main contact form to meet him!`;
      }

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
      cyberAudio.playChatReceived();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: `Companion recycled. Dossier link established onto [Section: ${activeSection.toUpperCase()}]. How can I serve your query?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-sans">
      <AnimatePresence>
        
        {/* Floating Core Indicator (3D tilting look) */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            className="relative cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              cyberAudio.playTerminalLinkClick();
            }}
          >
            {/* Custom glowing border ripple */}
            <div className="absolute inset-y-0 inset-x-0 -m-1.5 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-20 blur-sm animate-pulse pointer-events-none" />

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out'
              }}
              className="h-16 w-16 rounded-full border border-cyan-500/30 bg-[#0c0c12]/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.25)] relative overflow-hidden"
            >
              {/* Particle flow effect background inside circle */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)]" border-radius="50%" />
              
              {/* 3D concentric rotating lines */}
              <div className="absolute h-14 w-14 rounded-full border border-dashed border-cyan-500/10 animate-spin-slow pointer-events-none" />
              <div className="absolute h-10 w-10 rounded-full border border-dotted border-blue-500/20 animate-spin-reverse pointer-events-none" />

              <Bot className="h-7 w-7 text-cyan-400 group-hover:text-white transition-colors relative z-10 animate-pulse" />

              {/* Viewport update flag bubble */}
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#08080a]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              </span>
            </div>

            {/* Quick Context Bubble Prompt */}
            {!sectionPromptDismissed && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.0 }}
                className="absolute right-20 bottom-2 bg-neutral-900 border border-neutral-800 text-white rounded-xl py-2 px-3.5 shadow-2xl flex items-center gap-3 whitespace-nowrap min-w-[220px]"
              >
                <div className="text-left leading-normal">
                  <span className="block text-[8px] font-mono text-cyan-400 tracking-wider font-extrabold uppercase">
                    COMPANION TRANSMISSION
                  </span>
                  <span className="block text-[11px] font-medium text-neutral-200">
                    Tell me about this section!
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSectionPromptDismissed(true);
                  }}
                  className="rounded hover:bg-neutral-800 p-0.5 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Chat Drawer Panel Console */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="w-[360px] sm:w-[410px] h-[580px] rounded-3xl border border-neutral-800 bg-[#08080c]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(6,182,212,0.1)] overflow-hidden flex flex-col"
          >
            {/* Console Header */}
            <div className="p-4 border-b border-neutral-900 bg-neutral-950/40 flex items-center justify-between relative overflow-hidden shrink-0">
              {/* Back gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/10 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-400">
                  <Activity className="h-4 w-4 animate-pulse text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-white tracking-widest uppercase">
                      QUANTUM ASSISTANT
                    </span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="block text-[9px] font-mono text-cyan-400/80 tracking-widest uppercase mt-0.5">
                    ROUTING ACTIVE // CORE_V2
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10">
                <button
                  onClick={clearChatHistory}
                  title="Clear dossier chat history"
                  className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    cyberAudio.playTerminalLinkClick();
                  }}
                  className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-905 border border-transparent hover:border-neutral-800 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Viewport tracking HUD banner */}
            <div className="bg-[#0c0c14] border-b border-neutral-900 py-2.5 px-4 flex items-center justify-between text-[11px] font-mono shrink-0">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Cpu className="h-3 w-3 animate-spin-slow" />
                <span>INTEL LOCATOR:</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-200">
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase">
                  {activeSection.replace('-', '_')}
                </span>
                <span className="text-neutral-500 animate-pulse">●</span>
              </div>
            </div>

            {/* Chat Logs Window */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-[10px] text-center font-mono text-neutral-600 select-none pb-2 tracking-widest border-b border-neutral-900/40">
                ------ SESSION TELEMETRY DIRECT CHANNEL ------
              </div>

              {messages.map((message) => {
                const isAssistant = message.sender === 'assistant';
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2.5 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {isAssistant && (
                      <div className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-cyan-400 shrink-0 select-none">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[80%]">
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          message.sender === 'user'
                            ? 'bg-cyan-900/10 border border-cyan-500/20 text-cyan-100 rounded-tr-none'
                            : 'bg-neutral-950/60 border border-neutral-900 text-neutral-300 rounded-tl-none font-medium'
                        }`}
                      >
                        {message.text}
                      </div>
                      <span className="text-[9px] font-mono text-neutral-600 px-1 self-start select-none font-bold">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Streaming placeholder loader waveform */}
              {isLoading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-cyan-400 shrink-0 animate-pulse">
                    <Activity className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="bg-[#0e0e15] border border-neutral-900 px-4 py-3.5 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <div className="flex items-end gap-1 h-3 shrink-0">
                        <span className="w-1 bg-cyan-400 animate-wave-1 rounded-full" style={{ height: '100%', animation: 'bounce 0.6s infinite ease-in-out' }} />
                        <span className="w-1 bg-cyan-400 animate-wave-2 rounded-full" style={{ height: '60%', animation: 'bounce 0.6s infinite ease-in-out 0.15s' }} />
                        <span className="w-1 bg-cyan-400 animate-wave-3 rounded-full" style={{ height: '80%', animation: 'bounce 0.6s infinite ease-in-out 0.3s' }} />
                        <span className="w-1 bg-cyan-400 animate-wave-4 rounded-full" style={{ height: '40%', animation: 'bounce 0.6s infinite ease-in-out 0.45s' }} />
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
                        DECODING GEMINI PIPELINE...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Dossier Explainer Bubble Option */}
            <div className="p-3 border-t border-neutral-900 bg-neutral-950/50 shrink-0">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-2 px-1 select-none font-bold">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                <span>Situational Explainer Bubble</span>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800/40 rounded-xl p-2.5 relative group overflow-hidden">
                <p className="text-[10px] text-neutral-400 leading-normal line-clamp-2 pr-4 italic font-normal">
                  {getSectionNarrative(activeSection)}
                </p>
                <button
                  id="chatbot-explain-section-btn"
                  onClick={() => triggerQuickPrompt(`Provide granular insights, achievements, and technical scope regarding the portfolio's "${activeSection}" section.`)}
                  className="mt-2.5 w-full py-1.5 px-3 rounded-lg border border-cyan-500/20 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Analyse {activeSection.toUpperCase()} Section</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Quick suggested core questions row */}
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto shrink-0 select-none scrollbar-none">
              <button
                id="chatbot-suggest-snist"
                onClick={() => triggerQuickPrompt("Tell me about your college studies at SNIST Hyderabad and your B.Tech courses.")}
                className="whitespace-nowrap px-2.5 py-1 rounded bg-[#09090e] border border-neutral-800 text-[9px] font-mono font-bold text-neutral-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                SNIST Courses?
              </button>
              <button
                id="chatbot-suggest-concentrix"
                onClick={() => triggerQuickPrompt("What are your duties and achievements as Google Process Associate at Concentrix?")}
                className="whitespace-nowrap px-2.5 py-1 rounded bg-[#09090e] border border-neutral-800 text-[9px] font-mono font-bold text-neutral-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                Concentrix Role?
              </button>
              <button
                id="chatbot-suggest-hackprix"
                onClick={() => triggerQuickPrompt("Explain CrisisOS and your HackPrix victory.")}
                className="whitespace-nowrap px-2.5 py-1 rounded bg-[#09090e] border border-neutral-800 text-[9px] font-mono font-bold text-neutral-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                HackPrix S2?
              </button>
            </div>

            {/* Input Form Terminal */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-neutral-900 bg-[#06060c] flex items-center gap-2 shrink-0"
            >
              <div className="flex-1 bg-neutral-950/80 rounded-xl border border-neutral-800 focus-within:border-cyan-500/50 p-1 flex items-center">
                <div className="px-2.5 text-neutral-600 font-mono text-sm uppercase self-center select-none font-black pl-3 flex items-center">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400/55 mr-1" />
                  <span>&gt;</span>
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask companion a question..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent py-2.5 px-1.5 font-mono text-xs text-white focus:outline-none placeholder-neutral-600"
                />
              </div>
              <button
                id="companion-chat-submit-btn"
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="rounded-xl h-11 w-11 flex items-center justify-center bg-cyan-500 text-black hover:bg-cyan-400 disabled:bg-neutral-950 disabled:border-neutral-900 disabled:text-neutral-700 transition-all shrink-0 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle2, ShieldAlert, Terminal, MessageSquare } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMsg('Please populate all required telemetry arrays (Name, Email, Message).');
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setStatusMsg(null);
    setIsSuccess(null);

    try {
      // Post directly to our server.ts backend endpoint for real-time contact storage!
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.status === 'ok') {
        setStatusMsg('SIGNAL ENCODED SUCCESSFULLY: Message logged to Ruthvik Goud\'s terminal backend.');
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatusMsg(`FAIL: ${data.message || 'System failed to register client transmission.'}`);
        setIsSuccess(false);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMsg('IO_ERROR: Failed to establish duplex link to terminal backend.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#09090c] py-24 px-6 md:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(6,182,212,0.015),transparent_65%)]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Title */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400 font-mono mb-4">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>DUPLEX COMMUNICATIONS</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl font-mono">
            ESTABLISH LINK PROTOCOL
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          {/* Left panel: Direct lines (Columns 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-neutral-200 uppercase font-mono tracking-wider">
              Communication Nodes
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-8">
              Send a secure telemetry ping via the integrated contact console. You can also establish channels directly through any of the active developer nodes below.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {/* Mail */}
              <a
                id="contact-node-mail"
                href={`mailto:${PERSONAL_DETAILS.email}`}
                className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 transition-all hover:border-cyan-500/30 hover:bg-[#0c0c14]"
              >
                <div className="rounded-lg bg-cyan-950 border border-cyan-500/25 p-2.5 text-cyan-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-medium text-neutral-500 uppercase tracking-widest">// Direct Email</div>
                  <div className="text-sm font-bold text-neutral-200 font-mono mt-0.5 truncate">{PERSONAL_DETAILS.email}</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                id="contact-node-linkedin"
                href={PERSONAL_DETAILS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 transition-all hover:border-cyan-500/30 hover:bg-[#0c0c14]"
              >
                <div className="rounded-lg bg-blue-950 border border-blue-500/25 p-2.5 text-blue-400">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-medium text-neutral-500 uppercase tracking-widest">// professional directory</div>
                  <div className="text-sm font-bold text-neutral-200 font-mono mt-0.5">Bathini Ruthvik Goud</div>
                </div>
              </a>

              {/* GitHub */}
              <a
                id="contact-node-github"
                href={PERSONAL_DETAILS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 transition-all hover:border-cyan-500/30 hover:bg-[#0c0c14]"
              >
                <div className="rounded-lg bg-neutral-950 border border-neutral-800 p-2.5 text-white">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-medium text-neutral-500 uppercase tracking-widest">// SOURCE MODULES</div>
                  <div className="text-sm font-bold text-neutral-200 font-mono mt-0.5">ruthvikgoud16</div>
                </div>
              </a>

              {/* Instagram */}
              <a
                id="contact-node-instagram"
                href={PERSONAL_DETAILS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 transition-all hover:border-cyan-500/30 hover:bg-[#0c0c14]"
              >
                <div className="rounded-lg bg-purple-950 border border-purple-500/25 p-2.5 text-purple-400">
                  <Instagram className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-medium text-neutral-500 uppercase tracking-widest">// social uplink</div>
                  <div className="text-sm font-bold text-neutral-200 font-mono mt-0.5">ruthviikk._</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right panel: Contact Form Console (Columns 6-12) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-800 bg-[#0a0a0e] p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4.5 w-4.5 text-cyan-400" />
                  <span className="font-mono text-xs font-semibold text-neutral-300">PING_STATION_CONSOLE</span>
                </div>
                <span className="font-mono text-[9px] text-neutral-600">INPUT PROTOCOL v1.0</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name / Email split row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] text-neutral-500 uppercase font-bold mb-1.5">
                      Pilot Name *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-white outline-none focus:border-cyan-500/40 hover:border-neutral-700 transition"
                      placeholder="e.g. John Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-neutral-500 uppercase font-bold mb-1.5">
                      Pilot Email *
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-white outline-none focus:border-cyan-500/40 hover:border-neutral-700 transition"
                      placeholder="e.g. pilot@agency.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block font-mono text-[10px] text-neutral-500 uppercase font-bold mb-1.5">
                    Uplink Subject
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-white outline-none focus:border-cyan-500/40 hover:border-neutral-700 transition"
                    placeholder="e.g. Systems integration query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-[10px] text-neutral-500 uppercase font-bold mb-1.5">
                    Signal Body Payload *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-white outline-none focus:border-cyan-500/40 hover:border-neutral-700 transition"
                    placeholder="Encode text message payload here..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Submit button bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3">
                  <div className="flex-1">
                    <AnimatePresence mode="wait">
                      {statusMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className={`flex items-start gap-2.5 rounded-lg p-3 text-[11px] font-mono leading-tight ${
                            isSuccess
                              ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400'
                              : 'bg-red-950/40 border border-red-500/30 text-red-400'
                          }`}
                        >
                          {isSuccess ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <ShieldAlert className="h-4 w-4 shrink-0" />}
                          <span>{statusMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    id="contact-btn-submit"
                    type="submit"
                    disabled={isLoading}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-mono text-xs font-bold text-white shadow-lg shadow-cyan-500/15 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition"
                  >
                    <span>{isLoading ? 'ENCODING...' : 'TRANSMIT SIGNAL'}</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Humble system credits footer */}
        <div className="mt-20 border-t border-neutral-900 pt-8 text-center text-neutral-600 font-mono text-[10px]">
          <div>RUTHVIK GOUD // HARDWARE-AI CONTROL STATION v2.0</div>
          <div className="mt-1">Hand-engineered using React, TypeScript, and Tailwind CSS.</div>
        </div>

      </div>
    </section>
  );
}

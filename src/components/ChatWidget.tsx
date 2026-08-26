import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Ask about Nimblize, Anurag University, Pramana, or how to reach Ruthvik.',
    },
  ]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, sender: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          currentSection: 'work',
          history: messages.map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { id: `a-${Date.now()}`, sender: 'assistant', text: data.reply || 'Try again shortly.' }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: 'Ruthvik is an ECE student at Anurag University (2026-2030) and AI Engineering Intern at Nimblize. linkedin.com/in/ruthvikgoud16',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 mix-blend-normal">
      {open && (
        <div className="mb-3 flex h-[400px] w-[min(100vw-2rem,340px)] flex-col border border-white/15 bg-[#070707]">
          <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em]">Ask</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm text-[#f3efe6]/70">
            {messages.map((m) => (
              <p key={m.id} className={m.sender === 'user' ? 'text-right text-white' : ''}>
                {m.text}
              </p>
            ))}
            {loading && <p>…</p>}
          </div>
          <form
            className="flex border-t border-white/15"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
              placeholder="Message"
            />
            <button type="submit" className="px-3" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center border border-white/20 bg-[#070707]"
        aria-label="Open chat"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}

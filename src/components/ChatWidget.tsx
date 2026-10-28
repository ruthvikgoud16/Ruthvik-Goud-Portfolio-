import { useState } from 'react';
import { MessageCircle, X, Send, Mail } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

const EMAIL = 'bathiniruthvik380@gmail.com';

function mailtoFor(question: string) {
  const subject = encodeURIComponent('Portfolio question for Ruthvik');
  const body = encodeURIComponent(`Hi Ruthvik,\n\n${question}\n\n— sent from your portfolio chat`);
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUserQ, setLastUserQ] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Ask about Sydon AI, Nimblize, Bluestock, Anurag University, or Pramana. Out-of-scope questions go to his email.',
    },
  ]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const q = text.trim();
    setLastUserQ(q);
    setMessages((m) => [...m, { id: `u-${Date.now()}`, sender: 'user', text: q }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
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
          text: `I couldn't reach the assistant just now. Email Ruthvik directly at ${EMAIL} and he'll reply.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const latestAssistant = [...messages].reverse().find((m) => m.sender === 'assistant');
  const showMailCta =
    Boolean(lastUserQ) &&
    Boolean(latestAssistant?.text) &&
    /bathiniruthvik380@gmail\.com|outside what I can answer|email him directly/i.test(latestAssistant?.text || '');

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[420px] w-[min(100vw-2rem,340px)] flex-col rounded-[1.4rem] border border-black/10 bg-[#f7f2ea] text-[#141414] shadow-[0_20px_50px_rgba(20,20,20,0.12)]">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em]">Ask</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm opacity-80">
            {messages.map((m) => (
              <p key={m.id} className={m.sender === 'user' ? 'text-right font-medium opacity-100' : ''}>
                {m.text}
              </p>
            ))}
            {loading && <p>…</p>}
            {showMailCta && (
              <a
                href={mailtoFor(lastUserQ)}
                className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-3 py-2 text-xs text-[#efe8dc]"
              >
                <Mail className="h-3.5 w-3.5" />
                Email this to Ruthvik
              </a>
            )}
          </div>
          <form
            className="flex border-t border-black/10"
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
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#141414] text-[#efe8dc]"
        aria-label="Open chat"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}

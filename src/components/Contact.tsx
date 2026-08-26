import { useState, type FormEvent } from 'react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('Please fill in name, email, and message.');
      setOk(false);
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.status === 'ok') {
        setStatus('Received. I’ll get back to you.');
        setOk(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Could not send — email me directly.');
        setOk(false);
      }
    } catch {
      setStatus('Could not send — email me directly.');
      setOk(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mt-24">
      <div className="overflow-hidden border-y border-white/10 py-4">
        <div className="marquee-track gap-10 font-display text-5xl font-semibold tracking-tight md:text-7xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap px-4">
              Let’s connect <span className="text-lg">C</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 py-20 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[#f3efe6]/40">Ruthvik (.16)</p>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Have something in mind? Let’s build it together.
        </h2>
        <a
          href={`mailto:${PERSONAL_DETAILS.email}`}
          className="mt-8 inline-block border border-white px-6 py-3 text-xs uppercase tracking-[0.18em]"
        >
          Start the project
        </a>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div className="space-y-3 text-sm">
            <p>Hyderabad, India</p>
            <p className="text-[#f3efe6]/40">Working globally</p>
            <a className="block underline underline-offset-4" href={`mailto:${PERSONAL_DETAILS.email}`}>
              {PERSONAL_DETAILS.email}
            </a>
            <a className="block underline underline-offset-4" href={PERSONAL_DETAILS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="block underline underline-offset-4" href={PERSONAL_DETAILS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="block underline underline-offset-4" href={PERSONAL_DETAILS.resumeUrl} download="Ruthvik_Goud_Resume.pdf">
              Resume
            </a>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Name"
              className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            {status && <p className={`text-sm ${ok ? 'text-white' : 'text-[#f3efe6]/50'}`}>{status}</p>}
            <button type="submit" disabled={loading} className="text-xs uppercase tracking-[0.18em] underline underline-offset-4">
              {loading ? 'Sending' : 'Send'}
            </button>
          </form>
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#f3efe6]/35">
          <p>©2026 Ruthvik Goud. All rights reserved.</p>
          <p>Portfolio@26</p>
        </div>
      </div>
    </section>
  );
}

import { PERSONAL_DETAILS } from '../data/portfolioData';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen px-5 pt-28 md:px-10">
      <p className="text-xs tracking-[0.22em] uppercase text-[#f3efe6]/45">Hyderabad · India</p>
      <h1 className="mt-10 max-w-5xl font-display text-[12vw] font-semibold leading-[0.92] tracking-[-0.04em] md:text-[7.2vw]">
        I’m {PERSONAL_DETAILS.name},
        <br />
        an AI Engineering Intern
        <br />
        based in Hyderabad.
      </h1>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
        <p className="max-w-md text-sm leading-relaxed text-[#f3efe6]/55 md:text-base">
          {PERSONAL_DETAILS.oneLiner}
        </p>
        <div className="text-right">
          <p className="font-display text-5xl font-semibold tracking-tight">/ 2026 /</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#f3efe6]/40">B.Tech ECE · 2026–2030</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
        className="mt-20 text-xs uppercase tracking-[0.22em] text-[#f3efe6]/50"
      >
        Scroll down
      </button>
    </section>
  );
}

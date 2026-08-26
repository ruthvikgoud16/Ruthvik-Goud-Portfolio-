import { SKILLS_DATA } from '../data/portfolioData';

export default function Skills() {
  return (
    <section className="mt-24 px-5 md:px-10">
      <p className="text-xs uppercase tracking-[0.22em] text-[#f3efe6]/40">Be real * Be technical # Be bold ™</p>
      <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-6xl">
        Skill
        <br />
        sets
      </h2>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#f3efe6]/55">
        End-to-end work across multi-agent AI, backend systems, and ECE hardware — not just slides.
      </p>
      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {SKILLS_DATA.map((cat, i) => (
          <div key={cat.id} className="border-t border-white/10 pt-6">
            <p className="text-xs text-[#f3efe6]/35">({String(i + 1).padStart(2, '0')})</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">{cat.title.toLowerCase()}</h3>
            <ol className="mt-6 space-y-3 text-sm text-[#f3efe6]/65">
              {cat.skills.map((s, n) => (
                <li key={s.name} className="flex gap-3">
                  <span className="text-[#f3efe6]/30">{n + 1}</span>
                  {s.name}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

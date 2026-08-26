import { COMMUNITIES_DATA, SKILLS_DATA } from '../data/portfolioData';
import ParticleNetwork from './ParticleNetwork';
import OrgLogo from './OrgLogo';

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-t border-black/10 bg-[#070707] px-5 py-16 text-[#efe8dc] md:px-10">
      <ParticleNetwork />
      <div className="pcb-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative z-10">
        <h2 className="font-display text-4xl md:text-5xl">Skills</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {SKILLS_DATA.map((cat) => (
            <div key={cat.id}>
              <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">{cat.title}</p>
              <ul className="mt-3 space-y-2">
                {cat.skills.map((s) => (
                  <li key={s.name}>
                    <p className="text-sm font-medium">{s.name}</p>
                    <span className="mt-1 block h-[2px] w-full overflow-hidden bg-white/10">
                      <span className="skill-fill block h-full bg-cyan-400/80" style={{ width: `${s.level}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 text-[10px] uppercase tracking-[0.18em] text-white/40">Currently part of</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {COMMUNITIES_DATA.map((c) => (
            <li key={c.id} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <OrgLogo src={c.logo} alt={c.name} />
              <span>
                <span className="block text-xs font-medium leading-tight">{c.name}</span>
                <span className="text-[10px] text-white/45">{c.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

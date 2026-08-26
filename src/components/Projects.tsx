import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import WorkVisual from './WorkVisual';

export default function Projects() {
  const selected = PROJECTS_DATA.filter((p) => p.featured).concat(
    PROJECTS_DATA.filter((p) => !p.featured).slice(0, 4)
  );

  return (
    <section id="work" className="border-t border-black/10 bg-[#efe8dc] px-5 py-20 md:px-10">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-display text-5xl md:text-7xl">Selected work</h2>
        <p className="hidden text-sm opacity-50 md:block">{selected.length} systems</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {selected.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.github}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: i * 0.05 }}
            className="group overflow-hidden rounded-[1.6rem] bg-[#111] text-[#efe8dc]"
          >
            <div className="relative h-44 overflow-hidden md:h-52">
              <WorkVisual id={p.id} category={p.category} />
              <p className="absolute left-5 top-5 z-10 text-[11px] uppercase tracking-[0.18em] text-white/50">
                {String(i + 1).padStart(2, '0')} / {p.category}
              </p>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-4xl transition-transform duration-300 group-hover:-translate-y-1 md:text-5xl">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-white/55">{p.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">{p.longDescription || p.description}</p>
              {p.impactMetrics && (
                <ul className="mt-4 space-y-1 text-xs text-cyan-200/80">
                  {p.impactMetrics.slice(0, 2).map((m) => (
                    <li key={m}>↳ {m}</li>
                  ))}
                </ul>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.slice(0, 5).map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

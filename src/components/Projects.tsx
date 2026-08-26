import { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';

export default function Projects() {
  const featured = PROJECTS_DATA.filter((p) => p.featured);
  const rest = PROJECTS_DATA.filter((p) => !p.featured);
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="mt-10 border-t border-white/10 pt-16">
      <div className="overflow-hidden border-y border-white/10 py-4">
        <div className="marquee-track gap-10 text-5xl font-display font-semibold tracking-tight md:text-7xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap px-4">
              Let’s connect <span className="text-lg">C</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 pt-16 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            My recently
            <br />
            selected works
          </h2>
          <p className="max-w-xs text-right text-xs uppercase tracking-[0.18em] text-[#f3efe6]/40">
            (01)—({String(PROJECTS_DATA.length).padStart(2, '0')})
          </p>
        </div>

        <div className="mt-14 hide-scrollbar flex gap-6 overflow-x-auto pb-4">
          {featured.map((project, i) => (
            <article
              key={project.id}
              className="min-w-[85%] border border-white/10 p-6 md:min-w-[46%] md:p-8"
              onMouseEnter={() => setActive(i)}
            >
              <p className="text-xs text-[#f3efe6]/40">({String(i + 1).padStart(2, '0')})</p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
              <p className="mt-2 text-sm text-[#f3efe6]/45">{project.subtitle}</p>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#f3efe6]/70">{project.description}</p>
              {active === i && project.longDescription && (
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#f3efe6]/50">{project.longDescription}</p>
              )}
              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-wider text-[#f3efe6]/35">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm underline underline-offset-4">
                  View source
                </a>
              )}
            </article>
          ))}
        </div>

        <ul className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {rest.map((project, i) => (
            <li key={project.id} className="group grid gap-3 py-6 md:grid-cols-12 md:items-baseline">
              <span className="text-xs text-[#f3efe6]/35 md:col-span-1">
                ({String(i + 1 + featured.length).padStart(2, '0')})
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight group-hover:underline md:col-span-5">
                {project.title}
              </h3>
              <p className="text-sm text-[#f3efe6]/45 md:col-span-4">{project.subtitle}</p>
              {project.github && (
                <a href={project.github} className="text-sm underline underline-offset-4 md:col-span-2 md:text-right" target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

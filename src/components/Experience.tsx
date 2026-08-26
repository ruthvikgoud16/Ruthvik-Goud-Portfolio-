import { EXPERIENCES_DATA, PERSONAL_DETAILS } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="mt-24 px-5 md:px-10">
      <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Experience</h2>
      <div className="mt-12">
        {EXPERIENCES_DATA.map((exp, i) => (
          <article key={exp.id} className="grid gap-2 border-t border-white/10 py-8 md:grid-cols-12 md:gap-6">
            <p className="text-xs text-[#f3efe6]/35 md:col-span-2">({String(i + 1).padStart(2, '0')})</p>
            <p className="text-sm text-[#f3efe6]/45 md:col-span-3">{exp.period}</p>
            <div className="md:col-span-7">
              <h3 className="font-display text-2xl font-semibold tracking-tight">{exp.title}</h3>
              <p className="mt-1 text-sm text-[#f3efe6]/50">{exp.organization}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#f3efe6]/70">{exp.description}</p>
              {exp.featured && (
                <a
                  href={PERSONAL_DETAILS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm underline underline-offset-4"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

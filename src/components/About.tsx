import { PERSONAL_DETAILS } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="mt-24 px-5 md:px-10">
      <p className="text-xs uppercase tracking-[0.2em] text-[#f3efe6]/40">(About me)</p>
      <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
        I’m Ruthvik Goud, an AI engineering intern and ECE student based in Hyderabad.
      </h2>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#f3efe6]/60">{PERSONAL_DETAILS.bio}</p>
      <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#f3efe6]/35">Education</p>
          <p className="mt-3 font-display text-xl font-semibold">{PERSONAL_DETAILS.education.institution}</p>
          <p className="mt-1 text-sm text-[#f3efe6]/50">{PERSONAL_DETAILS.education.degree}</p>
          <p className="mt-1 text-sm text-[#f3efe6]/40">2026–2030</p>
        </div>
        <div className="flex flex-wrap gap-2 content-start">
          {PERSONAL_DETAILS.education.studyAreas.map((area) => (
            <span key={area} className="border border-white/10 px-3 py-1 text-xs text-[#f3efe6]/50">
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

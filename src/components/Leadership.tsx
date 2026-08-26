import { LEADERSHIP_DATA } from '../data/portfolioData';

export default function Leadership() {
  return (
    <section className="mt-10 px-5 md:px-10">
      <h2 className="font-display text-4xl font-semibold tracking-tight">Leadership</h2>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {LEADERSHIP_DATA.map((role, i) => (
          <article key={role.id} className="border-t border-white/10 pt-6">
            <p className="text-xs text-[#f3efe6]/35">({String(i + 1).padStart(2, '0')})</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{role.title}</h3>
            <p className="mt-2 text-sm text-[#f3efe6]/45">{role.organization}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#f3efe6]/65">{role.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import { LIFE_FRAMES, PERSONAL_DETAILS } from '../data/portfolioData';
import OrgLogo from './OrgLogo';

export default function About() {
  return (
    <section id="about" className="border-t border-black/10 bg-[#efe8dc] px-5 py-20 md:px-10">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] opacity-45">Studio notes</p>
        <h2 className="mt-3 font-display text-5xl md:text-7xl">This is me.</h2>
        <p className="mt-6 text-lg leading-relaxed opacity-80">{PERSONAL_DETAILS.bio}</p>
        <div className="mt-6 flex items-center gap-3 text-sm">
          <OrgLogo src="/media/logos/anurag.svg" alt="Anurag University" className="border border-black/10" />
          <span>
            {PERSONAL_DETAILS.education.institution}
            <span className="block opacity-50">{PERSONAL_DETAILS.education.status}</span>
          </span>
        </div>
      </div>
      <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {LIFE_FRAMES.map((frame) => (
          <figure key={frame.id} className="mb-4 break-inside-avoid overflow-hidden rounded-[1.4rem] bg-white p-2">
            {frame.id === 'gym' ? (
              <div className="flex justify-center rounded-[1rem] bg-[#111] px-8 py-4">
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="h-[26rem] w-auto max-w-[220px] object-contain"
                />
              </div>
            ) : (
              <img
                src={frame.src}
                alt={frame.alt}
                className={`w-full rounded-[1rem] object-cover ${frame.id === 'portrait' ? 'max-h-[28rem] object-[center_18%]' : 'max-h-[22rem]'}`}
              />
            )}
            <figcaption className="px-2 py-3">
              <p className="font-semibold">{frame.title}</p>
              <p className="mt-1 text-sm leading-relaxed opacity-65">{frame.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

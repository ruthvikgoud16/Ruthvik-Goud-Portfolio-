import { motion } from 'motion/react';
import { EXPERIENCES_DATA } from '../data/portfolioData';
import AmbientField from './AmbientField';
import OrgLogo from './OrgLogo';

const STATUS_LABEL = {
  incoming: 'Incoming',
  completed: 'Completed',
  current: 'Current',
} as const;

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden border-t border-black/10 bg-[#f7f2ea] px-5 py-20 md:px-10">
      <AmbientField color="rgba(20,20,20,0.12)" />
      <div className="relative z-10">
        <h2 className="font-display text-5xl md:text-7xl">Experience</h2>
        <p className="mt-3 max-w-xl text-sm opacity-60">
          Internships first, then campus roles. Incoming work is labelled as upcoming, not as shipped.
        </p>
        <ol className="mt-12 space-y-4">
          {EXPERIENCES_DATA.map((e, i) => {
            const incoming = e.status === 'incoming';
            return (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: Math.min(i * 0.04, 0.2) }}
                className={`rounded-[1.4rem] border bg-white/80 p-5 md:p-7 ${
                  incoming ? 'border-dashed border-[#141414]/35' : 'border-black/10'
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-3">
                    <OrgLogo src={e.logo} alt="" className="mt-0.5 border border-black/10" />
                    <div>
                      <h3 className="font-semibold leading-tight">{e.title}</h3>
                      <p className="text-sm opacity-60">{e.organization}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    {e.status && (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${
                          incoming ? 'bg-[#141414] text-[#efe8dc]' : 'bg-black/5 text-black/55'
                        }`}
                      >
                        {STATUS_LABEL[e.status]}
                      </span>
                    )}
                    <p className="text-xs uppercase tracking-[0.12em] opacity-45">{e.period}</p>
                  </div>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed opacity-80">{e.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${e.organization} stack`}>
                  {e.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-black/10 px-2.5 py-1 text-[11px]">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  {e.projectUrl ? (
                    <a
                      href={e.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs uppercase tracking-[0.14em] underline underline-offset-4"
                    >
                      View project
                    </a>
                  ) : (
                    <span />
                  )}
                  {e.image && (
                    <img
                      src={e.image}
                      alt=""
                      className="h-16 w-28 rounded-lg border border-black/10 object-cover sm:h-20 sm:w-36"
                    />
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

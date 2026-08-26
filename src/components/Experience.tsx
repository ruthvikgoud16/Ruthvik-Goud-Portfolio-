import { motion } from 'motion/react';
import { EXPERIENCES_DATA } from '../data/portfolioData';
import AmbientField from './AmbientField';
import OrgLogo from './OrgLogo';

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden border-t border-black/10 bg-[#f7f2ea] px-5 py-20 md:px-10">
      <AmbientField color="rgba(20,20,20,0.12)" />
      <div className="relative z-10">
        <h2 className="font-display text-5xl md:text-7xl">Experience</h2>
        <p className="mt-3 max-w-xl text-sm opacity-60">Titles sit next to the orgs they belong to — Nimblize, Bluestock, OnePlus, Unstop, Anurag.</p>
        <ul className="mt-12 divide-y divide-black/10">
          {EXPERIENCES_DATA.map((e, i) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.06 }}
              className="grid gap-4 py-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] md:items-start"
            >
              <div className="flex items-start gap-3">
                <OrgLogo src={e.logo} alt={e.organization} className="mt-0.5 border border-black/10" />
                <div>
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm opacity-60">{e.organization}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] opacity-40">{e.period}</p>
                </div>
              </div>
              <div>
                <p className="text-sm leading-relaxed opacity-80">{e.description}</p>
                <p className="mt-2 text-sm opacity-50">{e.achievement}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

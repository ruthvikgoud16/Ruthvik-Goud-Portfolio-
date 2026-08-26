import { motion } from 'motion/react';
import { LEADERSHIP_DATA } from '../data/portfolioData';
import OrgLogo from './OrgLogo';

export default function Leadership() {
  return (
    <section id="staff" className="border-t border-black/10 bg-[#f7f2ea] px-5 py-20 md:px-10">
      <h2 className="font-display text-5xl md:text-7xl">On campus & in rooms</h2>
      <p className="mt-3 max-w-lg text-sm opacity-60">Ambassador work, community, and the builder floors I actually stand in.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {LEADERSHIP_DATA.map((role) => (
          <motion.article
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="overflow-hidden rounded-[1.6rem] bg-white"
          >
            {role.image && (
              <img src={role.image} alt="" className="h-52 w-full object-cover object-center" />
            )}
            <div className="p-6">
              <div className="flex items-center gap-3">
                {role.logo && <OrgLogo src={role.logo} alt={role.organization} className="border border-black/10" />}
                <div>
                  <h3 className="font-display text-3xl">{role.title}</h3>
                  <p className="text-sm opacity-50">
                    {role.organization} · {role.period}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed opacity-75">{role.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

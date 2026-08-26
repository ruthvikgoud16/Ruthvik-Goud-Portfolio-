import { motion } from 'motion/react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import AmbientField from './AmbientField';

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-black/10 bg-[#efe8dc] px-5 py-20 md:px-10">
      <AmbientField color="rgba(226,61,40,0.28)" />
      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.18em] opacity-45">General affairs</p>
        <h2 className="mt-3 font-display text-5xl md:text-7xl">Say hello</h2>
        <div className="mt-10 grid gap-8 text-lg md:grid-cols-3">
          <motion.a
            href={`mailto:${PERSONAL_DETAILS.email}`}
            className="underline decoration-black/20 underline-offset-4"
            whileHover={{ x: 4 }}
          >
            {PERSONAL_DETAILS.email}
          </motion.a>
          <a href={`tel:${PERSONAL_DETAILS.phone.replace(/\s/g, '')}`}>{PERSONAL_DETAILS.phone}</a>
          <div className="space-y-2 text-base">
            <a className="block underline underline-offset-4" href={PERSONAL_DETAILS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="block underline underline-offset-4" href={PERSONAL_DETAILS.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="block underline underline-offset-4" href={PERSONAL_DETAILS.resumeUrl}>
              Resume
            </a>
          </div>
        </div>
        <div className="mt-14 overflow-hidden border-y border-black/10 py-3">
          <div className="contact-marquee flex w-max gap-10 text-sm uppercase tracking-[0.2em] opacity-50">
            {[...PERSONAL_DETAILS.roles, ...PERSONAL_DETAILS.roles].map((role, i) => (
              <span key={`${role}-${i}`}>{role}</span>
            ))}
          </div>
        </div>
        <p className="mt-10 text-sm opacity-40">Hyderabad · Anurag University · ©{new Date().getFullYear()}</p>
      </div>
    </section>
  );
}

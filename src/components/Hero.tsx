import { motion } from 'motion/react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import AmbientField from './AmbientField';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[#070707] text-[#f3efe6]">
      <img
        src="/media/portrait/ruthvik.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[58%_12%] md:object-[48%_24%] lg:object-[52%_22%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/72 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <div className="hero-scan pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
      <AmbientField color="rgba(243,239,230,0.22)" />
      <span className="hero-orbit pointer-events-none absolute right-[8%] top-[28%] hidden h-48 w-48 rounded-full border border-white/20 md:block" />
      <span className="hero-orbit-slow pointer-events-none absolute right-[12%] top-[32%] hidden h-32 w-32 rounded-full border border-dashed border-cyan-300/30 md:block" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.28em] text-[#f3efe6]/70"
        >
          This is Ruthvik.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-5 max-w-5xl font-display text-[11vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[6.4vw]"
        >
          I’m {PERSONAL_DETAILS.name},
          <br />
          an AI Engineering Intern
          <br />
          based in Hyderabad.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-10 flex flex-wrap items-end justify-between gap-8"
        >
          <p className="max-w-md text-sm leading-relaxed text-[#f3efe6]/70 md:text-base">
            {PERSONAL_DETAILS.oneLiner}
          </p>
          <div className="text-left md:text-right">
            <p className="font-display text-5xl font-semibold tracking-tight">/ 2026 /</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#f3efe6]/45">
              B.Tech ECE · Anurag University · 2026–2030
            </p>
          </div>
        </motion.div>
        <button
          type="button"
          onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-14 w-fit text-xs uppercase tracking-[0.22em] text-[#f3efe6]/55"
        >
          Scroll down — selected work
        </button>
      </div>
    </section>
  );
}

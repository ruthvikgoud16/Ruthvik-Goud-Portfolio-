import { Compass, Megaphone, Users, Sparkles, Trophy } from 'lucide-react';
import { LEADERSHIP_DATA } from '../data/portfolioData';
import NextSectionButton from './NextSectionButton';

const ICONS = [Megaphone, Trophy, Users];

export default function Leadership() {
  return (
    <section id="leadership" className="relative bg-[#0a0a0e] py-24 px-6 md:px-12 border-b border-neutral-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(6,182,212,0.04),transparent_55%)]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400 font-mono mb-4">
            <Compass className="h-3.5 w-3.5" />
            <span>COMMUNITY LAYER</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl font-display">
            Leadership & Ambassador
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-400">
            Participant → builder → organizer. OnePlus Student Ambassador and Unstop Campus Champion.
          </p>
          <div className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {LEADERSHIP_DATA.map((role, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <article
                key={role.id}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 hover:border-cyan-500/35 transition-colors"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-950/40 text-cyan-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{role.period}</p>
                <h3 className="mt-1 text-lg font-bold text-white font-display">{role.title}</h3>
                <p className="mt-0.5 text-xs font-semibold text-cyan-400 font-mono">{role.organization}</p>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{role.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-neutral-800 bg-neutral-950/60 px-2 py-0.5 font-mono text-[9px] text-neutral-400 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-neutral-500 font-mono flex items-center justify-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
          Goal: speak, organize, and eventually build a community of my own.
        </p>

        <NextSectionButton nextSectionId="experience" label="OPEN EXPERIENCE TIMELINE" />
      </div>
    </section>
  );
}

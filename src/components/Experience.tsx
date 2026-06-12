import { motion } from 'motion/react';
import { Award, Compass, Sparkles, BookOpen, Clock, AlertTriangle, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/portfolioData';
import NextSectionButton from './NextSectionButton';

export default function Experience() {
  return (
    <section id="experience" className="relative bg-[#0b0b0e] py-24 px-6 md:px-12 border-b border-neutral-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.02),transparent_50%)]" />

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* Title */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400 font-mono mb-4">
            <Compass className="h-3.5 w-3.5" />
            <span>TIMELINE MAP</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl font-mono">
            JOURNEY LOGS & PROTOCOLS
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
        </div>

        {/* Timeline Core Track */}
        <div className="relative border-l border-neutral-800 ml-4 md:ml-12 space-y-12">
          {EXPERIENCES_DATA.map((exp, idx) => {
            // Pick a thematic icon
            const getIcon = () => {
              switch (exp.iconType) {
                case 'trophy':
                  return <Award className="h-5 w-5 text-emerald-400 animate-pulse" />;
                case 'education':
                  return <BookOpen className="h-5 w-5 text-neutral-400" />;
                case 'work':
                  return <ShieldCheck className="h-5 w-5 text-cyan-400" />;
                default:
                  return <Cpu className="h-5 w-5 text-purple-400" />;
              }
            };

            const isTrophy = exp.iconType === 'trophy';

            return (
              <div key={exp.id} className="relative pl-8 md:pl-12 group">
                
                {/* Visual marker node point */}
                <div className={`absolute left-0 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-xl border bg-[#0a0a0f] transition-all duration-300 group-hover:scale-110 ${
                  isTrophy ? 'border-emerald-500 scale-102 shadow-lg shadow-emerald-950/40' : 'border-neutral-800 group-hover:border-neutral-500'
                }`}>
                  {getIcon()}
                </div>

                {/* Card Bubble content */}
                <div className={`rounded-xl border p-6 transition-all duration-200 ${
                  isTrophy 
                    ? 'border-emerald-500/30 bg-emerald-950/5 hover:border-emerald-500/50' 
                    : 'border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}>
                  {/* Metadata Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800/60 pb-3 mb-4">
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">// STATION::{idx + 1}</span>
                      <h3 className="text-lg font-bold text-white font-mono mt-0.5 leading-snug">
                        {exp.title}
                      </h3>
                      <p className="text-xs font-semibold text-cyan-400 font-mono mt-0.5">
                        {exp.organization} — <span className="text-neutral-400 font-sans italic">{exp.role}</span>
                      </p>
                    </div>

                    <span className="shrink-0 self-start md:self-center font-mono text-[10px] font-bold text-neutral-400 border border-neutral-800 bg-neutral-950 px-2.5 py-1 rounded">
                      {exp.period}
                    </span>
                  </div>

                  {/* Body description */}
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights section inside timeline */}
                  <div className="rounded-lg bg-neutral-950/80 border border-neutral-800/60 p-3.5 mb-4">
                    <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-bold mb-1 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      <span>MISSION OUTCOME:</span>
                    </div>
                    <div className="text-xs text-neutral-200 font-sans">
                      {exp.achievement}
                    </div>
                  </div>

                  {/* Tag components */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-neutral-800/30">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-neutral-950/60 border border-neutral-800 px-2 py-0.5 font-mono text-[9px] text-neutral-400 uppercase font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Navigation Flow Trigger */}
        <NextSectionButton nextSectionId="future-insights" label="DECRYPT FUTURE SPECIFICATIONS" />
      </div>
    </section>
  );
}

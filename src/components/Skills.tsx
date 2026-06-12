import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Layers, Terminal, Sparkles, Server, Zap, Gamepad2, Award } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import NextSectionButton from './NextSectionButton';

export default function Skills() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);

  // Monitor scrolling to highlight game level indicators dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const height = rect.height;
      const topOffset = -rect.top;

      // Map progress from top to bottom
      const progress = Math.min(Math.max(topOffset / (height - window.innerHeight / 2), 0), 0.99);
      const index = Math.floor(progress * 3);
      setActiveLevelIdx(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative bg-[#0b0b0e] py-24 px-6 md:px-12 border-b border-neutral-800"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.03),transparent_50%)]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Title */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-950/40 px-3 py-1 text-xs font-semibold text-purple-400 font-mono mb-4">
            <Gamepad2 className="h-3.5 w-3.5" />
            <span>PROGRESSION MAP</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl font-mono">
            SKILLS LEVEL PROGRESSION
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-neutral-400 font-sans">
            Scroll to map through game levels. Level up your architectures from central neural processing down to custom metal boards.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* Game level tracker sidebar (Robby Leonardi-style side HUD) */}
          <div className="lg:col-span-3 sticky top-28 flex flex-row lg:flex-col gap-3 justify-center items-center lg:items-start border-b lg:border-b-0 lg:border-r border-neutral-800/80 pb-6 lg:pb-0 lg:pr-6">
            <div className="hidden lg:block mb-4 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              SYSTEM LEVELS:
            </div>
            
            {[
              { label: 'LVL 01: AI AGENTS', desc: 'Neural compilers & vector indexes' },
              { label: 'LVL 02: REST SERVICES', desc: 'Duplex sockets & postgres' },
              { label: 'LVL 03: ARDUINO CORE', desc: 'Microcontroller peripherals' },
            ].map((lvl, idx) => {
              const isActive = activeLevelIdx === idx;
              return (
                <button
                  key={lvl.label}
                  onClick={() => {
                    setActiveLevelIdx(idx);
                    // Standard smooth offset jumping to container segments
                    const element = containerRef.current;
                    if (element) {
                      const offsetTop = element.offsetTop + (idx * 300);
                      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    }
                  }}
                  className={`flex items-start gap-3 w-full p-2.5 rounded-lg border text-left transition-all ${
                    isActive
                      ? 'border-purple-500/40 bg-purple-950/20 text-white shadow-md'
                      : 'border-transparent text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-md font-mono text-[10px] font-bold ${
                      isActive ? 'bg-purple-500 text-black' : 'bg-neutral-900 border border-neutral-800'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div className="hidden lg:block font-mono leading-none">
                    <div className="text-xs font-bold uppercase tracking-wider">{lvl.label}</div>
                    <div className="text-[9px] text-neutral-500 mt-0.5 line-clamp-1">{lvl.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Level Progress Bars (Columns 4 to 12) */}
          <div className="lg:col-span-9 space-y-12">
            {SKILLS_DATA.map((lvl, levelIndex) => {
              const isSelected = activeLevelIdx === levelIndex;
              return (
                <div
                  key={lvl.id}
                  className={`rounded-2xl border p-6 md:p-8 transition-all ${
                    isSelected
                      ? 'border-neutral-700 bg-neutral-900/40 shadow-xl shadow-neutral-950/35'
                      : 'border-neutral-900 bg-neutral-950/20 opacity-55'
                  }`}
                >
                  {/* Category level title header */}
                  <div className="mb-6 flex items-center justify-between border-b border-neutral-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4.5 w-4.5 text-purple-400" />
                      <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                        {lvl.title}
                      </h3>
                    </div>
                    {isSelected && (
                      <span className="animate-pulse rounded bg-purple-950/80 px-2 py-0.5 font-mono text-[9px] font-bold text-purple-400 tracking-wider">
                        CURRENT_SYNC_NODE
                      </span>
                    )}
                  </div>

                  {/* Skills lists loops */}
                  <div className="space-y-5">
                    {lvl.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="mb-2 flex items-center justify-between font-mono text-xs">
                          <span className="font-bold text-neutral-200">{skill.name}</span>
                          <span className="text-neutral-400">{skill.level}%</span>
                        </div>

                        {/* Outer gauge */}
                        <div className="h-2.5 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-800/60 p-[1.5px]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isInView ? `${skill.level}%` : 0 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating Strengths micro row */}
                  {isSelected && (
                    <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-neutral-900">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase uppercase flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span>UNLOCKED NODES:</span>
                      </span>
                      {lvl.skills.map((skill) => (
                        <div
                          key={skill.name + '-pill'}
                          className="rounded-full bg-neutral-950 border border-neutral-800 px-3 py-1 text-[10px] font-semibold text-purple-300 font-mono"
                        >
                          {skill.name.split(' (')[0].split(' & ')[0]} ★
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Navigation Flow Trigger */}
        <NextSectionButton nextSectionId="projects" label="QUERY DISPATCHED SYSTEMS" />
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
   Brain, 
   ShieldAlert, 
   Sparkles, 
   Zap, 
   Lock, 
   ArrowUpRight, 
   Lightbulb,
   Hourglass,
   Cpu
} from 'lucide-react';
import { FUTURE_INSIGHTS_DATA, FutureIdea } from '../data/portfolioData';
import NextSectionButton from './NextSectionButton';

export default function FutureInsights() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="h-5 w-5 text-purple-400" />;
      case 'ShieldAlert': return <ShieldAlert className="h-5 w-5 text-amber-500" />;
      case 'Sparkles': return <Sparkles className="h-5 w-5 text-pink-400" />;
      case 'Zap': return <Zap className="h-5 w-5 text-cyan-400" />;
      case 'Lock': return <Lock className="h-5 w-5 text-emerald-400" />;
      default: return <Lightbulb className="h-5 w-5 text-blue-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mem': return 'from-purple-500/10 to-transparent border-purple-500/30';
      case 'self': return 'from-amber-500/10 to-transparent border-amber-500/30';
      case 'adapt': return 'from-pink-500/10 to-transparent border-pink-500/30';
      case 'market': return 'from-cyan-500/10 to-transparent border-cyan-500/30';
      case 'sec': return 'from-emerald-500/10 to-transparent border-emerald-500/30';
      default: return 'from-blue-500/10 to-transparent border-blue-500/30';
    }
  };

  const selectedIdea = FUTURE_INSIGHTS_DATA.find(item => item.id === selectedId);

  return (
    <section id="future-insights" className="relative py-24 border-t border-neutral-900 bg-[#060608]">
      {/* Visual background ornaments */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,47,73,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-950/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/10 text-cyan-400 font-mono text-[9px] font-extrabold tracking-widest uppercase mb-4">
              <Cpu className="h-3 w-3 animate-pulse" /> R&D ARCHIVE
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans sm:text-4xl">
              Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Insights & roadmap</span>
            </h2>
            <p className="mt-3 text-neutral-400 font-medium text-sm sm:text-base leading-relaxed">
              Exploiting the overlap of Electronics & Communication circuits with advanced machine intelligence. These are my blueprint drafts for next-generation self-improving software pipelines.
            </p>
          </div>
          <div className="flex items-center gap-4 border border-neutral-800 bg-[#0a0a0e] px-4 py-3 rounded-xl font-mono text-[10px] text-neutral-400 select-none shadow-inner">
            <span className="inline-flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
            <span>ACTIVE BLUEPRINTS: {FUTURE_INSIGHTS_DATA.length} UNITS</span>
          </div>
        </div>

        {/* Big Grid of Roadmap items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUTURE_INSIGHTS_DATA.map((idea) => {
            const isSelected = selectedId === idea.id;
            const categoryBg = getCategoryColor(idea.category);

            return (
              <motion.div
                key={idea.id}
                onClick={() => setSelectedId(idea.id === selectedId ? null : idea.id)}
                whileHover={{ y: -4, borderColor: 'rgba(6,182,212,0.4)', boxShadow: '0 10px 30px -15px rgba(6,182,212,0.1)' }}
                className={`group cursor-pointer rounded-2xl border bg-gradient-to-b p-6 transition-all duration-300 relative overflow-hidden ${
                  isSelected 
                    ? 'border-cyan-500/80 bg-cyan-950/10 shadow-[0_0_25px_rgba(6,182,212,0.15)] md:col-span-2 lg:col-span-2' 
                    : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/10'
                }`}
                layout
              >
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none" />

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-neutral-950 p-2.5 border border-neutral-800 shadow-inner group-hover:border-cyan-500/30 transition-colors">
                      {getIcon(idea.iconName)}
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono text-cyan-400 uppercase tracking-widest leading-none mb-1">
                        {idea.titleLabel}
                      </span>
                      <h3 className="font-semibold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                        {idea.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/10 px-2 py-0.5 rounded-full font-bold">
                      <Hourglass className="h-2 w-2 animate-spin-slow" />
                      {idea.expectedLaunch}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-neutral-400 group-hover:text-neutral-300 leading-relaxed font-medium">
                  {idea.shortDesc}
                </p>

                {/* Expanded Details Panel */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-5 border-t border-cyan-500/10 relative z-10 overflow-hidden"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase mb-1.5 font-bold">
                            Systems Paradigm & Architecture
                          </h4>
                          <p className="text-xs text-neutral-300 leading-relaxed font-normal bg-neutral-950/60 border border-neutral-800/10 p-3 rounded-lg shadow-inner">
                            {idea.longDesc}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-mono">
                          <span className="text-neutral-500 font-bold uppercase tracking-wider">Estimated Stack:</span>
                          {idea.stack.split(', ').map((tech) => (
                            <span key={tech} className="bg-neutral-950 text-neutral-400 border border-neutral-800 px-2.5 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-5 flex items-center justify-between text-[10px] font-mono text-neutral-500 group-hover:text-cyan-400/85 transition-colors pt-2">
                  <span>{isSelected ? 'CLICK TO COLLAPSE' : 'CLICK TO EXPAND'}</span>
                  <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future ECE overlap block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl border border-neutral-800/60 bg-gradient-to-r from-neutral-950 via-[#0a0a0e] to-neutral-950 p-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          
          <div className="max-w-2xl text-left">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyan-400 animate-pulse" />
              Academic Research Vector: Cybernetic ECE-AI Integration
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              My core academic pursuit during my B.Tech studies is the physical layout convergence of artificial networks on hardware. This involves compiling quantized embedding weights directly onto flash-ready, low-power microcontroller memory architectures and constructing autonomous drone communication channels with true decentralized verification layers.
            </p>
          </div>
          <button 
            id="future-insights-collab-btn"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-950/20 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all shadow-md group whitespace-nowrap cursor-pointer"
          >
            <span>Propose Collaboration</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Dynamic Navigation Flow Trigger */}
        <NextSectionButton nextSectionId="contact" label="ESTABLISH SECURE LINK" />
      </div>
    </section>
  );
}

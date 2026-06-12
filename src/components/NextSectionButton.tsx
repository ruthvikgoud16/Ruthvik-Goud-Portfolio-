import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cyberAudio } from '../utils/audioEffects';

interface NextSectionButtonProps {
  nextSectionId: string;
  label?: string;
}

export default function NextSectionButton({ nextSectionId, label = "NEXT INTEL NODE" }: NextSectionButtonProps) {
  const handleScroll = () => {
    cyberAudio.playScrollTransition();
    const el = document.getElementById(nextSectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex justify-center pt-10 pb-4 relative z-20">
      <motion.button
        onClick={handleScroll}
        onMouseEnter={() => cyberAudio.playDiagnosticTick()}
        whileHover={{ 
          scale: 1.05, 
          y: 3,
          boxShadow: '0 0 20px rgba(6,182,212,0.15)',
          borderColor: 'rgba(6,182,212,0.40)'
        }}
        whileTap={{ scale: 0.97 }}
        className="group flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-800/80 bg-neutral-950/40 hover:bg-[#0c0c14] transition-all cursor-pointer font-mono text-[9px] font-extrabold tracking-widest text-neutral-400 hover:text-cyan-400 animate-pulse-subtle"
      >
        <span>{label}</span>
        <div className="relative flex items-center justify-center">
          <ChevronDown className="h-4 w-4 text-neutral-500 group-hover:text-cyan-400 animate-bounce group-hover:animate-none" />
        </div>
      </motion.button>
    </div>
  );
}

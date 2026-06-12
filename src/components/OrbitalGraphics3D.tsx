import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, RotateCcw, Activity, ShieldAlert } from 'lucide-react';
import { cyberAudio } from '../utils/audioEffects';

export default function OrbitalGraphics3D() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [activeFrequency, setActiveFrequency] = useState(433.92);
  const [spinSpeed, setSpinSpeed] = useState(12);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x: x * 35, y: -y * 35 }); // Max 35 degrees tilt
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  // Simulate hardware radio frequency tuner oscillation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFrequency((prev) => {
        const drift = (Math.random() - 0.5) * 0.15;
        const target = prev + drift;
        return Number(Math.min(Math.max(target, 433.10), 434.80).toFixed(2));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        cyberAudio.playDiagnosticTick();
        setSpinSpeed(prev => prev === 12 ? 4 : 12); // Speed shift diagnostic response
      }}
      className="relative w-72 h-72 md:w-80 md:h-80 mx-auto flex items-center justify-center cursor-pointer select-none group"
      style={{
        perspective: '1200px'
      }}
    >
      {/* Glow aura */}
      <div className="absolute inset-4 rounded-full bg-cyan-500/10 blur-[40px] group-hover:bg-cyan-500/15 transition-all duration-500" />

      {/* 3D Holo Platform Frame */}
      <div
        className="w-full h-full relative flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${60 + coords.y}deg) rotateY(${coords.x}deg) rotateZ(10deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Layer 1: Base Grid Baseboard */}
        <div 
          className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full border border-dashed border-neutral-800/80 bg-neutral-950/20 flex items-center justify-center"
          style={{ transform: 'translateZ(-20px)', transformStyle: 'preserve-3d' }}
        >
          {/* Internal target reticle */}
          <div className="w-48 h-48 rounded-full border border-neutral-900 bg-neutral-950/40 relative flex items-center justify-center">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:10px_10px]" />
          </div>
        </div>

        {/* Layer 2: Interactive Concentric Blue Ring (Rotates Counterclockwise) */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: spinSpeed * 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute w-56 h-56 rounded-full border-2 border-dashed border-cyan-500/30 flex items-center justify-center"
          style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
        >
          {/* Orbital Satellite Node A */}
          <div className="absolute top-2 left-1/2 -ml-1 text-[9px] font-mono font-bold text-cyan-400 bg-[#09090f] border border-cyan-400/40 px-1 py-0.5 rounded shadow-[0_0_10px_rgba(6,182,212,0.4)]">
            TX_433
          </div>

          {/* Satellite Core Dot */}
          <span className="absolute -top-1 left-1/2 -ml-1 h-2.5 w-2.5 rounded-full bg-cyan-400">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
          </span>
        </motion.div>

        {/* Layer 3: Interactive Inner Emerald Ring (Rotates Clockwise) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: spinSpeed, repeat: Infinity, ease: 'linear' }}
          className="absolute w-40 h-40 rounded-full border border-dotted border-emerald-500/40 flex items-center justify-center"
          style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
        >
          {/* Micro-node B */}
          <div className="absolute top-1/2 left-0 -mt-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <div className="absolute top-1/2 right-0 -mt-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </motion.div>

        {/* Layer 4: High-Altitude Floating Node (Top Crown) */}
        <div 
          className="absolute w-24 h-24 rounded-full border border-blue-500/20 bg-neutral-900/40 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.1)] flex flex-col items-center justify-center text-center p-2 border-t-blue-500/40 border-b-blue-600/30"
          style={{ transform: 'translateZ(65px)', transformStyle: 'preserve-3d' }}
        >
          {/* Central CPU microchip simulation */}
          <Cpu className="h-5 w-5 text-cyan-400 animate-pulse-subtle mb-0.5" />
          <span className="block text-[7px] font-mono text-neutral-400 font-extrabold uppercase">AUTO_NIM</span>
          <span className="block text-[8px] font-mono text-cyan-400 tracking-tighter mt-0.5 font-bold">
            {activeFrequency} MHz
          </span>
        </div>

        {/* Connected projection beam links */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ transform: 'translateZ(0px)' }}>
          <path 
            d="M 160 160 L 160 225" 
            stroke="url(#beam-gradient)" 
            strokeWidth="1.5" 
            strokeDasharray="4 4" 
            fill="none" 
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(6,182,212,0.01)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.3)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0.8)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom Projection Ring */}
        <div 
          className="absolute w-12 h-12 rounded-full border-2 border-cyan-400/80 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          style={{ transform: 'translateZ(-40px)' }}
        />
      </div>

      {/* Static HUD Metrics corners (pure decorative high-craft graphics) */}
      <div className="absolute top-0 left-0 bg-neutral-950/60 border border-neutral-900 rounded p-1 text-[7px] font-mono text-cyan-500/80 tracking-widest hidden sm:block">
        [3D_COORDINATES]
        <span className="block text-neutral-500 mt-0.5">X: {coords.x.toFixed(1)}° • Y: {coords.y.toFixed(1)}°</span>
      </div>

      <div className="absolute bottom-0 right-0 bg-neutral-950/60 border border-neutral-900 rounded p-1 text-[7px] font-mono text-emerald-500/80 tracking-widest hidden sm:block text-right">
        [SYS_TECTONICS]
        <span className="block text-neutral-500 mt-0.5">HOLO_STABLE_99%</span>
      </div>
    </div>
  );
}

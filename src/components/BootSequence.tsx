import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Shield, Activity, RefreshCw } from 'lucide-react';
import { cyberAudio } from '../utils/audioEffects';

interface BootSequenceProps {
  onComplete: () => void;
}

interface LogLine {
  text: string;
  type: 'info' | 'success' | 'warn' | 'hardware' | 'header';
  delay: number; // millisecond delay before displaying the next line
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<LogLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [bootCompleted, setBootCompleted] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const rawLogs: LogLine[] = [
    { text: 'RUTHVIK_GOUD_OS v2.06 // HARDWARE-AI CONTROL STATION', type: 'header', delay: 300 },
    { text: 'INITIALIZING COLD BOOT SEQUENCE...', type: 'info', delay: 200 },
    { text: 'LOADING COMPILER DEPENDENCIES & VECTORS...', type: 'info', delay: 350 },
    { text: 'SYSTEM KERNEL CHECK: SECURE LINK STABLISHED', type: 'success', delay: 250 },
    { text: 'PROBING MULTI-LAYER PCB MOTHERBOARD...', type: 'info', delay: 300 },
    { text: 'DETECTING ON-BOARD CORES AND INTEGRATIONS:', type: 'header', delay: 150 },
    { text: '  [NPU_01] -> TalentLens AI Silicon [ACTIVE: pgvector]', type: 'hardware', delay: 100 },
    { text: '  [CMD_02] -> CrisisOS Terminal Unit [ACTIVE: WebSockets]', type: 'hardware', delay: 100 },
    { text: '  [MCU_03] -> Arduino Sensor Controller [ACTIVE: Emergency Beacon]', type: 'hardware', delay: 100 },
    { text: '  [COM_04] -> ESP32 Drone Flight Controller [ACTIVE: PID Stabilization]', type: 'hardware', delay: 100 },
    { text: '  [SRV_05] -> Cloud Supabase State Server [ACTIVE: Redundant]', type: 'hardware', delay: 150 },
    { text: 'CORE SYSTEM HEALTH RATINGS: 99.98% NOMINAL', type: 'success', delay: 200 },
    { text: 'RESOLVING GRAPHICAL VIEWPORT INGRESS ROUTING...', type: 'info', delay: 250 },
    { text: 'PORT 3000 OPEN (DUPLEX TUNNEL FULL SYNCED)', type: 'success', delay: 200 },
    { text: 'PILOT BIO LOADED: ELECTRICAL & ELECTRONICS ENGINEER', type: 'success', delay: 150 },
    { text: 'LAUNCHING SYSTEM CORRIDOR HUD LAYERS...', type: 'info', delay: 250 },
    { text: 'SYS_BOOT_SUCCESS: SECURE LINK SECURED.', type: 'header', delay: 100 },
  ];

  // Incrementally print log lines with synchronous audio diagnostics feedback
  useEffect(() => {
    let lineIndex = 0;
    let timer: NodeJS.Timeout;

    const printNextLine = () => {
      if (lineIndex < rawLogs.length) {
        const nextLine = rawLogs[lineIndex];
        setVisibleLines((prev) => [...prev, nextLine]);
        
        // Diagnostic sound bleep
        cyberAudio.playDiagnosticTick();

        // Progress bar simulation proportional to lines loaded
        setProgress(Math.round(((lineIndex + 1) / rawLogs.length) * 100));

        lineIndex++;
        timer = setTimeout(printNextLine, nextLine.delay);
      } else {
        // Complete state trigger
        setBootCompleted(true);
        cyberAudio.playBootChime();
        cyberAudio.speakWelcome();
        setTimeout(() => {
          onComplete();
        }, 1200);
      }
    };

    timer = setTimeout(printNextLine, 150);

    // Escape bypass keydown listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cyberAudio.playTerminalLinkClick();
        cyberAudio.speakWelcome();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync scroll on logs update
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleLines]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060608] px-6 select-none overflow-hidden">
      {/* Visual cyber grids & scan lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/2 to-cyan-500/0 opacity-5" style={{ backgroundSize: '100% 4px', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.15) 3px, transparent 4px)' }} />

      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-[#09090e] shadow-2xl p-6 md:p-8 overflow-hidden">
        {/* LED Glow bars */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-65" />

        {/* Top Header Controls Bar */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <span className="font-mono text-xs font-bold text-neutral-400 tracking-wider">BOOT_TERMINAL::DECRYPT_CORE</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-600">
            <span>SECURELINK</span>
            <Shield className="h-3.5 w-3.5 text-cyan-500/50" />
          </div>
        </div>

        {/* Diagnostic Logs Screen */}
        <div className="h-80 w-full rounded-lg bg-neutral-950/80 p-4 border border-neutral-900 overflow-y-auto font-mono text-xs leading-relaxed max-h-80 flex flex-col gap-1.5 scrollbar-thin">
          {visibleLines.map((line, idx) => {
            const getColor = () => {
              switch (line.type) {
                case 'header':
                  return 'text-cyan-400 font-bold';
                case 'success':
                  return 'text-emerald-400 font-semibold';
                case 'warn':
                  return 'text-amber-400';
                case 'hardware':
                  return 'text-purple-400';
                default:
                  return 'text-neutral-300';
              }
            };

            return (
              <div key={idx} className={`font-mono ${getColor()}`}>
                <span className="text-neutral-500 mr-2 opacity-55 select-none">&gt;</span>
                <span>{line.text}</span>
              </div>
            );
          })}
          
          {/* Prompts loading indicator blinker */}
          {!bootCompleted && (
            <div className="flex items-center gap-2 text-cyan-500 text-[11px] mt-1 select-none animate-pulse">
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>COMPILE_SEGMENT_ARRAYS_MEM...</span>
            </div>
          )}

          {bootCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-emerald-400 font-bold mt-2"
            >
              [ LINK SECURED. INGESTING INTERFACES... READY ]
            </motion.div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Progress Bar Loader Block */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between font-mono text-[10px] text-neutral-400 font-semibold">
            <span>SYSLINK SECURE DECRYPT STATUS</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>

          <div className="h-2 w-full bg-neutral-950 p-[1.5px] border border-neutral-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
            />
          </div>
        </div>

        {/* Bypasser Action Bottom */}
        <div className="mt-6 flex items-center justify-between border-t border-neutral-900 pt-4">
          <span className="font-mono text-[8px] text-neutral-600 uppercase">SYS: AUTH_BYPASS_ENABLED</span>
          <button
            onClick={() => {
              cyberAudio.playTerminalLinkClick();
              cyberAudio.speakWelcome();
              onComplete();
            }}
            className="rounded border border-neutral-800 bg-neutral-900/40 px-3 py-1 font-mono text-[10px] text-neutral-400 hover:border-cyan-500/40 hover:text-cyan-400 active:bg-cyan-500/10 transition cursor-pointer"
          >
            SKIP_DIAG_OVERRIDE [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}

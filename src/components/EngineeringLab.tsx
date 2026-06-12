import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Terminal,
  Radio,
  Server,
  Activity,
  AlertCircle,
  Database,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import { LAB_DEVICES_DATA, MISSION_STATS } from '../data/portfolioData';
import { LabDevice } from '../types';
import NextSectionButton from './NextSectionButton';

export default function EngineeringLab() {
  const [activeDeviceId, setActiveDeviceId] = useState<string>('neural-processor');
  const [isHoveredId, setIsHoveredId] = useState<string | null>(null);
  const [uptimeSeconds, setUptimeSeconds] = useState(1);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Initializing ECE Lab Workstation Core...',
    'Loading device configurations...',
    'All system networks online.'
  ]);

  // PCB Stage 3D Perspective Rotation State
  const [pcbRotateX, setPcbRotateX] = useState(0);
  const [pcbRotateY, setPcbRotateY] = useState(0);

  const handleMouseMovePCB = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    setPcbRotateY(relativeX * 12); // Subtle 12deg max tilt
    setPcbRotateX(-relativeY * 12);
  };

  const handleMouseLeavePCB = () => {
    setPcbRotateX(0);
    setPcbRotateY(0);
  };

  const activeDevice = LAB_DEVICES_DATA.find((d) => d.id === activeDeviceId) || LAB_DEVICES_DATA[0];

  // Tick simulated server uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update terminal simulator when a device is selected
  useEffect(() => {
    const randomHex = () => Math.floor(Math.random() * 65536).toString(16).padEnd(4, '0').toUpperCase();
    const newLines = [
      `SYS_CONNECT: Device ID set to [${activeDevice.id.toUpperCase()}]`,
      `DIAGNOSTIC: Loading ${activeDevice.name}...`,
      `SEEK_DATA: Address offset 0x${randomHex()} -> 0x${randomHex()}`,
      `STATUS: Active and synced on PORT 3000 to internal bus routing.`,
      `INTEGRATION: [${activeDevice.technologies.slice(0, 3).join(', ')}] running nominal.`
    ];
    setTerminalLines(newLines);
  }, [activeDeviceId]);

  // Formats simulated tick seconds to string
  const getSimulatedUptime = () => {
    const mins = Math.floor(uptimeSeconds / 60);
    const secs = uptimeSeconds % 60;
    return `99.98% / ${mins}m ${secs}s`;
  };

  return (
    <section
      id="engineering-lab"
      className="relative border-b border-neutral-800 bg-[#08080b] py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Cybernetic Grid Bracket Markers for Corner Decoration */}
      <div className="pointer-events-none absolute top-4 left-4 font-mono text-[9px] text-neutral-600 select-none">
        LAB_GRID::[0x3F8]
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[9px] text-neutral-600 select-none">
        LAB_COORDINATE::[33.12, -121.2]
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400 font-mono mb-4">
            <Shield className="h-3.5 w-3.5" />
            <span>INTERACTIVE HARDWARE HUB</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl font-mono">
            RUTHVIK'S ENGINEERING LAB
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-400">
            A real-time command center modeling the intersection of Electrical & Electronics Engineering with Advanced Generative AI architectures. Click any motherboard module to query structural logs.
          </p>
        </div>

        {/* MISSION CONTROL HUD BAR */}
        <div className="mb-8 rounded-xl border border-neutral-800 bg-[#0c0c11] p-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6 items-center">
            {/* HUD Title */}
            <div className="col-span-2 border-r border-neutral-800/80 pr-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
                <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
                <span>Mission Control HUD</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-white font-mono leading-tight">
                {MISSION_STATS.currentMission}
              </div>
            </div>

            {/* Status Ping */}
            <div className="border-r border-neutral-800/80 px-2">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Status</div>
              <div className="mt-1 flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>{MISSION_STATS.status}</span>
              </div>
            </div>

            {/* Stat: Completed */}
            <div className="border-r border-neutral-800/80 px-2">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Projects</div>
              <div className="mt-1 text-sm font-bold text-neutral-200 font-mono">
                {MISSION_STATS.projectsCount}
              </div>
            </div>

            {/* Stat: Hackathons */}
            <div className="border-r border-neutral-800/80 px-2">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Hackathons</div>
              <div className="font-mono text-sm font-bold text-neutral-200 mt-1">
                {MISSION_STATS.hackathonsCount}
              </div>
            </div>

            {/* Stat: Uptime */}
            <div className="px-2">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Live Uptime</div>
              <div className="font-mono text-xs font-semibold text-cyan-400 mt-1 truncate">
                {getSimulatedUptime()}
              </div>
            </div>
          </div>
        </div>

        {/* WORKBENCH INTERACTIVE AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main SVG PCB Workbench Stage (Desktop Left, Columns 1 to 8) */}
          <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-neutral-800 bg-[#0b0b10] p-6 flex flex-col justify-between min-h-[480px]">
            {/* Workbench title */}
            <div className="mb-4 flex items-center justify-between border-b border-neutral-900 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-neutral-400">HARDWARE SCHEMATICS VIEWPORT</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-600">FR4 MULTI-LAYER CORE</span>
            </div>

            {/* PCB Schematic Container */}
            <div 
              onMouseMove={handleMouseMovePCB}
              onMouseLeave={handleMouseLeavePCB}
              style={{
                transform: `perspective(1000px) rotateX(${pcbRotateX}deg) rotateY(${pcbRotateY}deg)`,
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d'
              }}
              className="relative flex-1 flex items-center justify-center bg-neutral-950/40 rounded-xl border border-neutral-900/60 p-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#09090e]" />

              {/* Grid Background inside PCB */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_75%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />

              {/* MISSION RADAR SCAN SWEEP */}
              <div className="pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent select-none animate-scanX" />

              {/* 10 SVG BEZIER CIRCUIT TRACES WITH FLOATING ENERGY PACKETS */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
                {/* Circuit lines connecting external nodes to the NPU Core (50%, 50%) */}
                {/* 1: Terminal at (18%, 25%) */}
                <path d="M 18 25 Q 18 50, 50 50" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1.5" className="path-scale-adjust" />
                <path d="M 18 25 Q 50 25, 50 50" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                {/* 2: Arduino at (82%, 25%) */}
                <path d="M 82 25 Q 82 50, 50 50" fill="none" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" />
                <path d="M 82 25 Q 50 25, 50 50" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                {/* 3: Satellite Comms at (18%, 75%) */}
                <path d="M 18 75 Q 18 50, 50 50" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1.5" />
                <path d="M 18 75 Q 50 75, 50 50" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                {/* 4: Server Rack at (82%, 75%) */}
                <path d="M 82 75 Q 82 50, 50 50" fill="none" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1.5" />
                <path d="M 82 75 Q 50 75, 50 50" fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" strokeDasharray="4 4" />

                {/* Additional custom paths for board visual density */}
                <path d="M 10 10 L 18 25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <path d="M 90 10 L 82 25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <path d="M 10 90 L 18 75" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <path d="M 90 90 L 82 75" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {/* Animated Packet Beams using SVG offset streams */}
                <circle r="3.5" className="animate-packet-teal" fill="#06b6d4">
                  <animateMotion dur="4.2s" repeatCount="indefinite" path="M 18 25 Q 18 50, 50 50" />
                </circle>
                <circle r="3.5" className="animate-packet-blue" fill="#3b82f6">
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M 82 25 Q 82 50, 50 50" />
                </circle>
                <circle r="3.5" className="animate-packet-purple" fill="#a855f7">
                  <animateMotion dur="4.8s" repeatCount="indefinite" path="M 18 75 Q 18 50, 50 50" />
                </circle>
                <circle r="3.5" className="animate-packet-indigo" fill="#6366f1">
                  <animateMotion dur="3.9s" repeatCount="indefinite" path="M 82 75 Q 82 50, 50 50" />
                </circle>
              </svg>

              {/* 5 PCB Interactive Motherboard Devices (relative absolute mappings) */}
              <div className="absolute inset-0 z-20">
                {LAB_DEVICES_DATA.map((device) => {
                  const isActive = activeDeviceId === device.id;
                  const isHovered = isHoveredId === device.id;

                  // Resolve icon components
                  const getIcon = () => {
                    switch (device.type) {
                      case 'processor': return <Cpu className="h-6 w-6" />;
                      case 'terminal': return <Terminal className="h-5 w-5" />;
                      case 'arduino': return <Cpu className="h-5 w-5 rotate-45 text-blue-400" />;
                      case 'satellite': return <Radio className="h-5 w-5 text-purple-400" />;
                      case 'server': return <Database className="h-5 w-5 text-indigo-400" />;
                      default: return <Cpu className="h-5 w-5" />;
                    }
                  };

                  return (
                    <button
                      key={device.id}
                      id={`lab-node-${device.id}`}
                      onClick={() => setActiveDeviceId(device.id)}
                      onMouseEnter={() => setIsHoveredId(device.id)}
                      onMouseLeave={() => setIsHoveredId(null)}
                      style={{
                        left: `${device.coordinates.x}%`,
                        top: `${device.coordinates.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="absolute group flex flex-col items-center transition-all duration-300"
                    >
                      {/* Interactive circular/square node component */}
                      <div
                        style={{
                          boxShadow: isActive || isHovered ? `0 0 25px ${device.glowColor}90` : 'none',
                          borderColor: isActive || isHovered ? device.glowColor : 'rgba(38, 38, 38, 0.8)',
                          backgroundColor: isActive ? '#0e0e15' : 'rgba(10, 10, 14, 0.9)',
                        }}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all duration-300 hover:scale-110 active:scale-95`}
                      >
                        <div
                          style={{ color: isActive || isHovered ? device.glowColor : '#a3a3a3' }}
                          className="transition-colors duration-300"
                        >
                          {getIcon()}
                        </div>

                        {/* Central Processor rotating halo visual */}
                        {device.type === 'processor' && (
                          <div className="absolute inset-[-4px] rounded-2xl border border-dashed border-emerald-500/20 animate-spin-slow pointer-events-none" />
                        )}
                      </div>

                      {/* Small floating node label text */}
                      <span
                        style={{
                          color: isActive || isHovered ? '#ffffff' : '#737373',
                          textShadow: isActive || isHovered ? `0 0 10px ${device.glowColor}50` : 'none',
                        }}
                        className="mt-1.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider font-semibold transition-all duration-300"
                      >
                        {device.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Diagnostic Console Log (Simulating ECE stream) */}
            <div className="mt-4 rounded-xl border border-neutral-900 bg-neutral-950 p-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-2 text-[10px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <Activity className="h-3 w-3 text-cyan-400 animate-pulse" />
                  <span>DEVICE_STATION_TELEMETRY.LOG</span>
                </span>
                <span className="text-emerald-400">SYNC_STATUS_OK</span>
              </div>
              <div className="space-y-1 text-[11px] text-neutral-400 leading-normal font-mono">
                {terminalLines.map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-cyan-500 select-none">&gt;&gt;</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connected Device Detailed Diagnostic Panel (Right, Columns 9 to 12) */}
          <div className="lg:col-span-4 rounded-2xl border border-neutral-800 bg-[#0c0c12] p-6 flex flex-col justify-between">
            <div>
              {/* Dynamic Theme Banner */}
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-neutral-500 uppercase">Selected Module</span>
                <span
                  style={{
                    color: activeDevice.glowColor,
                    borderColor: `${activeDevice.glowColor}30`,
                    backgroundColor: `${activeDevice.glowColor}10`,
                  }}
                  className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase"
                >
                  {activeDevice.type}
                </span>
              </div>

              {/* Main Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-mono leading-snug">{activeDevice.name}</h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">{activeDevice.shortDesc}</p>
                <p className="mt-3 text-xs text-neutral-300 leading-relaxed font-sans border-l border-neutral-800 pl-3 italic">
                  {activeDevice.longDesc}
                </p>
              </div>

              {/* Achievements details checklist with Theme Highlights */}
              <div className="space-y-4 border-t border-neutral-900 pt-5">
                <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  Hardware Diagnostics
                </div>

                {/* Ach 1 */}
                <div className="rounded-lg bg-neutral-950 p-3 border border-neutral-900">
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">PROJECT/🏆 IMPACT</div>
                  <div className="mt-0.5 text-xs font-bold text-neutral-200 font-mono">
                    {activeDevice.stats.achievement}
                  </div>
                </div>

                {/* Ach 2 */}
                <div className="rounded-lg bg-neutral-950 p-3 border border-neutral-900">
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">PERFORMANCE RATINGS</div>
                  <div className="mt-0.5 text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>{activeDevice.stats.impact}</span>
                  </div>
                </div>

                {/* Ach 3 */}
                <div className="rounded-lg bg-neutral-950 p-3 border border-neutral-900">
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">MAPPED STACK</div>
                  <div className="mt-0.5 text-xs font-medium text-neutral-300 font-mono truncate">
                    {activeDevice.stats.stack}
                  </div>
                </div>
              </div>
            </div>

            {/* Micro pill technologies row */}
            <div className="mt-6 border-t border-neutral-900 pt-5">
              <div className="mb-2 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                Synchronized Stack Components
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeDevice.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-neutral-900 border border-neutral-800/80 px-2 py-0.5 font-mono text-[10px] text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE FALLBACK CARD LIST (Only visible on smaller viewports, hiding the complexes SVG grid) */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          <div className="col-span-full mb-2 font-mono text-xs font-bold text-neutral-500 uppercase px-1">
            📱 Mobile Module Navigator (PCB list view):
          </div>
          {/* Mobile item iteration loop */}
          {LAB_DEVICES_DATA.map((device) => {
            const isSel = activeDeviceId === device.id;
            return (
              <button
                key={device.id}
                id={`lab-mob-${device.id}`}
                onClick={() => setActiveDeviceId(device.id)}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                  isSel
                    ? 'border-cyan-500/50 bg-[#0e0e16]'
                    : 'border-neutral-800 bg-[#0a0a0f] hover:border-neutral-700'
                }`}
              >
                <div
                  style={{
                    borderColor: isSel ? device.glowColor : 'rgba(64, 64, 64, 0.4)',
                    color: isSel ? device.glowColor : '#a3a3a3',
                  }}
                  className="rounded-lg border-2 p-2.5 bg-neutral-950"
                >
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase">{device.label}</h4>
                  <p className="mt-1 text-[11px] text-neutral-400 font-sans line-clamp-2">{device.shortDesc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Navigation Flow Trigger */}
        <NextSectionButton nextSectionId="skills" label="SYSTEMS COMPETENCIES & LEVELS" />
      </div>
    </section>
  );
}

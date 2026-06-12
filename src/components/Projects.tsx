import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Code2, Cpu, Database, Cpu as ChipIcon, Globe, Radio } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import NextSectionButton from './NextSectionButton';

// Multi-hover persistent 3D project card
function ProjectCard({ project }: { project: Project; key?: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Soft tilt of max 12 degrees
    setRotateY(relativeX * 14);
    setRotateX(-relativeY * 14);

    const sX = ((e.clientX - rect.left) / width) * 100;
    const sY = ((e.clientY - rect.top) / height) * 100;
    setSpotlight({ x: sX, y: sY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSpotlight({ x: 50, y: 50 });
  };

  // Theme mapping for categories
  const getCategoryStyles = () => {
    switch (project.category) {
      case 'ai':
        return {
          glow: 'rgba(16, 185, 129, 0.15)',
          border: 'border-emerald-500/25 hover:border-emerald-500/60',
          badgeBg: 'bg-emerald-950/50 text-emerald-400 border-emerald-400/20',
          icon: <ChipIcon className="h-5 w-5 text-emerald-400" />,
        };
      case 'web':
        return {
          glow: 'rgba(6, 182, 212, 0.15)',
          border: 'border-cyan-500/25 hover:border-cyan-500/60',
          badgeBg: 'bg-cyan-950/50 text-cyan-400 border-cyan-400/10',
          icon: <Globe className="h-5 w-5 text-cyan-400" />,
        };
      case 'hardware':
        return {
          glow: 'rgba(59, 130, 246, 0.15)',
          border: 'border-blue-500/25 hover:border-blue-500/60',
          badgeBg: 'bg-blue-950/50 text-blue-400 border-blue-400/10',
          icon: <Cpu className="h-5 w-5 text-blue-400" />,
        };
      case 'concept':
        return {
          glow: 'rgba(168, 85, 247, 0.15)',
          border: 'border-purple-500/25 hover:border-purple-500/60',
          badgeBg: 'bg-purple-950/50 text-purple-400 border-purple-400/10',
          icon: <Radio className="h-5 w-5 text-purple-400" />,
        };
      default:
        return {
          glow: 'rgba(255, 255, 255, 0.1)',
          border: 'border-neutral-800 hover:border-neutral-700',
          badgeBg: 'bg-neutral-800 text-neutral-300 border-neutral-700',
          icon: <Code2 className="h-5 w-5" />,
        };
    }
  };

  const themeRef = getCategoryStyles();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
        transition: 'transform 0.1s ease-out, border 0.3s ease',
        backgroundImage: `radial-gradient(circle 280px at ${spotlight.x}% ${spotlight.y}%, ${themeRef.glow}, transparent)`,
      }}
      className={`relative flex flex-col justify-between rounded-xl border ${themeRef.border} bg-[#0b0b0f]/95 p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}
    >
      <div>
        {/* Card Header & category pill */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-2">
              {themeRef.icon}
            </div>
            <span className="font-mono text-[10px] text-neutral-500 tracking-wider uppercase">
              // PROJECT::{project.category}
            </span>
          </div>

          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${themeRef.badgeBg}`}>
            {project.category}
          </span>
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold text-white font-mono leading-snug tracking-tight">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-neutral-400 font-mono italic">
          {project.subtitle}
        </p>

        <p className="mt-4 text-xs text-neutral-300 leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Impact List */}
        {project.impactMetrics && project.impactMetrics.length > 0 && (
          <div className="mt-4 space-y-2 border-l-2 border-neutral-800 pl-4 py-1.5 bg-neutral-950/20 rounded-r-lg">
            <span className="font-mono text-[8px] text-neutral-500 tracking-wider block uppercase">
              Metrics & Achievements:
            </span>
            <ul className="space-y-1">
              {project.impactMetrics.map((metric) => (
                <li key={metric} className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tech pills + Links footer */}
      <div className="mt-6 pt-5 border-t border-neutral-900">
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((tool) => (
            <span
              key={tool}
              className="rounded-md bg-neutral-900/60 border border-neutral-800/80 px-2 py-0.5 font-mono text-[10px] text-neutral-400"
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {/* GitHub action */}
          {project.github ? (
            <a
              id={`proj-git-${project.id}`}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>[code_src]</span>
            </a>
          ) : (
            <span className="text-[10px] text-neutral-600 font-mono select-none">// custom firmware</span>
          )}

          {/* Demo action */}
          {project.live && project.live !== '#' ? (
            <a
              id={`proj-live-${project.id}`}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded bg-neutral-900 border border-neutral-800 px-3 py-1 font-mono text-xs font-semibold text-cyan-400 hover:bg-neutral-800 hover:border-cyan-500/30 transition-all hover:text-white"
            >
              <span>launch_node</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="text-[10px] text-neutral-600 font-mono select-none">// simulation node</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative bg-[#09090c] py-24 px-6 md:px-12 border-b border-neutral-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.02),transparent_50%)]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Section title */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400 font-mono mb-4">
            <Code2 className="h-3.5 w-3.5" />
            <span>DEPLOYED SYSTEMS</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl font-mono">
            FEATURED ENGINEERING RUNS
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch font-sans">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Dynamic Navigation Flow Trigger */}
        <NextSectionButton nextSectionId="experience" label="RECONSTRUCT MISSION LOGS" />
      </div>
    </section>
  );
}

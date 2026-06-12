import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, GraduationCap, Award, Compass, Zap, Target } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import NextSectionButton from './NextSectionButton';

export default function About() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [radialX, setRadialX] = useState(50);
  const [radialY, setRadialY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate relative mouse cursor offset from center (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Set rotation degrees (max 15 degrees)
    setRotateY(relativeX * 22);
    setRotateX(-relativeY * 22); // Note the negative sign for correct pitch motion

    // Calculate mouse percentage inside card for the radial light spotlight
    const pX = ((e.clientX - rect.left) / width) * 100;
    const pY = ((e.clientY - rect.top) / height) * 100;
    setRadialX(pX);
    setRadialY(pY);
  };

  const handleMouseLeave = () => {
    // Reset back to equilibrium position smoothly
    setRotateX(0);
    setRotateY(0);
    setRadialX(50);
    setRadialY(50);
  };

  return (
    <section id="about" className="relative bg-[#0d0d11] py-24 px-6 md:px-12 border-b border-neutral-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.03),transparent_50%)]" />

      <div className="container mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 text-xs font-semibold text-cyan-400 font-mono mb-4">
            <Compass className="h-3.5 w-3.5 animate-spin-slow" />
            <span>LEVEL 01: INTRO</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl font-mono">
            MISSION BRIEF & PILOT BIO
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          {/* 3D Holographic Perspective Card (Columns 1-7) */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              id="about-perspective-card"
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
                transition: 'transform 0.15s ease-out',
                backgroundImage: `radial-gradient(circle 350px at ${radialX}% ${radialY}%, rgba(6, 182, 212, 0.15), transparent)`,
              }}
              className="relative w-full rounded-2xl border border-cyan-500/20 bg-neutral-950/90 p-8 shadow-2xl shadow-cyan-950/20 cursor-all-scroll overflow-hidden"
            >
              {/* Top Board circuit traces decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 opacity-60" />
              <div className="absolute top-4 right-4 text-[9px] font-mono text-neutral-600 uppercase tracking-widest select-none">
                Serial: ECE-Z80 // HOLOGRAPHIC
              </div>

              {/* Bio Content */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-cyan-950 border border-cyan-500/30 p-2.5 text-cyan-400">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-mono">{PERSONAL_DETAILS.name}</h3>
                    <p className="text-xs text-cyan-400 font-mono tracking-wider">FOUNDER-CLASS DEVELOPER</p>
                  </div>
                </div>

                <div className="text-sm leading-relaxed text-neutral-300 font-sans space-y-4">
                  <p>{PERSONAL_DETAILS.bio}</p>
                  <p>
                    Currently pursuing a degree in <span className="text-cyan-400 font-semibold font-mono">Electrical & Electronics Engineering</span>, I leverage mathematical systems theory, hardware controller telemetry, and natural language model compilers to orchestrate full-stack software and hardware tools.
                  </p>
                </div>

                {/* Micro Metadata specs */}
                <div className="grid grid-cols-2 gap-4 border-t border-neutral-800/80 pt-6">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                      CURRENT COORDINATES
                    </div>
                    <div className="text-xs font-semibold text-neutral-200 font-mono">
                      India • ECE Hub
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                      COMMUNICATIONS NODE
                    </div>
                    <a
                      href={`mailto:${PERSONAL_DETAILS.email}`}
                      className="text-xs font-semibold text-cyan-400 hover:underline font-mono"
                    >
                      {PERSONAL_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Objectives & Milestones (Columns 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-lg font-bold text-neutral-200 uppercase font-mono tracking-widest flex items-center gap-2">
              <Target className="h-5 w-5 text-cyan-400" />
              <span>Core Core Mandates</span>
            </h4>

            {/* Mandate 1: Autonomous AI */}
            <div className="flex items-start gap-4 rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 transition-all hover:border-cyan-500/20">
              <div className="mt-1 rounded-lg bg-emerald-950 border border-emerald-500/20 p-2 text-emerald-400">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white font-mono">AUTONOMOUS GENERATIVE AI</h5>
                <p className="text-xs text-neutral-400 mt-1">
                  Orchestrating autonomous RAG systems, model evaluation pipelines, vector indexes, and semantic search algorithms.
                </p>
              </div>
            </div>

            {/* Mandate 2: Edge Hardware */}
            <div className="flex items-start gap-4 rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 transition-all hover:border-cyan-500/20">
              <div className="mt-1 rounded-lg bg-blue-950 border border-blue-500/20 p-2 text-blue-400">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white font-mono">ECE EMBEDDED CIRCUITRY</h5>
                <p className="text-xs text-neutral-400 mt-1">
                  Connecting physical microcontrollers, sensors, and mesh modules to internet telemetry clouds using C++ firmwares.
                </p>
              </div>
            </div>

            {/* Mandate 3: Hackathon Winner */}
            <div className="flex items-start gap-4 rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 transition-all hover:border-cyan-500/20">
              <div className="mt-1 rounded-lg bg-purple-950 border border-purple-500/20 p-2 text-purple-400">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white font-mono">HACKATHON FIRST PLACE</h5>
                <p className="text-xs text-neutral-400 mt-1">
                  Consistently prototyping fully scalable systems (CrisisOS) under pressure, pitching to VCs, and winning titles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Flow Trigger */}
        <NextSectionButton nextSectionId="engineering-lab" label="ENTER ENGINEERING WORKBENCH" />
      </div>
    </section>
  );
}

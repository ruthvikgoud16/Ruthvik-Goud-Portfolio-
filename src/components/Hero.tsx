import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, ArrowRight, Github, Linkedin, FileText, Mail } from 'lucide-react';
import { PERSONAL_DETAILS, PROJECTS_DATA } from '../data/portfolioData';
import ParticleNetwork from './ParticleNetwork';
import OrbitalGraphics3D from './OrbitalGraphics3D';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [glitchName, setGlitchName] = useState(PERSONAL_DETAILS.name);

  useEffect(() => {
    const fullText = PERSONAL_DETAILS.roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % PERSONAL_DETAILS.roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const scrambleName = () => {
    const chars = '#$%&@?*€$£Ω∑';
    let iterations = 0;
    const interval = setInterval(() => {
      const scrambled = PERSONAL_DETAILS.name
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations) return PERSONAL_DETAILS.name[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setGlitchName(scrambled);
      iterations += 0.4;
      if (iterations >= PERSONAL_DETAILS.name.length) {
        clearInterval(interval);
        setGlitchName(PERSONAL_DETAILS.name);
      }
    }, 45);
  };

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const interval = setInterval(() => {
      scrambleName();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center border-b border-neutral-800 bg-[#0a0a0c] px-6 pt-24 pb-16 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_65%)]" />
      <ParticleNetwork />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-45" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center justify-center">
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-md mb-6 hover:border-cyan-400/50 transition-all cursor-crosshair self-center lg:self-start"
              onClick={scrambleName}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              <span className="tracking-widest font-mono uppercase">Nimblize intern · Anurag ECE</span>
            </motion.div>

            <h1 className="mb-4 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white select-none leading-none font-display">
              <span
                onMouseEnter={scrambleName}
                className="cursor-pointer bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent hover:text-cyan-300 transition-colors inline-block"
                id="glitch-name-trigger"
              >
                {glitchName}
              </span>
            </h1>

            <div className="mb-6 h-10 text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-cyan-400 font-mono">
              <span className="text-neutral-500">&gt;_ </span>
              <span>{currentText}</span>
              <span className="ml-1 inline-block w-2.5 h-6 animate-pulse bg-cyan-400 align-middle" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8 max-w-xl text-sm sm:text-base text-neutral-400 leading-relaxed font-sans"
            >
              {PERSONAL_DETAILS.oneLiner}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col items-center justify-center lg:justify-start gap-3 sm:flex-row w-full sm:w-auto flex-wrap"
            >
              <button
                id="hero-btn-labs"
                onClick={() => scrollToSection('projects')}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.03] hover:shadow-cyan-400/40 sm:w-auto cursor-pointer"
              >
                <Cpu className="h-4 w-4 text-white" />
                <span>View Pramāṇa & Nimblize</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                id="hero-btn-linkedin"
                href={PERSONAL_DETAILS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-6 py-3.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-black sm:w-auto cursor-pointer transition-all"
              >
                <Linkedin className="h-4 w-4" />
                <span>linkedin.com/in/{PERSONAL_DETAILS.linkedinHandle}</span>
              </a>

              <a
                id="hero-btn-resume"
                href={PERSONAL_DETAILS.resumeUrl}
                download="Ruthvik_Goud_Resume.pdf"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/60 px-5 py-3.5 text-sm font-semibold text-neutral-200 hover:border-neutral-500 sm:w-auto transition-all"
              >
                <FileText className="h-4 w-4" />
                <span>Resume</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 self-center lg:self-start"
            >
              {PROJECTS_DATA.filter((p) => p.featured).map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 text-left hover:border-cyan-500/40 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-500">Featured</span>
                  <p className="mt-1 text-sm font-semibold text-white font-display">{project.title}</p>
                  <p className="mt-0.5 text-[11px] text-neutral-500 line-clamp-2">{project.description}</p>
                </button>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="relative w-full"
            >
              <OrbitalGraphics3D />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-4 sm:gap-8 text-neutral-500 flex-wrap"
        >
          <a
            id="hero-link-github"
            href={PERSONAL_DETAILS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-cyan-400 text-xs font-mono"
          >
            <Github className="h-4 w-4" />
            <span>ruthvikgoud16</span>
          </a>
          <span className="text-neutral-800 hidden sm:inline">|</span>
          <a
            id="hero-link-linkedin"
            href={PERSONAL_DETAILS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-cyan-400 text-xs font-mono"
          >
            <Linkedin className="h-4 w-4" />
            <span>{PERSONAL_DETAILS.linkedinHandle}</span>
          </a>
          <span className="text-neutral-800 hidden sm:inline">|</span>
          <a
            id="hero-link-email"
            href={`mailto:${PERSONAL_DETAILS.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-cyan-400 text-xs font-mono"
          >
            <Mail className="h-4 w-4" />
            <span>{PERSONAL_DETAILS.email}</span>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          id="hero-scroll-trigger"
          onClick={() => scrollToSection('about')}
          className="text-neutral-500 hover:text-cyan-400 transition-colors"
        >
          <span className="block w-4 h-4 border-r-2 border-b-2 border-neutral-500 transform rotate-45" />
        </button>
      </div>
    </section>
  );
}

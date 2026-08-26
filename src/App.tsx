import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Compass } from 'lucide-react';
import { PERSONAL_DETAILS } from './data/portfolioData';

import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import EngineeringLab from './components/EngineeringLab';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Experience from './components/Experience';
import FutureInsights from './components/FutureInsights';
import Contact from './components/Contact';
import BootSequence from './components/BootSequence';
import AICompanionChatbot from './components/AICompanionChatbot';
import { cyberAudio } from './utils/audioEffects';

const BOOT_SKIP_KEY = 'rg-portfolio-boot-skipped';

const SECTIONS = [
  'hero',
  'about',
  'engineering-lab',
  'skills',
  'projects',
  'leadership',
  'experience',
  'future-insights',
  'contact'
];

const NAV_LINKS = [
  { id: 'about', label: 'Brief' },
  { id: 'engineering-lab', label: 'Lab' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'experience', label: 'Timeline' },
  { id: 'future-insights', label: 'Roadmap' },
  { id: 'contact', label: 'Contact' }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isBooted, setIsBooted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(BOOT_SKIP_KEY) === '1';
  });
  const activeSectionRef = useRef('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (activeSectionRef.current !== section) {
              activeSectionRef.current = section;
              setActiveSection(section);
              cyberAudio.playDiagnosticTick();
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const completeBoot = () => {
    localStorage.setItem(BOOT_SKIP_KEY, '1');
    setIsBooted(true);
  };

  const selectNodeLink = (id: string) => {
    setIsMobileMenuOpen(false);
    cyberAudio.playScrollTransition();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-200 selection:bg-cyan-500/20 selection:text-white font-sans relative antialiased">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
          >
            <BootSequence onComplete={completeBoot} />
          </motion.div>
        ) : (
          <motion.div
            key="main-applet"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full"
          >
            <CustomCursor />

            <header className="fixed top-0 left-0 right-0 z-40 border-b border-neutral-900 bg-[#08080b]/55 backdrop-blur-xl">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <button
                  id="nav-logo"
                  onClick={() => selectNodeLink('hero')}
                  className="flex items-center gap-2 group text-left cursor-pointer"
                >
                  <div className="rounded bg-gradient-to-br from-cyan-400 to-blue-600 p-1.5 text-black font-black font-mono shadow-md shadow-cyan-500/10">
                    <Compass className="h-4 w-4 text-white animate-spin-slow" />
                  </div>
                  <div>
                    <span className="font-mono text-sm font-bold text-white tracking-tight">RUTHVIK.GOUD</span>
                    <span className="block text-[8px] font-mono text-cyan-400 tracking-widest uppercase mt-0.5">
                      NIMBLIZE INTERN // ANURAG ECE
                    </span>
                  </div>
                </button>

                <nav className="hidden lg:flex items-center gap-0.5 font-mono text-[11px]">
                  {NAV_LINKS.map((link) => {
                    const matches = activeSection === link.id;
                    return (
                      <button
                        key={link.id}
                        id={`nav-link-${link.id}`}
                        onClick={() => selectNodeLink(link.id)}
                        style={{ textShadow: matches ? '0 0 10px rgba(6,182,212,0.4)' : 'none' }}
                        className={`px-2.5 py-1.5 rounded-lg transition-all font-semibold uppercase tracking-wider ${
                          matches
                            ? 'text-cyan-400 bg-neutral-900/60 border border-neutral-800'
                            : 'text-neutral-400 hover:text-white border border-transparent'
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="hidden md:flex items-center gap-2">
                  <a
                    href={PERSONAL_DETAILS.resumeUrl}
                    download="Ruthvik_Goud_Resume.pdf"
                    className="rounded-lg border border-neutral-800 px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-neutral-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
                  >
                    Resume
                  </a>
                  <a
                    href={PERSONAL_DETAILS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-neutral-800 px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-neutral-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
                  >
                    LinkedIn
                  </a>
                  <button
                    id="header-btn-direct"
                    onClick={() => selectNodeLink('contact')}
                    className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-4 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    Contact
                  </button>
                </div>

                <button
                  id="mobile-menu-trigger"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded border border-neutral-800 p-1.5 text-neutral-400 lg:hidden hover:border-neutral-500 hover:text-white"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </header>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="fixed inset-x-0 top-[69px] z-30 border-b border-neutral-800 bg-[#08080b]/98 p-6 shadow-2xl backdrop-blur-2xl lg:hidden"
                >
                  <nav className="flex flex-col gap-3 font-mono text-sm">
                    {NAV_LINKS.map((link) => (
                      <button
                        key={link.id}
                        id={`nav-mob-link-${link.id}`}
                        onClick={() => selectNodeLink(link.id)}
                        className="w-full rounded border border-neutral-900 bg-neutral-950/60 py-3 px-4 text-left text-xs font-semibold text-neutral-300 active:bg-cyan-500 active:text-black"
                      >
                        {link.label}
                      </button>
                    ))}
                    <a
                      href={PERSONAL_DETAILS.resumeUrl}
                      download="Ruthvik_Goud_Resume.pdf"
                      className="w-full rounded border border-neutral-800 bg-neutral-950/60 py-3 px-4 text-left text-xs font-semibold text-neutral-300"
                    >
                      Download resume
                    </a>
                    <a
                      href={PERSONAL_DETAILS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded border border-cyan-500/30 bg-cyan-950/20 py-3 px-4 text-left text-xs font-semibold text-cyan-400"
                    >
                      LinkedIn — {PERSONAL_DETAILS.linkedinHandle}
                    </a>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>

            <main className="pt-1">
              <Hero />
              <About />
              <EngineeringLab />
              <Skills />
              <Projects />
              <Leadership />
              <Experience />
              <FutureInsights />
              <Contact />
            </main>

            <AICompanionChatbot activeSection={activeSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

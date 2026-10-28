import CursorFollow from './components/CursorFollow';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import WelcomeWorld from './components/WelcomeWorld';

export default function App() {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#efe8dc] text-[#141414]">
      <WelcomeWorld />
      <CursorFollow />
      <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
          <button type="button" onClick={() => go('top')} className="text-left">
            <span className="block font-display text-sm font-semibold tracking-tight text-white md:text-base">
              Ruthvik Goud
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-white/70 md:block">
              This is Ruthvik
            </span>
          </button>
          <p className="hidden text-xs uppercase tracking-[0.18em] text-white/80 md:block">AI Engineer</p>
          <nav className="flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-white">
            <button type="button" className="hidden md:inline" onClick={() => go('work')}>
              Work
            </button>
            <button type="button" className="hidden md:inline" onClick={() => go('skills')}>
              Skills
            </button>
            <button type="button" className="hidden md:inline" onClick={() => go('about')}>
              About
            </button>
            <a href="#contact" className="underline underline-offset-4">
              Start a conversation
            </a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Projects />
        <Experience />
        <Leadership />
        <Skills />
        <About />
        <Contact />
      </main>

      <ChatWidget />
    </div>
  );
}

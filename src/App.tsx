import CursorFollow from './components/CursorFollow';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
];

export default function App() {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#f3efe6]">
      <CursorFollow />
      <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
          <button type="button" onClick={() => go('top')} className="font-display text-sm font-semibold tracking-tight md:text-base">
            Ruthvik Goud
          </button>
          <p className="hidden text-xs tracking-[0.18em] uppercase text-[#f3efe6]/70 md:block">
            AI Engineering Intern
          </p>
          <div className="flex items-center gap-6">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="hidden text-xs uppercase tracking-[0.16em] md:inline"
              >
                {item.label}
              </button>
            ))}
            <a
              href="#contact"
              className="text-xs uppercase tracking-[0.16em] underline underline-offset-4"
            >
              Start a conversation
            </a>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Leadership />
        <About />
        <Contact />
      </main>

      <ChatWidget />
    </div>
  );
}

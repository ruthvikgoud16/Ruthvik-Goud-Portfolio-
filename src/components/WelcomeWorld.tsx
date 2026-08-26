import { useEffect, useRef, useState } from 'react';

export default function WelcomeWorld() {
  const [gate, setGate] = useState(true);
  const played = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (played.current) return;
    played.current = true;
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.55;
      void audio.play().catch(() => undefined);
    }
    window.setTimeout(() => setGate(false), 2200);
  };

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setGate(false);
      return;
    }
    const unlock = () => play();
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/media/welcome.wav" preload="auto" />
      {gate && (
        <button
          type="button"
          onClick={play}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/75 text-[#efe8dc] backdrop-blur-[2px]"
          aria-label="Enter Ruthvik's world"
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">Transmission</p>
          <p className="mt-4 font-display text-5xl md:text-7xl">Welcome to my world.</p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/50">Tap anywhere to enter</p>
        </button>
      )}
    </>
  );
}

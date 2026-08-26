import { useEffect, useState } from 'react';

export default function CursorFollow() {
  const [pos, setPos] = useState({ x: -40, y: -40 });
  const [hover, setHover] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setOk(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(Boolean(t.closest('a, button')));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  if (!ok) return null;

  return (
    <div
      className="pointer-events-none fixed z-[90] mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`rounded-full bg-white transition-all duration-200 ${hover ? 'h-16 w-16 opacity-90' : 'h-3 w-3'}`}
      />
    </div>
  );
}

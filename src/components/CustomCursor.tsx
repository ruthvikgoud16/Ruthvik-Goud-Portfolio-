import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, speed: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setIsVisible(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      mouseRef.current.speed = Math.sqrt(dx * dx + dy * dy);

      // Emit trail particles based on mouse movement speed
      if (mouseRef.current.speed > 1) {
        const count = Math.min(Math.floor(mouseRef.current.speed * 0.4), 4);
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 1.5 + dx * 0.1,
            vy: (Math.random() - 0.5) * 1.5 + dy * 0.1,
            alpha: 1.0,
            size: Math.random() * 3 + 1,
            color: Math.random() > 0.4 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(6, 182, 212, 0.6)' // Electric Blue or Cyan
          });
        }
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      // Direct spark explosion on click
      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 4 + 1;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1.0,
          size: Math.random() * 4 + 2,
          color: i % 2 === 0 ? '#06b6d4' : '#10b981' // Cyan or Emerald spark
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Current custom cursor bubble (fluid spring cursor element)
      const ringX = mouseRef.current.x;
      const ringY = mouseRef.current.y;

      // Draw custom pointer: sharp futuristic pointed arrow/triangle
      ctx.beginPath();
      ctx.moveTo(ringX, ringY); // Point of the cursor
      ctx.lineTo(ringX + 10, ringY + 12);
      ctx.lineTo(ringX + 4, ringY + 12);
      ctx.lineTo(ringX + 1, ringY + 17);
      ctx.closePath();
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow for rest of drawings

      // Draw active cursor outer hover-ring with responsive dynamics
      ctx.beginPath();
      ctx.arc(ringX, ringY, 14 + Math.min(mouseRef.current.speed * 0.5, 20), 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Render & update trail physics particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02; // Fade rate

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      id="custom-cursor-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-50 h-full w-full"
    />
  );
}

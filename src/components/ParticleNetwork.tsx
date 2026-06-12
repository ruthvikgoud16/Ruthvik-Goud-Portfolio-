import { useEffect, useRef } from 'react';

interface ConstellationNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
}

export default function ParticleNetwork() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: ConstellationNode[] = [];
    const maxDistance = 110; // Max line connection distance
    const forceRadius = 150; // Radius of mouse repulsion force
    const nodeCount = 80;

    const initNetwork = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

      nodes = [];
      const count = Math.floor((canvas.width * canvas.height) / 14000); // Scale count with grid area
      const finalCount = Math.min(Math.max(count, 40), 120);

      for (let i = 0; i < finalCount; i++) {
        const rx = Math.random() * canvas.width;
        const ry = Math.random() * canvas.height;
        nodes.push({
          x: rx,
          y: ry,
          baseX: rx,
          baseY: ry,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 1,
        });
      }
    };

    initNetwork();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    const resizeObserver = new ResizeObserver(() => {
      initNetwork();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update and Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Constant floating velocity
        n.x += n.vx;
        n.y += n.vy;

        // Wrap boundaries
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;

        // Mouse Repulsion Math
        if (mx > -1000) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < forceRadius) {
            // Apply exponential force away from pointer
            const force = (forceRadius - dist) / forceRadius;
            const pushX = (dx / dist) * force * 2.8;
            const pushY = (dy / dist) * force * 2.8;
            n.x += pushX;
            n.y += pushY;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)'; // Cyan nodes
        ctx.fill();
      }

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            // Linear glow interpolation
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`; // Transition from Cyan/Blue
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      id="particle-network-container"
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full opacity-60" />
    </div>
  );
}

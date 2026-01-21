import { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
  color?: string; // e.g. "255, 255, 255"
  particleCount?: number;
  interactionRadius?: number;
  className?: string;
}

export function NetworkBackground({ 
  color = '255, 255, 255', 
  particleCount = 100, 
  interactionRadius = 150,
  className = ''
}: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    let animationFrameId: number;
    let mouse = { x: -9999, y: -9999 };

    // Initialize dimensions
    const resize = () => {
      // We use the container's dimensions to ensure it fits the parent section
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Adjust particle count based on screen width (fewer on mobile)
      const count = window.innerWidth < 768 ? Math.floor(particleCount / 2) : particleCount;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle (Dot)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.6)`; // Increased opacity for visibility
        ctx.fill();

        // Connect to mouse
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < interactionRadius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${color}, ${0.4 * (1 - distMouse / interactionRadius)})`;
            ctx.stroke();
        }

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${0.2 * (1 - distance / 120)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -9999;
        mouse.y = -9999;
    }

    // Initialize
    resize();
    draw();

    // Event Listeners
    window.addEventListener('resize', resize);
    // We attach mouse listeners to the container so it tracks relative to the section
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, particleCount, interactionRadius]);

  return (
    <div 
        ref={containerRef} 
        className={`absolute inset-0 z-0 pointer-events-none ${className}`}
        // Temporary border for debugging (remove this later if you see the box but no dots)
        // style={{ border: '1px solid red' }} 
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
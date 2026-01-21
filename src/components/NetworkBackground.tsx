import { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
  color?: string;
  particleCount?: number;
  interactionRadius?: number;
  connectionRadius?: number;
  className?: string;
}

export function NetworkBackground({ 
  color = '255, 255, 255', 
  particleCount = 200, // Increased from 130 to 200 for high density
  interactionRadius = 200,
  connectionRadius = 260, // Increased to 260 to "bind" nodes across larger gaps
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

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      // On mobile, we reduce count to prevent lag, but keep it relatively dense
      const count = isMobile ? Math.floor(particleCount / 2) : particleCount;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Low velocity keeps the "mesh" structure stable
          vx: (Math.random() - 0.5) * 0.3, 
          vy: (Math.random() - 0.5) * 0.3,
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

        // Draw Node: Solid White
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 1.0)`; 
        ctx.fill();

        // Connect to Mouse
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < interactionRadius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${color}, ${0.8 * (1 - distMouse / interactionRadius)})`;
            ctx.stroke();
        }

        // Connect to Other Particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionRadius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Bright & Thick Lines
            // Increased max opacity to 0.6 and line width to 1.5
            const opacity = 0.6 * (1 - distance / connectionRadius);
            
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 1.5; // Thicker lines make it feel more "binded"
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

    resize();
    draw();

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, particleCount, interactionRadius, connectionRadius]);

  return (
    <div 
        ref={containerRef} 
        className={`absolute inset-0 z-0 pointer-events-none ${className}`}
        aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
        // Ensure no background interference
        style={{ background: 'transparent' }} 
      />
    </div>
  );
}
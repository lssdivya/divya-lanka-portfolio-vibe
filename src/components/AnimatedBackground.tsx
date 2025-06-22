import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 80;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      pulsePhase: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 6 + 3;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.02;
        
        // Bright, vibrant colors for visibility
        const colors = [
          '#8B5CF6', // Purple
          '#EC4899', // Pink
          '#3B82F6', // Blue
          '#10B981', // Green
          '#F59E0B', // Orange
          '#EF4444', // Red
          '#6366F1', // Indigo
          '#14B8A6', // Teal
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep particles in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Enhanced pulsing effect
        this.pulsePhase += this.pulseSpeed;
        this.opacity = 0.3 + Math.sin(this.pulsePhase) * 0.4;
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        
        // Create strong glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.globalAlpha = this.opacity;
        
        // Draw the main particle with glow
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add outer glow ring
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let animationId: number;
    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      
      // Clear with slight trail effect for smoother animation
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(time);
        particle.draw();
      });

      // Draw connections with enhanced visibility
      ctx.save();
      ctx.lineWidth = 2;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.6;
            ctx.globalAlpha = opacity;
            
            // Create bright gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.shadowColor = particles[i].color;
            ctx.shadowBlur = 10;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate(0);

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        display: 'block',
        width: '100vw',
        height: '100vh',
        background: 'transparent'
      }}
    />
  );
};

export default AnimatedBackground;

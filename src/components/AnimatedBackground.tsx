
import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 120;

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
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 4 + 2;
        this.opacity = Math.random() * 0.8 + 0.4;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        
        // Dark colors for white background visibility
        const colors = [
          '#8B5CF6', // Purple
          '#EC4899', // Pink
          '#3B82F6', // Blue
          '#10B981', // Green
          '#F59E0B', // Orange
          '#EF4444', // Red
          '#6366F1', // Indigo
          '#8B5A2B', // Brown
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Enhanced pulsing effect
        this.pulsePhase += this.pulseSpeed;
        this.opacity = 0.4 + Math.sin(this.pulsePhase) * 0.4;
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        
        // Create subtle glow effect for white background
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = this.opacity;
        
        // Draw the main particle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle glow ring
        ctx.globalAlpha = this.opacity * 0.2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
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
      
      // Clear the canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(time);
        particle.draw();
      });

      // Draw connections with darker colors for white background
      ctx.save();
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.3;
            ctx.globalAlpha = opacity;
            
            // Create gradient line with visible colors
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.strokeStyle = gradient;
            
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
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full"
      style={{ 
        display: 'block',
        width: '100vw',
        height: '100vh'
      }}
    />
  );
};

export default AnimatedBackground;

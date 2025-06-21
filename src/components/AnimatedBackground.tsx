
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * (window.innerHeight * 3); // Cover 3x viewport height
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 6 + 4;
        this.opacity = Math.random() * 0.8 + 0.6;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        
        const colors = ['#8B5CF6', '#EC4899', '#F472B6', '#A855F7', '#C084FC'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen bounds
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.opacity = (Math.sin(time * this.pulseSpeed) + 1) * 0.3 + 0.5;
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Enhanced glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 10
        );
        
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.3, this.color + '90');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const resizeCanvas = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        window.innerHeight * 3
      );
      
      canvas.width = window.innerWidth;
      canvas.height = docHeight;
      canvas.style.height = `${docHeight}px`;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let animationId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(time * 0.001);
        particle.draw();
      });

      // Enhanced connections
      ctx.save();
      ctx.lineWidth = 3;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            gradient.addColorStop(0, '#8B5CF6');
            gradient.addColorStop(1, '#EC4899');
            
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = (200 - distance) / 200 * 0.8;
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

    // Initial setup
    resizeCanvas();
    init();
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      animate(0);
    }, 100);

    const handleResize = () => {
      resizeCanvas();
      init();
    };

    const handleScroll = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('DOMContentLoaded', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('DOMContentLoaded', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none z-10 w-full"
        style={{ 
          opacity: 0.9,
          minHeight: '300vh',
          display: 'block'
        }}
      />
      
      {/* Static geometric shapes that stay visible */}
      <div className="fixed inset-0 pointer-events-none z-5 w-full" style={{ minHeight: '300vh' }}>
        {/* Floating circles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 border-2 border-purple-400/80 rounded-full"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 250}%`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
              scale: [1, 1.8, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Floating squares */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className="absolute w-32 h-32 border-2 border-pink-400/80"
            style={{
              right: `${Math.random() * 90}%`,
              top: `${Math.random() * 280}%`,
              transform: 'rotate(45deg)',
            }}
            animate={{
              x: [0, 80, 0],
              rotate: [45, 405],
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.6, 1],
            }}
            transition={{
              duration: 15 + i * 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1,
            }}
          />
        ))}

        {/* Large gradient orbs */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-purple-500/60 to-pink-500/60 blur-2xl"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 200}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 2.5, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AnimatedBackground;

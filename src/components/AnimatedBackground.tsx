
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
    const particleCount = 120;

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
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 4 + 3;
        this.opacity = Math.random() * 0.9 + 0.5;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        
        const colors = ['#8B5CF6', '#EC4899', '#F472B6', '#A855F7', '#C084FC'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.opacity = (Math.sin(time * this.pulseSpeed) + 1) * 0.4 + 0.4;
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Enhanced glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 8
        );
        
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.3, this.color + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
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
      ctx.lineWidth = 2;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            gradient.addColorStop(0, '#8B5CF6');
            gradient.addColorStop(1, '#EC4899');
            
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = (150 - distance) / 150 * 0.7;
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
    init();
    animate(0);

    const handleResize = () => {
      resizeCanvas();
      init();
    };

    const handleScroll = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        style={{ opacity: 0.9, height: '100vh', minHeight: '100%' }}
      />
      
      {/* Enhanced visible geometric shapes covering entire page */}
      <div className="fixed inset-0 pointer-events-none z-5" style={{ height: '200vh' }}>
        {/* Floating circles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-purple-400/70 rounded-full"
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i * 15)}%`,
            }}
            animate={{
              y: [0, -80, 0],
              rotate: [0, 360],
              scale: [1, 1.6, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
        
        {/* Floating squares */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className="absolute w-24 h-24 border-2 border-pink-400/70"
            style={{
              right: `${5 + (i * 9)}%`,
              top: `${20 + (i * 18)}%`,
              transform: 'rotate(45deg)',
            }}
            animate={{
              x: [0, 60, 0],
              rotate: [45, 405],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 12 + i * 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.2,
            }}
          />
        ))}

        {/* Enhanced gradient orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur-xl"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 150}%`,
            }}
            animate={{
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 150 - 75, 0],
              scale: [1, 2.2, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 15 + i * 2,
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

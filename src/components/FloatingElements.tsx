
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Zap, Star, Heart, Sparkles, Cpu, Wifi, Globe, Rocket } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [Code, Database, Zap, Star, Heart, Sparkles, Cpu, Wifi, Globe, Rocket];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-400/60"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 60 - 30, 0],
            rotate: [0, 360, 0],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        >
          <Icon size={28 + Math.random() * 20} />
        </motion.div>
      ))}
      
      {/* Enhanced gradient orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-2xl"
          style={{
            width: `${120 + Math.random() * 100}px`,
            height: `${120 + Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150, 0],
            y: [0, Math.random() * 300 - 150, 0],
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 18 + Math.random() * 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 8,
          }}
        />
      ))}
      
      {/* Flowing lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          style={{
            width: '200px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [-200, window.innerWidth + 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
